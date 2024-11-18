import ProductTable from "./productDashboard/productTable"
import ProductUploadForm from "./productDashboard/uploadProduct"
import Spinner from "../../../components/Spinner/Spinner"
import { useAllProductsQuery } from "../../../redux/features/admin/productManagementApi"

function ProductManagement() {
  const {data,isLoading}=useAllProductsQuery({})
  return (
    <div className="mt-4 mb-10">
     {
      isLoading ? <Spinner></Spinner>: <div >
        <ProductUploadForm></ProductUploadForm> <p className="text-xl font-bold  my-5  shadow w-fit px-4 py-1 shadow-indigo-100">Manage All Products</p>
       
        <ProductTable products={data?.data}></ProductTable>
      </div>
     }
    </div>
  )
}

export default ProductManagement