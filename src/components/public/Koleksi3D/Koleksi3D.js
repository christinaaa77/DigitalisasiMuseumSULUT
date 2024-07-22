import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { clearAlert, setLoading } from "actions/general";
import { getProducts } from "actions/product";
import { Link } from "react-router-dom";
import Alerts from "utils/alerts";
import { Go } from "assets";
import "./koleksi3d.css";

const Koleksi3D = ({
  products,
  getProducts,
  clearAlert,
  setLoading,
  history,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  useEffect(() => {
    clearAlert();
    setLoading(true);
    getProducts(() => {
      setLoading(false);
    });
  }, [getProducts, setLoading, clearAlert]);

  const handleGoBack = () => {
    history.goBack();
  };

  const limitText = (text, limit) => {
    if (text.length <= limit) {
      return text;
    }
    return text.slice(0, limit) + "...";
  };

  // Filter products based on the presence of arLink
  const arLinkProducts = products.filter((item) => item.arLink);

  // Calculate indices for products to display
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = arLinkProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Function to change the page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container2">
    <h1 className="page-title">Koleksi 3D</h1>
  <Alerts />
  <div className="range-content">
  <div className="header">
    <Link className="btn btn-secondary1" to="#" onClick={handleGoBack}>
      Back
    </Link>
  </div>
  <div className="collection-list">
    {currentProducts.length > 0 ? (
      currentProducts.map((item) => (
        <div className="collection" key={item.id}>
          <div className="collection-box">
            <img src={item.photo} alt={item.name} />
          </div>
          <div className="title-button-box">
            <div className="title-go">
              <h2>{item.name}</h2>
              <Link to={`/koleksi-preview/${item.id}`}>
                <img className="koleksi-go" src={Go} alt="Go" />
              </Link>
            </div>
            <p>{limitText(item.desc, 17)}</p>
          </div>
        </div>
      ))
    ) : (
      <div className="product-no-products">There are no collection.</div>
    )}
  </div>
  </div>
  <nav>
    <ul className="pagination">
      {Array(Math.ceil(arLinkProducts.length / productsPerPage))
        .fill()
        .map((_, i) => (
          <li
            key={i}
            className={`page-item ${i + 1 === currentPage ? "active" : ""}`}
          >
            <button onClick={() => paginate(i + 1)} className="page-link">
              {i + 1}
            </button>
          </li>
        ))}
    </ul>
  </nav>
</div>
  );
};

function mapStateToProps(state) {
  return {
    products: state.product.products,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setLoading: (status) => dispatch(setLoading(status)),
    clearAlert: () => dispatch(clearAlert()),
    getProducts: (callback) => dispatch(getProducts(callback)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Koleksi3D);
