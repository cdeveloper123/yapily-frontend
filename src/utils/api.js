import axios from "axios";
import { toast } from "react-toastify";

export const fetchLoginLink = async () => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/accounts/initiate-auth`,
      {
        applicationUserId: "test-user",
        institutionId: process.env.NEXT_PUBLIC_INSTITUTION_ID,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data?.authorisationUrl) {
      return response.data;
    }
  } catch (error) {
    console.error("Error fetching login link:", error);
    return null;
  }
};

export const updateAccounts = async (data) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/accounts/fetch`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          "consent-token": data.consent,
        },
      }
    );
    if (response) {
      toast.success("Accounts fetched successfully!", {
        position: "top-right",
      });
    }
    return response.data;
  } catch (error) {
    if (error.response) {
      toast.error("Something went wrong. Please try again later.");
    } else {
      toast.error("Something went wrong. Please try again later.");
    }
    console.log("Error updating accounts:", error);
  }
};

export const updateTransactions = async (data) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/transactions/fetch`,
      { accountId: data.accountId },
      {
        headers: {
          "Content-Type": "application/json",
          "consent-token": data.consent,
        },
      }
    );

    if (
      response.status === 201 &&
      response.data?.message === "Transactions fetched and stored successfully"
    ) {
      console.log("response", response);
      toast.success("Transactions fetched and stored successfully!");
      return response.data;
    } else {
      toast.error("Something went wrong. Please try again later.");
      return;
    }
  } catch (error) {
    if (error.response) {
      console.log("error.response", error.response);
      if (
        error.response.status === 500 &&
        error.response.data?.message ===
          "Unexpected error: Request failed with status code 404 "
      ) {
        toast.error("Something went wrong. Please try again later.");
      } else if (
        error.response.status === 403 &&
        error.response.data?.message ===
          "No transactions found for this user.. "
      ) {
        toast.error("No transactions found for this user.. ");
      } else {
        toast.error("Something went wrong. Please try again later.");
      }
    } else {
      toast.error("Something went wrong. Please try again later.");
    }
    return;
  }
};

export const displayAccounts = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/accounts`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    toast.error("Something went wrong. Please try again later.");
    console.log("Error displaying accounts:", error);
  }
};

export const showTransactions = async (payload) => {
  let accountId = payload?.accountId;
  try {
    const url = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/transactions/${accountId}`;

    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (
      response.data?.transactions?.message ===
      "No transactions found for this account ID."
    ) {
      toast.error("No transactions found for this account ID.");
      return;
    }
    if (response.data) {
      return response;
    }
  } catch (error) {
    console.error("Error fetching transactions:", error);
  }
};
