import React, { useState } from "react";
import axios from "axios";
import { TextField, Typography, Button } from "@material-ui/core";

const Admin = () => {
  const myapiurl = "http://www.omdbapi.com/?apikey=803e6689";

  const [state, setState] = useState({
    Title: "",
    Plot: "",
    Language: "",
    Rating: "",
  });
  const submitForm = (event, state) => {
    event.preventDefault();

    const data = {
      Title: state.Title,
      Plot: state.Plot,
      Language: state.Language,
      Rating: state.Rating,
    };

    axios.post(myapiurl, { data }).then((res) => {
      console.log(res);
      console.log(res.data);
    });
  };
  return (
    <form className="form-input">
      <Typography variant="h5" style={{ marginBottom: 8 }}>
        Add a Movie
      </Typography>
      <TextField label="Title" variant="outlined" value={state.Title} />
      <br />
      <br />
      <TextField
        label="Plot"
        variant="outlined"
        value={state.Plot}
        multiline
        rows={5}
      />{" "}
      <br />
      <br />
      <TextField
        label="Language"
        variant="outlined"
        value={state.Language}
      />{" "}
      <br />
      <br />
      <TextField label="Rating" variant="outlined" value={state.Rating} />{" "}
      <br />
      <br />
      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={submitForm}
        className="login"
      >
        Add
      </Button>
    </form>
  );
};

export default Admin;
