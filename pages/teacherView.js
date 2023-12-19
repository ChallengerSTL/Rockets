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
  
  // import ItemCard from "./components/mainView/ItemCard";
  import Navbar from "./components/Navbar";
  // import CartItem from "./components/mainView/CartItem";
  // import Category from "./components/mainView/Category";
  // import BudgetBar from "./components/mainView/BudgetBar";
  // import Cart from "./components/mainView/Cart";
  import clientPromise from "../lib/mongodb";
  import BudgetRequest from "./components/teacherView/BudgetRequest";
  
  // import { useContext, useState } from "react";
  // import { setCookie, getCookie, hasCookie } from 'cookies-next';
  // import CartTotalContext from "../context/CartTotalProvider";
  // import CartItemsContext from "../context/CartItemsProvider";
  // import ApprovedItemsContext from "../context/ApprovedItemsProvider";
  // import { useEffect } from 'react';
  
  function Home({ items, admin_code }) {
  
    const formBackground = useColorModeValue("gray.700");
  
    let items_dict = {
      "Launch Port Rentals": [],
      "Delta Pneumatics®": [],
      "Intergalactic Paper Products®": [],
      "Stellar Adhesives®": [],
      "Mass Dynamics®": [],
      "Soaring Rocket Parts Plus®": [],
      "Your Commander": [],
    };
    for (let i = 0; i < items.length; i++) {
      items_dict[items[i].subcontractor].push(items[i]);
    }
    let categories = [
      "Launch Port Rentals",
      "Delta Pneumatics®",
      "Intergalactic Paper Products®",
      "Stellar Adhesives®",
      "Mass Dynamics®",
      "Soaring Rocket Parts Plus®",
      "Your Commander",
    ];
  
    return (
      <Box width="100%" position="relative">
        <Navbar />
        <Box width="100%" height="60px"/>
        <BudgetRequest admin_code={admin_code}/>
        <BudgetRequest admin_code={admin_code}/>
        <BudgetRequest admin_code={admin_code}/>
        <BudgetRequest admin_code={admin_code}/>
        <BudgetRequest admin_code={admin_code}/>
        <BudgetRequest admin_code={admin_code}/>
        <BudgetRequest admin_code={admin_code}/>
        <BudgetRequest admin_code={admin_code}/>
      </Box>
    );
  }
  
  export async function getServerSideProps() {
    const client = await clientPromise;
    const db = client.db("main");
  
    const items = await db.collection("items").find({}).toArray();
    const admin_code = await db.collection("code").find({}).toArray();
  
    return {
      props: { items: JSON.parse(JSON.stringify(items)), admin_code: JSON.parse(JSON.stringify(admin_code))[0]['admin_code']},
    };
  }
  
  export default Home;
  