import { Container } from '@chakra-ui/react'
import { Pagination } from '../../components/'
import { useGetTodosQuery } from '../../services'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import CreateTodo from './CreateTodo'
import SortTodo from './SortTodo'
import TodoList from './TodoList'
import {
  selectCurrentPage,
  selectSkip,
  selectSortBy,
  selectSortOrder,
  selectTake,
  setCurrentPage,
  setSkip,
} from '../../redux/todoSlice'

export default function Todo() {
  const dispatch = useAppDispatch()

  const skip = useAppSelector(selectSkip)
  const take = useAppSelector(selectTake)
  const sortOrder = useAppSelector(selectSortOrder)
  const sortBy = useAppSelector(selectSortBy)
  const currentPage = useAppSelector(selectCurrentPage)

  const { data } = useGetTodosQuery({ skip, take, sortBy, sortOrder })

  const handlePageChange = (page: number) => {
    const _skip = page === 1 ? 0 : (page - 1) * take
    dispatch(setSkip(_skip))
    dispatch(setCurrentPage(page))
  }

  return (
    <Container maxW="3xl">
      <CreateTodo mt="8"/>
      <SortTodo mt="5" />
      <TodoList mt="5" />
      <Pagination
        mt="4"
        totalItems={data?.count ?? 0}
        itemsPerPage={take}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </Container>
  )
}
