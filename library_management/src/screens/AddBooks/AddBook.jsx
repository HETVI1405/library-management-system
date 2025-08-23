import { useState } from "react";
import { addBook } from "../../features/bookSlice";
import { useDispatch } from "react-redux";
import "./AddBook.css";

export default function AddBooks() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [price, setPrice] = useState("");
  const [image_url, setImageUrl] = useState("");
  const [availability, setavailability] = useState("")
  const dispatch = useDispatch();

  const handlePostBook = () => {
    if (!title || !author || !genre || !price) {
      alert("Please fill all fields before submitting.");
      return;
    }

    const book = {
      title,
      author,
      genre,
      price: parseInt(price),
      isbns: [],
      quantity: 1,
      availability: availability,
      image_url,
    };

    dispatch(addBook(book));
    setTitle("");
    setAuthor("");
    setGenre("");
    setPrice("");
    setImageUrl("");
  };

  return (
    <div className="addbook">
      <div className="row">
        <h1>Add Book</h1>
        <div className="col-6">
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="author">Author</label>
            <input
              type="text"
              className="form-control"
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="genre">Genre</label>
            <input
              type="text"
              className="form-control"
              id="genre"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
            />
          </div>

        </div>
        <div className="col-6">

          <div className="form-group">
            <label htmlFor="price">Rent</label>
            <input
              type="number"
              className="form-control"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="image_url">Image URL</label>
            <input
              type="text"
              className="form-control"
              id="image_url"
              value={image_url}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </div>

          <div className="form-group" style={{ display: "flex", alignItems: "center", marginTop: "55px" }}>
            <input
              type="checkbox"
              id="availability"
              checked={availability}
              onChange={(e) => setavailability(e.target.checked)}
              style={{ width: "20px", height: "20px" }}
            />
            <label htmlFor="availability" style={{ marginLeft: "20px", fontWeight: "500" }}>
              Available
            </label>
          </div>

        </div>
        <button className="addbookbtn btn mt-3" onClick={handlePostBook}>
          Add Book
        </button>
      </div>
    </div>
  );
}
