import { Link, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FiMapPin, FiCalendar, FiUsers, FiEdit2, FiTrash2, FiClock, FiZap, FiBriefcase } from "react-icons/fi";

/**
 * TODO: Backend Integration
 * 
 * GET /api/recruiter/jobs - Get all job postings by this recruiter
 * Returns: Array of job objects with applications count
 * 
 * DELETE /api/recruiter/jobs/:id - Delete a job posting
 * 
 * PATCH /api/recruiter/jobs/:id/status - Toggle job status (Active/Closed)
 *   Body: { status: 'active' | 'closed' }
 * 
 * Note: This page should only be accessible to recruiters
 */

// Dummy jobs data
const myJobs = [
  {
    _id: "job1",
    position: "Senior Frontend Developer",
    location: "Bangalore, India",
    postedDate: "2 days ago",
    applications: 12,
    status: "Active",
    type: "Full-time · Hybrid",
    salaryRange: "₹28-34 LPA",
    matches: 6
  },
  {
    _id: "job2",
    position: "Backend Engineer",
    location: "Remote",
    postedDate: "5 days ago",
    applications: 8,
    status: "Active",
    type: "Full-time · Remote",
    salaryRange: "₹24-30 LPA",
    matches: 4
  },
  {
    _id: "job3",
    position: "Product Designer",
    location: "Mumbai, India",
    postedDate: "1 week ago",
    applications: 24,
    status: "Closed",
    type: "Contract · Onsite",
    salaryRange: "₹14-18 LPA",
    matches: 3
  }
];

const JobPostings = () => {
  const user = useSelector((store) => store.user);
  
  // Redirect non-recruiters to home
  if (user?.role !== "recruiter") {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen pt-24 px-4 max-w-5xl mx-auto pb-20">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-10">
        <div>
          <p className="text-jobble-red font-bold uppercase tracking-wide text-xs mb-1">Recruiter Dashboard</p>
          <h1 className="text-4xl font-black text-jobble-navy-dark uppercase tracking-tight">My Jobs</h1>
          <p className="text-gray-600 font-bold mt-1 text-sm border-l-4 border-jobble-navy-dark pl-3">Manage postings, see applications, and keep roles fresh.</p>
        </div>
        <Link to="/add-job" className="btn btn-jobble h-14 px-6 flex items-center gap-2 text-base font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none translate-x-0 hover:translate-x-[4px] hover:translate-y-[4px] transition-all border-2 border-jobble-navy-dark rounded-xl">
          <FiBriefcase size={20} strokeWidth={2.5} /> <span className="uppercase">Post New Job</span>
        </Link>
      </div>

      {myJobs.length === 0 ? (
        <div className="jobble-card bg-white border-2 border-jobble-navy-dark shadow-neobrutalism p-12 flex flex-col items-center justify-center text-center w-full min-h-[420px] rounded-xl">
          <div className="w-20 h-20 rounded-full bg-jobble-bg border-2 border-jobble-navy-dark flex items-center justify-center mb-5 text-jobble-navy-dark shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <FiBriefcase size={32} strokeWidth={2.5} />
          </div>
          <h2 className="text-2xl font-black text-jobble-navy-dark mb-2 uppercase">No Jobs Posted Yet</h2>
          <p className="text-gray-600 mb-8 max-w-md font-medium">Create your first job posting to start finding great candidates.</p>
          <Link to="/add-job" className="btn btn-jobble h-12 px-8 font-bold text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none translate-x-0 hover:translate-x-[4px] hover:translate-y-[4px] transition-all border-2 border-jobble-navy-dark rounded-lg uppercase">
            Create Job
          </Link>
        </div>
      ) : (
        <div className="grid gap-6">
          {myJobs.map((job) => (
            <div key={job._id} className="jobble-card bg-white border-2 border-jobble-navy-dark shadow-neobrutalism p-6 md:p-7 rounded-xl transition-transform hover:-translate-y-1">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                <div className="space-y-3 flex-1">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h3 className="text-2xl font-black text-jobble-navy-dark leading-none">{job.position}</h3>
                    <span className={`px-2 py-1 text-xs font-bold rounded border-2 ${job.status === 'Active' ? 'bg-green-100 text-green-700 border-jobble-navy-dark' : 'bg-gray-100 text-gray-600 border-jobble-navy-dark'}`}>
                      {job.status.toUpperCase()}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs font-bold text-jobble-navy-dark bg-jobble-bg px-3 py-1 rounded border-2 border-jobble-navy-dark whitespace-nowrap">
                      <FiClock size={14} /> {job.postedDate}
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm text-jobble-navy-dark font-bold">
                    <span className="flex items-center gap-2"><FiMapPin size={18} /> {job.location}</span>
                    <span className="flex items-center gap-2"><FiBriefcase size={18} /> {job.type}</span>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 font-medium pt-1">
                    <span className="flex items-center gap-2 px-3 py-1 bg-yellow-50 border-2 border-jobble-navy-dark rounded shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"><FiZap size={16} className="text-jobble-navy-dark" /> High Intent: {job.matches}</span>
                    <span className="flex items-center gap-2 px-3 py-1 bg-blue-50 border-2 border-jobble-navy-dark rounded shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"><FiUsers size={16} className="text-jobble-navy-dark" /> Applicants: {job.applications}</span>
                    <span className="flex items-center gap-2 px-3 py-1 bg-white border-2 border-jobble-navy-dark rounded shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"><FiCalendar size={16} className="text-jobble-navy-dark" /> {job.salaryRange}</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end gap-3 min-w-[240px]">
                  <div className="bg-gray-50 w-full sm:w-auto lg:w-full p-4 border-2 border-jobble-navy-dark rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <p className="text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide border-b-2 border-gray-200 pb-1">Stats Snapshot</p>
                    <div className="flex items-center justify-between text-jobble-navy-dark">
                      <div>
                        <p className="text-3xl font-black leading-none">{job.applications}</p>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mt-1">Total</p>
                      </div>
                      <div className="h-8 w-0.5 bg-gray-300 mx-2"></div>
                      <div className="text-right">
                        <p className="text-3xl font-black text-jobble-red leading-none">{job.matches}</p>
                        <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mt-1">Matched</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 w-full sm:w-auto lg:w-full mt-1">
                    <button className="btn bg-white hover:bg-gray-50 h-10 rounded-lg text-sm font-bold flex items-center justify-center gap-2 border-2 border-jobble-navy-dark text-jobble-navy-dark shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
                      <FiEdit2 size={14} /> EDIT
                    </button>
                    <button className="btn bg-white hover:bg-red-50 h-10 rounded-lg text-sm font-bold flex items-center justify-center gap-2 border-2 border-jobble-navy-dark text-jobble-red shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all">
                      <FiTrash2 size={14} /> DEL
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default JobPostings;
