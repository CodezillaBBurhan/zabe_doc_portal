import { Link } from 'react-router-dom';
import MaterialIcon from '../atoms/MaterialIcon';

/* ── Priority badge colours ── */
const P_COLORS = {
  Critical: { bg: '#FEE2E2', color: '#DC2626' },
  High:     { bg: '#FFEDD5', color: '#EA580C' },
  Medium:   { bg: '#FEF9C3', color: '#CA8A04' },
  Low:      { bg: '#F1F5F9', color: '#475569' },
};

/* ── Status badge colours ── */
const S_COLORS = {
  Pending:       { bg: '#F1F5F9', color: '#6B7280' },
  Assigned:      { bg: '#DBEAFE', color: '#2563EB' },
  'In Progress': { bg: '#EDE9FE', color: '#7C3AED' },
  Resolved:      { bg: '#DCFCE7', color: '#16A34A' },
};

/* ── Section header ── */
const Section = ({ title }) => (
  <p style={{ fontSize: 11, fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 12px' }}>
    {title}
  </p>
);

/* ── Label + value pair ── */
const Info = ({ label, children }) => (
  <div>
    <div style={{ fontSize: 11, color: '#9CA3AF', marginBottom: 3 }}>{label}</div>
    <div style={{ fontSize: 13, fontWeight: 600, color: '#111827' }}>{children}</div>
  </div>
);

/* ── Requester avatar initials ── */
function Avatar({ name }) {
  const initials = name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
  return (
    <div style={{
      width: 26, height: 26, borderRadius: '50%', background: '#DBEAFE',
      color: '#2563EB', fontSize: 10, fontWeight: 700,
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
    }}>
      {initials}
    </div>
  );
}

/* ── History step ── */
const HISTORY = [
  { label: 'Under Review',              sub: 'Currently awaiting action', done: false, active: true },
  { label: 'Assigned to Command Center', sub: '10:50 AM Today',           done: false, active: false },
  { label: 'Request Submitted',         sub: null,                        done: false, active: false },
];

/* ── Enrich each request with detail fields ── */
const DETAILS = {
  'REQ-8901': {
    subject:     'Deploy mobile units to Ward 4',
    description: 'Requesting immediate deployment of 3 additional mobile biometric verification units to Ward 4 collation center to handle overflow capacity.',
    justification:'Current units are experiencing intermittent network failure causing significant delays. Overflow crowd is growing.',
    location:    'Kano State > Kano Municipal > Ward 04',
    incident:    'INC-2024-089 (Hardware Failure)',
  },
  'REQ-8899': {
    subject:     'Security reinforcement at Oshodi collation centre',
    description: 'Requesting additional security personnel at Ward 11 collation centre due to reports of crowd unrest near the perimeter.',
    justification:'Intelligence reports indicate a potential escalation. Current personnel count is insufficient.',
    location:    'Lagos State > Oshodi-Isolo > Ward 11',
    incident:    null,
  },
  'REQ-8898': {
    subject:     'Technical support for malfunctioning BVAS devices',
    description: 'Two BVAS devices at HQ Node are returning authentication errors. Technician support needed urgently.',
    justification:'Without functional BVAS devices, biometric accreditation cannot proceed at this node.',
    location:    'Rivers State > Port Harcourt > HQ Node',
    incident:    'INC-2024-102 (Device Failure)',
  },
  'REQ-8895': {
    subject:     'Logistical support for ballot transport — Zone A',
    description: 'Requesting 2 armoured vehicles for secure ballot box transport from Zone A collation points to state HQ.',
    justification:'Standard vehicles were deemed insufficient by the security detail. Route assessment flagged risk level: High.',
    location:    'FCT Abuja > Abuja Municipal > Zone A',
    incident:    null,
  },
};

export default function RequestDetailDrawer({ request, onClose, onApprove, onReject }) {
  if (!request) return null;

  const pStyle  = P_COLORS[request.priority] || P_COLORS.Low;
  const sStyle  = S_COLORS[request.status]   || S_COLORS.Pending;
  const details = DETAILS[request.id]        || {};

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.22)', zIndex: 200, backdropFilter: 'blur(1px)' }}
      />

      {/* Panel */}
      <div style={{
        position: 'fixed', top: 0, right: 0, bottom: 0, width: 460,
        background: '#fff', zIndex: 201,
        display: 'flex', flexDirection: 'column',
        boxShadow: '-8px 0 32px rgba(0,0,0,0.12)',
        animation: 'drawerIn .22s cubic-bezier(.4,0,.2,1)',
      }}>
        <style>{`@keyframes drawerIn{from{transform:translateX(100%)}to{transform:translateX(0)}}`}</style>

        {/* ── Header ── */}
        <div style={{ padding: '18px 22px', borderBottom: '1px solid #F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <h2 style={{ margin: 0, fontSize: 17, fontWeight: 700, color: '#111827' }}>Approval Details</h2>
            <span style={{ fontSize: 11, fontWeight: 600, padding: '3px 8px', borderRadius: 999, background: sStyle.bg, color: sStyle.color }}>
              {request.status}
            </span>
          </div>
          <button onClick={onClose} style={{ width: 30, height: 30, border: 'none', background: '#F3F4F6', borderRadius: 6, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6B7280' }}>
            <MaterialIcon icon="close" className="text-[16px]" />
          </button>
        </div>

        {/* ── Scrollable body ── */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px 22px' }}>

          {/* REQUEST INFORMATION */}
          <div style={{ marginBottom: 22 }}>
            <Section title="REQUEST INFORMATION" />
            <div style={{ border: '1px solid #E5E7EB', borderRadius: 10, padding: 16, background: '#FAFAFA', display: 'flex', flexDirection: 'column', gap: 14 }}>
              {/* Row 1: ID + Priority */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <Info label="Request ID">{request.id}</Info>
                <div>
                  <div style={{ fontSize: 11, color: '#9CA3AF', marginBottom: 6 }}>Priority</div>
                  <span style={{ fontSize: 12, fontWeight: 600, padding: '3px 10px', borderRadius: 999, background: pStyle.bg, color: pStyle.color }}>
                    {request.priority}
                  </span>
                </div>
              </div>

              {/* Subject */}
              <div>
                <div style={{ fontSize: 11, color: '#9CA3AF', marginBottom: 3 }}>Subject</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#111827' }}>{details.subject || '—'}</div>
              </div>

              {/* Requested By + Time */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <div style={{ fontSize: 11, color: '#9CA3AF', marginBottom: 6 }}>Requested By</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                    <Avatar name={request.requester} />
                    <span style={{ fontSize: 13, fontWeight: 600, color: '#111827' }}>{request.requester}</span>
                  </div>
                </div>
                <Info label="Time">{request.time} Today</Info>
              </div>
            </div>
          </div>

          {/* REQUEST DETAILS */}
          <div style={{ marginBottom: 22 }}>
            <Section title="REQUEST DETAILS" />
            <div style={{ border: '1px solid #E5E7EB', borderRadius: 10, padding: 16, background: '#FAFAFA', display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <div style={{ fontSize: 11, color: '#9CA3AF', marginBottom: 4 }}>Operational Description</div>
                <div style={{ fontSize: 13, color: '#374151', lineHeight: 1.6 }}>{details.description || '—'}</div>
              </div>
              <div>
                <div style={{ fontSize: 11, color: '#9CA3AF', marginBottom: 4 }}>Reason / Justification</div>
                <div style={{ fontSize: 13, color: '#374151', lineHeight: 1.6 }}>{details.justification || '—'}</div>
              </div>
            </div>
          </div>

          {/* RELATED INFORMATION */}
          <div style={{ marginBottom: 22 }}>
            <Section title="RELATED INFORMATION" />
            <div style={{ border: '1px solid #E5E7EB', borderRadius: 10, padding: 16, background: '#FAFAFA', display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#374151' }}>
                <MaterialIcon icon="location_on" className="text-[15px]" style={{ color: '#9CA3AF' }} />
                {details.location || `${request.location} > ${request.locationSub}`}
              </div>
              {details.incident && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13 }}>
                  <MaterialIcon icon="link" className="text-[15px]" style={{ color: '#9CA3AF' }} />
                  <span style={{ color: '#2563EB', fontWeight: 500, cursor: 'pointer', textDecoration: 'underline' }}>
                    {details.incident}
                  </span>
                </div>
              )}
              {!details.incident && (
                <div style={{ fontSize: 12, color: '#9CA3AF', fontStyle: 'italic' }}>No linked incidents</div>
              )}
            </div>
          </div>

          {/* PUBLIC LINK ASSIGNMENT */}
          <div style={{ marginBottom: 22 }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
              <Section title="PUBLIC LINK ASSIGNMENT" />
              <Link to="/links/create" style={{ fontSize: 11, fontWeight: 600, color: '#EA580C', display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                <MaterialIcon icon="add" style={{ fontSize: 12, marginRight: 2 }} />
                Create Public Link
              </Link>
            </div>
            <div style={{ position: 'relative', marginTop: -4 }}>
              <select style={{ width: '100%', padding: '10px 12px', paddingRight: 40, fontSize: 13, border: '1px solid #E5E7EB', borderRadius: 10, outline: 'none', color: '#111827', appearance: 'none', background: '#FAFAFA', cursor: 'pointer', fontWeight: 500 }}>
                <option value="">Select Existing Link...</option>
                <option value="kano">Kano North</option>
                <option value="lagos">Lagos Central</option>
              </select>
              <MaterialIcon icon="expand_more" style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: '#9CA3AF', pointerEvents: 'none', fontSize: 18 }} />
            </div>
          </div>

          {/* HISTORY */}
          <div>
            <Section title="HISTORY" />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {HISTORY.map((step, i) => (
                <div key={i} style={{ display: 'flex', gap: 14, position: 'relative' }}>
                  {/* Connector line */}
                  {i < HISTORY.length - 1 && (
                    <div style={{ position: 'absolute', left: 10, top: 22, bottom: -4, width: 2, background: '#E5E7EB', zIndex: 0 }} />
                  )}
                  {/* Dot */}
                  <div style={{
                    width: 20, height: 20, borderRadius: '50%', flexShrink: 0, marginTop: 2, zIndex: 1,
                    border: step.active ? '2px solid #2563EB' : '2px solid #D1D5DB',
                    background: step.active ? '#EFF6FF' : '#fff',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    {step.active && <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#2563EB' }} />}
                  </div>
                  {/* Text */}
                  <div style={{ paddingBottom: 20 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: step.active ? '#111827' : '#6B7280' }}>{step.label}</div>
                    {step.sub && <div style={{ fontSize: 12, color: '#9CA3AF', marginTop: 2 }}>{step.sub}</div>}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* ── Footer actions ── */}
        <div style={{ padding: '14px 22px', borderTop: '1px solid #F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 10, flexShrink: 0, background: '#fff' }}>
          <button
            onClick={() => { onReject && onReject(request); onClose(); }}
            style={{ height: 36, padding: '0 20px', borderRadius: 8, border: '1px solid #FCA5A5', background: '#fff', fontSize: 13, fontWeight: 600, color: '#DC2626', cursor: 'pointer' }}
          >
            Reject
          </button>
          <button
            onClick={() => { onApprove && onApprove(request); onClose(); }}
            style={{ height: 36, padding: '0 20px', borderRadius: 8, border: 'none', background: '#FF5A1F', fontSize: 13, fontWeight: 600, color: '#fff', cursor: 'pointer', boxShadow: '0 1px 3px rgba(255,90,31,0.35)' }}
          >
            Approve Request
          </button>
        </div>
      </div>
    </>
  );
}
