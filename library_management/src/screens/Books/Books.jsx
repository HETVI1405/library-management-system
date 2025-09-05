import { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useDispatch, useSelector } from "react-redux";
import { deleteBook, fetchBooks, paginationBooks } from '../../features/bookSlice';
import { issueBook } from "../../features/issueSlice";   // ✅ add this line
import { useNavigate } from "react-router-dom";
import "./books.css";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { AuthorizationContext } from '../../Components/Context/ContentApi';


export default function Books() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [count, setCount] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [expandedTitles, setExpandedTitles] = useState({});
  const { books, allBooks } = useSelector((state) => state.books);
  const Books = books || [];

  const { admin } = useContext(AuthorizationContext);
  const isAdmin = admin === "admin123@gmail.com";

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  useEffect(() => {
    dispatch(paginationBooks(count));
  }, [dispatch, count]);

  const totalPages = Math.ceil(allBooks.length / 8);

  const toggleTitle = (id) => {
    setExpandedTitles((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

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

      {!isAdmin ? (
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
                    : book.title.split(" ").slice(0, 5).join(" ") +
                    (book.title.split(" ").length > 5 ? "..." : "")}

                  {book.title.split(" ").length > 5 && (
                    <span
                      onClick={() => toggleTitle(book.id)}
                      style={{
                        color: "blue",
                        cursor: "pointer",
                        marginLeft: "5px",
                        fontSize: "0.9em",
                      }}
                    >
                      {expandedTitles[book.id] ? "See less" : "See more"}
                    </span>
                  )}
                </Card.Title>

                <Card.Text className="book-info">
                  <span>
                    <b>Author :</b> {book.author}
                  </span>
                  <br />
                  <span>
                    <b>Genre :</b> {book.genre}
                  </span>
                  <br />
                  <span>
                    <b>Rent :</b> {book.rent} Rs. / day
                  </span>

                </Card.Text>
                <Button
                  className="issue-btn"
                  onClick={() => {
                    const today = new Date();
                    const dueDate = new Date(today);
                    dueDate.setDate(today.getDate() + 15); // 15 days later

                    const issueData = {
                      issueId: Date.now(), // unique ID
                      book: {
                        id: book.id,
                        isbns: book.isbns || "N/A", // make sure your book has ISBN
                      },
                      memberId: 1, // TODO: replace with logged-in member
                      issueDetails: {
                        issueDate: today.toISOString().split("T")[0],
                        dueDate: dueDate.toISOString().split("T")[0],
                        returnDate: null,
                        status: "issued",
                        fine: 0,
                      },
                      id: crypto.randomUUID(), // random unique ID
                    };

                    dispatch(issueBook(issueData));
                  }}
                >
                  Issue Book
                </Button>
              </Card.Body>
            </Card>
          ))}
        </div>
      ) : (
        <div className="books-listview">
          {filteredBooks.map((book) => (
            <div key={book.id} className="book-item-listview">
              <img
                src={book.image_url}
                alt={book.title}
                className="book-image-listview"
              />

              <div className="book-details-listview">
                <h5 className="book-title-listview">
                  {expandedTitles[book.id]
                    ? book.title
                    : book.title.split(" ").slice(0, 5).join(" ") +
                    (book.title.split(" ").length > 5 ? "..." : "")}

                  {book.title.split(" ").length > 5 && (
                    <span
                      onClick={() => toggleTitle(book.id)}
                      style={{
                        color: "blue",
                        cursor: "pointer",
                        marginLeft: "5px",
                        fontSize: "0.9em",
                      }}
                    >
                      {expandedTitles[book.id] ? "See less" : "See more"}
                    </span>
                  )}
                </h5>

                <div className="book-info-listview">
                  <span>
                    <b>Author:</b> {book.author}
                  </span>
                  <br />
                  <span>
                    <b>Genre:</b> {book.genre}
                  </span>
                  <br />
                  <span>
                    <b>Rent:</b> {book.rent} Rs. / day
                  </span>

                </div>

              </div>

              <div className="book-actions-listview">
                <Button
                  className="edit-btn-listview"
                  onClick={() => navigate(`/editbook/${book.id}`)}
                >
                  <FaEdit />
                </Button>
                <Button
                  className="delete-btn-listview"
                  onClick={() => dispatch(deleteBook(book.id))}
                >
                  <MdDeleteForever style={{ fontSize: "22px" }} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="pagination">
        <button disabled={count === 1} onClick={() => setCount(count - 1)}>
          Prev
        </button>
        <span>
          Page : {count} of {totalPages}
        </span>
        <button
          disabled={count === totalPages}
          onClick={() => setCount(count + 1)}
        >
          Next
        </button>

      </div>
    </div>
  );
}
