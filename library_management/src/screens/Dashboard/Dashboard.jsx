
 import React, { useEffect, useState } from "react";
 import axios from "axios";
 import "./Dashboard.css";
 import { RiBookShelfFill, RiGroup3Fill, RiBook2Fill, RiMoneyDollarCircleFill,  RiCalendarCheckFill} from "@remixicon/react";
import RoundChart from "./RoundChart";

export default function Dashboard() {
   const [books, setBooks] = useState([]);
 const [members, setMembers] = useState([]);
   const [issued, setIssued] = useState([]);
  const [fines, setFines] = useState([]);
const [reservations, setReservations] = useState([]);


   useEffect(() => {
    axios.get("http://localhost:3000/books").then((res) => setBooks(res.data));
   axios.get("http://localhost:3000/members").then((res) =>
    setMembers(res.data)
    );
     axios.get("http://localhost:3000/issue").then((res) =>
      setIssued(res.data)
    );
     axios.get("http://localhost:3000/fines").then((res) => setFines(res.data));
       axios.get("http://localhost:3000/reservations").then((res) => setReservations(res.data));
 }, []);

 return (
    <div className="dashboard">
      <div className="dashboard_con">
      <div className="box">
        <RiBookShelfFill size={70} color="#4682B4" />
        <h2>{books.length}</h2>
         <h3>Total Books</h3>
      </div>
      <div className="box">
        <RiGroup3Fill size={70} color="#4682B4" />
        <h2>{members.length}</h2>
        <h3>Total Members</h3>
      </div>
       <div className="box">
        < RiBook2Fill size={70} color="#4682B4" />

        <h2>{issued.length}</h2>
       <h3>Issued Books</h3>
       </div>
      <div className="box">
       <  RiMoneyDollarCircleFill size={70} color="#4682B4" />

      <h2>{fines.length}</h2>
       <h3>Fines</h3>
       </div>
         <div className="box">
        <RiCalendarCheckFill size={70} color="#4682B4" />
     <h2>{reservations.length}</h2>
       <h3>Reservations</h3>
       </div>
       </div>

      <RoundChart
        books={books}
        members={members}
        issued={issued}
        fines={fines}
        reservations={reservations}
      />
    </div>
   );
   }
