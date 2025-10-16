/**
 * SDKWork Repository Template
 * 
 * This is a template for repository modules in the SDKWork architecture.
 * It provides a foundation for building consistent, well-structured repositories
 * that can be used across different projects.
 */

// Export interfaces
export * from './interfaces/repository.interface';

// Export base classes
export * from './repositories/base.repository';

// Export example implementation
export * from './repositories/example.repository';

// Import ExampleRepository for use in factory function
import { ExampleRepository } from './repositories/example.repository';

/**
 * Example factory function for creating repositories
 * @param dataSource - The data source connection string
 * @returns A new instance of ExampleRepository
 */
export function createExampleRepository(dataSource: string): ExampleRepository {
  return new ExampleRepository(dataSource);
}