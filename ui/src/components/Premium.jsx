import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";

/**
 * TODO: Backend Integration
 * 
 * GET /api/premium/verify - Check if user has active premium subscription
 *   Response: { isPremium: boolean, plan: 'silver' | 'gold' | null, expiresAt: Date }
 * 
 * POST /api/payment/create - Create Razorpay order
 *   Body: { membershipType: 'silver' | 'gold' }
 *   Response: { amount, keyId, currency, notes, orderId }
 * 
 * POST /api/payment/verify - Verify payment after Razorpay callback
 *   Body: { razorpay_order_id, razorpay_payment_id, razorpay_signature }
 * 
 * Note: Premium is only for Recruiters. Job Seekers see "Coming Soon" features.
 */

const Premium = () => {
  const user = useSelector((store) => store.user);
  const [isUserPremium, setIsUserPremium] = useState(false);
  
  const isRecruiter = user?.role === "recruiter";

  const planDetails = useMemo(() => ([
    {
      id: "silver",
      name: "Silver",
      price: "₹4,999",
      cadence: "/month",
      badge: "For focused sourcing",
      accent: "silver",
      perks: [
        { icon: "💬", title: "Chat unlocked", desc: "DM candidates directly with smart templates." },
        { icon: "🤝", title: "50 connects/day", desc: "Plenty for lean teams sourcing weekly." },
        { icon: "✅", title: "Verified badge", desc: "Stand out and improve accept rates." },
        { icon: "📍", title: "Talent clusters", desc: "City and skill-based shortlists ready to message." },
      ],
      cta: "Get Silver",
    },
    {
      id: "gold",
      name: "Gold",
      price: "₹9,999",
      cadence: "/month",
      badge: "Most popular",
      accent: "gold",
      perks: [
        { icon: "⚡", title: "Priority matching", desc: "AI suggests top 10 fits every morning." },
        { icon: "∞", title: "Unlimited connects", desc: "Never throttle outreach when roles heat up." },
        { icon: "🎯", title: "Shortlist boost", desc: "Your roles stay pinned for premium talent." },
        { icon: "🛡️", title: "Fraud shield", desc: "Signal score highlights reliable profiles." },
        { icon: "📊", title: "ATS export", desc: "One-click CSV/Greenhouse export of pipelines." },
      ],
      cta: "Choose Gold",
      popular: true,
    },
  ]), []);
  
  useEffect(() => {
    if (isRecruiter) {
      verifyPremiumUser();
    }
  }, [isRecruiter]);

  const verifyPremiumUser = async () => {
    try {
      const res = await axios.get(BASE_URL + "/premium/verify", {
        withCredentials: true,
      });

      if (res.data.isPremium) {
        setIsUserPremium(true);
      }
    } catch (err) {
      console.log("Premium verification skipped");
    }
  };

  const handleBuyClick = async (type) => {
    const order = await axios.post(
      BASE_URL + "/payment/create",
      {
        membershipType: type,
      },
      { withCredentials: true }
    );

    const { amount, keyId, currency, notes, orderId } = order.data;

    const options = {
      key: keyId,
      amount,
      currency,
      name: "Jobble",
      description: "Find the best candidates for your team",
      order_id: orderId,
      prefill: {
        name: notes.firstName + " " + notes.lastName,
        email: notes.emailId,
        contact: "9999999999",
      },
      theme: {
        color: "#DC0000",
      },
      handler: verifyPremiumUser,
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  // Job Seeker View - Coming Soon Features
  if (!isRecruiter) {
    return (
      <div className="max-w-5xl mx-auto px-4 md:px-6 lg:px-10 py-10 space-y-8">
        <div className="jobble-card p-8 md:p-10 bg-white">
          <div className="relative z-10 flex flex-col gap-4">
            <span className="jobble-tag w-fit">Job Seeker Premium</span>
            <h1 className="text-4xl md:text-5xl font-black leading-tight text-lokal-dark">Personalized coaching, coming soon.</h1>
            <p className="text-lokal-gray max-w-2xl">We are building an AI prep coach, recruiter-reviewed resumes, and skill badges to help you stand out instantly.</p>
            <div className="flex flex-wrap gap-3 text-sm text-lokal-dark font-semibold">
              <span className="bg-yellow-100 border-2 border-lokal-dark px-3 py-1 rounded-lg shadow-neobrutalism-sm">Tailored feedback on every line</span>
              <span className="bg-white border-2 border-lokal-dark px-3 py-1 rounded-lg shadow-neobrutalism-sm">Mock interviews with scoring</span>
              <span className="bg-white border-2 border-lokal-dark px-3 py-1 rounded-lg shadow-neobrutalism-sm">One-link portfolio drops</span>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: "📝", title: "Resume Review", desc: "Get ATS-safe rewrites and recruiter-grade edits.", tag: "COMING SOON" },
            { icon: "🎯", title: "Interview Prep", desc: "Role-specific mock drills with instant notes.", tag: "COMING SOON" },
            { icon: "🏆", title: "Skill Badges", desc: "Verified badges you can share on applications.", tag: "COMING SOON" },
          ].map((card) => (
            <div key={card.title} className="jobble-card p-6 text-center">
              <div className="w-16 h-16 bg-lokal-light rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                <span>{card.icon}</span>
              </div>
              <h3 className="font-bold text-lg text-lokal-dark mb-2">{card.title}</h3>
              <p className="text-lokal-gray text-sm">{card.desc}</p>
              <span className="inline-block mt-4 px-3 py-1 bg-jobble-red/10 text-jobble-red text-xs font-bold rounded-full">
                {card.tag}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Recruiter Premium View
  return isUserPremium ? (
    <div className="max-w-5xl mx-auto px-4 md:px-6 lg:px-10 py-10 space-y-8">
      <div className="jobble-card p-10 bg-white">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl text-lokal-dark">
            <div className="jobble-tag w-fit">Premium Active</div>
            <h1 className="text-3xl md:text-4xl font-black leading-tight text-lokal-dark">Recruiter Premium</h1>
            <h2 className="text-2xl md:text-3xl font-extrabold">Hire faster with signal-rich candidate matches.</h2>
            <p className="text-lokal-gray">Priority placement, unlimited connects, and AI-picked shortlists delivered daily. Built for teams that need velocity without compromising quality.</p>
            <div className="flex flex-wrap gap-5 text-lokal-dark text-sm font-semibold">
              <div className="flex items-center gap-2"><span className="text-jobble-red text-lg">⚡</span>Daily AI suggestions</div>
              <div className="flex items-center gap-2"><span className="text-jobble-green text-lg">🛡️</span>Fraud shield enabled</div>
              <div className="flex items-center gap-2"><span className="text-jobble-navy text-lg">📊</span>ATS-friendly exports</div>
            </div>
            <div className="flex flex-wrap gap-3 mt-4">
              <button className="btn-jobble px-5 py-3" onClick={() => handleBuyClick("gold")}>Upgrade to Gold</button>
              <button className="btn-outline-dark px-5 py-3" onClick={() => document.getElementById('premium-plans')?.scrollIntoView({ behavior: 'smooth' })}>Compare plans</button>
            </div>
          </div>

          <div className="jobble-card p-6 w-full md:w-[320px] text-lokal-dark bg-white space-y-3">
            <p className="text-sm font-semibold text-jobble-red mb-2 uppercase tracking-wide">Included Features</p>
            <div className="flex items-center gap-3 p-2 border-b-2 border-dashed border-gray-200 last:border-0">
              <span className="text-2xl">🚀</span>
              <div>
                <p className="font-semibold">Role spotlight</p>
                <p className="text-sm text-lokal-gray">Your jobs stay surfaced to the right candidates.</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-2 border-b-2 border-dashed border-gray-200 last:border-0">
              <span className="text-2xl">🔍</span>
              <div>
                <p className="font-semibold">Signal scoring</p>
                <p className="text-sm text-lokal-gray">Trust factors and activity history in one view.</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-2 border-b-2 border-dashed border-gray-200 last:border-0">
              <span className="text-2xl">🤝</span>
              <div>
                <p className="font-semibold">Hand-off ready</p>
                <p className="text-sm text-lokal-gray">Exports align with ATS fields for clean imports.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-10 py-10 space-y-10">
      <section className="jobble-card p-8 md:p-10 bg-white">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="space-y-4 max-w-2xl text-lokal-dark">
            <span className="jobble-tag w-fit">Recruiter Premium</span>
            <h1 className="text-4xl md:text-5xl font-black leading-tight text-lokal-dark">Hire faster with signal-rich candidate matches.</h1>
            <p className="text-lokal-gray">Priority placement, unlimited connects, and AI-picked shortlists delivered daily. Built for teams that need velocity without compromising quality.</p>
            <div className="flex flex-wrap gap-3 mb-4">
              <button className="btn-jobble px-5 py-3" onClick={() => handleBuyClick("gold")}>
                Upgrade to Gold
              </button>
              <button className="btn-outline-dark px-5 py-3" onClick={() => document.getElementById('premium-plans')?.scrollIntoView({ behavior: 'smooth' })}>
                Compare plans
              </button>
            </div>
            <div className="flex flex-wrap gap-6 text-lokal-dark text-sm font-semibold">
              <div className="flex items-center gap-2">
                <span className="text-jobble-red text-lg">⚡</span>
                Daily AI suggestions
              </div>
              <div className="flex items-center gap-2">
                <span className="text-jobble-green text-lg">🛡️</span>
                Fraud shield enabled
              </div>
              <div className="flex items-center gap-2">
                <span className="text-jobble-navy text-lg">📊</span>
                ATS-friendly exports
              </div>
            </div>
          </div>

          <div className="jobble-card p-6 w-full md:w-[340px] text-lokal-dark bg-white space-y-3">
            <p className="text-sm font-semibold text-jobble-red mb-2 uppercase tracking-wide">Included Features</p>
            <div className="flex items-center gap-3 p-2 border-b-2 border-dashed border-gray-200 last:border-0">
              <span className="text-2xl">🚀</span>
              <div>
                <p className="font-semibold">Role spotlight</p>
                <p className="text-sm text-lokal-gray">Your jobs stay surfaced to the right candidates.</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-2 border-b-2 border-dashed border-gray-200 last:border-0">
              <span className="text-2xl">🔍</span>
              <div>
                <p className="font-semibold">Signal scoring</p>
                <p className="text-sm text-lokal-gray">Trust factors and activity history in one view.</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-2 border-b-2 border-dashed border-gray-200 last:border-0">
              <span className="text-2xl">🤝</span>
              <div>
                <p className="font-semibold">Hand-off ready</p>
                <p className="text-sm text-lokal-gray">Exports align with ATS fields for clean imports.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="premium-plans" className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-jobble-red font-semibold uppercase tracking-[0.08em] text-xs">Plans</p>
            <h2 className="text-3xl font-black text-lokal-dark">Choose your pace</h2>
            <p className="text-lokal-gray mt-1">Both plans include chat, saved searches, and recruiter verification.</p>
          </div>
          <div className="hidden md:inline-flex bg-yellow-100 border-2 border-lokal-dark px-3 py-1 rounded-lg text-lokal-dark font-semibold shadow-neobrutalism-sm">Cancel anytime, billed monthly</div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
          {planDetails.map((plan) => (
            <div key={plan.id} className={`jobble-card p-8 ${plan.accent === 'gold' ? 'bg-yellow-50/50' : 'bg-white'}`}>
              <div className="flex items-center justify-between mb-4">
                <div className={`px-3 py-1 rounded-lg font-bold text-sm border-2 border-lokal-dark shadow-neobrutalism-sm ${plan.accent === 'gold' ? 'bg-yellow-100' : 'bg-gray-100'}`}>{plan.badge}</div>
                {plan.popular && <span className="bg-jobble-red text-white px-3 py-1 rounded-lg font-bold text-sm border-2 border-lokal-dark shadow-neobrutalism-sm">Popular</span>}
              </div>
              <h3 className="text-2xl font-bold text-lokal-dark">{plan.name}</h3>
              <p className={`text-4xl font-black ${plan.accent === 'gold' ? 'text-jobble-red' : 'text-lokal-dark'} mb-4`}>
                {plan.price}<span className="text-base font-semibold text-lokal-gray">{plan.cadence}</span>
              </p>
              <div className="h-px w-full bg-gray-200 mb-4"></div>
              <div className="space-y-3 mb-6">
                {plan.perks.map((perk) => (
                  <div key={perk.title} className="flex items-start gap-3">
                    <span className="text-xl mt-1">{perk.icon}</span>
                    <div>
                      <p className="font-semibold text-lokal-dark">{perk.title}</p>
                      <p className="text-sm text-lokal-gray">{perk.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={() => handleBuyClick(plan.id)}
                className={`w-full h-12 rounded-xl font-bold transition-all hover:-translate-y-1 hover:shadow-lg ${plan.accent === 'gold' ? 'btn-jobble' : 'btn-outline-dark'}`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="jobble-card bg-white p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-3xl">🕒</span>
          <div>
            <p className="font-semibold text-lokal-dark">Need a trial?</p>
            <p className="text-sm text-lokal-gray">Talk to us for a 7-day pilot with guided setup.</p>
          </div>
        </div>
        <button className="btn-outline-dark px-6 py-2" onClick={() => handleBuyClick("silver")}>Start with Silver</button>
      </section>
    </div>
  );
};
export default Premium;
