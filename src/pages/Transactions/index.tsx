import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary";
import { SearchForm } from "./components/SearchForm";
import { PriceHighLight, TransactionContainer, TransactionsTable } from "./styles";

interface TransactionsProps{
  id: number
  description: string
  type: "income" | "outcome"
  price: number
  category: string
  createdAt: string
}


export function Transactions(){
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
    <div>
      <Header/>
      <Summary/>

      <TransactionContainer>
        <SearchForm/>
        <TransactionsTable>
          <tbody>
           {transactions.map(transaction => {
            return (
              <tr key={transaction.id}>
                <td width="50%">{transaction.description}</td>
                  <td>
                  <PriceHighLight variant={transaction.type}>{transaction.price}</PriceHighLight>
                  </td>
                <td>{transaction.category}</td>
              <td>{transaction.createdAt}</td>
            </tr>
            )
           })}

        
        
          </tbody>
        </TransactionsTable>
      </TransactionContainer>


    </div>
  )
}