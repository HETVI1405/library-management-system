import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteBook, fetchBooks } from "../../features/bookSlice";
import { useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import "./books.css";

export default function Books() {
  const { allBooks } = useSelector((state) => state.books);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedGenre, setSelectedGenre] = useState("All");

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  const genres = ["All", ...new Set(allBooks.map((book) => book.genre))];

  const filteredBooks = allBooks
    .filter(
      (book) =>
        (selectedGenre === "All" || book.genre === selectedGenre) &&
        (book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.author.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      if (sortOrder === "asc") return a.rent - b.rent;
      return b.rent - a.rent;
    });

  return (
    <div className="books-container">
      <h2 className="books-title">Books</h2>

      {/* Search + Sort + Genre Filter */}
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

      {/* Books Table */}
      <div className="table-responsive mt-4">
        {filteredBooks.length > 0 ? (
          <Table striped bordered hover responsive>
            <thead className="custom-thead">
              <tr>
                
                <th>Book Cover</th>
                <th>Title</th>
                <th>Author</th>
                <th>Genre</th>
                <th>Rent (₹/day)</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBooks.map((book) => (
                <tr key={book.id}>
                  
                  <td>
                    <img
                      src={book.image_url}
                      alt={book.title}
                      className="book-cover"
                      onClick={() => navigate(`/books/${book.id}`)}
                    />
                  </td>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.genre}</td>
                  <td>₹{book.rent}</td>
                  <td className="action-buttons">
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => navigate(`/editbook/${book.id}`)}
                      className="edit-btn"
                    >
                      <FaEdit className="icon" /> Edit
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => dispatch(deleteBook(book.id))}
                      className="delete-btn"
                    >
                      <MdDeleteForever className="icon" /> Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <h4 className="no-books">No books found!</h4>
        )}
      </div>
    </div>
  );
}
