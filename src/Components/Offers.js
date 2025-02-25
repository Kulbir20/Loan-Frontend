import { useState } from "react";
import { Card, CardBody, CardText, CardTitle} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Offers = () => {
  const loanOffers = {
    "Personal Loan": [
      { name: "Low Interest Personal Loan", rate: "10.5%", tenure: "5 Years" },
      { name: "Instant Personal Loan", rate: "12%", tenure: "3 Years" },
    ],
    "Home Loan": [
      { name: "Affordable Home Loan", rate: "8.5%", tenure: "15 Years" },
      { name: "Quick Home Loan", rate: "9%", tenure: "10 Years" },
    ],
  };

  const [selectedLoan, setSelectedLoan] = useState("Personal Loan");
  const [offers, setOffers] = useState(loanOffers["Personal Loan"]);
  const navigate=useNavigate();

  const handleLoanChange = (event) => {
    const selectedType = event.target.value;
    setSelectedLoan(selectedType);
    setOffers(loanOffers[selectedType]);
  };

  const AddCondition=()=>
  {
    navigate("/loanoffers");
  }

  return (
    <div className=" mt-4 min-h-screen">
      <div className="mx-auto p-2 relative">
        <h1>Select Loan Type</h1>
        <select value={selectedLoan} onChange={handleLoanChange} className="relative p-2 bg-[#1cbdc1]  font-bold text-white rounded-md outline-none cursor-pointer mr-16 mt-2">
          {Object.keys(loanOffers).map((loanType) => (
            <option key={loanType} value={loanType}>
              {loanType}
            </option>
          ))}
        </select>
        <button className="bg-[#1cbdc1] text-white px-4 py-2 border-none rounded-[10px] cursor-pointer text-[17px] font-bold relative " onClick={AddCondition}>Add More</button>
      </div>


      <div className="mt-3 flex">
        {offers.map((offer, index) => (
          <Card key={index} className="ml-8 mb-3 w-80 transition-transform duration-300 ease-in-out hover:shadow-lg hover:bg-blue-100 cursor-pointer rounded-[10px] shadow-md border-none font-roboto" >
            <CardBody >
              <CardTitle>{offer.name}</CardTitle>
              <CardText>
                <strong>Interest Rate:</strong> {offer.rate} <br />
                <strong>Tenure:</strong> {offer.tenure}
              </CardText>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Offers;
