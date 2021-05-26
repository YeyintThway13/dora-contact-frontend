import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/Loading";
import MessageBox from "../components/MessageBox";
import { login } from "../redux/actions/userActions";
import "./loginScreen.css";

const LoginScreen = (props) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo, loading, error } = userSignin;

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(name, password));
  };

  useEffect(() => {
    if (userInfo) {
      props.history.push("/");
    }
  }, [userInfo, props.history]);

  return (
    <div className="body">
      <img
        src="/images/undraw_unlock_24mb (1).png"
        alt=""
        className="credImg"
      />
      <form className="box" onSubmit={submitHandler}>
        <h1>Login</h1>
        {loading && <Loading></Loading>}
        {error && <MessageBox>{error}</MessageBox>}
        <input
          className="inputt"
          type="text"
          name=""
          placeholder="Username"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="inputt"
          type="password"
          name=""
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="actionBtn">
          Login
        </button>
        <p>
          Don't have an account? <a href="/register">Register Now</a>
        </p>
      </form>
    </div>
  );
};

export default LoginScreen;
