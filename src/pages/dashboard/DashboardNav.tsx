import { Link } from "react-router-dom"

function DashboardNav() {
  return (
    <div className="mt-5">
        <div className="">
            <div className="flex justify-between bg-gray-800">
                <Link to="/" className="text-primary text-2xl font-bold m-10 bg-transparent">Electon</Link>
                <div className="bg-transparent flex flex-col md:flex-row">
                    <p className="bg-transparent">Name: Mehedi Hasan</p>
                    <p className="bg-transparent">Role: Super Admin</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default DashboardNav