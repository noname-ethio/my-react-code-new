import React, { useState, useEffect } from 'react';
import axiosInstance from '../../api/axiosConfig';
import { useNavigate } from 'react-router-dom';
import './BorrowHistory.css'; 

const BorrowHistory = () => {
  const [history, setHistory] = useState([]);  
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBorrowingHistory = async () => {
      try {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId'); 

        if (!userId) {
          console.error("User ID is missing.");
          alert("Error: Unable to fetch borrowing history.");
          navigate('/login');  // Redirect to login if no userId found
          return;
        }

        // Send request to backend to fetch borrowing history
        const response = await axiosInstance.get(`/api/borrowing-history/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Check if response data is an array and has content
        if (Array.isArray(response.data) && response.data.length > 0) {
          setHistory(response.data);  // Set history data if available
        } else {
          setErrorMessage("You have no borrowing history."); // Set a message if history is empty
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching borrowing history:', error);
        setErrorMessage('Error fetching borrowing history.');
        setLoading(false);
      }
    };

    fetchBorrowingHistory();
  }, [navigate]);

  // Function to handle returning a book
  const handleReturnBook = async (bookId) => {
    try {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');

      if (!bookId) {
        console.error('Book ID is missing');
        alert('Book ID is missing. Unable to return the book.');
        return;
      }

      const response = await axiosInstance.put(`/api/books/${bookId}/return/${userId}`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert(response.data);  // Display success message

      // Update the borrowing history to reflect the returned book
      setHistory(history.map((record) =>
        record.book.id === bookId ? { ...record, returnedAt: new Date().toISOString() } : record
      ));
    } catch (error) {
      console.error('Error returning the book:', error);
      alert('Error returning the book. Please try again.');
    }
  };

  // Handle loading state
  if (loading) {
    return <div>Loading borrowing history...</div>;
  }

  // Handle empty history or errors
  if (errorMessage) {
    return <div>{errorMessage}</div>;
  }

  return (
    <div className="history-container">
      <h2>Your Borrowing History</h2>
      {history.length === 0 ? (
        <p className="empty-message">No borrowing history found.</p>
      ) : (
        <table className="history-table">
          <thead>
            <tr>
              <th>Book Title</th>
              <th>Borrowed On</th>
              <th>Returned On</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {history.map((record, index) => (
              <tr key={index}>
                <td>{record.book ? record.book.title : 'Undefined'}</td>
                <td>{record.borrowedAt}</td>
                <td>{record.returnedAt ? record.returnedAt : 'Not returned yet'}</td>
                <td>
                  {!record.returnedAt && (
                    <button onClick={() => handleReturnBook(record.book.id)} className="return-button">
                      Return
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BorrowHistory;