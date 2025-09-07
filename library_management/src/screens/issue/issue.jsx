import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchIssue } from "../../features/issueSlice";
import { fetchBooks } from "../../features/bookSlice";
import "./issue.css";
import { fetchMembers } from "../../features/membersSlice";

// 🔹 Fine calculation function
function calculateFine(issueDateStr, dueDateStr, returnDateStr, ratePerDay = 10) {
  if (!issueDateStr || !dueDateStr) return 0;

  const dueDate = new Date(dueDateStr);
  const returnDate = returnDateStr ? new Date(returnDateStr) : new Date();

  if (returnDate > dueDate) {
    const diffInMs = returnDate - dueDate;
    const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
    return diffInDays * ratePerDay;
  }

  return 0;
}

// New helper function to get first N words
function firstNWords(text, n) {
  if (!text) return "";
  return text.split(" ").slice(0, n).join(" ");
}

export default function Issues() {
  const dispatch = useDispatch();

  const { issue, status, error } = useSelector((state) => state.issue);
  const allBooks = useSelector((state) => state.books.allBooks); // array format
  const members = useSelector((state) => state.members).members; // array format

  useEffect(() => {
    dispatch(fetchMembers());
    dispatch(fetchBooks());
    dispatch(fetchIssue());
  }, [dispatch]);

  if (status === "loading") return <p className="loading">Loading...</p>;
  if (status === "failed") return <p className="error">Error: {error}</p>;

  return (
    <div className="issues-container">
      <h2>Issued Books</h2>

      {issue.length === 0 ? (
        <p className="no-data">No issued books found.</p>
      ) : (
        <ul>
          {issue.map((i, index) => {
            const {
              id,
              issueId,
              bookId,
              memberId,
              issueDate,
              dueDate,
              returnDate,
              status,
              issueDetails = {},
            } = i;

            const isReturned = issueDetails.status === "returned";

            const finalIssueDate = issueDetails.issueDate ?? issueDate;
            const finalDueDate = issueDetails.dueDate ?? dueDate;
            const finalReturnDate = issueDetails.returnDate ?? returnDate;
            const calculatedFine = calculateFine(finalIssueDate, finalDueDate, finalReturnDate);

            const matchedBook = allBooks?.find((b) => b.id == bookId);
            const matchedMember = members?.find((m) => m.memberId == memberId);

            return (
              <li
                key={index}
                className="issue-item"
                style={{
                  display: "flex",
                  gap: "20px",
                  alignItems: "center",
                  marginBottom: "20px",
                }}
              >
                <div style={{display: "flex",alignItems: "center", gap: "15px"}}>
                  <img
                  src={matchedBook?.image_url || "/fallback.jpg"}
                  alt={matchedBook?.title || "Book Cover"}
                  style={{
                    height: "250px",
                    width: "200px",
                    padding: "10px",
                    objectFit: "cover",
                  }}
                />
                  <div>
                    <p><span>Book Title:</span> {firstNWords(matchedBook?.title, 3)}</p>
                  <p><span>Member:</span> {matchedMember?.name || "Unknown Member"}</p>
                  <p><span>Issue Date:</span> {finalIssueDate}</p>
                  <p><span>Due Date:</span> {finalDueDate}</p>
                  <p><span>Return Date:</span> {finalReturnDate ?? "Not Returned"}</p>
                  <p><span>Status:</span> {issueDetails.status ?? status}</p>
                  <p><span>Fine:</span> {calculatedFine} Rs</p>
                  </div>
                </div>

                <button className="returnBook">{isReturned ? "Returned" : "Return"}</button>
              </li> 
            );
          })}
        </ul>
      )}
    </div>
  );
}








// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import axios from "axios";
// import { fetchIssue } from "../../features/issueSlice";
// import { fetchBooks } from "../../features/bookSlice";
// import { fetchMembers } from "../../features/membersSlice";
// import "./issue.css";

// // Calculate fine if overdue
// function calculateFine(issueDateStr, dueDateStr, returnDateStr, ratePerDay = 10) {
//   if (!issueDateStr || !dueDateStr) return 0;
//   const dueDate = new Date(dueDateStr);
//   const returnDate = returnDateStr ? new Date(returnDateStr) : new Date();

//   if (returnDate > dueDate) {
//     const diffTime = returnDate.getTime() - dueDate.getTime();
//     const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
//     return diffDays * ratePerDay;
//   }
//   return 0;
// }

// function firstNWords(text, n) {
//   if (!text) return "";
//   return text.split(" ").slice(0, n).join(" ");
// }

// export default function Issues() {
//   const dispatch = useDispatch();
//   const { issue, status, error } = useSelector((state) => state.issue);
//   const allBooks = useSelector((state) => state.books.allBooks);
//   const members = useSelector((state) => state.members.members);

//   useEffect(() => {
//     dispatch(fetchMembers());
//     dispatch(fetchBooks());
//     dispatch(fetchIssue());
//   }, [dispatch]);

//   // Handle book return
//   const handleReturn = async (id, issueDetails) => {
//     const todayStr = new Date().toISOString().split("T")[0];
//     const fine = calculateFine(issueDetails.issueDate, issueDetails.dueDate, todayStr);

//     const updatedIssueDetails = {
//       ...issueDetails,
//       returnDate: todayStr,
//       status: "returned",
//       fine,
//     };

//     try {
//       console.log("PATCH payload:", { issueDetails: updatedIssueDetails });
//       await axios.patch(`http://localhost:3000/issues/?id=${id}`, {
//         issueDetails: updatedIssueDetails,
//       });
//       alert("Book returned successfully!");
//       dispatch(fetchIssue());
//     } catch (error) {
//       console.error("Error returning book:", error);
//       alert("Failed to return book.");
//     }
//   };

//   if (status === "loading") return <p>Loading...</p>;
//   if (status === "failed") return <p>Error: {error}</p>;

//   if (!issue || issue.length === 0) return <p>No issued books found.</p>;

//   return (
//     <div className="issues-container">
//       <h2>Issued Books</h2>
//       <ul>
//         {issue.map(({ id, bookId, memberId, issueDetails }) => {
//           const fineCalculated = calculateFine(
//             issueDetails.issueDate,
//             issueDetails.dueDate,
//             issueDetails.returnDate
//           );

//           const book = allBooks?.find((b) => b.id === bookId);
//           const member = members?.find((m) => m.memberId === memberId);

//           const isReturned = issueDetails.status === "returned";

//           return (
//             <li key={id} className="issue-item" style={{ marginBottom: 20 }}>
//               <img
//                 src={book?.image_url || "/fallback.jpg"}
//                 alt={book?.title || "Book"}
//                 style={{ height: 250, width: 200, objectFit: "cover", marginRight: 15 }}
//               />
//               <div>
//                 <p><strong>Book:</strong> {firstNWords(book?.title, 3)}</p>
//                 <p><strong>Member:</strong> {member?.name || "Unknown"}</p>
//                 <p><strong>Issue Date:</strong> {issueDetails.issueDate}</p>
//                 <p><strong>Due Date:</strong> {issueDetails.dueDate}</p>
//                 <p><strong>Return Date:</strong> {issueDetails.returnDate || "Not returned"}</p>
//                 <p><strong>Status:</strong> {issueDetails.status}</p>
//                 <p><strong>Fine:</strong> {fineCalculated} Rs</p>
//               </div>
//               <button
//                 disabled={isReturned}
//                 onClick={() => handleReturn(id, issueDetails)}
//               >
//                 {isReturned ? "Returned" : "Return"}
//               </button>
//             </li>
//           );
//         })}
//       </ul>
//     </div>
//   );
// }
