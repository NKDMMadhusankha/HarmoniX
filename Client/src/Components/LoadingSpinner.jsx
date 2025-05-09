const LoadingSpinner = () => {
  return (
    <div style={{ 
      backgroundColor: 'black', 
      width: '100%', 
      height: '200vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center' 
    }}>
      <div style={{ 
        textAlign: 'center', 
        padding: '80px 20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh'
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
            top: 0,
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
              from { opacity: 0; }
              to { opacity: 1; }
            }
            @keyframes pulse {
              0% { transform: scale(1); }
              50% { transform: scale(1.05); }
              100% { transform: scale(1); }
            }
          `}</style>
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: '#0078ff',
            fontSize: '40px',
            animation: 'pulse 2s infinite'
          }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M12 2a1 1 0 0 1 .993.883L13 3l.002 7.326.94.443a5.997 5.997 0 0 1 2.785 2.785l.359.764.116.236a1 1 0 0 1-1.674 1.082l-.07-.116-.358-.764a3.996 3.996 0 0 0-1.858-1.858l-.443-.208-.673-.31-.002 3.292a1 1 0 0 1-1.993.117L10 14.999l.001-4.417-.55-.258a3.996 3.996 0 0 0-1.858-1.858l-.443-.208-.359-.764A1 1 0 0 1 7.8 5.871l.12.075.358.764a5.997 5.997 0 0 1 2.785 2.785l.443.942L11.5 3a1 1 0 0 1 .5-1z"></path>
            </svg>
          </div>
        </div>
        
        <h3 style={{ 
          color: '#fff', 
          fontSize: '1.5rem', 
          marginBottom: '10px',
          animation: 'fadeIn 0.5s ease-in'
        }}>
          AI is analyzing your requirements
        </h3>
        
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '10px', 
          marginBottom: '20px' 
        }}>
          <div style={{ 
            width: '8px', 
            height: '8px', 
            backgroundColor: '#0078ff', 
            borderRadius: '50%', 
            animation: 'pulse 1s infinite' 
          }}></div>
          <div style={{ 
            width: '8px', 
            height: '8px', 
            backgroundColor: '#0078ff', 
            borderRadius: '50%', 
            animation: 'pulse 1s infinite 0.2s' 
          }}></div>
          <div style={{ 
            width: '8px', 
            height: '8px', 
            backgroundColor: '#0078ff', 
            borderRadius: '50%', 
            animation: 'pulse 1s infinite 0.4s' 
          }}></div>
        </div>
        
        <p style={{ color: '#aaa', maxWidth: '500px', margin: '0 auto' }}>
          Finding the perfect producers for your project. This may take a moment.
        </p>
      </div>
    </div>
  );
};

export default LoadingSpinner;