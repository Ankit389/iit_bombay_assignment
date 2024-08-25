import axios from "axios";
import { useEffect, useState } from "react";
import viewIcon from "../assets/search.png";
import deleteIcon from "../assets/trash.png";

const ListInstance = () => {
  const [instances, setInstances] = useState([]);
  const [year, setYear] = useState("");
  const [semester, setSemester] = useState("");

  useEffect(() => {
    fetchInstances();
  }, []);

  const fetchInstances = async () => {
    try {
      let url = "http://localhost:8000/api/instances/";
      if (year && semester) {
        url += `${year}/${semester}/`;
      }
      const response = await axios.get(url);
      setInstances(response.data);
    } catch (error) {
      console.error("Error fetching instances:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this instance?")) {
      try {
        await axios.delete(`http://localhost:8000/api/instances/${id}/`);
        setInstances(instances.filter((instance) => instance.id !== id));
      } catch (error) {
        console.error("Error deleting instance:", error);
      }
    }
  };

  return (
    <div className="container mx-auto p-4 py-20 w-2/3 flex flex-col items-start justify-center">
      <div className="flex mb-4">
        <input 
          type="text" 
          placeholder="Year" 
          className="p-2 border rounded mr-2"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
        <select 
          className="p-2 border rounded mr-2"
          value={semester}
          onChange={(e) => setSemester(e.target.value)}
        >
          <option value="">Select semester</option>
            {instances.map((instance) => (
              <option key={instance.id} value={instance.id}>
                 {instance.semester}
              </option>
            ))}
        </select>
        <button 
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={fetchInstances}
        >
          List instances
        </button>
      </div>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-blue-400 text-white">
            <th className="p-2 text-left">Course Title</th>
            <th className="p-2 text-left">Year-Sem</th>
            <th className="p-2 text-left">Code</th>
            <th className="p-2 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {instances.map((instance) => (
            <tr key={instance.id} className={`{index % 2 === 0 ? 'bg-white' : 'bg-blue-100'} border border-gray-200`}>
              <td className="p-2">{instance.course.title}</td>
              <td className="p-2">{`${instance.year}-${instance.semester}`}</td>
              <td className="p-2">{instance.course.code}</td>
              <td className="p-2">
                <button 
                  className="mr-2 p-1 bg-gray-200 rounded"
                  onClick={() => alert(`Viewing instance: ${instance.id}`)}
                >
                   <img src={viewIcon} alt="View Course" className="h-4 w-4" />
                </button>
                <button 
                  className="p-1 bg-gray-200 rounded"
                  onClick={() => handleDelete(instance.id)}
                >
                   <img src={deleteIcon} alt="Delete Course" className="h-4 w-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListInstance;
