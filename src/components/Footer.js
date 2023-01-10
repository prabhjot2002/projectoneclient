import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class Footer extends Component {
  backToTop = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };
  render() {
    return (
      <div id="footer">
        <button onClick={this.backToTop} id="back-to-top">
          Back to top
        </button>
        <div id="containers">
          <div className="container">
            <h4>Know more</h4>
            <a href="/info">About Us</a>
            <a href="/info">Shipping and fees</a>
            <a href="/info">Privacy Policy</a>
          </div>
          <div className="container ">
            <h4>Connect with us</h4>
            <div>
              <img
                alt="logo"
                src="https://img.icons8.com/fluency/96/null/instagram-new.png"
              />
              <img
                alt="logo"
                id="snaplogo"
                src="https://imgs.search.brave.com/2zRjmu1ud0mdJ3we1X-Tb88Y0_1MgF9qc6SYmB3K4hE/rs:fit:1200:1200:1/g:ce/aHR0cHM6Ly93d3cu/Y29uc3VtZXJhY3F1/aXNpdGlvbi5jb20v/d3AtY29udGVudC91/cGxvYWRzLzIwMjEv/MDIvc25hcGNoYXQu/cG5n"
              />
              <img
                alt="logo"
                src="https://img.icons8.com/fluency/96/null/facebook-new.png"
              />
            </div>
          </div>
          <div className="container">
            <h4>We can Help</h4>
            <a href="/info">Track your Order</a>
            <a href="/info">Return Policy</a>
            <a href="/info">Help and Support</a>
          </div>
        </div>
        <div id="title-in-footer">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
            <path
              fill="#ff5500"
              fillOpacity="1"
              d="M0,160L60,160C120,160,240,160,360,149.3C480,139,600,117,720,133.3C840,149,960,203,1080,192C1200,181,1320,107,1380,69.3L1440,32L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
            ></path>
          </svg>
          <Link to="/">THE INDIAN GOODIES</Link>
        </div>
      </div>
    );
  }
}
