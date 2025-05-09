import { createContext, useState, useEffect } from 'react';
import { getProducers } from '../services/api';

export const ProducerContext = createContext();

export const ProducerProvider = ({ children }) => {
  const [producers, setProducers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');

  // Check for cached data on initial load
  useEffect(() => {
    const cachedData = localStorage.getItem('producersData');
    if (cachedData) {
      try {
        const data = JSON.parse(cachedData);
        setProducers(data.recommendations || []);
      } catch (e) {
        console.error('Error parsing cached data:', e);
        localStorage.removeItem('producersData');
      }
    }
  }, []);

  const searchProducers = async (searchQuery) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getProducers(searchQuery);
      setProducers(data.recommendations || []);
      setQuery(searchQuery);
      
      // Cache the response
      localStorage.setItem('producersData', JSON.stringify(data));
      localStorage.setItem('lastQuery', searchQuery);
      
      return data;
    } catch (err) {
      setError('Failed to fetch producers. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const clearProducers = () => {
    setProducers([]);
    localStorage.removeItem('producersData');
    localStorage.removeItem('lastQuery');
  };

  return (
    <ProducerContext.Provider
      value={{
        producers,
        loading,
        error,
        query,
        searchProducers,
        clearProducers
      }}
    >
      {children}
    </ProducerContext.Provider>
  );
};