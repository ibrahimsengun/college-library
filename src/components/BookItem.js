import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/auth-context";

const BookItem = (props) => {
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

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
        /*axios
          .delete(
            `https://college-library-83790-default-rtdb.europe-west1.firebasedatabase.app/books/${
              book.id
            }.json?auth=${localStorage.getItem("token")}`
          )
          .then((res) => {
            setIsLoading(false);
          });*/
      });

    navigate("/home");
  }

  return (
    <div className="item">
      <img className="ui small image" src={props.book.cover} alt="avatar" />
      <div className="content">
        {isLoading && (
          <div className="ui active inverted dimmer">
            <div className="ui text loader">Loading</div>
          </div>
        )}
        <div className="header">{props.book.name}</div>
        <div className="meta">
          {props.book.author} (Author)
          {props.book.translator ? ", (Translator)" : ""}
        </div>
        <hr />
        <div className="description">{props.book.description}</div>
        <hr />
        <div className="extra">
          <div className="meta">{props.book.pages} page</div>
          <div className="ui right floated primary button" onClick={rentBook}>
            Rent
            <i className="right chevron icon"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookItem;
