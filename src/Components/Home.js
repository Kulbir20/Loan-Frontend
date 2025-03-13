import { Users, Activity } from "lucide-react";
import { Card, CardBody, CardText } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [data, setData] = useState({});
  const [users, setUsers] = useState({});
  const [viewData, setViewData] = useState({
    totalUsers: "month",
    verifiedUsers: "month",
    instantLoanUsers: "month",
    churnUsers: "month",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleToggle = (cardKey) => {
    setViewData((prev) => ({
      ...prev,
      [cardKey]: prev[cardKey] === "month" ? "year" : "month",
    }));
  };

  const dashboardData = async () => {
    try {
      const resp = await axios.get("http://localhost:5000/api/admin/getdashboard");
      console.log(resp.data);

      const { result } = resp.data;
      const cleanedData = { ...result };
      delete cleanedData.users;

      setData(cleanedData);
      setUsers(result.users);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching dashboard data", err);
      // setError("Error fetching data");
      setLoading(false);
    }
  };


  useEffect(() => {
    dashboardData();
  }, []);

  if (loading) {
    return(
    <div className="flex flex-row text-center justify-center relative top-60 gap-2">
      <div className="w-4 h-4 rounded-full bg-[#E21D27] animate-bounce"></div>
      <div className="w-4 h-4 rounded-full bg-[#E21D27] animate-bounce [animation-delay:-.3s]"></div>
      <div className="w-4 h-4 rounded-full bg-[#E21D27] animate-bounce [animation-delay:-.5s]"></div>
    </div>)
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="p-8 bg-[#FFF6F7] h-full">
      <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {Object.entries(data).map(([key, { month, year }]) => (
          <Card key={key} className="text-white rounded-lg shadow-xl hover:scale-105 transition-transform duration-300">
            <CardBody className="flex flex-col justify-between p-6">
              <div className="flex justify-between">
                <button
                  className={`px-4 py-2 text-sm font-semibold rounded-full transition-all duration-300 border ${viewData[key] === "month" ? "bg-[#E21D27] text-[#FFFFFF]" : "text-[#FFFFFF] bg-[#242224] border border-white"
                    }`}
                  onClick={() => handleToggle(key)}
                >
                  Month
                </button>
                <button
                  className={`px-4 py-2 text-sm font-semibold rounded-full transition-all duration-300 border ${viewData[key] === "year" ? "bg-[#E21D27] text-[#FFFFFF]" : "text-[#FFFFFF] bg-[#242224] border border-white"
                    }`}
                  onClick={() => handleToggle(key)}
                >
                  Year
                </button>
              </div>
              <div className="flex flex-col items-start mt-4">
                <Users className="mb-2 bg-[#E21D27] p-1 rounded-2xl w-7 h-7" />
                <CardText className="text-4xl text-[#242224] font-bold">
                  {viewData[key] === "month" ? month : year}
                </CardText>
                <CardText className="text-sm opacity-80 mt-1 capitalize text-[#242224]">
                  {key.replace(/([A-Z])/g, " $1")}
                </CardText>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {Object.entries(users).map(([key, value], index) => (
          <Card key={index} className="bg-white rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <CardBody className="flex items-center justify-between px-6 py-4">
              <div className="flex items-center space-x-4 text-gray-800">
                {key === "loanCategoryClicks" ? (
                  <Activity className="bg-[#E21D27] text-white p-1 w-6 h-6 rounded-full" />
                ) : (
                  <Users className="bg-[#E21D27] text-white w-6 h-6 p-1 rounded-full" />
                )}
                <CardText className="text-3xl font-semibold">{value}</CardText>
              </div>
              <CardText className="text-xs capitalize text-gray-600">{key.replace(/([A-Z])/g, " $1")}</CardText>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Home;
