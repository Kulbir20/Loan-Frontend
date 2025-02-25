import { useState } from "react";
import { Card, CardBody, CardText, CardTitle, Modal, Button } from "react-bootstrap";

const HelpCenter = () => {
  const initialQueries = [
    { name: "Rohan", userQuery: "How to get a Loan?", reply: "" },
    { name: "Amit", userQuery: "What is the interest rate?", reply: "" },
    { name: "Sonia", userQuery: "How long does approval take?", reply: "" },
    { name: "Vikram", userQuery: "What documents are required?", reply: "" },
    { name: "Neha", userQuery: "Can I apply for multiple loans?", reply: "" },
  ];

  const [queries, setQueries] = useState(initialQueries);
  const [showModal, setShowModal] = useState(false);
  const [currentReply, setCurrentReply] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(null);

  // Open the modal and set the selected query index
  const openModal = (index) => {
    setSelectedIndex(index);
    setShowModal(true);
  };

  // Close the modal
  const closeModal = () => {
    setShowModal(false);
    setCurrentReply(""); // Clear input field on close
  };

  // Handle reply submission
  const handleReply = () => {
    if (currentReply.trim() === "" || selectedIndex === null) return;

    setQueries((prev) =>
      prev.map((item, i) =>
        i === selectedIndex ? { ...item, reply: currentReply } : item
      )
    );

    closeModal(); // Close modal after submission
  };

  return (
    <div className="mt-4 min-h-screen">
      <div className="mx-auto p-2 relative">
        <h1 className="text-3xl font-bold text-[#1e3a5f]">Help Center</h1>
        <div className="mt-5 flex flex-wrap">
          {queries.map((user, index) => (
            <Card
              key={index}
              className="bg-gradient-to-b from-[#5a7884] to-[#57a7c6eb] border border-[#b0bec5] ml-8 mb-3 w-80 transition-transform duration-300 ease-in-out hover:shadow-lg hover:bg-[#d0e8f2] rounded-[10px] shadow-md font-roboto"
            >
              <CardBody>
                <CardTitle className="text-[#333] text-xl font-semibold">
                  {user.name}
                </CardTitle>
                <CardText className="text-[#090909]">
                  <strong>Query:</strong> {user.userQuery}
                </CardText>

                {/* Reply Button (Opens Modal) */}
                <button
                  onClick={() => openModal(index)}
                  className="bg-[#1cbdc1] border-2 border-[#333] px-3 py-1 text-black text-[1.1rem] rounded-md mt-2 hover:bg-white transition-all ml-auto block"
                >
                  Reply
                </button>

                {/* Display the reply if it exists */}
                {user.reply && (
                  <div className="mt-2 p-2 bg-gray-100 rounded-md">
                    <strong>Reply:</strong> {user.reply}
                  </div>
                )}
              </CardBody>
            </Card>
          ))}
        </div>
      </div>

      {/* Reply Modal */}
      <Modal show={showModal} onHide={closeModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedIndex !== null ? queries[selectedIndex].name : "Reply"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-2">
        {selectedIndex !== null ? queries[selectedIndex].userQuery : "Reply"}</div>
          <input
            type="text"
            value={currentReply}
            onChange={(e) => setCurrentReply(e.target.value)}
            placeholder="Enter your reply..."
            className="w-full p-2 border border-gray-400 rounded-md"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleReply}>
            Submit Reply
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default HelpCenter;
