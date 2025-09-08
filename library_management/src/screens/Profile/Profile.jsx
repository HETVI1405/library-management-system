import { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AuthorizationContext } from "../../Components/Context/ContentApi";
import { fetchMembers } from "../../features/membersSlice";
import { addUsers, fetchUsers } from "../../features/userSlice";
import "./Profile.css";

export default function Profile() {
  const { admin } = useContext(AuthorizationContext);
  const dispatch = useDispatch();

  // Correctly extract state
  const { members } = useSelector((state) => state.members);
  const users = useSelector((state) => state.users.users);

  const [formData, setFormData] = useState({
    memberId: "",
    name: "",
    email: admin || "",
    phone: "",
    address: "",
    memberShipType: "User",
    activeStatus: true,
    profilePic: "",
  });

  // Refresh toggle after creating profile
  const [profileCreated, setProfileCreated] = useState(false);

  useEffect(() => {
    dispatch(fetchMembers());
    dispatch(fetchUsers());
  }, [dispatch, profileCreated]);

  // Determine if user is already a member or user
  const currentMember = members.find((m) => m.email === admin);
  const currentUser = users.find((u) => u.email === admin);

  const profileToShow = currentMember || currentUser || null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(addUsers(formData));
      alert("Profile created successfully!");
      setProfileCreated((prev) => !prev); // trigger re-fetch
    } catch (error) {
      alert("Failed to create profile: " + error.message);
    }
  };

  return (
    <div className="profile-container">
      {profileToShow ? (
        <div className="profile-card">
          <h2 className="profile-title">User Profile</h2>
          <p><strong>Name:</strong> {profileToShow.name}</p>
          <p><strong>Email:</strong> {profileToShow.email}</p>
          <p><strong>Phone:</strong> {profileToShow.phone}</p>
          <p><strong>Address:</strong> {profileToShow.address}</p>
          <p><strong>Membership Type:</strong> {profileToShow.memberShipType || "User"}</p>
        </div>
      ) : (
        <div className="profile-card">
          <h2 className="profile-title">Create Your Profile</h2>
          <form onSubmit={handleSubmit} className="profile-form">
            <div className="form-group">
              <label htmlFor="name">Name*</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="FirstName Surname"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email*</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                disabled
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Your phone number"
              />
            </div>

            <div className="form-group">
              <label htmlFor="address">Address</label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Your address"
              />
            </div>

            <div className="form-group checkbox-group">
              <input
                type="checkbox"
                id="activeStatus"
                name="activeStatus"
                checked={formData.activeStatus}
                onChange={handleChange}
              />
              <label htmlFor="activeStatus">Active Status</label>
            </div>

            <button type="submit" className="btn btn-primary">
              Create Profile
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
