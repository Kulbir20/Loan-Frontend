import axios from "axios";
import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const LoanUsers = () => {

  const userdata=["fullName","phoneNumber","email","panNumber","aadharNumber"]
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [visible, setVisible] = useState({});
  const itemsPerPage = 10;
  const [searchdata, setSearchData] = useState("");
  const [search, setSearch] = useState("");
  const [dropDowndata, setDropDownData] = useState(userdata);
  const [selectData, setSelectData] = useState("");

  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  const fetchUsers = async (selectedPage) => {
    try {
      const token = localStorage.getItem("token");
      const resp = await axios.get(
        `http://localhost:5000/api/admin/getusers?page=${selectedPage}&limit=${itemsPerPage}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (resp.status === 200) {
        setUsers(resp.data.result);
        setTotalPages(resp.data.totalPages);
      }
    } catch (err) {
      console.error("Error fetching users:", err.message);
    }
  };

  const searchUser = async () => {
    if (!selectData || !search) return;
    try {
      const resp = await axios.get("http://localhost:5000/api/admin/searchuser", {
        params: { field: selectData, value: search },
      });

      if (resp.status === 200) {
        setSearchData(resp.data.result);
      }
    } catch (err) {
      console.error("Error fetching data:", err.message);
    }
  };

  const toggleVisibility = (index, field) => {
    setVisible((prev) => ({
      ...prev,
      [index]: {
        ...prev[index],
        [field]: !prev[index]?.[field]
      },
    }));
  };


  return (
    <div className="w-full h-full bg-gradient-to-b from-[#5a7884] to-[#1f4959] flex flex-col items-center px-4 py-6">

      <h1 className="text-white text-4xl font-bold mb-6 text-center">📋 List of Users</h1>

      <div className="w-full max-w-4xl flex flex-wrap gap-4 justify-center items-center mb-6">
        <select
          value={selectData}
          onChange={(e) => setSelectData(e.target.value)}
          className="bg-[#1cbdc1] hover:bg-[#159a9d] text-black px-2 py-2 rounded-lg w-full sm:w-auto"
        >
          <option value="">Select User</option>
          {dropDowndata.length > 0 ? (
            dropDowndata.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))
          ) : (
            <option disabled>No Data Available</option>
          )}
        </select>

        <div className="flex gap-2 w-full sm:w-auto">
          <input
            type="search"
            name="search"
            placeholder="Enter User Name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="p-2 rounded border border-gray-300 w-full sm:w-auto"
          />
          <button onClick={searchUser} className="bg-[#1cbdc1] text-black px-4 py-2 rounded">
            Search
          </button>
        </div>
      </div>


      <div className="w-full max-w-5xl overflow-x-auto">
        <table className="w-full border border-gray-300 bg-white rounded-lg min-w-[600px] ">
          <thead className="bg-gray-800 text-white text-center border-collapse">
            <tr>
              <th className="px-4 py-2">Serial No.</th>
              <th className="px-4 py-2">Full Name</th>
              <th className="px-4 py-2">Contact</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Pan Card</th>
              <th className="px-4 py-2">Adhaar Card</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {(searchdata ? [searchdata] : users).map((item, index) => (
              <tr key={index} className="border-t">
                <td className="px-4 py-2">{(page - 1) * itemsPerPage + index + 1}</td>
                <td className="px-4 py-2">{item.fullName}</td>
                <td className="px-4 py-2">{item.phoneNumber}</td>
                <td className="px-4 py-2">{item.email}</td>
                <td className="px-4 py-2">
                  {visible[index]?.panNumber ? item.panNumber : "****"}
                  <button className="ml-2" onClick={() => toggleVisibility(index, "panNumber")}>
                    {visible[index]?.panNumber ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </td>

                <td className="px-4 py-2">
                  {visible[index]?.aadharNumber ? item.aadharNumber : "****"}
                  <button className="ml-2" onClick={() => toggleVisibility(index, "aadharNumber")}>
                    {visible[index]?.aadharNumber ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>


      {!searchdata && (
        <div className="flex gap-4 mt-4">
          <button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            className="bg-[#1cbdc1] text-black px-4 py-2 rounded"
            disabled={page === 1}
          >
            Prev
          </button>
          <button
            onClick={() => setPage((prev) => (prev < totalPages ? prev + 1 : prev))}
            className="bg-[#1cbdc1] text-black px-4 py-2 rounded"
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default LoanUsers;
