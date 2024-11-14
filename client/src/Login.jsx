import { Link } from 'react-router-dom';
import './App.css';

function Login() {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Add logic for login or authentication here
let email = event.target.email.value;
let password = event.target.email.value
    console.log(event.target.email.value);
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
          <button type="submit" className="btn">Login</button>
          <p>
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
