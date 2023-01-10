import React, { Component, Fragment } from "react";
import Payment from "./Payment";
import { connect } from "react-redux";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { hideSearchAndBackTopBtn, validateFields } from "../static/main";
import axios from "axios";

const initialOptions = {
  "client-id":
    "AZqTlzudXrQpFHk8smk7t3eN3imYPLvLZhz1CnKIr8b7B-oggQLQ138czoR44vT_WQwWzPRM59tvCP56",
  currency: "CAD",
  intent: "capture",
};

class ShipDetail extends Component {
  state = {
    fullname: "",
    street: "",
    city: "",
    province: "",
    postalcode: "",
    email: "",
    showPayBtns: false,
    errorField: "",
    emailDone: false,
  };

  componentDidMount() {
    hideSearchAndBackTopBtn(true);
    if (this.props.total < 10) {
      window.location.href = "/";
    }
  }
  componentWillUnmount() {
    hideSearchAndBackTopBtn(false);
  }
  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
      errorField: "",
    });
  };
  // validating all fields

  validate = () => {
    let { err, decision } = validateFields(
      this.state.email,
      this.state.postalcode
    );
    if (decision) {
      this.setState({
        showPayBtns: true,
      });
      document.getElementById("payment-container").style.display = "none";
      document.getElementById("proceed-pay-btn").style.display = "none";

      //sending email
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const items_ordered = this.props.cartItems.map((item) => {
        const rItem = {
          id: item._id,
          name: item.name,
          price: item.price,
          discount: 0,
          item_quantity: item.count,
        };
        return rItem;
      });
      const customerData = {
        username: this.state.username,
        email: this.state.email,
        phoneNumber: this.state.phoneNumber,
        street: this.state.street,
        city: this.state.city,
        province: this.state.province,
        postalCode: this.state.postalcode,
      };

      const orderData = {
        customerData,
        itemsOrdered: items_ordered,
      };
      const body = JSON.stringify(orderData);

      axios
        .post("http://localhost:5000/items/sendEmail", body, config)
        .then((res) => {
          if (res.data.msg === "thanks") {
            this.setState({
              emailDone: true,
            });
          }
        })
        .catch((err) => {
          this.setState({
            emailDone: false,
          });
        });
    } else {
      this.setState({
        errorField: err,
      });
    }
  };
  render() {
    return (
      <Fragment>
        <div id="payment-container">
          <Link to="/cart">
            <FontAwesomeIcon
              id="back-button"
              icon={faArrowLeft}
            ></FontAwesomeIcon>
          </Link>
          <div id="ship-address">
            <h3>Shipping Address</h3>
            <div>
              <input
                name="fullname"
                value={this.state.fullname}
                onChange={this.onChange}
                placeholder="Full Name"
              />
            </div>
            <div>
              <input
                name="street"
                value={this.state.street}
                onChange={this.onChange}
                placeholder="street"
              />
            </div>

            <div>
              <input
                name="city"
                value={this.state.city}
                onChange={this.onChange}
                placeholder="City"
              />
            </div>
            <div>
              <input
                name="postalcode"
                value={this.state.postalcode}
                onChange={this.onChange}
                placeholder="Postal Code"
              />
            </div>
            <div>
              <select
                name="province"
                value={this.state.province}
                onChange={this.onChange}
              >
                <option value="Ontario">Ontario</option>
                <option value="Alberta">Alberta</option>
                <option value="British Columbia">British Columbia</option>
                <option value="Manitoba">Manitoba</option>
                <option value="Nova Scotia">Nova Scotia</option>
                <option value="New Brunswick">New Brunswick</option>
                <option value="Newfoundland and Labrador">
                  Newfoundland and Labrador
                </option>
                <option value="Prince Edward Island">
                  Prince Edward Island
                </option>
                <option value="Quebec">Quebec</option>
                <option value="Saskatchewan">Saskatchewan</option>
              </select>
            </div>
            <div>
              <input placeholder="Country" disabled value="Canada" />
            </div>
          </div>

          <div id="contact-info">
            <h3>Contact Information</h3>
            <div>
              <input
                name="email"
                value={this.state.email}
                onChange={this.onChange}
                placeholder="Enter your Email"
              />
            </div>
            <div>
              <input
                type="number"
                max="12"
                placeholder="Enter your phone number (OPTIONAL)"
              />
            </div>
            <p style={{ width: "80%", fontSize: "14px", fontWeight: "bold" }}>
              No need to worry, your contact details are safe with us. We only
              ask what we require to complete the purchase.
            </p>
          </div>
        </div>
        {this.state.errorField ? (
          <p style={{ textAlign: "center", color: "red" }}>
            Error: {this.state.errorField} is not valid
          </p>
        ) : (
          ""
        )}
        <button id="proceed-pay-btn" onClick={this.validate}>
          Proceed to Pay
        </button>
        {this.state.showPayBtns ? (
          <PayPalScriptProvider id="paypal-btns" options={initialOptions}>
            <Payment />
          </PayPalScriptProvider>
        ) : (
          ""
        )}
      </Fragment>
    );
  }
}
const mapStateToProps = (state) => ({
  cartItems: state.item.cartItems,
});
export default connect(mapStateToProps, null)(ShipDetail);
