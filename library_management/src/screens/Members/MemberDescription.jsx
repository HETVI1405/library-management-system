// import React from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import Button from "react-bootstrap/Button";
// import Card from "react-bootstrap/Card";

// export default function BookDetails() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { books } = useSelector((state) => state.books);

//   const book = books.find((b) => b.id === parseInt(id));

//   if (!book) {
//     return (
//       <div className="text-center mt-5">
//         <h2>Book Not Found</h2>
//         <Button variant="secondary" onClick={() => navigate("/books")}>
//           Go Back
//         </Button>
//       </div>
//     );
//   }

//   return (
//     <div className="d-flex justify-content-center align-items-center mt-5">
//       <Card style={{ width: "40rem" }} className="shadow-lg">
//         <Card.Img
//           variant="top"
//           src={book.image_url}
//           alt={book.title}
//           style={{ height: "400px", objectFit: "cover" }}
//         />
//         <Card.Body>
//           <Card.Title className="fw-bold fs-3">{book.title}</Card.Title>
//           <Card.Text className="fs-5">
//             <b>Author:</b> {book.author} <br />
//             <b>Genre:</b> {book.genre} <br />
//             <b>Rent:</b> {book.rent} Rs. / day <br />
//             <b>Status:</b>{" "}
//             <span
//               className={`badge ${
//                 book.available ? "bg-success" : "bg-danger"
//               }`}
//             >
//               {book.available ? "Available" : "Not Available"}
//             </span>
//             <br />
//             <b>Description:</b> {book.description || "No description available"}
//           </Card.Text>

//           <Button variant="primary" onClick={() => navigate("/books")}>
//             ⬅ Back to Books
//           </Button>
//         </Card.Body>
//       </Card>
//     </div>
//   );
// }
