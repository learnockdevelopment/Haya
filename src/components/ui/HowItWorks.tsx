import { FaMapMarkerAlt, FaFileAlt, FaUpload, FaCheckSquare } from "react-icons/fa";

export default function HowItWorks() {
  const steps = [
    {
      id: "01",
      title: "Choose Destination",
      description:
        "Select your desired country and visa type from our comprehensive list of destinations",
      icon: <FaMapMarkerAlt className="text-gray-400 text-4xl" />,
      img: "/path/to/destination.png", // replace with your image path
    },
    {
      id: "02",
      title: "Fill Application Form",
      description:
        "Complete our simple online form with your personal details and travel information",
      icon: <FaFileAlt className="text-gray-400 text-4xl" />,
      img: "/path/to/form.png",
    },
    {
      id: "03",
      title: "Upload Documents",
      description:
        "Submit required documents securely through our encrypted platform",
      icon: <FaUpload className="text-gray-400 text-4xl" />,
      img: "/path/to/upload.png",
    },
    {
      id: "04",
      title: "Receive Your Visa",
      description:
        "Get your approved visa delivered to your email or physical address",
      icon: <FaCheckSquare className="text-gray-400 text-4xl" />,
      img: "/path/to/visa.png",
    },
  ];

  return (
    <section className="bg-[#fdf6f0] py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800">How It Works</h2>
          <p className="text-gray-600 mt-2">
            Getting your visa approved is simple with our streamlined 4-step process
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-xl p-6 text-center relative"
            >
              {/* Step Number */}
              <div className="w-12 h-12 flex items-center justify-center bg-orange-500 text-white rounded-full mx-auto mb-4 text-lg font-bold">
                {step.id}
              </div>

              {/* Icon (replace with your image if needed) */}
              <div className="flex justify-center mb-4">
                {step.icon}
                {/* <img src={step.img} alt={step.title} className="h-10 w-10" /> */}
              </div>

              {/* Title */}
              <h3 className="font-semibold text-gray-800 mb-2">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-500">{step.description}</p>

              {/* Arrow between steps */}
              {index !== steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-6 transform -translate-y-1/2">
                  <div className="w-8 h-8 border border-orange-500 rounded-full flex items-center justify-center text-orange-500">
                    →
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
