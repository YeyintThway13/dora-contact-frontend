import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";
import MessageBox from "../components/MessageBox";
import { signout } from "../redux/actions/userActions";
import "./mainScreen.css";

const MainScreen = (props) => {
  const [cname, setCName] = useState("");
  const [phNo, setPhNo] = useState("");
  const [address, setAddress] = useState("");

  const [loadingResults, setLoadingResults] = useState(false);
  const [results, setResults] = useState([]);
  const [errorResults, setErrorResults] = useState("");

  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [submitResult, setSubmitResult] = useState("");
  const [errorSubmit, setErrorSubmit] = useState("");

  const [successDelete, setSuccessDelete] = useState(false);
  const [errorDelete, setErrorDelete] = useState("");

  const { name, token } = useSelector((state) => state.userSignin.userInfo);

  const { errorSignout } = useSelector((state) => state.userSignout);

  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };

  const submitHandler = async () => {
    const source = axios.CancelToken.source();
    setLoadingSubmit(true);
    try {
      const response = await axios.post(
        process.env.REACT_APP_BACKEND_URL + "/contacts",
        { name: cname, phNo, address },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
        {
          cancelToken: source.token,
        }
      );
      setSubmitResult(response.data);
      setLoadingSubmit(false);
      setCName("");
      setPhNo("");
      setAddress("");
    } catch (err) {
      setErrorSubmit(
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
      );
      setLoadingSubmit(false);
    }

    return () => {
      console.log("Unmonting");
      source.cancel();
    };
  };

  const deleteHandler = async (id) => {
    try {
      if (window.confirm("Are you sure you want to delete this contact?")) {
        await axios.delete(
          process.env.REACT_APP_BACKEND_URL + `/contacts/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setSuccessDelete(true);
      }
    } catch (err) {
      setErrorDelete(
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
      );
    }
  };

  useEffect(() => {
    setLoadingResults(true);
    try {
      const fetchData = async () => {
        const { data } = await axios.get(
          process.env.REACT_APP_BACKEND_URL + "/contacts",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setResults(data);
        setLoadingResults(false);
        setTimeout(() => {
          setSuccessDelete(false);
        }, 100);
        setTimeout(() => {
          setSubmitResult("");
          setErrorSubmit("");
          setErrorDelete("");
        }, 6000);
      };
      fetchData();
    } catch (err) {
      setErrorResults(
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message
      );
      setLoadingResults(false);
    }
  }, [token, submitResult, errorSubmit, successDelete, errorDelete]);

  return (
    <>
      <div className="main-container">
        {/* <!-- input record --> */}
        <div className="record-input">
          <div className="info info-input">
            <h2>Welcome : {name}</h2>
            <button onClick={signoutHandler} className="signout">
              Sign Out
            </button>
          </div>
          <h2>Contact Details</h2>
          <div className="entry-form">
            <form>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                value={cname}
                onChange={(e) => setCName(e.target.value)}
              />

              <label htmlFor="address">Address</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />

              <label htmlFor="contact-num">Contact Number</label>
              <input
                type="text"
                value={phNo}
                onChange={(e) => setPhNo(e.target.value)}
              />
            </form>

            {/* <!-- alert message --> */}
            {loadingSubmit && <Loading></Loading>}
            {submitResult && (
              <MessageBox variant="success">
                Contact created Successfully
              </MessageBox>
            )}
            {errorSubmit && <MessageBox>{errorSubmit}</MessageBox>}

            <div className="input-btns">
              <button type="submit" id="submit-btn" onClick={submitHandler}>
                <span>
                  <i className="fas fa-plus"></i>
                </span>
                Add Contact
              </button>
            </div>
          </div>
        </div>

        {/* <!-- display record --> */}
        <div className="record-display">
          <div className="info info-result">
            <h2>Welcome : {name}</h2>
            <button onClick={signoutHandler} className="signout">
              Sign Out
            </button>
          </div>
          {errorSignout && <MessageBox>{errorSignout}</MessageBox>}
          <h2>Available Contacts:</h2>

          {loadingResults && <Loading></Loading>}
          {errorDelete && <MessageBox>{errorDelete}</MessageBox>}

          <div className="record-container">
            {/* <!-- single record --> */}
            {errorResults && <MessageBox>{errorResults}</MessageBox>}
            {results.map((result) => (
              <div className="record-item" key={result._id}>
                <h2 className="name">{result.name}</h2>

                <div className="record-el">
                  <span id="labelling">Address : </span>
                  <span id="address-content">{result.address}</span>
                </div>

                <div className="record-el">
                  <span id="labelling">Contact Number : </span>
                  <span id="contact-num-content">{result.phNo}</span>
                </div>

                <div className="btns">
                  <Link
                    to={`/edit/${result._id}?name=${result.name}&phNo=${result.phNo}&address=${result.address}`}
                  >
                    <button type="button" id="edit-btn">
                      <span>
                        <i className="fas fa-edit"></i>
                      </span>
                      Edit
                    </button>
                  </Link>
                  <Link>
                    <button
                      type="button"
                      id="delete-btn"
                      onClick={() => deleteHandler(result._id)}
                    >
                      <span>
                        <i className="fas fa-trash"></i>
                      </span>
                      Delete
                    </button>
                  </Link>
                </div>
              </div>
            ))}

            {/* <!-- end of single record --> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default MainScreen;
