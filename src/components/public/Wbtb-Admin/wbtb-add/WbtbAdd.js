import React, { useRef, useEffect, useState } from "react";
import { connect } from "react-redux";
import { addWbtb } from "actions/product";
import { setLoading, setAlert, clearAlert } from "actions/general";
import { Form, Button, Card, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import Alerts from "utils/alerts";
import firebase from "firebase/app";
import "firebase/storage";

const WbtbAdd = ({
  addWbtb,
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
  const sourceLinkRef = useRef();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const photoFile = photoRef.current.files[0];
    const video = videoRef.current.value.trim() !== "" ? videoRef.current.value : null;
    const sourceLink = sourceLinkRef.current.value.trim() !== "" ? sourceLinkRef.current.value : null;
    const photoUrl = await uploadImageToFirebaseStorage(photoFile);

    addWbtb(
      nameRef.current.value,
      categoryRef.current.value,
      photoUrl,
      video,
      sourceLink,
      descRef.current.value,
      (key) => {
        setAlert({
          show: true,
          variant: "success",
          message: "Wbtb has been added successfully",
        });
        history.push("/wbtb/" + key, { from: "wbtbAdd" });
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
    const imageRef = storageRef.child("wbtb_images/" + file.name);
    const snapshot = await imageRef.put(file);
    return await snapshot.ref.getDownloadURL();
  }

  const [categoryOptions, setCategoryOptions] = useState([
    "Musik",
    "Tarian",
    "Makanan",
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
          <h2 className="text-center mb-4">Wbtb Baru</h2>
          <Alerts />
          <Form onSubmit={handleSubmit}>
            <Form.Group id="name">
              <Form.Label>Nama Wbtb</Form.Label>
              <Form.Control type="text" ref={nameRef} required />
            </Form.Group>
            <Form.Group id="category">
        <Form.Label>Kategori Wbtb</Form.Label>
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
            <Form.Group id="sourceLink">
              <Form.Label>Link AR (Opsional)</Form.Label>
              <Form.Control type="link" ref={sourceLinkRef} />
            </Form.Group>
            <Form.Group id="description">
              <Form.Label>Deskripsi</Form.Label>
              <Form.Control as="textarea" rows={3} ref={descRef} required />
            </Form.Group>
            <Button className="w-100 mt-3 btn-success" type="submit">
              Tambahkan Wbtb
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
    addWbtb: (
      name,
      category,
      photo,
      video,
      sourceLink,
      desc,
      callback
    ) =>
      dispatch(
        addWbtb(
          name,
          category,
          photo,
          video,
          sourceLink,
          desc,
          callback
        )
      ),
  };
}

export default connect(null, mapDispatchToProps)(WbtbAdd);
