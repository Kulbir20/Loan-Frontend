import { useState } from "react";
import { Card, CardBody, CardText, CardTitle, Modal } from "react-bootstrap";

// Main Offers Page
const Offers = () => {
  const loanOffers = {
    "Personal Loan": {
      description: "Personal loans are typically unsecured loans that you can use for any purpose. They often come with a fixed interest rate and repayment terms.",
      offers: [
        { name: "Low Interest Personal Loan", rate: "10.5%", tenure: "5 Years", description: "A personal loan with low interest rates, designed for individuals looking for affordable borrowing options." },
        { name: "Instant Personal Loan", rate: "12%", tenure: "3 Years", description: "Get quick access to funds for urgent personal expenses with a short repayment tenure." },
      ],
    },
    "Home Loan": {
      description: "Home loans help individuals finance the purchase of their home. These loans typically have longer repayment terms and lower interest rates.",
      offers: [
        { name: "Affordable Home Loan", rate: "8.5%", tenure: "15 Years", description: "A home loan with affordable interest rates and a long repayment period, perfect for first-time homebuyers." },
        { name: "Quick Home Loan", rate: "9%", tenure: "10 Years", description: "A faster approval home loan designed for those looking to purchase a home quickly." },
      ],
    },
  };

  const [selectedLoan, setSelectedLoan] = useState("Personal Loan");
  const [offers, setOffers] = useState(loanOffers["Personal Loan"].offers);
  const [loanDescription, setLoanDescription] = useState(loanOffers["Personal Loan"].description);
  const [showModal, setShowModal] = useState(false);

  const handleLoanChange = (event) => {
    const selectedType = event.target.value;
    setSelectedLoan(selectedType);
    setOffers(loanOffers[selectedType].offers);
    setLoanDescription(loanOffers[selectedType].description);
  };

  const handleAddMore = () => {
    setShowModal(true); // Show the modal
  };

  const handleCloseModal = () => {
    setShowModal(false); // Close the modal
  };

  return (
    <div className="mt-4 min-h-screen">
      <div className="mx-auto p-2 relative">
        <h1>Select Loan Type</h1>
        <div className="flex items-center mt-4 justify-center">
          <select
            value={selectedLoan}
            onChange={handleLoanChange}
            className="p-2 bg-[#1cbdc1] font-bold text-white rounded-md outline-none cursor-pointer mr-4 mt-2"
          >
            {Object.keys(loanOffers).map((loanType) => (
              <option key={loanType} value={loanType}>
                {loanType}
              </option>
            ))}
          </select>
          <button
            className="mt-2 bg-[#1cbdc1] text-white px-4 py-2 border-none rounded-[10px] cursor-pointer text-[16px] font-bold"
            onClick={handleAddMore}
          >
            Add More
          </button>
        </div>
        <div className="text-white text-center">
          <p>{loanDescription}</p>
        </div>
      </div>

      <div className=" flex flex-wrap justify-start">
        {offers.map((offer, index) => (
          <Card
            key={index}
            className="ml-8 mb-3 w-80 transition-transform duration-300 ease-in-out hover:shadow-lg hover:bg-blue-100 cursor-pointer rounded-[10px] shadow-md border-none font-roboto"
          >
            <CardBody>
              <CardTitle>{offer.name}</CardTitle>
              <CardText>
                <strong>Interest Rate:</strong> {offer.rate} <br />
                <strong>Tenure:</strong> {offer.tenure} <br />
                <strong>Description:</strong> {offer.description}
              </CardText>
            </CardBody>
          </Card>
        ))}
      </div>

      <Modal  show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title >Add Loan Offer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <LoanOffersForm closeModal={handleCloseModal} />
        </Modal.Body>
      </Modal>
    </div>
  );
};
const LoanOffersForm = ({ closeModal }) => {
  const [loanName, setLoanName] = useState("");
  const [type, setType] = useState("");
  const [maxAmount, setMaxAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [emiSchedule, setEmiSchedule] = useState("");
  const [conditions, setConditions] = useState([{ condition: "", value: "" }]);

  const LoanType = ['Personal Loan', 'Business Loan', 'Education Loan', 'Home Loan', 'Car Loan'];
  const Emi = ['3 Month', '4 Month', '6 Month', '12 Month'];

  const handleConditionChange = (index, field, newValue) => {
    const updatedConditions = [...conditions];
    updatedConditions[index][field] = newValue;
    setConditions(updatedConditions);
  };

  const addCondition = () => {
    setConditions([...conditions, { condition: "", value: "" }]);
  };

  const handleSubmit = () => {
    console.log("Loan Offer Submitted", { loanName, type, maxAmount, interestRate, emiSchedule, conditions });

  
    closeModal();
  };

  return (
    <div className="flex flex-col gap-4">
      <input
        type="text"
        name="loanname"
        value={loanName}
        onChange={(e) => setLoanName(e.target.value)}
        placeholder="Loan Name"
        className="w-full p-3 rounded-lg border border-gray-300 bg-gray-100 focus:bg-white focus:border-[#1cbdc1] focus:ring-2 focus:ring-[#1cbdc1] outline-none shadow-sm transition-all duration-200"
      />
      <select
        name="type"
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="w-full p-3 rounded-lg border border-gray-300 bg-gray-100 focus:bg-white focus:border-[#1cbdc1] focus:ring-2 focus:ring-[#1cbdc1] outline-none shadow-sm transition-all duration-200"
      >
        <option value="">Select Loan Type</option>
        {LoanType.map((item, index) => (
          <option key={index} value={item}>{item}</option>
        ))}
      </select>
      <input
        type="text"
        name="maxamount"
        value={maxAmount}
        onChange={(e) => setMaxAmount(e.target.value)}
        placeholder="Max Amount"
        className="w-full p-3 rounded-lg border border-gray-300 bg-gray-100 focus:bg-white focus:border-[#1cbdc1] focus:ring-2 focus:ring-[#1cbdc1] outline-none shadow-sm transition-all duration-200"
      />
      <input
        type="text"
        name="interest"
        value={interestRate}
        onChange={(e) => setInterestRate(e.target.value)}
        placeholder="Interest Rate"
        className="w-full p-3 rounded-lg border border-gray-300 bg-gray-100 focus:bg-white focus:border-[#1cbdc1] focus:ring-2 focus:ring-[#1cbdc1] outline-none shadow-sm transition-all duration-200"
      />
      <select
        name="emi"
        value={emiSchedule}
        onChange={(e) => setEmiSchedule(e.target.value)}
        className="w-full p-3 rounded-lg border border-gray-300 bg-gray-100 focus:bg-white focus:border-[#1cbdc1] focus:ring-2 focus:ring-[#1cbdc1] outline-none shadow-sm transition-all duration-200"
      >
        <option value="">Select EMI Schedule</option>
        {Emi.map((item, index) => (
          <option key={index} value={item}>{item}</option>
        ))}
      </select>

      <div className="text-left">
        <p>Enter Eligibility</p>
        {conditions.map((item, index) => (
          <div key={index} className="mt-2">
            <input
              name="condition"
              value={item.condition}
              onChange={(e) => handleConditionChange(index, "condition", e.target.value)}
              placeholder="Condition"
              className="mt-2 w-full p-3 rounded-lg border border-gray-300 bg-gray-100 focus:bg-white focus:border-[#1cbdc1] focus:ring-2 focus:ring-[#1cbdc1] outline-none shadow-sm transition-all duration-200"
            />
            <input
              name="value"
              value={item.value}
              onChange={(e) => handleConditionChange(index, "value", e.target.value)}
              placeholder="Value"
              className="mt-4 w-full p-3 rounded-lg border border-gray-300 bg-gray-100 focus:bg-white focus:border-[#1cbdc1] focus:ring-2 focus:ring-[#1cbdc1] outline-none shadow-sm transition-all duration-200"
            />
          </div>
        ))}
      </div>

      <button onClick={addCondition} className="bg-teal-500 text-white py-2 rounded-full">
        Add More Conditions
      </button>

      <button onClick={handleSubmit} className="bg-teal-500 text-white py-2 rounded-full">
        Submit
      </button>
    </div>
  );
};

export default Offers;
