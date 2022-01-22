import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/auth-context";

const HomePage = () => {
  const { setId } = useContext(AuthContext);

  const navigate = useNavigate();

  const [userData, setUserData] = useState(null);
  const [userRentedBooks, setUserRentedBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getUserData() {
      setIsLoading(true);
      await axios
        .post(
          `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyBpSorQlW3cjxpl4XkxDMxDzupWvDgEWX4`,
          { idToken: localStorage.getItem("token") }
        )
        .then((res) => {
          axios
            .get(
              `https://college-library-83790-default-rtdb.europe-west1.firebasedatabase.app/users.json?auth=${localStorage.getItem(
                "token"
              )}`
            )
            .then((response) => {
              for (const i in response.data) {
                if (res.data.users[0].email === response.data[i].email) {
                  setUserData(response.data[i]);
                  setId(response.data[i].id);
                  setIsLoading(false);
                }
              }
            });
        });
    }

    getUserData();
  }, []);

  useEffect(() => {
    async function getUserRentedBooks() {
      setIsLoading(true);
      await axios
        .get(
          `https://college-library-83790-default-rtdb.europe-west1.firebasedatabase.app/rentedBooks.json?auth=${localStorage.getItem(
            "token"
          )}`
        )
        .then((res) => {
          const books = [];
          for (const i in res.data) {
            if (userData) {
              if (res.data[i].rentedUser === userData.id) {
                books.push(res.data[i]);
              }
            }
          }
          setUserRentedBooks(books);
          setIsLoading(false);
        });
    }
    getUserRentedBooks();
  }, [userData]);

  return (
    <div className="ui vertical masthead center aligned segment">
      <div className="ui text container">
        <h1 className="ui header">Welcome {userData && userData.name}</h1>
        <h2>My Books</h2>
        {userRentedBooks.length < 1 && <h4>There are no rented books</h4>}
        {userRentedBooks.length > 0 && (
          <div className="ui big relaxed celled list">
            {userRentedBooks.map((book) => (
              <div key={book.id} className="item">
                <div className="right floated content">
                  <div className="ui primary button">Return</div>
                </div>
                {book.name} ({book.author})
              </div>
            ))}
          </div>
        )}

        {isLoading && (
          <div className="ui active inverted dimmer">
            <div className="ui text loader">Loading</div>
          </div>
        )}
        <button
          className="ui right labeled icon primary button"
          onClick={() => {
            navigate("/library");
          }}
        >
          <i className="right arrow icon"></i>
          Rent a book
        </button>
      </div>
    </div>
  );
};

export default HomePage;
