import axios from 'axios';

const API_URL = 'http://localhost:8000/api/v1';

// Create axios instance
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Get producers based on search query
export const getProducers = async (query) => {
  try {
    const response = await apiClient.post('/query', { query });
    return response.data;
  } catch (error) {
    console.error('Error fetching producers:', error);
    throw error;
  }
};

// Get details of a specific producer
export const getProducerDetails = async (id) => {
  try {
    // Since we're mocking this functionality and there's no actual endpoint,
    // we'll extract the details from cached data
    const cachedData = localStorage.getItem('producersData');
    if (cachedData) {
      const data = JSON.parse(cachedData);
      const producer = data.recommendations.find(p => p.id === id);
      if (producer) {
        return producer;
      }
    }
    
    // If not in cache, would normally make API call
    // const response = await apiClient.get(`/producers/${id}`);
    // return response.data;
    
    throw new Error('Producer not found');
  } catch (error) {
    console.error('Error fetching producer details:', error);
    throw error;
  }
};