# Money Transfers Application

Server Side Rendering

## 🌐 Live Demo

**Production:** [https://money-transfers.vercel.app](https://money-transfers.vercel.app)

**Example Page:** [https://money-transfers.vercel.app/transfers/overview](https://money-transfers.vercel.app/transfers/overview)

## 🚀 Quick Start

### Installation

```bash
npm install
```

### Development

```bash
npm start
```

Navigate to `http://localhost:4200/`

## 📐 Architecture

### Project Structure

```
src/app/
├── core/                          # Core application functionality
│   ├── api/                       # API layer
│   │   ├── clients/               # HTTP clients (transfers.client.ts)
│   │   ├── mocks/                 # Mock data for development
│   │   └── models/                # API response models
│   ├── constants/                 # Application-wide constants
│   ├── models/                    # Shared interfaces and types
│   └── services/                  # Global services
│
├── layout/                        # Layout components
├── pages/                         # Feature modules
│   └── transfers/                 # Transfers feature module
│       ├── constants/             # Feature-specific constants
│       ├── services/              # Feature services
│       │   ├── transfers.facade.ts    # Facade pattern
│       │   └── transfers.store.ts     # NgRx Signals store
│       ├── tabs/                  # Feature sub-routes
│       └── transfers.routes.ts   # Feature routing
└── shared/                        # Reusable code
    ├── classes/                   # Help classes
    ├── components/                # Shared UI components
    ├── directives/                # Custom directives
    ├── features/                  # Complex feature modules
    └── pipes/                     # Custom pipes
```

### Code Quality

- **ESLint**: Angular-specific linting rules
- **Prettier**: Code formatting
- **Husky + lint-staged**: Pre-commit hooks for quality checks
- **TypeScript Strict Mode**: Maximum type safety

## 🔒 Hide Data Feature

The "Hide Data" button in the header demonstrates empty state handling. When clicked, it clears all data from the store, showing how the application handles empty states gracefully.
