import { Box, BoxProps, Stack, StackDivider } from '@chakra-ui/react'
import { useGetTodosQuery, useGetUserQuery } from '../../services'
import { useAppSelector } from '../../redux/store'
import TodoItem from './TodoItem'
import {
  selectSortOrder,
  selectSkip,
  selectSortBy,
  selectTake,
} from '../../redux/todoSlice'
import styled from 'styled-components'

interface TodoListsProps extends BoxProps {}

export default function TodoLists({ ...props }: TodoListsProps) {
  const skip = useAppSelector(selectSkip)
  const take = useAppSelector(selectTake)
  const sortOrder = useAppSelector(selectSortOrder)
  const sortBy = useAppSelector(selectSortBy)

  const { data } = useGetTodosQuery({ skip, take, sortBy, sortOrder })
  const { data: user } = useGetUserQuery()

  const Title = styled.h1`
    text-align: center;
    margin: 5% 0 2% 0;
    font-weight: bold;
    font-size: 30px;
  `

  return (
    <Box {...props}>
      <Title>Todo List</Title>
      <Stack
        divider={<StackDivider />}
        border="1px"
        borderColor="gray.200"
        px="4"
        py="2"
        borderRadius="md"
      >
        {data?.todo.map(todo => (
          <TodoItem key={todo.id} {...{ todo, user }} />
        ))}
      </Stack>
    </Box>
  )
}
