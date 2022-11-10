import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../lib/axios";

interface TransactionsProps{
  id: number
  description: string
  type: "income" | "outcome"
  price: number
  category: string
  createdAt: string
}

interface TransactionsContextType{
  transactions: TransactionsProps[]
  fetchTransactions: (query?: string) => Promise<void>
}

interface TransactionsProvider{
  children: ReactNode
}

export const TransactionsContext = createContext({} as TransactionsContextType)

export function TransactionsProvider({children}: TransactionsProvider){
  const [transactions, setTransactions] = useState<TransactionsProps[]>([])

  async function fetchTransactions(query?: string){
      const response = await api.get("transactions", {
        params:{
          q:query
        }
      })

      setTransactions(response.data)
  }

  useEffect(() => {
    fetchTransactions()
  }, [])
  
  return (
    <TransactionsContext.Provider value={{
      transactions, 
      fetchTransactions
    }}>
      {children}
    </TransactionsContext.Provider>
  )
}