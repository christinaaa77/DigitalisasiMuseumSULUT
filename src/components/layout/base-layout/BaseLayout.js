
import Footer from 'components/public/Footer';
import Navbar from '../navbar/Navbar';
import './base.css';

export default function Layout(props) {
  return (
    <div className="container-content">
    <Navbar/>
    <div className="content-section">
      {props.children}
    </div>
    <Footer/>
    </div>
  )
}