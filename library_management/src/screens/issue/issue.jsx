import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchIssue } from "../../features/issueSlice";

export default function Issues() {
  const dispatch = useDispatch();
  const { issue, status, error } = useSelector((state) => state.issue);

  useEffect(() => {
    dispatch(fetchIssue());
  }, [dispatch]);

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Issued Books</h2>
      {issue.length === 0 ? (
        <p>No issued books found.</p>
      ) : (
        <ul>
          {issue.map((i) => (
            <li key={i.id} style={{ marginBottom: "15px" }}>
              <b>Issue ID:</b> {i.issueId || i.id} <br />
              <b>Book ID:</b> {i.book?.id || i.bookId} <br />
              <b>ISBN:</b> {i.book?.isbns || "N/A"} <br />
              <b>Member ID:</b> {i.memberId} <br />
              <b>Issue Date:</b> {i.issueDetails?.issueDate || i.issueDate} <br />
              <b>Due Date:</b> {i.issueDetails?.dueDate || i.dueDate} <br />
              <b>Return Date:</b> {i.issueDetails?.returnDate || i.returnDate || "Not Returned"} <br />
              <b>Status:</b> {i.issueDetails?.status || i.status} <br />
              <b>Fine:</b> {i.issueDetails?.fine || i.fine || 0} Rs
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
