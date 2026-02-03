// import axios from "axios";
// import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/conectionSlice";
import { Link } from "react-router-dom";
import { FiUsers } from "react-icons/fi";

/**
 * TODO: Backend Integration
 * 
 * GET /api/connections
 * Returns all connected users (candidates for recruiters, recruiters for seekers)
 * 
 * The connection object should contain:
 * - For Recruiters: Candidate info (firstName, lastName, currentCompany, position, etc.)
 * - For Seekers: Recruiter info (companyName, recruiterName, position, etc.)
 * 
 * Chat link navigates to /chat/:connectionId for messaging
 */

// Dummy connections data for Recruiters (Connected Candidates)
const dummyRecruiterConnections = [
  {
    _id: "conn1",
    firstName: "Rahul",
    lastName: "Sharma",
    currentCompany: "Infosys",
    position: "Senior Developer",
    photoUrl: "https://randomuser.me/api/portraits/men/32.jpg",
    about: "5+ years of experience in full-stack development. Passionate about building scalable applications."
  },
  {
    _id: "conn2",
    firstName: "Priya",
    lastName: "Patel",
    currentCompany: "TCS",
    position: "Tech Lead",
    photoUrl: "https://randomuser.me/api/portraits/women/44.jpg",
    about: "8 years in software development with expertise in cloud architecture."
  },
  {
    _id: "conn3",
    firstName: "Arjun",
    lastName: "Reddy",
    currentCompany: "Wipro",
    position: "Frontend Developer",
    photoUrl: "https://randomuser.me/api/portraits/men/67.jpg",
    about: "3 years of experience specializing in React ecosystem."
  }
];

// Dummy connections data for Job Seekers (Connected Recruiters/Companies)
const dummySeekerConnections = [
  {
    _id: "conn1",
    companyName: "Google",
    position: "Senior Frontend Developer",
    recruiterName: "Sarah Mitchell",
    photoUrl: "https://logo.clearbit.com/google.com",
    about: "Recruiter from Google's Cloud division. Hiring for multiple frontend roles."
  },
  {
    _id: "conn2",
    companyName: "Microsoft",
    position: "Full Stack Engineer",
    recruiterName: "John Anderson",
    photoUrl: "https://logo.clearbit.com/microsoft.com",
    about: "Technical Recruiter at Microsoft Azure team."
  },
  {
    _id: "conn3",
    companyName: "Amazon",
    position: "Backend Developer",
    recruiterName: "Emily Chen",
    photoUrl: "https://logo.clearbit.com/amazon.com",
    about: "Senior Recruiter at AWS. Looking for talented backend engineers."
  }
];

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  
  const isRecruiter = user?.role === "recruiter";
  
  const fetchConnections = async () => {
    // Using dummy data based on role
    const connectionsData = isRecruiter ? dummyRecruiterConnections : dummySeekerConnections;
    dispatch(addConnections(connectionsData));
    
    // Uncomment below to use real API
    // try {
    //   const res = await axios.get(BASE_URL + "/user/connections", {
    //     withCredentials: true,
    //   });
    //   dispatch(addConnections(res.data.data));
    // } catch (err) {
    //   console.error(err);
    // }
  };

  useEffect(() => {
    fetchConnections();
  }, [isRecruiter]); // Re-run if role changes

  if (!connections) return null;

  // No connections view
  if (connections.length === 0)
    return (
      <div className="flex justify-center items-center min-h-[80vh] px-4">
        <div className="jobble-card bg-white w-full max-w-md p-10 text-center">
          <div className="w-20 h-20 bg-jobble-bg rounded-lg border-2 border-jobble-navy-dark flex items-center justify-center mb-6 mx-auto text-jobble-navy-dark shadow-neobrutalism-sm">
            <FiUsers size={32} />
          </div>
          <h2 className="text-xl font-bold text-lokal-dark mb-2">No Connections Yet</h2>
          <p className="text-lokal-gray text-sm">
            {isRecruiter 
              ? "Candidates you connect with will appear here." 
              : "Companies you match with will appear here."}
          </p>
        </div>
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-black text-lokal-dark mb-8">Your Connections</h1>
      <div className="space-y-4">
        {connections.map((connection) => {
          const { _id, firstName, lastName, photoUrl, about, currentCompany, companyName, position, recruiterName } = connection;
          
          return (
            <div data-testid="connection-card" key={_id} className="jobble-card bg-white p-6 flex flex-col md:flex-row items-center gap-6 group hover:-translate-y-1 transition-transform">
              <div className="w-24 h-24 rounded-lg overflow-hidden border-2 border-jobble-navy-dark shadow-neobrutalism-sm flex-shrink-0">
                <img
                  alt={isRecruiter ? `${firstName} ${lastName}` : companyName}
                  src={photoUrl}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex-1 text-center md:text-left">
                {isRecruiter ? (
                  // Recruiter View of Candidate
                  <>
                    <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                      <h2 className="font-bold text-xl text-lokal-dark">
                        {firstName + " " + lastName}
                      </h2>
                      <span className="px-2 py-0.5 bg-jobble-bg border border-jobble-navy-dark rounded text-xs font-bold text-jobble-navy-dark">
                        {currentCompany}
                      </span>
                    </div>
                    <p className="text-jobble-red font-bold mb-2">{position}</p>
                  </>
                ) : (
                  // Seeker View of Recruiter/Company
                  <>
                    <h2 className="font-bold text-xl text-lokal-dark mb-1">
                      {companyName}
                    </h2>
                    <p className="text-jobble-red font-bold mb-1">{position}</p>
                    <p className="text-xs font-bold text-lokal-gray uppercase tracking-wider mb-2">
                       Recruiter: {recruiterName}
                    </p>
                  </>
                )}
                
                <p className="text-lokal-gray text-sm line-clamp-2">{about}</p>
              </div>
              
              <Link to={"/chat/" + _id}>
                <button className="btn-jobble px-6 py-2 rounded-lg text-sm whitespace-nowrap">
                  Chat Now
                </button>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Connections;
