import { useState } from "react";
import { Card, CardBody, CardText, CardTitle } from "react-bootstrap";

const Policies = () => {
  const initialPolicies = [
    { title: "Loan Eligibility Policy", description: "Defines the criteria for loan approval, including age, income, and credit score." },
    { title: "Interest Rate & Fees Policy", description: "Details applicable interest rates, processing fees, and other charges." },
    { title: "Repayment Policy", description: "Explains repayment schedules, due dates, and accepted payment methods." },
    { title: "Late Payment & Penalty Policy", description: "Outlines late fees, penalties, and consequences for missed payments." },
    { title: "Loan Cancellation Policy", description: "Defines conditions under which a borrower can cancel their loan request." },
    { title: "Customer Support & Dispute Resolution Policy", description: "Provides information on handling complaints and resolving disputes." },
  ];

  const [policy, setPolicy] = useState(initialPolicies);
  const [newTerm, setNewTerm] = useState({ title: "", description: "" });
  const [editingIndex, setEditingIndex] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isReading, setIsReading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);

  // Handle Editing an Existing Term
  const handleEdit = (index) => {
    setEditingIndex(index);
    setNewTerm(policy[index]);
    setIsEditing(true);
    setIsReading(false);
    setIsAdding(false);
  };

  // Handle Saving Edited Term
  const handleSaveEdit = () => {
    const updatedTerms = [...policy];
    updatedTerms[editingIndex] = newTerm;
    setPolicy(updatedTerms);
    resetForm();
  };

  // Handle Adding a New Term
  const handleAddNew = () => {
    setNewTerm({ title: "", description: "" });
    setIsAdding(true);
    setIsEditing(false);
    setIsReading(false);
  };

  // Handle Saving a New Term
  const handleSaveNew = () => {
    setPolicy([...policy, newTerm]);
    resetForm();
  };

  const handleDelete = (index) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this policy?");
    if (confirmDelete) {
      setPolicy(policy.filter((_, i) => i !== index));
    }
  };

  // Reset Form
  const resetForm = () => {
    setNewTerm({ title: "", description: "" });
    setEditingIndex(null);
    setIsEditing(false);
    setIsReading(true);
    setIsAdding(false);
  };

  return (
    <div className="mt-4 min-h-screen">
      <div className="mx-auto p-2 relative">
        <h1 className="text-3xl font-bold text-[#1e3a5f]">Loan Policies</h1>
        <button className="mt-3 bg-[#1cbdc1] text-white px-4 py-2 border-none rounded-[10px] cursor-pointer text-[17px] font-bold mr-4" onClick={handleAddNew}>
          Add New Term
        </button>
        {isReading && (
          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {policy.map((policies, index) => (
              <Card
                key={index}
                className="border border-[#b0bec5] transition-transform duration-300 ease-in-out hover:shadow-lg hover:bg-[#d0e8f2] rounded-[10px] shadow-md font-roboto"
              >
                <CardBody>
                  <CardTitle className="text-[#333] text-xl font-semibold">{policies.title}</CardTitle>
                  <CardText className="text-[#090909] text-md">{policies.description}</CardText>
                  <button 
                    className="mt-2 bg-[#1cbdc1] text-white px-3 py-1 rounded-md cursor-pointer font-semibold mr-6"
                    onClick={() => handleEdit(index)}
                  >
                    Edit
                  </button>
                  <button 
                    className="mt-2 bg-red-500 text-white px-3 py-1 rounded-md cursor-pointer font-semibold"
                    onClick={() => handleDelete(index)}
                  >
                    Delete
                  </button>
                </CardBody>
              </Card>
            ))}
          </div>
        )}

        {(isEditing || isAdding) && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="p-6 bg-white rounded-lg shadow-lg w-96 relative">
              <button 
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl"
                onClick={resetForm}
              >
                &times;
              </button>

              <h2 className="text-xl font-bold text-[#1e3a5f] text-center">
                {isEditing ? `${newTerm.title}` : "Add New Term"}
              </h2>

              <label className="block mt-3 text-lg">Title</label>
              <input 
                className="w-full p-3 rounded-lg border border-gray-300 bg-gray-100 focus:bg-white focus:border-[#1cbdc1] focus:ring-2 focus:ring-[#1cbdc1] outline-none shadow-sm transition-all duration-200"
                type="text"
                placeholder="Enter title"
                value={newTerm.title}
                onChange={(e) => setNewTerm({ ...newTerm, title: e.target.value })}
              />

              <label className="block mt-3 text-lg">Description</label>
              <textarea
                rows={3}
                className="w-full p-3 rounded-lg border border-gray-300 bg-gray-100 focus:bg-white focus:border-[#1cbdc1] focus:ring-2 focus:ring-[#1cbdc1] outline-none shadow-sm transition-all duration-200 resize-none"
                placeholder="Enter description"
                value={newTerm.description}
                onChange={(e) => setNewTerm({ ...newTerm, description: e.target.value })}
              />

              <div className="flex justify-center gap-3 mt-4">
                <button
                  className="bg-[#1cbdc1] text-white px-4 py-2 border-none rounded-lg cursor-pointer text-[17px] font-bold"
                  onClick={isEditing ? handleSaveEdit : handleSaveNew}
                >
                  {isEditing ? "Save Changes" : "Save"}
                </button>
                <button
                  className="bg-[#1cbdc1] text-white px-4 py-2 border-none rounded-lg cursor-pointer text-[17px] font-bold"
                  onClick={resetForm}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Policies;
