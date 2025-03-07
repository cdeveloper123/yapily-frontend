"use client";

import { useState } from "react";
import {
  updateAccounts,
  updateTransactions,
  showTransactions,
} from "@/utils/api";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
const Modal = ({ isOpen, onClose, optionTitle }) => {
  const [consent, setConsent] = useState("");
  const [accountId, setAccountId] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleClose = () => {
    setConsent("");
    setAccountId("");
    onClose();
  };
  const handleSubmit = async () => {
    let payload = {};

    if (optionTitle === "Show Transactions") {
      if (!accountId) {
        toast.error("Account ID is required.");
        return;
      }
      payload = { accountId };
    } else if (optionTitle === "Update Transactions") {
      if (!consent || !accountId) {
        toast.error("Both Account ID and Consent Token are required.");
        return;
      }
      payload = { consent, accountId };
    } else {
      if (!consent) {
        toast.error("Consent token is required.");
        return;
      }
      payload = { consent };
    }

    setLoading(true);
    try {
      switch (optionTitle) {
        case "Update Accounts":
          await updateAccounts(payload);
          break;
        case "Update Transactions":
          await updateTransactions(payload);
          break;
        case "Show Transactions":
          const response = await showTransactions(payload);
          if (response?.data?.transactions?.length > 0) {
            localStorage.setItem("transactions", JSON.stringify(response.data));
            toast.success("Transactions retrieved successfully!");
            router.push("/transactions");
          }
          break;
        default:
          toast.error("Invalid option selected.");
          return;
      }
      setConsent("");
      setAccountId("");
      onClose();
    } catch (error) {
      console.error(`Error calling ${optionTitle} API:`, error);
      toast.error(`Failed to ${optionTitle.toLowerCase()}.`);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-opacity-50 backdrop-blur-lg flex justify-center items-center z-50">
      <div className="bg-transparent !p-6 rounded-lg shadow-xl w-full max-w-md">
        <div className="bg-white bg-opacity-40 backdrop-blur-lg !p-8 rounded-lg !mb-5">
          <h2 className="!text-2xl font-semibold !mb-6 text-gray-900">
            {optionTitle}
          </h2>

          {(optionTitle === "Show Transactions" ||
            optionTitle === "Update Transactions") && (
            <div className="!mb-4">
              <label
                htmlFor="accountId"
                className="block text-sm font-medium text-gray-800 !mb-2"
              >
                Account ID
              </label>
              <input
                type="text"
                id="accountId"
                value={accountId}
                onChange={(e) => setAccountId(e.target.value)}
                className="w-full !p-3 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={loading}
              />
            </div>
          )}

          {optionTitle !== "Show Transactions" && (
            <div>
              <label
                htmlFor="consent"
                className="block text-sm font-medium text-gray-800 !mb-2"
              >
                Consent Token
              </label>
              <input
                type="text"
                id="consent"
                value={consent}
                onChange={(e) => setConsent(e.target.value)}
                className="w-full !p-3 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={loading}
              />
            </div>
          )}

          <div className="!mt-6 flex justify-between">
            <button
              onClick={handleClose}
              className="!px-6 !py-3 !bg-gray-300 !text-gray-800 !rounded-lg hover:bg-gray-400 transition-colors"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="!px-6 !py-3 !bg-blue-500 !text-white !rounded-lg !hover:bg-blue-600 transition-colors"
              disabled={loading}
            >
              {loading ? "Processing..." : "Submit"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
