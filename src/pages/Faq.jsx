import React, { useState } from "react";
import Layout from "../components/Layout";
import { Plus } from "lucide-react";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What is Netflix?",
      answer: (
        <>
          <p>
            Netflix is a streaming service that offers a wide variety of
            award-winning TV shows, movies, anime, documentaries and more – on
            thousands of internet-connected devices.
          </p>

          <p className="mt-6 sm:mt-8">
            You can watch as much as you want, whenever you want, without a
            single ad – all for one low monthly price. There's always something
            new to discover, and new TV shows and movies are added every week!
          </p>
        </>
      ),
    },
    {
      question: "How much does Netflix cost?",
      answer:
        "Watch Netflix on your smartphone, tablet, Smart TV, laptop, or streaming device, all for one fixed monthly fee.",
    },
    {
      question: "Where can I watch?",
      answer:
        "Watch anywhere, anytime. Sign in with your Netflix account to watch instantly on the web or on any internet-connected device.",
    },
    {
      question: "How do I cancel?",
      answer:
        "Netflix is flexible. There are no annoying contracts and no commitments. You can easily cancel your account online.",
    },
    {
      question: "What can I watch on Netflix?",
      answer:
        "Netflix has an extensive library of feature films, documentaries, TV shows, anime, award-winning Netflix originals, and more.",
    },
    {
      question: "Is Netflix good for kids?",
      answer:
        "The Netflix Kids experience is included with your membership to give parents control while kids enjoy family-friendly content.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-black py-8 text-white sm:py-10 md:py-12">
      <Layout>
        {/* Heading */}
        <h2 className="mb-5 text-[20px] font-semibold sm:mb-6 sm:text-[22px] md:text-[24px]">
          Frequently Asked Questions
        </h2>

        {/* FAQ List */}
        <div className="flex flex-col gap-1.5 sm:gap-2">
          {faqs.map((faq, index) => (
            <div key={index} className="overflow-hidden">
              {/* Question */}
              <button
                type="button"
                onClick={() => toggleFAQ(index)}
                className="
                  flex
                  w-full
                  items-center
                  justify-between
                  gap-4
                  bg-[#2d2d2d]
                  px-4
                  py-4
                  text-left
                  text-[16px]
                  font-normal
                  text-white
                  transition
                  duration-300
                  hover:bg-[#414141]

                  sm:px-5
                  sm:py-5
                  sm:text-[20px]

                  md:px-6
                  md:py-6
                  md:text-[24px]
                "
              >
                <span className="leading-6 sm:leading-7 md:leading-8">
                  {faq.question}
                </span>

                {/* Plus / Close Icon */}
                <Plus
                  size={28}
                  strokeWidth={1.5}
                  className={`
                    shrink-0
                    transition-transform
                    duration-300
                    sm:h-8
                    sm:w-8
                    md:h-10
                    md:w-10
                    ${openIndex === index ? "rotate-45" : ""}
                  `}
                />
              </button>

              {/* Answer */}
              <div
                className={`
                  grid
                  transition-all
                  duration-500
                  ease-in-out
                  ${
                    openIndex === index
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }
                `}
              >
                <div className="overflow-hidden">
                  <div
                    className="
                      mt-[2px]
                      bg-[#2d2d2d]
                      px-4
                      py-5
                      text-[16px]
                      leading-[1.5]

                      sm:px-6
                      sm:py-6
                      sm:text-[20px]
                      sm:leading-[1.45]

                      md:px-9
                      md:py-8
                      md:text-[24px]
                      md:leading-[1.35]
                    "
                  >
                    {faq.answer}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Layout>
    </section>
  );
};

export default FAQ;