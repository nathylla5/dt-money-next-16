'use client';
import { BodyContainer } from "@/components/BodyContainer";
import { CardContainer } from "@/components/CardContainer";
import { FormModal } from "@/components/FormModal";
import { Header } from "@/components/Header";
import { Table } from "@/components/Table";
import { ITransaction, TotalCard } from "@/types/transaction";
import { useMemo, useState } from "react";

// Nosso banco de dados de emergência (direto na memória)
const initialTransactions: ITransaction[] = [
  { id: "1", title: "Salário", price: 5000, category: "Trabalho", type: "INCOME", data: new Date("2024-06-01") },
  { id: "2", title: "Aluguel", price: 1500, category: "Moradia", type: "OUTCOME", data: new Date("2024-06-05") }
];

export default function Home() {
  // A lista de transações que vai aparecer na tela
  const [transactions, setTransactions] = useState<ITransaction[]>(initialTransactions);

  const [transactionToEdit, setTransactionToEdit] = useState<any>(null); 
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); 
  const [transactionIdToDelete, setTransactionIdToDelete] = useState<string | number | null>(null); 
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);

  function handleEditTransaction(transaction: any) {
    setTransactionToEdit(transaction); 
    setIsFormModalOpen(true); 
  }

  function handleDeleteRequest(id: string | number) {
    setTransactionIdToDelete(id); 
    setIsDeleteModalOpen(true); 
  }

  // Função que cria ou edita direto na nossa lista local
  const handleAddTransaction = (data: any) => {
    if (data.id) {
      const updatedTransactions = transactions.map(t => 
        t.id === data.id ? { ...t, ...data, data: new Date() } : t
      );
      setTransactions(updatedTransactions);
    } else {
      const newTransaction = { ...data, id: String(Math.random()), data: new Date() };
      setTransactions([...transactions, newTransaction]);
    }
    setIsFormModalOpen(false);
  };
  
  // Função que exclui direto da nossa lista local
  const confirmDelete = () => {
    if (transactionIdToDelete) {
      const newTransactions = transactions.filter(t => t.id !== transactionIdToDelete);
      setTransactions(newTransactions);
    }
    setIsDeleteModalOpen(false);
  };

  const calculaTotal = useMemo(() => {
    const totals = transactions.reduce<TotalCard>((acc, transaction) => {
      if (transaction.type === "INCOME") {
        acc.income += Number(transaction.price);
        acc.total += Number(transaction.price);
      } else {
        acc.outcome += Number(transaction.price);
        acc.total -= Number(transaction.price);
      }
      return acc;
    }, { total: 0, income: 0, outcome: 0 })

    return totals;
  }, [transactions]);

  return (
    <div className="h-full min-h-screen">
      <Header handleOpenFormModal={() => {
        setTransactionToEdit(null);
        setIsFormModalOpen(true);
      }} />

      <BodyContainer>
        <CardContainer totalValues={calculaTotal} />
        <Table
          data={transactions} 
          onEdit={handleEditTransaction}
          onDelete={handleDeleteRequest}
        />
      </BodyContainer>

      {isFormModalOpen && (
        <FormModal
          closeModal={() => setIsFormModalOpen(false)}
          title={transactionToEdit ? "Editar Transação" : "Criar Transação"}
          addTransaction={handleAddTransaction}
          transactionToEdit={transactionToEdit}
        />
      )}

      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Excluir Transação</h2>
            <p className="text-gray-600 mb-6">Tem certeza que deseja excluir esta transação? Essa ação não pode ser desfeita.</p>
            <div className="flex gap-4 justify-end">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 font-bold"
              >
                Cancelar
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 font-bold"
              >
                Confirmar Exclusão
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}