import { useState } from "react";
// import axios from "axios";
// import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";

/**
 * TODO: Backend Integration
 * 
 * GET /api/profile - Load user profile data
 * PATCH /api/profile - Save profile updates
 * 
 * For Job Seekers:
 *   { firstName, lastName, photoUrl, about, currentCompany, position, 
 *     noticePeriod, salaryExpectation, skills[] }
 * 
 * For Recruiters:
 *   { firstName, lastName, companyName, companyLogo, about, jobPosition,
 *     location, experience, salaryRange, requiredSkills[] }
 * 
 * POST /api/profile/resume - Upload resume (Job Seekers only)
 */

const EditProfile = ({ user }) => {
  const navigate = useNavigate();
  const currentUser = useSelector((store) => store.user);
  const isRecruiter = currentUser?.role === "recruiter";
  
  // Common fields
  const [firstName, setFirstName] = useState(user.firstName || "");
  const [lastName, setLastName] = useState(user.lastName || "");
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl || "");
  const [about, setAbout] = useState(user.about || "");
  
  // Job Seeker specific fields
  const [currentCompany, setCurrentCompany] = useState(user.currentCompany || "");
  const [position, setPosition] = useState(user.position || "");
  const [noticePeriod, setNoticePeriod] = useState(user.noticePeriod || "");
  const [salaryExpectation, setSalaryExpectation] = useState(user.salaryExpectation || "");
  const [skills, setSkills] = useState(user.skills?.join(", ") || "");

  // Recruiter specific fields (Company Profile)
  const [companyName, setCompanyName] = useState(user.companyName || "");
  const [companyLogo, setCompanyLogo] = useState(user.companyLogo || "");
  const [location, setLocation] = useState(user.location || "");
  
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);

  const saveProfile = async () => {
    setError("");

    let updatedUser;
    
    if (isRecruiter) {
      updatedUser = {
        ...user,
        firstName,
        lastName,
        photoUrl,
        about,
        companyName,
        companyLogo,
        location,
        // Removed job specific fields from profile
        // jobPosition,
        // salaryRange,
        // experience,
        // requiredSkills: requiredSkills.split(",").map(s => s.trim()).filter(s => s),
      };
    } else {
      updatedUser = {
        ...user,
        firstName,
        lastName,
        photoUrl,
        about,
        currentCompany,
        position,
        noticePeriod,
        salaryExpectation,
        skills: skills.split(",").map(s => s.trim()).filter(s => s).slice(0, 8),
      };
    }
    
    dispatch(addUser(updatedUser));
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      navigate("/"); // Go to feed after saving
    }, 1500);
  };


  // Job Seeker Profile Form
  const renderSeekerForm = () => (
    <div className="space-y-4">
      <div className="flex gap-3">
        <label className="form-control w-full">
          <div className="label pb-1">
            <span className="label-text font-semibold text-lokal-dark">First Name</span>
          </div>
          <input
            type="text"
            value={firstName}
            placeholder="John"
            className="input input-bordered w-full rounded-xl bg-lokal-light border-gray-200 focus:border-jobble-red focus:ring-2 focus:ring-jobble-red/20 text-lokal-dark"
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>
        <label className="form-control w-full">
          <div className="label pb-1">
            <span className="label-text font-semibold text-lokal-dark">Last Name</span>
          </div>
          <input
            type="text"
            value={lastName}
            placeholder="Doe"
            className="input input-bordered w-full rounded-xl bg-lokal-light border-gray-200 focus:border-jobble-red focus:ring-2 focus:ring-jobble-red/20 text-lokal-dark"
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>
      </div>
      
      <label className="form-control w-full">
        <div className="label pb-1">
          <span className="label-text font-semibold text-lokal-dark">Photo URL</span>
        </div>
        <input
          type="text"
          value={photoUrl}
          placeholder="https://example.com/photo.jpg"
          className="input input-bordered w-full rounded-xl bg-lokal-light border-gray-200 focus:border-jobble-red focus:ring-2 focus:ring-jobble-red/20 text-lokal-dark"
          onChange={(e) => setPhotoUrl(e.target.value)}
        />
      </label>
      
      <div className="flex gap-3">
        <label className="form-control w-full">
          <div className="label pb-1">
            <span className="label-text font-semibold text-lokal-dark">Current Company</span>
          </div>
          <input
            type="text"
            value={currentCompany}
            placeholder="Google"
            className="input input-bordered w-full rounded-xl bg-lokal-light border-gray-200 focus:border-jobble-red focus:ring-2 focus:ring-jobble-red/20 text-lokal-dark"
            onChange={(e) => setCurrentCompany(e.target.value)}
          />
        </label>
        <label className="form-control w-full">
          <div className="label pb-1">
            <span className="label-text font-semibold text-lokal-dark">Position</span>
          </div>
          <input
            type="text"
            value={position}
            placeholder="Senior Developer"
            className="input input-bordered w-full rounded-xl bg-lokal-light border-gray-200 focus:border-jobble-red focus:ring-2 focus:ring-jobble-red/20 text-lokal-dark"
            onChange={(e) => setPosition(e.target.value)}
          />
        </label>
      </div>
      
      <div className="flex gap-3">
        <label className="form-control w-full">
          <div className="label pb-1">
            <span className="label-text font-semibold text-lokal-dark">Notice Period</span>
          </div>
          <select
            value={noticePeriod}
            className="select select-bordered w-full rounded-xl bg-lokal-light border-gray-200 focus:border-jobble-red text-lokal-dark"
            onChange={(e) => setNoticePeriod(e.target.value)}
          >
            <option value="">Select...</option>
            <option value="Immediate">Immediate</option>
            <option value="15 days">15 days</option>
            <option value="30 days">30 days</option>
            <option value="45 days">45 days</option>
            <option value="60 days">60 days</option>
            <option value="90 days">90 days</option>
          </select>
        </label>
        <label className="form-control w-full">
          <div className="label pb-1">
            <span className="label-text font-semibold text-lokal-dark">Expected Salary</span>
          </div>
          <input
            type="text"
            value={salaryExpectation}
            placeholder="₹15-20 LPA"
            className="input input-bordered w-full rounded-xl bg-lokal-light border-gray-200 focus:border-jobble-red focus:ring-2 focus:ring-jobble-red/20 text-lokal-dark"
            onChange={(e) => setSalaryExpectation(e.target.value)}
          />
        </label>
      </div>
      
      <label className="form-control w-full">
        <div className="label pb-1">
          <span className="label-text font-semibold text-lokal-dark">Skills (up to 8, comma separated)</span>
        </div>
        <input
          type="text"
          value={skills}
          placeholder="React, Node.js, TypeScript, MongoDB"
          className="input input-bordered w-full rounded-xl bg-lokal-light border-gray-200 focus:border-jobble-red focus:ring-2 focus:ring-jobble-red/20 text-lokal-dark"
          onChange={(e) => setSkills(e.target.value)}
        />
      </label>
      
      <label className="form-control w-full">
        <div className="label pb-1">
          <span className="label-text font-semibold text-lokal-dark">About You</span>
        </div>
        <textarea
          value={about}
          placeholder="Tell recruiters about your experience and what you're looking for..."
          className="textarea textarea-bordered w-full rounded-xl bg-lokal-light border-gray-200 focus:border-jobble-red focus:ring-2 focus:ring-jobble-red/20 text-lokal-dark min-h-[100px]"
          onChange={(e) => setAbout(e.target.value)}
          rows="3"
        />
      </label>
    </div>
  );

  // Recruiter Profile Form
  const renderRecruiterForm = () => (
    <div className="space-y-4">
      <div className="flex gap-3">
        <label className="form-control w-full">
          <div className="label pb-1">
            <span className="label-text font-semibold text-lokal-dark">Your Name</span>
          </div>
          <input
            type="text"
            value={firstName}
            placeholder="Sarah"
            className="input input-bordered w-full rounded-xl bg-lokal-light border-gray-200 focus:border-jobble-red focus:ring-2 focus:ring-jobble-red/20 text-lokal-dark"
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>
        <label className="form-control w-full">
          <div className="label pb-1">
            <span className="label-text font-semibold text-lokal-dark">Last Name</span>
          </div>
          <input
            type="text"
            value={lastName}
            placeholder="Mitchell"
            className="input input-bordered w-full rounded-xl bg-lokal-light border-gray-200 focus:border-jobble-red focus:ring-2 focus:ring-jobble-red/20 text-lokal-dark"
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>
      </div>
      
      <label className="form-control w-full">
        <div className="label pb-1">
          <span className="label-text font-semibold text-lokal-dark">Company Name</span>
        </div>
        <input
          type="text"
          value={companyName}
          placeholder="Google"
          className="input input-bordered w-full rounded-xl bg-lokal-light border-gray-200 focus:border-jobble-red focus:ring-2 focus:ring-jobble-red/20 text-lokal-dark"
          onChange={(e) => setCompanyName(e.target.value)}
        />
      </label>
      
      <label className="form-control w-full">
        <div className="label pb-1">
          <span className="label-text font-semibold text-lokal-dark">Company Logo URL</span>
        </div>
        <input
          type="text"
          value={companyLogo}
          placeholder="https://logo.clearbit.com/google.com"
          className="input input-bordered w-full rounded-xl bg-lokal-light border-gray-200 focus:border-jobble-red focus:ring-2 focus:ring-jobble-red/20 text-lokal-dark"
          onChange={(e) => setCompanyLogo(e.target.value)}
        />
      </label>
      
      <label className="form-control w-full">
        <div className="label pb-1">
          <span className="label-text font-semibold text-lokal-dark">Location (HQ)</span>
        </div>
        <input
          type="text"
          value={location}
          placeholder="Bangalore, India"
          className="input input-bordered w-full rounded-xl bg-lokal-light border-gray-200 focus:border-jobble-red focus:ring-2 focus:ring-jobble-red/20 text-lokal-dark"
          onChange={(e) => setLocation(e.target.value)}
        />
      </label>
      
      <label className="form-control w-full">
        <div className="label pb-1">
          <span className="label-text font-semibold text-lokal-dark">About Company</span>
        </div>
        <textarea
          value={about}
          placeholder="Describe your company culture and values..."
          className="textarea textarea-bordered w-full rounded-xl bg-lokal-light border-gray-200 focus:border-jobble-red focus:ring-2 focus:ring-jobble-red/20 text-lokal-dark min-h-[100px]"
          onChange={(e) => setAbout(e.target.value)}
          rows="3"
        />
      </label>
    </div>
  );

  // Preview card data for job seeker
  const seekerPreviewData = {
    _id: "preview",
    type: "candidate",
    firstName,
    lastName,
    photoUrl,
    about,
    currentCompany,
    position,
    noticePeriod,
    salaryExpectation,
    skills: skills.split(",").map(s => s.trim()).filter(s => s).slice(0, 8),
  };

  // Preview card data for recruiter (job posting template)
  const recruiterPreviewData = {
    _id: "preview",
    type: "job",
    companyName,
    position: "Job Position",
    location,
    salary: "Salary Range",
    experience: "Experience",
    photoUrl: companyLogo || photoUrl,
    about: about || "Company description will appear here...",
    skills: ["Skill 1", "Skill 2"],
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row justify-center my-10 gap-6 px-4">
        <div className="flex justify-center w-full lg:w-auto">
          <div className="jobble-card bg-white w-full max-w-md lg:w-[420px] p-6">
            <h2 className="text-2xl font-bold text-lokal-dark mb-2 text-center">
              {isRecruiter ? "Company & Job Details" : "Your Profile"}
            </h2>
            <p className="text-lokal-gray text-sm text-center mb-6">
              {isRecruiter 
                ? "Add your company details and job posting" 
                : "Complete your profile to get noticed by recruiters"}
            </p>
            
            {isRecruiter ? renderRecruiterForm() : renderSeekerForm()}
            
            {error && <p className="text-red-500 text-sm mt-3 text-center">{error}</p>}
            <div className="mt-6">
              <button className="btn-jobble w-full rounded-xl h-12" onClick={saveProfile}>
                Save {isRecruiter ? "Job Posting" : "Profile"}
              </button>
            </div>
          </div>
        </div>
        
        <div className="w-full lg:w-auto flex flex-col items-center">
          <h3 className="text-lg font-bold text-lokal-dark mb-4">
            {isRecruiter ? "Job Card Preview" : "Profile Card Preview"}
          </h3>
          <div className="transform scale-90 origin-top">
            {/* Custom preview since UserCard expects specific props */}
            <div className="jobble-card border-[3px] border-jobble-navy-dark w-80 h-[500px] overflow-hidden rounded-2xl relative">
              <div className="relative w-full h-full">
                <img
                  src={isRecruiter ? (companyLogo || photoUrl || "https://via.placeholder.com/400") : (photoUrl || "https://via.placeholder.com/400")}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  {isRecruiter ? (
                    <>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-1 bg-white/20 text-white text-xs font-semibold rounded-full">
                          {location || "Location"}
                        </span>
                      </div>
                      <h2 className="text-2xl font-bold text-white mb-1">{companyName || "Company Name"}</h2>
                      <p className="text-sm text-white/80 line-clamp-2">{about || "Company description will appear here..."}</p>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-1 bg-lokal-purple text-white text-xs font-bold rounded-full">
                          {noticePeriod || "Notice Period"}
                        </span>
                        <span className="px-2 py-1 bg-white/20 text-white text-xs font-semibold rounded-full">
                          {currentCompany || "Company"}
                        </span>
                      </div>
                      <h2 className="text-2xl font-bold text-white">{firstName || "First"} {lastName || "Last"}</h2>
                      <p className="text-lg text-white/90 font-semibold">{position || "Position"}</p>
                      <p className="text-md text-jobble-red font-bold mt-1">Expects: {salaryExpectation || "Salary"}</p>
                    </>
                  )}
                  
                  {about && (
                    <p className="text-white/80 text-sm leading-relaxed line-clamp-2 mt-3">
                      {about}
                    </p>
                  )}
                  
                  {/* Skills preview - only show for job seekers since recruiter profile doesn't have skills */}
                  {!isRecruiter && skills && (
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {skills.split(",").slice(0, 4).map((skill, index) => (
                        <span key={index} className="px-2 py-0.5 bg-white/20 rounded-full text-xs font-semibold text-white border border-white/30">
                          {skill.trim()}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showToast && (
        <div className="toast toast-top toast-center z-50">
          <div className="alert alert-success bg-lokal-green border-none text-white shadow-lg rounded-xl">
            <span>{isRecruiter ? "Job posting saved!" : "Profile saved successfully."}</span>
          </div>
        </div>
      )}
    </>
  );
};
export default EditProfile;
