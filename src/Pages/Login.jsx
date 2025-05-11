import {useState} from 'react';
import { useNavigate } from 'react-router-dom';


export default function Login() {
  const [studentId, setStudentId] = useState("DU0459")
  const [password, setPassword] = useState("12345678")
  const navigate = useNavigate()


  const handleSubmit = (e) => {
    e.preventDefault()
    if (studentId === "DU0459" && password === "12345678") {
      navigate("/dashboard")
    } else {
      alert("Error: Invalid Student ID or Password")
      // navigate("/dashboard")
    }
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Student Login</h2>
        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium">Student ID</label>
            <input
              type="text"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded"
              placeholder="e.g. DU0459"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded"
              placeholder="********"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
            onClick={handleSubmit}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
