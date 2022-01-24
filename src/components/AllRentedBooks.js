import axios from "axios";
import React, { useEffect, useState } from "react";

const AllRentedBooks = () => {
  const [allRentedBooks, setAllRentedBooks] = useState([]);

  useEffect(() => {
    async function getAllRentedBooks() {
      await axios
        .get(
          `https://college-library-83790-default-rtdb.europe-west1.firebasedatabase.app/users.json?auth=${localStorage.getItem(
            "token"
          )}`
        )
        .then((res) => {

          const users = [];
          for (const i in res.data) {
            users.push({
              userName: res.data[i].name,
              rentedBooks: res.data[i].rentedBooks,
            });
          }

          const rentedBooks = [];

          for (const i in users) {
            for (const j in users[i].rentedBooks) {
              if (users[i].rentedBooks !== undefined)
                rentedBooks.push({
                  userName: users[i].userName,
                  bookName: users[i].rentedBooks[j].name,
                });
            }
          }
          setAllRentedBooks(rentedBooks);
        });
    }

    getAllRentedBooks();
  }, []);

  return (
    <>
      <h1>All Rented Books</h1>
      <div className="ui list">
        {allRentedBooks.length < 1 && <h3>No rental books</h3>}
        {allRentedBooks &&
          allRentedBooks.length > 0 &&
          allRentedBooks.map((book) => (
            <div className="item">
              {book.userName} {"- "}
              <div className="ui blue horizontal label">{book.bookName}</div>
            </div>
          ))}
      </div>
    </>
  );
};

export default AllRentedBooks;
