import React, { Suspense, useEffect, useState } from "react";
import "./App.css";
import Pagination from "./components/Pagination";

const App = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); // State to manage loading indicator

  useEffect(() => {
    setLoading(true); // Set loading state to true when fetching data
    fetch(
      `https://give-me-users-forever.vercel.app/api/users/${currentPage}/next`
    )
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.users);
        setLoading(false); // Set loading state to false after data is fetched
      })
      .catch((err) => {
        console.error(err);
        setLoading(false); // Ensure loading state is set to false on error
      });
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="App">
      <h1>User Details</h1>
      <Suspense
        fallback={
          <div style={{ color: "white" }}>Loading user information...</div>
        }
      >
        <div className="user-list">
          {loading ? (
            <div style={{ color: "white", font: "bold" }}>
              Loading user information...
            </div>
          ) : (
            users.map((user) => (
              <div key={user.ID} className="user-item">
                <p className="title">Name: {user.FirstNameLastName}</p>
                <p>Job Title: {user.JobTitle}</p>
                <p>Company: {user.Company}</p>
                <p>Email: {user.Email}</p>
                <p>Phone: {user.Phone}</p>
              </div>
            ))
          )}
        </div>
      </Suspense>
      <Pagination currentPage={currentPage} onPageChange={handlePageChange} />
    </div>
  );
};

export default App;
