# Zabe Shared Components Library

This document outlines the standard reusable components and utilities available in this project. Use these components to ensure UI/UX consistency, accessibility, and adherence to the Atomic Design system.

## Components Decision Guide

### Which Button Variant Should I Use?
To prevent the variant count from growing unnecessarily, always consult this guide before adding custom Tailwind overrides to `<Button>`:

| Importance / Context | Suggested Variant | Example Use Case |
| -------------------- | ----------------- | ---------------- |
| **Primary Action** (High emphasis) | `primary` | "Save Changes", "Create New Request" |
| **Secondary Action** (Medium emphasis) | `secondary` | "Cancel", "Clear All", "Close Modal" |
| **Destructive** (Irreversible) | `danger` | "Delete User", "Revoke Access" (Modal confirmations) |
| **Destructive Light** (Reversible/Lesser) | `dangerLight` | "Disconnect Screen", "Remove Item" (List actions) |
| **Tertiary** (Low emphasis) | `ghost` | Icon-only actions (Edit, Copy, Trash) in tables |
| **Accent / Highlight** | `primaryLight` | "View Profile", "Select All" (Orange tinted, soft) |
| **Important Nav / Filter** | `ghostPrimary` | "View All", "Clear Filters" (Transparent, orange text) |
| **Navigational Link** | `ghostInfo` | "Configure", "Manage" (Transparent, blue text) |

---

## Atoms

### `<Button>`
**Description:** Centralized action component with built-in loading states, icons, and 8 standard variants.

**Props:**
- `children` (ReactNode): Button text/content.
- `variant` (String, default `'primary'`): One of `primary`, `secondary`, `danger`, `dangerLight`, `ghost`, `primaryLight`, `ghostPrimary`, `ghostInfo`.
- `icon` (String, optional): Material icon name for left icon.
- `iconRight` (String, optional): Material icon name for right icon.
- `isLoading` (Boolean, default `false`): Disables button and shows spinner.
- `disabled` (Boolean, default `false`): Disables button.
- `className` (String, optional): Custom override classes.
- `type` (String, default `'button'`): HTML button type.

**Usage:**
```jsx
<Button variant="primary" icon="add" onClick={handleCreate}>
  Create Role
</Button>
```

### `<Input>`
**Description:** Centralized text input field with support for icons, labels, and error states.

**Props:**
- `label` (String, optional): Floating or top label.
- `id` (String, optional): Unique ID for accessibility (auto-generated if missing).
- `type` (String, default `'text'`): HTML input type.
- `placeholder` (String, optional): Placeholder text.
- `value` (Any): Input value.
- `onChange` (Function): Change handler.
- `error` (String, optional): Error message (turns input red).
- `icon` (String, optional): Left-aligned Material icon.
- `className` (String, optional): Custom override classes.
- `disabled` (Boolean, default `false`): Disables input.

**Usage:**
```jsx
<Input 
  icon="search" 
  placeholder="Search links..." 
  value={search} 
  onChange={(e) => setSearch(e.target.value)} 
/>
```

### `<Badge>`
**Description:** Status indicator for displaying system states in tables and cards.

**Props:**
- `status` (String): The status name to match against variants.

**Variants:**
- `Active` / `Success` / `Low`: Green (`bg-green-100 text-green-700`)
- `Pending` / `Medium`: Yellow (`bg-yellow-100 text-yellow-700`)
- `High`: Orange (`bg-orange-100 text-orange-700`)
- `Error` / `Critical`: Red (`bg-red-100 text-red-700`)
- `Info` / `Audited`: Blue (`bg-blue-100 text-blue-800`)
- `Default` / `Archived` / `Inactive`: Gray (`bg-gray-100 text-gray-600`)
- `Expiring`: Light Yellow (`bg-[#fef7e0] text-[#f29900]`)
- `Revoked`: Light Red (`bg-[#fce8e6] text-[#d93025]`)

**Usage:**
```jsx
<Badge status="Active" />
```

### `<Avatar>`
**Description:** User profile image display with automatic initials fallback when image fails to load.

**Props:**
- `src` (String): Image URL.
- `name` (String): Full name used to generate initials if `src` is invalid.
- `size` (String, default `'md'`): `sm`, `md`, `lg`, `xl`.
- `className` (String, optional): Custom override classes.

**Usage:**
```jsx
<Avatar src="/path/to/img.jpg" name="John Doe" size="lg" />
```

---

## Molecules

### `<PageHeader>`
**Description:** Standardized layout for page titles, descriptions, and top-level action buttons.

**Props:**
- `title` (String): The main `<h1>` title.
- `description` (String, optional): Subtitle text.
- `children` (ReactNode, optional): Action buttons (e.g., `<Button>`) rendered on the right.
- `className` (String, optional): Custom wrapper classes.

**Usage:**
```jsx
<PageHeader 
  title="Public Links" 
  description="Manage secure public-facing election information links."
>
  <Button icon="add">Create Link</Button>
</PageHeader>
```

---

## Utilities

### `formatters.js`
**Description:** Centralized formatting functions to prevent inline string manipulation inconsistencies.

**Available Functions:**
- `formatDate(dateInput)`: Returns `DD Mon YYYY` (e.g., `21 Aug 2026`).
- `formatDateTime(dateInput)`: Returns `DD Mon YYYY, HH:MM` (e.g., `21 Aug 2026, 16:21`).
- `formatTime(dateInput)`: Returns `HH:MM AM/PM` (e.g., `04:21 PM`).

**Usage:**
```jsx
import { formatDate } from '../utils/formatters';

<span>{formatDate(user.createdAt)}</span>
```
