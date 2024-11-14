import ProductTable from "../../../components/productTable/productTable"
import Spinner from "../../../components/Spinner/Spinner"
import { useAllProductsQuery } from "../../../redux/features/admin/productManagementApi"

function ProductManagement() {
  const {data,isLoading}=useAllProductsQuery({})
  return (
    <div>
     {
      isLoading ? <Spinner></Spinner>: <ProductTable products={data?.data}></ProductTable>
     }
    </div>
  )
}

export default ProductManagement