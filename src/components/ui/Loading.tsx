
import React from 'react';

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="flex flex-col items-center">
        <div className="relative flex items-center justify-center w-48 h-48">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="absolute w-full h-full rounded-full border-4 border-transparent"
              style={{
                borderColor: 'rgba(71, 28, 225, 0.2)',
                borderTopColor: '#471ce1',
                animation: `spin 2s linear infinite`,
                animationDelay: `${i * 0.2}s`,
                transform: `rotate(${i * 15}deg)`,
              }}
            />
          ))}
          <div className="absolute text-5xl font-bold text-[#471ce1]">g</div>
        </div>
        <p className="mt-8 text-lg font-medium text-gray-700">
          Crafting your personalized roadmap...
        </p>
      </div>
      <style jsx>{`
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default Loading;
