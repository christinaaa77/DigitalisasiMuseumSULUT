import * as actionType from "actions/types";
import firebase from "services/firebase";

export const getProducts = (callback) => async (dispatch) => {
  firebase
    .database()
    .ref("products")
    .once("value")
    .then((snapshot) => {
      let products = [];
      snapshot.forEach((item) => {
        products.push({
          id: item.key,
          name: item.val().name,
          category: item.val().category,
          photo: item.val().photo, // Updated to use a single 'photo' field
          video: item.val().video,
          arLink: item.val().arLink, // New field for AR Link
          desc: item.val().desc,
          createdAt: item.val().createdAt,
        });
      });
      dispatch({
        type: actionType.SET_PRODUCTS_SUCCESS,
        payload: products,
      });
      callback(products);
    })
    .catch((err) => {
      dispatch({
        type: actionType.SET_PRODUCTS_ERROR,
        payload: err.message,
      });
    });
  return false;
};

export const addProduct = (
  name,
  category,
  photo,
  video,
  arLink,
  desc,
  callback
) => async (dispatch) => {
  firebase
    .database()
    .ref("products")
    .push({
      createdAt: firebase.database.ServerValue.TIMESTAMP,
      name: name,
      category: category,
      photo: photo, // Updated to use a single 'photo' field
      video: video,
      arLink: arLink, // New field for AR Link
      desc: desc,
    })
    .then((snapshot) => {
      let createdAt;
      firebase
        .database()
        .ref("products")
        .once("value")
        .then((products) => {
          products.forEach((item) => {
            if (item.key === snapshot.key) createdAt = item.val().createdAt;
          });
          dispatch({
            type: actionType.ADD_PRODUCT_SUCCESS,
            payload: {
              id: snapshot.key,
              name: name,
              category: category,
              photo: photo, // Updated to use a single 'photo' field
              video: video,
              arLink: arLink, // New field for AR Link
              desc: desc,
              createdAt: createdAt,
            },
          });
          callback(snapshot.key);
        })
        .catch((err) => {
          dispatch({
            type: actionType.ADD_PRODUCT_ERROR,
            payload: err.message,
          });
        });
    })
    .catch((err) => {
      dispatch({
        type: actionType.ADD_PRODUCT_ERROR,
        payload: err.message,
      });
      dispatch({
        type: actionType.SET_ALERT,
        payload: {
          show: true,
          variant: "danger",
          message: err.message,
        },
      });
    });
  return false;
};

export const editProduct = (
  name,
  category,
  photo,
  video,
  arLink,
  desc,
  key,
  callback
) => async (dispatch) => {
  firebase
    .database()
    .ref("products/" + key)
    .update({
      name: name,
      category: category,
      photo: photo, // Updated to use a single 'photo' field
      video: video,
      arLink: arLink, // Updated to use a single 'arLink' field
      desc: desc,
    })
    .then(() => {
      dispatch({
        type: actionType.EDIT_PRODUCT_SUCCESS,
        payload: {
          id: key,
          name: name,
          category: category,
          photo: photo, // Updated to use a single 'photo' field
          video: video,
          arLink: arLink, // Updated to use a single 'arLink' field
          desc: desc,
        },
      });
      callback();
    })
    .catch((err) => {
      dispatch({
        type: actionType.EDIT_PRODUCT_ERROR,
        payload: err.message,
      });
      dispatch({
        type: actionType.SET_ALERT,
        payload: {
          show: true,
          variant: "danger",
          message: err.message,
        },
      });
    });
  return false;
};

export const deleteProduct = (productId, callback) => async (dispatch) => {
  firebase
    .database()
    .ref("products/" + productId)
    .remove()
    .then(() => {
      dispatch({
        type: actionType.DELETE_PRODUCT_SUCCESS,
        payload: productId,
      });
      callback();
    })
    .catch((err) => {
      dispatch({
        type: actionType.DELETE_PRODUCT_ERROR,
        payload: err.message,
      });
      dispatch({
        type: actionType.SET_ALERT,
        payload: {
          show: true,
          variant: "danger",
          message: err.message,
        },
      });
    });
  return false;
};

export const getProductsWithARLink = (products) => {
  const productsWithARLink = [];

  for (const productId in products) {
    const product = products[productId];
    if (product.arLink) {
      productsWithARLink.push({
        id: productId,
        ...product,
      });
    }
  }

  return productsWithARLink;
};

export const getWbtbs = (callback) => async (dispatch) => { // Mengubah "getProducts" menjadi "getWbtbs"
  firebase
    .database()
    .ref("wbtbs") // Mengubah "products" menjadi "wbtb"
    .once("value")
    .then((snapshot) => {
      let wbtbs = []; // Mengubah "products" menjadi "wbtbs"
      snapshot.forEach((item) => {
        wbtbs.push({
          id: item.key,
          name: item.val().name,
          category: item.val().category,
          photo: item.val().photo, // Tetap menggunakan "photo" karena sudah benar
          video: item.val().video,
          sourceLink: item.val().sourceLink, // Mengubah "arLink" menjadi "sourceLink" untuk AR Link
          desc: item.val().desc,
          createdAt: item.val().createdAt,
        });
      });
      dispatch({
        type: actionType.SET_WBTB_SUCCESS,
        payload: wbtbs,
      });
      callback(wbtbs);
    })
    .catch((err) => {
      dispatch({
        type: actionType.SET_WBTB_ERROR,
        payload: err.message,
      });
    });
  return false;
};

export const addWbtb = (
  name,
  category,
  photo,
  video,
  sourceLink, // Mengubah "arLink" menjadi "sourceLink" untuk AR Link
  desc,
  callback
) => async (dispatch) => {
  firebase
    .database()
    .ref("wbtbs")
    .push({
      createdAt: firebase.database.ServerValue.TIMESTAMP,
      name: name,
      category: category,
      photo: photo, // Tetap menggunakan "photo" karena sudah benar
      video: video,
      sourceLink: sourceLink, // Mengubah "arLink" menjadi "sourceLink" untuk AR Link
      desc: desc,
    })
    .then((snapshot) => {
      let createdAt;
      firebase
        .database()
        .ref("wbtbs")
        .once("value")
        .then((wbtbs) => { // Mengubah "products" menjadi "wbtbs"
          wbtbs.forEach((item) => {
            if (item.key === snapshot.key) createdAt = item.val().createdAt;
          });
          dispatch({
            type: actionType.ADD_WBTB_SUCCESS,
            payload: {
              id: snapshot.key,
              name: name,
              category: category,
              photo: photo, // Tetap menggunakan "photo" karena sudah benar
              video: video,
              sourceLink: sourceLink, // Mengubah "arLink" menjadi "sourceLink" untuk AR Link
              desc: desc,
              createdAt: createdAt,
            },
          });
          callback(snapshot.key);
        })
        .catch((err) => {
          dispatch({
            type: actionType.ADD_WBTB_ERROR,
            payload: err.message,
          });
        });
    })
    .catch((err) => {
      dispatch({
        type: actionType.ADD_WBTB_ERROR,
        payload: err.message,
      });
      dispatch({
        type: actionType.SET_ALERT,
        payload: {
          show: true,
          variant: "danger",
          message: err.message,
        },
      });
    });
  return false;
};

export const editWbtb = (
  name,
  category,
  photo,
  video,
  sourceLink, // Mengubah "arLink" menjadi "sourceLink" untuk AR Link
  desc,
  key,
  callback
) => async (dispatch) => {
  firebase
    .database()
    .ref("wbtbs/" + key)
    .update({
      name: name,
      category: category,
      photo: photo, // Tetap menggunakan "photo" karena sudah benar
      video: video,
      sourceLink: sourceLink, // Mengubah "arLink" menjadi "sourceLink" untuk AR Link
      desc: desc,
    })
    .then(() => {
      dispatch({
        type: actionType.EDIT_WBTB_SUCCESS,
        payload: {
          id: key,
          name: name,
          category: category,
          photo: photo, // Tetap menggunakan "photo" karena sudah benar
          video: video,
          sourceLink: sourceLink, // Mengubah "arLink" menjadi "sourceLink" untuk AR Link
          desc: desc,
        },
      });
      callback();
    })
    .catch((err) => {
      dispatch({
        type: actionType.EDIT_WBTB_ERROR,
        payload: err.message,
      });
      dispatch({
        type: actionType.SET_ALERT,
        payload: {
          show: true,
          variant: "danger",
          message: err.message,
        },
      });
    });
  return false;
};

export const deleteWbtb = (wbtbId, callback) => async (dispatch) => {
  firebase
    .database()
    .ref("wbtbs/" + wbtbId)
    .remove()
    .then(() => {
      dispatch({
        type: actionType.DELETE_WBTB_SUCCESS,
        payload: wbtbId,
      });
      callback();
    })
    .catch((err) => {
      dispatch({
        type: actionType.DELETE_WBTB_ERROR,
        payload: err.message,
      });
      dispatch({
        type: actionType.SET_ALERT,
        payload: {
          show: true,
          variant: "danger",
          message: err.message,
        },
      });
    });
  return false;
};
export const getUlasans = (callback) => async (dispatch) => {
  firebase
    .database()
    .ref("ulasans")
    .once("value")
    .then((snapshot) => {
      let ulasans = [];
      snapshot.forEach((item) => {
        ulasans.push({
          id: item.key,
          rating: item.val().rating,
          ulasan: item.val().ulasan,
          date: item.val().date,
        });
      });
      dispatch({
        type: actionType.SET_ULASANS_SUCCESS,
        payload: ulasans,
        totalUlasans: ulasans.length,
      });
      callback(ulasans);
    })
    .catch((err) => {
      dispatch({
        type: actionType.SET_ULASANS_ERROR,
        payload: err.message,
      });
    });
};

export const addUlasan = (rating, ulasan, date, callback) => async (dispatch) => {
  firebase
    .database()
    .ref("ulasans")
    .push({
      rating: rating,
      ulasan: ulasan,
      date: date,
    })
    .then((snapshot) => {
      dispatch({
        type: actionType.ADD_ULASAN_SUCCESS,
        payload: {
          id: snapshot.key,
          rating: rating,
          ulasan: ulasan,
          date: date,
        },
      });
      callback(snapshot.key);
    })
    .catch((err) => {
      dispatch({
        type: actionType.ADD_ULASAN_ERROR,
        payload: err.message,
      });
    });
};

export const deleteUlasan = (ulasanId, callback) => async (dispatch) => {
  firebase
    .database()
    .ref("ulasans/" + ulasanId)
    .remove()
    .then(() => {
      dispatch({
        type: actionType.DELETE_ULASAN_SUCCESS,
        payload: ulasanId,
      });
      callback();
    })
    .catch((err) => {
      dispatch({
        type: actionType.DELETE_ULASAN_ERROR,
        payload: err.message,
      });
    });
};

