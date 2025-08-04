"use client";

import React from "react";
import { useToast } from "../../components/ToastContainer";
import {
    Bell,
    CheckCircle,
    AlertTriangle,
    Info,
    XCircle,
    Sparkles,
    Zap,
    Clock,
} from "lucide-react";

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
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50/30 to-purple-50/50">
            <div className="max-w-6xl mx-auto px-6 py-16">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-full text-blue-700 text-sm font-medium mb-6">
                        <Bell className="w-4 h-4" />
                        Notification System
                    </div>
                    <div className="flex justify-center items-center gap-4 mb-6">
                        <Bell className="w-10 h-10 text-blue-600" />
                        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                            Toast Notification Demo
                        </h1>
                        <Bell className="w-10 h-10 text-blue-600" />
                    </div>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        Experience smooth, animated toast notifications with
                        different types and configurations
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-all duration-300">
                        <div className="flex items-center gap-3 mb-6">
                            <CheckCircle className="w-8 h-8 text-green-500" />
                            <h3 className="text-xl font-bold text-gray-900">
                                Success Toast
                            </h3>
                        </div>
                        <p className="text-gray-600 mb-6 leading-relaxed">
                            Shows a green success notification with a checkmark
                            icon and smooth animations.
                        </p>
                        <button
                            onClick={showSuccessToast}
                            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-medium py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 hover:scale-105 shadow-lg hover:shadow-xl"
                        >
                            <CheckCircle className="w-5 h-5" />
                            Show Success Toast
                        </button>
                    </div>

                    <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-all duration-300">
                        <div className="flex items-center gap-3 mb-6">
                            <XCircle className="w-8 h-8 text-red-500" />
                            <h3 className="text-xl font-bold text-gray-900">
                                Error Toast
                            </h3>
                        </div>
                        <p className="text-gray-600 mb-6 leading-relaxed">
                            Shows a red error notification with an X icon and
                            attention-grabbing styling.
                        </p>
                        <button
                            onClick={showErrorToast}
                            className="w-full bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white font-medium py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 hover:scale-105 shadow-lg hover:shadow-xl"
                        >
                            <XCircle className="w-5 h-5" />
                            Show Error Toast
                        </button>
                    </div>

                    <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-all duration-300">
                        <div className="flex items-center gap-3 mb-6">
                            <AlertTriangle className="w-8 h-8 text-yellow-500" />
                            <h3 className="text-xl font-bold text-gray-900">
                                Warning Toast
                            </h3>
                        </div>
                        <p className="text-gray-600 mb-6 leading-relaxed">
                            Shows a yellow warning notification with a warning
                            icon and caution styling.
                        </p>
                        <button
                            onClick={showWarningToast}
                            className="w-full bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white font-medium py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 hover:scale-105 shadow-lg hover:shadow-xl"
                        >
                            <AlertTriangle className="w-5 h-5" />
                            Show Warning Toast
                        </button>
                    </div>

                    <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-all duration-300">
                        <div className="flex items-center gap-3 mb-6">
                            <Info className="w-8 h-8 text-blue-500" />
                            <h3 className="text-xl font-bold text-gray-900">
                                Info Toast
                            </h3>
                        </div>
                        <p className="text-gray-600 mb-6 leading-relaxed">
                            Shows a blue info notification with an info icon and
                            informative styling.
                        </p>
                        <button
                            onClick={showInfoToast}
                            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-medium py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 hover:scale-105 shadow-lg hover:shadow-xl"
                        >
                            <Info className="w-5 h-5" />
                            Show Info Toast
                        </button>
                    </div>

                    <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-all duration-300 md:col-span-2 lg:col-span-2">
                        <div className="flex items-center gap-3 mb-6">
                            <Zap className="w-8 h-8 text-purple-500" />
                            <h3 className="text-xl font-bold text-gray-900">
                                Multiple Toasts
                            </h3>
                        </div>
                        <p className="text-gray-600 mb-6 leading-relaxed">
                            Shows multiple toasts in sequence to demonstrate the
                            stacking behavior and timing.
                        </p>
                        <button
                            onClick={showMultipleToasts}
                            className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-medium py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 hover:scale-105 shadow-lg hover:shadow-xl"
                        >
                            <Zap className="w-5 h-5" />
                            Show Multiple Toasts
                        </button>
                    </div>
                </div>

                <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-xl p-8 border border-gray-100">
                    <div className="flex items-center gap-3 mb-6">
                        <Sparkles className="w-8 h-8 text-indigo-500" />
                        <h3 className="text-2xl font-bold text-gray-900">
                            Features
                        </h3>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="flex items-start gap-3">
                            <div className="flex items-center justify-center w-8 h-8 bg-green-100 rounded-lg flex-shrink-0">
                                <CheckCircle className="w-4 h-4 text-green-600" />
                            </div>
                            <p className="text-gray-700">
                                Smooth slide-in and slide-out animations
                            </p>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-lg flex-shrink-0">
                                <Clock className="w-4 h-4 text-blue-600" />
                            </div>
                            <p className="text-gray-700">
                                Auto-dismiss with configurable duration
                            </p>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="flex items-center justify-center w-8 h-8 bg-purple-100 rounded-lg flex-shrink-0">
                                <XCircle className="w-4 h-4 text-purple-600" />
                            </div>
                            <p className="text-gray-700">
                                Manual close button for user control
                            </p>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="flex items-center justify-center w-8 h-8 bg-yellow-100 rounded-lg flex-shrink-0">
                                <Bell className="w-4 h-4 text-yellow-600" />
                            </div>
                            <p className="text-gray-700">
                                Multiple toast types (success, error, warning,
                                info)
                            </p>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="flex items-center justify-center w-8 h-8 bg-indigo-100 rounded-lg flex-shrink-0">
                                <Sparkles className="w-4 h-4 text-indigo-600" />
                            </div>
                            <p className="text-gray-700">
                                Responsive design with beautiful styling
                            </p>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="flex items-center justify-center w-8 h-8 bg-pink-100 rounded-lg flex-shrink-0">
                                <Zap className="w-4 h-4 text-pink-600" />
                            </div>
                            <p className="text-gray-700">
                                Stacked notifications with proper spacing
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
