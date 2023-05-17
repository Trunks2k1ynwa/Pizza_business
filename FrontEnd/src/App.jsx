import { memo } from "react";
import Routes from "./routes/Routes.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const App = () => {
  return (
    <div>
      <Routes />
      <ToastContainer></ToastContainer>
    </div>
  );
};
export default memo(App);
