import { useState } from "react";
import men from "../../assets/images/men.jpg";
import men2 from "../../assets/images/men2.jpg";
import men3 from "../../assets/images/women.jpg";

const CustomerReview = () => {
  const reviews = [
    {
      name: "Mehedi Hasan",
      image: men,
      text: "I recently purchased a 4K Smart TV and a laptop from this website, and I couldn't be happier! The TV's picture quality is stunning, and the laptop works like a dream for my office tasks.",
      moreText:
        " What stood out to me the most was the exceptional customer service – they answered all my queries promptly and ensured timely delivery. I'll definitely be back for more!",
    },
    {
      name: "James R.",
      image: men2,
      text: "This site has the best deals on electronics! I bought a DSLR camera and was amazed at the price compared to other stores. The camera arrived in just two days...",
      moreText:
        " perfectly packaged and ready to use. The whole shopping experience was seamless. I highly recommend this site to anyone looking for great electronics at unbeatable prices.",
    },
    {
      name: "Ayesha K.",
      image: men3,
      text: "I'm so impressed with this website! I ordered a gaming PC and a new laptop for my son, and they both exceeded our expectations. The specifications were exactly as...",
      moreText:
        " described, and the performance is top-notch. I also appreciate the user-friendly interface of the website – it made shopping so easy. This is now my go-to store for all my electronics needs!",
    },
  ];

  const [seeMore, setSeeMore] = useState<boolean[]>(Array(reviews.length).fill(false));

  const handleToggle = (index: number) => {
    setSeeMore((prev) =>
      prev.map((value, i) => (i === index ? !value : value))
    );
  };

  return (
    <div>
      <h3 className="text-4xl text-center font-bold my-10">Customer Love</h3>
      <div className="flex flex-col md:flex-row lg:flex-row justify-center mx-0 md:mx-10 gap-6">
        {reviews.map((review, index) => (
          <div
            key={index}
            className="border border-dashed border-gray-700 w-full p-8"
          >
            {/* Header Section */}
            <div className="flex items-center justify-start gap-6 mb-2">
              <img
                src={review.image}
                className="w-20 h-20 rounded-full border border-primary border-dashed p-1"
                alt="Customer"
              />
              <p className="text-2xl font-mono font-bold">{review.name}</p>
            </div>
            {/* Review Text */}
            <div>
              <p>
                {review.text}
                {seeMore[index] && <span>{review.moreText}</span>}
              </p>
              {/* See More Button */}
              <button
                onClick={() => handleToggle(index)}
                className="text-primary mt-2 underline hover:text-white"
              >
                {seeMore[index] ? "See Less" : "See More"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerReview;
