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

const pieData = [
  { name: 'Home Loans', value: 400 },
  { name: 'Car Loans', value: 300 },
  { name: 'Personal Loans', value: 300 },
  { name: 'Education Loans', value: 200 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const DailyReport = () => {
  return (
    <div className="p-6 bg-[#FFF6F7] h-full">
      <div className="flex space-x-6">
        <div className="bg-white shadow-lg p-6 rounded-lg flex-1">
          <h3 className="text-lg font-semibold mb-4">Daily Signup User Count</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={signupData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" tickFormatter={(date) => new Date(date).toLocaleDateString()} />
              <YAxis />
              <Tooltip labelFormatter={(label) => new Date(label).toLocaleDateString()} />
              <Line type="monotone" dataKey="count" stroke="#ff7300" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white shadow-lg p-6 rounded-lg flex-1">
          <h3 className="text-lg font-semibold mb-4">Loan Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend
                layout="vertical"
                align="right"
                verticalAlign="top"
                wrapperStyle={{
                  paddingTop: '10px',
                  paddingRight: '10px',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DailyReport;
