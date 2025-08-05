import Cookies from 'js-cookie';

/**
 * Centralized logout utility function
 * Ensures all user data is properly cleared from both localStorage and cookies
 */
export const performLogout = () => {
  try {
    console.log('Starting logout process...');

    // Clear all user data from localStorage
    const localStorageKeys = [
      'user',
      'username', 
      'userRole',
      'token',
      'email',
      'address',
      'userId',
      'mobileNo',
      'phone',
      'role',
      'loginTime'
    ];

    localStorageKeys.forEach(key => {
      localStorage.removeItem(key);
    });

    // Cookie removal options - must match the options used when setting cookies
    const cookieOptions = {
      path: '/',
      domain: typeof window !== 'undefined' && window.location.hostname.includes('localhost') 
        ? undefined 
        : '.worldtriplink.com',
      sameSite: 'strict' as const,
      secure: typeof window !== 'undefined' && window.location.protocol === 'https:'
    };

    // List of all possible cookies to remove
    const cookieKeys = [
      'user',
      'userId', 
      'mobileNo',
      'userRole',
      'username',
      'email',
      'address',
      'token',
      'phone',
      'role',
      'loginTime',
      'registrationSuccess',
      'registrationMessage'
    ];

    // Remove all cookies with proper options
    cookieKeys.forEach(key => {
      Cookies.remove(key, cookieOptions);
    });
    
    // Also try removing without options (fallback for cookies set without specific options)
    cookieKeys.forEach(key => {
      Cookies.remove(key);
    });

    // Clear session storage as well
    if (typeof sessionStorage !== 'undefined') {
      sessionStorage.clear();
    }

    // Clear any other browser storage
    if (typeof window !== 'undefined') {
      // Clear any IndexedDB or other storage if used
      try {
        // You can add more storage clearing here if needed
        console.log('All storage cleared successfully');
      } catch (storageError) {
        console.warn('Some storage could not be cleared:', storageError);
      }
    }

    console.log('Logout process completed successfully');
    return true;

  } catch (error) {
    console.error('Error during logout process:', error);
    return false;
  }
};

/**
 * Check if user is logged in by verifying cookies and localStorage
 */
export const isUserLoggedIn = (): boolean => {
  try {
    // Check cookies first (primary source)
    const userCookie = Cookies.get('user');
    if (userCookie) {
      const user = JSON.parse(userCookie);
      return user.isLoggedIn === true;
    }

    // Fallback to localStorage
    const userLocal = localStorage.getItem('user');
    if (userLocal) {
      const user = JSON.parse(userLocal);
      return user.isLoggedIn === true;
    }

    return false;
  } catch (error) {
    console.error('Error checking login status:', error);
    return false;
  }
};

/**
 * Get current user data from cookies or localStorage
 */
export const getCurrentUser = () => {
  try {
    // Check cookies first (primary source)
    const userCookie = Cookies.get('user');
    if (userCookie) {
      return JSON.parse(userCookie);
    }

    // Fallback to localStorage
    const userLocal = localStorage.getItem('user');
    if (userLocal) {
      return JSON.parse(userLocal);
    }

    return null;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
};

/**
 * Logout and redirect to specified page
 */
export const logoutAndRedirect = (redirectPath: string = '/') => {
  const success = performLogout();
  
  if (typeof window !== 'undefined') {
    if (success) {
      // Use window.location.href for a complete page refresh to ensure all state is cleared
      window.location.href = redirectPath;
    } else {
      // Even if logout had errors, still redirect
      console.warn('Logout had errors but proceeding with redirect');
      window.location.href = redirectPath;
    }
  }
};
