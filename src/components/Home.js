"use client";

import { useEffect, useState } from "react";
import { fetchLoginLink } from "@/utils/api";
import { useRouter } from "next/navigation";
import { useAuth } from "../app/context/AuthContext";
import { CircleDollarSign, Shield, ArrowRight, Loader2 } from "lucide-react";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [loginLink, setLoginLink] = useState(null);
  const [animateFeatures, setAnimateFeatures] = useState(false);
  const router = useRouter();
  const { updateAuthData } = useAuth();

  useEffect(() => {
    const getLoginLink = async () => {
      const result = await fetchLoginLink();
      setLoginLink(result.authorisationUrl);
      setLoading(false);
      updateAuthData({
        authorisationUrl: result.authorisationUrl,
      });
    };
    getLoginLink();
  }, []);

  useEffect(() => {
    setAnimateFeatures(true);
  }, []);

  const handleLoginClick = () => {
    if (loginLink) {
      window.open(loginLink, "_blank", "noopener,noreferrer");
      router.push("/dashboard");
    }
  };

  const features = [
    {
      icon: <CircleDollarSign className="w-8 h-8 text-emerald-500" />,
      title: "Secure Transactions",
      description: "Bank-grade security for all your financial operations",
    },
    {
      icon: <Shield className="w-8 h-8 text-purple-500" />,
      title: "Data Protection",
      description: "Your financial data is always encrypted and protected",
    },
  ];

  return (
    <div className=" flex !m-auto min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container flex flex-col items-center   !m-auto !px-4 !py-12">
        <div className="!text-center !mb-16 !important">
          <h1 className="!text-5xl font-bold !mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400  bg-clip-text !text-transparent">
            Welcome to Yapily Banking
          </h1>
          <p className="!text-xl !max-w-2xl mx-auto !text-gray-300">
            Experience seamless banking integration with enterprise-grade
            security and real-time access to your financial data.
          </p>
        </div>

        <div className="grid md:grid-cols-2  !mb-16 !gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`bg-slate-700/50 backdrop-blur-sm rounded-xl !p-6 transform transition-all duration-500 hover:scale-105 ${
                animateFeatures
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div className="!mb-4">{feature.icon}</div>
              <h3 className="!text-xl font-semibold  mb-2 !text-white">
                {feature.title}
              </h3>
              <p className=" !text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          {loading ? (
            <div className="flex items-center justify-center !py-12">
              <Loader2 className="w-12 h-12 text-blue-400 animate-spin" />
            </div>
          ) : loginLink ? (
            <button
              onClick={handleLoginClick}
              className="!mt-8 !px-10 !py-5 cursor-pointer bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold !rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:from-blue-600 hover:to-purple-600 text-2xl flex items-center space-x-2 justify-center"
            >
              <span>Login to Yapily</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          ) : (
            <p className="!mt-8 !text-xl text-red-400 animate-shake">
              Unable to load server. Please try again later.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
