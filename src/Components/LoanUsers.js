import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import ReactPaginate from "react-paginate";

const LoanUsers = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [visible, setVisible] = useState({}); 
    const itemsPerPage = 10;
    const [searchdata, setSearchData] = useState('')
    const [search, setSearch] = useState('')
    const [dropDowndata, setDropDownData] = useState([]);
    const [selectData, setSelectData] = useState('');
    const [open, setOpen] = useState(false);

    const fetchUsers = async (selectedPage) => {
        try {
            const resp = await axios.get(`http://localhost:9000/api/user/getusers?page=${selectedPage}&limit=${itemsPerPage}`);
            if (resp.status === 200) {
                setUsers(resp.data.result);
                setTotalPages(resp.data.totalPages);
            } else {
                console.error("Failed to fetch data");
            }
        } catch (err) {
            console.error("Error fetching users:", err.message);
        }
    };

    const searchUser = async () => {
        try {
            const field=selectData;
            const value = search;  
    
            if (!field || !value) {
                console.error("Field and value are required for searching");
                return;
            }
            const queryParams = {
                field: field,
                value: value
            };
    
            const resp = await axios.get('http://localhost:9000/api/user/searchuser', { params: queryParams });
    
            if (resp.status === 200) {
                setSearchData(resp.data.result); 
            } else {
                console.log("Some error occurred while fetching user data.");
            }
        } catch (err) {
            console.error("Error fetching data:", err.message);
        }
    };
    
    
    const userData = async () => {
        try {
            const resp = await axios.get(`http://localhost:9000/api/user/userdata`);
            if (resp.status === 200) {
                setDropDownData(resp.data.result);

            } else {
                console.log("Some error occurred while fetching user data.");
                setDropDownData([])
            }
        } catch (err) {
            console.error("Error fetching data:", err.message);
        }
    };

    useEffect(() => {
        fetchUsers(page);
        userData();
    }, [page]);

    const toggleVisibility = (index, field) => {
        setVisible(prev => ({
            ...prev,
            [index]: { ...prev[index], [field]: !(prev[index]?.[field] || false) }
        }));
    };

    return (    
        <div className="w-full min-h-screen bg-gradient-to-b from-[#5a7884] to-[#1f4959] flex flex-col">

          <div className="dropdown container mx-auto flex-1">
            <div className="dropdown my-4  flex top-[3.8rem] pr-4 relative ">
              <div className="relative dropdown">
              <button className="btn dropdown-toggle !bg-[#1cbdc1] hover:!bg-[#159a9d] text-black   " type="button" id="dropdownMenu2" data-bs-toggle="dropdown" aria-expanded="false" >
                {selectData || "Select User"}
              </button>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenu2" style={{ background: "#1cbdc1" }}>
                {dropDowndata.length > 0 ? (
                  dropDowndata.map((item, index) => (
                    <li key={index}>
                      <button className="dropdown-item" type="button"  onClick={() => setSelectData(item)} >
                        {item}
                      </button>
                    </li>
                  ))
                ) : (
                  <li><button className="dropdown-item" disabled>No Data Available</button></li>
                )}
              </ul>
            </div>
            <div className=" my-4 text-center absolute flex left-[7rem] top-[-1.8rem] ml-6">
              <input type="search" name="search" placeholder="Enter User Name" value={search} onChange={(e) => setSearch(e.target.value)} className="p-2 rounded border border-gray-300" />
              <button onClick={searchUser} className="ml-2 bg-[#1cbdc1] text-black px-4 py-2 rounded">Search</button>
            </div></div>
            <h1 className="text-center text-light mb-8 text-4xl font-bold ml-10 -mt-2 ">📋 List of Users</h1>
            <div className="table-responsive">
              <table className="table table-striped table-hover table-bordered custom-table">
                <thead className="table-dark text-center">
                  <tr>
                    <th>Serial No.</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Contact Number</th>
                    <th>Email</th>
                    <th>Pan Card</th>
                    <th>Adhaar Card</th>
                  </tr>
                </thead>
                <tbody>
                  {(searchdata ? [searchdata] : users).map((item, index) => (
                    <tr key={index} className="table-row">
                      <td>{(page - 1) * itemsPerPage + index + 1}</td>
                      <td>{item.FirstName}</td>
                      <td>{item.LastName}</td>
                      <td>{item.ContactNumber}</td>
                      <td>{item.Email}</td>
                      <td>
                        {visible[index]?.PanCard ? item.PanCard : FaEye}
                        <button className="btn btn-link p-0 ms-2" onClick={() => toggleVisibility(index, 'PanCard')}>
                          {visible[index]?.PanCard ? <FaEyeSlash className="text-black" /> : <FaEye className="text-black" />}
                        </button>
                      </td>
                      <td>
                        {visible[index]?.AdhaarCard ? item.AdhaarCard : FaEye}
                        <button className="btn btn-link p-0 ms-2" onClick={() => toggleVisibility(index, 'AdhaarCard')}>
                          {visible[index]?.AdhaarCard ? <FaEyeSlash className="text-black" /> : <FaEye className="text-black" />}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
    
          {!searchdata && (
            <div className=" justify-between items-center px-4 py-4">
              <button 
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                className="bg-[#1cbdc1] text-black px-4 py-2 rounded shadow "
                disabled={page === 1}
              >
                Prev
              </button>
              <button 
                onClick={() => setPage((prev) => (prev < totalPages ? prev + 1 : prev))}
                className="bg-[#1cbdc1] text-black px-4 py-2 rounded shadow ml-4"
                disabled={page === totalPages}
              >
                Next
              </button>
            </div>
          )}
          
        </div>
      );}

export default LoanUsers;
