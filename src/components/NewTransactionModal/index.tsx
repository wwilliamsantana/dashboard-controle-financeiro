import * as Dialog from '@radix-ui/react-dialog';
import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react';
import { CloseButton, Content, Overlay, TransactionType, TransactionTypeButton } from './styles';
import * as z from "zod"
import {zodResolver} from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form';

const newTransactionSchema = z.object({
  description: z.string(),
  price: z.number(),
  category: z.string(),
  // type: z.enum(["income", "outcome"])
})

type NewTransactionsFormInputs = z.infer<typeof newTransactionSchema>

export function NewTransactionModal(){
  const {register, handleSubmit, formState:{isSubmitting}} = useForm<NewTransactionsFormInputs>({
    resolver: zodResolver(newTransactionSchema)
  })

  async function handleCreateTransaction(data: NewTransactionsFormInputs){
    await new Promise(resolve => setTimeout(resolve, 2000))
    console.log(data)
  }

  return(
   <Dialog.Portal>
       <Overlay/>
     <Content>
       <Dialog.Title>Nova transação</Dialog.Title>

       <CloseButton>
          <X size={24}/>
       </CloseButton>

       <form onSubmit={handleSubmit(handleCreateTransaction)}>
        <input
          autoComplete='off' 
          type="text" 
          placeholder='Descrição' 
          required
          {...register("description")} 
        />
        <input
          autoComplete='off' 
          type="number" 
          placeholder='Preço' 
          required
          {...register("price", {valueAsNumber: true})} 
        />
        <input
          autoComplete='off' 
          type="text" 
          placeholder='Categoria' 
          required
          {...register("category")} 
        />
        
        <TransactionType>

            <TransactionTypeButton value='income' variant='income'>
              <ArrowCircleUp size={24}/>
              Entrada
            </TransactionTypeButton>

            <TransactionTypeButton value='outcome' variant='outcome'>
              <ArrowCircleDown size={24}/>
              Saída
            </TransactionTypeButton>

        </TransactionType>

        <button type="submit" disabled={isSubmitting}>Cadastrar</button>
       </form>
       
        
     </Content>
   </Dialog.Portal>
  )
}