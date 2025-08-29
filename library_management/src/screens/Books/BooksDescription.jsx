import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./books.css";

export default function BooksDescription() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { books } = useSelector((state) => state.books);

  const [book, setBook] = useState(null);

  useEffect(() => {
    const selectedBook = books.find((b) => b.id.toString() === id);
    setBook(selectedBook || null);
  }, [id, books]);

  if (!book) {
    return <div className="not-found">Book not found!</div>;
  }

  return (
    <div className="description-container">
      <Card className="description-card shadow-lg">
        <Card.Img
          variant="top"
          src={book.image_url}
          alt={book.title}
          className="description-image"
        />
        <Card.Body>
          <Card.Title className="description-title">{book.title}</Card.Title>
          <div className="description-info">
            <p><b>Author:</b> {book.author}</p>
            <p><b>Genre:</b> {book.genre}</p>
            <p><b>Rent:</b> {book.rent} Rs. / day</p>
            <p><b>Description:</b> {book.description || "No description available."}</p>
          </div>
          <div className="description-actions">
            <Button variant="secondary" onClick={() => navigate(-1)}>
              Go Back
            </Button>
            <Button variant="warning" onClick={() => navigate(`/editbook/${book.id}`)}>
              Edit
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
