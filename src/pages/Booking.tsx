import React, { useState } from 'react';

interface Product {
  img: string;
  name: string;
  color: string;
  price: number;
  quantity: number;
}

const Booking: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([
    { img: 'image-url-1', name: 'Product 1', color: 'Red', price: 100, quantity: 1 },
    { img: 'image-url-2', name: 'Product 2', color: 'Blue', price: 150, quantity: 2 },
    // Add more products as needed
  ]);

  const handleDelete = (index: number) => {
    const newProducts = [...products];
    newProducts.splice(index, 1);
    setProducts(newProducts);
  };

  const handleQuantityChange = (index: number, quantity: string) => {
    const newProducts = [...products];
    newProducts[index].quantity = Number(quantity);
    setProducts(newProducts);
  };

  const handleClearData = () => {
    setProducts([]);
  };

  const handleContinueShopping = () => {
    // Implement continue shopping logic here
    alert('Continue shopping clicked!');
  };

  const handleApplyCoupon = () => {
    // Implement coupon logic here
    alert('Coupon applied!');
  };

  const handleCountryChange = (country: string) => {
    // Implement country change logic here
    alert(`Country selected: ${country}`);
  };

  const subtotal = products.reduce((acc, product) => acc + product.price * product.quantity, 0);
  const total = subtotal; // Add tax, shipping, etc. to total if needed

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row lg:flex-row space-x-8">
        {/* Product Booking Table */}
        <div  className='scrollbar-thin scrollbar-thumb scrollbar-thumb-rounded overflow-x-auto' >
          <table className="w-[850px] bg-white border rounded-md ">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Product</th>
                <th className="py-2 px-4 border-b">Price</th>
                <th className="py-2 px-4 border-b">Quantity</th>
                <th className="py-2 px-4 border-b">Subtotal</th>
                <th className="py-2 px-4 border-b">Remove</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border-b">
                    <div className="flex items-center">
                      <img src={product.img} alt={product.name} className="w-16 h-16 object-cover mr-4" />
                      <div>
                        <p className="font-bold">{product.name}</p>
                        <p className="text-sm text-gray-500">{product.color}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-2 px-4 border-b">
                    <div className="flex justify-center items-center">
                      ${product.price.toFixed(2)}
                    </div>
                  </td>
                  <td className="py-2 px-4 border-b">
                    <div className="flex justify-center items-center">
                      <input
                        type="number"
                        value={product.quantity}
                        onChange={(e) => handleQuantityChange(index, e.target.value)}
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
                    <div className="flex justify-center items-center">
                      <button onClick={() => handleDelete(index)} className="text-red-600">X</button>
                    </div>
                  </td>
                </tr>
              ))}
              {/* Additional Row for Buttons */}
              <tr>
                <td colSpan={5} className="py-4 px-4">
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

        {/* Cart Total Section */}
        <div className=" w-full md:w-1/3  lg:w-1/3 p-4 mx-auto  mt-5 md:mt-0 lg:mt-0 bg-black border rounded-md">
          <h2 className="text-lg font-bold mb-4">Cart Total</h2>
          <div className="mb-4">
            <div className="flex justify-between mb-2">
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex items-center mb-4">
              <input
                type="text"
                placeholder="Enter coupon"
                className="w-full px-2 py-1 border rounded-l"
              />
              <button onClick={handleApplyCoupon} className="px-4 py-[5px] bg-blue-500 text-white rounded-r">
                Apply
              </button>
            </div>
            <div className="mb-4">
              <label htmlFor="country" className="block mb-1">Choose Country:</label>
              <select
                id="country"
                onChange={(e) => handleCountryChange(e.target.value)}
                className="w-full px-2 py-1 border rounded"
              >
                <option value="US">United States</option>
                <option value="CA">Canada</option>
                <option value="UK">United Kingdom</option>
                {/* Add more countries as needed */}
              </select>
            </div>
            <div className="flex justify-between mb-4">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button className="w-full px-4 py-2 bg-green-500 text-white rounded">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Booking;
