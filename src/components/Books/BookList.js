import React, { useState, useEffect } from 'react';
import axiosInstance from '../../api/axiosConfig';
import { useNavigate } from 'react-router-dom';
import './BookList.css';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [available, setAvailable] = useState(null); 
  const [page, setPage] = useState(0);  
  const [size, setSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    fetchBooksPaginated(page); 
  }, [page]);

  const fetchBooksPaginated = async (page) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        navigate('/login');
        return;
      }

      const response = await axiosInstance.get(`/api/books/paginated?page=${page}&size=${size}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setBooks(response.data.content);
      setTotalPages(response.data.totalPages);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching paginated books:', error);
      setLoading(false);
    }
  };

  const handleBorrow = async (bookId) => {
    try {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');
  
      if (!userId) {
        alert("Error: Unable to borrow book. User ID is missing.");
        return;
      }
  
      const response = await axiosInstance.put(`/api/books/${bookId}/borrow/${userId}`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      alert(response.data);
    } catch (error) {
      if (error.response && error.response.status === 409) {
        alert('This book has already been borrowed by another user.');
      } else {
        alert('Error borrowing book. Please try again.');
      }
    }
  };

  const handleFilter = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const params = new URLSearchParams();

      if (title) params.append('title', title);
      if (author) params.append('author', author);
      if (available !== null) params.append('available', available);

      const response = await axiosInstance.get(`/api/books/filter?${params.toString()}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setBooks(response.data);
    } catch (error) {
      console.error('Error filtering books:', error);
    }
  };

  const handleReset = () => {
    setTitle('');
    setAuthor('');
    setAvailable(null);
    fetchBooksPaginated(0);
  };

  const handleNextPage = () => {
    if (page < totalPages - 1) {
      setPage(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  if (loading) {
    return <div>Loading books...</div>;
  }

  return (
    <div className="book-list-container">
      <div className="sidebar">
        <a href="/profile">My Profile</a>
        <a href="/borrow-history">My Borrowing History</a>

        {localStorage.getItem('role') === 'ADMIN' && (
          <>
            <a href="/edit-users">Edit Users</a>
            <a href="/edit-books">Edit Books</a>
            <a href="/admin/all-borrowing-history">All Borrowing History</a>
          </>
        )}
      </div>

      <div className="main-content">
        <button onClick={() => navigate('/login')} className="logout-button">
          Logout
        </button>

        <form onSubmit={handleFilter} className="filter-form">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
          <select value={available} onChange={(e) => setAvailable(e.target.value === 'true')}>
            <option value="">Any Availability</option>
            <option value="true">Available</option>
            <option value="false">Not Available</option>
          </select>
          <button type="submit">Filter</button>
          <button type="button" onClick={handleReset}>Reset</button>
        </form>

        <h2>List of Books</h2>

        <table className="book-table">
          <thead>
            <tr>
              <th>Book Title</th>
              <th>Author</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {books.length > 0 ? (
              books.map((book) => (
                <tr key={book.id}>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>
                    <button
                      onClick={() => handleBorrow(book.id)}
                      className="borrow-button"
                    >
                      Borrow
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">No books available</td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="pagination">
          <button onClick={handlePrevPage} disabled={page === 0}>Previous</button>
          <span>Page {page + 1} of {totalPages}</span>
          <button onClick={handleNextPage} disabled={page === totalPages - 1}>Next</button>
        </div>
      </div>
    </div>
  );
};

export default BookList;