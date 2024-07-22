import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { clearAlert, setLoading } from "actions/general";
import { getWbtbs, deleteWbtb } from "actions/product";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Alerts from "utils/alerts";
import { Go } from "assets";
import "./wbtbList.css";

const WbtbList = ({
  wbtbs,
  getWbtbs,
  deleteWbtb,
  clearAlert,
  setLoading,
  history,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("all"); // Default: All Categories
  const wbtbsPerPage = 6;

  useEffect(() => {
    clearAlert();
    setLoading(true);
    getWbtbs(() => {
      setLoading(false);
    });
  }, [getWbtbs, setLoading, clearAlert]);

  const handleGoBack = () => {
    history.goBack();
  };
  const handleDeleteWbtb = (wbtbId) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus wbtb ini?")) {
      setLoading(true);
      deleteWbtb(wbtbId, () => {
        setLoading(false);
      });
    }
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setCurrentPage(1); // Reset to the first page when category changes
  };

  // Filter wbtbs based on selected category
  const filteredWbtbs = selectedCategory === "all"
    ? wbtbs
    : wbtbs.filter((item) => item.category === selectedCategory);

  // Calculate indexes of wbtbs to be displayed
  const indexOfLastWbtb = currentPage * wbtbsPerPage;
  const indexOfFirstWbtb = indexOfLastWbtb - wbtbsPerPage;
  const currentWbtbs = filteredWbtbs.slice(
    indexOfFirstWbtb,
    indexOfLastWbtb
  );

  // Function to change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container">
      <Alerts />
      <div className="header">
        <Link className="btn btn-secondary" to="#" onClick={handleGoBack}>
          Back
        </Link>
        <Link to="/wbtb/add" className="btn btn-primary">
          Tambah Wbtb
        </Link>
        <select
          className="category-dropdown"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <option value="all">All Categories</option>
          <option value="Musik">Musik</option>
          <option value="Tarian">Tarian</option>
          <option value="Makanan">Makanan</option>
        </select>
      </div>
      <div className="collection-list1">
        {currentWbtbs.length > 0 ? (
          currentWbtbs.map((item) => (
            <div className="collection-admin1" key={item.id}>
              <div className="collection-box1">
                <img src={item.photo} alt={item.name} />
              </div>
              <div className="title-button-box">
                <div className="title-go">
                  <h2>{item.name}</h2>
                  <Link to={`/wbtb/${item.id}`}>
                    <img className="koleksi-go" src={Go} alt="Go"/>
                  </Link>
                </div>
                <p>{item.desc}</p>
                <div className="title-go">
                  <Link to={`/wbtb/edit/${item.id}`} className="btn btn-secondary">
                  Edit
                </Link>
                <Button
                  onClick={() => handleDeleteWbtb(item.id)}
                  className="delete-button"
                >
                  Delete
                </Button>
                </div>
                
              </div>
            </div>
          ))
        ) : (
          <div className="product-no-products">There are no WBTBs.</div>
        )}
      </div>
      <nav>
        <ul className="pagination">
          {Array(Math.ceil(filteredWbtbs.length / wbtbsPerPage))
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
    wbtbs: state.wbtb.wbtbs,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setLoading: (status) => dispatch(setLoading(status)),
    clearAlert: () => dispatch(clearAlert()),
    getWbtbs: (callback) => dispatch(getWbtbs(callback)),
    deleteWbtb: (wbtbId, callback) =>
      dispatch(deleteWbtb(wbtbId, callback)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(WbtbList);
