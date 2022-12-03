import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Box,
  Flex,
  Input,
  Button,
  useToast,
} from "@chakra-ui/react";

import CartTotalContext from "../../context/CartTotalProvider";
import CartItemsContext from "../../context/CartItemsProvider";
import { useContext, useState, useRef } from "react";
import CartItem from "./CartItem";
import ApprovedItem from "./ApprovedItems";
import ApprovedItemsContext from "../../context/ApprovedItemsProvider";

export default function Cart(props) {
  const [cartTotal, setCartTotal] = useContext(CartTotalContext);
  const [cartItems, setCartItems] = useContext(CartItemsContext);
  const [approvedItems, setApprovedItems] = useContext(ApprovedItemsContext);

  let cartItemsIds = Object.keys(cartItems);
  let approvedItemsIds = Object.keys(approvedItems);

  const [password, setPassword] = useState("");
  const [editMode, setEditMode] = useState(false);
  const toast = useToast();

  const addTotal = (newItemTotal) => {
    setCartTotal(cartTotal + newItemTotal);
  };

  const subTotal = (newItemTotal) => {
    setCartTotal(cartTotal - newItemTotal);
  };

  let cartLen = cartItemsIds.length;

  let showCart = "none";
  let showApprove = "none";
  if (cartLen > 0) {
    showCart = "show";
  }

  if (approvedItemsIds.length > 0) {
    showApprove = "show";
  }

  const approve_input_field = useRef();
  const edit_input_field = useRef();

  function showIncorrectPasswordToast() {
    toast({
      title: "Wrong code entered!",
      description: "Plese check your syntax.",
      status: "error",
      duration: 5000,
      isClosable: true,
    });
  }

  function checkPassword(tabPannel) {
    // console.log(passwo)
    if (tabPannel == "Approve") {
      if (password == props.admin_code) {
        let copyApprovedItems = { ...approvedItems };
        for (let i = 0; i < cartItemsIds.length; i++) {
          let cur_id = cartItemsIds[i];
          if (approvedItemsIds.includes(cur_id)) {
            copyApprovedItems[cur_id].quantity += cartItems[cur_id].quantity;
          } else copyApprovedItems[cur_id] = { ...cartItems[cur_id] };
        }
        setApprovedItems(copyApprovedItems);
        setCartItems({});
        setEditMode(false);
      }
      else {
        showIncorrectPasswordToast();
      }
      approve_input_field.current.value = "";

    } else if (tabPannel == "Edit") {
      if (password == props.admin_code) {
        setEditMode(true);
      }
      else {
        showIncorrectPasswordToast();
      }
      edit_input_field.current.value = "";
    }
  }

  return (
    <Tabs variant="enclosed" fontWeight="bold">
      <TabList>
        <Tab>Cart</Tab>
        <Tab>Approved</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <Box
            width="400px"
            height="auto"
            margin="auto"
            overflowY="scroll"
            scrollbar="none"
            maxHeight="55vh"
            display = "flex"
            flexDirection="column"
            justifyContent="center"
            sx={{
              "&::-webkit-scrollbar": {
                display: "visible",
                width: "8px",
                borderRadius: "2px",
                backgroundColor: `rgba(0, 0, 0, 0.05)`,
              },
            }}
          >
            {cartItemsIds.map((item_id) => (
              <CartItem key={item_id} item={cartItems[item_id].item} />
            ))}



            <Flex width="80%" mb="5">
              <Input
                type="password"
                width="80%"
                pr="5"
                placeholder="Enter code"
                required
                display={showCart}
                onChange={(e) => {
                  setPassword(e.currentTarget.value);
                }}
                float="left"
                ref={approve_input_field}
              />
              <Box display={showCart} pl="5">
                <Button
                  size="md"
                  colorScheme="blue"
                  onClick={function () {
                    checkPassword("Approve");
                  }}
                >
                  Approve
                </Button>
              </Box>
            </Flex>
          </Box>
        </TabPanel>
        <TabPanel>
        <Box
            width="400px"
            height="auto"
            margin="auto"
            overflowY="scroll"
            scrollbar="none"
            maxHeight="55vh"
            sx={{
              "&::-webkit-scrollbar": {
                display: "visible",
                width: "8px",
                borderRadius: "2px",
                backgroundColor: `rgba(0, 0, 0, 0.05)`,
              },
            }}
          >
            {approvedItemsIds.map((item_id) => (
              <ApprovedItem key={item_id}
                item={approvedItems[item_id].item}
                editMode={editMode}
              />
            ))}

            <Flex width="80%" mb="5">
              <Input
                type="password"
                width="80%"
                pr="5"
                placeholder="Enter code"
                required
                display={showApprove}
                onChange={(e) => {
                  setPassword(e.currentTarget.value);
                }}
                ref = {edit_input_field}
              />

              <Box display={showApprove}>
                <Button
                  size="md"
                  pr="8"
                  ml="2"
                  pl="8" mr="2"
                  colorScheme="orange"
                  onClick={function () {
                    checkPassword("Edit");
                  }}
                >
                  Edit
                </Button>
              </Box>
              <Box display={showApprove}>
                <Button
                  size="md"
                  colorScheme="blue"
                  onClick={function () {
                    setEditMode(false);
                  }}
                >
                  Save
                </Button>
              </Box>
            </Flex>
          </Box>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}
