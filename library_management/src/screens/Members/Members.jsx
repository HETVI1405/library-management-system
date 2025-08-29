import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMembers } from "../../features/membersSlice";
import "./Members.css";

export default function Members() {
  const { members } = useSelector((state) => state.members);
  const dispatch = useDispatch();

  const [selectedMember, setSelectedMember] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  useEffect(() => {
    dispatch(fetchMembers());
  }, [dispatch]);

  // Filter members based on search, membership type, and status
  const filteredMembers = members.filter((member) => {
    const matchesSearch =
      member.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType =
      filterType === "" ||
      member.memberShipType?.toLowerCase() === filterType.toLowerCase();

    const matchesStatus =
      filterStatus === "" ||
      member.activeStatus?.toLowerCase() === filterStatus.toLowerCase();

    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <div className="container mt-4">
      <h1 className="mb-4 fw-bold text-primary">Members</h1>

      {/* Search + Filters */}
      <div className="d-flex mb-3 gap-2 flex-wrap align-items-center search-filters">
        <input
          type="text"
          className="form-control shadow-sm"
          placeholder="Search by name or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          className="form-select shadow-sm"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="">All Memberships</option>
          <option value="Student">Student</option>
          <option value="Faculty">Faculty</option>
          <option value="Public">Public</option>
        </select>

        <select
          className="form-select shadow-sm"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      </div>

      {/* Member List */}
      <ol className="list-group list-group-numbered shadow-sm rounded">
        {filteredMembers.map((member, index) => (
          <li
            key={index}
            className="list-group-item d-flex justify-content-between align-items-start"
          >
            <button
              className="btn w-100 text-start d-flex justify-content-between align-items-center"
              data-bs-toggle="modal"
              data-bs-target="#memberModal"
              onClick={() => setSelectedMember(member)}
            >
              <div className="ms-2 me-auto d-flex align-items-center">
                <img
                  src={
                    member.profileImage && member.profileImage.trim() !== ""
                      ? member.profileImage
                      : "/default-avatar.png"
                  }
                  alt={member.name}
                  className="rounded-circle me-3 shadow"
                  style={{ width: "45px", height: "45px", objectFit: "cover" }}
                  onError={(e) => (e.target.src = "/default-avatar.png")}
                />
                <div>
                  <div className="fw-bold fs-6">{member.name}</div>
                  <small className="text-muted">{member.email}</small>
                </div>
              </div>
              <span
                className={`badge rounded-pill ${
                  member.memberShipType === "Student"
                    ? "bg-primary"
                    : member.memberShipType === "Faculty"
                    ? "bg-success"
                    : "bg-dark"
                }`}
              >
                {member.memberShipType}
              </span>
            </button>
          </li>
        ))}
      </ol>

      {/* Bootstrap Medium Modal */}
      <div
        className="modal fade"
        id="memberModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-md">
          <div className="modal-content shadow-lg border-0">
            <div className="modal-header bg-primary text-white">
              <h5 className="modal-title fw-bold">
                {selectedMember ? selectedMember.name : "Member Details"}
              </h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="modal"
              ></button>
            </div>

            <div className="modal-body text-center">
              {selectedMember ? (
                <div className="member-details-inline">
                  {/* Profile Image */}
                  <img
                    src={
                      selectedMember.profileImage &&
                      selectedMember.profileImage.trim() !== ""
                        ? selectedMember.profileImage
                        : "/default-avatar.png"
                    }
                    alt={selectedMember.name}
                    className="rounded-circle mb-3 shadow"
                    style={{
                      width: "120px",
                      height: "120px",
                      objectFit: "cover",
                      border: "3px solid #fff",
                    }}
                    onError={(e) => (e.target.src = "/default-avatar.png")}
                  />

                  {/* Member Info */}
                  <div className="member-info-line mt-3 text-start px-3">
                    <p>
                      <b>ID:</b> {selectedMember.memberId}
                    </p>
                    <p>
                      <b>Email:</b> {selectedMember.email}
                    </p>
                    <p>
                      <b>Phone:</b> {selectedMember.phone || "N/A"}
                    </p>
                    <p>
                      <b>Membership:</b>{" "}
                      <span className="badge bg-info">
                        {selectedMember.memberShipType}
                      </span>
                    </p>
                    <p>
                      <b>Status:</b>{" "}
                      <span
                        className={`badge ${
                          selectedMember.activeStatus === "Active"
                            ? "bg-success"
                            : "bg-danger"
                        }`}
                      >
                        {selectedMember.activeStatus}
                      </span>
                    </p>
                  </div>
                </div>
              ) : (
                <p>No member selected</p>
              )}
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
