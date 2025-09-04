import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
// import WaterDrop from '../components/WaterDrop';
import WaterDrop from '../Components/WaterDrop';
import { DivOrigami } from '../Components/DivOrigami';


export default function Login() {
  const [studentId, setStudentId] = useState("Dominion")
  const [password, setPassword] = useState("12345678")
  const navigate = useNavigate()


  const handleSubmit = (e) => {
    e.preventDefault()
    if (studentId === "Dominion" && password === "12345678") {
      navigate("/dashboard")
    } else {
      alert("Error: Invalid Student ID or Password")
      // navigate("/dashboard")
    }
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 relative">
      {/* WaterDrop background */}
      <div className="absolute left-435 bottom-0 sm:right-5">
        <DivOrigami/>
      </div>
      <div className="absolute inset-0 flex items-center justify-center z-0">
        <WaterDrop />
      </div>
      {/* Login form */}
      <div className="bg-white p-4 sm:p-8 rounded shadow-md w-full max-w-xs sm:max-w-md z-10 relative md:ml-0 ml-27">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3 sm:mb-4">
            <label className="block text-xs sm:text-sm font-medium">ID</label>
            <input
              type="text"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded text-xs sm:text-base"
              placeholder="e.g. DU0459"
            />
          </div>
          <div className="mb-4 sm:mb-6">
            <label className="block text-xs sm:text-sm font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded text-xs sm:text-base"
              placeholder="********"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#2D2D31] text-white py-2 px-4 rounded hover:bg-[#474747] transition cursor-pointer text-xs sm:text-base"
          >
            Login
          </button>
          <div className="mt-3 sm:mt-4 text-center">
            <a href="#" className="text-xs sm:text-sm text-blue-500 hover:underline">
              Forgot Password?
            </a>
          </div>
        </form>
      </div>
      {/* Handwriting text bottom right */}
      <div
        className="fixed bottom-4 text  right-4 z-50 text-black font-bold text-lg"
        style={{ fontFamily: "'Dancing Script', cursive" }}
      >
        <i>Hardelz • LightArts • NACOS DU</i>
      </div>
    </div>
  );
}
