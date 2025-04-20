async function refreshToken() {
  const refreshToken = localStorage.getItem('refreshToken');
  try {
    const response = await fetch('http://localhost:5001/api/auth/refresh', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken })
    });
    
    if (!response.ok) {
      throw new Error('Token refresh failed');
    }

    const data = await response.json();
    localStorage.setItem('authToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
  } catch (error) {
    // Token refresh failed - force logout
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
    window.location.href = '/login';
    throw error;
  }
}

export async function authFetch(url, options = {}) {
  // Add auth header if token exists
  const token = localStorage.getItem('authToken');
  if (token) {
    options.headers = {
      ...options.headers,
      'x-auth-token': token
    };
  }

  let response = await fetch(url, options);
  
  if (response.status === 401) {
    await refreshToken();
    // Retry with new token
    const newToken = localStorage.getItem('authToken');
    options.headers['x-auth-token'] = newToken;
    response = await fetch(url, options);
  }
  
  return response;
}
