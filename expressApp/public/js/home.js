let currentPage = 1;

const UToken = localStorage.getItem('token');

async function loadBooks(page = currentPage) {
  const response = await fetch(`/api/books?page=${page}`, {
    headers: {
      'Authorization': `Bearer ${UToken}`
    }
  });

  const data = await response.json();
  const books = data.books;
  const totalBooks = data.totalBooks;
  const bookGrid = document.querySelector('.book-grid');
  const totalPages = Math.ceil(totalBooks / 5); // Assuming 5 items per page

  // Clear previous books
  bookGrid.innerHTML = '';

  // Display books
  books.forEach(book => {
    const card = document.createElement('div');
    card.className = 'book-card';

    card.innerHTML = `
      <img src="/${book.image}" alt="${book.title}" style="max-width: 100%; height: 150px; object-fit: cover;" />
      <h3>${book.title}</h3>
      <p>Category: ${book.categorie_id || 'Unknown'}</p>
      <p>Status: ${book.status || 'Not specified'}</p>
    `;

    bookGrid.appendChild(card);
  });

  // Update pagination
  document.getElementById('total-pages').textContent = totalPages;

  // Pagination buttons
  document.querySelector('.prev-page').disabled = page === 1;
  document.querySelector('.next-page').disabled = page === totalPages;
}

// Add event listeners for pagination
document.querySelector('.prev-page').addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    loadBooks(currentPage);
  }
});

document.querySelector('.next-page').addEventListener('click', () => {
  currentPage++;
  loadBooks(currentPage);
});

// Initial load
loadBooks();
