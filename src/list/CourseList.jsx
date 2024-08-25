import { useEffect, useState } from "react";
import viewIcon from "../assets/search.png";
import deleteIcon from "../assets/trash.png";
import axios from "axios";

const CourseList = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/courses/");
      setCourses(response.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const handleView = (title) => {
    alert("Viewing course: " + title);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      try {
        await axios.delete(`http://localhost:8000/api/courses/${id}/`);
        setCourses(courses.filter((course) => course.id !== id));
      } catch (error) {
        console.error("Error deleting course:", error);
      }
    }
  };

  return (
    <div className="container mx-auto p-4 w-2/3 flex flex-col items-center justify-center py-20">
    <button 
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-4 w-full"
        onClick={fetchCourses}
    >
        List courses
    </button>
    <table className="w-full border-collapse">
        <thead>
            <tr className="bg-blue-400 text-white">
                <th className="p-2 text-left">Course Title</th>
                <th className="p-2 text-left">Code</th>
                <th className="p-2 text-left">Action</th>
            </tr>
        </thead>
        <tbody>
            {courses.map((course) => (
                <tr key={course.id} className={`{index % 2 === 0 ? 'bg-white' : 'bg-blue-100'} border border-gray-200`}>
                    <td className="p-2">{course.title}</td>
                    <td className="p-2">{course.code}</td>
                    <td className="p-2">
                        <button
                            className="mr-2 p-1 bg-gray-200 rounded"
                            onClick={() => handleView(course.id)}
                        >
                            <img src={viewIcon} alt="View Course" className="h-4 w-4" />
                        </button>
                        <button
                            className="p-1 bg-gray-200 rounded"
                            onClick={() => handleDelete(course.id)}
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

export default CourseList;
