
import React from 'react';

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="flex flex-col items-center">
        <div className="relative flex items-center justify-center w-16 h-16">
          <div
            className="absolute w-full h-full rounded-full border-4 border-transparent"
            style={{
              borderColor: 'rgba(0, 0, 0, 0.1)',
              borderTopColor: '#000',
              animation: `spin 1s linear infinite`,
            }}
          />
        </div>
        <p className="mt-4 text-lg font-medium text-gray-700">
          Loading...
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
