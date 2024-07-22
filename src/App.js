import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { setLoading } from "actions/general";
import 'services/firebase';

import Loader from 'utils/loader';
import PrivateRoute from "components/hocs/private-route/PrivateRoute";
import AuthRoute from "components/hocs/auth-route/AuthRoute";
import Login from "components/auth/login/Login";
import SignUp from 'components/auth/sign-up/SignUp';
import Landing from "components/dashboard/landing/Landing";
import NotFound from "components/information/not-found/NotFound";
import ProductList from "components/product/product-list/ProductList";
import ProductAdd from "components/product/product-add/ProductAdd";
import ProductEdit from "components/product/product-edit/ProductEdit";
import ProductShow from "components/product/product-show/ProductShow";
import Home from 'components/public/Home/Home';
import wbtb from "components/public/WBTB/wbtb";
import Jenis from "components/public/JenisKoleksi/Jenis"; 
import KoleksiPreview from "components/public/JenisKoleksi/KoleksiPreview"; 
import About from 'components/public/about/about';
import Koleksi3D from 'components/public/Koleksi3D/Koleksi3D';
import Ulasan from 'components/public/Ulasan/ulasan';
import VisitCounter from 'components/count/count';
import MapComponent from 'components/public/Peta/PetaWaruga';
import WbtbList from 'components/public/Wbtb-Admin/wbtb-list/WbtbList';
import WbtbAdd from 'components/public/Wbtb-Admin/wbtb-add/WbtbAdd';
import WbtbEdit from 'components/public/Wbtb-Admin/wbtb-edit/WbtbEdit';
import WarisanBudayaTarian from 'components/public/WBTB/wbtb-tarian';
import WarisanBudayaMakanan from 'components/public/WBTB/wbtb-makanan';
import WarisanBudayaMusik from 'components/public/WBTB/wbtb-musik';
import WbtbShow from 'components/public/Wbtb-Admin/wbtb-show/WbtbShow';

class App extends React.Component {
  render() {
    const { auth, general } = this.props;

    return (
      <>
        {general.loading && <Loader />}
        <Router>
          {/* Menampilkan jumlah kunjungan di setiap halaman */}
          <VisitCounter />

          <Switch>
            <PrivateRoute exact path="/" component={Landing} authenticated={auth.authenticated} />
            <PrivateRoute exact path="/products" component={ProductList} authenticated={auth.authenticated} />
            <PrivateRoute exact path="/product/add" component={ProductAdd} authenticated={auth.authenticated} />
            <PrivateRoute exact path="/product/edit/:id" component={ProductEdit} authenticated={auth.authenticated} />
            <PrivateRoute exact path="/product/:id" component={ProductShow} authenticated={auth.authenticated} />
            <PrivateRoute exact path="/wbtbs" component={WbtbList} authenticated={auth.authenticated} />
            <PrivateRoute exact path="/wbtb/add" component={WbtbAdd} authenticated={auth.authenticated} />
            <PrivateRoute exact path="/wbtb/edit/:id" component={WbtbEdit} authenticated={auth.authenticated} />
            <PrivateRoute exact path="/wbtb/:id" component={WbtbShow} authenticated={auth.authenticated} />
            <AuthRoute exact path="/login" component={Login} authenticated={auth.authenticated} />
            <AuthRoute exact path="/tarian" component={WarisanBudayaTarian} authenticated={auth.authenticated} />
            <AuthRoute exact path="/makanan" component={WarisanBudayaMakanan} authenticated={auth.authenticated} />
            <AuthRoute exact path="/musik" component={WarisanBudayaMusik} authenticated={auth.authenticated} />
            <AuthRoute exact path="/sign-up" component={SignUp} authenticated={auth.authenticated} />
            <AuthRoute exact path="/home" component={Home} authenticated={auth.authenticated}/>
            <AuthRoute exact path="/koleksi" component={Jenis} authenticated={auth.authenticated}/>
            <AuthRoute exact path="/koleksi-3d" component={Koleksi3D} authenticated={auth.authenticated}/>
            <AuthRoute exact path="/ulasan" component={Ulasan} authenticated={auth.authenticated}/>
            <AuthRoute exact path="/wbtb" component={wbtb} authenticated={auth.authenticated}/>
            <AuthRoute exact path="/about" component={About} authenticated={auth.authenticated}/>
            <AuthRoute exact path="/peta" component={MapComponent} authenticated={auth.authenticated}/>
            <AuthRoute exact path="/koleksi-preview/:id" component={KoleksiPreview} authenticated={auth.authenticated} />
            <Route path="/" component={NotFound} />
          </Switch>
        </Router>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    general: state.general
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setLoading: (status) => dispatch(setLoading(status))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
