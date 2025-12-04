# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is Jon Troncoso's personal resume website built as a React Native app using Expo with NativeWind for styling. It's designed to deploy to iOS, Android, and Web from a single codebase, though currently deployed only as a static web app.

## Commands

```bash
# Development
npm start           # Start Expo dev server
npm run web         # Start web development server
npm run ios         # Run on iOS simulator
npm run android     # Run on Android emulator

# Code Quality
npm run lint        # Run ESLint and Prettier check
npm run format      # Fix ESLint and Prettier issues

# Build & Deploy
npm run build:web   # Build static web export to ./dist
npm run deploy      # Build + deploy to AWS via Terraform (S3/CloudFront)
```

## Architecture

### Stack
- **Framework**: Expo SDK 54 with expo-router (file-based routing)
- **Styling**: NativeWind (TailwindCSS for React Native) with CSS variables for theming
- **State**: Zustand with persist middleware (sessionStorage on web, AsyncStorage on native)
- **Infrastructure**: Terraform deploying to AWS S3 + CloudFront + Route53

### Key Directories
- `app/` - Expo Router pages (currently just index.tsx and layout)
- `components/` - Reusable React components
- `providers/` - React context providers (ThemeProvider)
- `store/` - Zustand stores (dark mode, scroll position)
- `utils/` - Helpers (color-theme.ts for CSS vars, resume.ts for data)
- `infra/` - Terraform configuration for AWS deployment

### Theming System
Theme colors are defined in `utils/color-theme.ts` using NativeWind's `vars()`. The `ThemeProvider` applies these CSS variables based on the current dark mode state from Zustand. Colors use a numbered scale (--color-50 through --color-900) that inverts for dark mode.

### Path Aliases
TypeScript is configured with `~/*` mapping to the project root, e.g., `import { useDarkMode } from '~/store/store'`.
