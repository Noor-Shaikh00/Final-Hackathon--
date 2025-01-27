import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function PaymentSuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="bg-white rounded-2xl shadow-2xl p-10 max-w-md w-full mx-4 transform transition-all hover:scale-105 duration-300">
        <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-8">
          Payment Successful!
        </h1>
        <div className="flex justify-center mb-8">
          <CheckCircle className="w-24 h-24 text-green-500 animate-bounce" />
        </div>
        <p className="text-center text-gray-700 text-lg mb-8">
          Thank you for your purchase. Your payment has been processed
          successfully. We&apos;ve sent you a confirmation email with the details.
        </p>
        <div className="text-center">
          <Link
            href="/generate-tracking"
            className="inline-block bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 ease-in-out transform hover:scale-110 shadow-lg"
          >
            Generate Tracking Number
          </Link>
        </div>
      </div>
    </div>
  );
}