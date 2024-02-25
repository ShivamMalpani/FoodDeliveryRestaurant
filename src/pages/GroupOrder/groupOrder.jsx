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

const GroupOrder = () => {

    const navigate = useNavigate();
    const params = useParams();
    const GroupName = params.groupname;
    const GroupId = params.groupnumber;
    const HotelId = params.hotelid
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const user = userInfo ? userInfo.User : null;
    const role = user?.role;
    const [amount, setAmount] = useState(0);
    const [cartItems, setCartItems] = useState([]);
    const toast = useToast();
    var hotelName = JSON.parse(localStorage.getItem('hotelname'));




    useEffect(() => {
        if (!user) navigate('/login');
    }, [user]);


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
    const [totalamount, setTotalAmount] = useState()
    const [individualtotal, setIndividualtotal] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);

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
                // setAdmin(data.adminId);
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
                                height="260px"

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
                                </Stack>
                            </Flex>
                        </Box>

                    </Flex>

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
                                            <Th color="black">Total</Th>


                                        </Tr>
                                    </Thead>
                                    <Tbody >
                                        {selectedItems.map((item) => (
                                            <Tr key={item._id}>
                                                <Td color="black">{item.name}</Td>
                                                <Td color="black">{item.price}</Td>
                                                <Td color="black">{item.quantity}</Td>
                                                <Td color="black">{item.price * item.quantity}</Td>
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


export default GroupOrder;
