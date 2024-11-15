import { Link, Navigate, useNavigate } from 'react-router-dom';
import "./css_modules/App.css";
import axios from "axios";

function Login() {
  const navigate = useNavigate(); 
  const handleSubmit = (event) => {
    event.preventDefault();
    let email = event.target.email.value;
    let password = event.target.password.value;
    axios.post("http://localhost:3000/login", {
        email: email,
        pass: password,
      })
      .then((res) => {
      
        const token = res.data.token;
        const objectid = res.data.id;
        console.log("login done ", res);
        localStorage.setItem("token", token);
        localStorage.setItem("objectid", objectid);
        navigate("/todos")
      })
      .catch((err) => {
        if(err.status==405){
alert("invalid credentials")     }
        console.log(err)});

    console.log(email, password);
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
