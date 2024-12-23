import { useGetAllOfferedProductsQuery } from "../../../../redux/features/offers/offerManagement"
import { IOfferProduct } from "../../../../types";

function AllOfferedProducts() {
  const {data}=useGetAllOfferedProductsQuery({})
  const products=data?.data;
console.log(products,"data")

  return (
    <div>
        <div className="my-10">
         {products?.length &&    <h3 className="text-2xl font-semibold my-3">All products that already offered on the electon</h3>}
            <div>
                <div>
                {products?.length >0 ?
                    <table className="w-full">
                        <thead>
                            <tr className="border-b">
                                <th className="border px-4 py-2">No</th>
                                <th className="border px-4 py-2">Image</th>
                                <th className="border px-4 py-2">Title</th>
                                <th className="border px-4 py-2">Price</th>
                                <th className="border px-4 py-2">Offer-Price</th>
                                <th className="border px-4 py-2">Status</th>
                                <th className="border px-4 py-2">offer-type</th>
                                <th className="border px-4 py-2">Discount</th>
                                <th className="border px-4 py-2">Update</th>
                            </tr>
                        </thead>
                        <tbody>
                             {products.map((product:IOfferProduct, i:number) => <tr key={i} className="border-b">
                                <td className="border px-4">1</td>
                                <td className="border px-4 py-2">
                                    <img
                                        src="https://cdn-icons-png.flaticon.com/512/1554/1554590.png"
                                        alt="product title"
                                        className="w-16 h-16 object-cover rounded"
                                    />
                                </td>
                                <td className="border px-4 text-center">{product.productId?.title}</td>
                                <td className="border px-4 text-center">{product?.productId?.price}</td>
                                <td className="border px-4 text-center">{product?.offerPrice}</td>
                                <td className="border px-4 text-center">{product?.offerStatus}</td>
                                <td className="border px-4 text-center">{product?.offerType}</td>
                                <td className="border px-4 text-center">
                                    <button
                                        className="text-primary font-bold"
                                    >
                                        Delete
                                    </button>
                                </td>
                                <td className="border px-4 text-center">
                                    <button
                                        className="text-emerald-500 font-bold"
                                    >
                                        Update
                                    </button>
                                </td>
                            </tr> )}
                        </tbody>
                    </table>
                    : <p className="text-primary text-3xl text-center animate-pulse mt-10 font-bold ">There is no any offered product</p> }
                </div>
            </div>
        </div>
    </div>
  )
}

export default AllOfferedProducts