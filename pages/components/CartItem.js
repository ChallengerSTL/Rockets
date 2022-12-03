import * as React from "react";
import {
  Box,
  Flex,
  HStack,
  chakra,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Spacer,
  Grid,
  GridItem,
  Image,
  Heading,
  Stack,
  Text,
  Link,
  Select,
  SelectProps,
  CloseButton,
  useToast,
  useColorModeValue,
} from "@chakra-ui/react";
import CartTotalContext from "../../context/CartTotalProvider";
import { useContext, useState } from "react";
import CartItemsContext from "../../context/CartItemsProvider";

const IMAGE = "https://il.farnell.com/productimages/large/en_GB/1775788-40.jpg";
// let quantity = 2;

export default function CartItem(props) {

  const [cartTotal, setCartTotal] = useContext(CartTotalContext);
  const [cartItems, setCartItems] = useContext(CartItemsContext);

  let id = 0;
  let price = 0;
  let quantity = 0;
  let image_link = '';
  let name = '';
  if (props.item != undefined) {
    id = props.item._id;
    price = props.item.price;
    quantity = cartItems[props.item._id].quantity;
    image_link = props.item.image_link;
    name = props.item.name
  }

  let cartItemsIds = Object.keys(cartItems);

  // let quantity = cartItems[props.item._id].quantity;
  const toast = useToast();

  let itemTotal = price * quantity;
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const addTotal = (newItemTotal) => {
    setCartTotal(cartTotal + newItemTotal);
  };

  const subTotal = (newItemTotal) => {
    setCartTotal(cartTotal - newItemTotal);
  };

  function setQuantity(num) {
    let copyCartItems = { ...cartItems };
    copyCartItems[id].quantity = num;
    setCartItems(copyCartItems);
  }

  function increment() {
    if (cartTotal + price > 1000000) {
      toast({
        title: "Insufficent Funds",
        description: "You do not have enough money for this item",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    setQuantity(quantity + 1);
    let curTotal = (quantity + 1) * price;
    addTotal(price);
  }

  function decrement() {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      let curTotal = (quantity - 1) * price;
      subTotal(price);
    } else {
      deleteItem(id);
    }
    // else delete this cart item from cart
  }

  function deleteItem(item_id) {
    for (let i = 0; i < cartItemsIds.length; i++) {
      if (cartItemsIds[i] == item_id) {
        setCartTotal(cartTotal - quantity * price);
        let copyCartItems = { ...cartItems };
        delete copyCartItems[cartItemsIds[i]];
        setCartItems(copyCartItems);
        break;
      }
    }
  }

  let show = "show";
  if (cartTotal >= 1000000) {
    show = "none";
  }

  return (
    <Flex
      width="80%"
      height="125px"
      float="left"
      bg={useColorModeValue("white", "gray.900")}
      rounded="lg"
      mb="5"
      justifyContent="space-around"
    >
      <Box display="flex" width="125px"  float="left">
        <Image
          rounded={"lg"}
          height={"125px"}
          width={"125px"}
          src={image_link}
        />
      </Box>
      <Stack  width="100px" float="left" pl="2">
        <Text as="h4" fontWeight="400">
          {name}
        </Text>
        <Text
          as="span"
          fontSize="12px"
          fontWeight="300"
          color={useColorModeValue("white", "green.300")}
        >
          {formatter.format(price).slice(0, -3)}
          <Text as="span" fontWeight="200" fontSize="12px" color="gray.500">
            /unit
          </Text>
        </Text>
        <Flex m="auto" align="center" position="relative" top="5px">
          <Text pr="1" onClick={decrement} cursor="pointer">
            -
          </Text>
          <Text
            border="1px solid white"
            rounded="md"
            pt="1"
            pb="1"
            pr="4"
            pl="4"
          >
            {quantity}
          </Text>
          <Text pl="1" display={show} onClick={increment} cursor="pointer">
            +
          </Text>
        </Flex>
      </Stack>
      <Stack display="flex" width="90px">
        <CloseButton
          position="relative"
          left="55px"
          bottom="0"

          onClick={function () {
            deleteItem(id);
          }}
        />
        <Box
          position="relative"
          top="45px"
          right="5px"
          border="1px solid green"
          rounded="md"
          textAlign="center"
          p="1"
          color={useColorModeValue("white", "green.300")}
        >
          {formatter.format(itemTotal).slice(0, -3)}
        </Box>
      </Stack>
    </Flex>
  );
}
