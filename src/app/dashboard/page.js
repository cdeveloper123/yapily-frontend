"use client";
import { useState } from "react";
import { Banknote, CreditCard, Building2, ReceiptText } from "lucide-react";
import Modal from "../../components/Modal";
export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [optionTitle, setOptionTitle] = useState("");
  const options = [
    {
      title: "Display Accounts",
      description: "View details of all linked accounts in one place.",
      icon: (
        <Banknote className="text-yellow-500 transition-all duration-300 group-hover:scale-110" />
      ),
      action: "#display-accounts",
      gradient: "from-yellow-50 to-yellow-100",
      borderColor: "border-yellow-200",
      shadowColor: "shadow-yellow-200",
    },
    {
      title: "Show Transactions",
      description: "Get a detailed overview of past and pending transactions.",
      icon: (
        <ReceiptText className="text-purple-500 transition-all duration-300 group-hover:scale-110" />
      ),
      action: "#show-transactions",
      gradient: "from-purple-50 to-purple-100",
      borderColor: "border-purple-200",
      shadowColor: "shadow-purple-200",
    },
    {
      title: "Update Accounts",
      description: "Modify account details and manage linked accounts.",
      icon: (
        <Building2 className="text-blue-500 transition-all duration-300 group-hover:scale-110" />
      ),
      action: "#update-accounts",
      gradient: "from-blue-50 to-blue-100",
      borderColor: "border-blue-200",
      shadowColor: "shadow-blue-200",
    },
    {
      title: "Update Transactions",
      description: "Edit, categorize, or manage transaction records.",
      icon: (
        <CreditCard className="text-green-500 transition-all duration-300 group-hover:scale-110" />
      ),
      action: "#update-transactions",
      gradient: "from-green-50 to-green-100",
      borderColor: "border-green-200",
      shadowColor: "shadow-green-200",
    },
  ];

  const openModal = (title) => {
    setOptionTitle(title);
    setIsModalOpen(true);
  };

  const handleClick = async (option) => {
    if (option.action === "#display-accounts") {
      window.open("/accounts", "_blank", "noopener,noreferrer");
      return;
    } else {
      openModal(option.title);
    }
  };
  return (
    <div className="flex flex-col items-center text-gray-800 px-6 py-12 md:px-10 md:py-16 bg-white gap-8 m-auto !p-10">
      <div className="text-center mb-16 px-4">
        <p className="text-gray-800 text-lg md:text-xl font-semibold max-w-2xl mx-auto leading-relaxed">
          Manage your accounts and transactions with our intuitive dashboard
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 w-full max-w-7xl mx-auto items-center justify-center !p-5">
        {options.map((option, index) => (
          <a
            key={index}
            href={option.action}
            className={`group relative p-12 rounded-2xl transition-all duration-300
              bg-gradient-to-br ${option.gradient} 
              border ${option.borderColor}
              hover:shadow-lg ${option.shadowColor}
              flex flex-col items-center text-center
              transform hover:-translate-y-1 hover:scale-105 gap-5 !p-5
              h-64`}
            onClick={(e) => {
              e.preventDefault();
              handleClick(option);
            }}
          >
            <div className="rounded-full bg-white backdrop-blur-xl border border-gray-200">
              <div className="w-25 h-25 flex items-center justify-center">
                {option.icon}
              </div>
            </div>
            <h2 className="!text-2xl md:text-3xl !font-bold  tracking-tight text-gray-900">
              {option.title}
            </h2>
            <p className="text-gray-600 text-base md:text-lg leading-relaxed">
              {option.description}
            </p>
            <div
              className={`absolute inset-0 rounded-2xl transition-opacity duration-300 pointer-events-none
                bg-gradient-to-br ${option.gradient} opacity-0 group-hover:opacity-20`}
            />
          </a>
        ))}
      </div>
      <div className="mt-16 text-center text-gray-500">
        <p className="text-sm">
          Access your banking information securely • Real-time updates • 24/7
          support
        </p>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleClick}
        optionTitle={optionTitle}
      />
    </div>
  );
}
