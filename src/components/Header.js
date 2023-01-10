import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class Header extends Component {
  render() {
    let d = new Date();

    let greetingSrc = "";
    let hour = d.getHours();
    if (hour >= 5 && hour < 12) {
      greetingSrc = "https://img.icons8.com/color/96/000000/morning.png";
    } else if (hour >= 12 && hour < 17) {
      greetingSrc = "https://img.icons8.com/color/96/000000/afternoon.png";
    } else if (hour >= 17 && hour < 20) {
      greetingSrc = "https://img.icons8.com/color/96/000000/evening.png";
    } else if (hour >= 20 || hour < 5) {
      greetingSrc =
        "https://img.icons8.com/color/96/000000/partly-cloudy-night.png";
    }

    return (
      <header>
        <div id="greeting">
          <img alt="icon" src={greetingSrc} />
        </div>

        <h2>
          <Link to="/">THE INDIAN GOODIES</Link>
        </h2>
        <div>
          <Link id="track-btn" to="/trackOrder">
            Track Order
          </Link>

          <Link to="/cart">
            <div id="cart-number">
              {this.props.cartItemsLen > 0 ? (
                <span id="items-count">{this.props.cartItemsLen}</span>
              ) : (
                ""
              )}
              <FontAwesomeIcon icon={faCartShopping} />
            </div>
          </Link>
        </div>
      </header>
    );
  }
}
const mapStateToProps = (state) => ({
  cartItemsLen: state.item.cartItems.length,
});
export default connect(mapStateToProps, null)(Header);
