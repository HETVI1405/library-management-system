import { NavLink } from 'react-router-dom';
import "./navbar.css"

export default function Navbar() {
  const PageData = [
    { id: 1, title: "Dashboard", path: "/" },
    { id: 2, title: "AddBook", path: "/addbook" },
    { id: 3, title: "Book", path: "/book" },
    { id: 4, title: "Login", path: "/login" }
  ];

  return (
    <div className="main container m-auto" 
         style={{ width: "80%", display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "10px" }}>
      <div className='list'>
        {PageData.map((el) => (
        <NavLink
          key={el.id}
          to={el.path}
          style={({ isActive }) => ({
            textDecoration: "none",
            fontSize: "18px",
            marginLeft:"20px",
            color: isActive ? 'blue' : 'black',
            fontWeight: isActive ? 'bold' : 'normal',
          })}
        >
          {el.title}
        </NavLink>
      ))}
      </div>
    </div>

  );
}