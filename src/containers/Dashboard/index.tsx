import React, { useEffect, useState, useMemo, useCallback } from "react";
import Navbar from "../../components/Navbar";
import { useSelector } from "react-redux";

interface User {
  id: string;
  email: string;
}

interface Transaction {
  id: string;
  amount: number;
  recipient: string;
}

function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [transactionHistory, setTransactionHistory] = useState<Transaction[]>(
    []
  );

  const auth = useSelector((state: any) => state.auth);

  const fetchUser = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:3001/users/me", {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      });
      const userData: User = await response.json();
      setUser(userData);
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  }, [auth.accessToken]);

  const fetchTransactionHistory = useCallback(async () => {
    try {
      if (user) {
        const response = await fetch(
          `http://localhost:3001/transactions/${auth.userId}/history`,
          {
            headers: {
              Authorization: `Bearer ${auth.accessToken}`,
            },
          }
        );
        const transactionData: Transaction[] = await response.json();
        setTransactionHistory(transactionData);
      }
    } catch (error) {
      console.error("Failed to fetch transaction history:", error);
    }
  }, [auth.accessToken, user]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    if (user) {
      fetchTransactionHistory();
    }
  }, [fetchTransactionHistory, user]);

  const performTransaction = async (transactionDetails: any) => {
    try {
      const response = await fetch("http://localhost:3001/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.accessToken}`,
        },
        body: JSON.stringify(transactionDetails),
      });
      if (response.ok) {
        fetchTransactionHistory();
      } else {
        console.error("Failed to perform transaction");
      }
    } catch (error) {
      console.error("Failed to perform transaction:", error);
    }
  };

  const renderedUserInformation = useMemo(() => {
    if (user) {
      return (
        <div>
          <h1>Welcome: {auth.userId}</h1>
          <p>Email: {user.email}</p>
        </div>
      );
    }
    return null;
  }, [user]);

  const renderedTransactionHistory = useMemo(() => {
    if (Array.isArray(transactionHistory) && transactionHistory.length > 0) {
      return (
        <div className="mt-16">
          <h2>Transaction History</h2>
          <ul>
            {transactionHistory.map((transaction: any) => (
              <li key={transaction.id}>
                Amount: {transaction.amount}, Recipient:{" "}
                {transaction.recipient?.id}
              </li>
            ))}
          </ul>
        </div>
      );
    } else {
      return <div>No transaction history available.</div>;
    }
  }, [transactionHistory]);

  return (
    <div>
      <div className="sticky top-0 z-20">
        <Navbar />
      </div>
      {renderedUserInformation}
      <div>
        <h2>Perform Transaction</h2>
        <TransactionForm performTransaction={performTransaction} />
      </div>
      {renderedTransactionHistory}
    </div>
  );
}

function TransactionForm({
  performTransaction,
}: {
  performTransaction: (transactionDetails: any) => void;
}) {
  const [amount, setAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const auth = useSelector((state: any) => state.auth);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    performTransaction({
      amount: +amount,
      recipientId: recipient,
      senderId: auth.userId,
    });
    setAmount("");
    setRecipient("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-20 flex items-cebter justify-center gap-8"
    >
      <label>
        Amount:
        <input
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border border-black"
        />
      </label>
      <label>
        Recipient:
        <input
          type="text"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          className="border border-black"
        />
      </label>
      <button type="submit" className="p-2 bg-blue-400 rounded-md">
        Perform Transaction
      </button>
    </form>
  );
}

export default Dashboard;
