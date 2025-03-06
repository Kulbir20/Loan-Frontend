import { useState } from "react";
import { Card, CardBody, CardText, CardTitle } from "react-bootstrap";
import { toast } from "react-toastify";

const FAQ = () => {
  const Queries = [
    { questions: "What types of loans do you offer?", answers: "We offer home loans, car loans, personal loans, and business loans." },
    { questions: "How do I apply for a loan?", answers: "You can apply through our mobile app or website by filling out a simple application form." },
    { questions: "What is the minimum and maximum loan amount I can apply for?", answers: "The loan amount depends on the type of loan and your eligibility." },
    { questions: "How long does it take to process a loan application?", answers: "Loan processing usually takes 24-72 hours, depending on the type of loan and required verification." },
  ];

  const [faq, setFaq] = useState(Queries);
  const [newTerm, setNewTerm] = useState({ questions: "", answers: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [isReading, setIsReading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddNew = () => {
    setNewTerm({ questions: "", answers: "" });
    setIsAdding(true);
    setIsEditing(false);
    setIsReading(false);
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setNewTerm(faq[index]);
    setIsEditing(true);
    setIsReading(false);
    setIsAdding(false);
  };

  const handleSaveEdit = () => {
    const updatedTerms = [...faq];
    updatedTerms[editingIndex] = newTerm;
    setFaq(updatedTerms);
    resetForm();
  };

  const handleSaveNew = () => {
    if (!newTerm.questions.trim() || !newTerm.answers.trim()) {
      toast.info("Please enter both question and answer.");
      return;
    }

    setFaq([...faq, newTerm]);
    resetForm();
  };

  const handleDelete = (index) => {
    const queryToDelete = faq[index].questions;
    const confirmDelete = window.confirm(`Are you sure you want to delete the FAQ: "${queryToDelete}"?`);
    if (confirmDelete) {
      setFaq(faq.filter((_, i) => i !== index));
    }
  };

  const resetForm = () => {
    setNewTerm({ questions: "", answers: "" });
    setIsEditing(false);
    setIsReading(true);
    setIsAdding(false);
  };

  return (
    <div className="h-full p-4 bg-[#FFF6F7]">
      <div className="mx-auto p-2 relative">
        <h1 className="text-3xl font-bold text-[#1e3a5f]">Facts & Questions</h1>
        <button
          className="mt-3 bg-[#242224] text-[#ffffff] px-4 py-2 border-none rounded-[10px] cursor-pointer text-[17px] font-bold mr-4"
          onClick={handleAddNew}
        >
          Add New
        </button>

        {isReading && (
          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-center">
            {faq.map((query, index) => (
              <Card
                key={index}
                className="ml-2 border border-black shadow-md w-full transition-transform duration-300 ease-in-out rounded-[10px]  font-roboto"
              >
                <CardBody>
                  <CardTitle className="text-[#333] text-xl font-semibold">
                    <strong>Question:</strong> {query.questions}
                  </CardTitle>
                  <CardText className="text-[#090909]">
                    <strong>Answer:</strong> {query.answers}
                  </CardText>
                  <button
                    className="mt-2 bg-[#242224] text-[#ffffff] px-3 py-1 rounded-md cursor-pointer mr-6 font-semibold"
                    onClick={() => handleEdit(index)}
                    aria-label={`Edit FAQ for "${query.questions}"`}
                  >
                    Edit
                  </button>
                  <button
                    className="mt-2 bg-[#E21D27] text-[#ffffff] px-3 py-1 rounded-md cursor-pointer font-semibold"
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
            <div className="p-6 bg-white rounded-lg shadow-lg w-full sm:w-80 md:w-96 lg:w-[500px] relative">
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl"
                onClick={resetForm}
              >
                &times;
              </button>

              <h2 className="text-xl font-bold text-[#1e3a5f] text-center">
                {isEditing ? `${newTerm.questions}` : "Add New FAQ"}
              </h2>

              <label className="block mt-3 text-lg">Question</label>
              <input
                className="w-full p-3 rounded-lg border border-black placeholder:text-[#242224] bg-gray-100 focus:bg-white focus:border-[#1cbdc1] focus:ring-2 focus:ring-[#1cbdc1] outline-none shadow-sm transition-all duration-200"
                type="text"
                placeholder="Enter question"
                value={newTerm.questions}
                onChange={(e) => setNewTerm({ ...newTerm, questions: e.target.value })}
              />

              <label className="block mt-3 text-lg">Answer</label>
              <textarea
                rows={3}
                className="w-full p-3 rounded-lg border border-black placeholder:text-[#242224] bg-gray-100 focus:bg-white focus:border-[#1cbdc1] focus:ring-2 focus:ring-[#1cbdc1] outline-none shadow-sm transition-all duration-200 resize-none"
                placeholder="Enter answer"
                value={newTerm.answers}
                onChange={(e) => setNewTerm({ ...newTerm, answers: e.target.value })}
              />

              <div className="flex justify-center gap-3 mt-4">
                <button
                  className={`bg-[#242224] text-[#ffffff] px-4 py-2 border-none rounded-lg cursor-pointer text-[17px] font-bold ${!newTerm.questions || !newTerm.answers ? "opacity-50 cursor-not-allowed" : ""}`}
                  onClick={isEditing ? handleSaveEdit : handleSaveNew}
                  disabled={!newTerm.questions.trim() || !newTerm.answers.trim()}
                >
                  {isEditing ? "Save Changes" : "Save"}
                </button>
                <button
                  className="bg-[#E21D27] text-[#ffffff] px-4 py-2 border-none rounded-lg cursor-pointer text-[17px] font-bold"
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

export default FAQ;
