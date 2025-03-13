import { useState, useEffect } from "react";
import { Card, CardBody, CardText, CardTitle, Modal } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";

const Offers = () => {
  const [loanTypes, setLoanTypes] = useState([]);
  const [selectedLoan, setSelectedLoan] = useState("Home Loan");
  const [offers, setOffers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    loanName: "",
    loanEligibility: [{ Description: "", value: "" }],
    loanDocuments: [{ Description: "", value: "" }],
  });
  const [editingLoan, setEditingLoan] = useState(null);

  const fetchAllLoanTypes = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/admin/get-all-loan-types");
      setLoanTypes(response.data.loanTypes);
    } catch (err) {
      console.error("Error fetching loan types", err);
    }
  };

  const deleteLoanDetails = async (loanId) => {
    if (!loanId) {
      console.error("Error: Missing loan ID.");
      toast.error("Failed to delete loan details. ID is undefined.");
      return;
    }

    if (window.confirm("Are you sure you want to delete this loan offer?")) {
      try {
        const response = await axios.delete(`http://localhost:5000/api/admin/delete-loan-details/${loanId}`);

        if (response.status === 200) {
          toast.success("Loan details deleted successfully!");
          setSelectedLoan("Home Loan"); 
          fetchLoanDetails("Home Loan");
          setOffers((prevOffers) => prevOffers.filter((offer) => offer._id !== loanId));
        }
      } catch (err) {
        console.error("Error deleting loan details", err);
        toast.error("Failed to delete loan details.");
      }
    }
  };

  const fetchLoanDetails = async (loanType) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/admin/check-loan-details/${loanType}`);
      console.log(response.data); 
      setOffers(Array.isArray(response.data) ? response.data : [response.data]);
    } catch (err) {
      console.error("Error fetching loan details", err);
      setOffers([]);
    }
  };
  

  useEffect(() => {
    fetchAllLoanTypes();
  }, []);

  useEffect(() => {
    if (selectedLoan) {
      fetchLoanDetails(selectedLoan);
    }
  }, [selectedLoan]);

  const addLoanDetails = async () => {
    if (!formData.loanName || !formData.loanEligibility.length || !formData.loanDocuments.length) {
      toast.info("Please fill out all fields.");
      return;
    }

    try {
      console.log("Form data being sent:", formData);

      const response = await axios.post("http://localhost:5000/api/admin/add-loan-details", {
        loanName: formData.loanName,
        loanEligibility: formData.loanEligibility,
        loanDocuments: formData.loanDocuments,
      });

      if (response.status === 201) {
        toast.success("Loan details added successfully!");
        setShowModal(false);
        setSelectedLoan("Home Loan"); 
        fetchLoanDetails("Home Loan");
        resetForm();
        
      }
    } catch (error) {
      console.error("Error adding loan details:", error);
      toast.error("Failed to add loan details.");
    }
  };

  const updateLoanDetails = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/api/admin/update-loan-details/${editingLoan.loanId}`, formData);
      if (response.status === 200) {
        toast.success("Loan details updated successfully!");
        setShowModal(false);
        const updatedOffers = offers.map((offer) =>
          offer._id === editingLoan.loanId ? response.data : offer
        );
        setOffers(updatedOffers);
        resetForm(); 
      }
    } catch (error) {
      console.error("Error updating loan details:", error);
      toast.warn("Failed to update loan details.");
    }
  };

  const handleEdit = (offer) => {
    setEditingLoan(offer);
    setFormData({
      loanName: offer.loanName,
      loanEligibility: offer.loanEligibility || [{ Description: "", value: "" }],
      loanDocuments: offer.loanDocuments || [{ Description: "", value: "" }],
    });
    setShowModal(true);
  };

  const handleAddEligibility = () => {
    setFormData({
      ...formData,
      loanEligibility: [...formData.loanEligibility, { Description: "", value: "" }],
    });
  };

  const handleAddDocument = () => {
    setFormData({
      ...formData,
      loanDocuments: [...formData.loanDocuments, { Description: "", value: "" }],
    });
  };

  const resetForm = () => {
    setFormData({
      loanName: "",
      loanEligibility: [{ Description: "", value: "" }],
      loanDocuments: [{ Description: "", value: "" }],
    });
    setEditingLoan(null); 
  };

  return (
    <div className="h-full p-6 bg-[#FFF6F7]">
      <div className="max-w-lg mx-auto p-4">
        <h1 className="text-2xl font-bold text-gray-800">Select Loan Type</h1>
        <div className="flex items-center mt-4 justify-center">
          <select
            value={selectedLoan}
            onChange={(e) => setSelectedLoan(e.target.value)}
            className="p-2 bg-[#242224] text-white rounded-md shadow-md border border-gray-600 cursor-pointer"
          >
            <option value="">Select Loan Type</option>
            {loanTypes.map((loanType, index) => (
              <option key={index} value={loanType} className="cursor-pointer">
                {loanType}
              </option>
            ))}
          </select>
          <button
            className="ml-4 bg-[#242224] hover:bg-[#E21D27] text-white font-semibold px-4 py-2 rounded-md transition-all"
            onClick={() => {
              setShowModal(true);
              resetForm(); 
            }}
          >
            Add More
          </button>
        </div>
      </div>

      {/* Offers Cards */}
      <div className="mt-2 flex flex-wrap justify-center">
        {offers.length > 0 ? (
          offers.map((offer) => (
            <Card key={offer._id} className="mb-4 w-full max-w-3xl bg-white border border-black shadow-lg rounded-lg p-4 hover:scale-105">
              <CardBody>
                <CardTitle className="text-xl font-bold text-gray-800 border-b pb-2">{offer.loanName}</CardTitle>
                <CardText className="mt-3">
                  <div className="mb-3">
                    <h2 className="text-lg font-semibold text-gray-700">Eligibility Criteria:</h2>
                    <ol className="pl-5 text-gray-600">
                      {Array.isArray(offer.loanEligibility) && offer.loanEligibility.length > 0 ? (
                        offer.loanEligibility.map((elig, index) => (
                          <li key={elig._id} className="mb-1">
                            <span className="font-medium text-gray-800">{index + 1}. {elig.Description}:</span> {elig.value}
                          </li>
                        ))
                      ) : (
                        <p className="text-gray-500">No eligibility criteria available</p>
                      )}
                    </ol>
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-700">Required Documents:</h2>
                    <ol className="pl-5 text-gray-600">
                      {Array.isArray(offer.loanDocuments) && offer.loanDocuments.length > 0 ? (
                        offer.loanDocuments.map((doc, index) => (
                          <li key={doc._id} className="mb-1">
                            <span className="font-medium text-gray-800">{index + 1}. {doc.Description}:</span> {doc.value}
                          </li>
                        ))
                      ) : (
                        <p className="text-gray-500">No documents required</p>
                      )}
                    </ol>
                  </div>
                </CardText>
                <button
                  className="mt-2 mr-4 bg-[#242224] text-[#ffffff] px-3 py-1 rounded-md cursor-pointer font-semibold "
                  onClick={() => handleEdit(offer)}
                >
                  Edit
                </button>
                <button
                  className="mt-2 ml-4 bg-[#E21D27] text-[#FFFFFF] px-3 py-1 rounded-md cursor-pointer font-semibold"
                  onClick={() => {
                    if (offer && (offer._loanId || offer.loanId)) {
                      deleteLoanDetails(offer.loanId || offer.loanId);
                    }
                  }}
                  
                >
                  Delete
                </button>
              </CardBody>
            </Card>
          ))
        ) : (
          <p className="text-gray-500">No loan offers available.</p>
        )}
      </div>
      <Modal show={showModal} onHide={() => {
        setShowModal(false); 
        if (!editingLoan) { 
          resetForm();
        }
      }}>
        <Modal.Header closeButton>
          <Modal.Title>{editingLoan ? "Edit Loan Offer" : "Add Loan Offer"}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ maxHeight: '75vh', overflowY: 'auto' }}>
          <div className="flex flex-col gap-4">
            <input
              type="text"
              className="border border-black p-2 rounded"
              placeholder="Loan Name"
              value={formData.loanName}
              onChange={(e) => setFormData({ ...formData, loanName: e.target.value })}
            />
            <div>
              <h5>Loan Eligibility</h5>
              {Array.isArray(formData.loanEligibility) ? (
                formData.loanEligibility.map((eligibility, index) => (
                  <div key={index} className="flex gap-4 mt-2">
                    <input
                      type="text"
                      className="border border-black p-2 rounded"
                      placeholder="Eligibility Description"
                      value={eligibility.Description}
                      onChange={(e) => {
                        const updated = [...formData.loanEligibility];
                        updated[index].Description = e.target.value;
                        setFormData({ ...formData, loanEligibility: updated });
                      }}
                    />
                    <input
                      type="text"
                      className="border border-black p-2 rounded"
                      placeholder="Eligibility Value"
                      value={eligibility.value}
                      onChange={(e) => {
                        const updated = [...formData.loanEligibility];
                        updated[index].value = e.target.value;
                        setFormData({ ...formData, loanEligibility: updated });
                      }}
                    />
                  </div>
                ))
              ) : (
                <p>No eligibility criteria available</p>
              )}
              <button onClick={handleAddEligibility} className="mt-3 p-2 bg-[#242224] text-white px-3 py-1 rounded-md">
                Add Eligibility
              </button>
            </div>
            <div>
              <h5>Loan Documents</h5>
              {Array.isArray(formData.loanDocuments) ? (
                formData.loanDocuments.map((document, index) => (
                  <div key={index} className="flex gap-4 mt-2">
                    <input
                      type="text"
                      className="border border-black p-2 rounded"
                      placeholder="Document Description"
                      value={document.Description}
                      onChange={(e) => {
                        const updated = [...formData.loanDocuments];
                        updated[index].Description = e.target.value;
                        setFormData({ ...formData, loanDocuments: updated });
                      }}
                    />
                    <input
                      type="text"
                      className="border border-black p-2 rounded"
                      placeholder="Document Value"
                      value={document.value}
                      onChange={(e) => {
                        const updated = [...formData.loanDocuments];
                        updated[index].value = e.target.value;
                        setFormData({ ...formData, loanDocuments: updated });
                      }}
                    />
                  </div>
                ))
              ) : (
                <p>No documents available</p>
              )}
              <button onClick={handleAddDocument} className="mt-3 p-2 bg-[#242224] text-white px-3 py-1 rounded-md">
                Add Document
              </button>
            </div>
            <button
              onClick={editingLoan ? updateLoanDetails : addLoanDetails}
              className="bg-[#242224] text-white py-2 rounded"
            >
              {editingLoan ? "Update" : "Submit"}
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Offers;
