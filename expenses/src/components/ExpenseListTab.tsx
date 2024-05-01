import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Center,
  HStack,
  Heading,
  Spinner,
  Stack,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { useFrappeGetDocList } from "frappe-react-sdk";
import AddExpenseRecord from "./AddExpenseRecord";

interface ExpenseFields {
  name: string;
  formatted_amount: string;
  type: string;
  description: string;
  remarks: string;
  owner: string;
}

const ExpenseListTab = () => {
  const { data, isLoading, error } = useFrappeGetDocList<ExpenseFields>(
    "Expense Record",
    {
      fields: ["name", "formatted_amount", "type", "description", "remarks"],
    }
  );

  const { isOpen, onOpen, onClose } = useDisclosure();

  console.log(data, isLoading, error);
  return (
    <Stack>
      <HStack justify={"space-between"}>
        <Heading as="h3" fontSize={"xx-large"}>
          Expenses
        </Heading>
        <Box>
          <Button colorScheme="blue" onClick={onOpen}>
            Add
          </Button>
        </Box>
      </HStack>

      {isLoading && (
        <Center h="40vh">
          <Spinner />
        </Center>
      )}

      {error && (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>{error.exception}</AlertTitle>
          <AlertDescription>{error.httpStatus}</AlertDescription>
        </Alert>
      )}

      {data && (
        <Table>
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Description</Th>
              <Th>Amount</Th>
              <Th>Type</Th>
              <Th>Remarks</Th>
              <Th>Owner</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((d: ExpenseFields) => (
              <Tr key={d.name}>
                <Td>{d.name}</Td>
                <Td>{d.description}</Td>
                <Td>{d.formatted_amount}</Td>
                <Td>{d.type}</Td>
                <Td>{d.remarks}</Td>
                <Td>{d.owner}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
      <AddExpenseRecord isOpen={isOpen} onClose={onClose} />
    </Stack>
  );
};

export default ExpenseListTab;
