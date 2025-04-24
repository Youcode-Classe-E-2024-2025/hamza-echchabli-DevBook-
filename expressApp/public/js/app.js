

  // Check if the token exists in localStorage
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role');
  const name = localStorage.getItem('name');

  // Display login/logout and role-based links
  if (token) {
    document.getElementById('logout-link').innerHTML = '<a href="#" id="logout-btn">Logout</a>';
    document.getElementById('logout-btn').addEventListener('click', () => {
      // Logout: Clear token and role from localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      localStorage.removeItem('name');
      window.location.reload(); // Reload to reflect changes
    });


    // Role-based navigation
    if (userRole === 'client') {
      document.getElementById('profile-link').innerHTML = '<a href="/profile">Profile</a>';
      document.getElementById('dashboard-link').style.display = 'none'; // Hide dashboard link for clients
    } else if (userRole === 'admin') {
      document.getElementById('dashboard-link').innerHTML = '<a href="/dashboard">Dashboard</a>';
      document.getElementById('profile-link').style.display = 'none'; // Hide profile link for admins
    }
  } else {
    document.getElementById('login-link').innerHTML = '<a href="/auth">Login</a>';
  }
  