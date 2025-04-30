// components/OrderTrackingModal.tsx
import {  FaCheckCircle, FaCircle, FaMapMarkerAlt, FaBox, FaCreditCard } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { WideModal } from '../../utils/WideModal';
import { Link } from 'react-router-dom';

interface OrderTrackingModalProps {
    isOpen: boolean;
    onClose: () => void;
  }
  
const statusSteps = [
  { status: 'Ordered', description: 'Order confirmed', date: '2024-03-01', completed: true },
  { status: 'Processing', description: 'Preparing shipment', date: '2024-03-02', completed: true },
  { status: 'Shipped', description: 'Left warehouse', date: '2024-03-03', completed: true },
  { status: 'In Transit', description: 'On the way', date: '2024-03-04', completed: false },
  { status: 'Delivered', description: 'Package arrived', date: '', completed: false },
];

export const OrderTrackingModal =({ isOpen, onClose }: OrderTrackingModalProps)  => {
  
  const handleClose = () => {
    onClose();
  };

  const productInfo = {
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
    title: 'Premium Wireless Headphones',
    price: 299.99,
    quantity: 2,
    sku: 'SKU-123456',
    orderNumber: 'ORD-789012',
    paymentMethod: 'Visa **** 4242',
    shippingAddress: {
      name: 'John Doe',
      street: '456 Tech Valley Road',
      city: 'Silicon City',
      state: 'CA',
      zip: '94043',
      country: 'United States'
    }
  };

  return (
    <>
   

      <WideModal isOpen={isOpen} onClose={handleClose}>
        <div className="flex flex-col h-[80vh]">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 border-b border-primary/20 bg-gradient-to-r from-black/80 to-primary/10"
          >
            <h2 className="text-2xl font-semibold text-primary mb-1">Order Tracking</h2>
            <p className="text-sm text-gray-300">Tracking ID: #TCK-98456231</p>
          </motion.div>

          {/* Main Content */}
          <div className="flex-1 overflow-y-auto grid grid-cols-1 xl:grid-cols-2 gap-6 p-6">
            {/* Left Column */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              {/* Product Card */}
              <div className="bg-black/50 p-6 rounded-xl border border-primary/20 shadow-lg">
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <img 
                    src={productInfo.image}
                    className="w-32 h-32 object-cover rounded-lg border border-primary/30"
                    alt="Product"
                  />
                  <div className="flex-1 space-y-3">
                    <h3 className="text-xl font-medium text-primary">{productInfo.title}</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex items-center gap-2">
                        <span className="text-primary text-sm">Price:</span>
                        <span className="text-gray-300 text-sm">${productInfo.price.toFixed(2)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-primary text-sm">Qty:</span>
                        <span className="text-gray-300 text-sm">{productInfo.quantity}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-primary text-sm">SKU:</span>
                        <span className="text-gray-300 text-sm font-mono">{productInfo.sku}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-primary text-sm">Order #:</span>
                        <span className="text-gray-300 text-sm font-mono">{productInfo.orderNumber}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Shipping Details Card */}
              <div className="bg-black/50 p-6 rounded-xl border border-primary/20 shadow-lg">
                <div className="flex items-start gap-4">
                  <FaMapMarkerAlt className="text-xl text-primary mt-1 flex-shrink-0" />
                  <div className="space-y-2">
                    <h4 className="text-lg font-medium text-primary mb-2">Shipping Address</h4>
                    <div className="space-y-1 text-sm text-gray-300">
                      <p>{productInfo.shippingAddress.name}</p>
                      <p>{productInfo.shippingAddress.street}</p>
                      <p>{productInfo.shippingAddress.city}, {productInfo.shippingAddress.state} {productInfo.shippingAddress.zip}</p>
                      <p className="text-primary text-sm">{productInfo.shippingAddress.country}</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="space-y-6"
            >
              {/* Timeline Card */}
              <div className="bg-black/50 p-6 rounded-xl border border-primary/20 shadow-lg">
                <AnimatePresence>
                  {statusSteps.map((step, index) => (
                    <motion.div
                      key={step.status}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.15 }}
                      className="relative mb-8 last:mb-0 group"
                    >
                      <div className="flex items-start gap-4">
                        {/* Timeline Indicator */}
                        <div className="relative flex flex-col items-center pt-1">
                          <motion.div
                            className={`p-2 rounded-full ${
                              step.completed 
                                ? 'bg-primary/20 shadow-md shadow-primary/20' 
                                : 'bg-gray-800'
                            } transition-all`}
                            whileHover={{ scale: 1.05 }}
                          >
                            {step.completed ? (
                              <FaCheckCircle className="text-lg text-primary" />
                            ) : (
                              <FaCircle className="text-lg text-gray-500" />
                            )}
                          </motion.div>
                          {index < statusSteps.length - 1 && (
                            <div className={`absolute h-16 top-8 w-0.5 ${
                              step.completed ? 'bg-primary' : 'bg-gray-800'
                            }`} />
                          )}
                        </div>

                        {/* Status Details */}
                        <div className={`flex-1 space-y-1 ${step.completed ? 'opacity-100' : 'opacity-60'}`}>
                          <h4 className="text-base font-medium text-gray-100">{step.status}</h4>
                          <p className="text-sm text-gray-400">{step.description}</p>
                          {step.date && (
                            <p className="text-xs text-primary mt-1">
                              {new Date(step.date).toLocaleDateString('en-US', {
                                weekday: 'short',
                                day: 'numeric',
                                month: 'short',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </p>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Additional Info Card */}
              <div className="bg-black/50 p-6 rounded-xl border border-primary/20 shadow-lg">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <FaCreditCard className="text-xl text-primary" />
                    <div>
                      <h5 className="text-sm text-primary mb-1">Payment Method</h5>
                      <p className="text-xs text-gray-300">{productInfo.paymentMethod}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaBox className="text-xl text-primary" />
                    <div>
                      <h5 className="text-sm text-primary mb-1">Carrier</h5>
                      <p className="text-xs text-gray-300">Express Delivery Service</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-4 border-t border-primary/20 bg-black/80"
          >
            <div className="flex items-center justify-between px-4">
              <button
                onClick={() => handleClose()}
                className="px-6 py-2 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary text-sm font-medium transition-all"
              >
                Close
              </button>
              <div className="flex items-center gap-4">
               <Link to="/chat">
               <button className="px-6 py-2 rounded-lg bg-primary hover:bg-yellow-500 text-black text-sm font-medium transition-all">
                  Contact Support
                </button>
               </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </WideModal>
    </>
  );
};