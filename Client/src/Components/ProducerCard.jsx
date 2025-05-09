import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const ProducerCard = ({ producer }) => {
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    // Fetch the musician's profile data
    fetch(`http://localhost:5000/api/musician/producers/${producer.id}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.success && data.producer) {
          setProfileImage(data.producer.profileImage);
        }
      })
      .catch((error) => console.error('Error fetching profile image:', error));
  }, [producer.id]);

  const { id, fullName, genres = [], reason } = producer;

  return (
    <div style={{
      backgroundColor: '#1e2230',
      borderRadius: '8px',
      overflow: 'hidden',
      border: '1px solid rgba(255,255,255,0.05)',
      marginBottom: '20px',
      display: 'flex',
      flexDirection: 'row',
      minHeight: '160px'
    }}>
      {/* Left section - 80% width */}
      <div style={{ 
        flex: '0.8',
        display: 'flex',
        flexDirection: 'column',
      }}>
        {/* Name Section - Just one line */}
        <div style={{
          padding: '15px 20px',
        }}>
          <h2 style={{ 
            fontSize: '1.5rem', 
            color: 'white',
            fontWeight: 'bold',
            margin: 0,
            lineHeight: '1.2'
          }}>
            {fullName}
          </h2>
        </div>
        
        {/* Reason Section - Takes most of the space */}
        <div style={{
          padding: '0 20px 15px',
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column'
        }}>
          <p style={{ 
            fontSize: '0.95rem', 
            color: '#ddd',
            margin: 0,
            lineHeight: '1.4',
            flex: 1
          }}>
            {reason || `This producer's skills and experience align perfectly with your requirements.`}
          </p>
          
          {/* Genre section - moved from right to left */}
          <div style={{
            marginTop: '10px',
            padding: '5px 0'
          }}>
            <p style={{
              fontSize: '0.85rem',
              color: '#aaa',
              margin: 0,
            }}>
              <span style={{ color: '#8a8f99', fontWeight: '500' }}>Genres: </span>
              {(genres && genres.length > 0) ? genres.join(', ') : 'N/A'}
            </p>
          </div>
          
          {/* SEE MORE button */}
          <div style={{ 
            marginTop: '10px',
            textAlign: 'left' 
          }}>
            <Link 
              to={`/producer/${id}`} 
              style={{
                color: '#0078ff',
                fontWeight: 'bold',
                textDecoration: 'none',
                fontSize: '0.85rem',
                display: 'inline-block'
              }}
            >
              SEE MORE
            </Link>
          </div>
        </div>
      </div>
      
      {/* Right section - 20% width, only contains image now */}
      <div style={{
        flex: '0.2',
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Image Section - Takes all of the right side */}
        <a 
          href={`/producer/${producer.id}`} 
          style={{ 
            textDecoration: 'none',
            flex: 1,
            display: 'block',
            height: '100%'
          }}
        >
          <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#222733',
            position: 'relative',
          }}>
            {profileImage ? (
              <img 
                src={profileImage}
                alt={producer.fullName}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center top'
                }}
              />
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            )}
          </div>
        </a>
      </div>
    </div>
  );
};

export default ProducerCard;