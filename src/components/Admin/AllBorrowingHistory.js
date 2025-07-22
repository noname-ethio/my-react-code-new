import React, { useState, useEffect } from 'react';
import axiosInstance from '../../api/axiosConfig';
import './AllBorrowingHistory.css'; 

const AllBorrowingHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllHistory = async () => {
      try {
        const token = localStorage.getItem('token');  
        const response = await axiosInstance.get('/api/borrowing-history', {
          headers: {
            Authorization: `Bearer ${token}`,  // Send JWT token in Authorization header
          },
        });

        // Check if the response contains data
        if (response.data && response.data.length > 0) {
          setHistory(response.data); 
        } else {
          alert("No borrowing history found.");
        }
        setLoading(false);  // Stop loading
      } catch (error) {
        console.error('Error fetching all borrowing history:', error);
        alert('Failed to fetch borrowing history.');
        setLoading(false);
      }
    };

    fetchAllHistory();  // Call the function to fetch data
  }, []);

  if (loading) {
    return <div>Loading all borrowing history...</div>;
  }

  return (
    <div className="history-container">
      <h2>All Borrowing History</h2>
      {history.length === 0 ? (
        <p>No borrowing history found.</p>
      ) : (
        <table className="history-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Book</th>
              <th>Borrowed On</th>
              <th>Returned On</th>
            </tr>
          </thead>
          <tbody>
            {history.map((record, index) => (
              <tr key={index}>
                <td>{record.user.name}</td>
                <td>{record.book.title}</td>
                <td>{record.borrowedAt}</td>
                <td>{record.returnedAt ? record.returnedAt : 'Not returned yet'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AllBorrowingHistory;