// components/TrackOrderModal.tsx
import { useState } from 'react';
import { FaSearch, FaTruck } from 'react-icons/fa';
import { Modal } from '../../utils/Modal';
import { Link } from 'react-router-dom';
import { OrderTrackingModal } from '../orderTrackingModal/OrderTrackingModal';

export const TrackOrderModal = () => {
  const [isTrackModalOpen, setIsTrackModalOpen] = useState(false);
  const [isOrderTrackingOpen, setIsOrderTrackingOpen] = useState(false);
  const [trackingNumber, setTrackingNumber] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your tracking logic here
    console.log('Tracking number:', trackingNumber);
    
    // Close track modal and open order tracking modal
    setIsTrackModalOpen(false);
    setIsOrderTrackingOpen(true);
  };

  return (
    <>
      {/* Track Order Trigger Button */}
      <div>
        <button
          onClick={() => setIsTrackModalOpen(true)}
          className="flex items-center hover:text-primary transition-colors"
        >
          <FaTruck />
          <span className="ml-1 hover:text-primary">Track your order</span>
        </button>
      </div>

      {/* Tracking Input Modal */}
      <Modal isOpen={isTrackModalOpen} onClose={() => setIsTrackModalOpen(false)}>
        <div className="text-center">
          <h2 className="text-3xl font-bold text-primary mb-6">Track Your Order</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <input
                type="text"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                placeholder="Enter tracking number"
                className="w-full bg-black/50 border-2 border-gray-800 rounded-lg py-4 px-6 text-white focus:border-primary focus:ring-2 focus:ring-primary/50 transition-all"
              />
              <FaSearch className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
            
            <button
              type="submit"
              className="w-full py-4 bg-primary hover:bg-yellow-500 text-black font-bold rounded-lg transition-all 
                        transform hover:scale-105 hover:shadow-lg hover:shadow-primary/30"
            >
              Track Order
            </button>
          </form>
          
          <div className="mt-6 text-gray-400">
            <p>Don't have your tracking number?</p>
            <Link to="/chat">
              <button 
                onClick={() => setIsTrackModalOpen(false)} 
                className="text-primary hover:text-yellow-400 underline mt-2"
              >
                Contact Support
              </button>
            </Link>
          </div>
        </div>
      </Modal>

      {/* Order Tracking Details Modal */}
      <OrderTrackingModal 
        isOpen={isOrderTrackingOpen} 
        onClose={() => setIsOrderTrackingOpen(false)}
      />
    </>
  );
};