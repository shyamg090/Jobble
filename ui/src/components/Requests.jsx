// import axios from "axios";
// import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";
import { useEffect } from "react";
import { FiInbox } from "react-icons/fi";

/**
 * TODO: Backend Integration
 * 
 * This page shows different content based on role:
 * 
 * For JOB SEEKERS (Connection Requests from Recruiters):
 *   GET /api/connections/requests
 *   Returns: Connection requests sent BY recruiters TO the seeker
 *   Accept: PATCH /api/connections/request/:id { status: 'accepted' }
 *     -> Creates a connection, both can now chat
 *   Reject: PATCH /api/connections/request/:id { status: 'rejected' }
 *     -> Removes the request
 * 
 * For RECRUITERS (Applications - Candidates who showed interest):
 *   GET /api/applications
 *   Returns: Candidates who swiped "INTERESTED" on recruiter's job posting
 *   Accept: PATCH /api/applications/:id { status: 'accepted' }
 *     -> This sends a connection request TO the candidate
 *     -> The candidate then sees it in their Connection Requests
 *   Reject: PATCH /api/applications/:id { status: 'rejected' }
 *     -> Removes the application
 * 
 * FLOW SUMMARY:
 * 1. Job Seeker swipes INTERESTED on job -> Recruiter sees it in "Applications"
 * 2. Recruiter accepts application -> Sends connection request to seeker
 * 3. Job Seeker sees request in "Connection Requests" -> Accepts
 * 4. Both are now connected and can chat
 */

// Dummy request data for Job Seekers (receiving connection requests from recruiters)
const dummySeekerRequests = [
  {
    _id: "req1",
    fromUserId: {
      _id: "rec1",
      companyName: "Atlassian",
      position: "Senior React Developer",
      recruiterName: "Michael Brown",
      photoUrl: "https://logo.clearbit.com/atlassian.com",
      about: "Looking for talented React developers to join our Jira team."
    }
  },
  {
    _id: "req2",
    fromUserId: {
      _id: "rec2",
      companyName: "Stripe",
      position: "Full Stack Engineer",
      recruiterName: "Amanda Wilson",
      photoUrl: "https://logo.clearbit.com/stripe.com",
      about: "Hiring engineers to build the future of online payments."
    }
  },
  {
    _id: "req3",
    fromUserId: {
      _id: "rec3",
      companyName: "Notion",
      position: "Frontend Engineer",
      recruiterName: "David Kim",
      photoUrl: "https://logo.clearbit.com/notion.so",
      about: "Join us to build productivity tools used by millions."
    }
  }
];

// Dummy request data for Recruiters (applications from candidates who swiped right)
const dummyRecruiterRequests = [
  {
    _id: "req1",
    fromUserId: {
      _id: "cand1",
      firstName: "Aditya",
      lastName: "Kumar",
      currentCompany: "Accenture",
      position: "Software Engineer",
      noticePeriod: "30 days",
      photoUrl: "https://randomuser.me/api/portraits/men/55.jpg",
      about: "4 years of experience in Java and Spring Boot development."
    }
  },
  {
    _id: "req2",
    fromUserId: {
      _id: "cand2",
      firstName: "Neha",
      lastName: "Gupta",
      currentCompany: "Cognizant",
      position: "Frontend Developer",
      noticePeriod: "45 days",
      photoUrl: "https://randomuser.me/api/portraits/women/55.jpg",
      about: "3 years specializing in React and TypeScript."
    }
  },
  {
    _id: "req3",
    fromUserId: {
      _id: "cand3",
      firstName: "Karthik",
      lastName: "Rajan",
      currentCompany: "Tech Mahindra",
      position: "DevOps Engineer",
      noticePeriod: "Immediate",
      photoUrl: "https://randomuser.me/api/portraits/men/56.jpg",
      about: "5 years in cloud infrastructure and automation."
    }
  }
];

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  
  const isRecruiter = user?.role === "recruiter";

  const reviewRequest = async (status, _id) => {
    // Using dummy approach - just remove from list
    dispatch(removeRequest(_id));
    
    // Uncomment below to use real API
    // try {
    //   const res = axios.post(
    //     BASE_URL + "/request/review/" + status + "/" + _id,
    //     {},
    //     { withCredentials: true }
    //   );
    //   dispatch(removeRequest(_id));
    // } catch (err) {}
  };

  const fetchRequests = async () => {
    // Using dummy data based on role
    const requestsData = isRecruiter ? dummyRecruiterRequests : dummySeekerRequests;
    dispatch(addRequests(requestsData));
    
    // Uncomment below to use real API
    // try {
    //   const res = await axios.get(BASE_URL + "/user/requests/received", {
    //     withCredentials: true,
    //   });
    //   dispatch(addRequests(res.data.data));
    // } catch (err) {}
  };

  useEffect(() => {
    fetchRequests();
  }, [isRecruiter]);

  if (!requests) return null;

  if (requests.length === 0)
    return (
      <div className="flex flex-col justify-center items-center min-h-[50vh] text-center">
        <div className="w-20 h-20 bg-white border-2 border-jobble-navy-dark shadow-neobrutalism rounded-full flex items-center justify-center mb-4 text-jobble-navy-dark">
          <FiInbox size={32} strokeWidth={2.5} />
        </div>
        <h2 className="text-xl font-bold text-jobble-navy-dark mb-2">
          {isRecruiter ? "No Applications Yet" : "No Connection Requests"}
        </h2>
        <p className="text-gray-600 font-medium">
          {isRecruiter 
            ? "Candidates who are interested will appear here!" 
            : "Recruiters who want to connect will appear here!"}
        </p>
      </div>
    );

  return (
    <div className="text-center my-10 w-full max-w-3xl px-4 mx-auto">
      <h1 className="text-3xl font-black text-jobble-navy-dark mb-8 uppercase tracking-tight">
        {isRecruiter ? "Candidate Applications" : "Connection Requests"}
      </h1>

      <div className="flex flex-col gap-5">
        {requests.map((request) => {
          const { _id, firstName, lastName, photoUrl, about, currentCompany, position, noticePeriod, companyName, recruiterName } =
            request.fromUserId;

          return (
            <div
              key={request._id}
              className="jobble-card border-2 border-jobble-navy-dark shadow-neobrutalism flex flex-col md:flex-row justify-between md:items-center p-4 md:p-6 w-full bg-white rounded-xl"
            >
              <div className="flex items-center w-full md:w-auto mb-4 md:mb-0 gap-4">
                <img
                  alt="photo"
                  className="w-16 h-16 rounded-xl object-cover border-2 border-jobble-navy-dark shadow-sm"
                  src={photoUrl}
                />
                
                <div className="text-left flex-grow">
                  <h2 className="font-bold text-lg text-jobble-navy-dark leading-tight">
                    {isRecruiter ? `${firstName} ${lastName}` : companyName}
                  </h2>
                  <p className="text-sm text-jobble-red font-bold uppercase mt-0.5">
                    {isRecruiter 
                      ? `${position} at ${currentCompany}` 
                      : position}
                  </p>
                  {isRecruiter && noticePeriod && (
                    <p className="text-xs text-jobble-navy font-bold mt-1 bg-jobble-bg inline-block px-2 py-0.5 rounded border border-jobble-navy-dark">
                      Notice: {noticePeriod}
                    </p>
                  )}
                  {!isRecruiter && recruiterName && (
                    <p className="text-xs text-gray-600 font-bold mt-1">
                      From: {recruiterName}
                    </p>
                  )}
                  <p className="text-gray-600 font-medium mt-1 text-sm line-clamp-1 md:max-w-xs">{about}</p>
                </div>
              </div>
              
              <div className="flex gap-3 justify-end md:justify-start w-full md:w-auto">
                <button
                  className="btn btn-square btn-sm md:btn-md bg-white text-jobble-navy-dark border-2 border-jobble-navy-dark rounded-lg hover:bg-red-50 hover:text-red-600 hover:border-red-600 transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none translate-x-0 hover:translate-x-[2px] hover:translate-y-[2px]"
                  onClick={() => reviewRequest("rejected", request._id)}
                  title="Decline"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
                <button
                  className="btn btn-square btn-sm md:btn-md bg-jobble-green text-white border-2 border-jobble-navy-dark rounded-lg hover:bg-green-500 transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none translate-x-0 hover:translate-x-[2px] hover:translate-y-[2px]"
                  onClick={() => reviewRequest("accepted", request._id)}
                  title="Accept"
                >
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" /></svg>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Requests;
