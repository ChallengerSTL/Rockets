import * as React from "react";
import {
    Flex,
    Heading,
    Input,
    Button,
    Grid,
    GridItem,
    useColorMode,
    useColorModeValue,
    Wrap,
    WrapItem,
    Box,
    Progress,
    Text,
  } from "@chakra-ui/react";

export default function BudgetRequest(props){


return(
    <Flex
      width="20%"
      margin="20px"
      height="500px"
      float="left"
      bg={useColorModeValue("white", "gray.900")}
      rounded="lg"
      mb="5"
      justifyContent="center"
      flexDirection="column"
    >
    <table>
    <tr>
      <th>Item</th>
      <th>Quantity</th>
      <th>Cost</th>
    </tr>
    <tr>
      <td>Launch Attempt</td>
      <td>1x</td>
      <td>$150,000</td>
    </tr>
    <tr>
      <td>Rocket Fuel</td>
      <td>3x</td>
      <td>$2,400</td>
    </tr>
  </table>

        <Flex width="95%" mt="auto" justifyContent="space-around" mb="3">
            <Input
              type="password"
              width="50%"
              placeholder="Enter code"
              required
              onChange={(e) => {
                setPassword(e.currentTarget.value);
              }}
            />
            <Button
              colorScheme="blue"
              onClick={function () {
                checkPassword("Approve");
              }}
            >
              Approve
            </Button>
        </Flex>

    </Flex>
);
}