import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AuthorizationContext } from "../../Components/Context/ContentApi";
import { fetchMembers } from "../../features/membersSlice";

export default function Profile() {
  const { admin } = useContext(AuthorizationContext);

  const dispatch = useDispatch();
  const { members } = useSelector((state) => state.members);

  useEffect(() => {
    dispatch(fetchMembers());
  }, [dispatch]);

  return (
    <div>
      {members
        .filter((member) => member.email === admin)
        .map((member) => (
          <div
            key={member.memberId}
            style={{
              padding: "20px",
              maxWidth: "600px",
              margin: "20px auto",
              boxShadow: "0 0 10px rgba(0,0,0,0.1)",
              borderRadius: "8px",
              backgroundColor: "#f9f9f9",
            }}
          >
            <h2 style={{ textAlign: "center", marginBottom: "20px" }}>User Profile</h2>
            <p><strong>Name:</strong> {member.name}</p>
            <p><strong>Email:</strong> {member.email}</p>
            <p><strong>Phone:</strong> {member.phone}</p>
            <p><strong>Address:</strong> {member.address}</p>
            <p><strong>Membership Type:</strong> {member.memberShipType}</p>
          </div>
        ))}
    </div>
  );
}
