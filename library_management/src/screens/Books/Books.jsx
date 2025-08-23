import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useDispatch, useSelector } from "react-redux";
import { deleteBook, fetchBooks } from '../../features/bookSlice';
import { useNavigate } from "react-router-dom";
import "./books.css";

export default function Books() {
  const { books } = useSelector((state) => state.books);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedGenre, setSelectedGenre] = useState("All");

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  // Extract unique genres from books
  const genres = ["All", ...new Set(books.map((book) => book.genre))];

  // Filter and sort books
  const filteredBooks = books
    .filter((book) =>
      (selectedGenre === "All" || book.genre === selectedGenre) &&
      (
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
    .sort((a, b) => {
      if (sortOrder === "asc") return a.rent - b.rent;
      return b.rent - a.rent;
    });

  return (
    <div className="books-container">
      <h2 className="books-title">Books</h2>

      {/* Search, Sort, and Genre Filter Controls */}
      <div className="books-controls">
        <input
          type="text"
          placeholder="Search by title or author..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />

        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="sort-dropdown"
        >
          <option value="asc">Sort by Rent: Low to High</option>
          <option value="desc">Sort by Rent: High to Low</option>
        </select>

        <select
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
          className="genre-dropdown"
        >
          {genres.map((genre, idx) => (
            <option key={idx} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>

      {/* Books Grid */}
      <div className="books-grid">
        {filteredBooks.map((book) => (
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
                <span><b>Author :</b> {book.author}</span><br />
                <span><b>Genre :</b> {book.genre}</span><br />
                <span><b>Rent :</b> {book.rent} Rs. / day</span>
              </Card.Text>
              <Button className='edit-btn' onClick={() => navigate(`/editbook/${book.id}`)}>Edit</Button>
              <Button className="delete-btn" onClick={() => dispatch(deleteBook(book.id))}>Delete</Button>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
}
