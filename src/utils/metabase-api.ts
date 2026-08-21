import { METABASE_USERNAME, METABASE_PASSWORD } from "./constant";

// We use the proxy configured in vite.config.js to avoid CORS issues
const API_BASE = "/metabase-api";

interface MetabaseAuthResponse {
  id: string; // The session token
}

/**
 * Authenticates with Metabase and returns a session token string.
 */
export async function getMetabaseSession(): Promise<string> {
  const loginRes = await fetch(`${API_BASE}/session`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: METABASE_USERNAME,
      password: METABASE_PASSWORD,
    }),
  });

  if (!loginRes.ok) {
    throw new Error(`Metabase login failed: ${loginRes.statusText}`);
  }

  const data: MetabaseAuthResponse = await loginRes.json();
  return data.id;
}

/**
 * Creates a new collection in Metabase.
 */
export async function createMetabaseCollection(sessionId: string, payload: any) {
  const res = await fetch(`${API_BASE}/collection`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Metabase-Session": sessionId,
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Failed to create collection: ${res.statusText}`);
  return await res.json();
}

/**
 * Fetches existing collections from Metabase.
 */
export async function getMetabaseCollections(sessionId: string) {
  const res = await fetch(`${API_BASE}/collection`, {
    method: "GET",
    headers: {
      "X-Metabase-Session": sessionId,
    },
  });
  if (!res.ok) throw new Error(`Failed to fetch collections: ${res.statusText}`);
  return await res.json();
}

/**
 * Provisions a new dashboard in Metabase.
 */
export async function createMetabaseDashboard(sessionId: string, payload: any) {
  const res = await fetch(`${API_BASE}/dashboard`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Metabase-Session": sessionId,
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error("Metabase Dashboard Creation Error:", errorText);
    throw new Error(`Failed to create dashboard: ${res.statusText}`);
  }

  return await res.json();
}

/**
 * Helper function to create a dashboard with a default collection if needed.
 */
export async function provisionDefaultDashboard(name: string = "New Dashboard") {
  const sessionId = await getMetabaseSession();
  
  // Try to use a shared "DOC Approvals" collection, creating it only if it doesn't exist.
  let collectionId = null;
  try {
    const collections = await getMetabaseCollections(sessionId);
    const existingColl = collections.find((c: any) => c.name === "DOC Approvals");
    
    if (existingColl) {
      collectionId = existingColl.id;
    } else {
      const collRes = await createMetabaseCollection(sessionId, {
        name: "DOC Approvals",
        color: "#509EE3",
        description: "Shared collection for all DOC Approval dashboards"
      });
      collectionId = collRes.id;
    }
  } catch (error) {
    console.warn("Could not manage collection, defaulting to root collection.", error);
  }

  // Create the dashboard
  const dashRes = await createMetabaseDashboard(sessionId, {
    name: name,
    collection_id: collectionId,
    description: "Provisioned automatically for analysis request.",
  });
  
  return dashRes; // Returns the dashboard object including its ID
}

/**
 * Attempts to retrieve original dashboard details from a public token URL.
 */
export async function getDashboardDetailsFromUrl(url: string): Promise<any | null> {
  try {
    const tokenMatch = url.match(/\/public\/dashboard\/([a-zA-Z0-9-]+)/);
    if (!tokenMatch) return null;
    
    const token = tokenMatch[1];
    
    const res = await fetch(`${API_BASE}/public/dashboard/${token}`);
    
    if (!res.ok) return null;
    
    return await res.json();
  } catch (e) {
    console.warn("Failed to fetch dashboard details by URL", e);
    return null;
  }
}
