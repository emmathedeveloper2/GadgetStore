import { IoMdHome } from "react-icons/io";
import { IoIosSettings } from "react-icons/io";
export default function Topbar() {
  return (
    <header className="px-6 py-4 fixed text-[#929DAE] left-52 right-0 top-0 z-10">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text  font-mono flex justify-center items-center gap-1 font-semibold">
            <IoMdHome/> / Dashboard
          </h1>
          <h1 className="text font-bold">Dashboard</h1>
        </div>

        <div className="flex justify-center items-center gap-0.5">
          <input type="text" name="" id="" placeholder="Search here" className="border h-9  w-36 rounded-md p-2 focus:outline-0" />
          <h1></h1>
          <h1></h1>
          <h1><IoIosSettings /></h1>
        </div>
      </div>
    </header>
  );
}
