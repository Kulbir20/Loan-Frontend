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
  const [loading,setLoading]=useState(true);

  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  const fetchUsers = async (selectedPage) => {
    try {
      setLoading(true)
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
      finally
      {
        setLoading(false)
      }
  };

  const searchUser = async () => {
    if (!selectData || !search) return;
    try {
      setLoading(true)
      const resp = await axios.get("http://localhost:5000/api/admin/searchuser", {
        params: { field: selectData, value: search },
      });

      if (resp.status === 200) {
        setSearchData(resp.data.result);
      }
    } catch (err) {
      console.error("Error fetching data:", err.message);
    }
    finally
    {
      setLoading(false)
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

  
  if (loading) {
    return(
    <div className="flex flex-row text-center justify-center relative top-60 gap-2">
      <div className="w-4 h-4 rounded-full bg-[#E21D27] animate-bounce"></div>
      <div className="w-4 h-4 rounded-full bg-[#E21D27] animate-bounce [animation-delay:-.3s]"></div>
      <div className="w-4 h-4 rounded-full bg-[#E21D27] animate-bounce [animation-delay:-.5s]"></div>
    </div>)
  }


  return (
    <div className="w-full h-full bg-[#FFF6F7] flex flex-col items-center px-4 py-6">

      <h1 className="text-black text-4xl font-bold mb-6 text-center">📋 List of Users</h1>

      <div className="w-full max-w-4xl flex flex-wrap gap-4 justify-center items-center mb-6">
        <select
          value={selectData}
          onChange={(e) => setSelectData(e.target.value)}
          className="bg-[#242224] text-[#FFFFFF] px-2 py-2 rounded-lg w-full sm:w-auto cursor-pointer"
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
            className="border border-black p-2 rounded w-full sm:w-auto placeholder:text-[#242224]"
          />
          <button onClick={searchUser} className="bg-[#242224] text-[#FFFFFF] px-4 py-2 rounded">
            Search
          </button>
        </div>
      </div>


      <div className="w-full max-w-5xl overflow-x-auto">
        <table className="w-full border border-black bg-white rounded-lg min-w-[600px] ">
          <thead className="bg-[#242224] text-[#ffffff] text-center border-collapse">
            <tr>
              <th className="px-4 py-2 border border-white">Serial No.</th>
              <th className="px-4 py-2 border border-white">Full Name</th>
              <th className="px-4 py-2 border border-white">Contact</th>
              <th className="px-4 py-2 border border-white">Email</th>
              <th className="px-4 py-2 border border-white">Pan Card</th>
              <th className="px-4 py-2 border border-white">Adhaar Card</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {(searchdata ? [searchdata] : users).map((item, index) => (
              <tr key={index} className="border-t">
                <td className="px-4 py-2 border border-black">{(page - 1) * itemsPerPage + index + 1}</td>
                <td className="px-4 py-2 border border-black">{item.fullName}</td>
                <td className="px-4 py-2 border border-black">{item.phoneNumber}</td>
                <td className="px-4 py-2 border border-black">{item.email}</td>
                <td className="px-4 py-2 border border-black">
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
            className="bg-[#242224] text-[#FFFFFF] px-4 py-2 rounded cursor-pointer"
            disabled={page === 1}
          >
            Prev
          </button>
          <button
            onClick={() => setPage((prev) => (prev < totalPages ? prev + 1 : prev))}
            className="bg-[#242224] text-[#FFFFFF] px-4 py-2 rounded cursor-pointer"
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
