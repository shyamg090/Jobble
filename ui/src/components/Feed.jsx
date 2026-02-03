// import axios from "axios";
// import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";
import UserCard from "./UserCard";

/**
 * TODO: Backend Integration
 * 
 * 1. Replace dummyJobPostings with API call:
 *    GET /api/feed?role=seeker
 *    Returns job postings matching seeker's skills
 * 
 * 2. Replace dummyCandidates with API call:
 *    GET /api/feed?role=recruiter
 *    Returns candidates matching recruiter's job requirements
 * 
 * 3. On swipe action (handleSendRequest in UserCard):
 *    POST /api/feed/action
 *    Body: { targetId, action: 'interested' | 'connect' | 'skip' }
 *    
 *    For Job Seekers:
 *      - 'interested' on a job -> Creates an "application" for that job
 *      - The recruiter will see this in their Applications page
 *    
 *    For Recruiters:
 *      - 'connect' on a candidate -> Sends connection request to candidate
 *      - The candidate will see this in their Connection Requests page
 * 
 * 4. Implement infinite scroll / pagination for feed
 *    GET /api/feed?page=1&limit=10
 */

// Dummy data for Job Seekers - They see JOB POSTINGS
const dummyJobPostings = [
  {
    _id: "job1",
    type: "job",
    companyName: "Google",
    position: "Senior Frontend Developer",
    location: "Bangalore, India",
    salary: "₹25-35 LPA",
    experience: "4-6 years",
    photoUrl: "https://logo.clearbit.com/google.com",
    about: "Join Google's cloud team to build next-generation web applications. Work with cutting-edge technologies and collaborate with brilliant engineers worldwide.",
    skills: ["React", "TypeScript", "Node.js", "GCP", "GraphQL", "Testing"]
  },
  {
    _id: "job2",
    type: "job",
    companyName: "Microsoft",
    position: "Full Stack Engineer",
    location: "Hyderabad, India",
    salary: "₹20-30 LPA",
    experience: "3-5 years",
    photoUrl: "https://logo.clearbit.com/microsoft.com",
    about: "Be part of the Azure team building scalable cloud solutions. Great opportunity to work on products used by millions globally.",
    skills: ["C#", ".NET", "Azure", "React", "SQL Server", "Microservices"]
  },
  {
    _id: "job3",
    type: "job",
    companyName: "Amazon",
    position: "Backend Developer",
    location: "Chennai, India",
    salary: "₹22-32 LPA",
    experience: "3-6 years",
    photoUrl: "https://logo.clearbit.com/amazon.com",
    about: "Work on AWS services that power millions of businesses. Build distributed systems at massive scale.",
    skills: ["Java", "AWS", "DynamoDB", "Kubernetes", "Python", "System Design"]
  },
  {
    _id: "job4",
    type: "job",
    companyName: "Flipkart",
    position: "Mobile Developer",
    location: "Bangalore, India",
    salary: "₹18-28 LPA",
    experience: "2-4 years",
    photoUrl: "https://logo.clearbit.com/flipkart.com",
    about: "Build India's largest e-commerce mobile app. Impact millions of users with your code.",
    skills: ["React Native", "Kotlin", "Swift", "Redux", "Firebase", "CI/CD"]
  },
  {
    _id: "job5",
    type: "job",
    companyName: "Razorpay",
    position: "DevOps Engineer",
    location: "Remote, India",
    salary: "₹15-25 LPA",
    experience: "2-5 years",
    photoUrl: "https://logo.clearbit.com/razorpay.com",
    about: "Join fintech revolution! Help scale payment infrastructure serving millions of transactions daily.",
    skills: ["Docker", "Kubernetes", "Terraform", "AWS", "Prometheus", "Go"]
  }
];

// Dummy data for Recruiters - They see CANDIDATES
const dummyCandidates = [
  {
    _id: "cand1",
    type: "candidate",
    firstName: "Rahul",
    lastName: "Sharma",
    currentCompany: "Infosys",
    position: "Senior Developer",
    noticePeriod: "30 days",
    salaryExpectation: "₹18-22 LPA",
    photoUrl: "https://randomuser.me/api/portraits/men/32.jpg",
    about: "5+ years of experience in full-stack development. Passionate about building scalable applications and leading teams.",
    skills: ["React", "Node.js", "MongoDB", "AWS", "TypeScript", "Docker", "Redis", "GraphQL"]
  },
  {
    _id: "cand2",
    type: "candidate",
    firstName: "Priya",
    lastName: "Patel",
    currentCompany: "TCS",
    position: "Tech Lead",
    noticePeriod: "60 days",
    salaryExpectation: "₹25-30 LPA",
    photoUrl: "https://randomuser.me/api/portraits/women/44.jpg",
    about: "8 years in software development with expertise in cloud architecture. Led multiple successful product launches.",
    skills: ["Java", "Spring Boot", "Microservices", "Azure", "Kubernetes", "System Design", "Team Lead", "Agile"]
  },
  {
    _id: "cand3",
    type: "candidate",
    firstName: "Arjun",
    lastName: "Reddy",
    currentCompany: "Wipro",
    position: "Frontend Developer",
    noticePeriod: "45 days",
    salaryExpectation: "₹12-16 LPA",
    photoUrl: "https://randomuser.me/api/portraits/men/67.jpg",
    about: "3 years of experience specializing in React ecosystem. Love creating beautiful, performant user interfaces.",
    skills: ["React", "Next.js", "Tailwind CSS", "JavaScript", "Redux", "Figma", "Jest", "Storybook"]
  },
  {
    _id: "cand4",
    type: "candidate",
    firstName: "Sneha",
    lastName: "Kumar",
    currentCompany: "Freshworks",
    position: "Backend Engineer",
    noticePeriod: "30 days",
    salaryExpectation: "₹20-25 LPA",
    photoUrl: "https://randomuser.me/api/portraits/women/28.jpg",
    about: "4 years building robust backend systems. Experienced in fintech and SaaS products. Strong problem solver.",
    skills: ["Python", "Django", "PostgreSQL", "Redis", "Celery", "Docker", "REST APIs", "Kafka"]
  },
  {
    _id: "cand5",
    type: "candidate",
    firstName: "Vikram",
    lastName: "Singh",
    currentCompany: "Startup",
    position: "Full Stack Developer",
    noticePeriod: "Immediate",
    salaryExpectation: "₹14-18 LPA",
    photoUrl: "https://randomuser.me/api/portraits/men/45.jpg",
    about: "Startup veteran with experience in building products from scratch. Can wear multiple hats and deliver fast.",
    skills: ["MERN Stack", "Firebase", "AWS", "React Native", "Stripe", "Agile", "Git", "CI/CD"]
  }
];

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  
  const isRecruiter = user?.role === "recruiter";

  // const getFeed = async () => {
  //   if (feed) return;
  //   try {
  //     const res = await axios.get(BASE_URL + "/feed", {
  //       withCredentials: true,
  //     });
  //     dispatch(addFeed(res?.data?.data));
  //   } catch (err) {
  //     // Don't fetch feed if user is not authenticated
  //     console.error("Error fetching feed:", err);
  //   }
  // };

  useEffect(() => {
    // Always load fresh data based on user role
    const feedData = isRecruiter ? dummyCandidates : dummyJobPostings;
    dispatch(addFeed(feedData));

    // Uncomment below to use real API
    // if (user) {
    //   getFeed();
    // }
  }, [isRecruiter, dispatch]);

  if (!feed) return (
    <div className="flex justify-center items-center min-h-[50vh]">
      <div className="text-jobble-navy-dark font-black tracking-widest uppercase animate-pulse">Loading...</div>
    </div>
  );

  if (feed.length <= 0)
    return (
      <div className="flex flex-col justify-center items-center min-h-[50vh] text-center">
        <div className="w-24 h-24 bg-white border-2 border-jobble-navy-dark shadow-neobrutalism rounded-full flex items-center justify-center mb-6">
          <span className="text-4xl">👋</span>
        </div>
        <h2 className="text-2xl font-black text-jobble-navy-dark mb-2 uppercase tracking-wide">
          {isRecruiter ? "No New Candidates" : "No New Jobs"}
        </h2>
        <p className="text-gray-600 font-medium">
          {isRecruiter 
            ? "Check back later for new talent!" 
            : "Check back later for new opportunities!"}
        </p>
      </div>
    );

  return (
    feed && (
      <div className="min-h-screen w-screen flex flex-col items-center pt-6 relative overflow-hidden bg-jobble-bg">
        {/* Abstract Background Elements (Visible on MD+) */}
        <div className="hidden md:block absolute inset-0 pointer-events-none">
            {/* Dot Pattern */}
            {/* <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage: "radial-gradient(#050E3C 2px, transparent 2px)", backgroundSize: "40px 40px"}}></div> */}

            {/* Left Side Elements */}
            <div className="absolute top-32 left-[10%] opacity-80 animate-float">
                <div className="bg-white border-2 border-jobble-navy-dark p-3 shadow-neobrutalism -rotate-6">
                    <span className="text-4xl">🚀 SPEED PROCESS</span>
                </div>
            </div>
            
            <div className="absolute bottom-32 left-[15%] opacity-80 animate-float">
                <div className="bg-jobble-red text-white font-black text-xl px-4 py-2 border-2 border-jobble-navy-dark shadow-neobrutalism rotate-3">
                    GET HIRED NOW
                </div>
            </div>

             {/* Right Side Elements */}
             <div className="absolute top-40 right-[12%] opacity-80 animate-float">
                <div className="bg-jobble-green border-2 border-jobble-navy-dark p-3 shadow-neobrutalism rotate-6 rounded-full w-16 h-16 flex items-center justify-center">
                    <span className="text-white font-bold text-2xl">FNF</span>
                </div>
            </div>

            <div className="absolute bottom-48 right-[10%] opacity-80 animate-pulse-slow">
                <div className="bg-white border-2 border-jobble-navy-dark p-4 shadow-neobrutalism -rotate-3">
                    <div className="flex gap-2 mb-2">
                        <div className="w-3 h-3 rounded-full bg-red-500 border border-black"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500 border border-black"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500 border border-black"></div>
                    </div>
                    <div className="w-32 h-2 bg-gray-500 rounded mb-1"></div>
                    <div className="w-24 h-2 bg-gray-500 rounded"></div>
                </div>
            </div>
            
            {/* Large Background Shapes */}
             {/* <div className="absolute top-[-10%] left-[-5%] w-96 h-96 bg-jobble-red rounded-full mix-blend-multiply filter blur-3xl opacity-5 animate-blob"></div> */}
             {/* <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-jobble-navy rounded-full mix-blend-multiply filter blur-3xl opacity-5 animate-blob animation-delay-2000"></div> */}
             {/* <div className="absolute bottom-[-10%] left-[20%] w-96 h-96 bg-jobble-green rounded-full mix-blend-multiply filter blur-3xl opacity-5 animate-blob animation-delay-4000"></div> */}
        </div>

        <div className="w-full flex items-center relative p-1 flex-col z-10">
          <h1 className="text-3xl font-black text-jobble-navy-dark mb-8 relative bg-white px-8 py-3 border-2 border-jobble-navy-dark shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -rotate-1 rounded-sm uppercase tracking-tight transform hover:rotate-1 transition-transform cursor-default">
            {isRecruiter ? "Discover Candidates" : "Discover Jobs"}
            {/* Decorative Stars on Title */}
            <span className="absolute -top-3 -right-3 text-jobble-red text-2xl">★</span>
            <span className="absolute -bottom-3 -left-3 text-jobble-navy text-xl">★</span>
          </h1>
          <div className="relative">
            <UserCard user={feed[0]} isRecruiter={isRecruiter} />
          </div>
        </div>
      </div>
    )
  );
};
export default Feed;
