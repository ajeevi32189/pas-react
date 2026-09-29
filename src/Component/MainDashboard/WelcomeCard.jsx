import React from 'react';
import backgroundUrl from "../../assets/background-5.jpg";
import messageImg from "../../assets/message.png";

const WelcomeCard = () => {
  return (
    <div
      className="relative  flex flex-col md:flex-row items-center md:items-start rounded-xl p-6 md:p-10 text-white border border-gray-800 overflow-hidden max-w-5xl mx-auto"
      style={{
        backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.65) 0%, rgba(0,0,0,1) 90%), url(${backgroundUrl})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
      }}
    >
      {/* Text on top (mobile) / left (desktop) */}
      <div className="z-10 flex flex-col gap-4 max-w-xl text-center md:text-left">
        <p className="text-2xl mt-6 font-bold">
          Welcome back <span className="ml-1">👋</span>
          <br />
          Beyond Watching – Managing Security.
        </p>
        <p className="text-gray-400 text-md opacity-75">
          Unleash the Full Potential of Your Surveillance System.
        </p>
        <button className="w-fit mx-auto md:mx-0 bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md font-semibold text-sm">
          Go now
        </button>
      </div>

      {/* Image below text on mobile / right on desktop */}
      <div className="z-10 mt-6 md:mt-0 md:ml-auto">
        <img
          src={messageImg}
          alt="VMS Illustration"
          className="h-48 sm:h-52 object-contain"
        />
      </div>
    </div>
  );
};

export default WelcomeCard;
