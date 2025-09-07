import { useEffect, useState, useContext } from "react";
import axios from "axios";
import "./Dashboard.css";
import {
  RiBookShelfFill,
  RiGroup3Fill,
  RiBook2Fill,
  RiMoneyDollarCircleFill,
  RiCalendarCheckFill,
} from "@remixicon/react";
import RoundChart from "./RoundChart";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks } from "../../features/bookSlice";
import { fetchMembers } from "../../features/membersSlice";
import { fetchIssue } from "../../features/issueSlice";
import MembershipProgress from "../Dashboard/MembershipProgress";
import membersData from "../../../db.json";
import { AuthorizationContext } from "../../Components/Context/ContentApi"; // make sure this exists

export default function Dashboard() {
  const { admin } = useContext(AuthorizationContext);
  const isAdmin = admin === "admin123@gmail.com";

  const [reservations, setReservations] = useState([]);

  const dispatch = useDispatch();

  const { allBooks } = useSelector((state) => state.books);
  const { members } = useSelector((state) => state.members);
  const { issue } = useSelector((state) => state.issue);

  // 🔹 Fine Calculation Helper
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

  // 🔹 Calculate Total Fine
  const totalFine = issue.reduce((acc, i) => {
    const finalIssueDate = i.issueDetails?.issueDate ?? i.issueDate;
    const finalDueDate = i.issueDetails?.dueDate ?? i.dueDate;
    const finalReturnDate = i.issueDetails?.returnDate ?? i.returnDate;

    return acc + calculateFine(finalIssueDate, finalDueDate, finalReturnDate);
  }, 0);

  useEffect(() => {
    dispatch(fetchBooks());
    dispatch(fetchMembers());
    dispatch(fetchIssue());

    axios
      .get("http://localhost:3000/reservations")
      .then((res) => setReservations(res.data));
  }, [dispatch]);

  return (
    <div className="dashboard">
      {isAdmin ? (
        <>
          <div className="dashboard_con">
            <div className="box">
              <RiBookShelfFill size={70} color="#f37633ff" />
              <h2>{allBooks.length}</h2>
              <h3>Total Books</h3>
            </div>
            <div className="box">
              <RiGroup3Fill size={70} color="#4682B4" />
              <h2>{members.length}</h2>
              <h3>Total Members</h3>
            </div>
            <div className="box">
              <RiBook2Fill size={70} color="#508163ff" />
              <h2>{issue.length}</h2>
              <h3>Issued Books</h3>
            </div>
            <div className="box">
              <RiMoneyDollarCircleFill size={70} color="#b46aecff" />
              <h2>{totalFine}</h2>
              <h3>Total Fines</h3>
            </div>
            <div className="box">
              <RiCalendarCheckFill size={70} color="#2ea2acff" />
              <h2>{reservations.length}</h2>
              <h3>Total Users</h3>
            </div>
          </div>

          <div className="charts-row">
            <div className="chart-box1">
              <RoundChart
                books={allBooks}
                members={members}
                issued={issue}
                fines={totalFine}
                reservations={reservations}
              />
            </div>

            <div className="chart-box">
              <MembershipProgress members={membersData.members} />
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="dashboard_con">
            <div className="box">
              <RiBookShelfFill size={70} color="#f37633ff" />
              <h2>{allBooks.length}</h2>
              <h3>Total Books</h3>
            </div>
            <div className="box">
              <RiGroup3Fill size={70} color="#4682B4" />
              <h2>{members.length}</h2>
              <h3>Total Visiters</h3>
            </div>
            <div className="box">
              <RiBook2Fill size={70} color="#508163ff" />
              <h2>{issue.length}</h2>
              <h3>Issued Books</h3>
            </div>
            <div className="box">
              <RiMoneyDollarCircleFill size={70} color="#b46aecff" />
              <h2>{totalFine} Rs</h2>
              <h3>Total Fines</h3>
            </div>
          </div>

          <div className="charts-row">
            <div className="chart-box1">
              <RoundChart
                books={allBooks}
                members={members}
                issued={issue}
                fines={totalFine}
                reservations={reservations}
              />
            </div>

            <div className="chart-box">
              <MembershipProgress members={membersData.members} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
