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


  const openModal = (index) => {
    setSelectedIndex(index);
    setShowModal(true);
  };


  const closeModal = () => {
    setShowModal(false);
    setCurrentReply(""); 
  };

  const handleReply = () => {
    if (currentReply.trim() === "" || selectedIndex === null) return;

    setQueries((prev) =>
      prev.map((item, i) =>
        i === selectedIndex ? { ...item, reply: currentReply } : item
      )
    );

    closeModal(); 
  };

  return (
    <div className="h-full p-4 bg-[#FFF6F7]">
      <div className="mx-auto p-2 relative">
        <h1 className="text-3xl font-bold text-[#1e3a5f]">Help Center</h1>
        <div className="mt-5 flex flex-wrap justify-center md:justify-start">
          {queries.map((user, index) => (
            <Card
              key={index}
              className="border border-black shadow-md ml-4 mb-3 w-full sm:w-80 md:w-80 transition-transform duration-300 ease-in-out  rounded-[10px] font-roboto"
            >
              <CardBody>
                <CardTitle className="text-[#333] text-xl font-semibold">
                  {user.name}
                </CardTitle>
                <CardText className="text-[#090909]">
                  <strong>Query:</strong> {user.userQuery}
                </CardText>

           
                <button
                  onClick={() => openModal(index)}
                  className="bg-[#242224] border-1 px-3 py-1 text-[#FFFFFF] text-[1.1rem] rounded-md mt-2 transition-all ml-auto block"
                >
                  Reply
                </button>

           
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

     
      <Modal show={showModal} onHide={closeModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedIndex !== null ? queries[selectedIndex].name : "Reply"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-2">
            {selectedIndex !== null ? queries[selectedIndex].userQuery : "Reply"}
          </div>
          <input
            type="text"
            value={currentReply}
            onChange={(e) => setCurrentReply(e.target.value)}
            placeholder="Enter your reply..."
            className="w-full p-2 border border-black placeholder:text-[#242224] rounded-md"
          />
        </Modal.Body>
        <Modal.Footer>
          <button className="bg-[#E21D27] border-1 px-3 py-1 text-[#FFFFFF] text-[1.1rem] rounded-md mt-2 transition-all ml-auto block" onClick={closeModal}>
            Cancel
          </button>
          <button className="bg-[#242224] border-1 px-3 py-1 text-[#FFFFFF] text-[1.1rem] rounded-md mt-2 transition-all ml-auto block" onClick={handleReply}>
            Submit Reply
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default HelpCenter;
