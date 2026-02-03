// const PeepsOverlay = () => {
//   return (
//     <div className="fixed inset-0 z-0 overflow-hidden w-full h-full pointer-events-none">
//       {/* Bottom Left - Peeking up */}
//       <img
//         src="https://api.dicebear.com/7.x/open-peeps/svg?seed=Felix"
//         alt="Decorative Peep"
//         className="absolute bottom-0 left-0 w-64 h-64 -mb-2 -ml-2 opacity-80 md:opacity-100 transition-all hover:translate-y-[-10px] duration-300 pointer-events-auto"
//       />

//       {/* Bottom Right - Peeking up */}
//       <img
//         src="https://api.dicebear.com/7.x/open-peeps/svg?seed=Aneka&flip=true"
//         alt="Decorative Peep"
//         className="absolute bottom-0 right-0 w-72 h-72 mb-6 mr-16 opacity-80 md:opacity-100 transition-all hover:translate-y-[-10px] duration-300 pointer-events-auto"
//       />

//       {/* Side Left - Floating */}
//       <img
//         src="https://api.dicebear.com/7.x/open-peeps/svg?seed=Alex&face=smile"
//         alt="Decorative Peep"
//         className="hidden md:block absolute top-1/3 -left-12 w-[16rem] h-[16rem] opacity-60 transform -rotate-12 transition-all hover:rotate-0 duration-300 pointer-events-auto"
//       />

//       {/* Side Right - Floating */}
//       <img
//         src="https://api.dicebear.com/7.x/open-peeps/svg?seed=Shyam"
//         alt="Decorative Peep"
//         className="hidden md:block absolute top-1/4 -right-12 w-40 h-40 opacity-60 transform rotate-12 transition-all hover:rotate-0 duration-300 pointer-events-auto"
//       />
//     </div>
//   );
// };

// export default PeepsOverlay;



const PeepsOverlay = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      {/* Center reference */}
      {/* Top */}
      <img
        src="https://api.dicebear.com/7.x/open-peeps/svg?seed=Charlie"
        className="absolute top-1/2 left-1/2 w-72 h-72 opacity-60
        -translate-x-1/2 -translate-y-[420px]
        animate-float"
        alt=""
      />

      {/* Bottom */}
      <img
        src="https://api.dicebear.com/7.x/open-peeps/svg?seed=Felix"
        className="absolute top-1/2 left-1/2 w-80 h-80 opacity-70
        -translate-x-1/2 translate-y-[320px]
        animate-float-slow"
        alt=""
      />

      {/* Left */}
      <img
        src="https://api.dicebear.com/7.x/open-peeps/svg?seed=Alex"
        className="absolute top-1/2 left-1/2 w-72 h-72 opacity-60
        -translate-x-[480px] -translate-y-1/2
        rotate-[-12deg] animate-float"
        alt=""
      />

      {/* Right */}
      <img
        src="https://api.dicebear.com/7.x/open-peeps/svg?seed=Shyam"
        className="absolute top-1/2 left-1/2 w-72 h-72 opacity-60
        translate-x-[480px] -translate-y-1/2
        rotate-[12deg] animate-float"
        alt=""
      />

      {/* Top Left */}
      <img
        src="https://api.dicebear.com/7.x/open-peeps/svg?seed=Luna"
        className="absolute top-1/2 left-1/2 w-64 h-64 opacity-50
        -translate-x-[340px] -translate-y-[300px]
        animate-float-slow"
        alt=""
      />

      {/* Top Right */}
      <img
        src="https://api.dicebear.com/7.x/open-peeps/svg?seed=Aneka"
        className="absolute top-1/2 left-1/2 w-64 h-64 opacity-50
        translate-x-[340px] -translate-y-[300px]
        animate-float-slow"
        alt=""
      />

      {/* Bottom Left */}
      <img
        src="https://api.dicebear.com/7.x/open-peeps/svg?seed=Oscar"
        className="absolute top-1/2 left-1/2 w-60 h-60 opacity-40
        -translate-x-[300px] translate-y-[260px]
        animate-float"
        alt=""
      />
    </div>
  );
};

export default PeepsOverlay;
