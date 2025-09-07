import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchIssue } from "../../features/issueSlice";
import { fetchBooks } from "../../features/bookSlice";
import "./issue.css";
import { fetchMembers } from "../../features/membersSlice";
import axios from "axios";

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
  const allBooks = useSelector((state) => state.books.allBooks);
  const members = useSelector((state) => state.members).members;

  // New state to manage the view: "all", "returned", or "not-returned"
  const [view, setView] = useState("not-returned");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    dispatch(fetchMembers());
    dispatch(fetchBooks());
    dispatch(fetchIssue());
  }, [dispatch]);

  const handleReturn = async (id, issueDetails) => {
    const todayStr = new Date().toISOString().split("T")[0];
    const fine = calculateFine(issueDetails.issueDate, issueDetails.dueDate, todayStr);

    const updatedIssueDetails = {
      ...issueDetails,
      returnDate: todayStr,
      status: "returned",
      fine,
    };

    try {
      await axios.patch(`http://localhost:3000/issues/${id}`, {
        issueDetails: updatedIssueDetails,
      });
      alert("Book returned successfully!");
      dispatch(fetchIssue());
    } catch (error) {
      console.error("Error returning book:", error);
      alert("Failed to return book.");
    }
  };

  if (status === "loading") return <p className="loading">Loading...</p>;
  if (status === "failed") return <p className="error">Error: {error}</p>;

  // Filter issues based on the current view
  const filteredIssues = issue.filter((i) => {
    const isReturned = i.issueDetails?.status === "returned";
    if (view === "returned") {
      return isReturned;
    } else if (view === "not-returned") {
      return !isReturned;
    }
    return true; // "all" view (not implemented in this example but good practice)
  });

  // Recalculate paginated data based on the filtered issues
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentIssues = filteredIssues.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredIssues.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <div className="issues-container">
      <h2>Issued Books</h2>

      {/* New navigation buttons for switching views */}
      <div className="view-selector">
        <button
          onClick={() => {
            setView("not-returned");
            setCurrentPage(1);
          }}
          className={view === "not-returned" ? "active" : ""}
        >
          Not Returned
        </button>
        <button
          onClick={() => {
            setView("returned");
            setCurrentPage(1);
          }}
          className={view === "returned" ? "active" : ""}
        >
          Returned
        </button>
      </div>

      {currentIssues.length === 0 ? (
        <p className="no-data">No books found in this category.</p>
      ) : (
        <>
          <ul>
            {currentIssues.map((i, index) => {
              const {
                id,
                bookId,
                memberId,
                issueDate,
                dueDate,
                returnDate,
                status: oldStatus,
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
                  <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
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
                      <p>
                        <span>Book Title:</span> {firstNWords(matchedBook?.title, 3)}
                      </p>
                      <p>
                        <span>Member:</span> {matchedMember?.name || "Unknown Member"}
                      </p>
                      <p>
                        <span>Issue Date:</span> {finalIssueDate}
                      </p>
                      <p>
                        <span>Due Date:</span> {finalDueDate}
                      </p>
                      <p>
                        <span>Return Date:</span> {finalReturnDate ?? "Not Returned"}
                      </p>
                      <p>
                        <span>Status:</span> {issueDetails.status ?? oldStatus}
                      </p>
                      <p>
                        <span>Fine:</span> {calculatedFine} Rs
                      </p>
                    </div>
                  </div>

                  <button
                    className="returnBook"
                    disabled={isReturned}
                    onClick={() => handleReturn(id, issueDetails)}
                  >
                    {isReturned ? "Returned" : "Return"}
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Pagination Controls */}
          <div className="pagination">
            <button onClick={handlePrevPage} disabled={currentPage === 1}>
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button onClick={handleNextPage} disabled={currentPage === totalPages}>
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}