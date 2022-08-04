import React, { useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

import { client, urlFor } from "../../lib/client";
import { Product } from "../../components";
import { useStateContext } from "../../context/StateContext";
import { useRouter } from "next/router";

const ProductDetails = ({ product, products }) => {
  const { image, name, details, price } = product;
  const [index, setIndex] = useState(0);
  const {
    decQty,
    incQty,
    qty,
    onAdd,
    setShowCart,
    digitalAdded,
    addDigital,
    removeDigital,
    showDigitalInStore,
  } = useStateContext();

  const handleBuyNow = () => {
    onAdd(product, qty);

    setShowCart(true);
  };

  const router = useRouter();
  const productURL = router.query.slug;

  return (
    <div>
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            <img
              src={urlFor(image && image[index])}
              className="product-detail-image"
            />
          </div>
          <div className="small-images-container">
            {image?.map((item, i) => (
              <img
                key={i}
                src={urlFor(item)}
                className={
                  i === index ? "small-image selected-image" : "small-image"
                }
                onClick={() => setIndex(i)}
              />
            ))}
          </div>
        </div>

        <div className="product-detail-desc">
          <h1>{name}</h1>
          {/* <h4>Details: </h4> */}
          <p>{details}</p>
          <p className="price">${price}</p>
          <div className="quantity">
            <h3>Quantity:</h3>
            <p className="quantity-desc">
              <span className="minus" onClick={decQty}>
                <AiOutlineMinus />
              </span>
              <span className="num">{qty}</span>
              <span className="plus" onClick={incQty}>
                <AiOutlinePlus />
              </span>
            </p>
          </div>
          {(showDigitalInStore === true && productURL === "package-a") ||
          (showDigitalInStore === true && productURL === "package-b") ||
          (showDigitalInStore === true && productURL === "package-c") ||
          (showDigitalInStore === true && productURL === "package-d") ||
          (showDigitalInStore === true && productURL === "package-e") ? (
            <div className="digitalAddon">
              <h2>Digital Image Add-on</h2>
              <p>
                Have a high resolution digital copy of your image emailed to
                you.
              </p>
              <p className="price">$10</p>
              <div className="quantity">
                <h3>Add to order:</h3>
                <p className="quantity-desc">
                  <span className="minus" onClick={removeDigital}>
                    <AiOutlineMinus />
                  </span>
                  <span className="num">{digitalAdded ? 1 : 0}</span>
                  <span className="plus" onClick={addDigital}>
                    <AiOutlinePlus />
                  </span>
                </p>
              </div>
            </div>
          ) : null}
          <div className="buttons">
            <button
              type="button"
              className="add-to-cart"
              onClick={() => onAdd(product, qty)}
            >
              Add to Cart
            </button>
            <button type="button" className="buy-now" onClick={handleBuyNow}>
              Buy Now
            </button>
          </div>
        </div>
      </div>

      <div className="products-heading">
        <h2>Packages</h2>
      </div>
      <div className="products-container">
        {products?.map((product) =>
          product.package ? (
            <Product key={product._id} product={product} />
          ) : null
        )}
      </div>

      <div className="products-heading">
        <h2>Designer and Specialty Products</h2>
      </div>
      <div className="products-container">
        {products?.map((product) =>
          product.designerSpecialty ? (
            <Product key={product._id} product={product} />
          ) : null
        )}
      </div>

      <div className="products-heading">
        <h2>Ala Carte</h2>
      </div>
      <div className="products-container">
        {products?.map((product) =>
          product.alaCarte ? (
            <Product key={product._id} product={product} />
          ) : null
        )}
      </div>

      {/* <div className="maylike-products-wrapper">
        <h2>You may also like</h2>
        <div className="marquee">
          <div className="maylike-products-container">
            {products.map((item) => (
              <Product key={item._id} product={item} />
            ))}
          </div>
        </div>
      </div> */}
    </div>
  );
};

export const getStaticPaths = async () => {
  const query = `*[_type == "product"] {
    slug {
      current
    }
  }
  `;

  const products = await client.fetch(query);

  const paths = products.map((product) => ({
    params: {
      slug: product.slug.current,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params: { slug } }) => {
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
  const productsQuery = '*[_type == "product"]';

  const product = await client.fetch(query);
  const products = await client.fetch(productsQuery);

  return {
    props: { products, product },
  };
};

export default ProductDetails;
