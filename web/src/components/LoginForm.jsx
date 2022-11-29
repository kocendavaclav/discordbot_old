import "../styles/styles.css";
import React, { useState } from "react";
function LoginForm(props) {
  const [serverCode, setServerCode] = useState("123456");
  const [alertText, setAlertText] = useState("");
  return (
    <div className="loginDiv">
      <label>Server code</label>
      <input
        className="loginInput"
        value={serverCode}
        onChange={(a) => {
          setServerCode(a.target.value);
        }}
        maxLength="6"
      ></input>
      <text className="alertText">{alertText}</text>
      <button className="button" onClick={submit}>
        Submit
      </button>
    </div>
  );
  function submit() {
    if (serverCode === "123456") {
      return props.setLoggedIn(true);
    }
    return setAlertText("Invalid server code");
  }
}
export default LoginForm;
