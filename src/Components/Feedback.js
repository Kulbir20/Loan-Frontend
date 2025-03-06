import { useState } from "react";
import { Card, CardBody, CardText, CardTitle } from "react-bootstrap";
import { FaStar } from "react-icons/fa";

const Feedback = () => {
  const initialFeedback = [
    { name: "Rohan", reviews: "The loan application process was smooth and quick!", rating: 5 },
    { name: "Amit", reviews: "Interest rates are reasonable, but approval took some time.", rating: 4 },
    { name: "Sonia", reviews: "Customer support was very helpful throughout the process.", rating: 5 },
    { name: "Vikram", reviews: "I found the documentation requirements a bit too much.", rating: 3 },
    { name: "Neha", reviews: "Got my loan approved within a few days. Great service!", rating: 4 }
  ];

  const [reviews] = useState(initialFeedback);

  return (
    <div className="h-full p-4 bg-[#FFF6F7]">
      <div className="mx-auto p-2 relative">
        <h1 className="text-3xl font-bold text-[#1e3a5f]">Customer Reviews</h1>
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {reviews.map((views, index) => (
            <Card
              key={index}
              className="ml-2 border border-black shadow-xl hover:scale-105 transition-transform duration-300 ease-in-out rounded-[10px]  font-roboto"
            >
              <CardBody>
                <CardTitle className="text-[#333] text-xl font-semibold text-center">
                  {views.name}
                </CardTitle>
                <div className="flex justify-center my-2">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={`mr-1 ${i < views.rating ? 'text-yellow-500' : 'text-gray-400'}`}
                    />
                  ))}
                </div>
                <CardText className="text-[#090909] text-center">
                  <strong>Review:</strong> {views.reviews}
                </CardText>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Feedback;
