import { Box, BoxProps, Button, HStack, Stack, Text } from '@chakra-ui/react'
import styled from 'styled-components'
import { useAppDispatch, useAppSelector } from '../../redux/store'
import { SortOrder, TodoSortBy } from '../../types'
import {
  selectSortOrder,
  selectSortBy,
  setSortOrder,
  setSortBy,
} from '../../redux/todoSlice'

interface SortProps extends BoxProps {}

export default function SortTodo({ ...props }: SortProps) {
  const dispatch = useAppDispatch()

  const sortOrder = useAppSelector(selectSortOrder)
  const sortBy = useAppSelector(selectSortBy)

  const handleSortChange = (sortBy: TodoSortBy) => {
    dispatch(setSortBy(sortBy))
  }

  const handleOrderChange = (orderBy: SortOrder) => {
    dispatch(setSortOrder(orderBy))
  }
  const Title = styled.h1`
    text-align: center;
    font-weight: 600;
    font-size: 24px;
  `

  return (
    <Box {...props}>
      {/* <Stack border="1px" borderColor="gray.200" rounded="md" p="4"> */}
      <Title>Sort by</Title>
        {/* <HStack spacing={0} justify="space-between" mt="1.5" wrap="wrap" gap="2"> */}
          <HStack width='50%' justify='space-between' alignItems='center' margin="0 auto" mt='4'>
            <SortButton
              current="username"
              active={sortBy}
              label="Username"
              onClick={() => handleSortChange('username')}
            />
            <SortButton
              current="email"
              active={sortBy}
              label="E-mail"
              onClick={() => handleSortChange('email')}
            />
            <SortButton
              current="completed"
              active={sortBy}
              label="Completion"
              onClick={() => handleSortChange('completed')}
            />
          </HStack>

          {/* <HStack>
            <SortButton
              current="asc"
              active={sortOrder}
              label="ASC"
              onClick={() => handleOrderChange('asc')}
            />
            <SortButton
              current="desc"
              active={sortOrder}
              label="DESC"
              onClick={() => handleOrderChange('desc')}
            />
          </HStack> */}
        {/* </HStack> */}
      {/* </Stack> */}
    </Box>
  )
}

function SortButton({
  active,
  current,
  onClick,
  label,
}: {
  active: string
  current: string
  onClick: () => void
  label: string
}) {
  return (
    <Button
      size="sm"
      {...{ onClick }}
      colorScheme={current === active ? 'blue' : 'gray'}
    >
      {label}
    </Button>
  )
}
