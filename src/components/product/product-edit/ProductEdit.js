import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { editProduct, deleteProduct } from "actions/product";
import { setLoading, setAlert, clearAlert } from "actions/general";
import { Form, Button, Card, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Alerts from "utils/alerts";
import moment from "moment";

const ProductEdit = ({
  product,
  clearAlert,
  editProduct,
  deleteProduct,
  setLoading,
  setAlert,
  history,
  categoryOptions,
}) => {
  const [inputs, setInputs] = useState({
    name: product.name,
    category: product.category,
    photo: product.photo,
    video: product.video ?? "",
    arLink: product.arLink ?? "", // Set default value to an empty string
    desc: product.desc,
  });

  function handleItem(e) {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  }

  useEffect(() => {
    clearAlert();
  }, [clearAlert]);

  function handleGoBack() {
    history.goBack();
  }

  async function handleDelete() {
    if (window.confirm("Apakah Anda yakin ingin menghapus produk ini?")) {
      setLoading(true);
      deleteProduct(product.id, () => {
        setLoading(false);
        history.push("/product");
      });
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    editProduct(
      inputs.name,
      inputs.category,
      inputs.photo,
      inputs.video,
      inputs.arLink,
      inputs.desc,
      product.id,
      () => {
        setAlert({
          show: true,
          variant: "success",
          message: "Product has been altered successfully",
        });
        setLoading(false);
      }
    );
  }

  return (
    <Container>
      <Card className="jumbotron auth">
        <Card.Body>
          <h2 className="text-center mb-4">Edit Koleksi</h2>
          <Alerts />
          <Form onSubmit={handleSubmit}>
            <Form.Group id="name">
              <Form.Label>ID Koleksi</Form.Label>
              <Form.Control type="text" value={product.id} disabled />
            </Form.Group>
            <Form.Group id="name">
              <Form.Label>Nama Koleksi</Form.Label>
              <Form.Control
                name="name"
                type="text"
                onChange={(e) => handleItem(e)}
                value={inputs.name}
                required
              />
            </Form.Group>
            <Form.Group id="category">
              <Form.Label>Kategori Koleksi</Form.Label>
              <Form.Control
                name="category"
                as="select"
                onChange={(e) => handleItem(e)}
                value={inputs.category}
                required
              >
                <option value="geologi">Geologi</option>
                <option value="biologi">Biologi</option>
                <option value="etnografi">Etnografi</option>
                <option value="arkeologi">Arkeologi</option>
                <option value="histori">Histori</option>
                <option value="numismatik">Numismatik/Heraldic</option>
                <option value="filologi">Filologi</option>
                <option value="keramik">Keramik</option>
                <option value="seni rupa">Seni Rupa</option>
                <option value="teknologi">Teknologi</option>
              </Form.Control>
            </Form.Group>
            <Form.Group id="photo">
              <Form.Label>Foto URL</Form.Label>
              <Form.Control
                name="photo"
                type="text"
                onChange={(e) => handleItem(e)}
                value={inputs.photo}
                required
              />
            </Form.Group>
            <Form.Group id="video">
              <Form.Label>Video URL (Opsional)</Form.Label>
              <Form.Control
                name="video"
                type="text"
                onChange={(e) => handleItem(e)}
                value={inputs.video || ""}
              />
            </Form.Group>
            <Form.Group id="arLink">
              <Form.Label>Link AR (Opsional)</Form.Label>
              <Form.Control
                name="arLink"
                type="text"
                onChange={(e) => handleItem(e)}
                value={inputs.arLink || ""}
              />
            </Form.Group>
            <Form.Group id="description">
              <Form.Label>Deskripsi</Form.Label>
              <Form.Control
                name="desc"
                as="textarea"
                rows={3}
                onChange={(e) => handleItem(e)}
                value={inputs.desc}
                required
              />
            </Form.Group>
            <Form.Group id="description">
              <Form.Label>Created At</Form.Label>
              <Form.Control
                type="text"
                value={moment(product.createdAt).format("LLL")}
                disabled
              />
            </Form.Group>
            <Button className="w-100 mt-3 btn-warning" type="submit">
              Edit Koleksi
            </Button>
          </Form>
          <Row className="mt-3">
            <Col>
              <Button className="w-100 btn-danger" onClick={handleDelete}>
                Hapus Koleksi
              </Button>
            </Col>
          </Row>
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

function mapStateToProps(state, props) {
  return {
    product: state.product.products.find(
      (product) => product.id === props.match.params.id
    ),
    categoryOptions: state.product.categoryOptions,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setAlert: (alert) => dispatch(setAlert(alert)),
    clearAlert: () => dispatch(clearAlert()),
    setLoading: (status) => dispatch(setLoading(status)),
    editProduct: (
      name,
      category,
      photo,
      video,
      arLink,
      desc,
      key,
      callback
    ) =>
      dispatch(
        editProduct(
          name,
          category,
          photo,
          video,
          arLink,
          desc,
          key,
          callback
        )
      ),
    deleteProduct: (productId, callback) =>
      dispatch(deleteProduct(productId, callback)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductEdit);
