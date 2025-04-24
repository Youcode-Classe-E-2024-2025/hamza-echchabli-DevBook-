const UToken = localStorage.getItem('token');
const bookId = new URLSearchParams(window.location.search).get('id'); // Assuming the book ID is passed as a query parameter

// Fetch book details
async function loadBookDetails() {
  const response = await fetch(`/api/book/${bookId}`, {
    headers: {
      'Authorization': `Bearer ${UToken}`
    }
  });

  const book = await response.json();
  
  if (response.ok) {
    document.getElementById('book-title').textContent = book.title;
    document.getElementById('book-description').textContent = book.description;
    document.getElementById('book-image').src = `/${book.image}`;
    document.getElementById('book-category').textContent = book.category_name;

    // Show the loan button if the book is available
    if (book.is_available) { // Assuming the book has an availability field
      document.getElementById('loan-book-button').style.display = 'inline-block';
    } else {
      document.getElementById('loan-book-button').style.display = 'none';
    }
  } else {
    alert('Book not found');
  }
}

// Loan the book
async function loanBook() {
  const response = await fetch(`/api/loan`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${UToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ book_id: bookId })
  });

  const data = await response.json();

  if (response.ok) {
    alert('You have successfully loaned this book!');
    // Optionally, redirect the user after loaning the book
    window.location.href = '/';
  } else {
    alert(data.message || 'Failed to loan the book');
  }
}

// Add event listener to the loan button
document.getElementById('loan-book-button').addEventListener('click', loanBook);

// Load the book details when the page is loaded
loadBookDetails();
