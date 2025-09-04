import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchIssue } from "../../features/issueSlice";

export default function Issues() {
    const dispatch = useDispatch();
    const { issue, status } = useSelector((state) => state.issue);

    useEffect(() => {
        dispatch(fetchIssue());
    }, [dispatch]);

    if (status === "loading...") return <p>Loading...</p>;

    return (
        <div>
            <h2>Issued Books</h2>
            <ul>
                {issue.map((i) => (
                    <li key={i.id}>
                        <b>{i.title}</b> by {i.author} <br />
                        Rent: {i.rent} Rs/day <br />
                        Issued: {i.issueDate} <br />
                        Return by: <span style={{ color: "red" }}>{i.returnDate}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
