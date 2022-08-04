import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const Context = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);
  const [digitalAdded, setDigitalAdded] = useState(false);
  const [showDigitalInStore, setShowDigitalInStore] = useState(true);
  const [showDigitalInCart, setShowDigitalInCart] = useState(1);
  const [productWithDigitalAddon, setProductWithDigitalAddon] = useState("");

  let foundProduct;
  let index;

  const onAdd = (product, quantity, digitalAdded) => {
    if (digitalAdded) {
      setProductWithDigitalAddon(product.name);
    }

    const checkProductInCart = cartItems.find(
      (item) => item._id === product._id
    );

    if (showDigitalInCart === 1) {
      setShowDigitalInStore(false);
      setShowDigitalInCart(2);
      setDigitalAdded(false);
      setTotalPrice(
        (prevTotalPrice) => prevTotalPrice + product.price * quantity + 1
      );
    } else {
      setDigitalAdded(false);
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

    if (product.name === productWithDigitalAddon) {
      setTotalPrice(
        (prevTotalPrice) =>
          prevTotalPrice - foundProduct.price * foundProduct.quantity - 10
      );
      setShowDigitalInStore(true);
      setDigitalAdded(false);
      setShowDigitalInCart(0);
      setProductWithDigitalAddon("");
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
        ...newCartItems.slice(0, index),
        { ...foundProduct, quantity: foundProduct.quantity + 1 },
        ...newCartItems.slice(index),
      ]);
      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
      setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1);
    } else if (value === "dec") {
      if (foundProduct.quantity > 1) {
        setCartItems([
          ...newCartItems.slice(0, index),
          { ...foundProduct, quantity: foundProduct.quantity - 1 },
          ...newCartItems.slice(index),
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
    setDigitalAdded(true);
    setShowDigitalInCart(1);
  };

  const removeDigital = () => {
    setDigitalAdded(false);
    setShowDigitalInCart(0);
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
        digitalAdded,
        addDigital,
        removeDigital,
        onAdd,
        toggleCartItemQuantity,
        onRemove,
        setCartItems,
        setTotalPrice,
        setTotalQuantities,
        showDigitalInStore,
        showDigitalInCart,
        productWithDigitalAddon,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
