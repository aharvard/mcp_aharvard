"use client";

import React from "react";
import { useToast } from "../../components/ToastContainer";

export default function ToastDemo() {
  const { showToast } = useToast();

  const showSuccessToast = () => {
    showToast({
      type: "success",
      title: "Success!",
      message: "This is a success notification with smooth animations.",
      duration: 5000,
    });
  };

  const showErrorToast = () => {
    showToast({
      type: "error",
      title: "Error!",
      message: "This is an error notification with smooth animations.",
      duration: 5000,
    });
  };

  const showWarningToast = () => {
    showToast({
      type: "warning",
      title: "Warning!",
      message: "This is a warning notification with smooth animations.",
      duration: 5000,
    });
  };

  const showInfoToast = () => {
    showToast({
      type: "info",
      title: "Info!",
      message: "This is an info notification with smooth animations.",
      duration: 5000,
    });
  };

  const showMultipleToasts = () => {
    showToast({
      type: "success",
      title: "First Toast",
      message: "This is the first toast in a sequence.",
      duration: 3000,
    });

    setTimeout(() => {
      showToast({
        type: "info",
        title: "Second Toast",
        message: "This is the second toast in a sequence.",
        duration: 3000,
      });
    }, 500);

    setTimeout(() => {
      showToast({
        type: "warning",
        title: "Third Toast",
        message: "This is the third toast in a sequence.",
        duration: 3000,
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Toast Notification Demo
          </h1>
          <p className="text-lg text-gray-600">
            Click the buttons below to see the smooth toast notifications in
            action!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Success Toast
            </h3>
            <p className="text-gray-600 mb-4">
              Shows a green success notification with a checkmark icon.
            </p>
            <button
              onClick={showSuccessToast}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Show Success Toast
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Error Toast
            </h3>
            <p className="text-gray-600 mb-4">
              Shows a red error notification with an X icon.
            </p>
            <button
              onClick={showErrorToast}
              className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Show Error Toast
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Warning Toast
            </h3>
            <p className="text-gray-600 mb-4">
              Shows a yellow warning notification with a warning icon.
            </p>
            <button
              onClick={showWarningToast}
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Show Warning Toast
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Info Toast
            </h3>
            <p className="text-gray-600 mb-4">
              Shows a blue info notification with an info icon.
            </p>
            <button
              onClick={showInfoToast}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Show Info Toast
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow md:col-span-2 lg:col-span-3">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Multiple Toasts
            </h3>
            <p className="text-gray-600 mb-4">
              Shows multiple toasts in sequence to demonstrate the stacking
              behavior.
            </p>
            <button
              onClick={showMultipleToasts}
              className="w-full bg-purple-500 hover:bg-purple-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Show Multiple Toasts
            </button>
          </div>
        </div>

        <div className="mt-12 bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Features</h3>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
              Smooth slide-in and slide-out animations
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
              Auto-dismiss with configurable duration
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
              Manual close button
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
              Multiple toast types (success, error, warning, info)
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
              Responsive design with beautiful styling
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
              Stacked notifications with proper spacing
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
