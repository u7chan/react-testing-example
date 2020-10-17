import React, { ChangeEvent, FormEvent, useState, useEffect } from 'react';
import { loginAPI, dateAPI } from '../api';

const Login: React.FC = () => {
  const [formValues, setFormValues] = useState({ email: '', password: '' });
  const [currentDate, setCurrentDate] = useState('');
  useEffect(() => {
    dateAPI().then((date) => {
      setCurrentDate(date.toLocaleString());
    });
  }, [setCurrentDate]);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormValues({ ...formValues, [id]: value });
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    loginAPI(formValues.email, formValues.password)
      .then(() => {
        alert('Login Success');
      })
      .catch(() => {
        alert('Login Failure');
      });
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>Login</div>
        <div>
          <label htmlFor="email">email</label>
          <input
            type="text"
            id="email"
            value={formValues.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">password</label>
          <input
            type="password"
            id="password"
            value={formValues.password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <button type="submit">LOGIN</button>
        </div>
      </form>
      <div style={{ fontSize: '0.8em', marginTop: 24 }}>{currentDate}</div>
    </>
  );
};

export default Login;
