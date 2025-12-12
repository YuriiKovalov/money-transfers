# Money Transfers – Overview Page - Test Task

## 1. Tech Requirements

- Use **Angular** (latest version, currently v20+).
- Use **SCSS** or **TailwindCSS** (developer may choose, but structure must be clean and reusable).
- No UI libraries (e.g., no Angular Material, PrimeNG, ng-bootstrap).
- Chart should be implemented using **Chart.js** (or other library like ng2-charts).
- Data (chart, accounts, table rows) can be generated with ChatGPT or mocked manually.

## 2. Page Structure

Implement the page exactly as shown on the layout:

### A. Header Navigation
- Tabs: Overview, Deposit, Withdraw, History
- Highlight the active tab based on route.
- Links can be dummy, but Overview must be active.
- Use Angular Router for navigation.

### B. Account Balance Chart
- Line chart displaying 12 "weeks" with mock values.
- Tooltip on hover (can be simple).
- Button "Last 90 days" without functionality (UI only).

### C. Connected Accounts Section
Two blocks:
- **Wire Accounts**
- **Plaid Accounts (ACH)**

Each block must include:
- Bank card styling (icon, masked account number).
- "Add New Wire Account" (link, no modal required).
- "Connect New via Plaid" (link, no functionality).

### D. Recent Transfers Table
- Tabs: All / Wire / ACH (filter mock data on client side).
- Table columns: Date, Type, Method, Account, Amount, Status.
- Status should have colored labels: Pending, Completed, Rejected.
- "Last 7 Days" button (UI only, no functionality).

## 3. Responsiveness

Page must be fully adaptive with breakpoints:
- **1440px and above** → full desktop layout
- **1240px - 1439.98px**
- **1024px - 1239.98px**
- **905px - 1023.98px**
- **600px - 904.98px**
- **< 600px** → mobile:
  - Sections stack vertically
  - Table becomes card-style or scrollable horizontally
  - Tabs become scrollable or stacked
  - Developer may choose the best approach but layout must stay clean and usable.

## 4. Code Quality Requirements

- Use Angular best practices:
  - Standalone components
  - Signals (for reactive state)
  - `@Input()`, `@Output()`, `computed()`, `effect()` where appropriate
  - `*ngFor`, `*ngIf`, `*ngSwitch` for templating
  - Services for data management
  - Pipes for data transformation
- Use a clean, consistent folder structure:
  ```
  src/app/
    ├── components/
    │   ├── header/
    │   ├── chart/
    │   ├── accounts/
    │   └── transfers-table/
    ├── pages/
    │   └── overview/
    ├── services/
    ├── models/
    └── shared/
  ```
- Follow **BEM naming** OR **Tailwind utility consistency**.
- Code should be readable, formatted, and logically organized.
- Use TypeScript strictly typed interfaces/models.

## 5. Extra Requirements (Optional but scored)

- Dark mode support (simple color switcher using signals).
- Basic hover/focus transitions.
- Bank icons: simple placeholder letters inside circles (no external icons).
- Loading states for async operations (even if mocked).

## 6. Deliverables

- Public GitHub repo with the project.
- Clear README with:
  - How to run the project (`ng serve`, `npm install`, etc.)
  - Short breakdown of the architecture
  - Tech stack used
  - Project structure explanation

## 7. Implementation Notes

### Angular-Specific Considerations

- Use **Angular Signals** for reactive state management where appropriate.
- Implement routing with **Angular Router**.
- Use **Standalone Components** (no NgModules).
- For Chart.js integration, consider using `ng2-charts` or direct Chart.js with proper lifecycle hooks.
- Use **Angular Services** for data mocking and business logic.
- Implement responsive design using CSS Grid/Flexbox with Tailwind utilities or SCSS media queries.

### Mock Data Structure

```typescript
// Example interfaces
interface Account {
  id: string;
  type: 'wire' | 'plaid';
  bankName: string;
  accountNumber: string; // masked
  icon: string; // placeholder letter
}

interface Transfer {
  id: string;
  date: Date;
  type: string;
  method: 'wire' | 'ach';
  account: string;
  amount: number;
  status: 'pending' | 'completed' | 'rejected';
}

interface ChartDataPoint {
  week: number;
  value: number;
}
```

## 8. Evaluation Criteria

- ✅ Correct implementation of all UI elements
- ✅ Responsive design across all breakpoints
- ✅ Clean, maintainable code structure
- ✅ Proper use of Angular features and best practices
- ✅ Code formatting and consistency
- ✅ README quality and completeness
- ⭐ Bonus: Dark mode, smooth transitions, polished UI

