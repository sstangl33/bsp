import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const Context = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);
  const [digital, setDigital] = useState(0);
  const [showDigitalInStore, setShowDigitalInStore] = useState(1);
  const [showDigitalInCart, setShowDigitalInCart] = useState(0);

  let foundProduct;
  let index;

  const onAdd = (product, quantity, digital) => {
    const checkProductInCart = cartItems.find(
      (item) => item._id === product._id
    );

    if (digital === 1) {
      setTotalPrice(
        (prevTotalPrice) => prevTotalPrice + product.price * quantity + 10
      );
      setShowDigitalInCart(1);
      setShowDigitalInStore(0);
    } else {
      setTotalPrice(
        (prevTotalPrice) => prevTotalPrice + product.price * quantity
      );
    }

    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

    if (checkProductInCart) {
      const updatedCartItems = cartItems.map((cartProduct) => {
        if (cartProduct._id === product._id) {
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + quantity,
          };
        } else {
          return { ...cartProduct };
        }
      });

      setCartItems(updatedCartItems);
    } else {
      product.quantity = quantity;
      setCartItems([...cartItems, { ...product }]);
    }

    toast.success(`${qty} ${product.name} added to the cart`, {
      position: "top-right",
      style: {
        marginRight: "80px",
        boxShadow: "none",
      },
      duration: 2000,
      iconTheme: {
        primary: "#c8050c",
        secondary: "#FFFAEE",
      },
    });
  };

  const onRemove = (product) => {
    foundProduct = cartItems.find((item) => item._id === product._id);
    const newCartItems = cartItems.filter((item) => item._id !== product._id);

    if (digital === 1) {
      setTotalPrice(
        (prevTotalPrice) =>
          prevTotalPrice - foundProduct.price * foundProduct.quantity - 10
      );
      setShowDigitalInCart(0);
      setShowDigitalInStore(1);
      setDigital(0);
    } else {
      setTotalPrice(
        (prevTotalPrice) =>
          prevTotalPrice - foundProduct.price * foundProduct.quantity
      );
    }

    setTotalQuantities(
      (prevTotalQuantities) => prevTotalQuantities - foundProduct.quantity
    );
    setCartItems(newCartItems);
  };

  const toggleCartItemQuantity = (id, value) => {
    foundProduct = cartItems.find((item) => item._id === id);
    index = cartItems.findIndex((product) => product._id === id);
    const newCartItems = cartItems.filter((item) => item._id !== id);

    if (value === "inc") {
      setCartItems([
        ...newCartItems,
        { ...foundProduct, quantity: foundProduct.quantity + 1 },
      ]);
      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
      setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1);
    } else if (value === "dec") {
      if (foundProduct.quantity > 1) {
        setCartItems([
          ...newCartItems,
          { ...foundProduct, quantity: foundProduct.quantity - 1 },
        ]);
        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1);
      }
    }
  };

  const incQty = () => {
    setQty((prevQty) => prevQty + 1);
  };

  const decQty = () => {
    setQty((prevQty) => {
      if (prevQty - 1 < 1) return 1;

      return prevQty - 1;
    });
  };

  const addDigital = () => {
    setDigital(1);
    setShowDigitalInStore(1);
  };

  const removeDigital = () => {
    setDigital(0);
    setShowDigitalInStore(0);
  };

  const updateDigitalQuantity = (value) => {
    if (value === "addDigital") {
      setDigital(1);
      setShowDigitalInStore(1);
    } else {
      setDigital(0);
      setShowDigitalInStore(0);
      setShowDigitalInCart(1);
      setTotalPrice((prevTotalPrice) => prevTotalPrice - 10);
    }
  };

  return (
    <Context.Provider
      value={{
        showCart,
        setShowCart,
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        incQty,
        decQty,
        digital,
        addDigital,
        removeDigital,
        onAdd,
        toggleCartItemQuantity,
        onRemove,
        setCartItems,
        setTotalPrice,
        setTotalQuantities,
        updateDigitalQuantity,
        showDigitalInStore,
        showDigitalInCart,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
