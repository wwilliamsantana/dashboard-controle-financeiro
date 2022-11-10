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

interface CreateNewTransactionInputs{
  category: string
  description: string
  type: "income" | "outcome"
  price: number
}

interface TransactionsContextType{
  transactions: TransactionsProps[]
  fetchTransactions: (query?: string) => Promise<void>
  createNewTransaction: (data: CreateNewTransactionInputs) => Promise<void>
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
          _sort: "createdAt",
          _order: "asc",
          q:query
        }
      })

      setTransactions(response.data)
  }

  async function createNewTransaction(data: CreateNewTransactionInputs ){
    const {category, description, price, type } = data

    const response = await api.post("transactions", {
      category,
      description,
      price,
      type,
      createdAt: new Date()
    })

    setTransactions(state => [response.data, ...state])

  }

  useEffect(() => {
    fetchTransactions()
  }, [])
  
  return (
    <TransactionsContext.Provider value={{
      transactions, 
      fetchTransactions,
      createNewTransaction
    }}>
      {children}
    </TransactionsContext.Provider>
  )
}