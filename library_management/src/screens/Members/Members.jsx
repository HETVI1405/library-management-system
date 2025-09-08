import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchMembers, addMember, updateMember, deleteMember } from "../../features/membersSlice";
import "./Members.css"

export default function Members() {
  const { members } = useSelector((state) => state.members)
  const dispatch = useDispatch()
  const [selectedMember, setSelectedMember] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [showAddModal, setShowAddModal] = useState(false)

  // Form state for add/edit
  const [formData, setFormData] = useState({
    memberId: '',
    name: '',
    email: '',
    phone: '',
    address: '',
    memberShipType: '',
    activeStatus: true,
    profilePic: '',
  })

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  useEffect(() => {
    dispatch(fetchMembers())
  }, [dispatch])

  // Calculate pagination
  const totalPages = Math.ceil(members.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentMembers = members.slice(startIndex, endIndex)

  // New pagination handlers
  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1)
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1)
  }

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  // Open edit mode and fill form with selected member
  const handleEdit = () => {
    setIsEditing(true)
    setFormData({ ...selectedMember })
  }

  // Submit form for add or edit
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (isEditing) {
      // Update member
      await dispatch(updateMember(formData))
    } else {
      // Add member
      await dispatch(addMember(formData))
    }
    setIsEditing(false)
    setShowAddModal(false)
    setSelectedMember(null)
    setFormData({
      memberId: '',
      name: '',
      email: '',
      phone: '',
      address: '',
      memberShipType: '',
      activeStatus: true,
      profilePic: '',
    })
  }

  // Delete member
  const handleDelete = async () => {
    if (selectedMember) {
      await dispatch(deleteMember(selectedMember.memberId))
      setSelectedMember(null)
    }
  }

  // Open Add Member modal
  const openAddModal = () => {
    setIsEditing(false)
    setFormData({
      memberId: '',
      name: '',
      email: '',
      phone: '',
      address: '',
      memberShipType: '',
      activeStatus: true,
      profilePic: '',
    })
    setShowAddModal(true)
  }

  return (
    <div className='members-container'>
      <h1>Members</h1>

      {/* Add Member Button */}
      <button
        className="addMemberbtn btn-success"
        data-bs-toggle="modal"
        data-bs-target="#addEditModal"
        onClick={openAddModal}
      >
        Add Member
      </button>

      <ol className="ol-list list-group list-group-alphabet">
        {currentMembers.map((member, index) => (
          <button
            className='profile-btn'
            key={startIndex + index}
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#memberModal"
            onClick={() => setSelectedMember(member)}
          >
            <li className="list-group-item d-flex justify-content-between align-items-start">
              <div className="ms-2 me-auto">
                <div className="fw-bold">
                  <span style={{ marginRight: "10px" }}>{startIndex + index + 1}</span> {member.name}
                </div>
                {member.email}
              </div>
              <span className="badge text-bg-primary rounded-pill small-badge">
                {member.memberShipType}
              </span>
            </li>
          </button>
        ))}
      </ol>

      {/* Pagination controls */}
      <div className="pagination">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>

      {/* Member Details Modal */}
      <div className="modal fade" id="memberModal" tabIndex="-1" aria-labelledby="memberModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            {selectedMember ? (
              <>
                <div className="modal-header">
                  <h5 className="modal-title" id="memberModalLabel">
                    Member Details
                  </h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setSelectedMember(null)}></button>
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
                          <span className="badge bg-success">Active</span>
                        ) : (
                          <span className="badge bg-danger">Inactive</span>
                        )}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="modal-footer">
                  <button className="btn btn-primary me-2" data-bs-toggle="modal" data-bs-target="#addEditModal" onClick={handleEdit}>
                    Edit
                  </button>
                  <button className="btn btn-danger me-auto" onClick={handleDelete} data-bs-dismiss="modal">
                    Delete
                  </button>
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => setSelectedMember(null)}>
                    Close
                  </button>
                </div>
              </>
            ) : (
              <div className="modal-body text-center">Select a member to see details.</div>
            )}
          </div>
        </div>
      </div>

      {/* Add/Edit Modal */}
      <div className="modal fade" id="addEditModal" tabIndex="-1" aria-labelledby="addEditModalLabel" aria-hidden="true" onClick={() => {
        if (!isEditing) setShowAddModal(false)
      }}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <form onSubmit={handleSubmit}>
              <div className="modal-header">
                <h5 className="modal-title" id="addEditModalLabel">
                  {isEditing ? "Edit Member" : "Add Member"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => {
                    setIsEditing(false)
                    setSelectedMember(null)
                    setShowAddModal(false)
                    setFormData({
                      memberId: '',
                      name: '',
                      email: '',
                      phone: '',
                      address: '',
                      memberShipType: '',
                      activeStatus: true,
                      profilePic: '',
                    })
                  }}
                ></button>
              </div>

              <div className="modal-body">
                {/* <div className="mb-3">
                  <label htmlFor="memberId" className="form-label">Member ID</label>
                  <input
                    type="text"
                    className="form-control"
                    id="memberId"
                    name="memberId"
                    value={formData.memberId}
                    onChange={handleChange}
                    required
                    disabled={isEditing} // Disable editing ID on update
                  />
                </div> */}

                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder='FirstName Surname'
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email Address"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">Phone</label>
                  <input
                    type="text"
                    className="form-control"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder='Phone Number'
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="address" className="form-label">Address</label>
                  <textarea
                    className="form-control"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder='Address'
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="memberShipType" className="form-label">Membership Type</label>
                  <select
                    className="form-select"
                    id="memberShipType"
                    name="memberShipType"
                    value={formData.memberShipType}
                    onChange={handleChange}
                  >
                    <option value="">Select Membership Type</option>
                    <option value="student">Student</option>
                    <option value="faculty">Faculty</option>
                    <option value="public">Public</option>
                  </select>
                </div>


                <div className="mb-3 form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="activeStatus"
                    name="activeStatus"
                    checked={formData.activeStatus}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor="activeStatus">Active Status</label>
                </div>

                <div className="mb-3">
                  <label htmlFor="profilePic" className="form-label">Profile Picture URL</label>
                  <input
                    type="text"
                    className="form-control"
                    id="profilePic"
                    name="profilePic"
                    value={formData.profilePic}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button type="submit" className="btn btn-primary">
                  {isEditing ? "Update Member" : "Add Member"}
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={() => {
                    setIsEditing(false)
                    setSelectedMember(null)
                    setShowAddModal(false)
                    setFormData({
                      memberId: '',
                      name: '',
                      email: '',
                      phone: '',
                      address: '',
                      memberShipType: '',
                      activeStatus: true,
                      profilePic: '',
                    })
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
