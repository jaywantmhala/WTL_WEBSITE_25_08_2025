/**
 * Test utility to verify logout functionality
 * This can be run in browser console to test logout behavior
 */

import { performLogout, isUserLoggedIn, getCurrentUser } from './auth';

export const testLogoutFunctionality = () => {
  console.log('🧪 Testing Logout Functionality');
  console.log('================================');

  // Test 1: Check initial state
  console.log('1. Initial login state:', isUserLoggedIn());
  console.log('2. Initial user data:', getCurrentUser());

  // Test 2: Set some test data
  console.log('\n3. Setting test data...');
  localStorage.setItem('user', JSON.stringify({ username: 'test', isLoggedIn: true }));
  localStorage.setItem('token', 'test-token');
  
  // Set test cookies (if in browser environment)
  if (typeof document !== 'undefined') {
    document.cookie = 'userId=123; path=/';
    document.cookie = 'userRole=USER; path=/';
  }

  console.log('4. After setting test data:');
  console.log('   - Login state:', isUserLoggedIn());
  console.log('   - User data:', getCurrentUser());
  console.log('   - LocalStorage keys:', Object.keys(localStorage));
  console.log('   - Cookies:', typeof document !== 'undefined' ? document.cookie : 'N/A');

  // Test 3: Perform logout
  console.log('\n5. Performing logout...');
  const logoutResult = performLogout();
  console.log('   - Logout result:', logoutResult);

  // Test 4: Verify cleanup
  console.log('\n6. After logout verification:');
  console.log('   - Login state:', isUserLoggedIn());
  console.log('   - User data:', getCurrentUser());
  console.log('   - LocalStorage keys:', Object.keys(localStorage));
  console.log('   - Cookies:', typeof document !== 'undefined' ? document.cookie : 'N/A');

  // Test 5: Check specific items
  const itemsToCheck = ['user', 'token', 'userId', 'userRole', 'username'];
  console.log('\n7. Specific item check:');
  itemsToCheck.forEach(item => {
    const localValue = localStorage.getItem(item);
    console.log(`   - localStorage.${item}:`, localValue);
  });

  console.log('\n✅ Logout functionality test completed!');
  console.log('Expected: All values should be null/empty after logout');
};

// Browser console helper
if (typeof window !== 'undefined') {
  (window as any).testLogout = testLogoutFunctionality;
  console.log('💡 Run testLogout() in browser console to test logout functionality');
}
