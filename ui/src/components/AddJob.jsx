import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";
import UserCard from "./UserCard";

/**
 * TODO: Backend Integration
 * 
 * POST /api/recruiter/jobs - Create new job posting
 *   Body: { position, location, salary, experience, skills[], about }
 *   Response: Created job object
 * 
 * The job will be associated with the recruiter's company info
 * (companyName, companyLogo from recruiter profile)
 * 
 * Note: This page should only be accessible to recruiters
 */

const AddJob = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  
  // Redirect non-recruiters to home
  if (user?.role !== "recruiter") {
    return <Navigate to="/" replace />;
  }
  
  // Job specific fields
  const [position, setPosition] = useState("");
  const [location, setLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [experience, setExperience] = useState("");
  const [skills, setSkills] = useState("");
  const [about, setAbout] = useState("");
  
  const [showToast, setShowToast] = useState(false);

  // Determine if it's a valid job posting for preview
  const isValidPreview = position || location || salary || experience || skills || about;
  
  // Create a preview object that matches the structure expected by UserCard for type="job"
  const previewJob = {
    type: "job",
    _id: "preview_job_id",
    companyName: user?.companyName || "Your Company",
    photoUrl: user?.companyLogo || "https://logo.clearbit.com/google.com",
    position: position || "Job Position",
    location: location || "Location",
    salary: salary || "Salary Range",
    experience: experience || "Experience",
    about: about || "Job description will appear here...",
    skills: skills ? skills.split(",").map(s => s.trim()).filter(s => s) : []
  };

  const handleSaveJob = () => {
    // Logic to save job would go here
    console.log("Saving job:", previewJob);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      // Reset form or navigate
    }, 3000);
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-start gap-8 min-h-screen pt-24 pb-12 px-4 max-w-7xl mx-auto">
      {/* Form Section */}
      <div className="w-full max-w-lg">
        <h1 className="text-3xl font-black text-jobble-navy-dark mb-6">Create Job Posting</h1>
        <div className="jobble-card bg-white p-6 md:p-8 gap-4">
          
          <label className="form-control w-full mb-4">
            <div className="label pb-1">
              <span className="label-text font-semibold text-jobble-navy-dark">Job Position</span>
            </div>
            <input
              type="text"
              value={position}
              placeholder="Senior Frontend Developer"
              className="input input-bordered w-full rounded-xl bg-jobble-bg border-jobble-navy-dark focus:border-jobble-red focus:ring-2 focus:ring-jobble-red/20 text-jobble-navy-dark shadow-neobrutalism-sm"
              onChange={(e) => setPosition(e.target.value)}
            />
          </label>
          
          <div className="flex gap-3 mb-4">
            <label className="form-control w-full">
              <div className="label pb-1">
                <span className="label-text font-semibold text-jobble-navy-dark">Location</span>
              </div>
              <input
                type="text"
                value={location}
                placeholder="Bangalore, India"
                className="input input-bordered w-full rounded-xl bg-jobble-bg border-jobble-navy-dark focus:border-jobble-red focus:ring-2 focus:ring-jobble-red/20 text-jobble-navy-dark shadow-neobrutalism-sm"
                onChange={(e) => setLocation(e.target.value)}
              />
            </label>
            <label className="form-control w-full">
              <div className="label pb-1">
                <span className="label-text font-semibold text-jobble-navy-dark">Experience</span>
              </div>
              <input
                type="text"
                value={experience}
                placeholder="3-5 years"
                className="input input-bordered w-full rounded-xl bg-jobble-bg border-gray-200 focus:border-jobble-red focus:ring-2 focus:ring-jobble-red/20 text-jobble-navy-dark"
                onChange={(e) => setExperience(e.target.value)}
              />
            </label>
          </div>
          
          <label className="form-control w-full mb-4">
            <div className="label pb-1">
              <span className="label-text font-semibold text-jobble-navy-dark">Salary Range</span>
            </div>
            <input
              type="text"
              value={salary}
              placeholder="₹20-30 LPA"
              className="input input-bordered w-full rounded-xl bg-jobble-bg border-gray-200 focus:border-jobble-red focus:ring-2 focus:ring-jobble-red/20 text-jobble-navy-dark"
              onChange={(e) => setSalary(e.target.value)}
            />
          </label>
          
          <label className="form-control w-full mb-4">
            <div className="label pb-1">
              <span className="label-text font-semibold text-jobble-navy-dark">Required Skills (comma separated)</span>
            </div>
            <input
              type="text"
              value={skills}
              placeholder="React, TypeScript, Node.js, AWS"
              className="input input-bordered w-full rounded-xl bg-jobble-bg border-gray-200 focus:border-jobble-red focus:ring-2 focus:ring-jobble-red/20 text-jobble-navy-dark"
              onChange={(e) => setSkills(e.target.value)}
            />
          </label>
          
          <label className="form-control w-full mb-6">
            <div className="label pb-1">
              <span className="label-text font-semibold text-jobble-navy-dark">Job Description</span>
            </div>
            <textarea
              value={about}
              placeholder="Describe the role, responsibilities, and what you're looking for in a candidate..."
              className="textarea textarea-bordered h-32 w-full rounded-xl bg-jobble-bg border-gray-200 focus:border-jobble-red focus:ring-2 focus:ring-jobble-red/20 text-jobble-navy-dark"
              onChange={(e) => setAbout(e.target.value)}
              rows="4"
            />
          </label>

          <button 
            className="btn-jobble w-full h-12 rounded-xl text-base"
            onClick={handleSaveJob}
            disabled={!isValidPreview}
          >
            Post Job
          </button>
        </div>
      </div>

      {/* Preview Section */}
      <div className="hidden md:flex flex-col items-center w-full max-w-sm pt-14">
        <div className="mb-4 text-center">
          <p className="text-sm font-bold text-jobble-navy uppercase tracking-widest mb-1">Preview</p>
          <h2 className="text-xl font-black text-jobble-navy-dark">Candidate View</h2>
        </div>
        
        {/* Using a scaled down container to simulate card view */}
        <div className="transform scale-90 origin-top">
          <div className="jobble-card border-[3px] border-jobble-navy-dark w-96 h-[600px] overflow-hidden rounded-2xl relative shadow-neobrutalism">
            <div className="relative w-full h-full bg-gray-900">
              <img
                src={previewJob.photoUrl}
                alt="Company Logo"
                className="w-full h-full object-cover opacity-60"
                onError={(e) => {e.target.src = "https://via.placeholder.com/400"}}
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
              
              {/* Job Card Content Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-left">
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-1 bg-jobble-red text-white text-xs font-bold rounded-full">
                      {previewJob.experience}
                    </span>
                    <span className="px-2 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold rounded-full border border-white/20">
                      {previewJob.location}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-white leading-tight mb-1">{previewJob.position}</h2>
                  <p className="text-lg text-white/90 font-semibold">{previewJob.companyName}</p>
                  <p className="text-lg text-jobble-red font-bold mt-1">{previewJob.salary}</p>
                </div>
                
                <p className="text-white/80 text-sm leading-relaxed line-clamp-2 mb-4">
                  {previewJob.about}
                </p>
                
                {previewJob.skills.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {previewJob.skills.slice(0, 3).map((skill, index) => (
                      <span key={index} className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-semibold text-white border border-white/30">
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
                
                <div className="flex gap-3 w-full">
                  <button className="flex-1 btn btn-outline rounded-lg h-10 text-xs font-bold border-2 border-white text-white uppercase" disabled>Skip</button>
                  <button className="flex-1 btn rounded-lg h-10 text-xs font-bold bg-jobble-red text-white border-none uppercase" disabled>Interested</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showToast && (
        <div className="toast toast-top toast-center z-50">
          <div className="alert alert-success bg-jobble-green border-none text-white shadow-lg rounded-xl">
            <span>Job posted successfully!</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddJob;
