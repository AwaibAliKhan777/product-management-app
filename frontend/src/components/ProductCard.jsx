import {
  Box,
  Heading,
  useColorModeValue,
  Image,
  Text,
  HStack,
  IconButton,
  useToast,
  Modal,
  ModalOverlay,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalContent,
  Input,
  VStack,
  useDisclosure,
  ModalFooter,
  Button,
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import React, { useState } from 'react';
import { useProductStore } from '../store/product';

const ProductCard = ({ product }) => {
  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "gray.800");
  const { deleteProduct, updateProduct } = useProductStore();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [updatedProduct, setUpdatedProduct] = useState({
    name: product.name,
    price: product.price,
    image: product.image
  });

  const handleDeleteProduct = async (pid) => {
    const { success, message } = await deleteProduct(pid);
    toast({
      title: success ? 'Success' : 'Error',
      description: message,
      status: success ? 'success' : 'error',
      duration: 3000,
      isClosable: true,
    });
  };

  const handleUpdateProduct = async () => {
    const { success, message } = await updateProduct(product._id, updatedProduct);
    toast({
      title: success ? 'Success' : 'Error',
      description: message,
      status: success ? 'success' : 'error',
      duration: 3000,
      isClosable: true,
    });
    if (success) onClose();
  };

  return (
    <Box
      shadow='lg'
      rounded='lg'
      overflow='hidden'
      transition='all 0.3s'
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
      bg={bg}
    >
      <Image
        src={product.image}
        alt={product.name}
        h={48}
        w='full'
        objectFit='cover'
      />
      <Box p={4}>
        <Heading as='h3' size='md' mb={2}>{product.name}</Heading>
        <Text fontWeight='bold' fontSize='xl' color={textColor} mb={4}>${product.price}</Text>

        <HStack spacing={2}>
          <IconButton icon={<EditIcon />} onClick={onOpen} colorScheme='blue' aria-label="Edit" />
          <IconButton icon={<DeleteIcon />} onClick={() => handleDeleteProduct(product._id)} colorScheme='red' aria-label="Delete" />
        </HStack>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Input
                placeholder="Product Name"
                value={updatedProduct.name}
                onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
              />
              <Input
                placeholder="Price"
                value={updatedProduct.price}
                onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}
              />
              <Input
                placeholder="Image URL"
                value={updatedProduct.image}
                onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value })}
              />
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button variant='ghost' onClick={handleUpdateProduct}>Update</Button>
            <Button colorScheme='blue' mr={3} onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ProductCard;
