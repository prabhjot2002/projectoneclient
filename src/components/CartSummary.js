import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShieldHalved } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { saveTotal } from "../actions/itemActions";

class CartSummary extends Component {
  render() {
    let taxes = this.props.subTotal * 0.13;
    // 10 for shipping
    let total = (this.props.subTotal + taxes + 10).toFixed(2);

    return (
      <div id="cart-summary">
        <h3>Summary</h3>
        <div>
          SubTotal<p>CAD {this.props.subTotal.toFixed(2)}</p>
        </div>
        <div>
          Shipping<p>CAD 10.00</p>
        </div>
        <div>
          Taxes<p>CAD {taxes.toFixed(2)}</p>
        </div>
        <div>
          Total<p>CAD {total}</p>
        </div>
        {this.props.subTotal < 10 ? (
          <p style={{ color: "red" }}>
            Please add more items. SubTotal must be greater than $10
          </p>
        ) : (
          ""
        )}
        <div style={{ width: "fit-content", margin: "auto" }}>
          {this.props.subTotal >= 10 ? (
            <Link
              onClick={() => {
                this.props.saveTotal(total);
              }}
              to="/shipdetail"
              id="checkout-btn"
            >
              Checkout
            </Link>
          ) : (
            <Link id="checkout-btn">Checkout</Link>
          )}
        </div>

        <div className="static-text">
          <h5>Buyer Protection</h5>
          <p>
            <FontAwesomeIcon icon={faShieldHalved} />
            Get full refund if the item is not delivered or not as described
          </p>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  cartItems: state.item.cartItems,
});
export default connect(mapStateToProps, { saveTotal })(CartSummary);
