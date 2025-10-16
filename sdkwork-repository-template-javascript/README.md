# SDKWork Repository Template (JavaScript/TypeScript)

This is a template for creating repository modules within the SDKWork architecture. It provides a standardized foundation for building data access layers that are consistent, maintainable, and scalable.

## Overview

Repository pattern implementations using this template should provide a clean abstraction between the domain logic and the data access logic. This pattern promotes separation of concerns and makes unit testing easier.

## Features

- TypeScript support with full type safety
- Pre-configured build system
- Standardized project structure following the Repository pattern
- Extensible base repository class
- Interface definitions for repository contracts
- Factory functions for repository creation
- ESLint configuration for code quality
- Jest configuration for testing
- Example implementation to get started quickly

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone this template repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Building

To compile TypeScript to JavaScript:
```bash
npm run build
```

This will generate JavaScript files in the `dist` directory.

### Development

1. Modify the source code in the `src` directory
2. Add your specific repository implementation
3. Run tests with `npm test`
4. Build with `npm run build`

## Project Structure

```
src/
├── index.ts                  # Main entry point
├── interfaces/               # Shared interfaces
│   └── repository.interface.ts # Repository interface definitions
├── repositories/             # Repository implementations
│   ├── base.repository.ts    # Abstract base repository class
│   └── example.repository.ts # Example concrete implementation
├── types/                    # Custom types (add your types here)
└── utils/                    # Utility functions (add your utilities here)
```

## Usage

### Basic Usage

```typescript
import { ExampleRepository, createExampleRepository } from './src';

// Create a repository instance
const repository = createExampleRepository('your-data-source');

// Use the repository methods
const data = await repository.findById('item-id');
await repository.save({ id: 'item-id', name: 'Item Name' });
```

### Creating Custom Repositories

To create a specific repository implementation:

1. Extend the [BaseRepository](src/repositories/base.repository.ts) class
2. Implement the abstract methods
3. Add any additional functionality required

Example:
```typescript
import { BaseRepository } from './src/repositories/base.repository';

interface User {
  id: string;
  name: string;
  email: string;
}

class UserRepository extends BaseRepository<User, string> {
  constructor(dataSource: string) {
    super(dataSource);
    // Initialize your data source connection
  }
  
  async findById(id: string): Promise<User | null> {
    // Implementation here
    return null;
  }
  
  async findAll(): Promise<User[]> {
    // Implementation here
    return [];
  }
  
  async save(user: User): Promise<User> {
    // Implementation here
    return user;
  }
  
  async delete(id: string): Promise<boolean> {
    // Implementation here
    return true;
  }
  
  async exists(id: string): Promise<boolean> {
    // Implementation here
    return false;
  }
  
  async findWithPagination(options: IQueryOptions): Promise<IPaginatedResult<User>> {
    // Implementation here
    // Return paginated result
  }
  
  async findByCriteria(criteria: Partial<User>): Promise<User[]> {
    // Implementation here
    return [];
  }
  
  async count(): Promise<number> {
    // Implementation here
    return 0;
  }
  
  async countByCriteria(criteria: Partial<User>): Promise<number> {
    // Implementation here
    return 0;
  }
}
```

## Configuration

The template includes several configuration files:

- [tsconfig.json](tsconfig.json) - TypeScript compiler options
- [package.json](package.json) - Project dependencies and scripts
- [.eslintrc.js](.eslintrc.js) - ESLint configuration
- [jest.config.js](jest.config.js) - Jest testing configuration
- [.gitignore](.gitignore) - Files and directories to ignore in Git

## Available Scripts

- `npm run build` - Compile TypeScript to JavaScript
- `npm run clean` - Remove compiled JavaScript files
- `npm test` - Run tests with Jest
- `npm run lint` - Check code quality with ESLint

## Contributing

When using this template:

1. Follow the existing code style
2. Add appropriate tests for new functionality
3. Update documentation as needed
4. Ensure all tests pass before submitting changes

## License

This project is licensed under the MIT License.