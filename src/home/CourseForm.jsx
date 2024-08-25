import axios from "axios";
import { useEffect, useState } from "react";

function CourseForm() {

  const [courses, setCourses] = useState([]);
  
  // State for the course form
  const [courseTitle, setCourseTitle] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  
  // State for the course instance form
  const [year, setYear] = useState("");
  const [semester, setSemester] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  
  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/courses/');
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  // Function to handle adding course
  const handleAddCourse = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/courses/', {
        title: courseTitle,
        code: courseCode,
        description: courseDescription,
      });
      console.log('Course added:', response.data);
      // Clear form fields
      setCourseTitle('');
      setCourseCode('');
      setCourseDescription('');
      // Refresh course list
      fetchCourses();
    } catch (error) {
      console.error('Error adding course:', error);
    }
  };

  // Function to handle adding instance
  const handleAddInstance = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/instances/', {
        course_id: selectedCourse,
        year: parseInt(year),
        semester: parseInt(semester),
      });
      console.log('Instance added:', response.data);
      // Clear form fields
      setSelectedCourse('');
      setYear('');
      setSemester('');
    } catch (error) {
      console.error('Error adding instance:', error);
    }
  };

  return (
    <div className="container mx-auto p-4 mt-12 w-2/3 flex flex-col items-center justify-center">
      <div className="grid grid-cols-2 gap-8">
        {/* Course Form */}
        <div>
          <input
            type="text"
            placeholder="Course title"
            value={courseTitle}
            onChange={(e) => setCourseTitle(e.target.value)}
            className="w-full p-2 mb-2 border rounded border-zinc-200"
          />
          <input
            type="text"
            placeholder="Course code"
            value={courseCode}
            onChange={(e) => setCourseCode(e.target.value)}
            className="w-full p-2 mb-2 border rounded border-zinc-200"
          />
          <input
            type="text"
            placeholder="Course description"
            value={courseDescription}
            onChange={(e) => setCourseDescription(e.target.value)}
            className="w-full p-2 mb-2 border rounded border-zinc-200"
          />
          <button 
            onClick={handleAddCourse} 
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-32 mt-2"
          >
            Add course
          </button>
        </div>

        {/* Instance Form */}
        <div className="flex flex-col space-y-3">
          <div className="flex items-center justify-center gap-12">
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="w-full p-2 mb-2 border rounded"
          >
            <option value="">Select course</option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.title} ({course.code})
              </option>
            ))}
          </select>
          <button 
            onClick={fetchCourses}
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 mb-2 "
          >
            Refresh
          </button>
          </div>
          <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="w-72 p-2 mb-2 border rounded border-zinc-200"
          />
          <input
            type="text"
            placeholder="Semester"
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            className="w-72 p-2 mb-2 border rounded border-zinc-200"
          />
          </div>
          <button 
            onClick={handleAddInstance}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-32"
          >
            Add instance
          </button>
        </div>
      </div>
    </div>
  );
}

export default CourseForm;
