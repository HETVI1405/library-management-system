import React, { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchIssue } from "../../features/issueSlice";
import { fetchBooks } from "../../features/bookSlice";
import { fetchMembers } from "../../features/membersSlice";
import { AuthorizationContext } from "../../Components/Context/ContentApi";

// Fine calculation function
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

function firstNWords(text, n) {
  if (!text) return "";
  return text.split(" ").slice(0, n).join(" ");
}

export default function Issues() {
  const dispatch = useDispatch();

  // Logged-in user's email
  const { admin: loggedInEmail } = useContext(AuthorizationContext);

  // Redux state
  const { issue, status, error } = useSelector((state) => state.issue);
  const allBooks = useSelector((state) => state.books.allBooks) || [];
  const members = useSelector((state) => state.members).members || [];
  

  // Determine if logged-in user is admin or member or unknown
  const isAdmin = loggedInEmail?.toLowerCase() === "admin123@gmail.com";

  // Find logged-in member by email (case insensitive)
  const currentMember = members.find(
    (m) => m.email?.toLowerCase() === loggedInEmail?.toLowerCase()
  );

  // Filter issues based on user role:
  // Admin sees all issues
  // Member sees only their issues
  // Unknown sees no issues
  const filteredIssues = React.useMemo(() => {
    if (isAdmin) return issue || [];
    if (currentMember) return (issue || []).filter((i) => i.memberId === currentMember.memberId);
    return [];
  }, [issue, isAdmin, currentMember]);

  // Filter issues by view status (returned/not-returned)
  const [view, setView] = useState("not-returned");

  const filteredByViewIssues = filteredIssues.filter((i) => {
    const isReturned = i.issueDetails?.status === "returned";
    if (view === "returned") return isReturned;
    if (view === "not-returned") return !isReturned;
    return true;
  });

  // Pagination
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentIssues = filteredByViewIssues.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredByViewIssues.length / itemsPerPage);

  // Total fine calculation (for filtered issues - admin or member)
  const totalFine = filteredIssues.reduce((acc, i) => {
    const issueDetails = i.issueDetails || i;
    return acc + calculateFine(issueDetails.issueDate, issueDetails.dueDate, issueDetails.returnDate);
  }, 0);

  // Fetch data on mount
  useEffect(() => {
    dispatch(fetchMembers());
    dispatch(fetchBooks());
    dispatch(fetchIssue());
  }, [dispatch]);

  if (status === "loading") return <p className="loading">Loading...</p>;
  if (status === "failed") return <p className="error">Error: {error}</p>;

  return (
    <div className="issues-container">
      <h2>
        Issued Books{" "}
        {isAdmin && `(${filteredIssues.length})`}
        {!isAdmin && currentMember && `(${filteredIssues.length})`}
        {!isAdmin && !currentMember && "(0)"}
      </h2>

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

      <p>
        <strong>Total Fine: </strong> {totalFine} Rs
      </p>

      {currentIssues.length === 0 ? (
        <p className="no-data">No books found in this category.</p>
      ) : (
        <>
          <ul>
            {currentIssues.map((i) => {
              const {
                id,
                bookId,
                memberId,
                issueDate,
                dueDate,
                returnDate,
                issueDetails = {},
              } = i;

              const finalIssueDate = issueDetails.issueDate ?? issueDate;
              const finalDueDate = issueDetails.dueDate ?? dueDate;
              const finalReturnDate = issueDetails.returnDate ?? returnDate;
              const calculatedFine = calculateFine(finalIssueDate, finalDueDate, finalReturnDate);

              const matchedBook = allBooks.filter((b) => b.id == bookId);
            
              const matchedMember = members.find((m) => m.memberId === memberId);

              return (
                <li
                  key={id}
                  className="issue-item"
                  style={{ display: "flex", gap: "20px", alignItems: "center", marginBottom: "20px" }}
                >
                 {matchedBook.map((el,index)=> {
                    return  <div key={index} style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                    <img
                      src={el.image_url || "/fallback.jpg"}
                      alt={el.title || "Book Cover"}
                      style={{ height: "250px", width: "200px", padding: "10px", objectFit: "cover" }}
                    />
                    <div>
                      <p><span>Book Title:</span> {firstNWords(el.title, 3)}</p>
                      <p><span>Member:</span> {matchedMember?.name || "Unknown Member"}</p>
                      <p><span>Issue Date:</span> {finalIssueDate}</p>
                      <p><span>Due Date:</span> {finalDueDate}</p>
                      <p><span>Return Date:</span> {finalReturnDate ?? "Not Returned"}</p>
                      <p><span>Status:</span> {issueDetails.status ?? "issued"}</p>
                      <p><span>Fine:</span> {calculatedFine} Rs</p>
                    </div>
                  </div>
                 })}
                </li>
              );
            })}
          </ul>

          <div className="pagination">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
