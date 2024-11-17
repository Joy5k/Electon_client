const ProductTable = ({ products }: any) => {
  return (
    <div className="overflow-x-auto mr-5">
      <table className=" w-full bg-white border-collapse overflow-scroll">
        <thead>
          <tr className="border bg-gray-100">
            <th className="px-4 py-2 whitespace-nowrap">Image</th>
            <th className="px-4 py-2 whitespace-nowrap">Title</th>
            <th className=" whitespace-nowrap">Quantity</th>
            <th className="px-4 py-2 whitespace-nowrap">Price ($)</th>
            <th className="px-4 py-2 whitespace-nowrap">Seller Name</th>
            {/* <th className="px-4 py-2 whitespace-nowrap">Seller Email</th> */}
            <th className="whitespace-nowrap">Delete</th>
            <th className="px-4 py-2 whitespace-nowrap">Update</th>
          </tr>
        </thead>
        <tbody>
          {products?.map((product: any) => (
            <tr key={product?._id} className="border-b">
              <td className="border px-4 py-2">
                <img
                  src={product.image || "https://cdn-icons-png.flaticon.com/512/1554/1554590.png"}
                  alt={product?.title}
                  className="w-16 h-16 object-cover rounded"
                />
              </td>
              <td className="border px-4 py-2 text-center">{product?.title}</td>
              <td className="border px-4 py-2 text-center">{product?.quantity}</td>
              <td className="border px-4 py-2 text-center">${product?.price.toFixed(2)}</td>
              <td className="border px-4 py-2 text-center">
                {product?.sellerId?.firstName} {product?.sellerId?.lastName}
              </td>
              {/* <td className="border px-4 py-2 text-center">
                {product?.sellerId?.email || "N/A"}
              </td> */}
              <td className="border px-4 py-2 text-center">
                <button className="text-red-500">X</button>
              </td>
              <td className="border px-4 py-2 text-center">
                <button className="text-blue-500">Update</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
