import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AuthorizationContext } from "../../Components/Context/ContentApi";
import { fetchMembers } from "../../features/membersSlice";
import "./Profile.css";

export default function Profile() {
  const { admin } = useContext(AuthorizationContext);

  const dispatch = useDispatch();
  const { members } = useSelector((state) => state.members);

  useEffect(() => {
    dispatch(fetchMembers());
  }, [dispatch]);

  return (
  <div className="profile-container">
    {members
      .filter((member) => member.email === admin)
      .map((member) => (
        <div key={member.memberId} className="profile-card">
          <h2 className="profile-title">User Profile</h2>
          <p className="profile-field"><strong>Name:</strong> {member.name}</p>
          <p className="profile-field"><strong>Email:</strong> {member.email}</p>
          <p className="profile-field"><strong>Phone:</strong> {member.phone}</p>
          <p className="profile-field"><strong>Address:</strong> {member.address}</p>
          <p className="profile-field"><strong>Membership Type:</strong> {member.memberShipType}</p>
        </div>
      ))}
  </div>
);

}
