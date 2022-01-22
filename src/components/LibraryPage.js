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
          const allBooks = [];
          for (const i in res.data) {
            allBooks.push({
              id: res.data[i].id,
              name: res.data[i].name,
              author: res.data[i].author,
              translator: res.data[i].translator,
              description: res.data[i].description,
              cover: res.data[i].cover,
              pages: res.data[i].pages,
            });
          }
          console.log(allBooks);
          setBooks(allBooks);
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
