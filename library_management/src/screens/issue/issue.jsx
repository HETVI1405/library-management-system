import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchIssue } from "../../features/issueSlice";
import "./issue.css";

// Fine calculation (flexible, ratePerDay configurable)
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
      <h2 style={{textAlign:"center"}}>Issued Books</h2>

      {issue.length === 0 ? (
        <p className="no-data">No issued books found.</p>
      ) : (
        <div className="table-wrapper">
          <table className="issue-table">
            <thead>
              <tr>
                <th>Issue ID</th>
                <th>Book ID</th>
                <th>ISBN</th>
                <th>Member ID</th>
                <th>Issue Date</th>
                <th>Due Date</th>
                <th>Return Date</th>
                <th>Status</th>
                <th>Fine</th>
              </tr>
            </thead>
            <tbody>
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
                  status: issueStatus,
                  issueDetails = {},
                } = i;

                // handle both root-level & nested
                const finalIssueDate = issueDetails.issueDate ?? issueDate;
                const finalDueDate = issueDetails.dueDate ?? dueDate;
                const finalReturnDate = issueDetails.returnDate ?? returnDate;
                const finalStatus = issueDetails.status ?? issueStatus;

                const calculatedFine = calculateFine(
                  finalIssueDate,
                  finalDueDate,
                  finalReturnDate
                );

                return (
                  <tr key={id}>
                    <td>{issueId ?? id}</td>
                    <td>{book?.id ?? bookId}</td>
                    <td>{book?.isbns ?? "N/A"}</td>
                    <td>{memberId}</td>
                    <td>{finalIssueDate}</td>
                    <td>{finalDueDate}</td>
                    <td>{finalReturnDate ?? "Not Returned"}</td>
                    <td>{finalStatus}</td>
                    <td>{calculatedFine} Rs</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
