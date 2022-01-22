import axios from "axios";
import React, { useRef } from "react";
import uniqid from "uniqid";

const AddBook = () => {
  const bookNameRef = useRef();
  const authorRef = useRef();
  const translatorRef = useRef();
  const descriptionRef = useRef();
  const coverRef = useRef();
  const pagesRef = useRef();

  async function submitHandler(event) {
    event.preventDefault();

    const bookName = bookNameRef.current.value;
    const authorName = authorRef.current.value;
    const translatorName = translatorRef.current.value;
    const description = descriptionRef.current.value;
    const coverURL = coverRef.current.value;
    const pageNumber = pagesRef.current.value;

    const book = {
      id: uniqid(),
      name: bookName,
      author: authorName,
      translator: translatorName,
      description: description,
      cover: coverURL,
      pages: pageNumber,
    };

    await axios
      .put(
        `https://college-library-83790-default-rtdb.europe-west1.firebasedatabase.app/books/${
          book.id
        }.json?auth=${localStorage.getItem("token")}`,
        book
      )
      .then((res) => {
        console.log(res);
      });
  }
  return (
    <div className="login">
      <div className="ui middle aligned center aligned grid">
        <div className="column">
          <h1>Add Book</h1>
          <form className="ui large form" onSubmit={submitHandler}>
            <div className="ui stacked segment">
              <div className="field">
                <div className="ui left icon input">
                  <i className="book icon"></i>
                  <input
                    type="text"
                    name="name"
                    placeholder="Book Name"
                    ref={bookNameRef}
                  />
                </div>
              </div>
              <div className="field">
                <div className="ui left icon input">
                  <i className="user icon"></i>
                  <input
                    type="text"
                    name="author"
                    placeholder="Author Name"
                    ref={authorRef}
                  />
                </div>
              </div>
              <div className="field">
                <div className="ui left icon input">
                  <i className="user outline icon"></i>
                  <input
                    type="text"
                    name="translator"
                    placeholder="Translator Name"
                    ref={translatorRef}
                  />
                </div>
              </div>
              <div className="field">
                <div className="ui left icon input">
                  <i className="question circle icon"></i>
                  <input
                    type="text"
                    name="description"
                    placeholder="Description"
                    ref={descriptionRef}
                  />
                </div>
              </div>
              <div className="field">
                <div className="ui left icon input">
                  <i className="file image icon"></i>
                  <input
                    type="url"
                    name="cover"
                    placeholder="Cover Image URL"
                    ref={coverRef}
                  />
                </div>
              </div>
              <div className="field">
                <div className="ui left icon input">
                  <i className="hashtag icon"></i>
                  <input
                    type="number"
                    name="pages"
                    placeholder="How Many Pages"
                    ref={pagesRef}
                  />
                </div>
              </div>
              <button className="ui primary labeled icon button" type="submit">
                <i className="plus circle icon"></i>
                Add
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBook;
