import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary";
import { PriceHighLight, TransactionContainer, TransactionsTable } from "./styles";

export function Transactions(){
  return (
    <div>
      <Header/>
      <Summary/>

      <TransactionContainer>
        <TransactionsTable>
          <tbody>
            <tr>
              <td width="50%">Desenvolvimento de site</td>
              <td>
               <PriceHighLight variant="income">R$ 12.000,00</PriceHighLight>
              </td>
              <td>Venda</td>
              <td>13/04/2022</td>
            </tr>

            <tr>
              <td width="50%">Downpipe</td>
              <td>
                <PriceHighLight variant="outcome"> - R$ 2.000,00</PriceHighLight>
              </td>
              <td>Compra</td>
              <td>13/04/2022</td>
            </tr>
        
          </tbody>
        </TransactionsTable>
      </TransactionContainer>


    </div>
  )
}