import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/auth-context";

const HomePage = () => {
  const navigate = useNavigate();

  const { user, setUser } = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(false);
  const [userRentedBooks, setUserRentedBooks] = useState([]);

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
              `https://college-library-83790-default-rtdb.europe-west1.firebasedatabase.app/users/${
                res.data.users[0].localId
              }.json?auth=${localStorage.getItem("token")}`
            )
            .then((r) => {
              setUser(r.data);

              axios
                .get(
                  `https://college-library-83790-default-rtdb.europe-west1.firebasedatabase.app/users/${
                    r.data.id
                  }/rentedBooks.json?auth=${localStorage.getItem("token")}`
                )
                .then((res) => {
                  const books = [];
                  for (const i in res.data) {
                    books.push({
                      id: res.data[i].id,
                      name: res.data[i].name,
                      author: res.data[i].author,
                      translator: res.data[i].translator,
                      pages: res.data[i].pages,
                      cover: res.data[i].cover,
                      description: res.data[i].description,
                    });
                  }
                  setUserRentedBooks(books);
                  setIsLoading(false);
                });
            });
        });
    }

    getUserData();

    return () => {
      setUserRentedBooks([]);
    };
  }, []);

  async function returnBook(book) {
    setIsLoading(true);

    await axios
      .put(
        `https://college-library-83790-default-rtdb.europe-west1.firebasedatabase.app/books/${
          book.id
        }.json?auth=${localStorage.getItem("token")}`,
        book
      )
      .then(() => {
        axios
          .delete(
            `https://college-library-83790-default-rtdb.europe-west1.firebasedatabase.app/users/${
              user.id
            }/rentedBooks/${book.id}.json?auth=${localStorage.getItem("token")}`
          )
          .then(() => {
            setIsLoading(false);

            navigate("/library");
          });
      });
  }

  return (
    <div className="ui vertical masthead center aligned segment">
      <div className="ui text container">
        <h1 className="ui header">Welcome {user && user.name}</h1>
        <h2>My Books</h2>
        {userRentedBooks && userRentedBooks.length < 1 && (
          <h4>There are no rented books</h4>
        )}
        {userRentedBooks.length > 0 && (
          <div className="ui big relaxed celled list">
            {userRentedBooks.map((book) => (
              <div key={book.id} className="item">
                <div className="right floated content">
                  <div
                    className="ui primary button"
                    onClick={() => returnBook(book)}
                  >
                    Return
                  </div>
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
