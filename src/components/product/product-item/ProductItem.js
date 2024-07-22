import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

const ProductItem = ({ item }) => {
  const [photoURL, setPhotoURL] = useState("");

  useEffect(() => {
    const storage = getStorage();
    const photoRef = ref(storage, item.photo); // item.photo adalah path di Firebase Storage

    // Mendapatkan URL download untuk foto
    getDownloadURL(photoRef)
      .then((url) => {
        setPhotoURL(url);
      })
      .catch((error) => {
        console.error("Error getting photo URL:", error);
      });
  }, [item.photo]);

  return (
    <tr>
      <td>{item.name}</td>
      <td>{item.category}</td>
      <td>
        <img src={photoURL} alt={item.name} width="100" />
      </td>
      <td>{item.video || "N/A"}</td>
      <td>{item.arLink || "N/A"}</td>
      <td>{item.desc}</td>
      <td style={{ textAlign: "center" }}>
        <Link to={"/product/" + item.id}>Show</Link>
      </td>
      <td style={{ textAlign: "center" }}>
        <Link to={"/product/edit/" + item.id}>Edit</Link>
      </td>
    </tr>
  );
};

export default ProductItem;
