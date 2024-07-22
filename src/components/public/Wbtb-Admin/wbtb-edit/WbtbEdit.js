import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { editWbtb, deleteWbtb } from "actions/product";
import { setLoading, setAlert, clearAlert } from "actions/general";
import { Form, Button, Card, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Alerts from "utils/alerts";
import moment from "moment";

const WbtbEdit = ({
  wbtb,
  clearAlert,
  editWbtb,
  deleteWbtb,
  setLoading,
  setAlert,
  history,
  categoryOptions,
}) => {
  const [inputs, setInputs] = useState({
    name: wbtb.name,
    category: wbtb.category,
    photo: wbtb.photo,
    video: wbtb.video ?? "",
    sourceLink: wbtb.sourceLink ?? "", // Set default value to an empty string
    desc: wbtb.desc,
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
      deleteWbtb(wbtb.id, () => {
        setLoading(false);
        history.push("/wbtb");
      });
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    editWbtb(
      inputs.name,
      inputs.category,
      inputs.photo,
      inputs.video,
      inputs.sourceLink,
      inputs.desc,
      wbtb.id,
      () => {
        setAlert({
          show: true,
          variant: "success",
          message: "Wbtb has been altered successfully",
        });
        setLoading(false);
      }
    );
  }

  return (
    <Container>
      <Card className="jumbotron auth">
        <Card.Body>
          <h2 className="text-center mb-4">Edit Wbtb</h2>
          <Alerts />
          <Form onSubmit={handleSubmit}>
            <Form.Group id="name">
              <Form.Label>ID Wbtb</Form.Label>
              <Form.Control type="text" value={wbtb.id} disabled />
            </Form.Group>
            <Form.Group id="name">
              <Form.Label>Nama</Form.Label>
              <Form.Control
                name="name"
                type="text"
                onChange={(e) => handleItem(e)}
                value={inputs.name}
                required
              />
            </Form.Group>
            <Form.Group id="category">
              <Form.Label>Kategori</Form.Label>
              <Form.Control
                name="category"
                as="select"
                onChange={(e) => handleItem(e)}
                value={inputs.category}
                required
              >
                <option value="Musik">Musik</option>
                <option value="Tarian">Tarian</option>
                <option value="Masakan">Masakan</option>
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
              <Form.Label>Source Link (Opsional)</Form.Label>
              <Form.Control
                name="sourceLink"
                type="text"
                onChange={(e) => handleItem(e)}
                value={inputs.sourceLink || ""}
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
                value={moment(wbtb.createdAt).format("LLL")}
                disabled
              />
            </Form.Group>
            <Button className="w-100 mt-3 btn-warning" type="submit">
              Edit Wbtb
            </Button>
          </Form>
          <Row className="mt-3">
            <Col>
              <Button className="w-100 btn-danger" onClick={handleDelete}>
                Hapus Wbtb
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
    wbtb: state.wbtb.wbtbs.find(
      (wbtb) => wbtb.id === props.match.params.id
    ),
    categoryOptions: state.wbtb.categoryOptions,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setAlert: (alert) => dispatch(setAlert(alert)),
    clearAlert: () => dispatch(clearAlert()),
    setLoading: (status) => dispatch(setLoading(status)),
    editWbtb: (
      name,
      category,
      photo,
      video,
      sourceLink,
      desc,
      key,
      callback
    ) =>
      dispatch(
        editWbtb(
          name,
          category,
          photo,
          video,
          sourceLink,
          desc,
          key,
          callback
        )
      ),
    deleteWbtb: (wbtbId, callback) =>
      dispatch(deleteWbtb(wbtbId, callback)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(WbtbEdit);
