import { useState } from "react";
import { Card, CardBody, CardText, CardTitle, Modal } from "react-bootstrap";

const Offers = () => {
  const initialLoanOffers = {
    "Personal Loan": {
      offers: [
        { name: "Low Interest Loan", rate: "10.5%", tenure: "5 Years", description: "Affordable personal loan." },
        { name: "Instant Loan", rate: "12%", tenure: "3 Years", description: "Quick personal loan for emergencies." },
      ],
    },
    "Home Loan": {
      offers: [
        { name: "Affordable Home Loan", rate: "8.5%", tenure: "15 Years", description: "Low-rate home loan." },
        { name: "Quick Home Loan", rate: "9%", tenure: "10 Years", description: "Fast approval home loan." },
      ],
    },
  };

  const [selectedLoan, setSelectedLoan] = useState("Personal Loan");
  const [offers, setOffers] = useState(initialLoanOffers["Personal Loan"].offers);
  const [showModal, setShowModal] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [formData, setFormData] = useState({ name: "", rate: "", tenure: "", description: "" });

  const handleLoanChange = (event) => {
    setSelectedLoan(event.target.value);
    setOffers(initialLoanOffers[event.target.value].offers);
  };

  const handleAddMore = () => {
    setFormData({ name: "", rate: "", tenure: "", description: "" });
    setEditIndex(null);
    setShowModal(true);
  };

  const handleEditOffer = (index) => {
    setFormData(offers[index]);
    setEditIndex(index);
    setShowModal(true);
  };

  const handleDeleteOffer = (index) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete the Offer ?`);
    if (confirmDelete) {
      setOffers(offers.filter((_, i) => i !== index));
    }
  };

  const handleSubmit = () => {
    if (editIndex !== null) {
      const updatedOffers = [...offers];
      updatedOffers[editIndex] = formData;
      setOffers(updatedOffers);
    } else {
      setOffers([...offers, formData]);
    }
    setShowModal(false);
  };

  return (
    <div className=" h-full p-4 bg-[#FFF6F7]">
      <div className="mx-auto p-2 relative">
        <h1>Select Loan Type</h1>
        <div className="flex items-center mt-4 justify-center">
          <select value={selectedLoan} onChange={handleLoanChange} className="p-2 bg-[#242224] text-[#FFFFFF] rounded-md cursor-pointer">
            {Object.keys(initialLoanOffers).map((loanType) => (
              <option key={loanType} value={loanType}>{loanType}</option>
            ))}
          </select>
          <button className="ml-4 bg-[#242224] text-[#FFFFFF] px-4 py-2 rounded-md" onClick={handleAddMore}>
            Add More
          </button>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap">
        {offers.map((offer, index) => (
          <Card key={index} className="ml-4 mb-3 w-80 border border-black shadow-md p-2">
            <CardBody>
              <CardTitle>{offer.name}</CardTitle>
              <CardText>
                <strong>Interest Rate:</strong> {offer.rate} <br />
                <strong>Tenure:</strong> {offer.tenure} <br />
                <strong>Description:</strong> {offer.description}
              </CardText>
              <div className="flex justify-between mt-2">
                <button onClick={() => handleEditOffer(index)} className="mt-2 bg-[#242224] text-[#ffffff] px-3 py-1 rounded-md cursor-pointer font-semibold mr-6">
                  Edit
                </button>
                <button onClick={() => handleDeleteOffer(index)} className="mt-2 bg-[#E21D27] text-[#ffffff] px-3 py-1 rounded-md cursor-pointer font-semibold">
                  Delete
                </button>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editIndex !== null ? "Edit Loan Offer" : "Add Loan Offer"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="flex flex-col gap-4">
            <input type="text" className="border border-black p-2 rounded placeholder:text-[#242224]" placeholder="Loan Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
            <input type="text" className="border border-black p-2 rounded placeholder:text-[#242224]" placeholder="Interest Rate" value={formData.rate} onChange={(e) => setFormData({ ...formData, rate: e.target.value })} />
            <input type="text" className="border border-black p-2 rounded placeholder:text-[#242224]" placeholder="Tenure" value={formData.tenure} onChange={(e) => setFormData({ ...formData, tenure: e.target.value })} />
            <textarea className="border border-black p-2 rounded placeholder:text-[#242224]" placeholder="Description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
            <button onClick={handleSubmit} className="bg-[#242224] text-[#FFFFFF] py-2 rounded">
              {editIndex !== null ? "Update Offer" : "Submit"}
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Offers;
