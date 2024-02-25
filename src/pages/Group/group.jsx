import React, { useState, useEffect } from "react";
import {
    Box,
    Flex,
    Heading,
    HStack,
    Stack,
    Text,
    Button,
    Image,
    Center,
    Input,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Spinner,
    Table,
    Thead,
    Tr,
    Tbody,
    Th,
    Td,

} from '@chakra-ui/react';
import { EditIcon, DeleteIcon, ViewIcon } from '@chakra-ui/icons';
import { IconButton } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import Footer from "../../Footer/footer";
import Header from "../../Header/header";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import FoodBackgroundImage from '../../img4.jpg';

const Group = () => {

    const navigate = useNavigate();
    const params = useParams();
    const GroupName = params.groupname;
    const GroupId = params.groupnumber;
    const HotelId = params.hotelid
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const hotelid = JSON.parse(localStorage.getItem('hotelid'));
    const user = userInfo ? userInfo.User : null;
    const [amount, setAmount] = useState(0);
    const [cartItems, setCartItems] = useState([]);
    const toast = useToast();
    var hotelName = JSON.parse(localStorage.getItem('hotelname'));
    const [admin, setAdmin] = useState();
    const [totalamount, setTotalAmount] = useState()


    console.log(user)
    useEffect(() => {
        if (!user) navigate('/login');
    }, [user]);


    const GetAllItems = async () => {

        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${userInfo?.Token['token']}`
                },
            };

            const { data, status } = await axios.post(
                `http://localhost:5000/api/groupOrders/fetchgroup`,
                {
                    groupId: GroupId
                },
                config
            );

            console.log(data, status, "allldatttttttttttttttttttt")
            if (status == 201) {
                setAdmin(data.adminId);
                setCartItems(data.cart);
                setTotalAmount(data.total);
                setIndividualtotal(data.indvtotal)
            }

            // var amount1 = 0;
            // for (let i = 0; i < data.items.length; i++) {
            //     amount1 += (data.items[i].price) * (data.items[i].quantity)
            // }

            // setAmount(amount1)
            // setCartItems(data.items);


        } catch (error) {
            console.log(error)
        }
    };



    useEffect(() => {
        GetAllItems()
    }, []);

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [inputValue, setInputValue] = useState("");
    const [groups, setGroup] = useState([]);
    const [loading, setLoading] = useState(false);
    const [generatedNumber, setGeneratedNumber] = useState(null);
    const [flag, setFlag] = useState(0);
    const [display, setDisplay] = useState(0);
    const [price, setPrice] = useState(25);
    const [code, setCode] = useState('');
    const [iseditable, setIsEditable] = useState(false);
    const [count, setCount] = useState(5);
    const [individualtotal, setIndividualtotal] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);

    const increaseQuantity = async (item) => {
        onClose();
        try {
            const config = {
                headers: {
                    "Content-type": "application/json"
                },
            };

            const { data, status } = await axios.post(
                `http://localhost:5000/api/groupOrders/groups/addItem`,
                {
                    "groupId": GroupId,
                    "item": item,
                    "userId": user._id,
                    "userName": user.userName

                },
                config
            );

            if (status == 200) {
                setTimeout(() => { GetAllItems() }, 500);
            }

        } catch (error) {
            console.log(error)
        }
    };

    const decreaseQuantity = async (item) => {
        onClose();
        try {
            const config = {
                headers: {
                    "Content-type": "application/json"
                },
            };

            const { data, status } = await axios.post(
                `http://localhost:5000/api/groupOrders/groups/removeItem`,
                {
                    "groupId": GroupId,
                    "item": item,
                    "userId": user._id,
                    "userName": user.userName
                },
                config
            );

            if (status == 200) {
                setTimeout(() => { GetAllItems() }, 500);
            }

        } catch (error) {
            console.log(error)
        }
    };

    const Payment = async () => {

        const answer = window.confirm('Are you sure?');
        if (answer) {

            try {
                const config = {
                    headers: {
                        "Content-type": "application/json",
                    },
                };

                const { data, status } = await axios.post(
                    "http://localhost:5000/api/groupOrders/placeGroupOrder",
                    {
                        "groupId": GroupId
                    },
                    config
                );

                if (status == 200) {
                    toast({
                        title: "Order Placed Successful",
                        status: "success",
                        duration: 5000,
                        isClosable: true,
                        position: "bottom",
                    });

                    navigate(`/congrats/${GroupId}`)
                }

            } catch (error) {
                toast({
                    title: "unable to Placed Order ",
                    description: error.response.data.message,
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom",
                });
            }
        }
    }


    const DeleteIndividualCart = async () => {

        const answer = window.confirm('Are you sure?');
        if (answer) {
            try {
                const config = {
                    headers: {
                        "Content-type": "application/json",
                    },
                };

                const { data, status } = await axios.post(
                    `http://localhost:5000/api/groupOrders/groups/deleteCart`, {
                    "groupId": GroupId,
                    "userId": user._id,
                    "userName": user.userName
                },
                    config
                );


                if (status == 200) {
                    toast({
                        title: "Cart Deleted Successful",
                        status: "success",
                        duration: 5000,
                        isClosable: true,
                        position: "bottom",
                    });
                    setTimeout(() => { navigate(`/addtocart`) }, 500);
                }

            } catch (error) {
                console.log(error)
            }
        }
    };

    const DeleteItem = async (item) => {
        onClose();
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };

            const { data, status } = await axios.post(
                `http://localhost:5000/api/groupOrders/groups/deleteItem`, {
                "groupId": GroupId,
                "userId": user._id,
                "userName": user.userName,
                "item": item
            },
                config
            );

            if (status == 200)
                setTimeout(() => { GetAllItems() }, 500);

        } catch (error) {
            console.log(error)
        }
    };



    const Delete = () => {
        console.log(HotelId, GroupId)
    }

    console.log(selectedItems, "selected")
    console.log(cartItems)

    return (
        <>
            <Header />
            <Flex
                style={{
                    backgroundImage: `url(${FoodBackgroundImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
                minHeight='100vh'
                color='white'
                align='center'
                justify='center'
                p={20}
            >
                <Box width={"100%"} padding={30} align={'center'} justify={'center'}>

                    <Text fontSize={"50px"} align={'center'} color={"black"} mb={3}>
                        {GroupName}
                    </Text>



                    <Flex>
                        <Box w="80%">

                            <Box p={8} width="80%" bg="white" borderRadius="md" boxShadow="md">
                                <Table variant="striped">
                                    <Thead >
                                        <Tr >
                                            <Th>Name</Th>
                                            {/* <Th>Items</Th> */}
                                            <Th>Total</Th>
                                            <Th>Items</Th>
                                            <Th>Edit</Th>
                                            <Th>Delete</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody >
                                        {cartItems.map((items, ind) => (
                                            <Tr key={items.userId}>
                                                <Td color="black">{items.userName}</Td>
                                                {/* <Td color="black">Maggie</Td> */}
                                                <Td color="black">{individualtotal[ind]}</Td>
                                                <Td color="black">
                                                    <IconButton
                                                        color="blue.400"
                                                        size="lg"
                                                        fontSize="md"
                                                        icon={<ViewIcon />}
                                                        onClick={() => { onOpen(); setIsEditable(false); setSelectedItems(items.items) }}
                                                        aria-label="View"
                                                    />
                                                </Td>
                                                <Td color="black">
                                                    <IconButton
                                                        color="green"
                                                        size="lg"
                                                        fontSize="md"
                                                        icon={<EditIcon />}
                                                        onClick={() => { onOpen(); setIsEditable(true); setSelectedItems(items.items) }}
                                                        aria-label="Edit"
                                                        isDisabled={items.userId == user._id ? false : true}
                                                    />
                                                </Td>
                                                <Td color="black">
                                                    <IconButton
                                                        color="red.400"
                                                        size="lg"
                                                        fontSize="md"
                                                        icon={<DeleteIcon />}
                                                        aria-label="Delete"
                                                        onClick={DeleteIndividualCart}
                                                        isDisabled={items.userId == user._id ? false : true}
                                                    />
                                                </Td>
                                            </Tr>
                                        ))}
                                    </Tbody>
                                </Table>

                            </Box>
                        </Box>
                        <Box w="30%" pl={5}>
                            <Flex
                                direction="column"
                                justify="space-between"
                                mb={4}
                                p={4}
                                bg="white"
                                boxShadow="md"
                                borderRadius="md"
                                height="320px"

                            >
                                <Stack spacing="4" align="left">
                                    <Text fontSize="xl" color="black" fontWeight="semibold">Order Summary</Text>
                                    <HStack justify="space-between">
                                        <Text fontSize="lg" fontWeight="semibold" color="black">Subtotal:</Text>
                                        <Text fontSize="lg" color="black">₹{totalamount}</Text>
                                    </HStack>
                                    <HStack justify="space-between">
                                        <Text fontSize="lg" fontWeight="semibold" color="black">Shipping + Tax:</Text>
                                        <Text fontSize="lg" align="right" color="black">Calculate shipping</Text>
                                    </HStack>
                                    <HStack justify="space-between">
                                        <Text fontSize="lg" fontWeight="semibold" color="black">Coupon Code:</Text>
                                        <Text fontSize="lg" color="black">Add coupon code</Text>
                                    </HStack>
                                    <HStack justify="space-between">
                                        <Text fontSize="lg" fontWeight="semibold" color="black">Total:</Text>
                                        <Text fontSize="lg" color="black">₹{totalamount}</Text>
                                    </HStack>
                                    <Box>
                                        <Button colorScheme="green" size="lg" fontSize="md" width={320} onClick={Payment} isDisabled={admin == user._id ? false : true}>
                                            Payment
                                        </Button>
                                    </Box>
                                    {/* <Box>
                                        <Button size="lg" fontSize="md" width={320} onClick={Delete} isDisabled={admin == user._id ? false : true}>
                                            Delete Cart
                                        </Button>
                                    </Box> */}
                                </Stack>
                            </Flex>
                        </Box>

                    </Flex>
                    {/* ) : (

                    hotelid ?
                    <Text fontSize={"50px"} color="white" align={"center"}>-- Nothing is Added to the Cart --</Text> :
                    <Text fontSize={"50px"} color="white" align={"center"}>-- Please Select Hotel --</Text>

                    )} */}
                </Box>


                <Modal size="3xl" onClose={onClose} isOpen={isOpen} isCentered>
                    <ModalOverlay />
                    <ModalContent >
                        <ModalHeader align={"center"} fontSize={"40px"} color="black" fontWeight="bold" >Sushant</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Box maxW="140%" borderWidth='1px' borderRadius='lg' overflow='hidden' ml={10} color="white">
                                <Table variant="striped">
                                    <Thead>
                                        <Tr>
                                            <Th color="black">Item</Th>
                                            <Th color="black">Price</Th>
                                            <Th color="black">Qnt.</Th>
                                            {iseditable && <Th color="black">Inc</Th>}
                                            {iseditable && <Th color="black">Dec</Th>}
                                            <Th color="black">Total</Th>
                                            {iseditable && <Th color="black">Delete</Th>}

                                        </Tr>
                                    </Thead>
                                    <Tbody >
                                        {selectedItems.map((item) => (
                                            <Tr key={item._id}>
                                                <Td color="black">{item.name}</Td>
                                                <Td color="black">{item.price}</Td>
                                                <Td color="black">{item.quantity}</Td>
                                                {
                                                    iseditable &&
                                                    <Td>
                                                        <Button size="sm" variant="outline" onClick={() => { increaseQuantity(item) }} >
                                                            +
                                                        </Button>
                                                    </Td>
                                                }
                                                {
                                                    iseditable &&
                                                    <Td>
                                                        <Button size="sm" variant="outline" onClick={() => { decreaseQuantity(item) }}>
                                                            -
                                                        </Button>
                                                    </Td>
                                                }
                                                <Td color="black">{item.price * item.quantity}</Td>
                                                {

                                                    iseditable &&
                                                    <Td color="black">
                                                        <IconButton
                                                            color="red.400"
                                                            size="lg"
                                                            fontSize="md"
                                                            icon={<DeleteIcon />}
                                                            aria-label="Delete"
                                                            isDisabled={!iseditable}
                                                            onClick={() => { DeleteItem(item); }}
                                                        />
                                                    </Td>
                                                }
                                            </Tr>
                                        ))}
                                    </Tbody>
                                </Table>
                            </Box>
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme="blue" mr={3} onClick={() => { onClose(); setSelectedItems([]) }}>
                                Close
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </Flex>
            <Footer />
        </>
    );
};

export default Group;
