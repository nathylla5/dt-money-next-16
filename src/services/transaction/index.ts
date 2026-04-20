import { ITransaction } from "@/types/transaction";
import { api } from "../api";

export async function getTransactions() {
  try {
    const response = await api.get<ITransaction[]>("/transactions");
    return response.data;
  } catch (error) {
    console.error("Error fetching transactions:", error);
    throw error;
  }
}

export async function createTransaction(transaction: ITransaction) {
    try {
        const response = await api.post<ITransaction>('/transactions', transaction);
    } catch (error) {
        console.error("Error creating transaction:", error);
        throw error;
    }
}

export async function deleteTransaction(id: string | number) {
  try {
    const response = await api.delete(`/transactions/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting transaction:", error);
    throw error;
  }
}

export async function updateTransaction(transaction: ITransaction) {
  try {
    // Assume-se que a interface ITransaction tem a propriedade 'id'
    const response = await api.put<ITransaction>(`/transactions/${transaction.id}`, transaction);
    return response.data;
  } catch (error) {
    console.error("Error updating transaction:", error);
    throw error;
  }
}