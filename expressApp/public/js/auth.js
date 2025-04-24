
    // localStorage.clear();
    document.addEventListener('DOMContentLoaded', () => {
      // Check if already logged in
      const token = localStorage.getItem('token');
      console.log(token);
      
      if (token) {
        window.location.href = '/dashboard';
        return;
      }
      
      const loginTab = document.getElementById('login-tab');
      const registerTab = document.getElementById('register-tab');
      const loginContent = document.getElementById('login-content');
      const registerContent = document.getElementById('register-content');
      
      loginTab.addEventListener('click', () => {
        loginTab.classList.add('active');
        registerTab.classList.remove('active');
        loginContent.classList.add('active');
        registerContent.classList.remove('active');
        document.getElementById('error-message').style.display = 'none';
      });
      
      registerTab.addEventListener('click', () => {
        registerTab.classList.add('active');
        loginTab.classList.remove('active');
        registerContent.classList.add('active');
        loginContent.classList.remove('active');
        document.getElementById('error-message').style.display = 'none';
      });
      
      

      document.getElementById('login-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        const errorMessage = document.getElementById('error-message');
        
        try {
          const response = await fetch('/api/users/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
          });
          
          const data = await response.json();
          
          if (!response.ok) {
            throw new Error(data.error || 'Login failed');
          }
          
          
          localStorage.setItem('token', data.token);
          localStorage.setItem('user', JSON.stringify({
            id: data.user.id,
            name: data.user.name,
            email: data.user.email
          }));
          
          
          window.location.href = '/dashboard';
        } catch (error) {
          errorMessage.textContent = error.message;
          errorMessage.style.display = 'block';
        }
      });
      
      
      document.getElementById('register-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        
        
        const name = document.getElementById('register-name').value;
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        const errorMessage = document.getElementById('error-message');
        
        // Validate passwords match
        if (password !== confirmPassword) {
          errorMessage.textContent = 'Passwords do not match';
          errorMessage.style.display = 'block';
          return;
        }
        
        try {
          const response = await fetch('/api/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error || 'Registration failed');
        }
        
        console.log(response);

        console.log(data.user);
        
        
        //  console.log(data.name);

        
        
        localStorage.setItem('token', data.user.token);
        localStorage.setItem('user', JSON.stringify({
            id: data.user.id,
            name: data.user.name,
            email: data.user.email,
            role : data.user.role
        }));
          
          window.location.href = '/dashboard';
        } catch (error) {
            console.log('here');
            
          errorMessage.textContent = error.message;
          errorMessage.style.display = 'block';
        }
      });
    });