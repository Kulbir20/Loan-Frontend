import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

const signupData = [
  { date: '2025-02-25', count: 5 },
  { date: '2025-02-26', count: 12 },
  { date: '2025-02-27', count: 8 },
  { date: '2025-02-28', count: 20 },
  { date: '2025-03-01', count: 15 },
  { date: '2025-03-02', count: 40 },
  { date: '2025-03-03', count: 30 },
  { date: '2025-03-04', count: 10 },
  { date: '2025-03-05', count: 50 },
];

const loanApplicationsData = [
  { date: '2025-02-25', homeLoans: 2, carLoans: 1, personalLoans: 1, educationLoans: 1 },
  { date: '2025-02-26', homeLoans: 5, carLoans: 2, personalLoans: 3, educationLoans: 2 },
  { date: '2025-02-27', homeLoans: 4, carLoans: 1, personalLoans: 2, educationLoans: 1 },
  { date: '2025-02-28', homeLoans: 10, carLoans: 5, personalLoans: 3, educationLoans: 2 },
  { date: '2025-03-01', homeLoans: 6, carLoans: 4, personalLoans: 3, educationLoans: 2 },
  { date: '2025-03-02', homeLoans: 2, carLoans: 10, personalLoans: 5, educationLoans: 5 },
  { date: '2025-03-03', homeLoans: 1, carLoans: 8, personalLoans: 5, educationLoans: 5 },
  { date: '2025-03-04', homeLoans: 4, carLoans: 3, personalLoans: 2, educationLoans: 1 },
  { date: '2025-03-05', homeLoans: 5, carLoans: 15, personalLoans: 5, educationLoans: 5 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const DailyReport = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [period, setPeriod] = useState('daily');

  const filterDataByDateRange = (data) => {
    const startDateObj = startDate ? new Date(startDate) : null;
    const endDateObj = endDate ? new Date(endDate) : null;
    return data.filter((item) => {
      const itemDate = new Date(item.date);
      return (
        (startDateObj ? itemDate >= startDateObj : true) &&
        (endDateObj ? itemDate <= endDateObj : true)
      );
    });
  };

  const getLoanApplicationsData = () => filterDataByDateRange(loanApplicationsData);
  const getSignupData = () => filterDataByDateRange(signupData);

  const data = getLoanApplicationsData();
  const signupFilteredData = getSignupData();

  const loanData = [
    { name: 'Home Loans', value: data.reduce((sum, item) => sum + item.homeLoans, 0) },
    { name: 'Car Loans', value: data.reduce((sum, item) => sum + item.carLoans, 0) },
    { name: 'Personal Loans', value: data.reduce((sum, item) => sum + item.personalLoans, 0) },
    { name: 'Education Loans', value: data.reduce((sum, item) => sum + item.educationLoans, 0) },
  ];

  return (
    <div className="p-6 bg-[#FFF6F7] min-h-screen">
      <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
        <div className="bg-white shadow-lg p-6 rounded-lg flex-1">
          <h3 className="text-lg font-semibold mb-4">Daily Signup User Count</h3>
          <div className="mb-4 flex flex-col sm:flex-row sm:items-center gap-4">
            <div>
              <label className="font-semibold mr-2">Start Date:</label>
              <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="border border-black rounded-md p-2" />
            </div>
            <div>
              <label className="font-semibold mr-2">End Date:</label>
              <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="border border-black rounded-md p-2" />
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={signupFilteredData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" tickFormatter={(date) => new Date(date).toLocaleDateString()} />
              <YAxis />
              <Tooltip labelFormatter={(label) => new Date(label).toLocaleDateString()} />
              <Line type="monotone" dataKey="count" stroke="#ff7300" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white shadow-lg p-6 rounded-lg flex-1">
          <h3 className="text-lg font-semibold mb-4">Loan Applications</h3>
          <div className="mb-4">
            <label className="font-semibold mr-2">Select Time Period:</label>
            <select className="border rounded-md p-2" value={period} onChange={(e) => setPeriod(e.target.value)}>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={loanData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} fill="#8884d8" paddingAngle={5} dataKey="value" label>
                {loanData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend layout="vertical" align="right" verticalAlign="top" />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DailyReport;
