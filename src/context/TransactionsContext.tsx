import { createContext, ReactNode, useEffect, useState } from "react";

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
}

interface TransactionsProvider{
  children: ReactNode
}

export const TransactionsContext = createContext({} as TransactionsContextType)

export function TransactionsProvider({children}: TransactionsProvider){
  const [transactions, setTransactions] = useState<TransactionsProps[]>([])

  async function loadingTransactions(){
      const response = await fetch("http://localhost:3000/transactions")
      const data = await response.json()

      setTransactions(data)
  }

  useEffect(() => {
    loadingTransactions()
  }, [])
  
  return (
    <TransactionsContext.Provider value={{transactions}}>
      {children}
    </TransactionsContext.Provider>
  )
}