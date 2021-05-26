import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/Loading";
import MessageBox from "../components/MessageBox";
import { register } from "../redux/actions/userActions";
import "./loginScreen.css";

const RegisterScreen = (props) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const userRegister = useSelector((state) => state.userRegister);
  const { userInfo, loading, error } = userRegister;

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(register(name, password, password2));
  };

  useEffect(() => {
    if (userInfo) {
      props.history.push("/");
    }
  }, [userInfo, props]);

  return (
    <div className="body">
      <img
        src="/images/undraw_mobile_login_ikmv.png"
        alt=""
        className="credImg"
      />
      <form className="box" onSubmit={submitHandler}>
        <h1>Register</h1>
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
        <input
          className="inputt"
          type="password"
          name=""
          placeholder="Comfirm Password"
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
        />
        <button type="submit" className="actionBtn">
          Register
        </button>
        <p>
          Alerady have an account? <a href="/login">Login</a>
        </p>
      </form>
    </div>
  );
};

export default RegisterScreen;
