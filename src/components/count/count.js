import React, { useEffect, useState } from 'react';
import firebase from 'services/firebase';
import "./count.css";

const VisitCounter = () => {
  const [visitCount, setVisitCount] = useState(0);

  useEffect(() => {
    const visitCountRef = firebase.database().ref('visitCount');

    // Membaca jumlah kunjungan saat komponen dipasang
    visitCountRef.once('value')
      .then(snapshot => {
        const count = snapshot.val() || 0;
        setVisitCount(count);
      })
      .catch(error => {
        console.error('Error reading visit count:', error.message);
      });

    // Menambah jumlah kunjungan setiap kali komponen dirender
    visitCountRef.transaction(currentCount => (currentCount || 0) + 1)
      .then(result => {
        if (result.committed) {
          // Gunakan `snapshot` untuk mendapatkan nilai terbaru
          const newCount = result.snapshot.val() || 0;
          setVisitCount(newCount);
        } else {
          // Transaksi tidak dilakukan
          console.error('Transaction not committed');
        }
      })
      .catch(error => {
        console.error('Error updating visit count:', error.message);
      });
  }, []);

  return (
    <div className="visitiCount">
      <p>Total Visits: {visitCount}</p>
    </div>
  );
};

export default VisitCounter;
