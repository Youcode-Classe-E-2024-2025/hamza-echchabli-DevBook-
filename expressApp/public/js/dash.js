
const UToken = localStorage.getItem('token');


    fetchCategories();
  
    const categoryForm = document.getElementById('category-form');
    categoryForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const categoryName = document.getElementById('category-name').value;
      
      const response = await fetch('/api/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
         'Authorization': `Bearer ${UToken}`,
        },
        body: JSON.stringify({ name: categoryName }),
      });
  
      const result = await response.json();
      console.log(response.ok);
      
      if (response.ok) {
        document.getElementById('category-result').textContent = `Category "${categoryName}" created successfully.`;
        fetchCategories();
      } else {

        console.log('rr');
        
        document.getElementById('category-result').textContent = result.error || 'Error creating category';
      }
    });
  
    
async function fetchCategories() {
    const UToken = localStorage.getItem('token');
    const response = await fetch('/api/categories', {
      headers: {
        'Authorization': `Bearer ${UToken}`,
      },
    });
  
    if (response.ok) {
      const categories = await response.json();
      const bookCategorySelect = document.getElementById('book-category');
      bookCategorySelect.innerHTML = '<option value="">Select Category</option>'; // Clear existing options
  
      categories.categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.id;
        option.textContent = category.name;
        bookCategorySelect.appendChild(option);
      });
    } else {
      console.error('Failed to fetch categories');
    }
  }
  
  // Call the function to fetch categories
  fetchCategories();
  
  // Handle book creation form submission
  const bookForm = document.getElementById('book-form');
  bookForm.addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const title = document.getElementById('book-title').value;
    const description = document.getElementById('book-description').value;
    const imageFile = document.getElementById('book-image').files[0]; // Get the image file
    const category = document.getElementById('book-category').value;
  
    const UToken = localStorage.getItem('token');
  
    // Create a new FormData object to send the file along with other data
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('image', imageFile); // Append the image file
    formData.append('category', category);
  
    const response = await fetch('/api/books', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${UToken}`,
      },
      body: formData, // Send FormData, which includes the image file
    });
  
    const result = await response.json();
  
    if (response.ok) {
      document.getElementById('book-result').textContent = `Book "${result.title}" created successfully.`;
    } else {
      document.getElementById('book-result').textContent = result.error || 'Error creating book';
    }
  });
  
  
  