import { useParams } from "react-router-dom";
import { useGetSingleProductQuery } from "../../redux/features/products/productsApi";
import { useState } from "react";
import { AppDispatch } from "../../redux/store";
import { useDispatch } from "react-redux";
import { IProduct } from "../../types";
import { addToWishlist } from "../../redux/features/admin/wishlistSlice";
import { toast } from "sonner";
import { useCreateBookingMutation } from "../../redux/features/bookingManagement/bookingManagement";
import { FaRegHeart } from "react-icons/fa6";

function ProductDetail() {
    const [addToCart]=useCreateBookingMutation()
    const { productId } = useParams();
    const { data } = useGetSingleProductQuery(productId);
    const dispatch = useDispatch<AppDispatch>();
    const [quantity, setQuantity] = useState<number>(1);
    const [selectedColor, setSelectedColor] = useState<string | null>(null);

    // Handling add to wishlist functionality
 
    const handleAddToWishlist = (product: IProduct) => {
        const bookingProduct={
          ...product,
          productId:product._id,
          userSelectedQuantity:quantity,
          productColor:selectedColor?selectedColor: data?.data?.color?.[0] 
        }
        dispatch(addToWishlist(bookingProduct));
        toast.success("Product added wishlist successfully")
      };
const  handleAddToCart=async(product:IProduct)=>{
    const bookingProduct={
        ...product,
        productId:product._id,
        userSelectedQuantity:quantity
      }
      const res=await addToCart(bookingProduct).unwrap()
      if(res.success){
          toast.success(`${product.title} is added successfully`)
        
      }
}

    // Handling quantity increase and decrease
    const increaseQuantity = () => setQuantity(prevQuantity => prevQuantity + 1);
    const decreaseQuantity = () => {
        if (quantity > 1) setQuantity(prevQuantity => prevQuantity - 1);
    };

    // Product description content with HTML tags
    const productDescription = `
        <p><strong>Discover Unmatched Quality and Functionality:</strong><br/>
        Designed with precision and crafted with care, this product delivers exceptional performance and versatility. 
        Whether you're upgrading your lifestyle, enhancing your daily routine, or finding the perfect gift, this product promises to exceed your expectations.</p>

        <p><strong>Superior Craftsmanship:</strong><br/>
        Made from premium materials, this product offers durability and a sleek design that seamlessly fits into any setting. 
        Its ergonomic and user-friendly design ensures comfort and ease of use, making it an ideal choice for everyone.</p>

        <p><strong>Versatile Features:</strong><br/>
        Engineered for flexibility, this product is packed with features to suit a variety of needs. 
        Its innovative design ensures compatibility with modern trends and technology while providing practical solutions for everyday use. 
        Whether you're at home, at work, or on the go, this product is ready to adapt to your lifestyle.</p>

        <p><strong>Uncompromising Performance:</strong><br/>
        Experience reliable functionality you can count on. This product has been rigorously tested to ensure it meets the highest standards of quality and performance. 
        From durability to efficiency, it is built to deliver outstanding results every time.</p>

        <p><strong>Perfect for Every Occasion:</strong><br/>
        Whether you're looking to elevate your personal style, improve your workspace, or enjoy an enhanced experience in your hobbies, this product caters to all. 
        Its versatile appeal makes it suitable for any occasion, from casual use to professional settings.</p>

        <p><strong>Eco-Friendly and Sustainable:</strong><br/>
        We care about the planet, and so does this product. Designed with sustainability in mind, it is made with environmentally friendly materials and processes, ensuring you can feel good about your purchase.</p>

        <p><strong>What’s in the Box:</strong><br/>
        <ul>
            <li>High-quality product tailored to your needs</li>
            <li>User manual for quick and easy setup</li>
            <li>Additional accessories to maximize functionality (where applicable)</li>
        </ul></p>

        <p><strong>Your Satisfaction, Guaranteed:</strong><br/>
        We stand by the quality of our products and are committed to your satisfaction. Backed by a comprehensive warranty and dedicated customer support, this product is a choice you can trust.</p>
    `;

    return (
        <div>
            <div className="px-2">
                <div className="inset-0 bg-black flex items-center justify-center w-full">
                    <div className="bg-black p-4 sm:p-8 rounded-lg overflow-hidden">
                        <div className="flex justify-end"></div>
                        <div className="flex flex-col md:flex-row justify-center md:gap-7 w-full">
                            <img
                                src={data?.data.image}
                                className="w-full sm:w-[300px] h-[270px] mx-auto md:mr-10 mt-96 md:mt-0 lg:mt-0"
                                alt="product_image"
                            />
                            <div>
                                <div className="mb-12">
                                    <h3 className="text-2xl sm:text-3xl font-bold text-white">
                                        {data?.data.title}
                                    </h3>
                                    <p className="text-primary font-semibold">
                                        Price: ${data?.data.price}
                                    </p>
                                </div>
                                <div>
                                    <p className="my-2">
                                        Availability:{" "}
                                        <span className="text-green-500">{data?.data.quantity} in stock</span>
                                    </p>
                                    <p className="my-1">
                                        Color:
                                        <span className="ml-2">
                                            {data?.data.color?.map((clr:string, index:number) => (
                                                <span
                                                    key={index}
                                                    onClick={() => setSelectedColor(clr)}
                                                    className={`inline-block mr-2 border rounded-full px-2 cursor-pointer ${
                                                        selectedColor === clr ? "bg-primary text-white" : "hover:bg-gray-700"
                                                    }`}
                                                >
                                                    {clr}
                                                </span>
                                            ))}
                                        </span>
                                    </p>
                                    <p className="mt-4">
                                        Selected Color: <span className="border-b border-dashed">{selectedColor || "None"}</span>
                                    </p>
                                </div>
                                <div className="flex sm:flex-row justify-start my-2 gap-2 items-center">
                                    <span className="text-xl text-gray-400 font-semibold">Quantity:</span>
                                    <div className="quantity qty-box flex items-center border border-gray-700 hover:border-gray-300 w-fit p-2 rounded-lg">
                                        <button
                                            className={`qty-bt ${quantity === 1 ? "disabled" : ""}`}
                                            name="minus"
                                            type="button"
                                            onClick={decreaseQuantity}
                                        >
                                            -
                                        </button>
                                        <input
                                            className="qty-box-input text-center mx-2 w-12 sm:w-16"
                                            type="number"
                                            name="quantity"
                                            min={1}
                                            step={1}
                                            value={quantity}
                                            readOnly
                                        />
                                        <button className="qty-bt" name="plus" type="button" onClick={increaseQuantity}>
                                            +
                                        </button>
                                    </div>
                                </div>
                                <div className="flex flex-col md:flex-row lg:flex-row justify-center gap-1">
                                    <button onClick={()=>handleAddToCart(data.data)} className="capitalize bg-primary p-3 hover:bg-gray-700 mt-6 hover:text-white rounded-full text-white w-full">
                                        Add To Cart
                                    </button>
                                    <button
                                        onClick={() => handleAddToWishlist(data.data)}
                                        
                                    >
                                     <FaRegHeart className=" text-5xl   md:p-0  mt-6 hover:text-primary w-full  rounded-full" />

                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-8 text-white text-justify px-4">
                    <h3 className="text-2xl font-semibold mb-4">Product Description</h3>
                    <div dangerouslySetInnerHTML={{ __html: productDescription }} />
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;
