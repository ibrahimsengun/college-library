import React from "react";

const BookItem = (props) => {
  return (
    <div className="item">
      <img className="ui small image" src={props.book.cover} alt="avatar" />
      <div className="content">
        <div className="header">{props.book.name}</div>
        <div className="description">
          <b>Writer:</b> {props.book.writer}
        </div>
        <div class="extra">
          <div class="ui right floated primary button">
            Rent
            <i class="right chevron icon"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookItem;
