# SDKWork Service Template (TypeScript)

A TypeScript service template with a layered architecture following the principles of separation of concerns.

## Architecture Overview

This template implements a layered architecture with the following layers:

1. **API Layer** - Responsible for external API communications
2. **Repository Layer** - Manages data storage and retrieval
3. **Service Layer** - Contains business logic and orchestrates operations
4. **Controller Layer** - Handles incoming requests and responses

```
┌─────────────────┐
│   Controller    │←── Handles requests/responses
└─────────────────┘
         ↓
┌─────────────────┐
│    Service      │←── Business logic
└─────────────────┘
         ↓
┌─────────────────┐
│  Repository/API │←── Data access layer
└─────────────────┘
```

## Project Structure

```
src/
├── api/              # API clients for external services
├── controller/       # Request/response handlers
├── repository/       # Data access layer
├── service/          # Business logic layer
├── shared/           # Shared utilities
├── config/           # Configuration files
└── index.ts          # Main entry point
```

## Layer Responsibilities

### API Layer
- Communicates with external REST APIs
- Handles HTTP requests and responses
- Manages authentication and headers

### Repository Layer
- Manages data persistence
- Abstracts data storage mechanisms
- Provides CRUD operations

### Service Layer
- Implements business logic
- Orchestrates operations between repositories and APIs
- Handles transactions and data consistency

### Controller Layer
- Handles incoming requests
- Validates input data
- Formats responses

## Installation

```bash
npm install
```

## Building

```bash
npm run build
```

## Usage

The template provides base classes for each layer that you can extend:

1. Extend [BaseApiClient](src/api/BaseApiClient.ts) for API communications
2. Extend [BaseRepository](src/repository/BaseRepository.ts) for data management
3. Extend [BaseService](src/service/BaseService.ts) for business logic
4. Extend [BaseController](src/controller/BaseController.ts) for request handling

See the User example implementations:
- [UserService](src/service/UserService.ts)
- [UserRepository](src/repository/UserRepository.ts)
- [UserApiClient](src/api/UserApiClient.ts)
- [UserController](src/controller/UserController.ts)

## Examples

Creating a new service:

```typescript
import { BaseService } from './BaseService';
import { UserRepository } from '../repository/UserRepository';

class MyService extends BaseService {
  private repository: UserRepository;
  
  constructor() {
    super();
    this.repository = new UserRepository();
  }
  
  async doSomething(): Promise<any> {
    // Business logic here
  }
}
```