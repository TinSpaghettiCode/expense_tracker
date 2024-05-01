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
import { useFrappeDeleteDoc, useFrappeGetDocList } from "frappe-react-sdk";
import { AddExpenseRecord } from "./AddExpenseRecord";
import { UpdateExpenseRecord } from "./UpdateExpenseRecord";
import { useState } from "react";

interface ExpenseFields {
  name: string;
  amount: number;
  formatted_amount: string;
  type: string;
  description: string;
  remarks: string;
  owner: string;
}

const ExpenseListTab = () => {
  const {
    isOpen: isAddModalOpen,
    onOpen: onAddModalOpen,
    onClose: onAddModalClose,
  } = useDisclosure();
  const {
    isOpen: isUpdateModalOpen,
    onOpen: onUpdateModalOpen,
    onClose: onUpdateModalClose,
  } = useDisclosure();
  const [currentExpense, setCurrentExpense] = useState<ExpenseFields | null>(
    null
  );

  const { data, isLoading, error, mutate } = useFrappeGetDocList<ExpenseFields>(
    "Expense Record",
    {
      fields: [
        "name",
        "amount",
        "formatted_amount",
        "type",
        "description",
        "remarks",
      ],
    }
  );

  const { deleteDoc } = useFrappeDeleteDoc();
  const handleDelete = (name: string) => {
    deleteDoc("Expense Record", name)
      .then(() => {
        console.log("Expense Record deleted");
        mutate();
      })
      .catch((e) => {
        console.error(e);
      });
  };

  // Probs: Socket.io connection is not working
  // useFrappeDocTypeEventListener("Expense Record", (d) => {
  //   console.log("Event Listener", d);
  //   if (d.doctype === "Expense Record") {
  //     console.log("Expense Record Updated");
  //     mutate();
  //   }
  // });

  return (
    <Stack>
      <HStack justify={"space-between"}>
        <Heading as="h3" fontSize={"xx-large"}>
          Expenses
        </Heading>
        <Box>
          <Button colorScheme="blue" onClick={onAddModalOpen}>
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
              <Th>Actions</Th>
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
                <Td>
                  <Button
                    colorScheme="blue"
                    size="sm"
                    marginRight="2"
                    onClick={() => {
                      setCurrentExpense(d);
                      onUpdateModalOpen();
                    }}
                  >
                    Update
                  </Button>
                  <Button
                    colorScheme="red"
                    size="sm"
                    onClick={() => handleDelete(d.name)}
                  >
                    Delete
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
      <AddExpenseRecord
        isOpen={isAddModalOpen}
        onClose={onAddModalClose}
        mutate={mutate}
      />

      {currentExpense && (
        <UpdateExpenseRecord
          isOpen={isUpdateModalOpen}
          onClose={onUpdateModalClose}
          initialData={currentExpense}
          mutate={mutate}
        />
      )}
    </Stack>
  );
};

export default ExpenseListTab;
