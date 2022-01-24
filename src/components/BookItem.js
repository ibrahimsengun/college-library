import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/auth-context";

const BookItem = (props) => {
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [book, setBook] = useState(props.book);

  async function rentBook() {
    setIsLoading(true);

    const book = { ...props.book };

    await axios
      .put(
        `https://college-library-83790-default-rtdb.europe-west1.firebasedatabase.app/users/${
          user.id
        }/rentedBooks/${book.id}.json?auth=${localStorage.getItem("token")}`,
        book
      )
      .then((res) => {
        axios
          .delete(
            `https://college-library-83790-default-rtdb.europe-west1.firebasedatabase.app/books/${
              book.id
            }.json?auth=${localStorage.getItem("token")}`
          )
          .then((res) => {
            setIsLoading(null);
          });
      });

    navigate("/home");
  }

  async function deleteBook() {
    setIsLoading(true);
    await axios
      .delete(
        `https://college-library-83790-default-rtdb.europe-west1.firebasedatabase.app/books/${
          props.book.id
        }.json?auth=${localStorage.getItem("token")}`
      )
      .then((res) => {
        setIsLoading(false);
        setBook(null);
      });
  }

  return (
    <>
      {book && (
        <div className="item">
          <img className="ui small image" src={book.cover} alt="book-cover" />
          <div className="content">
            {isLoading && (
              <div className="ui active inverted dimmer">
                <div className="ui text loader">Loading</div>
              </div>
            )}
            <div className="header">{book.name}</div>
            <div className="meta">
              {book.author} (Author)
              {book.translator ? `, ${book.translator} (Translator)` : ""}
            </div>

            <div className="ui divider"></div>

            <div className="description">{book.description}</div>

            <div className="ui divider"></div>

            <div className="extra">
              <div className="meta">{book.pages} page</div>
              {!user.isAdmin && (
                <div
                  className="ui right floated primary button"
                  onClick={rentBook}
                >
                  Rent
                  <i className="right chevron icon"></i>
                </div>
              )}
              {user.isAdmin && (
                <div
                  className="ui right floated primary button"
                  onClick={deleteBook}
                >
                  Delete book
                  <i className="right chevron icon"></i>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {!book && <h1>There are no books.</h1>}
    </>
  );
};

export default BookItem;
