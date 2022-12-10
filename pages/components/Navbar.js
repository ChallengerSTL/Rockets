import { ReactNode } from "react";
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Image,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorMode,
  useColorModeValue,
  Stack,
  Heading,
  Text
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, AddIcon } from "@chakra-ui/icons";
import { BsSun, BsMoonStarsFill } from 'react-icons/bs';

const Links = ["Challenger Learning Center"];

const NavLink = ({ children }, { children: ReactNode }) => (
  <Link
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.200", "gray.700"),
    }}
    href={"#"}
  >
    {children}
  </Link>
);

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {colorMode, toggleColorMode } = useColorMode();
  const formBackground = useColorModeValue("gray.100", "gray.700");
  const LOGO = 'https://www.challengertlh.com/wp-content/uploads/2015/09/siteicon.png';
  return (

      <Box bg={useColorModeValue("gray.100", "gray.700")} px={4} width="100%"
      position="fixed" zIndex="2">
        <Flex h={16} alignItems={"center"}>
          <Image height={50} width={50} src={LOGO}  objectFit={'cover'}/>
          <Text as="h1" fontSize="18px" ml="20px"> The Great Rocket Design Challenge </Text>
          <Link
            href={"google.com"}
            color="lightblue"
            ml="20px"
            _hover={{
              textDecoration: "none"
            }}
          >
            <Button>
              Rockets Testing Data
            </Button>
           </Link>
        </Flex>
      </Box>

  );
}
