import { BaseRepository } from '@/repositories/base.repository';
import { IPaginatedResult, IQueryOptions } from '@/interfaces/repository.interface';

// Example entity type
export interface ExampleEntity {
  id: string;
  name: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Example repository implementation
 * Demonstrates how to extend the BaseRepository class
 */
export class ExampleRepository extends BaseRepository<ExampleEntity, string> {
  private entities: Map<string, ExampleEntity> = new Map();

  constructor(dataSource: string) {
    super(dataSource);
  }

  /**
   * Find an entity by its identifier
   * @param id - The unique identifier of the entity
   * @returns The entity if found, otherwise null
   */
  async findById(id: string): Promise<ExampleEntity | null> {
    return this.entities.get(id) || null;
  }

  /**
   * Find all entities
   * @returns An array of all entities
   */
  async findAll(): Promise<ExampleEntity[]> {
    return Array.from(this.entities.values());
  }

  /**
   * Save or update an entity
   * @param entity - The entity to save
   * @returns The saved entity
   */
  async save(entity: ExampleEntity): Promise<ExampleEntity> {
    const now = new Date();
    const entityToSave = {
      ...entity,
      updatedAt: now,
      createdAt: entity.createdAt || now
    };
    
    this.entities.set(entityToSave.id, entityToSave);
    return entityToSave;
  }

  /**
   * Delete an entity by its identifier
   * @param id - The unique identifier of the entity to delete
   * @returns True if deletion was successful, otherwise false
   */
  async delete(id: string): Promise<boolean> {
    return this.entities.delete(id);
  }

  /**
   * Check if an entity exists by its identifier
   * @param id - The unique identifier to check
   * @returns True if the entity exists, otherwise false
   */
  async exists(id: string): Promise<boolean> {
    return this.entities.has(id);
  }

  /**
   * Find entities with pagination
   * @param options - Query options for pagination and filtering
   * @returns Paginated result with entities and metadata
   */
  async findWithPagination(options: IQueryOptions): Promise<IPaginatedResult<ExampleEntity>> {
    const allEntities = Array.from(this.entities.values());
    const total = allEntities.length;
    
    const page = options.page || 1;
    const pageSize = options.pageSize || 10;
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    
    const data = allEntities.slice(startIndex, endIndex);
    const totalPages = Math.ceil(total / pageSize);
    
    return {
      data,
      total,
      page,
      pageSize,
      totalPages
    };
  }

  /**
   * Find entities based on criteria
   * @param criteria - Search criteria
   * @returns Array of entities matching the criteria
   */
  async findByCriteria(criteria: Partial<ExampleEntity>): Promise<ExampleEntity[]> {
    const allEntities = Array.from(this.entities.values());
    
    return allEntities.filter(entity => {
      return Object.keys(criteria).every(key => {
        const criteriaValue = criteria[key as keyof ExampleEntity];
        const entityValue = entity[key as keyof ExampleEntity];
        
        if (criteriaValue === undefined) return true;
        return entityValue === criteriaValue;
      });
    });
  }

  /**
   * Find one entity based on criteria
   * @param criteria - Search criteria
   * @returns The first entity matching the criteria, or null if none found
   */
  async findOneByCriteria(criteria: Partial<ExampleEntity>): Promise<ExampleEntity | null> {
    const entities = await this.findByCriteria(criteria);
    return entities.length > 0 ? entities[0] : null;
  }

  /**
   * Count entities
   * @returns Total number of entities
   */
  async count(): Promise<number> {
    return this.entities.size;
  }

  /**
   * Count entities matching criteria
   * @param criteria - Search criteria
   * @returns Number of entities matching the criteria
   */
  async countByCriteria(criteria: Partial<ExampleEntity>): Promise<number> {
    const matchingEntities = await this.findByCriteria(criteria);
    return matchingEntities.length;
  }

  /**
   * Update an entity partially by its identifier
   * @param id - The unique identifier of the entity
   * @param updates - The partial updates to apply
   * @returns The updated entity
   */
  async update(id: string, updates: Partial<ExampleEntity>): Promise<ExampleEntity | null> {
    const entity = await this.findById(id);
    if (!entity) {
      return null;
    }

    const updatedEntity = {
      ...entity,
      ...updates,
      updatedAt: new Date()
    };

    this.entities.set(id, updatedEntity);
    return updatedEntity;
  }

  /**
   * Delete entities matching criteria
   * @param criteria - Search criteria
   * @returns Number of deleted entities
   */
  async deleteByCriteria(criteria: Partial<ExampleEntity>): Promise<number> {
    const entitiesToDelete = await this.findByCriteria(criteria);
    let deletedCount = 0;

    for (const entity of entitiesToDelete) {
      const deleted = await this.delete(entity.id);
      if (deleted) {
        deletedCount++;
      }
    }

    return deletedCount;
  }
}