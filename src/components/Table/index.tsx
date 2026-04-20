import { ITransaction } from "@/types/transaction"
import { formatDate, formatPrice } from "@/utils"

export type TableProps = {
  data: ITransaction[]
  // Adicionamos essas duas propriedades para a tabela saber o que fazer ao clicar
  onEdit: (transaction: ITransaction) => void
  onDelete: (transactionId: string | number) => void
}

export const Table = ({ data, onEdit, onDelete }: TableProps) => {
  return (
    <>
      <table className="w-full mt-16 border-separate border-spacing-y-2">
        <thead>
          <tr>
            <th className="px-4 text-left text-table-header text-base font-medium">Titulo</th>
            <th className="px-4 text-left text-table-header text-base font-medium">Preço</th>
            <th className="px-4 text-left text-table-header text-base font-medium">Categoria</th>
            <th className="px-4 text-left text-table-header text-base font-medium">Data</th>
            {/* Nova coluna para os botões */}
            <th className="px-4 text-center text-table-header text-base font-medium">Ações</th>
          </tr>
        </thead>
        <tbody>
          {data.map((transaction) => (
            <tr key={transaction.id} className="h-16">
              <td className="px-4 py-4 whitespace-nowrap text-title bg-white rounded-l-lg">{transaction.title}</td>
              <td className={`px-4 py-4 whitespace-nowrap ${transaction.type === "INCOME" ? "text-income" : "text-outcome"} bg-white`}>{formatPrice(transaction.price)}</td>
              <td className="px-4 py-4 whitespace-nowrap text-title bg-white">{transaction.category}</td>
              
              {/* Tirei o rounded-r-lg daqui */}
              <td className="px-4 py-4 whitespace-nowrap text-title bg-white">{formatDate(transaction.data)}</td>
              
              {/* Nova célula com os botões (coloquei o rounded-r-lg aqui) */}
              <td className="px-4 py-4 whitespace-nowrap text-title bg-white rounded-r-lg">
                <div className="flex gap-4 justify-center">
                  <button 
                    onClick={() => onEdit(transaction)}
                    className="font-bold text-blue-500 hover:text-blue-700 transition-colors"
                  >
                    Editar
                  </button>
                  <button 
                    onClick={() => onDelete(transaction.id)}
                    className="font-bold text-red-500 hover:text-red-700 transition-colors"
                  >
                    Excluir
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}