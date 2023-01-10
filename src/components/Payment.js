import React, { Fragment } from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { connect } from "react-redux";
class Payment extends React.Component {
  state = {
    tStatus: "",
  };
  onCreateOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: this.props.total,
          },
        },
      ],
    });
  };

  onApproveOrder = (data, actions) => {
    return actions.order.capture().then((details) => {
      if (details) {
        this.setState({
          tStatus: details.status,
        });
      }
    });
  };

  render() {
    return (
      <Fragment>
        <div className="checkout">
          <p style={{ fontSize: "25px", fontWeight: "bold" }}>
            Total due -
            <span style={{ color: "green" }}> ${this.props.total}</span>
          </p>
          <p style={{ fontSize: "15px", marginTop: "30px" }}>Options to Pay</p>
          <PayPalButtons
            style={{ layout: "vertical" }}
            createOrder={(data, actions) => this.onCreateOrder(data, actions)}
            onApprove={(data, actions) => this.onApproveOrder(data, actions)}
          />
        </div>
        {this.state.tStatus ? (
          <div id="tStatus-box">
            {this.state.tStatus === "COMPLETED" ? (
              <div>Hurray complete</div>
            ) : (
              <div>Please go to Cart and try again.</div>
            )}
          </div>
        ) : (
          ""
        )}
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  total: state.item.total,
});
export default connect(mapStateToProps, null)(Payment);
