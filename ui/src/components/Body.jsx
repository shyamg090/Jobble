import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
// import axios from "axios";
// import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useEffect } from "react";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);

  const fetchUser = async () => {
    if (userData) return;
    // Redirect to login if no user data (using dummy data approach)
    navigate("/login");
    
    // Uncomment below to use real API
    // try {
    //   const res = await axios.get(BASE_URL + "/profile/view", {
    //     withCredentials: true,
    //   });
    //   dispatch(addUser(res.data));
    // } catch (err) {
    //   if (err.response?.status === 401 || err.code === 'ERR_NETWORK') {
    //     navigate("/login");
    //   }
    //   console.error(err);
    // }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-lokal-light">
      <NavBar />
      <div className="flex-grow flex justify-center pt-20 pb-10 px-4">
         <Outlet />
      </div>
      <Footer />
    </div>
  );
};
export default Body;
