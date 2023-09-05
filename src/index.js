import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Navbar from './Navbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signin() {
  
  const [data , setData] = useState([
    {
      email:'',
      password:''
    }
  ])

  const handleonChange = (e) => {
      const { id, value } = e.target;
      setData({ ...data, [id]: value });
    };

    const check = (e) => {
      e.preventDefault(); 
      const submitdata = async() => {
          const response = await axios.post("http://localhost:8081/checkuser",data);
          console.log(response);
      }
      submitdata();
    }







  return <div className='container'>
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h4 className="mb-0">Sign In</h4>
            </div>
            <div className="card-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label" value={data.email}>Email address</label>
                  <input type="email" className="form-control" id="email" onChange={handleonChange}/>
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label" value={data.password}>Password</label>
                  <input type="password" className="form-control" id="password" onChange={handleonChange}/>
                </div>
                <button type="" className="btn btn-success" onClick={check}>Sign In</button>
                <button className='alink btn'><Link to='/signup' className="btn btn-primary">Sign Up</Link></button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
}

function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const navigate = useNavigate();

  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };
  console.log(formData);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password === formData.confirmPassword) {
        const submitdata = async    () => {
            const response = await axios.post("http://localhost:8081/adduser",formData);
            console.log(response);
            navigate('/');
        }
        submitdata();


    } else {
      setPasswordsMatch(false);
    }
  };

  return (
    <div className="container">
      <div className="container mt-5">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Full Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>
          {!passwordsMatch && (
            <div className="alert alert-danger" role="alert">
              Passwords do not match.
            </div>
          )}
          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}


const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navbar />}/>
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  </BrowserRouter>
);

ReactDOM.createRoot(document.getElementById('root')).render(<App />);