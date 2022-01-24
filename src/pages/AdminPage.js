import React from "react";
import AddBook from "../components/AddBook";
import AllRentedBooks from "../components/AllRentedBooks";
import AllUsers from "../components/AllUsers";

const AdminPage = () => {
  return (
    <div className="ui two column centered grid">
      <div className="four column centered row">
        <div className="column">
          <AllRentedBooks />
        </div>
        <div className="column">
          <AllUsers />
        </div>
      </div>

      <div className="column">
        <AddBook />
      </div>
    </div>
  );
};

export default AdminPage;
