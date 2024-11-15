/**
 * @fileoverview Ollama AI integration for text generation and analysis
 * @author Your Name
 * @lastModified 2024-02-24
 * 
 * This file provides functions for interacting with the Ollama API,
 * including text generation and data analysis with caching support.
 */

import { getCache, setCache } from './redis';

const OLLAMA_API_URL = process.env.OLLAMA_API_URL || 'http://localhost:11434';
const CACHE_EXPIRY = 3600; // 1 hour

export interface OllamaResponse {
  response: string;
  context?: number[];
}

/**
 * Generates text using the Ollama API with caching
 * @param {string} prompt - The input prompt
 * @param {string} [model='llama2'] - The model to use
 * @returns {Promise<string>} The generated text
 * @throws {Error} If the API request fails
 * @example
 * const response = await generateAnalysis('Analyze this data');
 */
export const generateAnalysis = async (
  prompt: string,
  model: string = 'llama2'
): Promise<string> => {
  try {
    // Check cache first
    const cacheKey = `ollama:${model}:${prompt}`;
    const cachedResponse = await getCache<string>(cacheKey);
    if (cachedResponse) {
      return cachedResponse;
    }

    const response = await fetch(`${OLLAMA_API_URL}/api/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model,
        prompt,
        stream: false,
        options: {
          temperature: 0.7,
          top_p: 0.9,
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`Ollama API error: ${response.status} ${JSON.stringify(errorData)}`);
    }

    const data: OllamaResponse = await response.json();
    
    // Cache the response
    await setCache(cacheKey, data.response, CACHE_EXPIRY);
    
    return data.response;
  } catch (error) {
    console.error('Error generating analysis:', error);
    throw new Error('Failed to generate analysis. Please try again later.');
  }
};

/**
 * Analyzes data using Ollama
 * @param {any} data - The data to analyze
 * @param {string} type - The type of data being analyzed
 * @returns {Promise<string>} The analysis result
 * @example
 * const analysis = await analyzeData(salesData, 'sales');
 */
export const analyzeData = async (data: any, type: string): Promise<string> => {
  try {
    const prompt = `Analyze the following ${type} data and provide insights:\n${JSON.stringify(data, null, 2)}`;
    return generateAnalysis(prompt);
  } catch (error) {
    console.error('Error analyzing data:', error);
    throw new Error('Failed to analyze data. Please try again later.');
  }
};