/**
 * @fileoverview Database management utilities
 * @author Your Name
 * @lastModified 2024-02-24
 */

import { getCache, setCache } from './redis';

const API_URL = import.meta.env.VITE_API_URL;

interface DatabaseConfig {
  host: string;
  port: string;
  database: string;
  username: string;
  password: string;
  ssl: boolean;
}

interface Table {
  name: string;
  columns: Array<{
    name: string;
    type: string;
    nullable: boolean;
    defaultValue?: string;
  }>;
}

interface Relation {
  name: string;
  sourceTable: string;
  targetTable: string;
  sourceColumn: string;
  targetColumn: string;
  type: 'one-to-one' | 'one-to-many' | 'many-to-many';
}

/**
 * Tests the database connection
 * @param {DatabaseConfig} config - Database configuration
 * @returns {Promise<{ success: boolean; error?: string }>}
 */
export const testConnection = async (config: DatabaseConfig) => {
  try {
    const response = await fetch(`${API_URL}/api/database/test`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(config),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Connection test error:', error);
    throw new Error('Failed to test connection');
  }
};

/**
 * Saves the database connection configuration
 * @param {DatabaseConfig} config - Database configuration
 */
export const saveConnection = async (config: DatabaseConfig) => {
  try {
    const response = await fetch(`${API_URL}/api/database/connection`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(config),
    });

    if (!response.ok) {
      throw new Error('Failed to save connection');
    }
  } catch (error) {
    console.error('Save connection error:', error);
    throw error;
  }
};

/**
 * Retrieves all tables from the database
 * @returns {Promise<Table[]>}
 */
export const getTables = async (): Promise<Table[]> => {
  try {
    // Check cache first
    const cached = await getCache<Table[]>('database:tables');
    if (cached) return cached;

    const response = await fetch(`${API_URL}/api/database/tables`);
    const tables = await response.json();

    // Cache the results
    await setCache('database:tables', tables, 300); // Cache for 5 minutes
    
    return tables;
  } catch (error) {
    console.error('Get tables error:', error);
    throw new Error('Failed to get tables');
  }
};

/**
 * Creates a new table in the database
 * @param {Table} table - Table configuration
 */
export const createTable = async (table: Table) => {
  try {
    const response = await fetch(`${API_URL}/api/database/tables`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(table),
    });

    if (!response.ok) {
      throw new Error('Failed to create table');
    }

    // Invalidate tables cache
    await getCache('database:tables');
  } catch (error) {
    console.error('Create table error:', error);
    throw error;
  }
};

/**
 * Deletes a table from the database
 * @param {string} tableName - Name of the table to delete
 */
export const deleteTable = async (tableName: string) => {
  try {
    const response = await fetch(`${API_URL}/api/database/tables/${tableName}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete table');
    }

    // Invalidate tables cache
    await getCache('database:tables');
  } catch (error) {
    console.error('Delete table error:', error);
    throw error;
  }
};

/**
 * Creates a new relation between tables
 * @param {Relation} relation - Relation configuration
 */
export const createRelation = async (relation: Relation) => {
  try {
    const response = await fetch(`${API_URL}/api/database/relations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(relation),
    });

    if (!response.ok) {
      throw new Error('Failed to create relation');
    }
  } catch (error) {
    console.error('Create relation error:', error);
    throw error;
  }
};

/**
 * Retrieves all relations from the database
 * @returns {Promise<Relation[]>}
 */
export const getRelations = async (): Promise<Relation[]> => {
  try {
    // Check cache first
    const cached = await getCache<Relation[]>('database:relations');
    if (cached) return cached;

    const response = await fetch(`${API_URL}/api/database/relations`);
    const relations = await response.json();

    // Cache the results
    await setCache('database:relations', relations, 300); // Cache for 5 minutes
    
    return relations;
  } catch (error) {
    console.error('Get relations error:', error);
    throw new Error('Failed to get relations');
  }
};