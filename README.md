# Reusable User Data Grid

A responsive React + TypeScript application that displays a reusable data grid of users fetched from [JSONPlaceholder](https://jsonplaceholder.typicode.com/users). The project focuses on a clean admin-dashboard style layout, Arabic RTL support, and strong table interactions such as filtering, searching, pagination, and row selection.

## Project Overview

This app is designed to demonstrate a reusable and production-friendly table component for working with structured data. It loads user records from a public API, normalizes the data for display, and provides a rich set of interactions without mutating the original API response.

The UI is built with Material UI and the MUI Data Grid, providing a modern interface and useful table features out of the box.

## Features

### 1. User data loading from API
- Fetches user records from JSONPlaceholder.
- Uses a dedicated API layer in `src/api/user.ts`.
- Handles request cancellation via `AbortController`.
- Includes retry support when the request fails.

### 2. Loading, error, and empty states
- Shows a loading indicator while the request is in progress.
- Displays a friendly error alert when fetching fails.
- Includes a retry button to re-fetch the users.
- Shows an empty-state component when no rows match the current filters or search.

### 3. Debounced global search
- Search works across the main user fields:
  - name
  - username
  - email
  - phone
  - website
- Searching is debounced to reduce unnecessary re-renders and improve performance.
- Search resets pagination back to the first page when the user types a new value.

### 4. Multi-column filtering
- Supports simultaneous filtering for table columns.
- Includes text-based filtering and selection-based filtering.
- The company and city filter values are generated dynamically from the fetched users.
- This is handled through the MUI Data Grid filter UI and column definitions.

### 5. Client-side pagination
- Supports pagination with page size options:
  - 5
  - 10
  - 25
  - 50
  - 100
- Pagination is managed on the client side using the Data Grid model.
- Keeps the overall experience fast and simple for this dataset.

### 6. Row selection
- Allows selecting rows individually.
- Allows selecting multiple rows.
- Includes select-all functionality via the built-in Data Grid checkbox selection.
- Selection is useful for future bulk actions or data review workflows.

### 7. Data normalization for display
- Keeps the fetched API dataset intact.
- Converts nested fields like `user.company.name` and `user.address.city` into flat table fields for display.
- This improves compatibility with grid columns and makes data easier to render and filter.

### 8. RTL and Arabic interface support
- The app is configured with `direction: "rtl"`.
- Arabic labels are used for table headers and UI prompts.
- The layout supports a right-to-left admin dashboard feel.

### 9. Export to CSV
- The table toolbar includes a CSV export option through MUI Data Grid utilities.
- This makes the data easy to download for reporting or offline review.

### 10. Modern layout and styling
- Includes a fixed app bar and collapsible sidebar.
- Uses Material UI theme configuration with custom primary colors.
- Provides a polished, dashboard-style layout for table-heavy interfaces.

## Tech Stack

- React 19
- TypeScript
- Vite
- Material UI
- MUI X Data Grid
- ESLint

## Project Structure

```text
src/
├── api/
│   └── user.ts                  # Fetches users from the API
├── components/
│   └── shared/
│       ├── GenericTable/
│       │   ├── DataTable.tsx    # Reusable table component
│       │   └── EmptyState.tsx   # Empty-state UI
│       ├── MainHeader/
│       │   └── MainHeader.tsx   # Top page header
│       └── sidebar/
│           ├── Sidebar.tsx      # Sidebar navigation
│           └── SidebarHeader.tsx
├── config/
│   └── theme.ts                 # Theme and styling config
├── hooks/
│   └── useDebounced.ts          # Debounce logic for search
├── layout/
│   └── main.tsx                 # Main application layout
├── pages/
│   └── Users.tsx                # Main users page logic
├── types/
│   └── users.ts                 # User and row type definitions
├── utils/
│   └── transformUser.ts         # Normalizes API data for display
├── App.tsx                      # Root app component
├── main.tsx                     # Application bootstrap
├── index.css                    # Global styles
└── ...
```

## Data Model

The raw API response contains nested information like:

```ts
{
  id: 1,
  name: "Leanne Graham",
  username: "Bret",
  email: "Sincere@april.biz",
  phone: "1-770-736-8031 x56442",
  website: "hildegard.org",
  company: {
    name: "Romaguera-Crona"
  },
  address: {
    city: "Gwenborough"
  }
}
```

For table display, the app transforms it into a flat row structure:

```ts
{
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  company: string;
  city: string;
}
```

## Getting Started

### Install dependencies

```bash
pnpm install
```

### Run the app in development mode

```bash
pnpm dev
```

### Build for production

```bash
pnpm build
```

### Lint the project

```bash
pnpm lint
```

## Scripts

The project includes the following scripts in `package.json`:

- `pnpm dev` — starts the Vite development server
- `pnpm build` — runs TypeScript compilation and production build
- `pnpm lint` — checks the project with ESLint
- `pnpm preview` — previews the production build locally

## Notes

- The app uses a public API, so it depends on external network access.
- The data is intentionally not mutated; transformation is done only for display purposes.
- The design is highly reusable and can be adapted for other datasets beyond users.

## Summary

This project is a complete example of a reusable admin-style data table built with React and Material UI. It demonstrates how to fetch remote data, normalize it for UI rendering, and support powerful interactions such as search, filtering, pagination, export, and row selection in an Arabic RTL interface.
