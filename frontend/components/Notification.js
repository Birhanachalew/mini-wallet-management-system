import React from 'react';

export default function Notification({ message, onClose }) {
  if (!message) return null;
  return (
    <div className="fixed top-4 right-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded shadow z-50">
      <div className="flex items-center">
        <span className="mr-2">⚠️</span>
        <span>{message}</span>
        <button onClick={onClose} className="ml-4 text-yellow-700 font-bold">X</button>
      </div>
    </div>
  );
}
