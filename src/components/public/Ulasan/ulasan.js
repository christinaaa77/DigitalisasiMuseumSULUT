import React, { useEffect, useState } from 'react';
import firebase from 'firebase'; 
import "./ulasan.css"
import AddUlasanForm from "../ulasan copy/Ulasan";
import Loader from '../loading/LoadingPage';

const UlasanContainer = () => {
  const [ulasans, setUlasans] = useState([]);
  const [totalUlasan, setTotalUlasan] = useState(0);
  const [totalRating, setTotalRating] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const ulasansPerPage = 5; // Number of reviews per page

  useEffect(() => {
    const fetchUlasans = async () => {
      const ulasanRef = firebase.database().ref('ulasans');
      ulasanRef.on('value', (snapshot) => {
        const ulasans = snapshot.val();
        const ulasansList = [];
        let totalRating = 0;
        for (let id in ulasans) {
          ulasansList.push({ id, ...ulasans[id] });
          totalRating += parseInt(ulasans[id].rating);
        }
        ulasansList.sort((a, b) => b.date.localeCompare(a.date)); // Sorting ulasans by date
        setUlasans(ulasansList);
        setTotalUlasan(ulasansList.length);
        setTotalRating(totalRating / ulasansList.length);
      });
    };

    fetchUlasans();

    return () => {
      firebase.database().ref('ulasans').off('value');
    };
  }, []);

  const handleUlasanSubmit = (ulasanData) => {
    firebase.database().ref('ulasans').push(ulasanData);
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(totalUlasan / ulasansPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Calculate the reviews to display based on the current page
  const indexOfLastUlasan = currentPage * ulasansPerPage;
  const indexOfFirstUlasan = indexOfLastUlasan - ulasansPerPage;
  const currentUlasans = ulasans.slice(indexOfFirstUlasan, indexOfLastUlasan);

  const totalPages = Math.ceil(totalUlasan / ulasansPerPage);

  return (
    <div className="ulasan-container">
      <Loader/>
      <div className="center-ulasan">
      <h2 className="ulasan-pengguna">Ulasan Pengguna</h2>
      <div className="total-rating">
        Total Rating: {totalRating.toFixed(1)} ({totalUlasan} Ulasan)
      </div>
      <div className="rating-stars">
        {[...Array(5)].map((_, index) => (
          <span key={index} className={`star ${index < totalRating ? 'filled' : ''}`}>
            &#9733;
          </span>
        ))}
      </div>
      <div className="add-ulasan-form-container">
        <AddUlasanForm onSubmit={handleUlasanSubmit} totalRating={totalRating} />
      </div>
      </div>
      <ul className="ulasan-list">
        {currentUlasans.map((ulasan) => (
          <li key={ulasan.id}>
            <strong>Rating: {[...Array(5)].map((_, i) => (
              <span key={i} className={`star ${i < parseInt(ulasan.rating) ? 'filled' : ''}`}>&#9733;</span>
            ))} ({ulasan.rating})</strong>
            <p>Ulasan: {ulasan.ulasan}</p>
            <p>Tanggal: {ulasan.date}</p>
          </li>
        ))}
      </ul>
      <div className="pagination">
        <button onClick={handlePrevPage} className="page-button" disabled={currentPage === 1}>
          &laquo;
        </button>
        <button className="current-page">{currentPage}</button>
        <button onClick={handleNextPage} className="page-button" disabled={currentPage === totalPages}>
          &raquo;
        </button>
      </div>
    </div>
  );
};

export default UlasanContainer;
