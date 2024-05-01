import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Stack,
  Textarea,
  chakra,
} from "@chakra-ui/react";
import { useFrappeUpdateDoc } from "frappe-react-sdk";
import { useForm } from "react-hook-form";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  mutate: () => void;
  initialData: FormFields; // Thêm prop này để nhận dữ liệu ban đầu
};

interface FormFields {
  name: string;
  description: string;
  amount: number;
  type: string;
  remarks: string;
}

export const UpdateExpenseRecord = ({
  isOpen,
  onClose,
  mutate,
  initialData,
}: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>({
    defaultValues: initialData, // Khởi tạo form với dữ liệu ban đầu
  });

  const { updateDoc, loading } = useFrappeUpdateDoc();

  const onSubmit = (data: FormFields) => {
    updateDoc("Expense Record", initialData.name, data) // Sử dụng updateDoc thay vì createDoc
      .then(() => {
        console.log("Expense Record updated");
        onClose();
        mutate();
      })
      .catch((e) => {
        console.error(e);
      });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <chakra.form onSubmit={handleSubmit(onSubmit)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Expense Record</ModalHeader>{" "}
          {/* Thay đổi tiêu đề */}
          <ModalCloseButton />
          <ModalBody>
            <Stack>
              <FormControl isRequired isInvalid={!!errors.description}>
                <FormLabel>Description</FormLabel>
                <Input
                  type="text"
                  {...register("description", {
                    required: "Description is required",
                    minLength: {
                      value: 3,
                      message: "Description should be at least 3 character",
                    },
                  })}
                />
                <FormErrorMessage>
                  {errors.description?.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isRequired isInvalid={!!errors.amount}>
                <FormLabel>Amount</FormLabel>
                <Input
                  type="number"
                  {...register("amount", {
                    required: "Amount is required",
                    min: {
                      value: 1,
                      message: "Amount should be at least 1",
                    },
                  })}
                />
                <FormErrorMessage>{errors.amount?.message}</FormErrorMessage>
              </FormControl>

              <FormControl isRequired isInvalid={!!errors.type}>
                <FormLabel>Type</FormLabel>
                <Select
                  {...register("type", {
                    required: "Type is required",
                  })}
                >
                  <option value="">Select type</option>
                  <option value="Credit">Credit</option>
                  <option value="Debit">Debit</option>
                </Select>
                <FormErrorMessage>{errors.type?.message}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.remarks}>
                <FormLabel>Remarks</FormLabel>
                <Textarea {...register("remarks")} />
                <FormErrorMessage>{errors.remarks?.message}</FormErrorMessage>
              </FormControl>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="blue" type="submit" isLoading={loading}>
              Update {/* Thay đổi nút Save thành Update */}
            </Button>
          </ModalFooter>
        </ModalContent>
      </chakra.form>
    </Modal>
  );
};
