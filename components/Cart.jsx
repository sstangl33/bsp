import React, { useRef, useState } from "react";

import toast from "react-hot-toast";
import { useStateContext } from "../context/StateContext";
// import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import getStripe from "../lib/getStripe";
import { urlFor } from "../lib/client";

import { TiDeleteOutline } from "react-icons/ti";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineLeft,
  AiOutlineShoppingCart,
} from "react-icons/ai";

const userData = {};

const Cart = () => {
  const cartRef = useRef();

  const {
    totalPrice,
    totalQuantities,
    cartItems,
    setShowCart,
    toggleCartItemQuantity,
    onRemove,
  } = useStateContext();

  const [sport, setSport] = useState("");
  const [athleteFirstName, setAthleteFirstName] = useState("");
  const [athleteLastName, setAthleteLastName] = useState("");
  const [jerseyNumber, setJerseyNumber] = useState("");
  const [teamName, setTeamName] = useState("");
  const [athleteAge, setAthleteAge] = useState("");
  const [athleteHeight, setAthleteHeight] = useState("");
  const [athletePosition, setAthletePosition] = useState("");
  const [coachName, setCoachName] = useState("");

  const userData = {
    sport,
    athleteFirstName,
    athleteLastName,
    jerseyNumber,
    teamName,
    athleteAge,
    athleteHeight,
    athletePosition,
    coachName,
  };

  const userDataValidationSchema = Yup.object({
    sport: Yup.string().required().label("Sport"),
    athleteFirstName: Yup.string().required().label("Athlete's First Name"),
    athleteLastName: Yup.string().required().label("Athlete's Last Name"),
    jerseyNumber: Yup.string().required().label("Jersey Number"),
    teamName: Yup.string().required().label("Team Name"),
    athleteAge: Yup.string().required().label("Athlete's Age"),
    athleteHeight: Yup.string().required().label("Athlete's Height"),
    athletePosition: Yup.string().required().label("Athlete's Position"),
    coachName: Yup.string().required().label("Coach Name"),
  });

  const [currentStep, setCurrentStep] = useState(0);

  const handleCheckout = async () => {
    const stripe = await getStripe();

    const response = await fetch("/api/stripe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cartItems, userData }),
    });

    if (response.statusCode === 500) return;

    const data = await response.json();
    toast.loading("Redirecting...");
    stripe.redirectToCheckout({ sessionId: data.id });
  };

  const handleSportChange = (event) => {
    setSport(event.target.value);
  };

  const handleAthleteFirstNameChange = (event) => {
    setAthleteFirstName(event.target.value);
  };

  const handleAthleteLastNameChange = (event) => {
    setAthleteLastName(event.target.value);
  };

  const handleJerseyNumberChange = (event) => {
    setJerseyNumber(event.target.value);
  };

  const handleTeamNameChange = (event) => {
    setTeamName(event.target.value);
  };

  const handleAthleteAgeChange = (event) => {
    setAthleteAge(event.target.value);
  };

  const handleAthleteHeightChange = (event) => {
    setAthleteHeight(event.target.value);
  };
  const handleAthletePositionChange = (event) => {
    setAthletePosition(event.target.value);
  };

  const handleCoachNameChange = (event) => {
    setCoachName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleCheckout();
  };

  return (
    <div className="cart-wrapper" ref={cartRef}>
      <div className="cart-container">
        <button
          type="button"
          className="cart-heading"
          onClick={() => setShowCart(false)}
        >
          <AiOutlineLeft />
          <span className="heading">Your Cart</span>
          <span className="cart-num-items">({totalQuantities} items)</span>
        </button>

        <div className={currentStep !== 0 ? "hidden" : ""}>
          {cartItems.length < 1 && (
            <div className="empty-cart">
              <AiOutlineShoppingCart size={150} />
              <h3>Your shopping cart is empty</h3>
              <button
                type="button"
                onClick={() => setShowCart(false)}
                className="btn"
              >
                Continue Shopping
              </button>
            </div>
          )}

          <div className="product-container">
            {cartItems.length >= 1 &&
              cartItems.map((item) => (
                <div className="product" key={item._id}>
                  <img
                    src={urlFor(item?.image[0])}
                    className="cart-product-image"
                  />
                  <div className="item-desc">
                    <div className="flex top">
                      <h5>{item.name}</h5>
                      <h4>${item.price}</h4>
                    </div>
                    <div className="flex bottom">
                      <div>
                        <p className="quantity-desc">
                          <span
                            className="minus"
                            onClick={() =>
                              toggleCartItemQuantity(item._id, "dec")
                            }
                          >
                            <AiOutlineMinus />
                          </span>
                          <span className="num" onClick="">
                            {item.quantity}
                          </span>
                          <span
                            className="plus"
                            onClick={() =>
                              toggleCartItemQuantity(item._id, "inc")
                            }
                          >
                            <AiOutlinePlus />
                          </span>
                        </p>
                      </div>
                      <button
                        type="button"
                        className="remove-item"
                        onClick={() => onRemove(item)}
                      >
                        <TiDeleteOutline
                          style={{
                            stroke: "#c8050c",
                            fill: "#c8050c",
                          }}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          {cartItems.length >= 1 && (
            <div className="cart-bottom">
              <div className="total">
                <h3>Subtotal:</h3>
                <h3>${totalPrice}</h3>
              </div>
              <div className="btn-container">
                <button
                  type="button"
                  className="btn"
                  onClick={() => setCurrentStep(1)}
                >
                  Checkout
                </button>
              </div>
            </div>
          )}
        </div>
        <div className={currentStep !== 1 ? "hidden" : ""}>
          <div className="product-container user-data-form">
            <p>The products in your cart require the following information</p>
            <p>
              <stromg>Note</stromg>: Any blank info will be left blank on cards.
              We are not responsible for misspelling.
            </p>
            <form onSubmit={handleSubmit}>
              <div className="fieldGroup">
                <label>Sport</label>
                <input
                  name="sport"
                  onChange={handleSportChange}
                  value={sport}
                  required
                />
              </div>

              <div className="fieldGroup">
                <label>Athlete's First Name</label>
                <input
                  name="athleteFirstName"
                  onChange={handleAthleteFirstNameChange}
                  value={athleteFirstName}
                  required
                />
              </div>

              <div className="fieldGroup">
                <label>Athlete's Last Name</label>
                <input
                  name="athleteLastName"
                  onChange={handleAthleteLastNameChange}
                  value={athleteLastName}
                  required
                />
              </div>

              <div className="fieldGroup">
                <label>
                  Jersey Number (Optional if not applicable to your sport)
                </label>
                <input
                  name="jerseyNumber"
                  onChange={handleJerseyNumberChange}
                  value={jerseyNumber}
                />
              </div>

              <div className="fieldGroup">
                <label>Team Name</label>
                <input
                  name="teamName"
                  onChange={handleTeamNameChange}
                  value={teamName}
                  required
                />
              </div>

              {cartItems
                .map((item) => item.name)
                .find(
                  (i) => i === "Package C" || i === "Deluxe Trading Cards"
                ) ? (
                <>
                  <div className="fieldGroup">
                    <label>Athlete's Age</label>
                    <input
                      name="athleteAge"
                      onChange={handleAthleteAgeChange}
                      value={athleteAge}
                      required
                    />
                  </div>

                  <div className="fieldGroup">
                    <label>Athlete's Height</label>
                    <input
                      name="athleteHeight"
                      onChange={handleAthleteHeightChange}
                      value={athleteHeight}
                      required
                    />
                  </div>

                  <div className="fieldGroup">
                    <label>
                      Athlete's Position (Optional if not applicable to your
                      sport)
                    </label>
                    <input
                      name="athletePosition"
                      onChange={handleAthletePositionChange}
                      value={athletePosition}
                      required
                    />
                  </div>

                  <div className="fieldGroup">
                    <label>Coach Name</label>
                    <input
                      name="coachName"
                      onChange={handleCoachNameChange}
                      value={coachName}
                      required
                    />
                  </div>
                </>
              ) : null}

              <button
                type="button"
                className="cart-heading"
                onClick={() => setCurrentStep(0)}
              >
                <AiOutlineLeft />
                <span className="heading">Back</span>
              </button>

              <div className="btn-container">
                <button type="submit" className="btn">
                  Pay with Stripe
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
