import * as React from "react";
import {
  Box,
  Flex,
  HStack,
  chakra,
  Input,
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
import CartTotalContext from "../../../context/CartTotalProvider";
import { useContext, useState } from "react";
import CartItemsContext from "../../../context/CartItemsProvider";
import ApprovedItemsContext from "../../../context/ApprovedItemsProvider";

const IMAGE = "https://il.farnell.com/productimages/large/en_GB/1775788-40.jpg";
// let quantity = 2;

export default function ApprovedItems(props) {
  const [cartTotal, setCartTotal, approvedCartTotal, setApprovedCartTotal, unapprovedCartTotal, setUnapprovedCartTotal] = useContext(CartTotalContext);
  const [cartItems, setCartItems] = useContext(CartItemsContext);
  const [approvedItems, setApprovedItems] = useContext(ApprovedItemsContext);

  let id = 0;
  let price = 0;
  let image_link = '';
  let name = '';
  let editMode = false;
  let quantity = 0;
  if (props.item != undefined) {
    id = props.item._id;
    price = props.item.price;
    image_link = props.item.image_link;
    name = props.item.name;
  }
  if (props.editMode != undefined) {
    editMode = props.editMode;
  }

  let cartItemsIds = Object.keys(cartItems);
  let approvedItemsIds = Object.keys(approvedItems);
  if (approvedItems[id] != undefined)
    quantity = parseInt(approvedItems[id].quantity);

  let quantity_str = quantity.toString();
  if (quantity_str == '0')
    quantity_str = '';

  const [password, setPassword] = useState("");

  const toast = useToast();
  function display_toast(title, description, status) {
    toast({
      title: title,
      description: description,
      status: status,
      duration: 3000,
      isClosable: true,
    });
  }

  let itemTotal = price * quantity;
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });


  function setQuantity(num) {
    let copyApprovedItems = { ...approvedItems };
    copyApprovedItems[id].quantity = num;
    setApprovedItems(copyApprovedItems);
  }

  function increment() {
    if (cartTotal + price > 1000000) {
      display_toast("Insufficent Funds", "You do not have enough money for this item", "error");
      return;
    }
    setQuantity(quantity + 1);
    recalcTotal();
  }

  function decrement() {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    } else {
      if (quantity == 1){
        setQuantity(0);
      }
      deleteItem(id);
    }
    recalcTotal();
  }

  function deleteItem(item_id) {
    for (let i = 0; i < approvedItemsIds.length; i++) {
      if (approvedItemsIds[i] == item_id) {
        recalcTotal();
        let copyApprovedItems = { ...approvedItems };
        delete copyApprovedItems[approvedItemsIds[i]];
        setApprovedItems(copyApprovedItems);
        break;
      }
    }
  }

  function getInputQuantity(event){
    let newQuantity = parseInt(event.target.value);
    // Input validation
    if (newQuantity < 0) {
      display_toast("Invalid input", "Input must be a number greater than or equal to 0", "error");
      return;
    }
    if(cartTotal + ((newQuantity - quantity) * price) > 1000000){
      display_toast("Insufficent Funds", "You do not have enough money for this item", "error");
      return;
    }

    // Set new quantity
    if(newQuantity == "" && quantity != 0){
      setQuantity(0);
      recalcTotal();
      event.target.value = '';
    }
    else if (newQuantity != ""){
      setQuantity(newQuantity);
      recalcTotal();
    }
  }

  function recalcTotal(){ // TODO: approved cart total does not update properly on refresh
    let newCartTotal = 0;
    for (const itemId of approvedItemsIds) {
      const item = approvedItems[itemId];
      newCartTotal += item.quantity * item.price;
      console.log(itemId+": q="+item.quantity+", p="+item.price);
    }
    setApprovedCartTotal(newCartTotal);
    setCartTotal(newCartTotal + unapprovedCartTotal);
  }

  let showInc = "none";
  let showDec = "none";
  if (editMode) {
    if (cartTotal >= 1000000) {
      showInc = "none";
    } else {
      showInc = "show";
    }
    showDec = "show";
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
      <Box display="flex" width="125px"  float="left" >
        <Image
          rounded={"lg"}
          height={"125px"}
          width={"125px"}
          objectFit={"cover"}
          src={image_link}
        />
      </Box>
      <Stack pl="2" width="105px" justifyContent="space-around">
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
        <Flex m="auto" align="center" position="relative" bottom="2px">
          <Text pr="1" onClick={decrement} cursor="pointer" display={showDec}>
            -
          </Text>

          {
            editMode ? (
              <Input
                size="sm"
                type="number"
                width="45px"
                rounded="md"
                p="3"
                onChange={getInputQuantity}
                value={quantity_str}
              />
            ) : (
              <Text>
                x{quantity_str}
              </Text>
            )
          }

          <Text pl="1" display={showInc} onClick={increment} cursor="pointer">
            +
          </Text>
        </Flex>
      </Stack>
      <Stack display="flex" width="auto" m="auto" h="120px" justifyContent="center">
        <CloseButton
          position="relative"
          width="75px"
          left="30px"
          bottom="20px"
          display={showDec}
          onClick={function () {
            deleteItem(id);
          }}
        />
        <Box
          position="relative"
          top="20px"
          right="5px"
          border="1px solid green"
          rounded="md"
          p="1"
          textAlign="center"
          color={useColorModeValue("white", "green.300")}
        >
          {formatter.format(itemTotal).slice(0, -3)}
        </Box>
      </Stack>
    </Flex>
  );
}
