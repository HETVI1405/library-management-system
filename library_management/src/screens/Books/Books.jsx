import { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks } from '../../features/bookSlice';
import "./books.css";

export default function Books() {
  const { books } = useSelector((state) => state.books);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  return (
    <div className="books-container">
      <h2 className="books-title">Books</h2>
      <div className="books-grid">
        {books.map((book) => (
          <Card key={book.id} className="book-card">
            <Card.Img 
              variant="top" 
              src={book.image_url} 
              alt={book.title} 
              className="book-image"
            />
            <Card.Body>
              <Card.Title className="book-title">{book.title}</Card.Title>
              <Card.Text className="book-info">
                <span><b>Author:</b> {book.author}</span><br />
              </Card.Text>
              <Button className="details-btn">Details</Button>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
}
