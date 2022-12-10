import { ReactNode } from "react";
import {
  Box,
  Flex,
  Link,
  Image,
  Button,
  useDisclosure,
  useColorMode,
  useColorModeValue,
  Stack,
  Heading,
  Text
} from "@chakra-ui/react";

export default function Navbar() {
  const LOGO = 'https://www.challengertlh.com/wp-content/uploads/2015/09/siteicon.png';
  const DATA_LINK = 'https://docs.google.com/spreadsheets/d/1e2LOBWFq6agmLVsf5ouCIWbAH4i8N1bpwxHpc8LwxtI/edit?usp=sharing'
  return (

      <Box bg={useColorModeValue("gray.100", "gray.700")} px={4} width="100%"
      position="fixed" zIndex="2">
        <Flex h={16} alignItems={"center"}>
          <Image height={50} width={50} src={LOGO}  objectFit={'cover'}/>
          <Text as="h1" fontSize="18px" ml="20px"> The Great Rocket Design Challenge </Text>
          <Link
            href={DATA_LINK}
            color="lightblue"
            ml="20px"
            _hover={{
              textDecoration: "none"
            }}
            isExternal
          >
            <Button>
              Rockets Testing Data
            </Button>
           </Link>
        </Flex>
      </Box>

  );
}
