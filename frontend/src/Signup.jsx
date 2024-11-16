import { Link, useNavigate } from "react-router-dom";
import "./css_modules/App.css";
import axios from "axios";

function Signup() {
  const navigate = useNavigate(); 
  const BASE_URL = "https://todo-backend-git-main-himalays-projects-3e1c1ff1.vercel.app"||process.env.REACT_APP_BACKEND_URL; //dont know why but .env variables arent working for me here, so i hardcoded all the variables here


  const handleSubmit = (event) => {
    event.preventDefault();
    let username = event.target.username.value;
    let email = event.target.email.value;
    let password = event.target.password.value;
console.log(BASE_URL)
    axios
      .post(`${BASE_URL}/signup`, { // Use environment variable
        username: username,
        useremail: email,
        password: password,
      })
      .then((res) => {
        navigate("/");
        console.log("Signup successful:", res);
      })
      .catch((err) => console.log("Signup error:", err));

    console.log("Signup form submitted");
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          {/* Username Input */}
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username" required />
          </div>

          {/* Email Input */}
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required />
          </div>

          {/* Password Input */}
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" required />
          </div>

          <button type="submit" className="btn">Sign Up</button>
          <p>
            Already have an account? <Link to="/">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Signup;
