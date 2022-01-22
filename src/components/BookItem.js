import React from "react";

const BookItem = (props) => {
  return (
    <div className="item">
      <img className="ui small image" src={props.book.cover} alt="avatar" />
      <div className="content">
        <div className="header">{props.book.name}</div>
        <div className="meta">
          {props.book.author} (Author), {props.book.translator} (Translator)
        </div>
        <div className="description">{props.book.description}</div>
        <div className="extra">
          <div className="ui right floated primary button">
            Rent
            <i className="right chevron icon"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookItem;
