import React, { useState, useEffect } from 'react';
import axios from "axios";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';



export default function Books() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/books")
      .then((res) => setBooks(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="d-flex flex-wrap gap-3 p-3">
      <h2 className="w-100">Books</h2>
      {books.map((book) => (
       
        <Card key={book.id} style={{ width: '18rem'}}>
          <Card.Img variant="top" src={book.image_url} alt={book.title} style={{height:"300px"}}/>
          <Card.Body>
            <Card.Title>{book.title}</Card.Title>
            <Card.Text>
              Author: {book.author} <br />
              Genre: {book.genre} <br />
              Price: ₹{book.price}
            </Card.Text>
            <Button variant="primary">Details</Button>
          </Card.Body>
        </Card>
      
      ))}
    </div>
  );
}
