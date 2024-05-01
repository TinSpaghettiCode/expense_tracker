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
  Stack,
  chakra,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

interface FormFields {
  description: string;
  amount: number;
  type: string;
  remarks: string;
}

const AddExpenseRecord = ({ isOpen, onClose }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>();

  const onSubmit = (data: FormFields) => {
    console.log(data);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <chakra.form onSubmit={handleSubmit(onSubmit)}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack>
              <FormControl isInvalid={!!errors.description}>
                <FormLabel>Description</FormLabel>
                <Input
                  type="text"
                  {...register("description", {
                    required: "Description is required",
                    minLength: {
                      value: 5,
                      message: "Description should be at least 5 character",
                    },
                  })}
                />
                <FormErrorMessage>
                  {errors.description?.message}
                </FormErrorMessage>
              </FormControl>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button type="submit" variant="ghost">
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </chakra.form>
    </Modal>
  );
};

export default AddExpenseRecord;
