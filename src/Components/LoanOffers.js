import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoanOffers = () => {
    const [loanName, setLoanName] = useState("");
    const [type, setType] = useState("");
    const [maxAmount, setMaxAmount] = useState("");
    const [interestRate, setInterestRate] = useState("");
    const [emiSchedule, setEmiSchedule] = useState("");
    const [conditions, setConditions] = useState([{ condition: "", value: "" }]);
    const navigate=useNavigate();

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

    const addedCondition=()=>
    {
        navigate("/offers")
    }

    return (
        <div className="min-h-screen flex justify-center items-center bg-gradient-to-b from-[#2e425b] to-[#182c45]">
            <div className="bg-white/20 bg-opacity-20 p-4 rounded-lg shadow-md flex flex-col gap-2 w-96 text-center border border-white/30">
                <h3 className="text-light text-lg font-semibold">Loan Offers</h3>
                <input
                    type="text"
                    name="loanname"
                    value={loanName}
                    onChange={(e) => setLoanName(e.target.value)}
                    required
                    placeholder="Loan Name"
                    className="w-full p-2 bg-white bg-opacity-20 text-black rounded-md outline-none placeholder:text-black"
                />
                <select
                    name="type"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    required
                    className="w-full p-2 bg-white text-black rounded-md outline-none placeholder:text-black"
                >
                    <option value="" className="bg-teal-500 ">Select Loan Type</option>
                    {LoanType.map((item, index) => (
                        <option className="bg-teal-500" key={index} value={item}>{item}</option>
                    ))}
                </select>
                <input
                    type="text"
                    name="maxamount"
                    value={maxAmount}
                    onChange={(e) => setMaxAmount(e.target.value)}
                    required
                    placeholder="Max Amount"
                    className="w-full p-2 bg-white bg-opacity-20 text-black rounded-md outline-none placeholder:text-black"
                />
                <input
                    type="text"
                    name="interest"
                    value={interestRate}
                    onChange={(e) => setInterestRate(e.target.value)}
                    required
                    placeholder="Interest Rate"style={{color:"black"}}
                    className="w-full p-2 bg-white bg-opacity-20 text-black rounded-md outline-none placeholder:text-black"
                />
                <select
                    name="emi"
                    value={emiSchedule}
                    onChange={(e) => setEmiSchedule(e.target.value)}
                    required
                    className="w-full p-2 bg-white bg-opacity-20 text-black rounded-md outline-none placeholder:text-black"
                >
                    <option value="" className="bg-teal-500">Select EMI Schedule</option>
                    {Emi.map((item, index) => (
                        <option className="bg-teal-500" key={index} value={item}>{item}</option>
                    ))}
                </select>

                <div className="text-left text-white">
                    <p className="text-center">Enter Eligibility</p>
                    {conditions.map((item, index) => (
                        <div key={index} className="mt-2">
                            <input
                                name="condition"
                                value={item.condition}
                                onChange={(e) => handleConditionChange(index, "condition", e.target.value)}
                                required
                                placeholder="Condition"
                                className="w-full p-2 bg-white bg-opacity-20 text-black rounded-md outline-none mt-1 placeholder:text-black"
                            />
                            <input
                                name="value"
                                value={item.value}
                                onChange={(e) => handleConditionChange(index, "value", e.target.value)}
                                required
                                placeholder="Value"
                                className="w-full p-2 bg-white bg-opacity-20 text-black rounded-md outline-none mt-2 placeholder:text-black mb-3"
                            />
                        </div>
                    ))}
                </div>

                <button 
                    onClick={addCondition} 
                    className="bg-teal-500 text-white py-2 rounded-full text-sm font-semibold transition duration-300 hover:bg-teal-700"
                >
                    Add More Conditions
                </button>

                <button onClick={addedCondition} className="bg-teal-500 text-white py-3 rounded-full text-sm font-bold transition duration-300 hover:bg-teal-700 mt-2">
                    Submit
                </button>
            </div>
        </div>
    );
};

export default LoanOffers;
