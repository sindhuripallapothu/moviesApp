import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import MuiAlert from "@material-ui/lab/Alert";
import { Button } from "@material-ui/core";

import history from "./history";
import Search from "./components/Search";
import Results from "./components/Results";
import Popup from "./components/Popup";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
function App() {
  const [state, setState] = useState({
    s: "",
    results: [],
    selected: {},
  });

  const myapiurl = "http://www.omdbapi.com/?apikey=803e6689";

  const search = (e) => {
    axios(myapiurl + "&s=" + state.s).then(({ data }) => {
      let results = data.Search;

      setState((prevState) => {
        return { ...prevState, results: results };
      });
    });
  };

  const handleInput = (e) => {
    let s = e.target.value;

    setState((prevState) => {
      return { ...prevState, s: s };
    });
  };

  const openPopup = (id) => {
    axios(myapiurl + "&i=" + id).then(({ data }) => {
      let result = data;

      console.log(result);

      setState((prevState) => {
        return { ...prevState, selected: result };
      });
    });
  };

  const closePopup = () => {
    setState((prevState) => {
      return { ...prevState, selected: {} };
    });
  };

  const logout = () => {
    history.push("/");
    window.location.reload();
  };

  const adminLogin = sessionStorage.getItem("email") === "admin";
  return (
    <div className="App">
      <header>
        <span>
          <h1>What do you wanna watch today...</h1>
          <Button
            style={{ position: "absolute", top: "10px", right: "20px" }}
            onClick={logout}
            className="logout"
          >
            Logout
          </Button>
        </span>
      </header>
      <main>
        {adminLogin ? (
          <>
            <Link to="/moviesAdmin">
              <Button
                style={{ position: "absolute", top: "50px", right: "300px" }}
                className="add"
              >
                Add
              </Button>
            </Link>
          </>
        ) : (
          <></>
        )}

        <Search handleInput={handleInput} search={search} />

        {typeof state.results != "undefined" ? (
          <Results results={state.results} openPopup={openPopup} />
        ) : (
          <Alert className= "alertError" severity="error">Invalid movie name!</Alert>
        )}
        {typeof state.selected.Title != "undefined" ? (
          <Popup selected={state.selected} closePopup={closePopup} />
        ) : (
          false
        )}
      </main>
    </div>
  );
}

export default App;
