import {
    Box,
    Flex,
    Avatar,
    HStack,
    Link,
    Text,
    IconButton,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    useDisclosure,
    useColorModeValue,
    Stack,
    Input,
    InputGroup,
    InputLeftElement,
    Image,
    Badge,
    Select
} from '@chakra-ui/react'

import { FaShoppingCart, FaUser, FaSignOutAlt, FaSignInAlt, FaHome, FaBell } from 'react-icons/fa';
import ProfileModal from "./Profile/profilemodal"
import logo from "../logo.png"
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react';
import Clock from '../pages/Timer/timer';



const Header = () => {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [search, setSearch] = useState()
    const navigate = useNavigate()

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const user = userInfo ? userInfo.User : null
    const path = window.location.pathname;

    const email = user?.emailId;
    const isAdmin = user?.isAdmin;
    const role = user?.role;
    const hotelid = JSON.parse(localStorage.getItem('hotelid'));
    const hotelname = JSON.parse(localStorage.getItem('hotelname'));



    const logoutHandler = () => {
        localStorage.removeItem("userInfo");
        navigate("/login");
    };


    useEffect(() => {
        if (path == "verifymail") localStorage.removeItem("userInfo");
    }, [])

    useEffect(() => {
        // if (path == "verifymail") localStorage.removeItem("userInfo");
    }, [hotelid])



    const numberOfItemsInCart = 3;

    return (

        <Box
            bg={useColorModeValue('gray.100', 'gray.900')}
            px={4}
            // position={"auto"}
            position={"fixed"}
            top={0}
            width="100%"
            zIndex={5}
        >
            <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                <HStack spacing={8} alignItems={'center'}>

                    <Image
                        boxSize='60px'
                        src={logo}
                        alt='Logo'
                        borderRadius="50px"
                    />

                    <Stack direction={'row'} spacing={6}>
                        <Box as="a" href={'/'}
                            color={path == "/" ? "green" : null}
                            _hover={{
                                color: "white",
                                borderRadius: '5',
                                backgroundColor: "gray"
                            }}
                            padding={2}
                        >
                            Home
                        </Box>

                        {(role == "hotel" && user) &&
                            <Box as="a" href={'/items'}
                                color={path == "/items" ? "green" : null}
                                _hover={{
                                    color: "white",
                                    borderRadius: '5',
                                    backgroundColor: "gray"
                                }}
                                padding={2}
                            >
                                Items
                            </Box>
                        }

                        {
                            (user && path == "/addtocart" && hotelid != null) &&
                            <Box as="a" href={`/catalog/${hotelid}/${hotelname}`}
                                // color={path == "/addtocart" ? "green" : null}
                                _hover={{
                                    color: "white",
                                    borderRadius: '5',
                                    backgroundColor: "gray"
                                }}
                                padding={2}
                            >
                                Catalogs
                            </Box>
                        }

                        {
                            (role == "hotel" && user) &&
                            <Box as="a" href={'/neworders'}
                                color={path == "/neworders" ? "green" : null}
                                _hover={{
                                    color: "white",
                                    borderRadius: '5',
                                    backgroundColor: "gray"
                                }}
                                padding={2}
                            >
                                New Orders
                            </Box>
                        }
                        {
                            (role == "hotel" && user) &&
                            <Box as="a" href={'/acceptedorders'}
                                color={path == "/acceptedorders" ? "green" : null}
                                _hover={{
                                    color: "white",
                                    borderRadius: '5',
                                    backgroundColor: "gray"
                                }}
                                padding={2}
                            >
                                Accepted Orders
                            </Box>
                        }
                        {
                            (role == "hotel" && user) &&
                            <Box as="a" href={'/rejectedorders'}
                                color={path == "/rejectedorders" ? "green" : null}
                                _hover={{
                                    color: "white",
                                    borderRadius: '5',
                                    backgroundColor: "gray"
                                }}
                                padding={2}
                            >
                                Rejected Orders
                            </Box>
                        }

                        {
                            (role == "hotel" && user) &&
                            <Box as="a" href={'/additem'}
                                color={path == "/additem" ? "green" : null}
                                _hover={{
                                    color: "white",
                                    borderRadius: '5',
                                    backgroundColor: "gray"
                                }}
                                padding={2}
                            >
                                Add Item
                            </Box>
                        }

                        {
                            (role == "user" && user) &&
                            <Box as="a" href={'/userorders'}
                                color={path == "/userorders" ? "green" : null}
                                _hover={{
                                    color: "white",
                                    borderRadius: '5',
                                    backgroundColor: "gray"
                                }}
                                padding={2}
                            >
                                Orders
                            </Box>
                        }

                    </Stack>
                </HStack>


                <HStack alignItems={'end'} >
                    {/* <Clock /> */}
                    {
                        (user && path != "verifymail") ?
                            <>
                                {/* <IconButton
                                        aria-label="Add to Cart"
                                        icon={<AddIcon />}
                                        colorScheme="blue"
                                        size="sm"
                                        variant="outline"
                                        onClick={() => { navigate(`/addtocart`) }}
                                    /> */}
                                {
                                    role == "hotel" &&
                                    <Button colorScheme='blue' size='sm' variant='outline' onClick={() => { navigate(`/hotelprofile/${user?._id}`) }}>
                                        <FaUser />
                                    </Button>

                                }
                                {/* <IconButton icon={<Image
                                        boxSize='40px'
                                        src={logo}
                                        alt='Logo'
                                        borderRadius="50px"
                                        onClick={() => { navigate(`/hotelprofile/${user?._id}`) }}
                                    />} /> */}

                                {/* <IconButton icon={<Image
                                        boxSize='40px'
                                        src={logo}
                                        alt='Logo'
                                        borderRadius="50px"
                                        onClick={() => { navigate(`/userprofile/${user?._id}`) }}
                                    />} /> */}



                                {user && role == "user" && (
                                    (path != "/" && hotelid) &&
                                    <Button colorScheme='blue' size='sm' variant='outline' onClick={() => { navigate(`/addtocart`) }}>
                                        <FaShoppingCart />
                                        {/* {numberOfItemsInCart > 0 && (
                                            <Badge
                                                colorScheme="red"
                                                borderRadius="50%"
                                                ml="2"
                                                position="absolute"
                                                top="-5px"
                                                right="-5px"
                                            >
                                                {numberOfItemsInCart}
                                            </Badge>
                                        )} */}
                                    </Button>
                                )}

                                {
                                    role == "user" &&
                                    <Button colorScheme='blue' size='sm' variant='outline' onClick={() => { navigate(`/notification`) }}>
                                        <FaBell />
                                        {/* {numberOfItemsInCart > 0 && (
                                            <Badge
                                                colorScheme="red"
                                                borderRadius="50%"
                                                ml="2"
                                                position="absolute"
                                                top="-5px"
                                                right="-5px"
                                            >
                                                {numberOfItemsInCart}
                                            </Badge>
                                        )} */}
                                    </Button>

                                }

                                {
                                    role == "user" &&
                                    <Button colorScheme='blue' size='sm' variant='outline' onClick={() => { navigate(`/userprofile/${user?._id}`) }}>
                                        <FaUser />
                                    </Button>

                                }

                                <Button colorScheme='blue' size='sm' variant='outline' onClick={logoutHandler}>
                                    <FaSignOutAlt />
                                </Button>
                            </>

                            :
                            (
                                path == '/login' || path == '/signup' ?
                                    null
                                    :

                                    <Button colorScheme='blue' size='sm' variant='outline' onClick={() => navigate('/login')}>
                                        <FaSignInAlt />
                                    </Button>
                            )
                    }

                </HStack>

            </Flex>
        </Box>

    )
}

export default Header;

