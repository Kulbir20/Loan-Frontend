import { useState } from "react";
import { Card, CardBody, CardText, CardTitle } from "react-bootstrap";

const Terms = () => {
  const initialTerms = [
    { title: "Privacy Policy", description: "We do not share your data with third parties." },
    { title: "Refund Policy", description: "Refunds are processed within 7 business days." },
  ];

  const [tnc, setTNc] = useState(initialTerms);
  const [newTerm, setNewTerm] = useState({ title: "", description: "" });
  const [editingIndex, setEditingIndex] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isReading, setIsReading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);

  const handleEdit = (index) => {
    setEditingIndex(index);
    setNewTerm(tnc[index]);
    setIsEditing(true);
    setIsReading(false);
    setIsAdding(false);
  };

  const handleSaveEdit = () => {
    const updatedTerms = [...tnc];
    updatedTerms[editingIndex] = newTerm;
    setTNc(updatedTerms);
    resetForm();
  };

  const handleAddNew = () => {
    setNewTerm({ title: "", description: "" });
    setIsAdding(true);
    setIsEditing(false);
    setIsReading(false);
  };

  const handleSaveNew = () => {
    setTNc([...tnc, newTerm]);
    resetForm();
  };

  const handleDelete = (index) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this FAQ?");
    if (confirmDelete) {
      setTNc(tnc.filter((_, i) => i !== index));
    }
  };
  const resetForm = () => {
    setNewTerm({ title: "", description: "" });
    setEditingIndex(null);
    setIsEditing(false);
    setIsReading(true);
    setIsAdding(false);
  };

  return (
    <div className="h-full p-4 bg-[#FFF6F7]">
      <div className="mx-auto p-2 relative">
        <h1 className="text-3xl font-bold text-[#1e3a5f]">Terms & Conditions</h1>
        <button className="mt-3 bg-[#242224] text-[#FFFFFF] px-4 py-2 border-none rounded-[10px] cursor-pointer text-[17px] font-bold mr-4" onClick={handleAddNew}>
          Add New Term
        </button>
        {isReading && (
          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tnc.map((terms, index) => (
              <Card
                key={index}
                className=" ml-4 border border-black shadow-md p-2 mb-3 w-full sm:w-80 lg:w-72 hover:scale-105 transition-transform duration-300 ease-in-out rounded-[10px] font-roboto"
              >
                <CardBody>
                  <CardTitle className="text-[#333] text-xl font-semibold">{terms.title}</CardTitle>
                  <CardText className="text-[#090909]"><strong>Description:</strong> {terms.description}</CardText>
                  <button 
                    className="mt-2 bg-[#242224] text-[#FFFFFF] px-3 py-1 rounded-md cursor-pointer font-semibold mr-6"
                    onClick={() => handleEdit(index)}
                  >
                    Edit
                  </button>
                  <button 
                    className="mt-2 bg-[#E21D27] text-[#FFFFFF] px-3 py-1 rounded-md cursor-pointer font-semibold"
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
                className="w-full p-3 rounded-lg border border-black placeholder:text-[#242224] bg-gray-100 focus:bg-white focus:border-[#1cbdc1] focus:ring-2 focus:ring-[#1cbdc1] outline-none shadow-sm transition-all duration-200"
                type="text"
                placeholder="Enter title"
                value={newTerm.title}
                onChange={(e) => setNewTerm({ ...newTerm, title: e.target.value })}
              />

              <label className="block mt-3 text-lg">Description</label>
              <textarea
                rows={3}
                className="w-full p-3 rounded-lg border border-black placeholder:text-[#242224] bg-gray-100 focus:bg-white focus:border-[#1cbdc1] focus:ring-2 focus:ring-[#1cbdc1] outline-none shadow-sm transition-all duration-200 resize-none"
                placeholder="Enter description"
                value={newTerm.description}
                onChange={(e) => setNewTerm({ ...newTerm, description: e.target.value })}
              />

              <div className="flex justify-center gap-3 mt-4">
                <button
                  className="bg-[#242224] text-[#FFFFFF] px-4 py-2 border-none rounded-lg cursor-pointer text-[17px] font-bold"
                  onClick={isEditing ? handleSaveEdit : handleSaveNew}
                >
                  {isEditing ? "Save Changes" : "Save"}
                </button>
                <button
                  className="bg-[#E21D27] text-[#FFFFFF] px-4 py-2 border-none rounded-lg cursor-pointer text-[17px] font-bold"
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

export default Terms;
