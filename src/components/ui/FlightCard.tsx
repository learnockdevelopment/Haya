import React from "react";
import { FiArrowRight } from "react-icons/fi";

type FlightCardProps = {
  image: string;
  title: string;
  packages: number;
};

const FlightCard: React.FC<FlightCardProps> = ({ image, title, packages }) => {
  return (
    <div className="relative group rounded-2xl overflow-hidden shadow-lg cursor-pointer">
      {/* Image */}
      <img
        src={image}
        alt={title}
        className="w-full h-80 object-cover transform group-hover:scale-110 transition duration-500"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

      {/* Bottom Text */}
      <div className="absolute bottom-3 left-3 text-white">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-sm">{packages} Packages</p>
      </div>

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition duration-500">
        <h3 className="text-2xl font-semibold text-white mb-2">{title}</h3>
        <p className="text-gray-200 mb-4">{packages} Travel Packages</p>
        <button className="bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition">
          <FiArrowRight size={22} />
        </button>
      </div>
    </div>
  );
};

export default FlightCard;
