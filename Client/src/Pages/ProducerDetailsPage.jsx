import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProducerDetails } from '../services/api';
import LoadingSpinner from '../Components/LoadingSpinner';

const ProducerDetailsPage = () => {
  const { id } = useParams();
  const [producer, setProducer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducerDetails = async () => {
      try {
        setLoading(true);
        const data = await getProducerDetails(id);
        setProducer(data);
      } catch (err) {
        console.error('Error fetching producer details:', err);
        setError('Failed to load producer details. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducerDetails();
  }, [id]);

  // Get image path
  const getImagePath = (path) => {
    if (!path) return null;
    
    // Extract just the ID from the path if it's a full path
    const pathParts = path.split('/');
    const imageId = pathParts[pathParts.length - 1];
    
    // Return the complete path with src prefix and .jpg extension
    return `/src/images/producers/profile/${imageId}.jpg`;
  };

  if (loading) {
    return (
      <div>
        <div style={{
          backgroundColor: '#000', 
          padding: '15px 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid #222'
        }}>
          <div style={{ color: 'white', fontWeight: 'bold', fontSize: '1.5rem' }}>
            <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
              HarmoniX
            </Link>
          </div>
          
          <div style={{ 
            display: 'flex',
            justifyContent: 'center',
            gap: '30px'
          }}>
            <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Whutto</Link>
            <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>RESOURCES</Link>
            <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>SUPPORT</Link>
            <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>ABOUT US</Link>
            <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>CONTACT</Link>
          </div>
          
          <div>
            <Link to="/" style={{ color: 'white' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </Link>
          </div>
        </div>
        <div style={{ textAlign: 'center', padding: '100px 20px' }}>
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  if (error || !producer) {
    return (
      <div>
        <div style={{
          backgroundColor: '#000', 
          padding: '15px 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid #222'
        }}>
          <div style={{ color: 'white', fontWeight: 'bold', fontSize: '1.5rem' }}>
            <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
              HarmoniX
            </Link>
          </div>
          
          <div style={{ 
            display: 'flex',
            justifyContent: 'center',
            gap: '30px'
          }}>
            <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>FEATURES</Link>
            <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>RESOURCES</Link>
            <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>SUPPORT</Link>
            <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>ABOUT US</Link>
            <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>CONTACT</Link>
          </div>
          
          <div>
            <Link to="/" style={{ color: 'white' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </Link>
          </div>
        </div>
        <div style={{ padding: '40px 20px', textAlign: 'center', color: 'white' }}>
          <h2>Error</h2>
          <p>{error || 'Producer not found'}</p>
          <Link to="/producers" style={{ 
            display: 'inline-block', 
            marginTop: '20px',
            background: '#0078ff',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '4px',
            textDecoration: 'none'
          }}>
            Back to Producers
          </Link>
        </div>
      </div>
    );
  }

  const {
    fullName,
    genres = [],
    skills = [],
    experience = '',
    profileImage,
    about = '',
    country = 'Sri Lanka',
    tools = [],
    featuredTracks = []
  } = producer;

  // Prepare profile image path
  const imgSrc = profileImage ? getImagePath(profileImage) : null;

  return (
    <div>
      {/* Navigation */}
      <div style={{
        backgroundColor: '#000', 
        padding: '15px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid #222'
      }}>
        <div style={{ color: 'white', fontWeight: 'bold', fontSize: '1.5rem' }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
            HarmoniX
          </Link>
        </div>
        
        <div style={{ 
          display: 'flex',
          justifyContent: 'center',
          gap: '30px'
        }}>
          <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>FEATURES</Link>
          <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>RESOURCES</Link>
          <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>SUPPORT</Link>
          <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>ABOUT US</Link>
          <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>CONTACT</Link>
        </div>
        
        <div>
          <Link to="/" style={{ color: 'white' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </Link>
        </div>
      </div>
      
      {/* Hero section with background image */}
      <div style={{ 
        backgroundImage: 'linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.9)), url(/src/images/web/home_1.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '300px',
        display: 'flex',
        alignItems: 'center',
        padding: '20px'
      }}>
        <div style={{ 
          maxWidth: '1200px', 
          margin: '0 auto', 
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          gap: '30px'
        }}>
          {/* Profile image in a circle */}
          <div style={{
            width: '160px',
            height: '160px',
            borderRadius: '50%',
            overflow: 'hidden',
            border: '3px solid #fff',
            flexShrink: 0
          }}>
            {imgSrc ? (
              <img 
                src={imgSrc} 
                alt={fullName} 
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0iZmVhdGhlciBmZWF0aGVyLXVzZXIiPjxwYXRoIGQ9Ik0yMCAyMXYtMmE0IDQgMCAwIDAtNC00SDhhNCA0IDAgMCAwLTQgNHYyIj48L3BhdGg+PGNpcmNsZSBjeD0iMTIiIGN5PSI3IiByPSI0Ij48L2NpcmNsZT48L3N2Zz4=';
                }}
              />
            ) : (
              <div style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#1e2230'
              }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
            )}
          </div>
          
          {/* Producer info */}
          <div>
            <h1 style={{ 
              fontSize: '2.5rem', 
              marginBottom: '5px', 
              color: 'white',
              fontWeight: 'bold'
            }}>
              {fullName}
            </h1>
            
            <p style={{ 
              fontSize: '1.2rem', 
              color: '#ccc',
              marginBottom: '15px'
            }}>
              {country}
            </p>
            
            <div style={{ 
              display: 'flex', 
              gap: '10px', 
              marginBottom: '20px',
              flexWrap: 'wrap'
            }}>
              {genres.map((genre, index) => (
                <span 
                  key={index} 
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    padding: '5px 12px',
                    borderRadius: '20px',
                    fontSize: '0.9rem'
                  }}
                >
                  {genre}
                </span>
              ))}
              {skills.slice(0, 3).map((skill, index) => (
                <span 
                  key={index} 
                  style={{
                    backgroundColor: 'rgba(0,120,255,0.2)',
                    padding: '5px 12px',
                    borderRadius: '20px',
                    fontSize: '0.9rem'
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
            
            <button style={{
              backgroundColor: '#0078ff',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              padding: '10px 25px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}>
              CONTACT ME
            </button>
          </div>
        </div>
      </div>
      
      {/* Content sections */}
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto',
        padding: '40px 20px',
        display: 'grid',
        gridTemplateColumns: 'minmax(300px, 1fr) minmax(300px, 1fr)',
        gap: '40px'
      }}>
        {/* Left Column */}
        <div>
          {/* About ME section */}
          <div style={{
            backgroundColor: '#1e2230',
            borderRadius: '8px',
            padding: '25px',
            marginBottom: '20px'
          }}>
            <h2 style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '10px',
              marginBottom: '20px',
              fontSize: '1.5rem',
              fontWeight: 'bold'
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 16v-4"></path>
                <path d="M12 8h.01"></path>
              </svg>
              About ME
            </h2>
            
            <p style={{ 
              color: '#ddd', 
              lineHeight: '1.6',
              marginBottom: '25px'
            }}>
              {about || `${fullName} is a prominent ${country} music producer, composer, arranger, and audio engineer. With ${experience || 'years of'} experience in the industry, they have significantly contributed to the local music scene. Their portfolio includes a diverse range of projects spanning various genres and styles.`}
            </p>
            
            <div style={{ marginTop: '25px' }}>
              <h3 style={{ 
                marginBottom: '10px',
                fontSize: '1.2rem',
                color: '#eee'
              }}>
                Genres
              </h3>
              <div style={{ 
                display: 'flex', 
                flexWrap: 'wrap', 
                gap: '8px' 
              }}>
                {genres.map((genre, index) => (
                  <span 
                    key={index} 
                    style={{
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      padding: '5px 12px',
                      borderRadius: '20px',
                      fontSize: '0.9rem'
                    }}
                  >
                    {genre}
                  </span>
                ))}
              </div>
            </div>
            
            <div style={{ marginTop: '25px' }}>
              <h3 style={{ 
                marginBottom: '10px',
                fontSize: '1.2rem',
                color: '#eee'
              }}>
                Skills
              </h3>
              <div style={{ 
                display: 'flex', 
                flexWrap: 'wrap', 
                gap: '8px' 
              }}>
                {skills.map((skill, index) => (
                  <span 
                    key={index} 
                    style={{
                      backgroundColor: 'rgba(0,120,255,0.2)',
                      padding: '5px 12px',
                      borderRadius: '20px',
                      fontSize: '0.9rem'
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            
            {/* New section for Tools */}
            <div style={{ marginTop: '25px' }}>
              <h3 style={{ 
                marginBottom: '10px',
                fontSize: '1.2rem',
                color: '#eee'
              }}>
                Tools & Software
              </h3>
              <div style={{ 
                display: 'flex', 
                flexWrap: 'wrap', 
                gap: '8px' 
              }}>
                {tools.map((tool, index) => (
                  <span 
                    key={index} 
                    style={{
                      backgroundColor: 'rgba(255,255,255,0.05)',
                      padding: '5px 12px',
                      borderRadius: '20px',
                      fontSize: '0.9rem',
                      border: '1px solid rgba(255,255,255,0.1)'
                    }}
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
            
            <div style={{ marginTop: '25px' }}>
              <h3 style={{ 
                marginBottom: '10px',
                fontSize: '1.2rem',
                color: '#eee'
              }}>
                Experience
              </h3>
              <p style={{ color: '#ddd' }}>
                {experience || '5+ years in music production'}
              </p>
            </div>
          </div>
          
          {/* Contact Information */}
          <div style={{
            backgroundColor: '#1e2230',
            borderRadius: '8px',
            padding: '25px',
          }}>
            <h2 style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '10px',
              marginBottom: '20px',
              fontSize: '1.5rem',
              fontWeight: 'bold'
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              Contact Information
            </h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(0,120,255,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </div>
                <div>
                  <p style={{ fontSize: '0.9rem', color: '#888', marginBottom: '3px' }}>Email</p>
                  <p style={{ fontSize: '1rem', fontWeight: '500' }}>{`${fullName.toLowerCase().replace(/\s+/g, '.')}@harmonix.com`}</p>
                </div>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(0,120,255,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </div>
                <div>
                  <p style={{ fontSize: '0.9rem', color: '#888', marginBottom: '3px' }}>Location</p>
                  <p style={{ fontSize: '1rem', fontWeight: '500' }}>{country}</p>
                </div>
              </div>
              
              <button style={{
                backgroundColor: '#0078ff',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                padding: '12px 0',
                marginTop: '15px',
                fontWeight: 'bold',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px'
              }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                CONTACT ME
              </button>
            </div>
          </div>
        </div>
        
        {/* Right Column */}
        <div>
          {/* Featured Tracks section */}
          <div style={{
            backgroundColor: '#1e2230',
            borderRadius: '8px',
            padding: '25px',
            marginBottom: '20px'
          }}>
            <h2 style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '10px',
              marginBottom: '20px',
              fontSize: '1.5rem',
              fontWeight: 'bold'
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18V5l12-2v13"></path>
                <circle cx="6" cy="18" r="3"></circle>
                <circle cx="18" cy="16" r="3"></circle>
              </svg>
              Featured Tracks
            </h2>
            
            {/* Use featuredTracks from API if available */}
            {featuredTracks && featuredTracks.length > 0 ? (
              featuredTracks.map((track, index) => (
                <div 
                  key={index} 
                  style={{
                    padding: '15px',
                    marginBottom: '10px',
                    backgroundColor: 'rgba(0,0,0,0.3)',
                    borderRadius: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(0,120,255,0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="5 3 19 12 5 21 5 3"></polygon>
                      </svg>
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: '1rem', fontWeight: '500' }}>
                        {track}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div style={{ 
                padding: '20px', 
                textAlign: 'center', 
                color: '#888',
                backgroundColor: 'rgba(0,0,0,0.2)',
                borderRadius: '8px'
              }}>
                <p>No featured tracks available at this time.</p>
              </div>
            )}
          </div>
          
          {/* Tools & Software (Visual representation) */}
          <div style={{
            backgroundColor: '#1e2230',
            borderRadius: '8px',
            padding: '25px',
            marginBottom: '20px'
          }}>
            <h2 style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '10px',
              marginBottom: '20px',
              fontSize: '1.5rem',
              fontWeight: 'bold'
            }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
              </svg>
              Production Tools
            </h2>
            
            <div style={{ 
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
              gap: '15px'
            }}>
              {tools.map((tool, index) => (
                <div 
                  key={index}
                  style={{
                    backgroundColor: 'rgba(0,0,0,0.3)',
                    padding: '20px 15px',
                    borderRadius: '8px',
                    textAlign: 'center',
                    border: '1px solid rgba(255,255,255,0.05)'
                  }}
                >
                  <div style={{
                    width: '40px',
                    height: '40px',
                    margin: '0 auto 10px',
                    borderRadius: '10px',
                    backgroundColor: 'rgba(0,120,255,0.15)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect>
                    <rect x="9" y="9" width="6" height="6"></rect>
                    <line x1="9" y1="2" x2="9" y2="4"></line>
                    <line x1="15" y1="2" x2="15" y2="4"></line>
                    <line x1="9" y1="20" x2="9" y2="22"></line>
                    <line x1="15" y1="20" x2="15" y2="22"></line>
                    <line x1="20" y1="9" x2="22" y2="9"></line>
                    <line x1="20" y1="14" x2="22" y2="14"></line>
                    <line x1="2" y1="9" x2="4" y2="9"></line>
                    <line x1="2" y1="14" x2="4" y2="14"></line>
                  </svg>
                </div>
                <p style={{ 
                  fontSize: '0.9rem',
                  color: '#eee',
                  fontWeight: '500'
                }}>
                  {tool}
                </p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Testimonials (optional section) */}
        <div style={{
          backgroundColor: '#1e2230',
          borderRadius: '8px',
          padding: '25px'
        }}>
          <h2 style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '10px',
            marginBottom: '20px',
            fontSize: '1.5rem',
            fontWeight: 'bold'
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
            Testimonials
          </h2>
          
          <div style={{
            padding: '20px',
            backgroundColor: 'rgba(0,0,0,0.2)',
            borderRadius: '10px',
            marginBottom: '15px'
          }}>
            <p style={{ 
              color: '#ddd',
              fontStyle: 'italic',
              marginBottom: '15px',
              lineHeight: '1.6'
            }}>
              "Working with {fullName} was an incredible experience. Their attention to detail and creative input took our project to the next level."
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: '#333',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <div>
                <p style={{ fontSize: '1rem', fontWeight: '500' }}>Sarah Johnson</p>
                <p style={{ fontSize: '0.8rem', color: '#888' }}>Recording Artist</p>
              </div>
            </div>
          </div>
          
          <div style={{
            padding: '20px',
            backgroundColor: 'rgba(0,0,0,0.2)',
            borderRadius: '10px'
          }}>
            <p style={{ 
              color: '#ddd',
              fontStyle: 'italic',
              marginBottom: '15px',
              lineHeight: '1.6'
            }}>
              "{fullName} brings a unique perspective to every project. Their technical skills and musical intuition are outstanding."
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: '#333',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </div>
              <div>
                <p style={{ fontSize: '1rem', fontWeight: '500' }}>Michael Chen</p>
                <p style={{ fontSize: '0.8rem', color: '#888' }}>Studio Manager</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
};

export default ProducerDetailsPage;