import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useDispatch, useSelector } from "react-redux";
<<<<<<< HEAD
import { deleteBook, fetchBooks, paginationBooks } from '../../features/bookSlice';
=======
import { deleteBook, fetchBooks } from '../../features/bookSlice';
>>>>>>> db3de3586989775a18951663648aed48ab16f4b2
import { useNavigate } from "react-router-dom";
import "./books.css";

export default function Books() {
  const { books } = useSelector((state) => state.books);
  const dispatch = useDispatch();
  const navigate = useNavigate();
<<<<<<< HEAD
  const [count, setCount] = useState(1); 
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [expandedTitles, setExpandedTitles] = useState({}); 
  const { books, allBooks } = useSelector((state) => state.books);
  const Books = books || [];  
=======

  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedGenre, setSelectedGenre] = useState("All");
>>>>>>> db3de3586989775a18951663648aed48ab16f4b2

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);
<<<<<<< HEAD

  useEffect(() => {
    dispatch(paginationBooks(count));
  }, [dispatch, count]);

  const totalPages = Math.ceil(allBooks.length / 8);

  const toggleTitle = (id) => {
    setExpandedTitles((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };
=======
>>>>>>> db3de3586989775a18951663648aed48ab16f4b2

  const genres = ["All", ...new Set(allBooks.map((book) => book.genre))];

  const filteredBooks = Books.filter((book) =>
    (selectedGenre === "All" || book.genre === selectedGenre) &&
    (
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase())
    )
  ).sort((a, b) => {
    if (sortOrder === "asc") return a.rent - b.rent;
    return b.rent - a.rent;
  });

  return (
    <div className="books-container">
      <h2 className="books-title">Books</h2>

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

<<<<<<< HEAD
=======
      {/* Books Grid */}
>>>>>>> db3de3586989775a18951663648aed48ab16f4b2
      <div className="books-grid">
        {filteredBooks.map((book) => (
          <Card key={book.id} className="book-card shadow-sm">
            <Card.Img
              variant="top"
              src={book.image_url}
              alt={book.title}
              className="book-image"
               onClick={() => navigate(`/books/${book.id}`)}
            />
            <Card.Body>
<<<<<<< HEAD
              <Card.Title className="book-title">
                {expandedTitles[book.id]
                  ? book.title
                  : book.title.split(" ").slice(0, 5).join(" ") +
                    (book.title.split(" ").length > 5 ? "..." : "")}

                {book.title.split(" ").length > 5 && (
                  <span
                    onClick={() => toggleTitle(book.id)}
                    style={{ color: "blue", cursor: "pointer", marginLeft: "5px", fontSize: "0.9em" }}
                  >
                    {expandedTitles[book.id] ? "See less" : "See more"}
                  </span>
                )}
              </Card.Title>

=======
              <Card.Title className="book-title">{book.title}</Card.Title>
>>>>>>> db3de3586989775a18951663648aed48ab16f4b2
              <Card.Text className="book-info">
                <span><b>Author:</b> {book.author}</span><br />
                <span><b>Genre:</b> {book.genre}</span><br />
                <span><b>Rent:</b> {book.rent} Rs. / day</span>
              </Card.Text>

<<<<<<< HEAD
              <div style={{display:'flex',justifyContent:"space-between",alignItems:'center',marginTop:"10px"}}>
                <Button className='edit-btn' onClick={() => navigate(`/editbook/${book.id}`)}>
                  <FaEdit />
                </Button>
                <Button className="delete-btn" onClick={() => dispatch(deleteBook(book.id))}>
                  <MdDeleteForever style={{fontSize:"22px"}} />
=======
              <div className="btns d-flex justify-content-between">
              

                <Button
                  className="edit-btn"
                  variant="warning"
                  onClick={() => navigate(`/editbook/${book.id}`)}
                >
                  Edit
                </Button>

                <Button
                  className="delete-btn"
                  variant="danger"
                  onClick={() => dispatch(deleteBook(book.id))}
                >
                  Delete
>>>>>>> db3de3586989775a18951663648aed48ab16f4b2
                </Button>
              </div>
               
            </Card.Body>
          </Card>
        ))}
      </div>
<<<<<<< HEAD

      <div className="pagination">
        <button 
          disabled={count === 1} 
          onClick={() => setCount(count - 1)}
        >
          Prev
        </button>
        <span>Page : {count} of {totalPages}</span>
        <button
          disabled={count === totalPages}
          onClick={() => setCount(count + 1)}
        >
          Next
        </button>
      </div>
=======
>>>>>>> db3de3586989775a18951663648aed48ab16f4b2
    </div>
  );
}
