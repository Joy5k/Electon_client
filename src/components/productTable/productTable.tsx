

  
const ProductTable= ({ products }:any) => {
  return (
    <div className="overflow-x-auto mr-5">
      <table className=" bg-white">
        <thead>
          <tr className="border border-white">
            <th className="px-4 py-2">Image</th>
            <th className="px-4 py-2">Title</th>
            <th className="px-4 py-2">Quantity</th>
            <th className="px-4 py-2">Price ($)</th>
            <th className="px-4 py-2">Seller Name</th>
            <th className="px-4 py-2">Seller Email</th>
            <th className="px-4 py-2">Delete </th>
            <th className="px-4 py-2">Update</th>
          </tr>
        </thead>
        <tbody>
          {products?.map((product:any) => (
            <tr key={product?._id}>
              <td className="border px-4 ">
                <img
                  src={product.image ? product.image:"https://cdn-icons-png.flaticon.com/512/1554/1554590.png"}
                  alt={product?.title}
                  className="w-20 h-20 object-cover"
                />
              </td>
              <td className="border px-4 ">{product?.title}</td>
            
              <td className="border px-4   w-ful">{product?.quantity}</td>
              <td className="border px-4 ">{product?.price.toFixed(2)}</td>
              <td className="border px-4 ">
                {product?.sellerId?.firstName} {product?.sellerId?.lastName}
              </td>
              <td className="border px-4 ">
                {product?.sellerId?.email || "N/A"}
              </td>
              <td className="border px-4  w-fit">
               <button className="w-full">X</button>
              </td>
              <td className="border px-4 ">
               <button>Update</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
