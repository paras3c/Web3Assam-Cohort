const API_BASE_URL = 'http://localhost:5001/api';

/**
 * Fetch user data from the backend
 * @returns {Promise<Object>} User data object
 */
export const getUser = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/user`);
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to fetch user data');
    }
    const result = await response.json();
    // Backend returns { success: true, data: user }
    return result.data || result;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

/**
 * Update user data on the backend
 * @param {Object} userData - User data to update (name, email, role)
 * @returns {Promise<Object>} Updated user data
 */
export const updateUser = async (userData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/user`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to update user data');
    }
    
    const result = await response.json();
    // Backend returns { success: true, data: user }
    return result.data || result;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

