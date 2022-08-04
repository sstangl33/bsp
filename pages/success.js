import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import useSWR from "swr";
import { fetcher } from "../lib/utils";

import { BsBagCheckFill } from "react-icons/bs";
import { useStateContext } from "../context/StateContext";

const Success = () => {
  const { setCartItems, setTotalPrice, setTotalQuantities } = useStateContext();

  const {
    query: { session_id },
  } = useRouter();

  const { data, error } = useSWR(() => `/api/${session_id}`, fetcher);

  useEffect(() => {
    if (data) {
      localStorage.clear();
      setCartItems([]);
      setTotalPrice(0);
      setTotalQuantities(0);
    }
  }, [data]);

  return (
    <>
      <div className="fieldGroupCollection internal-use">
        <div className="fieldGroup w-50">
          <label>Payment Status</label>
          <p>{data?.payment_status}</p>
        </div>
        <div className="fieldGroup w-50">
          <label>Image Number (Leave blank - for internal use)</label>
          <p></p>
        </div>
      </div>

      <div className="success-wrapper">
        <div className="success">
          <p className="icon">
            <BsBagCheckFill />
          </p>
          <h2>Thank you for your order!</h2>
          <div className="alert">
            <p>
              <strong>
                <span>IMPORTANT</span>IF THIS IS A PRE-ORDER, PLEASE PRINT THIS
                ORDER CONFIRMATION AND BRING IT TO THE PHOTOSHOOT.
              </strong>
            </p>
          </div>

          <h3>Order Info</h3>
          {console.log("Data:", data)}
          {data?.line_items.data.map((item) => (
            <div className="fieldGroupCollection">
              <div className="fieldGroup w-25">
                <label>Quantity</label>
                <p>{item.quantity}</p>
              </div>
              <div className="fieldGroup w-50">
                <label>Product</label>
                <p>{item.description}</p>
              </div>
            </div>
          ))}

          <hr />
          <h3>Customer Info</h3>
          <div className="fieldGroup">
            <label>Customer Name</label>
            <p>{data?.customer_details.name}</p>
          </div>

          <div className="fieldGroup">
            <label>Address 1</label>
            <p>{data?.customer_details.address.line1}</p>
          </div>

          <div className="fieldGroup">
            <label>Address 2</label>
            <p>{data?.customer_details.address.line2}</p>
          </div>

          <div className="fieldGroupCollection">
            <div className="fieldGroup w-50">
              <label>City</label>
              <p>{data?.customer_details.address.city}</p>
            </div>

            <div className="fieldGroup w-25">
              <label>State</label>
              <p>{data?.customer_details.address.state}</p>
            </div>

            <div className="fieldGroup w-25">
              <label>Postal Code</label>
              <p>{data?.customer_details.address.postal_code}</p>
            </div>
          </div>

          <div className="fieldGroupCollection">
            <div className="fieldGroup w-50">
              <label>Phone</label>
              <p>{data?.customer_details.phone}</p>
            </div>
            <div className="fieldGroup w-50">
              <label>Email</label>
              <p>{data?.customer_details.email}</p>
            </div>
          </div>

          <hr />
          <h3>Product Data</h3>
          <div className="fieldGroupCollection">
            <div className="fieldGroup w-50">
              <label>Athlete First Name</label>
              <p>{data?.metadata.athleteFirstName}</p>
            </div>
            <div className="fieldGroup w-50">
              <label>Athlete Last Name</label>
              <p>{data?.metadata.athleteLastName}</p>
            </div>
          </div>

          <div className="fieldGroupCollection">
            <div className="fieldGroup w-50">
              <label>Sport</label>
              <p>{data?.metadata.sport}</p>
            </div>
            <div className="fieldGroup w-50">
              <label>Team Name</label>
              <p>{data?.metadata.teamName}</p>
            </div>
          </div>

          <div className="fieldGroupCollection">
            <div className="fieldGroup w-25">
              <label>Jersey Number</label>
              <p>{data?.metadata.jerseyNumber}</p>
            </div>

            <div className="fieldGroup w-25">
              <label>Athlete's Age</label>
              <p>{data?.metadata.athleteAge}</p>
            </div>

            <div className="fieldGroup w-25">
              <label>Athlete's Height</label>
              <p>{data?.metadata.athleteHeight}</p>
            </div>
          </div>

          <div className="fieldGroupCollection">
            <div className="fieldGroup w-50">
              <label>Athlete's Positon</label>
              <p>{data?.metadata.athletePosition}</p>
            </div>

            <div className="fieldGroup w-50">
              <label>Coach's Name</label>
              <p>{data?.metadata.coachName}</p>
            </div>
          </div>

          {/* <p className="email-msg">Check your email inbox for the receipt.</p> */}
          <p className="description">
            If you have any questions, please email
            <a className="email" href="mailto:billsauersphotography@gmail.com">
              billsauersphotography@gmail.com or call <tel>724-469-1247</tel>
            </a>
          </p>
          <Link href="/">
            <button type="button" width="300px" className="btn">
              Continue Shopping
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Success;
