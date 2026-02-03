// import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
// import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";
import { clearFeed } from "../utils/feedSlice";

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    // Using dummy approach - just clear user and redirect
    dispatch(removeUser());
    dispatch(clearFeed());
    return navigate("/login");
    
    // Uncomment below to use real API
    // try {
    //   await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
    //   dispatch(removeUser());
    //   dispatch(clearFeed());
    //   return navigate("/login");
    // } catch (err) {
    //   console.log(err);
    // }
  };

  const handleLogoClick = () => {
    // Refresh the feed when clicking logo
    dispatch(clearFeed());
  };

  const isRecruiter = user?.role === "recruiter";

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-2 md:pt-4">
      <div className="navbar bg-white w-[95%] md:w-[85%] lg:w-[70%] px-4 md:px-6 h-14 md:h-16 items-center justify-between rounded-xl shadow-neobrutalism border-2 border-jobble-navy-dark">
        <div className="flex-1">
        <Link to="/" onClick={handleLogoClick} className="btn btn-ghost text-xl md:text-2xl font-black tracking-tight hover:bg-transparent pl-0 group">
          <span className="text-lokal-dark">Job</span>
          <span className="text-jobble-red">ble</span>
        </Link>
      </div>
      {user && (
        <div className="flex-none gap-4 items-center">
          <div className="hidden md:flex items-center gap-2 text-lokal-gray font-medium">
            {isRecruiter ? (
              <>
                <Link to="/my-jobs" className="btn btn-ghost btn-sm text-jobble-navy-dark hover:text-jobble-red hover:bg-transparent">My Jobs</Link>
                <span className="px-2 py-1 bg-lokal-purple text-white text-xs rounded-full">Recruiter</span>
              </>
            ) : (
              <span className="px-2 py-1 bg-jobble-red text-white text-xs rounded-full">Job Seeker</span>
            )}
            <span>Welcome, <span className="text-lokal-dark font-semibold">{user.firstName || 'User'}</span></span>
          </div>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar ring-2 ring-jobble-red/30 hover:ring-jobble-red hover:scale-105 transition-all duration-200"
            >
              <div className="w-10 rounded-full border-2 border-jobble-navy-dark">
                <img alt="user photo" src={user.photoUrl} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-white text-lokal-dark rounded-xl z-[1] mt-3 w-52 p-2 shadow-neobrutalism border-2 border-jobble-navy-dark"
            >
              <li>
                <Link to="/profile" className="justify-between rounded-lg font-semibold hover:bg-jobble-bg hover:text-jobble-navy-dark">
                  Profile
                  <span className="badge bg-jobble-red text-white border-2 border-jobble-navy-dark text-xs font-bold">New</span>
                </Link>
              </li>
              <li>
                <Link to="/connections" className="rounded-lg font-semibold hover:bg-jobble-bg hover:text-jobble-navy-dark">Connections</Link>
              </li>

              <li>
                <Link to="/requests" className="rounded-lg font-semibold hover:bg-jobble-bg hover:text-jobble-navy-dark">
                  {isRecruiter ? "Applications" : "Connection Requests"}
                </Link>
              </li>
              {isRecruiter && (
                <li>
                  <Link to="/premium" className="rounded-lg font-semibold hover:bg-jobble-bg hover:text-jobble-navy-dark">Premium</Link>
                </li>
              )}
              {!isRecruiter && (
                <li>
                  <span className="rounded-lg font-semibold hover:bg-transparent cursor-not-allowed opacity-50">
                    Resume Review <span className="text-xs text-jobble-red font-bold">(Soon)</span>
                  </span>
                </li>
              )}
              <li className="border-t border-gray-100 mt-1 pt-1">
                <a onClick={handleLogout} className="rounded-xl hover:bg-red-50 text-red-500">Logout</a>
              </li>
            </ul>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};
export default NavBar;
