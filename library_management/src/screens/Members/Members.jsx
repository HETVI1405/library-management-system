import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMembers } from "../../features/membersSlice";
import "./Members.css"

export default function Members() {

  const { members } = useSelector((state) => state.members)
  const dispatch = useDispatch()
  const [selectedMember, setSelectedMember] = useState(null)

  useEffect(() => {
    dispatch(fetchMembers())
  }, [dispatch])

  return (
    <div className='members-container'>
      <h1>Members</h1>
      <ol className="ol-list list-group list-group-alpabet">
        {members.map((member, index) => {
          return (
            <button
              className='profile-btn'
              key={index}
              type="button"
              data-bs-toggle="modal"
              data-bs-target="#memberModal"
              onClick={() => setSelectedMember(member)}
            >
              <li className="list-group-item d-flex justify-content-between align-items-start">
                <div className="ms-2 me-auto">
                  <div className="fw-bold">
                    <span style={{ marginRight: "10px" }}>{index+1}</span> {member.name}
                  </div>
                  {member.email}
                </div>
                <span className="badge text-bg-primary rounded-pill small-badge">
                  {member.memberShipType}
                </span>
              </li>
            </button>
          )
        })}
      </ol>

      {/* Bootstrap Modal */}
      <div className="modal fade" id="memberModal" tabIndex="-1" aria-labelledby="memberModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            {selectedMember ? (
              <>
                <div className="modal-header">
                  <h5 className="modal-title" id="memberModalLabel">
                    Member Details
                  </h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>

                <div className="modal-body">
                  <div className="d-flex align-items-start">
                   <img 
  src={
    selectedMember.profilePic || 
    selectedMember.profileImage || 
    selectedMember.avatar || 
    selectedMember.image || 
    selectedMember.photoUrl || 
    "https://via.placeholder.com/120"
  } 
  alt={selectedMember.name} 
  className="profile-pic me-4" 
/>

                    {/* Left side details */}
                    <div className="text-start">
                      <h5>{selectedMember.name}</h5>
                      <p className="text-muted">{selectedMember.email}</p>
                      <hr />
                      <p><strong>ID:</strong> {selectedMember.memberId}</p>
                      <p><strong>Phone:</strong> {selectedMember.phone}</p>
                      <p><strong>Address:</strong> {selectedMember.address}</p>
                      <p><strong>Membership Type:</strong> {selectedMember.memberShipType}</p>
                      <p>
                        <strong>Status:</strong>{" "}
                        {selectedMember.activeStatus ? (
                          <span className="badge-2">Active</span>
                        ) : (
                          <span className="badge-1 ">Inactive</span>
                        )}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                </div>
              </>
            ) : (
              <div className="modal-body text-center">Loading...</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}