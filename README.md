# Frontend - Bus Ticket Booking System

A modern React-based frontend for the Bus Ticket Booking System, built with Vite, TypeScript, and Tailwind CSS.

## 🚀 Technologies

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Radix UI
- React Router
- date-fns

## 🛠️ Getting Started

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📦 Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview the production build

## 🏗️ Project Structure

```
frontend/
├── public/           # Static files
└── src/
    ├── components/   # Reusable UI components
    ├── pages/        # Page components
    ├── lib/         # Utility functions and configurations
    ├── styles/      # Global styles and Tailwind configuration
    └── App.tsx      # Main application component
```

## 🔧 Environment Variables

Create a `.env` file in the frontend directory with the following variables:

```
VITE_API_BASE_URL=http://localhost:8000
```

## 🧪 Testing

To run tests:
```bash
npm test
```

## 🔄 Development

This project uses Vite with the following plugins:
- `@vitejs/plugin-react` - For React Fast Refresh
- `@tailwindcss/vite` - For Tailwind CSS integration

## 🧹 Linting and Formatting

This project uses ESLint with TypeScript support. The configuration includes:
- TypeScript type checking
- React-specific rules
- Import sorting
- Code style consistency
## 🛠️ ESLint Configuration

This project comes with a pre-configured ESLint setup that includes:

```javascript
// .eslintrc.js
module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['react', '@typescript-eslint'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    // Custom rules can be added here
  },
};
```

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
