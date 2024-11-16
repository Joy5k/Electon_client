import ProductTable from "../../../components/productDashboard/productTable"
import ProductUploadForm from "../../../components/productDashboard/uploadProduct"
import Spinner from "../../../components/Spinner/Spinner"
import { useAllProductsQuery } from "../../../redux/features/admin/productManagementApi"

function ProductManagement() {
  const {data,isLoading}=useAllProductsQuery({})
  return (
    <div>
     {
      isLoading ? <Spinner></Spinner>: <div >
        <ProductUploadForm></ProductUploadForm>
        <ProductTable products={data?.data}></ProductTable>
      </div>
     }
    </div>
  )
}

export default ProductManagement