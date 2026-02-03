import { useDispatch } from "react-redux";
import { setUserRole } from "../utils/userSlice";
import { clearFeed } from "../utils/feedSlice";
import { useNavigate } from "react-router-dom";
import { FiBriefcase, FiUserCheck, FiCheckCircle } from "react-icons/fi";

/**
 * TODO: Backend Integration
 * 
 * PATCH /api/user/role - Save user role to database
 *   { role: 'recruiter' | 'seeker' }
 * 
 * After role is saved, redirect to /profile for profile setup
 */

const RoleSelection = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRoleSelect = (role) => {
    dispatch(setUserRole(role));
    dispatch(clearFeed()); // Clear feed so it reloads with correct data for the role
    navigate("/profile");
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <div className="jobble-card bg-white w-full max-w-2xl p-8 md:p-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-black text-lokal-dark mb-3">
            Welcome to <span className="text-jobble-red">Jobble</span>
          </h1>
          <p className="text-lokal-gray text-lg">
            Swipe your way to your dream opportunity
          </p>
        </div>

        <h2 className="text-xl font-bold text-lokal-dark text-center mb-8">
          Who are you?
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Recruiter/HR Card */}
          <div
            className="jobble-card p-6 cursor-pointer group hover:border-jobble-red transition-all bg-white hover:-translate-y-1"
            onClick={() => handleRoleSelect("recruiter")}
          >
            <div className="text-center">
              <div className="w-20 h-20 bg-lokal-light rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-jobble-red/10 transition-all text-jobble-navy-dark">
                <FiUserCheck size={34} />
              </div>
              <h3 className="text-xl font-bold text-lokal-dark mb-2">I'm a Recruiter</h3>
              <p className="text-lokal-gray text-sm">
                Find and connect with talented candidates for your open positions
              </p>
              <ul className="text-left mt-4 space-y-2 text-sm text-lokal-gray">
                <li className="flex items-center gap-2">
                  <FiCheckCircle className="text-jobble-red" /> Post job openings
                </li>
                <li className="flex items-center gap-2">
                  <FiCheckCircle className="text-jobble-red" /> Browse candidate profiles
                </li>
                <li className="flex items-center gap-2">
                  <FiCheckCircle className="text-jobble-red" /> Send connection requests
                </li>
              </ul>
            </div>
          </div>

          {/* Job Seeker Card */}
          <div
             className="jobble-card p-6 cursor-pointer group hover:border-jobble-red transition-all bg-white hover:-translate-y-1"
            onClick={() => handleRoleSelect("seeker")}
          >
            <div className="text-center">
              <div className="w-20 h-20 bg-lokal-light rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-jobble-red/10 transition-all text-jobble-navy-dark">
                <FiBriefcase size={34} />
              </div>
              <h3 className="text-xl font-bold text-lokal-dark mb-2">I'm a Job Seeker</h3>
              <p className="text-lokal-gray text-sm">
                Discover exciting job opportunities that match your skills
              </p>
              <ul className="text-left mt-4 space-y-2 text-sm text-lokal-gray">
                <li className="flex items-center gap-2">
                  <FiCheckCircle className="text-jobble-red" /> Browse job listings
                </li>
                <li className="flex items-center gap-2">
                  <FiCheckCircle className="text-jobble-red" /> Swipe on opportunities
                </li>
                <li className="flex items-center gap-2">
                  <FiCheckCircle className="text-jobble-red" /> Get noticed by recruiters
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;
