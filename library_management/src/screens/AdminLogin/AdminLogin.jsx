import { useContext, useEffect, useState } from "react";
import "./AdminLogin.css";
import { FaBook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { app } from "../../Components/FireBase/FireBase";
import { AuthorizationContext } from "../../Components/Context/ContentApi";

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { admin, setAdmin } = useContext(AuthorizationContext);

  // Sync context with localStorage on first render
  useEffect(() => {
    const storedAdmin = localStorage.getItem("admin");
    if (storedAdmin) {
      setAdmin(storedAdmin);
    }
  }, [setAdmin]);

  const handleSignIn = async () => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      alert("Login successful!");

      localStorage.setItem("admin", result.user.email); // Save admin email
      setAdmin(result.user.email);
    } catch (error) {
      alert("Login failed: " + error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      alert("Google Sign-In successful!");
      localStorage.setItem("admin", result.user.email);
      setAdmin(result.user.email);
    } catch (error) {
      alert("Google Sign-In failed: " + error.message);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      alert("Signed out successfully!");
    } catch (error) {
      alert("Sign out failed: " + error.message);
    } finally {
      setAdmin(null);
      localStorage.removeItem("admin");
    }
  };

  return (
    <div className="signin-container">
      <h2><FaBook style={{color:"#02162B"}} /> Login</h2>

      {admin ? (
        <div>
          <p>Welcome, {admin}</p>
          <button onClick={handleSignOut} className="signOutBtn">Sign Out</button>
        </div>
      ) : (
        <>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="SignInBtn" onClick={handleSignIn}>Sign In</button>

          <hr />

          <button className="googleBtn" onClick={handleGoogleSignIn}><FcGoogle /></button>
        </>
      )}
    </div>
  );
}
