"use client";

export default function LogoutButton() {
  const handleSignout = async () => {
    try {
      const response = await fetch('/api/auth/signout', {
        method: 'POST',
      });
      
      if (response.ok) {
        window.location.href = '/signin';
      }
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <button
      onClick={handleSignout}
      className="bg-red-500 p-2 rounded-full text-white hover:bg-red-600 transition-colors"
    >
      Logout
    </button>
  );
}
