import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { clearAlert, setLoading } from "actions/general";
import { getProducts } from "actions/product";
import { Link } from "react-router-dom";
import Alerts from "utils/alerts";
import { Go } from "assets";
import "./Jenis.css";

const Koleksi = ({
  products,
  getProducts,
  clearAlert,
  setLoading,
  history,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("all"); // Default: All Categories
  const productsPerPage = 6;
  const [showTitle, setShowTitle] = useState(false); // State untuk menampilkan judul dengan motion effect setelah loading selesai

  useEffect(() => {
    clearAlert();
    setLoading(true);
    getProducts(() => {
      setLoading(false);
      setShowTitle(true); // Setelah loading selesai, judul akan ditampilkan dengan motion effect
    });
  }, [getProducts, setLoading, clearAlert]);

  const handleGoBack = () => {
    history.goBack();
  };


  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setCurrentPage(1); // Reset to the first page when category changes
  };

  // Filter products based on selected category
  const filteredProducts = selectedCategory === "all"
    ? products
    : products.filter((item) => item.category === selectedCategory);

  // Hitung indeks produk yang akan ditampilkan
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Fungsi untuk mengubah halaman
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container2">
        {showTitle && (
        <h1 className="page-title">Koleksi Museum</h1>
      )}
      <Alerts />
      <div className="range-content">
      <div className="header">
        <Link className="btn btn-secondary1" to="#" onClick={handleGoBack}>
          Back
        </Link>
        <select
          className="category-dropdown"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <option value="all">Semua Kategori</option>
          <option value="geologi">Geologi</option>
          <option value="biologi">Biologi</option>
          <option value="etnografi">Etnografi</option>
          <option value="arkeologi">Arkeologi</option>
          <option value="histori">Histori</option>
          <option value="numismatik">Numismatik</option>
          <option value="filologi">Filologi</option>
          <option value="keramik">Keramik</option>
          <option value="seni rupa">Seni Rupa</option>
          <option value="teknologi">Teknologi</option>
        </select>
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
                <p>{item.desc}</p>
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
          {Array(Math.ceil(filteredProducts.length / productsPerPage))
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

export default connect(mapStateToProps, mapDispatchToProps)(Koleksi);
