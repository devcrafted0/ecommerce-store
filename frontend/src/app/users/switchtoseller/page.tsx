"use client";
import { useEffect, useState } from "react";
import { Store, BarChart3, Package, Users } from "lucide-react";
import FormStatus from "@/components/main/FormStatus";
import { useUser } from "@/context/userContext";

const Page = () => {
  const [isSellerMode, setIsSellerMode] = useState(false);
  const { user } = useUser();

  const handleSwitch = () => {
    const switchToSeller = async () => {
        const res = await fetch('/api/v1/users/switchtoseller', {
            method : "POST"
        });
        const data = await res.json();
    }
    switchToSeller().then(()=>{
        window.location.reload()
    });
  };

  useEffect(() => {
    if (user) {
      if (user?.role === "seller") {
        setIsSellerMode(true);
      } else {
        setIsSellerMode(false);
      }
    }
  }, [user]);

  return (
    <div className="min-h-[80vh] flex flex-col gap-10 items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {!isSellerMode ? (
          <div>
            <FormStatus
              success={false}
              text="Please note: Switching to Seller Mode is permanent and cannot be changed back to a user account."
            />
            <div className="bg-white rounded-lg shadow-xl p-8 md:p-12">
              <div className="text-center mb-8">
                <div
                  className="inline-block p-3 rounded-full mb-4"
                  style={{ backgroundColor: "#B6349A20" }}
                >
                  <Store size={40} style={{ color: "#B6349A" }} />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  Ready to Start Selling?
                </h1>
                <p className="text-gray-600 text-lg">
                  Switch to Seller Mode and unlock powerful tools to grow your
                  business
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 pt-1">
                    <BarChart3 size={24} style={{ color: "#B6349A" }} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Analytics Dashboard
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Track sales, revenue, and customer insights in real-time
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 pt-1">
                    <Package size={24} style={{ color: "#B6349A" }} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Inventory Management
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Manage products, stock levels, and orders effortlessly
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 pt-1">
                    <Users size={24} style={{ color: "#B6349A" }} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Customer Management
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Build relationships and engage with your buyers
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 pt-1">
                    <Store size={24} style={{ color: "#B6349A" }} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Store Setup
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Create and customize your professional online store
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={handleSwitch}
                className="w-full py-3 px-6 rounded-lg font-semibold text-white text-lg transition duration-300 hover:shadow-lg transform hover:scale-105"
                style={{
                  backgroundColor: "#B6349A",
                  boxShadow: "0 4px 15px rgba(182, 52, 154, 0.3)",
                }}
              >
                Switch To Seller
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-lg p-8 md:p-12 text-center">
            <div
              className="inline-block p-4 rounded-full mb-4 animate-bounce"
              style={{ backgroundColor: "#B6349A20" }}
            >
              <Store size={48} style={{ color: "#B6349A" }} />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Welcome to Seller Mode!
            </h1>
            <p className="text-gray-600 text-lg mb-8">
              You're now in seller mode. Access your dashboard to manage your
              store and grow your business.
            </p>

            <div className="space-y-3 mb-8">
              <button
                className="w-full py-3 px-6 rounded-lg font-semibold text-white text-lg transition duration-300 hover:shadow-lg"
                style={{ backgroundColor: "#B6349A" }}
              >
                Go to Seller Dashboard
              </button>
            </div>

            <p className="text-gray-500 text-sm">
              Your seller account is now active and ready to use
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Page;