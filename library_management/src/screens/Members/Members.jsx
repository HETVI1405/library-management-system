import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMembers } from "../../features/membersSlice";

export default function Members() {

    const { members } = useSelector((state) => state.members)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchMembers())
    }, [])

    return (
        <div>
            <h1>Members</h1>
            <ol className="ol-list list-group list-group-numbered">
                {members.map((member, index) => {
                    return (
                        <button className='btn'>
                            <li
                                key={index}
                                className="list-group-item d-flex justify-content-between align-items-start"
                            >
                                <div className="ms-2 me-auto">
                                    <div className="fw-bold"><span style={{ marginRight: "10px" }}>{member.memberId}</span> {member.name}</div>
                                    {member.email}
                                </div>
                                <span className="badge text-bg-primary rounded-pill" style={{ width: "100px", marginRight: "20px", margin: "auto 20px" }}>
                                    {member.memberShipType}
                                </span>
                            </li>
                        </button>
                    )
                })}



            </ol>
        </div>
    )
}
