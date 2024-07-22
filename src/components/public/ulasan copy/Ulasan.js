import React, { useState } from 'react';
import firebase from 'firebase'; // Pastikan Anda telah mengimpor Firebase
import './ulasan.css'; // Import CSS file

const AddUlasanForm = () => {
  const [rating, setRating] = useState(0);
  const [ulasan, setUlasan] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Panggil fungsi untuk menambahkan ulasan ke Firebase
    addUlasanToFirebase();
  };

  const addUlasanToFirebase = () => {
    firebase
      .database()
      .ref('ulasans')
      .push({
        rating: rating,
        ulasan: ulasan,
        date: new Date().toISOString().slice(0, 10), // Menggunakan tanggal dari jaringan
      })
      .then(() => {
        // Reset form setelah berhasil menambahkan ulasan
        setRating(0);
        setUlasan('');
        alert('Ulasan berhasil ditambahkan!');
      })
      .catch((error) => {
        console.error('Error adding ulasan: ', error);
        alert('Terjadi kesalahan. Ulasan gagal ditambahkan.');
      });
  };

  // Fungsi untuk menetapkan rating
  const handleSetRating = (value) => {
    setRating(value);
  };

  return (
    <div className="add-ulasan-form-container-child">
      <h2 className="ulsn">Tambah Ulasan</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Rating:</label>
          <div className="rating-stars">
            {[1, 2, 3, 4, 5].map((value) => (
              <span
                key={value}
                className={value <= rating ? 'filled' : ''}
                onClick={() => handleSetRating(value)}
              >
                &#9733;
              </span>
            ))}
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="ulasan">Ulasan:</label>
          <textarea
            id="ulasan"
            value={ulasan}
            onChange={(e) => setUlasan(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddUlasanForm;
