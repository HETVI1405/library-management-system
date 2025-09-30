import { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal'; 
import { useDispatch, useSelector } from "react-redux";
import { deleteBook, fetchBooks, paginationBooks } from '../../features/bookSlice';
import { issueBook } from '../../features/issueSlice';  // <-- import issueBook thunk
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

  // New states for modal and issue data
  const [showModal, setShowModal] = useState(false);
  const [issueData, setIssueData] = useState({
    memberId: "",
    issueDate: "",
    days: "",
    returnDate: "",
    bookId: null,
    bookTitle: "",
    bookRent: 0
  });

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

  // Handle issuing book
  const handleIssue = () => {
    if (!issueData.memberId || !issueData.days) {
      alert("Please fill Member ID and number of days");
      return;
    }

    const dataToSave = {
      id: Date.now(), // or your id generator
      bookId: issueData.bookId,
      memberId: issueData.memberId,
      issueDetails: {
        issueDate: issueData.issueDate,
        dueDate: issueData.returnDate,
        returnDate: null,
        status: "issued",
        fine: 0,
      }
    };

    dispatch(issueBook(dataToSave))
      .unwrap()
      .then(() => {
        alert("Book issued successfully!");
        setShowModal(false);
        setIssueData({
          memberId: "",
          issueDate: "",
          days: "",
          returnDate: "",
          bookId: null,
          bookTitle: "",
          bookRent: 0
        });
      })
      .catch((err) => {
        alert("Failed to issue book: " + err);
      });
  };

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
                  </span><Button
                    className="issue-btn"
                    onClick={() => {
                      const today = new Date();
                      const dueDate = new Date(today);
                      dueDate.setDate(today.getDate() + 15); // 15 days later

                      // 👇 Member ID auto generate (random / sequence)  
                      const newMemberId = Math.floor(Math.random() * 1000) + 1;

                      const issueData = {
                        issueId: Date.now(), // unique issueId
                        book: {
                          id: book.id,
                          isbns: book.isbns || "N/A",
                        },
                        memberId: newMemberId, // auto new member ID
                        issueDetails: {
                          issueDate: today.toISOString().split("T")[0],
                          dueDate: dueDate.toISOString().split("T")[0],
                          returnDate: null,
                          status: "issued",
                          fine: 0,
                        },
                      };
                      
                      // 👇 dispatch to redux / api
                      dispatch(issueBook(issueData) );
                    }}
                  >
                    Issue Book
                  </Button>

                </Card.Text>
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
                  <FaEdit /> Edit
                </Button>
                <Button
                  className="delete-btn-listview"
                  onClick={() => dispatch(deleteBook(book.id))}
                >
                  <MdDeleteForever style={{ fontSize: "22px" }} /> Delete
                </Button>
                <Button
                  className="issue-btn-listview"
                  onClick={() => {
                    const today = new Date().toISOString().split('T')[0];
                    setIssueData({
                      memberId: "",
                      issueDate: today,
                      days: "",
                      returnDate: "",
                      bookId: book.id,
                      bookTitle: book.title,
                      bookRent: book.rent
                    });
                    setShowModal(true);
                  }}
                >
                  Issue Book
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

      {/* Modal for issuing book */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Issue Book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <b>Book Title:</b> {issueData.bookTitle}
          </div>
          <div>
            <b>Rent per day:</b> {issueData.bookRent} Rs.
          </div>

          <div className="mb-3 mt-3">
            <label className="form-label">Member ID</label>
            <input
              type="text"
              className="form-control"
              value={issueData.memberId}
              onChange={(e) =>
                setIssueData({ ...issueData, memberId: e.target.value })
              }
              placeholder="Enter member ID"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Issue Date</label>
            <input
              type="date"
              className="form-control"
              value={issueData.issueDate}
              readOnly
            />
          </div>

          <div className="mb-3">
            <label className="form-label">For How Many Days?</label>
            <input
              type="number"
              className="form-control"
              value={issueData.days}
              onChange={(e) => {
                const days = e.target.value;
                if (days === "" || isNaN(days) || days < 0) {
                  setIssueData({ ...issueData, days: "", returnDate: "" });
                  return;
                }
                const returnDate = new Date(issueData.issueDate);
                returnDate.setDate(returnDate.getDate() + parseInt(days));
                const formattedReturnDate = returnDate.toISOString().split('T')[0];

                setIssueData({
                  ...issueData,
                  days,
                  returnDate: formattedReturnDate
                });
              }}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Return Date</label>
            <input
              type="date"
              className="form-control"
              value={issueData.returnDate}
              readOnly
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleIssue}>
            Confirm Issue
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
