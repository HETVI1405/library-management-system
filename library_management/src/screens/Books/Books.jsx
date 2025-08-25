import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useDispatch, useSelector } from "react-redux";
import { deleteBook, paginationBooks } from '../../features/bookSlice';
import { useNavigate } from "react-router-dom";
import "./books.css";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

export default function Books() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {books} = useSelector((state) => state.books); 

  const [count, setCount] = useState(1); 
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [expandedTitles, setExpandedTitles] = useState({}); 

  useEffect(() => {
    // dispatch(fetchBooks())
    dispatch(paginationBooks(count)); 
  }, [dispatch, count]);

  const toggleTitle = (id) => {
    setExpandedTitles((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const genres = ["All", ...new Set(books.map((book) => book.genre))];

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

      {/* search sort filter */}
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

      {/* Books display */}
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
              <Card.Title className="book-title">
                {expandedTitles[book.id]
                  ? book.title
                  : book.title.split(" ").slice(0, 5).join(" ") + (book.title.split(" ").length > 5 ? "..." : "")}

                {book.title.split(" ").length > 5 && (
                  <span
                    onClick={() => toggleTitle(book.id)}
                    style={{ color: "blue", cursor: "pointer", marginLeft: "5px", fontSize: "0.9em" }}
                  >
                    {expandedTitles[book.id] ? "See less" : "See more"}
                  </span>
                )}
              </Card.Title>

              <Card.Text className="book-info">
                <span><b>Author :</b> {book.author}</span><br />
                <span><b>Genre :</b> {book.genre}</span><br />
                <span><b>Rent :</b> {book.rent} Rs. / day</span>
              </Card.Text>

              <div style={{display:'flex',justifyContent:"space-between",alignItems:'center',marginTop:"10px"}}>
                <Button className='edit-btn' onClick={() => navigate(`/editbook/${book.id}`)}><FaEdit /></Button>
              <Button className="delete-btn" onClick={() => dispatch(deleteBook(book.id))}><MdDeleteForever style={{fontSize:"22px"}} /></Button>
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      <div className="pagination">
        <button disabled={count === 1} onClick={() =>{ return ( setCount(count-1), paginationBooks(count - 1))}}>Prev</button>
        <span>Page : {count}</span>
        <button
          // disabled={count}
          onClick={() => {return ( setCount(count+1), paginationBooks(count + 1))}}
        >
          Next
        </button>
      </div>

      </div>
  );
}
