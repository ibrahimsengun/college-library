import axios from "axios";
import React, { useEffect, useState } from "react";
import BookItem from "./BookItem";

const LibraryPage = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    async function getBooks() {
      await axios
        .get(
          `https://college-library-83790-default-rtdb.europe-west1.firebasedatabase.app/books.json?auth=${localStorage.getItem(
            "token"
          )}`
        )
        .then((res) => {
          setBooks(res.data);
        });
    }
    getBooks();
  }, []);

  return (
    <div className="ui container">
      <div className="ui divided items">
        {books.map((book) => (
          <BookItem book={book} />
        ))}
      </div>
    </div>
  );
};

export default LibraryPage;
