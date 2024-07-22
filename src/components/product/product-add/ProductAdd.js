import React, { useRef, useEffect, useState } from "react";
import { connect } from "react-redux";
import { addProduct } from "actions/product";
import { setLoading, setAlert, clearAlert } from "actions/general";
import { Form, Button, Card, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import Alerts from "utils/alerts";
import firebase from "firebase/app";
import "firebase/storage";

const ProductAdd = ({
  addProduct,
  setLoading,
  setAlert,
  clearAlert,
  history,
}) => {
  // Cleanup alert on unmount
  useEffect(() => {
    return () => {
      clearAlert();
    };
  }, [clearAlert]);

  const nameRef = useRef();
  const categoryRef = useRef();
  const photoRef = useRef();
  const videoRef = useRef();
  const descRef = useRef();
  const arLinkRef = useRef();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const photoFile = photoRef.current.files[0];
    const video = videoRef.current.value.trim() !== "" ? videoRef.current.value : null;
    const arLink = arLinkRef.current.value.trim() !== "" ? arLinkRef.current.value : null;
    const photoUrl = await uploadImageToFirebaseStorage(photoFile);

    addProduct(
      nameRef.current.value,
      categoryRef.current.value,
      photoUrl,
      video,
      arLink,
      descRef.current.value,
      (key) => {
        setAlert({
          show: true,
          variant: "success",
          message: "Product has been added successfully",
        });
        history.push("/product/" + key, { from: "productAdd" });
      }
    ).then(() => {
      setLoading(false);
    });
  }

  function handleGoBack() {
    history.goBack();
  }

  async function uploadImageToFirebaseStorage(file) {
    const storageRef = firebase.storage().ref();
    const imageRef = storageRef.child("product_images/" + file.name);
    const snapshot = await imageRef.put(file);
    return await snapshot.ref.getDownloadURL();
  }

  const [categoryOptions, setCategoryOptions] = useState([
    "geologi",
    "biologi",
    "etnografi",
    "arkeologi",
    "histori",
    "numismatik",
    "filologi",
    "keramik",
    "seni rupa",
    "teknologi"
  ]);

  const hideOpenOption = () => {
    setCategoryOptions((prevOptions) => {
      if (prevOptions[0] === "Set Kategori") {
        return prevOptions.slice(1);
      }
      return prevOptions;
    });
  };

  return (
    <Container>
      <Card className="jumbotron auth">
        <Card.Body>
          <h2 className="text-center mb-4">Koleksi Baru</h2>
          <Alerts />
          <Form onSubmit={handleSubmit}>
            <Form.Group id="name">
              <Form.Label>Nama Koleksi</Form.Label>
              <Form.Control type="text" ref={nameRef} required />
            </Form.Group>
            <Form.Group id="category">
        <Form.Label>Kategori Koleksi</Form.Label>
        <Form.Control as="select" ref={categoryRef} required onFocus={hideOpenOption} >
          <option disabled selected>Set Kategori</option>
          {categoryOptions.map((category, index) => (
            <option key={index} value={category}>{category}</option>
          ))}
        </Form.Control>
      </Form.Group>
            <Form.Group id="photo">
              <Form.Label>Foto</Form.Label>
              <Form.Control type="file" ref={photoRef} accept="image/*" required />
            </Form.Group>
            <Form.Group id="video">
              <Form.Label>Video URL (Opsional)</Form.Label>
              <Form.Control type="link" ref={videoRef} />
            </Form.Group>
            <Form.Group id="arLink">
              <Form.Label>Link AR (Opsional)</Form.Label>
              <Form.Control type="link" ref={arLinkRef} />
            </Form.Group>
            <Form.Group id="description">
              <Form.Label>Deskripsi</Form.Label>
              <Form.Control as="textarea" rows={3} ref={descRef} required />
            </Form.Group>
            <Button className="w-100 mt-3 btn-success" type="submit">
              Tambahkan Koleksi
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2 auth-help">
        <Link className="btn btn-secondary" to="#" onClick={handleGoBack}>
          Back
        </Link>
      </div>
    </Container>
  );
};

function mapDispatchToProps(dispatch) {
  return {
    setAlert: (alert) => dispatch(setAlert(alert)),
    clearAlert: () => dispatch(clearAlert()),
    setLoading: (status) => dispatch(setLoading(status)),
    addProduct: (
      name,
      category,
      photo,
      video,
      arLink,
      desc,
      callback
    ) =>
      dispatch(
        addProduct(
          name,
          category,
          photo,
          video,
          arLink,
          desc,
          callback
        )
      ),
  };
}

export default connect(null, mapDispatchToProps)(ProductAdd);
