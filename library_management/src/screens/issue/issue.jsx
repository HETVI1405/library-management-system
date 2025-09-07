import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchIssue } from "../../features/issueSlice";
import "./issue.css";

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

export default function Issues() {
  const dispatch = useDispatch();
  const { issue, status, error } = useSelector((state) => state.issue);

  useEffect(() => {
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
          {issue.map((i) => {
            const {
              id,
              issueId,
              book,
              bookId,
              memberId,
              issueDate,
              dueDate,
              returnDate,
              status,
              fine,
              issueDetails = {},
            } = i;

            const finalIssueDate = issueDetails.issueDate ?? issueDate;
            const finalDueDate = issueDetails.dueDate ?? dueDate;
            const finalReturnDate = issueDetails.returnDate ?? returnDate;

            const calculatedFine = calculateFine(finalIssueDate, finalDueDate, finalReturnDate);

            return (
              <li key={id} className="issue-item">
                <b>Issue ID:</b> {issueId ?? id} <br />
                <b>Book ID:</b> {book?.id ?? bookId} <br />
                <b>ISBN:</b> {book?.isbns ?? "N/A"} <br />
                <b>Member ID:</b> {memberId} <br />
                <b>Issue Date:</b> {finalIssueDate} <br />
                <b>Due Date:</b> {finalDueDate} <br />
                <b>Return Date:</b> {finalReturnDate ?? "Not Returned"} <br />
                <b>Status:</b> {issueDetails.status ?? status} <br />
                <b>Fine:</b> {calculatedFine} Rs
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
