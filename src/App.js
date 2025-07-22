import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate} from 'react-router-dom'; 
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import BookList from './components/Books/BookList';
import BorrowHistory from './components/Borrow/BorrowHistory';
import MyProfile from './components/Profile/MyProfile';
import EditUsers from './components/Admin/EditUsers';
import EditBooks from './components/Admin/EditBooks';
import AllBorrowingHistory from './components/Admin/AllBorrowingHistory';

const App = () => {
  const token = localStorage.getItem('token');


  return (
    <Router>
      <Routes>
        <Route path="/" element={token ? <Navigate to="/books" /> : <Navigate to="/login" />} />
        
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/books" element={<BookList />} />
        <Route path="/borrow-history" element={<BorrowHistory />} />
        <Route path="/profile" element={<MyProfile />} />
        <Route path="/edit-users" element={<EditUsers />} />
        <Route path="/edit-books" element={<EditBooks />} />
        <Route path='/admin/all-borrowing-history' element={<AllBorrowingHistory />} />
      </Routes>  
    </Router>
  );
};

export default App;