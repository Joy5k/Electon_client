import { FaTruckLoading } from "react-icons/fa";
import { MdHomeRepairService, MdOutlineHighQuality } from "react-icons/md";
import { RiCustomerService2Fill } from "react-icons/ri";



const Features=()=>{
return (
    <div>
        <div className="mx-8 my-10 flex flex-col md:flex-row lg:flex-row justify-center gap-1 md:gap-0">
            
            <div className="flex justify-between w-58 border-r p-6 bg-primary">
            <FaTruckLoading className="text-6xl bg-transparent" />
                <div className="flex flex-col justify-start gap-2 ml-4 bg-transparent ">
                    <p className="font-bold text-gray-200  bg-transparent">Free delivery</p>
                    <p className="bg-transparent">On order above $50.00</p>
                </div>
            </div>
            <div className="flex justify-between w-58 border-r p-6 bg-primary">
            <MdOutlineHighQuality className="text-6xl bg-transparent" />
                <div className="flex flex-col justify-start gap-2 ml-4 bg-transparent ">
                    <p className="font-bold text-gray-200  bg-transparent">Best quality                    </p>
                    <p className="bg-transparent">Best quality in low price</p>
                </div>
            </div>
            <div className="flex justify-between w-58 border-r p-6 bg-primary">
            <MdHomeRepairService className="text-6xl bg-transparent" />
                <div className="flex flex-col justify-start gap-2 ml-4 bg-transparent ">
                    <p className="font-bold text-gray-200  bg-transparent">1 Year warranty                    </p>
                    <p className="bg-transparent">Available warranty</p>
                </div>
            </div>
            <div className="flex justify-between w-58 p-6 bg-primary">
            <RiCustomerService2Fill className="text-6xl bg-transparent" />
                <div className="flex flex-col justify-start gap-2 ml-4 bg-transparent ">
                    <p className="font-bold text-gray-200  bg-transparent">Best service                    </p>
                    <p className="bg-transparent">3 free service
</p>
                </div>
            </div>
        </div>
    </div>
)
}
export default Features;