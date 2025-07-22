import React, { useState, useEffect } from 'react';
import axiosInstance from '../../api/axiosConfig';
import { useNavigate } from 'react-router-dom';
import './EditBooks.css'; 

const EditBooks = () => {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [isbn, setIsbn] = useState('');  
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axiosInstance.get('/api/books', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBooks(response.data);
      } catch (error) {
        console.error('Error fetching books:', error);
        if (error.response.status === 403) {
          alert('Access denied. Only ADMIN users can view this page.');
          navigate('/books');
        }
      }
    };

    fetchBooks();
  }, [navigate]);

  const addBook = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axiosInstance.post('/api/books', { title, author, isbn }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBooks([...books, response.data]);
      setTitle('');
      setAuthor('');
      setIsbn('');
      alert('Book added successfully.');
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  const deleteBook = async (bookId) => {
    try {
      const token = localStorage.getItem('token');
      await axiosInstance.delete(`/api/books/${bookId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setBooks(books.filter((book) => book.id !== bookId));
      alert('Book deleted successfully.');
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  return (
    <div className="edit-books-container">
      <h2>Edit Books</h2>

      <form className="add-book-form" onSubmit={addBook}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="ISBN"
          value={isbn}
          onChange={(e) => setIsbn(e.target.value)}
          required
        />
        <button type="submit">Add Book</button>
      </form>

      <table className="book-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>ISBN</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.isbn}</td>
              <td>
                <button className="delete-button" onClick={() => deleteBook(book.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EditBooks;