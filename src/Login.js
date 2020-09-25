import React, { useState } from "react";
import { TextField, Typography, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import history from "./history";

const styleTF = {
  width: "50%",
  marginLeft: "auto",
  marginRight: "auto",
  paddingBottom: 0,
  marginTop: 10,
  fontWeight: 500,
};
const creds = new Map([
  ["admin", "admin"],
  ["user", "user"],
]);

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const validCreds = (email, password) => {
    if (email && password && creds.get(email) === password) {
      sessionStorage.setItem("email", email);
      sessionStorage.setItem("password", password);
      return true;
    }

    return false;
  };

  const submitForm = (e, email, password) => {
    if (validCreds(email, password)) {
      e.preventDefault();
    } else history.push("/");
  };

  return (
    <form className="form-input"> 
      <Typography variant="h5" style={{ marginBottom: 8 }}>
      Let's Begin!
      </Typography>
      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={styleTF}
      /><br />
      <TextField
        label="Password"
        variant="outlined"
        fullWidth
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={styleTF}
        
      />
      <Link to={validCreds(email, password) ? "/movies" : "/"}>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          size="large"
          onClick={submitForm}
          className="login"
        >
          Login 
        </Button>
      </Link>
    </form>
  );
};

export default Login;
