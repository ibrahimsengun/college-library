import React from "react";
import AddBook from "../components/AddBook";
import AllRentedBooks from "../components/AllRentedBooks";

const AdminPage = () => {
  return (
    <div>
      <AddBook />
      <AllRentedBooks />
    </div>
  );
};

export default AdminPage;
