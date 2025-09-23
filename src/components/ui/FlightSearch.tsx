import React, { useState } from "react";
import { FiCalendar, FiRefreshCw } from "react-icons/fi";

export default function FlightSearch() {
  // ----------------- State Management -----------------
  /*
  const [tripType, setTripType] = useState("oneway");
  const [from, setFrom] = useState("Cairo, Egypt");
  const [to, setTo] = useState("Tokyo, Japan");
  const [departure, setDeparture] = useState("");
  const [returnDate, setReturnDate] = useState("");

  const handleSearch = () => {
    console.log({
      tripType,
      from,
      to,
      departure,
      returnDate,
    });
  };

  const swapLocations = () => {
    setFrom(to);
    setTo(from);
  };
  */
  // -----------------------------------------------------

  return (<div className="py-12 bg-gray-100">
    <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl p-6">
      <h2 className="text-xl font-semibold text-center mb-4 text-text-500">Flight</h2>

      {/* Trip Type */}
      <div className="flex justify-center gap-6 mb-6">
        <label className="flex items-center gap-2 cursor-pointer">
          <span className="w-3 h-3 rounded-full bg-green-600"></span>
          <span className="text-text-500">One Way</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <span className="w-3 h-3 border border-gray-400 rounded-full"></span>
          <span className="text-text-500">Round Trip</span>
        </label>
      </div>

      {/* Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
        {/* From */}
        <div>
          <label className="block text-sm font-medium mb-1">From</label>
          <div className="flex items-center border rounded-lg px-3 py-2">
            <select className="flex-1 bg-transparent outline-none text-text-500">
              <option>Cairo, Egypt</option>
              <option>New York, USA</option>
              <option>Paris, France</option>
            </select>
          </div>
        </div>

        {/* To */}
        <div>
          <label className="block text-sm font-medium mb-1">To</label>
          <div className="flex items-center border rounded-lg px-3 py-2">
            <select className="flex-1 bg-transparent outline-none text-text-500">
              <option>Tokyo, Japan</option>
              <option>London, UK</option>
              <option>Dubai, UAE</option>
            </select>
            <button
              type="button"
              className="ml-2 text-gray-500 hover:text-gray-700"
              // onClick={swapLocations}
            >
              <FiRefreshCw />
            </button>
          </div>
        </div>

        {/* Departure */}
        <div>
          <label className="block text-sm font-medium mb-1">Departure</label>
          <div className="flex items-center border rounded-lg px-3 py-2">
            <FiCalendar className="text-gray-500 mr-2" />
            <input
              type="date"
              className="flex-1 bg-transparent outline-none"
              // value={departure}
              // onChange={(e) => setDeparture(e.target.value)}
            />
          </div>
        </div>

        {/* Return */}
        <div>
          <label className="block text-sm font-medium mb-1">Return</label>
          <div className="flex items-center border rounded-lg px-3 py-2">
            <FiCalendar className="text-gray-500 mr-2" />
            <input
              type="date"
              className="flex-1 bg-transparent outline-none"
              // value={returnDate}
              // onChange={(e) => setReturnDate(e.target.value)}
              // disabled={tripType === "oneway"}
            />
          </div>
        </div>
      </div>

      {/* Button */}
      <div className="flex justify-center mt-6">
        <button
          className="bg-green-600 text-white font-medium px-6 py-2 rounded-full hover:bg-green-700 transition"
          // onClick={handleSearch}
        >
          Search Flight
        </button>
      </div>
    </div>
    </div>
  );
}
