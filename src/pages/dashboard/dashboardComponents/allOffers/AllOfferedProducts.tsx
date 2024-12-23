
function AllOfferedProducts() {
  return (
    <div>
        <div className="my-10">
            <h3 className="text-2xl font-semibold my-3">All product that already offered on the electon</h3>
            <div>
                <div>
                    <table className="w-full">
                        <thead>
                            <tr className="border-b">
                                <th className="border px-4 py-2">No</th>
                                <th className="border px-4 py-2">Image</th>
                                <th className="border px-4 py-2">Title</th>
                                <th className="border px-4 py-2">Price</th>
                                <th className="border px-4 py-2">Status</th>
                                <th className="border px-4 py-2">Discount</th>
                                <th className="border px-4 py-2">Update</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b">
                                <td className="border px-4">1</td>
                                <td className="border px-4 py-2">
                                    <img
                                        src="https://cdn-icons-png.flaticon.com/512/1554/1554590.png"
                                        alt="product title"
                                        className="w-16 h-16 object-cover rounded"
                                    />
                                </td>
                                <td className="border px-4 text-center">Product Title</td>
                                <td className="border px-4 text-center">$100.00</td>
                                <td className="border px-4 text-center">status</td>
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
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AllOfferedProducts