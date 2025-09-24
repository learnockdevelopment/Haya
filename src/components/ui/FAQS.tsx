"use client";
import { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const faqs = [
  {
    question: "How long does visa application process take?",
    answer:
      "Most visa applications are processed within 5-7 business days. However, processing times can vary depending on the destination country and visa type. Express processing is available for urgent applications, which can be completed in 2-3 business days for an additional fee.",
  },
  {
    question: "How long does visa application process take?",
    answer:
      "Most visa applications are processed within 5-7 business days. However, processing times can vary depending on the destination country and visa type. Express processing is available for urgent applications, which can be completed in 2-3 business days for an additional fee.",
  },
  {
    question: "How long does visa application process take?",
    answer:
      "Most visa applications are processed within 5-7 business days. However, processing times can vary depending on the destination country and visa type. Express processing is available for urgent applications, which can be completed in 2-3 business days for an additional fee.",
  },
  {
    question: "How long does visa application process take?",
    answer:
      "Most visa applications are processed within 5-7 business days. However, processing times can vary depending on the destination country and visa type. Express processing is available for urgent applications, which can be completed in 2-3 business days for an additional fee.",
  },
  {
    question: "How long does visa application process take?",
    answer:
      "Most visa applications are processed within 5-7 business days. However, processing times can vary depending on the destination country and visa type. Express processing is available for urgent applications, which can be completed in 2-3 business days for an additional fee.",
  },
  {
    question: "How long does visa application process take?",
    answer:
      "Most visa applications are processed within 5-7 business days. However, processing times can vary depending on the destination country and visa type. Express processing is available for urgent applications, which can be completed in 2-3 business days for an additional fee.",
  },
  {
    question: "How long does visa application process take?",
    answer:
      "Most visa applications are processed within 5-7 business days. However, processing times can vary depending on the destination country and visa type. Express processing is available for urgent applications, which can be completed in 2-3 business days for an additional fee.",
  },
  {
    question: "How long does visa application process take?",
    answer:
      "Most visa applications are processed within 5-7 business days. However, processing times can vary depending on the destination country and visa type. Express processing is available for urgent applications, which can be completed in 2-3 business days for an additional fee.",
  },
  {
    question: "How long does visa application process take?",
    answer:
      "Most visa applications are processed within 5-7 business days. However, processing times can vary depending on the destination country and visa type. Express processing is available for urgent applications, which can be completed in 2-3 business days for an additional fee.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="max-w-7xl mx-auto py-12 px-4">
      <h2 className="text-2xl font-bold text-center mb-2 text-text-600">
        Frequently Asked Questions
      </h2>
      <p className="text-text-600 text-center mb-8">
        Find answers to common questions about our visa services
      </p>

      <div className="space-y-5 shadow-2xl p-5 rounded-xl">
        {faqs.map((faq, index) => (
          <>
            <div
              key={index}
              className={` rounded-lg ${
                openIndex === index
                  ? "shadow-lg border-green-400"
                  : "hover:shadow-md"
              }`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center px-4 py-3 text-left text-text-600 font-medium focus:outline-none transition-colors duration-200"
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <span>{faq.question}</span>
                <span
                  className={`transform transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                >
                  <FiChevronDown className="text-green-600" size={22} />
                </span>
              </button>

              <div
                id={`faq-answer-${index}`}
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index
                    ? "max-h-96 opacity-100 py-2"
                    : "max-h-0 opacity-0 py-0"
                }`}
              >
                <div className="px-4 pb-2 text-text-400 text-sm animate-fade-in">
                  {faq.answer}
                </div>
              </div>
            </div>
            {index < faqs.length - 1 && <hr />}
          </>
        ))}
      </div>

      {/* Animation keyframes for fade-in */}
      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 0.4s;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
