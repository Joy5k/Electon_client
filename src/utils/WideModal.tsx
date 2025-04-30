// components/utils/WideModal.tsx
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface WideModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export const WideModal = ({ isOpen, onClose, children }: WideModalProps) => {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/90 backdrop-blur-lg z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="relative bg-black rounded-2xl border-2 border-primary/30 shadow-xl overflow-hidden"
        style={{ width: '95%', maxWidth: '1500px' }}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-primary hover:text-yellow-400 transition-colors z-50"
        >
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        {children}
      </motion.div>
    </motion.div>
  );
};