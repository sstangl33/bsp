import React from "react";

import { client } from "../lib/client";
import { Product, FooterBanner, HeroBanner } from "../components";

const Home = ({ products, bannerData }) => (
  <div>
    <HeroBanner heroBanner={bannerData.length && bannerData[0]} />

    <div className="products-heading">
      <h2>Packages</h2>
    </div>
    <div className="products-container">
      {products?.map((product) =>
        product.package ? <Product key={product._id} product={product} /> : null
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

    {/* <FooterBanner footerBanner={bannerData && bannerData[0]} /> */}
  </div>
);

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: { products, bannerData },
  };
};

export default Home;
