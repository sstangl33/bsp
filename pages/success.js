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
    <div className="success-wrapper">
      <div className="success">
        <p className="icon">
          <BsBagCheckFill />
        </p>
        <h2>Thank you for your order!</h2>
        <strong>
          IMPORTANT: PLEASE PRINT THIS ORDER CONFIRMATION AND BRING IT TO THE
          PHOTOSHOOT.
        </strong>
        {console.log(data)}
        <p>{data?.id}</p>
        <p>{data?.customer_details.name}</p>
        <p>{data?.customer_details.address.line1}</p>
        <p>{data?.customer_details.address.line2}</p>
        <p>{data?.customer_details.address.city}</p>
        <p>{data?.customer_details.address.state}</p>
        <p>{data?.customer_details.address.postal_code}</p>
        <p>{data?.customer_details.email}</p>
        <p>{data?.customer_details.phone}</p>
        <p>{data?.metadata.sport}</p>
        <p>{data?.metadata.athlete_first_name}</p>
        <p>{data?.metadata.jersey_number}</p>
        <p>{data?.metadata.team_name}</p>
        <p>{data?.metadata.athlete_age}</p>
        <p>{data?.metadata.athlete_height}</p>
        <p>{data?.metadata.athlete_position}</p>
        <p>{data?.metadata.coach_name}</p>

        <p className="email-msg">Check your email inbox for the receipt.</p>
        <p className="description">
          If you have any questions, please email
          <a className="email" href="mailto:billsauersphotography@gmail.com">
            billsauersphotography@gmail.com or call <tel>555-555-5555</tel>
          </a>
        </p>
        <Link href="/">
          <button type="button" width="300px" className="btn">
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Success;
