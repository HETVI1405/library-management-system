import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editBook, fetchBookById } from "../../features/bookSlice";
import { useNavigate, useParams } from "react-router-dom";
import "./EditBook.css"

export default function EditBook() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { singleBook, status } = useSelector((state) => state.books);

  // Local states
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [rent, setRent] = useState("");
  const [quantity, setQuantity] = useState("");
  const [isbns, setIsbns] = useState("");
  const [availability, setAvailability] = useState("available");
  const [rating, setRating] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  // ✅ Fetch this book only once
  useEffect(() => {
    dispatch(fetchBookById(id));
  }, [dispatch, id]);

  // ✅ Populate form when singleBook is loaded
  useEffect(() => {
    if (singleBook) {
      setTitle(singleBook.title || "");
      setAuthor(singleBook.author || "");
      setGenre(singleBook.genre || "");
      setRent(singleBook.rent || "");
      setQuantity(singleBook.quantity || "");
      setIsbns(singleBook.isbns ? singleBook.isbns.join(",") : "");
      setAvailability(singleBook.availability || "available");
      setRating(singleBook.rating || "");
      setImageUrl(singleBook.image_url || "");
    }
  }, [singleBook]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedBook = {
      title,
      author,
      genre,
      rent: parseFloat(rent),
      quantity: parseInt(quantity),
      isbns: isbns.split(",").map((isbn) => isbn.trim()),
      availability,
      rating: parseInt(rating),
      image_url: imageUrl,
    };

    dispatch(editBook({ id: parseInt(id), updatedData: updatedBook }));
    navigate("/book");
  };

  if (status === "loading") return <p>Loading book...</p>;
  if (!singleBook) return <p>Book not found</p>;

  return (
    <div className="form-container">
      <h2>Edit Book</h2>
      <form onSubmit={handleSubmit} className="book-form">
        <div className="row">
          <div className="col-6">
            <label htmlFor="">Title</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
            <label htmlFor="">Author</label>
            <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Author" required />
            <label htmlFor="">Genre</label>
            <input type="text" value={genre} onChange={(e) => setGenre(e.target.value)} placeholder="Genre" />
            <label htmlFor="">Rent</label>
            <input type="number" value={rent} onChange={(e) => setRent(e.target.value)} placeholder="Rent" />
            <label htmlFor="">Quantity</label>
            <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder="Quantity" /></div>
          <div className="col-6">
            <label htmlFor="">ISBNs</label>
            <input type="text" value={isbns} onChange={(e) => setIsbns(e.target.value)} placeholder="ISBNs (comma separated)" />

            <label htmlFor="">Select Availability</label>
            <select value={availability} onChange={(e) => setAvailability(e.target.value)}>
              <option value="available">Available</option>
              <option value="unavailable">Unavailable</option>
            </select>

            <label htmlFor="">Rate The Book</label>
            <input type="number" value={rating} onChange={(e) => setRating(e.target.value)} placeholder="Rating (1-5)" />

            <label htmlFor="">Book Image URL</label>
            <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="Image URL" />
          </div>
        </div>


        <button type="submit">Update Book</button>
      </form>
    </div>
  );
}
