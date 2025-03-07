"use client";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";

export default function TransactionsPage() {
  const { authData } = useAuth();
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const storedTransactions = localStorage.getItem("transactions");
    if (storedTransactions) {
      const parsedTransactions = JSON.parse(storedTransactions);
      setTransactions(parsedTransactions?.transactions);
    }
  }, []);

  const displayedTransactions = transactions?.slice(0, 100);
  return (
    <div className="!container !mx-auto !px-4 !py-8">
      <div className="flex items-center justify-between !mb-8">
        <Link
          href={"/dashboard"}
          className="!text-white !bg-black !px-4 !py-2 !rounded !hover:bg-gray-800"
        >
          Back to Dashboard
        </Link>
        <h1 className="!text-3xl !font-bold !text-center  !text-black flex-grow ">
          Transactions
        </h1>
      </div>

      {displayedTransactions?.length === 0 ? (
        <p className="!text-center !text-gray-500">No transactions available</p>
      ) : (
        <div className="!overflow-x-auto">
          <table className="!min-w-full !bg-white !border !border-gray-200 !rounded-lg !shadow-sm">
            <thead className="!bg-gray-50">
              <tr>
                <th className="!px-6 !py-3 !text-left !text-xs !font-medium !text-gray-500 !uppercase !tracking-wider">
                  Date
                </th>
                <th className="!px-6 !py-3 !text-left !text-xs !font-medium !text-gray-500 !uppercase !tracking-wider">
                  Description
                </th>
                <th className="!px-6 !py-3 !text-left !text-xs !font-medium !text-gray-500 !uppercase !tracking-wider">
                  Amount
                </th>
                <th className="!px-6 !py-3 !text-left !text-xs !font-medium !text-gray-500 !uppercase !tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="!divide-y !divide-gray-200">
              {displayedTransactions.map((transaction) => (
                <tr
                  key={transaction.id}
                  className="hover:!bg-gray-50 !transition-colors"
                >
                  <td className="!px-6 !py-4 !whitespace-nowrap !text-sm !text-gray-900">
                    {new Date(transaction.date).toLocaleDateString()}
                  </td>
                  <td className="!px-6 !py-4 !whitespace-nowrap !text-sm !text-gray-900">
                    {transaction.description}
                  </td>
                  <td className="!px-6 !py-4 !whitespace-nowrap !text-sm !text-gray-900">
                    {transaction.amount} {transaction.currency}
                  </td>
                  <td className="!px-6 !py-4 !whitespace-nowrap !text-sm">
                    <span
                      className={`!inline-flex !px-3 !py-1 !rounded-full !text-xs !font-semibold ${
                        transaction.status === "PENDING"
                          ? "!bg-yellow-100 !text-yellow-800"
                          : transaction.status === "COMPLETED"
                          ? "!bg-green-100 !text-green-800"
                          : "!bg-gray-100 !text-gray-800"
                      }`}
                    >
                      {transaction.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
