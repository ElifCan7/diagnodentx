import { useRoutes } from "react-router-dom";
import Admin from "../views/Admin";
import DoctorForm from "../views/DoctorForm"; // Doktor formu bileşeni
import EnterancePage from "../views/EnterancePage";
import LoadXRay from "../views/LoadXRay"; // Hasta formu bileşeni
import Login from "../views/Login";
import MainPage from "../views/MainPage";
import PatientForm from "../views/PatientForm"; // Hasta formu bileşeni
import Profile from "../views/Profile";
const LoginWrapper = ({ mode }) => {
  return <Login mode={mode} />;
};

const Router = () => {
  const routes = useRoutes([
    { path: "/", element: <EnterancePage /> },
    { path: "/login", element: <LoginWrapper /> },
    { path: "/mainPage", element: <MainPage /> },
    { path: "/patient", element: <PatientForm /> },
    { path: "/doctor", element: <DoctorForm /> },
    { path: "/loadXRay", element: <LoadXRay /> },
    { path: "/profile", element: <Profile /> },
    { path: "/admin", element: <Admin /> },
  ]);

  return routes;
};

export default Router;
