/**
 * @fileoverview API client for interacting with the backend server
 * @author Your Name
 * @lastModified 2024-02-24
 */

const API_URL = import.meta.env.VITE_API_URL;

/**
 * Generates an AI analysis based on the provided prompt
 * @param {string} prompt - The prompt to analyze
 * @returns {Promise<{ response: string; data?: any; type: string }>} The generated analysis and optional data
 */
export const generateAnalysis = async (prompt: string) => {
  // Mock response for now
  return {
    response: `Analysis for: ${prompt}`,
    type: 'analysis'
  };
};

/**
 * Retrieves data from the API
 * @param {string} endpoint - The API endpoint
 * @returns {Promise<T>} The API response
 */
export const getData = async <T>(endpoint: string): Promise<T> => {
  try {
    const response = await fetch(`${API_URL}${endpoint}`);
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error('API error:', error);
    throw error;
  }
};

/**
 * Sends data to the API
 * @param {string} endpoint - The API endpoint
 * @param {any} data - The data to send
 * @returns {Promise<T>} The API response
 */
export const postData = async <T>(endpoint: string, data: any): Promise<T> => {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error('API error:', error);
    throw error;
  }
};

/**
 * Updates data in the API
 * @param {string} endpoint - The API endpoint
 * @param {any} data - The data to update
 * @returns {Promise<T>} The API response
 */
export const putData = async <T>(endpoint: string, data: any): Promise<T> => {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error('API error:', error);
    throw error;
  }
};

/**
 * Deletes data from the API
 * @param {string} endpoint - The API endpoint
 * @returns {Promise<void>}
 */
export const deleteData = async (endpoint: string): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
  } catch (error) {
    console.error('API error:', error);
    throw error;
  }
};