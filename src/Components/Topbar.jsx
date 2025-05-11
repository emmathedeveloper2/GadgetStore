import { Navigate, useNavigate } from "react-router-dom";
export default function Topbar() {
  const navigate = useNavigate()
    return (
      <header className="bg-white shadow px-6 py-4 fixed left-64 right-0 top-0 z-10">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold">Dashboard</h1>
          <button className="text-sm bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
          onClick={() => {navigate("/")}}>Logout</button>
        </div>
      </header>
    );
  }
  