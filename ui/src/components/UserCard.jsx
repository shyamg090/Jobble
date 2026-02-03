// import axios from "axios";
// import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";
import { useState } from "react";

/**
 * TODO: Backend Integration
 * 
 * POST /api/feed/action - Record swipe action
 *   Body: { targetId, action }
 * 
 * For Job Seekers swiping on Jobs:
 *   - action: 'interested' -> Creates application for the job
 *   - action: 'ignored' (skip) -> Just removes from feed
 * 
 * For Recruiters swiping on Candidates:
 *   - action: 'connect' -> Sends connection request to candidate
 *   - action: 'ignored' (skip) -> Just removes from feed
 */

const UserCard = ({ user, isRecruiter = false }) => {
  const dispatch = useDispatch();
  const [floatingEmojis, setFloatingEmojis] = useState([]);

  // Destructure based on type (job posting or candidate)
  const isJobPosting = user?.type === "job";
  
  // For Job Postings (seen by Job Seekers)
  const { 
    _id,
    companyName, 
    position, 
    location, 
    salary, 
    experience,
    photoUrl,
    about,
    skills 
  } = user || {};
  
  // For Candidates (seen by Recruiters)
  const {
    firstName,
    lastName,
    currentCompany,
    noticePeriod,
    salaryExpectation
  } = user || {};

  const spawnEmojis = (type) => {
    // Multiple emojis based on action type
    // 'interested' = job seeker interested in job
    // 'connect' = recruiter wants to connect with candidate
    const emojiOptions = (type === "interested" || type === "connect")
      ? isRecruiter ? ["🤝", "✅", "👍", "🎯", "💼"] : ["💼", "🚀", "✨", "🎯", "💪"]
      : ["👋", "➡️", "⏭️", "↪️"];

    // Generate emojis that float around the card in all directions
    const newEmojis = Array.from({ length: 20 }).map((_, i) => {
      const angle = (Math.random() * 360) * (Math.PI / 180); // Convert to radians
      const distance = 200 + Math.random() * 150; // Distance to travel outward

      // Pre-calculate final positions
      const endX = Math.cos(angle) * distance;
      const endY = Math.sin(angle) * distance;

      return {
        id: Date.now() + i + Math.random(),
        emoji: emojiOptions[Math.floor(Math.random() * emojiOptions.length)],
        endX,
        endY,
        animationDuration: 1.2 + Math.random() * 0.8 + "s",
        fontSize: 105 + Math.random() * 18 + "px",
        delay: Math.random() * 0.15 + "s",
        rotation: Math.random() * 720 - 360, // Random rotation between -360 and 360
      };
    });

    setFloatingEmojis((prev) => [...prev, ...newEmojis]);

    // Clean up emojis after animation
    setTimeout(() => {
      setFloatingEmojis((prev) => prev.filter(e => !newEmojis.find(ne => ne.id === e.id)));
    }, 2500);
  };

  const handleSendRequest = async (status, userId) => {
    spawnEmojis(status);

    // Delay removal to allow animation to be seen
    setTimeout(() => {
      dispatch(removeUserFromFeed(userId));
    }, 1000);

    // Uncomment below to use real API
    // try {
    //   const res = await axios.post(
    //     BASE_URL + "/request/send/" + status + "/" + userId,
    //     {},
    //     { withCredentials: true }
    //   );
    //   setTimeout(() => dispatch(removeUserFromFeed(userId)), 1000);
    // } catch (err) {}
  };

  // Render Job Posting Card (for Job Seekers)
  const renderJobCard = () => (
    <div className="absolute bottom-0 left-0 right-0 p-6">
      {/* Company & Position Info */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2 py-1 bg-jobble-red text-white text-xs font-bold rounded-full">
            {experience}
          </span>
          <span className="px-2 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold rounded-full">
            {location}
          </span>
        </div>
        <h2 className="text-3xl font-bold text-white">{position}</h2>
        <p className="text-xl text-white/90 font-semibold">{companyName}</p>
        <p className="text-lg text-jobble-red font-bold mt-1">{salary}</p>
      </div>

      {/* About Text */}
      {about && (
        <p className="text-white/80 text-sm leading-relaxed line-clamp-2 mb-4">
          {about}
        </p>
      )}

      {/* Skills */}
      {skills && skills.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {skills.slice(0, 4).map((skill, index) => (
            <span key={index} className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-semibold text-white border border-white/30">
              {skill}
            </span>
          ))}
          {skills.length > 4 && (
            <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-semibold text-white border border-white/30">
              +{skills.length - 4}
            </span>
          )}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-3 w-full">
        <button
          className="flex-1 btn btn-outline rounded-lg h-11 text-sm font-semibold transition-all duration-200 border-2 border-white text-white hover:bg-white hover:text-lokal-dark"
          onClick={() => handleSendRequest("ignored", _id)}
        >
          SKIP
        </button>
        <button
          className="flex-1 btn rounded-lg h-11 text-sm font-semibold transition-all duration-200 bg-jobble-red text-white hover:bg-jobble-red-light shadow-lg"
          onClick={() => handleSendRequest("interested", _id)}
        >
          INTERESTED
        </button>
      </div>
    </div>
  );

  // Render Candidate Card (for Recruiters)
  const renderCandidateCard = () => (
    <div className="absolute bottom-0 left-0 right-0 p-6">
      {/* Candidate Info */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2 py-1 bg-lokal-purple text-white text-xs font-bold rounded-full">
            {noticePeriod}
          </span>
          <span className="px-2 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold rounded-full">
            {currentCompany}
          </span>
        </div>
        <h2 className="text-3xl font-bold text-white">{firstName} {lastName}</h2>
        <p className="text-xl text-white/90 font-semibold">{position}</p>
        <p className="text-lg text-jobble-red font-bold mt-1">Expects: {salaryExpectation}</p>
      </div>

      {/* About Text */}
      {about && (
        <p className="text-white/80 text-sm leading-relaxed line-clamp-2 mb-4">
          {about}
        </p>
      )}

      {/* Skills */}
      {skills && skills.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {skills.slice(0, 4).map((skill, index) => (
            <span key={index} className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-semibold text-white border border-white/30">
              {skill}
            </span>
          ))}
          {skills.length > 4 && (
            <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs font-semibold text-white border border-white/30">
              +{skills.length - 4}
            </span>
          )}
        </div>
      )}

      {/* Action Buttons - Recruiter: CONNECT sends connection request to candidate */}
      <div className="flex gap-3 w-full">
        <button
          className="flex-1 btn btn-outline rounded-lg h-11 text-sm font-semibold transition-all duration-200 border-2 border-white text-white hover:bg-white hover:text-lokal-dark"
          onClick={() => handleSendRequest("ignored", _id)}
        >
          SKIP
        </button>
        <button
          className="flex-1 btn rounded-lg h-11 text-sm font-semibold transition-all duration-200 bg-jobble-red text-white hover:bg-jobble-red-light shadow-lg"
          onClick={() => handleSendRequest("connect", _id)}
        >
          CONNECT
        </button>
      </div>
    </div>
  );

  return (
    <div className="relative w-full group">
  {/* Floating Emojis Container */}
  <div className="absolute inset-0 pointer-events-none z-[100] overflow-visible flex items-center justify-center">
    {floatingEmojis.map((item) => (
      <div
        key={item.id}
        className="absolute animate-float-around"
        style={{
          fontSize: item.fontSize,
          animationDuration: item.animationDuration,
          animationDelay: item.delay,
          '--end-x': `${item.endX}px`,
          '--end-y': `${item.endY}px`,
          '--rotation': `${item.rotation}deg`,
        }}
      >
        {item.emoji}
      </div>
    ))}
  </div>

  {/* Card Container - centered */}
  <div className="flex justify-center items-center mt-4">
    <div className="jobble-card border-[3px] border-jobble-navy-dark w-96 max-w-[90vw] h-[70vh] overflow-hidden relative z-10 transition-transform duration-300 hover:scale-[1.01]">
      {/* Background Image Container */}
      <div className="relative w-full h-full">
        <img
          src={photoUrl}
          alt={isJobPosting ? companyName : `${firstName} ${lastName}`}
          className="w-full h-full object-cover"
        />

        {/* Gradient Overlay - transparent to black */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>

        {/* Content Overlay */}
        {isJobPosting ? renderJobCard() : renderCandidateCard()}
      </div>
    </div>
  </div>
</div>
  );
};
export default UserCard;
