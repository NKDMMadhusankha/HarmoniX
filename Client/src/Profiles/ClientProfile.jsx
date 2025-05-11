import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar';

function UserProfile() {
  const [currentSection, setCurrentSection] = useState('profile');
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    imageUrl: '/api/placeholder/150/150'
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [reviewData, setReviewData] = useState({
    rating: 0,
    comment: ''
  });
  const [alert, setAlert] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setAnimateIn(true);
    }, 100);
  }, []);

  useEffect(() => {
    setAnimateIn(false);
    setTimeout(() => {
      setAnimateIn(true);
    }, 50);
  }, [currentSection]);

  const handleSectionChange = (section) => {
    setCurrentSection(section);
  };

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfile({
          ...profile,
          imageUrl: e.target.result
        });
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: value
    });
  };

  const submitPasswordChange = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setAlert({
        open: true,
        message: 'New passwords do not match!',
        severity: 'error'
      });
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setAlert({
        open: true,
        message: 'Password must be at least 6 characters!',
        severity: 'error'
      });
      return;
    }

    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });

    setAlert({
      open: true,
      message: 'Password updated successfully!',
      severity: 'success'
    });
  };

  const handleReviewChange = (e) => {
    const { name, value } = e.target;
    setReviewData({
      ...reviewData,
      [name]: value
    });
  };

  const submitReview = () => {
    setReviewData({
      rating: 0,
      comment: ''
    });

    setAlert({
      open: true,
      message: 'Review submitted successfully!',
      severity: 'success'
    });
  };

  const handleCloseAlert = () => {
    setAlert({
      ...alert,
      open: false
    });
  };

  const sections = [
    {
      id: 'profile',
      title: 'Profile',
      icon: '👤',
      color: '#2196f3'
    },
    {
      id: 'security',
      title: 'Security',
      icon: '🔒',
      color: '#4caf50'
    },
    {
      id: 'reviews',
      title: 'Feedback',
      icon: '📝',
      color: '#ff9800'
    },
    {
      id: 'logout',
      title: 'Logout',
      icon: '🚪',
      color: '#f44336'
    }
  ];

  const renderSectionContent = () => {
    switch (currentSection) {
      case 'profile':
        return (
          <div className="content-card profile-content" style={{
            opacity: animateIn ? 1 : 0,
            transform: animateIn ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)',
            backgroundColor: '#1a1a1a',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
          }}>
            <div className="profile-header" style={{
              background: 'linear-gradient(135deg, #1976d2 0%, #21CBF3 100%)',
              padding: '24px',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <div className="profile-avatar-container" style={{
                position: 'relative',
                marginBottom: '15px'
              }}>
                <div className="profile-avatar" style={{
                  width: '90px',
                  height: '90px',
                  borderRadius: '50%',
                  border: '3px solid white',
                  overflow: 'hidden',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
                  backgroundColor: '#333'
                }}>
                  <img 
                    src={profile.imageUrl} 
                    alt="User avatar" 
                    style={{width: '100%', height: '100%', objectFit: 'cover'}}
                  />
                </div>
                <label htmlFor="profile-image-upload" style={{
                  position: 'absolute',
                  bottom: '0',
                  right: '0',
                  backgroundColor: 'white',
                  borderRadius: '50%',
                  width: '28px',
                  height: '28px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
                }}>
                  <span style={{fontSize: '14px'}}>📷</span>
                </label>
                <input
                  id="profile-image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{display: 'none'}}
                />
              </div>
              <h2 style={{
                margin: '5px 0',
                color: 'white',
                fontWeight: '500',
                fontSize: '22px'
              }}>{profile.name}</h2>
              <p style={{
                color: 'rgba(255,255,255,0.8)',
                fontSize: '14px'
              }}>{profile.email}</p>
            </div>
            
            <div className="profile-body" style={{
              padding: '20px'
            }}>
              <div className="profile-actions" style={{
                display: 'flex',
                justifyContent: 'center'
              }}>
                <button style={{
                  background: '#1976d2',
                  color: 'white',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontWeight: '500',
                  fontSize: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }} 
                onClick={() => {
                  setAlert({
                    open: true,
                    message: 'Profile saved successfully',
                    severity: 'success'
                  });
                }}>
                  <span>💾</span> Save
                </button>
              </div>
            </div>
          </div>
        );
      
      case 'security':
        return (
          <div className="content-card" style={{
            backgroundColor: '#1a1a1a',
            padding: '20px',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
            opacity: animateIn ? 1 : 0,
            transform: animateIn ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)'
          }}>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '500',
              marginBottom: '20px',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <span style={{color: sections.find(s => s.id === 'security').color}}>🔒</span> 
              Change Password
            </h3>
            
            <div style={{marginBottom: '15px'}}>
              <label style={{
                display: 'block',
                marginBottom: '6px',
                fontSize: '13px',
                color: '#b0b8c1'
              }}>
                Current Password
              </label>
              <input
                type="password"
                name="currentPassword"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '6px',
                  backgroundColor: '#2a2a2a',
                  border: '1px solid #444',
                  color: 'white',
                  outline: 'none',
                  fontSize: '14px'
                }}
              />
            </div>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '12px',
              marginBottom: '15px'
            }}>
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '6px',
                  fontSize: '13px',
                  color: '#b0b8c1'
                }}>
                  New Password
                </label>
                <input
                  type="password"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '6px',
                    backgroundColor: '#2a2a2a',
                    border: '1px solid #444',
                    color: 'white',
                    outline: 'none',
                    fontSize: '14px'
                  }}
                />
              </div>
              
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '6px',
                  fontSize: '13px',
                  color: '#b0b8c1'
                }}>
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '6px',
                    backgroundColor: '#2a2a2a',
                    border: '1px solid #444',
                    color: 'white',
                    outline: 'none',
                    fontSize: '14px'
                  }}
                />
              </div>
            </div>
            
            <button
              onClick={submitPasswordChange}
              style={{
                width: '100%',
                backgroundColor: '#4caf50',
                color: 'white',
                padding: '10px',
                border: 'none',
                borderRadius: '6px',
                fontWeight: '500',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                fontSize: '14px'
              }}
            >
              <span>🔄</span> Update
            </button>
          </div>
        );
      
      case 'reviews':
        return (
          <div className="content-card" style={{
            backgroundColor: '#1a1a1a',
            padding: '20px',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
            opacity: animateIn ? 1 : 0,
            transform: animateIn ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)'
          }}>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '500',
              marginBottom: '20px',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <span style={{color: sections.find(s => s.id === 'reviews').color}}>📝</span> 
              Submit Feedback
            </h3>
            
            <div style={{marginBottom: '15px'}}>
              <textarea
                rows="5"
                name="comment"
                value={reviewData.comment}
                onChange={handleReviewChange}
                placeholder="Share your thoughts with us..."
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '6px',
                  backgroundColor: '#2a2a2a',
                  border: '1px solid #444',
                  color: 'white',
                  outline: 'none',
                  fontSize: '14px',
                  resize: 'vertical',
                  fontFamily: 'inherit'
                }}
              />
            </div>
            
            <button
              onClick={submitReview}
              style={{
                width: '100%',
                backgroundColor: '#ff9800',
                color: 'white',
                padding: '10px',
                border: 'none',
                borderRadius: '6px',
                fontWeight: '500',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                fontSize: '14px'
              }}
            >
              <span>📤</span> Submit
            </button>
          </div>
        );
      
      case 'logout':
        return (
          <div className="content-card" style={{
            backgroundColor: '#1a1a1a',
            padding: '24px',
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
            textAlign: 'center',
            opacity: animateIn ? 1 : 0,
            transform: animateIn ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)',
            maxWidth: '360px',
            margin: '0 auto'
          }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              backgroundColor: 'rgba(244, 67, 54, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px auto'
            }}>
              <span style={{fontSize: '24px'}}>🚪</span>
            </div>
            
            <h3 style={{
              fontSize: '20px',
              fontWeight: '500',
              marginBottom: '12px',
              color: '#fff'
            }}>
              Sign Out
            </h3>
            
            <p style={{
              color: '#b0b8c1',
              fontSize: '14px',
              marginBottom: '20px'
            }}>
              Are you sure you want to sign out?
            </p>
            
            <button style={{
              backgroundColor: '#f44336',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontWeight: '500',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '14px'
            }}>
              Confirm
            </button>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: 'black',
      color: 'white',
      fontFamily: '"Inter", system-ui, sans-serif',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Navbar />
      
      <style>
        {`
          @keyframes pulse {
            0% { box-shadow: 0 4px 20px rgba(0,150,255,0.4); }
            50% { box-shadow: 0 4px 30px rgba(25,118,210,0.7); }
            100% { box-shadow: 0 4px 20px rgba(0,150,255,0.4); }
          }
          
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          
          @keyframes slideInUp {
            from {
              transform: translateY(30px);
              opacity: 0;
            }
            to {
              transform: translateY(0);
              opacity: 1;
            }
          }
          
          button {
            transition: all 0.2s;
          }
          
          button:hover {
            filter: brightness(1.1);
          }
        `}
      </style>
      
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        padding: '16px',
        maxWidth: '1000px',
        margin: '0 auto',
        width: '100%'
      }}>
        <div style={{
          marginBottom: '24px',
          animation: animateIn ? 'fadeIn 0.5s ease-out' : 'none',
        }}>
          <h1 style={{
            fontSize: '24px',
            fontWeight: '600',
            margin: '0'
          }}>Account</h1>
        </div>
        
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
          margin: '0 auto',
          width: '100%'
        }}>
          <div style={{
            display: 'flex',
            gap: '8px',
            borderBottom: '1px solid #333',
            paddingBottom: '8px',
            overflowX: 'auto',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}>
            {sections.map((section) => (
              <button 
                key={section.id}
                onClick={() => handleSectionChange(section.id)}
                style={{
                  backgroundColor: 'transparent',
                  color: currentSection === section.id ? section.color : '#b0b8c1',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '6px 6px 0 0',
                  cursor: 'pointer',
                  fontWeight: currentSection === section.id ? '500' : '400',
                  fontSize: '14px',
                  transition: 'all 0.2s ease',
                  borderBottom: currentSection === section.id ? `2px solid ${section.color}` : '2px solid transparent',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <span>{section.icon}</span>
                <span>{section.title}</span>
              </button>
            ))}
          </div>
          
          <div style={{
            width: '100%',
            maxWidth: '480px',
            margin: '0 auto',
            animation: animateIn ? 'fadeIn 0.3s ease-out' : 'none',
          }}>
            {renderSectionContent()}
          </div>
        </div>
      </div>
      
      {alert.open && (
        <div style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          backgroundColor: alert.severity === 'success' ? '#0f9d58' : '#db4437',
          color: 'white',
          padding: '10px 16px',
          borderRadius: '6px',
          boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          zIndex: 1300,
          minWidth: '200px',
          maxWidth: '300px',
          animation: 'slideInUp 0.3s forwards'
        }}>
          <span style={{fontSize: '14px'}}>{alert.message}</span>
          <button 
            onClick={handleCloseAlert}
            style={{ 
              background: 'none',
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              fontSize: '16px',
              padding: '0 0 0 12px',
              opacity: 0.8
            }}
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
}

export default UserProfile;