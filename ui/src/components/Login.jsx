import { useState } from "react";
// import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import loginBg from "../images/login-bg.png"; // Import login background image
// import { BASE_URL } from "../utils/constants";

/**
 * TODO: Backend Integration
 * 
 * POST /api/auth/signup - Create new account
 *   { email, password, firstName, lastName }
 *   Response: User object + JWT token in cookie
 * 
 * POST /api/auth/login - Login existing user
 *   { email, password }
 *   Response: User object + JWT token in cookie
 * 
 * After login, check if user has role:
 *   - If role exists: redirect to /
 *   - If no role: redirect to /select-role
 */

// Dummy user data
const dummyUser = {
  _id: "user123",
  firstName: "",
  lastName: "",
  emailId: "demo@example.com",
  photoUrl: "https://randomuser.me/api/portraits/men/10.jpg",
  about: ""
};

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    // Using dummy data for now - Simulate existing user without role
    // New users should go through role selection
    // For testing: change role to "seeker" or "recruiter" to skip role selection
    const loggedInUser = { ...dummyUser, emailId, role: null }; 
    dispatch(addUser(loggedInUser));

    if (loggedInUser.role) {
      return navigate("/");
    } else {
      return navigate("/select-role");
    }
    
    // Uncomment below to use real API
    // try {
    //   const res = await axios.post(
    //     BASE_URL + "/login",
    //     {
    //       emailId,
    //       password,
    //     },
    //     { withCredentials: true }
    //   );
    //   dispatch(addUser(res.data));
    //   if (res.data.role) return navigate("/");
    //   return navigate("/select-role");
    // } catch (err) {
    //   setError(err?.response?.data || "Something went wrong");
    // }
  };

  const handleSignUp = async () => {
    // Using dummy data for now - redirect to role selection
    // New users don't have a role yet
    const newUser = {
      ...dummyUser,
      firstName,
      lastName,
      emailId,
      role: null 
    };
    dispatch(addUser(newUser));
    return navigate("/select-role");
    
    // Uncomment below to use real API
    // try {
    //   const res = await axios.post(
    //     BASE_URL + "/signup",
    //     { firstName, lastName, emailId, password },
    //     { withCredentials: true }
    //   );
    //   dispatch(addUser(res.data.data));
    //   return navigate("/select-role");
    // } catch (err) {
    //   setError(err?.response?.data || "Something went wrong");
    // }
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4 relative">
       {/* Background Image Overlay */}
       {/* <div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ 
          backgroundImage: `url(${loginBg})`,
          opacity: 0.2 // Adjust opacity as needed
        }}
      /> */}
      <div className="jobble-card bg-white w-full max-w-md p-6 md:p-8 relative z-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-black mb-4">
            <span className="text-lokal-dark">Job</span>
            <span className="text-jobble-red">ble</span>
          </h1>
          <h2 className="text-xl md:text-2xl font-bold text-lokal-dark mb-2">
            {isLoginForm ? "Welcome Back" : "Get Started"}
          </h2>
          <p className="text-lokal-gray">
             {isLoginForm ? "Sign in to find your next opportunity" : "Create your account to get started"}
          </p>
        </div>

        <div className="space-y-4">
          {!isLoginForm && (
            <div className="flex gap-3">
              <div className="form-control w-full">
                <input
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  className="input input-bordered w-full bg-lokal-light border-gray-200 text-lokal-dark rounded-xl focus:border-jobble-red focus:ring-2 focus:ring-jobble-red/20 transition-all h-12"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="form-control w-full">
                <input
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  className="input input-bordered w-full bg-lokal-light border-gray-200 text-lokal-dark rounded-xl focus:border-jobble-red focus:ring-2 focus:ring-jobble-red/20 transition-all h-12"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>
          )}
          
          <div className="form-control w-full">
            <input
              type="text"
              placeholder="Email"
              value={emailId}
              className="input input-bordered w-full bg-lokal-light border-gray-200 text-lokal-dark rounded-xl focus:border-jobble-red focus:ring-2 focus:ring-jobble-red/20 transition-all h-12"
              onChange={(e) => setEmailId(e.target.value)}
            />
          </div>
          
          <div className="form-control w-full">
            <input
              type="password"
              placeholder="Password"
              value={password}
              className="input input-bordered w-full bg-lokal-light border-gray-200 text-lokal-dark rounded-xl focus:border-jobble-red focus:ring-2 focus:ring-jobble-red/20 transition-all h-12"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        {error && <p className="text-red-500 text-sm mt-3 text-center font-bold px-4 py-2 bg-red-50 rounded-lg border border-red-100">{error}</p>}
        
        <div className="mt-6">
          <button
            className="btn-jobble w-full rounded-xl h-12 text-base"
            onClick={isLoginForm ? handleLogin : handleSignUp}
          >
            {isLoginForm ? "Sign In" : "Create Account"}
          </button>
        </div>

        <p
          className="text-center mt-6 text-lokal-gray cursor-pointer hover:text-jobble-red transition-colors font-medium text-sm"
          onClick={() => setIsLoginForm((value) => !value)}
        >
          {isLoginForm
            ? "Don't have an account? Sign up"
            : "Already have an account? Sign in"}
        </p>
      </div>
    </div>
  );
};
export default Login;
