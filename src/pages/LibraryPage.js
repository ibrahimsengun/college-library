import axios from "axios";
import React, { useEffect, useState } from "react";
import BookItem from "../components/BookItem";

const LibraryPage = () => {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getBooks() {
      setIsLoading(true);
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
          setBooks(allBooks);
          setIsLoading(false);
        });
    }
    getBooks();
  }, []);

  return (
    <div className="ui vertical masthead center aligned segment">
      <div className="ui container">
        {books.length < 1 && <h1>There are no books.</h1>}
        {books.length > 0 && (
          <div className="ui divided items">
            {books.map((book) => (
              <BookItem key={book.id} book={book} />
            ))}
          </div>
        )}
        {isLoading && (
          <div className="ui active inverted dimmer">
            <div className="ui text loader">Loading</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LibraryPage;
