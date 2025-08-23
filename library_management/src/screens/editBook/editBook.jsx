import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editBook, fetchBooks } from "../../features/bookSlice";
import { useNavigate, useParams } from "react-router-dom";

export default function EditBook() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { books } = useSelector((state) => state.books);
  const existingBook = books.find((book) => book.id === parseInt(id));

  // State for all fields
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [isbns, setIsbns] = useState("");
  const [availability, setAvailability] = useState("available");
  const [rating, setRating] = useState("");
  const [url, setUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
  if (!existingBook) {
    // fetch all books if not available
    dispatch(fetchBooks());
  } else {
    // when existingBook becomes available, set form fields
    setTitle(existingBook.title);
    setAuthor(existingBook.author);
    setGenre(existingBook.genre || "");
    setPrice(existingBook.price || "");
    setQuantity(existingBook.quantity || "");
    setIsbns(existingBook.isbns ? existingBook.isbns.join(",") : "");
    setAvailability(existingBook.availability || "available");
    setRating(existingBook.rating || "");
    setUrl(existingBook.url || "");
    setImageUrl(existingBook.image_url || "");
  }
}, [dispatch, existingBook]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedBook = {
      title,
      author,
      genre,
      price: parseFloat(price),
      quantity: parseInt(quantity),
      isbns: isbns.split(",").map((isbn) => isbn.trim()),
      availability,
      rating: parseInt(rating),
      url,
      image_url: imageUrl,
    };

    dispatch(editBook({ id: parseInt(id), updatedData: updatedBook }));
    navigate("/book");
  };

  return (
    <div className="form-container">
      <h2>Edit Book</h2>
      <form onSubmit={handleSubmit} className="book-form">
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
        <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Author" required />
        <input type="text" value={genre} onChange={(e) => setGenre(e.target.value)} placeholder="Genre" />
        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" />
        <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder="Quantity" />
        <input type="text" value={isbns} onChange={(e) => setIsbns(e.target.value)} placeholder="ISBNs (comma separated)" />
        
        <select value={availability} onChange={(e) => setAvailability(e.target.value)}>
          <option value="available">Available</option>
          <option value="unavailable">Unavailable</option>
        </select>

        <input type="number" value={rating} onChange={(e) => setRating(e.target.value)} placeholder="Rating (1-5)" />
        <input type="url" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="Book URL" />
        <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="Image URL" />

        <button type="submit">Update Book</button>
      </form>
    </div>
  );
}
