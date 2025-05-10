import { useContext, useState, useEffect } from 'react';
import { ProducerContext } from '../context/ProducerContext';
import { Link } from 'react-router-dom';
import ProducerCard from '../Components/ProducerCard';
import Navbar from '../Components/Navbar'; // Import Navbar

const ProducersPage = () => {
  const { producers, loading, error, searchProducers, query } = useContext(ProducerContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [displayQuery, setDisplayQuery] = useState('');
  const [loadingStep, setLoadingStep] = useState(0);
  const [visibleCards, setVisibleCards] = useState([]);
  
  const loadingSteps = [
    "Identifying your requirements...",
    "Analyzing musical preferences...",
    "Finding relevant producer skillsets...",
    "Matching production techniques...",
    "Ranking the best matches for you..."
  ];

  // Initialize from localStorage or context
  useEffect(() => {
    const savedQuery = localStorage.getItem('lastQuery');
    
    if (savedQuery) {
      setSearchQuery(savedQuery);
      setDisplayQuery(savedQuery);
    } else if (query) {
      setSearchQuery(query);
      setDisplayQuery(query);
    }
  }, []);

  // Update when context query changes
  useEffect(() => {
    if (query) {
      setSearchQuery(query);
      setDisplayQuery(query);
    }
  }, [query]);

  // For loading animation
  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setLoadingStep(prev => (prev + 1) % loadingSteps.length);
      }, 3600);
      return () => clearInterval(interval);
    }
  }, [loading, loadingSteps.length]);

  // For gradually showing cards with animation
  useEffect(() => {
    if (!loading && producers.length > 0) {
      // Reset visible cards first
      setVisibleCards([]);
      
      // Then gradually add each card
      producers.forEach((_, index) => {
        setTimeout(() => {
          setVisibleCards(prev => [...prev, index]);
        }, 500 * index); // 500ms delay between each card
      });
    }
  }, [loading, producers]);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      setDisplayQuery(searchQuery);
      localStorage.setItem('lastQuery', searchQuery);
      searchProducers(searchQuery);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <>
      <Navbar /> {/* Add Navbar component */}
      <div style={{ 
        backgroundColor: 'black', // Set background color to black
        fontFamily: 'Poppins, sans-serif',
        minHeight: '100vh', // Ensure it covers the full viewport height
        position: 'relative', // Added for video positioning
        overflow: loading ? 'hidden' : 'auto' // Prevent scrolling when loading
      }}>
        {/* Video Background - Only show when not loading */}
        {!loading && (
          <video 
            autoPlay 
            loop={true}
            muted 
            playsInline
            preload="auto"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: 0.15, // Reduced opacity for better text contrast
              zIndex: 0,
              pointerEvents: 'none', // Prevent interaction with video
            }}
          >
            <source src="https://videos.pexels.com/video-files/28561463/12421438_2560_1440_30fps.mp4" type="video/mp4" />
          </video>
        )}
        
        {/* Loading Animation with Steps */}
        {loading && (
          <div style={{ 
            position: 'fixed', // Change to fixed to ensure it stays in place
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'black',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000, // Ensure it's above everything else
            fontFamily: 'Poppins, sans-serif'
          }}>
            {/* Loading Animation */}
            <div style={{
              position: 'relative',
              width: '120px',
              height: '120px',
              marginBottom: '30px'
            }}>
              <div style={{
                position: 'absolute',
                top: '-9px', // Move the icon slightly upward
                left: 0,
                width: '100%',
                height: '100%',
                border: '4px solid rgba(0, 120, 255, 0.1)',
                borderRadius: '50%',
                borderTopColor: '#0078ff',
                animation: 'spin 1.5s linear infinite'
              }}></div>
              <style>{`
                @keyframes spin {
                  to { transform: rotate(360deg); }
                }
                @keyframes fadeIn {
                  from { opacity: 0; transform: translateY(20px); }
                  to { opacity: 1; transform: translateY(0); }
                }
                @keyframes cardAppear {
                  from { opacity: 0; transform: translateY(20px); }
                  to { opacity: 1; transform: translateY(0); }
                }
              `}</style>
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                color: '#0078ff',
                fontSize: '40px'
              }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a1 1 0 0 1 .996.936l.018.13.186 1.86a7.995 7.995 0 0 1 1.99.836l1.175-1.175a1 1 0 0 1 1.32-.083l.094.083a1 1 0 0 1 .083 1.32l-.083.094-1.175 1.175a7.996 7.996 0 0 1 .836 1.99l1.86.186a1 1 0 0 1 .936.996v.112a1 1 0 0 1-.936.996l-.18.018-1.86.186a7.995 7.995 0 0 1-.836 1.99l1.175 1.175a1 1 0 0 1 .083 1.32l-.083.094a1 1 0 0 1-1.32.083l-.094-.083-1.175-1.175a7.996 7.996 0 0 1-1.99.836l-.186 1.86A1 1 0 0 1 12.112 22h-.224a1 1 0 0 1-.996-.936l-.018-.18-.186-1.86a7.995 7.995 0 0 1-1.99-.836l-1.175 1.175a1 1 0 0 1-1.32.083l-.094-.083a1 1 0 0 1-.083-1.32l.083-.094 1.175-1.175a7.996 7.996 0 0 1-.836-1.99l-1.86-.186A1 1 0 0 1 2 14.112v-.224a1 1 0 0 1 .936-.996l.18-.018 1.86-.186a7.995 7.995 0 0 1 .836-1.99L4.637 9.523a1 1 0 0 1-.083-1.32l.083-.094a1 1 0 0 1 1.32-.083l.094.083 1.175 1.175a7.996 7.996 0 0 1 1.99-.836l.186-1.86A1 1 0 0 1 11.888 2h.224z"></path>
                </svg>
              </div>
            </div>
            
            {/* Loading Steps */}
            <h3 style={{ 
              color: '#fff', 
              fontSize: '1.5rem', 
              marginBottom: '20px',
              animation: 'fadeIn 0.5s ease-in',
              fontFamily: 'Poppins, sans-serif'
            }}>
              {loadingSteps[loadingStep]}
            </h3>
            
            <p style={{ color: '#aaa', maxWidth: '500px', margin: '0 auto', fontFamily: 'Poppins, sans-serif', justifyContent: 'center', textAlign: 'center' }}>
              Our AI is analyzing your requirements to find the perfect producers for your project.
            </p>
          </div>
        )}
        
        {/* Search Bar - Only show when not loading */}
        {!loading && (
          <div style={{
            backgroundColor: 'black',
            padding: '15px 20px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderBottom: '1px solid #222',
            fontFamily: 'Poppins, sans-serif',
            position: 'relative', // Ensure it's above the video
            zIndex: 1 // Place above video
          }}>
            <div style={{
              display: 'flex',
              width: '100%',
              maxWidth: '600px',
              justifyContent: 'center',
              position: 'relative',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
            }}>
              <input
                type="text"
                placeholder="Describe the music or artist you're looking for..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                style={{
                  backgroundColor: '#111',
                  color: 'white',
                  border: '2px solid #333',
                  borderRadius: '8px',
                  padding: '14px 18px',
                  paddingRight: '150px', // Add space for the button
                  outline: 'none',
                  width: '100%',
                  fontSize: '16px',
                  fontFamily: 'Poppins, sans-serif',
                  transition: 'all 0.2s ease',
                }}
              />
              <button
                onClick={handleSearch}
                style={{
                  position: 'absolute',
                  right: '2.5px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  backgroundColor: '#0078ff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '15px 6px 6px 0', // Remove left border radius
                  padding: '15px 20px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  fontFamily: 'Poppins, sans-serif',
                  transition: 'all 0.2s ease',
                  letterSpacing: '0.5px',
                  boxShadow: '0 2px 4px rgba(0, 120, 255, 0.25)',
                  zIndex: 10
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = '#0066dd';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = '#0078ff';
                }}
              >
                RECOMMEND
              </button>
            </div>
          </div>
        )}
        
        {/* Content Area */}
        <div style={{ 
          maxWidth: '1000px', 
          margin: '0 auto',
          padding: '40px 20px',
          fontFamily: 'Poppins, sans-serif'
        }}>
          {/* AI-Driven Introduction Text */}
          {!loading && !error && producers.length > 0 && (
            <div 
              style={{
                borderRadius: '10px',
                padding: '25px',
                marginBottom: '40px',
                textAlign: 'center',
                fontFamily: 'Poppins, sans-serif',
                position: 'relative',
                zIndex: 10,
                color: 'white',
                boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
                pointerEvents: 'all',
                userSelect: 'text' // Changed from 'all' to 'text' for normal text selection behavior
              }}
            >
              {/* Title and icon in one line */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
                marginBottom: '15px',
                position: 'relative', // Keep position relative
                zIndex: 2 // Keep z-index
              }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#0078ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a10 10 0 0 1 10 10c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2m0 5v3.586l2.707 2.707"></path>
                  <circle cx="12" cy="12" r="10"></circle>
                </svg>
                <h2 style={{ fontSize: '1.5rem', color: '#0078ff', margin: 0, fontFamily: 'Poppins, sans-serif' }}>AI-Powered Producer Recommendations</h2>
              </div>
              
              <p style={{ fontSize: '1.1rem', color: '#ddd', lineHeight: '1.6', fontFamily: 'Poppins, sans-serif' }}>
                Based on your search for "<strong>{displayQuery}</strong>", we believe the following producers would be a perfect match for your requirements. Each recommendation is tailored to your specific needs.
              </p>
            </div>
          )}
          
          {/* Error Message */}
          {error && (
            <div style={{ textAlign: 'center', padding: '40px 0', color: '#ff6b6b', fontFamily: 'Poppins, sans-serif' }}>
              {error}
            </div>
          )}
          
          {/* No Results Message */}
          {!loading && !error && producers.length === 0 && (
            <div style={{ 
              textAlign: 'center', 
              padding: '40px 0',
              color: 'white',
              backgroundColor: 'rgba(0,0,0,0.3)',
              borderRadius: '10px',
              fontFamily: 'Poppins, sans-serif'
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '15px' }}>
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              <h3 style={{ marginBottom: '10px', fontSize: '1.3rem' }}>No producers found</h3>
              <p>Try adjusting your search criteria or use more specific terms.</p>
            </div>
          )}
          
          {/* Producer Cards with Animation */}
          {!loading && !error && producers.length > 0 && (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '25px',
              padding: '20px 0',
              fontFamily: 'Poppins, sans-serif'
            }}>
              {producers.map((producer, index) => (
                <div 
                  key={producer.id} 
                  style={{
                    opacity: visibleCards.includes(index) ? 1 : 0,
                    transform: visibleCards.includes(index) ? 'translateY(0)' : 'translateY(20px)',
                    transition: 'opacity 0.5s ease-out, transform 0.5s ease-out',
                    animation: visibleCards.includes(index) ? 'cardAppear 0.5s ease-out' : 'none'
                  }}
                >
                  <ProducerCard producer={producer} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProducersPage;