import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = ({ onSearch, placeholder = "Get Personalized Music Professional Recommendations", btnText = "GET STARTED" }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
      navigate('/producers');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{
      display: 'flex',
      backgroundColor: 'rgba(30, 30, 30, 0.9)',
      borderRadius: '10px',
      padding: '10px',
      width: '100%',
      margin: '0 auto',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      marginBottom: '20px',
    }}>
      <input
        type="text"
        style={{
          flex: 1,
          background: 'transparent',
          border: 'none',
          color: 'white',
          padding: '15px 20px',
          fontSize: '1rem',
          outline: 'none'
        }}
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        required
      />
      <button type="submit" style={{
        backgroundColor: 'white',
        color: '#000',
        border: 'none',
        borderRadius: '8px',
        padding: '10px 25px',
        fontWeight: '600',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}>
        {btnText} <span style={{ fontSize: '1.2rem' }}>→</span>
      </button>
    </form>
  );
};

export default SearchBar;