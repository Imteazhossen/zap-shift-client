import React from 'react';
import { FaLock } from 'react-icons/fa';
import { Link } from 'react-router';

const Forbidden = () => {
  return (
    <div className="min-h-screen bg-base-200 flex flex-col justify-center items-center text-center px-4">
      <div className="animate-pulse text-error">
        <FaLock className="text-6xl mb-4" />
      </div>

      <h1 className="text-4xl font-bold text-error animate-bounce mb-2">403 - Forbidden</h1>
      <p className="text-gray-500 mb-6 max-w-md">
        🚫 You don't have permission to access this page. Please return to a valid page or contact the admin for access.
      </p>

      <Link to="/" className="btn btn-outline text-black bg-primary">
        ⬅️ Go Back Home
      </Link>
    </div>
  );
};

export default Forbidden;
