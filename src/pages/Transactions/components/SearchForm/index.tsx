import { MagnifyingGlass } from "phosphor-react";
import { useForm } from "react-hook-form";
import { SearchFormContainer } from "./styles";
import * as z from "zod"
import {zodResolver} from "@hookform/resolvers/zod"
import { useContext } from "react";
import { TransactionsContext } from "../../../../context/TransactionsContext";

const searchFormSchema = z.object({
  query: z.string()
})

type SearchFormInput = z.infer<typeof searchFormSchema>

export function SearchForm(){
  const {register, handleSubmit, formState:{isSubmitting}} = useForm<SearchFormInput>({
    resolver: zodResolver(searchFormSchema)
  })

  const {fetchTransactions} = useContext(TransactionsContext)

  async function handleSearchForm(data: SearchFormInput){
    await fetchTransactions(data.query)
  }

  return(
    <SearchFormContainer onSubmit={handleSubmit(handleSearchForm)}>
      <input 
        autoComplete="off"
        type="text" 
        placeholder="Busque por transações" 
        {...register("query")}
      />
      <button type="submit" disabled={isSubmitting}>
        <MagnifyingGlass size={20}/>
        Buscar
      </button>
    </SearchFormContainer>
  )
}