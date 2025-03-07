"use client";
import { useEffect, useState } from "react";
import { displayAccounts } from "@/utils/api";
import { Banknote, Eye, EyeOff, Loader2, Clipboard } from "lucide-react";

export default function Accounts() {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showBalance, setShowBalance] = useState({});
  const [copiedId, setCopiedId] = useState(null);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await displayAccounts();
        setAccounts(response);
      } catch (error) {
        console.error("Error fetching accounts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAccounts();
  }, []);

  const toggleBalance = (accountId) => {
    setShowBalance((prev) => ({
      ...prev,
      [accountId]: !prev[accountId],
    }));
  };

  const copyToClipboard = (accountId) => {
    navigator.clipboard.writeText(accountId);
    setCopiedId(accountId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="!p-10 flex flex-col items-center bg-gray-100 min-h-screen">
      <h1 className="!text-4xl font-bold !mb-5 !text-gray-900">
        💰 Your Accounts
      </h1>
      <p className="!text-lg text-gray-600 !mb-10">
        View and manage all your linked accounts in one place.
      </p>

      {loading ? (
        <div className="flex items-center justify-center !mt-20">
          <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 !w-full max-w-6xl">
          {accounts.length > 0 ? (
            accounts.map((account) => (
              <div
                key={account._id}
                className="!p-6 !border !border-gray-200 !rounded-2xl bg-white shadow-md transition-all duration-300 hover:shadow-lg hover:scale-105 hover:!border-blue-400 flex flex-col items-center"
              >
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center !mb-5">
                  <Banknote className="text-blue-600 w-10 h-10" />
                </div>
                <h2 className="text-xl font-semibold !mb-2 !text-gray-800">
                  {account.accountNames[0]?.name || "Unnamed Account"}
                </h2>

                <div className="text-gray-600 !mb-1 flex flex-col items-center gap-2">
                  <span className="font-medium">Account ID:</span>
                  <div className="flex gap-2 items-center">
                    {account.id}
                    <button
                      onClick={() => copyToClipboard(account.id)}
                      className="p-1 rounded-md bg-gray-200 hover:bg-gray-300 transition"
                    >
                      <Clipboard
                        color="blue"
                        className="w-4 h-4 text-gray-600"
                      />
                    </button>
                  </div>
                  {copiedId === account.id && (
                    <span className="text-green-600 text-sm">Copied!</span>
                  )}
                </div>

                <p className="text-gray-600 !mb-1">
                  Type:{" "}
                  <span className="font-medium">{account.accountType}</span>
                </p>
                <p className="text-gray-600 !mb-1">
                  Currency:{" "}
                  <span className="font-medium">{account.currency}</span>
                </p>

                <div className="flex items-center gap-3 !mt-4">
                  <button
                    onClick={() => toggleBalance(account._id)}
                    className="!p-2 !border !border-gray-300 !rounded-lg flex items-center gap-2 !text-black hover:bg-gray-200 transition"
                  >
                    {showBalance[account._id] ? (
                      <>
                        <EyeOff className="w-5 h-5 !text-black" />
                        Hide Balance
                      </>
                    ) : (
                      <>
                        <Eye className="w-5 h-5 !text-black" />
                        Show Balance
                      </>
                    )}
                  </button>
                </div>

                {showBalance[account._id] && (
                  <p className="!text-black font-bold !mt-3">
                    Balance: ${account.balance}
                  </p>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-600 text-lg">No accounts found.</p>
          )}
        </div>
      )}
    </div>
  );
}
