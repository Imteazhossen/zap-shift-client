import React from 'react';
import { FaTruckLoading } from 'react-icons/fa';

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center animate-pulse text-gray-700">
      <FaTruckLoading className="text-6xl text-primary animate-bounce mb-4" />
      <h2 className="text-xl font-semibold">Loading, please wait...</h2>
      <p className="text-sm text-gray-500">Fetching parcel information ⏳</p>

      <div className="mt-6">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    </div>
  );
};

export default Loading;
