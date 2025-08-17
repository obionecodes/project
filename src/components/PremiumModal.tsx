import React from 'react';
import { X, Crown, Star, Coins, Users, Phone } from 'lucide-react';

interface PremiumModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubscribe: () => void;
}

export default function PremiumModal({ isOpen, onClose, onSubscribe }: PremiumModalProps) {
  if (!isOpen) return null;

  const features = [
    { icon: Users, title: 'Premium User Status', description: 'Stand out with exclusive badge' },
    { icon: Phone, title: 'More Calls', description: 'Unlimited video calls per day' },
    { icon: Coins, title: 'Bonus Coins', description: '+1200 coins every week' },
    { icon: Star, title: 'Priority Support', description: '24/7 premium customer support' },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl max-w-sm sm:max-w-md w-full relative overflow-hidden max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white bg-opacity-80 rounded-full hover:bg-opacity-100 transition-all"
        >
          <X className="h-5 w-5 text-gray-600" />
        </button>

        {/* Header Image */}
        <div className="relative h-40 sm:h-48 bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
          <div className="text-center text-white">
            <Crown className="h-12 w-12 sm:h-16 sm:w-16 mx-auto mb-2 sm:mb-4 text-yellow-300" />
            <h2 className="text-lg sm:text-2xl font-bold mb-1 sm:mb-2 px-4">Minimum rejection from girls</h2>
            <p className="text-sm sm:text-base text-purple-100 px-4">Stand out with Premium User status</p>
            <p className="text-sm sm:text-base text-purple-100 px-4">and get more calls</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6">
          {/* Features */}
          <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="flex items-center space-x-3">
                  <div className="p-1.5 sm:p-2 bg-purple-100 rounded-lg">
                    <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 text-sm sm:text-base">{feature.title}</p>
                    <p className="text-xs sm:text-sm text-gray-600">{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Premium Badge */}
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-xl p-3 sm:p-4 mb-4 sm:mb-6 text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Crown className="h-5 w-5 sm:h-6 sm:w-6" />
              <span className="text-lg sm:text-xl font-bold">Get premium</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Coins className="h-4 w-4" />
              <span className="font-semibold text-sm sm:text-base">+1200 / week</span>
            </div>
          </div>

          {/* Pricing */}
          <div className="bg-gray-50 rounded-xl p-3 sm:p-4 mb-4 sm:mb-6">
            <div className="text-center">
              <div className="mb-2">
                <span className="text-xl sm:text-2xl font-bold text-gray-900">$4.99</span>
                <span className="text-gray-600 ml-2 text-sm sm:text-base">first week</span>
              </div>
              <p className="text-sm text-gray-600">Then $9.99 / week</p>
            </div>
          </div>

          {/* Subscribe Button */}
          <button
            onClick={onSubscribe}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-3 sm:py-4 rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm sm:text-base"
          >
            GET PREMIUM
          </button>

          {/* Terms */}
          <p className="text-xs text-gray-500 mt-3 sm:mt-4 text-center leading-relaxed px-2">
            By continuing you agree that if you don't cancel to the end of the 7 days introductory period, you will automatically be charged the full price of $9.99 every 7 days until you cancel it. Learn more about cancellation and refund policy in Terms and Conditions
          </p>
        </div>
      </div>
    </div>
  );
}