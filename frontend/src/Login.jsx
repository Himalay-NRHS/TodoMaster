import { Link, useNavigate } from "react-router-dom";
import "./css_modules/App.css";
import axios from "axios";

function Login() {
  const navigate = useNavigate(); 
  const BASE_URL = "https://todo-backend-git-main-himalays-projects-3e1c1ff1.vercel.app"||process.env.REACT_APP_BACKEND_URL; // Use environment variable for backend URL

  const handleSubmit = (event) => {
    event.preventDefault();
    let email = event.target.email.value;
    let password = event.target.password.value;

    axios
      .post(`${BASE_URL}/login`, { // Use environment variable
        email: email,
        pass: password,
      })
      .then((res) => {
        console.log("res", res);
        const token = res.data.token;
        const objectid = res.data.id;
        console.log("login done");
        localStorage.setItem("token", token);
        localStorage.setItem("objectid", objectid);
        navigate("/todos");
      })
      .catch((err) => {
        if (err.response && err.response.status === 405) {
          alert("Invalid credentials");
        }
        console.log(err);
      });

    console.log("Login form submitted");
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" required />
          </div>
          <button type="submit" className="btn">
            Login
          </button>
          <p>
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
