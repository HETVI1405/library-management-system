// import { useEffect, useState, useContext } from "react";
// import axios from "axios";
// import "./Dashboard.css";
// import {
//   RiBookShelfFill,
//   RiGroup3Fill,
//   RiBook2Fill,
//   RiMoneyDollarCircleFill,
// } from "@remixicon/react";
// import { FaUserShield } from "react-icons/fa";
// import RoundChart from "./RoundChart";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchBooks } from "../../features/bookSlice";
// import { fetchMembers } from "../../features/membersSlice";
// import { fetchIssue } from "../../features/issueSlice";
// import MembershipProgress from "../Dashboard/MembershipProgress";
// import { AuthorizationContext } from "../../Components/Context/ContentApi";

// export default function Dashboard() {
//   const { admin } = useContext(AuthorizationContext);
//   const isAdmin = admin?.toLowerCase() === "admin123@gmail.com";

//   const dispatch = useDispatch();

//   const { allBooks = [] } = useSelector((state) => state.books);
//   const { members = [] } = useSelector((state) => state.members);
//   const { issue = [] } = useSelector((state) => state.issue);
  

//   const [users, setUsers] = useState([]);

//   const memberData = members.map((m) => m);

//   const adminEmail = admin && members.map((m) => m.email).find((email) => email === admin) ;
//   const isMember = issue.map((el)=>el.memberId) === memberData.map((m)=>m.id) ;
//   console.log("isMember", isMember);


//   const calculateFine = (issueDateStr, dueDateStr, returnDateStr, ratePerDay = 10) => {
//     if (!issueDateStr || !dueDateStr) return 0;

//     const dueDate = new Date(dueDateStr);
//     const returnDate = returnDateStr ? new Date(returnDateStr) : new Date();

//     if (returnDate > dueDate) {
//       const diffInMs = returnDate - dueDate;
//       const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
//       return diffInDays * ratePerDay;
//     }

//     return 0;
//   };

//   // 🔹 Calculate Total Fine
//   const totalFine = issue.reduce((acc, i) => {
//     const issueDetails = i.issueDetails || i; // fallback if nested object is missing
//     return acc + calculateFine(issueDetails.issueDate, issueDetails.dueDate, issueDetails.returnDate);
//   }, 0);

//   // 🔹 Fetch Data on Mount
//   useEffect(() => {
//     dispatch(fetchBooks());
//     dispatch(fetchMembers());
//     dispatch(fetchIssue());

//     axios.get("http://localhost:3000/users")
//       .then((res) => setUsers(res.data))
//       .catch((err) => console.error("Failed to fetch users:", err));
//   }, [dispatch]);

//   return (
//     <div className="dashboard">
//       {isAdmin ? (
//         <>
//           <div className="dashboard_con">
//             <DashboardBox icon={<RiBookShelfFill size={70} color="#f37633ff" />} label="Total Books" count={allBooks.length} />
//             <DashboardBox icon={<RiGroup3Fill size={70} color="#4682B4" />} label="Total Members" count={members.length} />
//             <DashboardBox icon={<RiBook2Fill size={70} color="#508163ff" />} label="Issued Books" count={issue.length} />
//             <DashboardBox icon={<RiMoneyDollarCircleFill size={70} color="#b46aecff" />} label="Total Fines" count={`${totalFine}`} />
//             <DashboardBox icon={<FaUserShield size={70} color="#2ea2acff" />} label="Total Users" count={users.length} />
//           </div>

//           <div className="charts-row">
//             <div className="chart-box1">
//               <RoundChart
//                 books={allBooks}
//                 members={members}
//                 issued={issue}
//                 fines={totalFine}
//                 users={users}
//               />
//             </div>
//             <div className="chart-box">
//               <MembershipProgress members={members} />
//             </div>
//           </div>
//         </>
//       ) : (
//         <>
//           <div className="dashboard_con">
//             <DashboardBox icon={<RiBookShelfFill size={70} color="#f37633ff" />} label="Total Books" count={allBooks.length} />
//             <DashboardBox icon={<FaUserShield  size={70} color="#4682B4" />} label="Total Visitors" count={(users.length+members.length)} />
//             <DashboardBox icon={<RiBook2Fill size={70} color="#508163ff" />} label="Issued Books" count={issue.length} />
//             <DashboardBox icon={<RiMoneyDollarCircleFill size={70} color="#b46aecff" />} label="Total Fines" count={`${totalFine}`} />
//           </div>

//           <div className="charts-row">
//             <div className="chart-box1">
//               <RoundChart
//                 books={allBooks}
//                 issued={issue}
//                 fines={totalFine}
//                 users={users}
//                 visitorsTotal={users.length+members.length}
//               />
//             </div>
//             <div className="chart-box">
//               <MembershipProgress members={members} />
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

// // 🔹 Reusable Box Component
// function DashboardBox({ icon, label, count }) {
//   return (
//     <div className="box">
//       {icon}
//       <h2>{count}</h2>
//       <h3>{label}</h3>
//     </div>
//   );
// }





import { useEffect, useState, useContext } from "react";
import axios from "axios";
import "./Dashboard.css";
import {
  RiBookShelfFill,
  RiGroup3Fill,
  RiBook2Fill,
  RiMoneyDollarCircleFill,
} from "@remixicon/react";
import { FaUserShield } from "react-icons/fa";
import RoundChart from "./RoundChart";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks } from "../../features/bookSlice";
import { fetchMembers } from "../../features/membersSlice";
import { fetchIssue } from "../../features/issueSlice";
import MembershipProgress from "../Dashboard/MembershipProgress";
import { AuthorizationContext } from "../../Components/Context/ContentApi";

export default function Dashboard() {
  const { admin } = useContext(AuthorizationContext);
  const isAdmin = admin?.toLowerCase() === "admin123@gmail.com";

  const dispatch = useDispatch();

  const { allBooks = [] } = useSelector((state) => state.books);
  const { members = [] } = useSelector((state) => state.members);
  const { issue = [] } = useSelector((state) => state.issue);

  const [users, setUsers] = useState([]);

  // Find the logged-in member by email
  const currentMember = members.find((m) => m.email.toLowerCase() === admin?.toLowerCase());

  // Filter issues that belong to currentMember (or all issues for admin)
  const memberIssues = !isAdmin && currentMember
    ? issue.filter((i) => i.memberId === currentMember.memberId)
    : issue;

  // Fine calculation function
  const calculateFine = (issueDateStr, dueDateStr, returnDateStr, ratePerDay = 10) => {
    if (!issueDateStr || !dueDateStr) return 0;

    const dueDate = new Date(dueDateStr);
    const returnDate = returnDateStr ? new Date(returnDateStr) : new Date();

    if (returnDate > dueDate) {
      const diffInMs = returnDate - dueDate;
      const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
      return diffInDays * ratePerDay;
    }

    return 0;
  };

  // Calculate total fine for the filtered issues
  const totalFine = memberIssues.reduce((acc, i) => {
    const issueDetails = i.issueDetails || i;
    return acc + calculateFine(issueDetails.issueDate, issueDetails.dueDate, issueDetails.returnDate);
  }, 0);

  useEffect(() => {
    dispatch(fetchBooks());
    dispatch(fetchMembers());
    dispatch(fetchIssue());

    axios.get("http://localhost:3000/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Failed to fetch users:", err));
  }, [dispatch]);

  return (
    <div className="dashboard">
      {isAdmin ? (
        <>
          <div className="dashboard_con">
            <DashboardBox icon={<RiBookShelfFill size={70} color="#f37633ff" />} label="Total Books" count={allBooks.length} />
            <DashboardBox icon={<RiGroup3Fill size={70} color="#4682B4" />} label="Total Members" count={members.length} />
            <DashboardBox icon={<RiBook2Fill size={70} color="#508163ff" />} label="Issued Books" count={issue.length} />
            <DashboardBox icon={<RiMoneyDollarCircleFill size={70} color="#b46aecff" />} label="Total Fines" count={`${totalFine}`} />
            <DashboardBox icon={<FaUserShield size={70} color="#2ea2acff" />} label="Total Users" count={users.length} />
          </div>

          <div className="charts-row">
            <div className="chart-box1">
              <RoundChart
                books={allBooks}
                members={members}
                issued={issue}
                fines={totalFine}
                users={users}
              />
            </div>
            <div className="chart-box">
              <MembershipProgress members={members} />
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="dashboard_con">
            <DashboardBox icon={<RiBookShelfFill size={70} color="#f37633ff" />} label="Total Books" count={allBooks.length} />
            <DashboardBox icon={<FaUserShield size={70} color="#4682B4" />} label="Total Visitors" count={users.length + members.length} />
            {/* Issued Books and Fines for logged-in member only */}
            <DashboardBox icon={<RiBook2Fill size={70} color="#508163ff" />} label="Your Issued Books" count={memberIssues.length} />
            <DashboardBox icon={<RiMoneyDollarCircleFill size={70} color="#b46aecff" />} label="Your Total Fines" count={`${totalFine}`} />
          </div>

          <div className="charts-row">
            <div className="chart-box1">
              <RoundChart
                books={allBooks}
                issued={memberIssues}
                fines={totalFine}
                users={users}
                visitorsTotal={users.length + members.length}
              />
            </div>
            <div className="chart-box">
              <MembershipProgress members={members} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// Reusable Box Component
function DashboardBox({ icon, label, count }) {
  return (
    <div className="box">
      {icon}
      <h2>{count}</h2>
      <h3>{label}</h3>
    </div>
  );
}
