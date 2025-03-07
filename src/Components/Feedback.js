import axios from "axios";
import { useEffect, useState } from "react";
import { Card, CardBody, CardText, CardTitle } from "react-bootstrap";
import { FaStar } from "react-icons/fa";

const Feedback = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchReviews = async () => {
    try {
      const resp = await axios.get("http://localhost:5000/api/feedback/get-feedback");
      setReviews(Array.isArray(resp.data) ? resp.data : []);
    } catch (err) {
      setError("Failed to load reviews. Please try again later.");
      console.error("Error fetching reviews:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <div className="h-full p-4 bg-[#FFF6F7]">
      <div className="mx-auto p-2 relative">
        <h1 className="text-3xl font-bold text-[#1e3a5f]">Customer Reviews</h1>
        {loading ? (
          <div class="flex flex-row text-center justify-center relative top-60 gap-2">
          <div class="w-4 h-4 rounded-full bg-[#E21D27] animate-bounce"></div>
          <div class="w-4 h-4 rounded-full bg-[#E21D27] animate-bounce [animation-delay:-.3s]"></div>
          <div class="w-4 h-4 rounded-full bg-[#E21D27] animate-bounce [animation-delay:-.5s]"></div>
        </div>
        ) : error ? (
          <p className="text-center text-lg text-red-500 mt-5">{error}</p>
        ) : (
          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {reviews.length > 0 ? (
              reviews.map((review, index) => (
                <Card
                  key={index}
                  className="ml-2 border border-black shadow-xl hover:scale-105 transition-transform duration-300 ease-in-out rounded-[10px] font-roboto"
                >
                  <CardBody>
                    <CardTitle className="text-[#333] text-xl font-semibold text-center">
                      {review.user?.fullName || "Anonymous"}
                    </CardTitle>
                    <div className="flex justify-center my-2">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className={`mr-1 ${i < review.rating ? 'text-yellow-500' : 'text-gray-400'}`}
                        />
                      ))}
                    </div>
                    <CardText className="text-[#090909] text-center">
                      <strong>Review:</strong> {review.review || "No review provided."}
                    </CardText>
                  </CardBody>
                </Card>
              ))
            ) : (
              <p className="text-center text-gray-600">No reviews available.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Feedback;
