import React, { Component } from "react";
import { hideSearchAndBackTopBtn } from "../static/main";
import { Link } from "react-router-dom";
export default class TrackOrder extends Component {
  componentDidMount() {
    hideSearchAndBackTopBtn(true);
  }
  componentWillUnmount() {
    hideSearchAndBackTopBtn(false);
  }
  startTracking = () => {
    let trackId = document.getElementById("trackid").value;
    let trackErr = document.getElementById("track-error");
    if (trackId === "") {
      trackErr.innerHTML = "Please enter tracking Id";
    } else {
      trackErr.innerHTML = "";
    }
  };
  render() {
    return (
      <div id="track-order">
        <h3>Enter your tracking id</h3>
        <input type="number" max="25" id="trackid" />
        <p id="track-error"></p>
        <div id="start-track-btn" onClick={this.startTracking}>
          Start Tracking
        </div>
        <div id="track-info"></div>
        <p style={{ marginBottom: "40px" }}>
          You can find your tracking Id in your order receipt emailed to you.
        </p>
        <div style={{ width: "fit-content", margin: "auto" }}>
          <Link
            style={{
              padding: "10px",
              color: "white",
              background: "black",
              textDecoration: "none",
              textAlign: "center",
            }}
            to="/"
          >
            Go back to shopping
          </Link>
        </div>
      </div>
    );
  }
}
