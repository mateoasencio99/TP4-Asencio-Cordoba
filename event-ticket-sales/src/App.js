import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Nav from "./nav/nav";
import Principal from "./principal/principal";
import Footer from "./footer/footer"


function App() {
  return (
    <div>
      <Nav />
      <Principal/>
      <Footer/>
    </div>
  );
}

export default App;
