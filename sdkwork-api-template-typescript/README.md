# SDKWork API Template - TypeScript

This is a template for creating SDK libraries in TypeScript.

## Project Structure

```
src/
├── api/       # API related functionality
├── lib/       # Core library functions
├── types/     # Type definitions
└── index.ts   # Main entry point
```

## Installation

```bash
npm install
```

## Building

```bash
npm run build
```

This will compile TypeScript files from `src/` to `dist/` directory.

## Usage

After building, you can import the SDK in your project:

```typescript
import sdk from 'sdkwork-api-template-typescript';

// Use the SDK
```