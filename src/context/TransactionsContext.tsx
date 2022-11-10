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
  fetchTransactions: (query?: string) => Promise<void>
}

interface TransactionsProvider{
  children: ReactNode
}

export const TransactionsContext = createContext({} as TransactionsContextType)

export function TransactionsProvider({children}: TransactionsProvider){
  const [transactions, setTransactions] = useState<TransactionsProps[]>([])

  async function fetchTransactions(query?: string){
      const url = new URL("http://localhost:3000/transactions")

      if(query){
        url.searchParams.append("q", query)
      }

      console.log(url)

      const response = await fetch(url)
      const data = await response.json()

      setTransactions(data)
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