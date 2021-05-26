import React, { useState } from "react";
import "./loginScreen.css";
import { Redirect, useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import MessageBox from "../components/MessageBox";
import Loading from "../components/Loading";

const EditScreen = (props) => {
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  let query = useQuery();

  const { id } = useParams();

  const { token } = useSelector((state) => state.userSignin.userInfo);

  const [name, setName] = useState(query.get("name") ? query.get("name") : "");
  const [phNo, setPhNo] = useState(query.get("phNo") ? query.get("phNo") : "");
  const [address, setAddress] = useState(
    query.get("address") ? query.get("address") : ""
  );

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.patch(
        process.env.REACT_APP_BACKEND_URL + `/contacts/${id}`,
        { name, phNo, address },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setLoading(false);
      setSuccess(true);
    } catch (err) {
      setError(
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
      );
      setLoading(false);
    }
  };

  return (
    <>
      {success && <Redirect to="/"></Redirect>}
      <div className="body">
        <form className="box" onSubmit={submitHandler}>
          <h1>Edit Contact</h1>
          {loading && <Loading></Loading>}
          {error && <MessageBox>{error}</MessageBox>}
          <input
            className="inputt"
            type="text"
            name=""
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="inputt"
            type="text"
            name=""
            placeholder="Ph Number"
            value={phNo}
            onChange={(e) => setPhNo(e.target.value)}
          />
          <input
            className="inputt"
            type="text"
            name=""
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <button type="submit" className="actionBtn">
            Edit
          </button>
        </form>
      </div>
    </>
  );
};

export default EditScreen;
