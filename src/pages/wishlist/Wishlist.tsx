import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { RootState } from '../../redux/store';
import { toast } from 'sonner';
import { useCreateBookingMutation } from '../../redux/features/bookingManagement/bookingManagement';
import { removeFromWishlist, updateQuantity } from '../../redux/features/admin/wishlistSlice';

const Wishlist = () => {
  const dispatch = useAppDispatch();
  const wishlist = useAppSelector((state: RootState) => state.wishlist.items);
  const [addToCart] = useCreateBookingMutation();

//   adding the product wishlist to cart
  const handleAddToCart = async (id: string) => {
    const product = wishlist.find((item) => item._id === id);

    if (!product) return;

    try {
      const res = await addToCart({ productId: id }).unwrap();
      if (res.success) {
        toast.success('Product added to cart successfully');
        dispatch(removeFromWishlist(id)); // Remove product from Redux store
        localStorage.setItem(
          'wishlist',
          JSON.stringify(wishlist.filter((item) => item._id !== id)) // Sync localStorage
        );
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to add product to cart');
    }
  };


// handle the product quantity
  const handleQuantityChange = (id: string, quantity: string) => {
    const currentItem = wishlist.find((item) => item._id === id);
    if (!currentItem) return;
  
    const updatedQuantity = Math.max(Number(quantity), 1); // Ensure at least 1
    if (updatedQuantity > currentItem.quantity) {
      dispatch(updateQuantity({ _id: id, type: 'increment' }));
    } else if (updatedQuantity < currentItem.quantity) {
      dispatch(updateQuantity({ _id: id, type: 'decrement' }));
    }
    localStorage.setItem(
      'wishlist',
      JSON.stringify(
        wishlist.map((item) =>
          item._id === id ? { ...item, quantity: updatedQuantity } : item
        )
      )
    );
  };
  

  const handleClearData = () => {
    localStorage.removeItem('wishlist');
    dispatch(removeFromWishlist("")); // Clear all wishlist items
  };
  const handleContinueShopping = () => {
    // Implement continue shopping logic here
    alert('Continue shopping clicked!');
  };
  return (
    <div className="container mx-auto p-4 my-10">
      <div className="flex flex-col md:flex-row lg:flex-row sm:space-x-8">
        <div className="overflow-x-auto">
          <table className="w-full bg-white border rounded-md">
            <thead>
              <tr>
                <th className="py-2 border-b">Product</th>
                <th className="py-2 px-4 border-b">Price</th>
                <th className="py-2 px-4 border-b">Quantity</th>
                <th className="py-2 px-4 border-b">Subtotal</th>
                <th className="py-2 px-4 border-b">Add to cart</th>
                <th className="py-2 px-4 border-b">Remove</th>
              </tr>
            </thead>
            <tbody>
              {wishlist.map((product) => (
                <tr key={product._id}>
                  <td className="py-2 px-4 border-b w-fit">
                    <div className="flex">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-16 h-16 object-cover mr-4"
                      />
                      <div>
                        <p className="font-bold">{product.title}</p>
                        <p className="text-sm text-gray-500">{product.color}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-2 border-b">
                    <div className="flex justify-center items-center">
                      ${product.price.toFixed(2)}
                    </div>
                  </td>
                  <td className="py-2 px-4 border-b">
                    <div className="flex justify-center items-center">
                      <input
                        type="number"
                        value={product.quantity}
                        onChange={(e) =>
                          handleQuantityChange(product._id, e.target.value)
                        }
                        className="w-16 px-2 py-1 border rounded"
                      />
                    </div>
                  </td>
                  <td className="py-2 px-4 border-b">
                    <div className="flex justify-center items-center">
                      ${(product.price * product.quantity).toFixed(2)}
                    </div>
                  </td>
                  <td className="py-2 px-4 border-b align-middle">
                    <button
                      onClick={() => handleAddToCart(product._id)}
                      className="text-emerald-500 hover:underline"
                    >
                      Add to cart
                    </button>
                  </td>
                  <td className="py-2 px-4 border-b align-middle">
                    <button
                      onClick={() => handleAddToCart(product._id)}
                      className="text-red-600"
                    >
                      X
                    </button>
                  </td>
                </tr>
              ))}
            <tr>
              <td colSpan={6} className="py-4 px-4">
                <div className="flex justify-between">
                  <button
                    onClick={handleContinueShopping}
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                  >
                    Continue Shopping
                  </button>
                  
                  <button
                    onClick={handleClearData}
                    className="px-4 py-2 bg-red-500 text-white rounded"
                  >
                    Clear Data
                  </button>
                </div>
              </td>
            </tr>
           
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
