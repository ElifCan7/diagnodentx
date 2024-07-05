import "./App.css";
import Router from "./routers/router";
function App() {
  return (
    <>
      <div className="container ">
        <div className="textorange row row-cols-lg-7 row-cols-md-7 row-cols-sm-3  row-cols-2 justify-content-center text-center">
          <div className=" col-lg-1">
            {/* <NavLink to="/">login</NavLink> */}
          </div>
          {/* <div className=" col-lg-1">
            <NavLink to="/login">login</NavLink>
          </div> */}
        </div>
      </div>

      <Router />
    </>
  );
}

export default App;
