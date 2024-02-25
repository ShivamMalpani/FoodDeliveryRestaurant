import React, { useState, useEffect } from 'react';
import {
    Box,
    Button,
    Flex,
    Table,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    Text,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Image,
    Badge,
    Spinner
} from '@chakra-ui/react';

import Header from '../../Header/header';
import Footer from '../../Footer/footer';
import Pagination from '../Pagination/pagination';
import FoodBackgroundImage from '../../img4.jpg';
import axios from "axios"
import { IconButton } from '@chakra-ui/react';
import { EditIcon, DeleteIcon, ViewIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';

const RejectedOrders = () => {

    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [allorders, setAllOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState([]);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const [loading, setLoading] = useState(true);
    const user = userInfo ? userInfo.User : null

    // const orders = [
    //     { id: 1, name: 'John Doe', items: ['Item 1', 'Item 2'], status: 'Rejected' },
    //     { id: 2, name: 'Jane Doe', items: ['Item 3', 'Item 4'], status: 'Rejected' },
    //     { id: 3, name: 'Jane Doe', items: ['Item 5', 'Item 6'], status: 'Rejected' },
    //     { id: 4, name: 'John Doe', items: ['Item 1', 'Item 2'], status: 'Rejected' },
    //     { id: 5, name: 'Jane Doe', items: ['Item 3', 'Item 4'], status: 'Rejected' },
    //     { id: 6, name: 'Jane Doe', items: ['Item 5', 'Item 6'], status: 'Rejected' },
    //     { id: 7, name: 'John Doe', items: ['Item 1', 'Item 2'], status: 'Rejected' },
    //     { id: 8, name: 'Jane Doe', items: ['Item 3', 'Item 4'], status: 'Rejected' },
    //     { id: 9, name: 'Jane Doe', items: ['Item 5', 'Item 6'], status: 'Rejected' },
    //     { id: 10, name: 'John Doe', items: ['Item 1', 'Item 2'], status: 'Rejected' },
    //     { id: 11, name: 'Jane Doe', items: ['Item 3', 'Item 4'], status: 'Rejected' },
    //     { id: 12, name: 'Jane Doe', items: ['Item 5', 'Item 6'], status: 'Rejected' },
    //     { id: 13, name: 'John Doe', items: ['Item 1', 'Item 2'], status: 'Rejected' },
    //     { id: 14, name: 'Jane Doe', items: ['Item 3', 'Item 4'], status: 'Rejected' },
    //     { id: 15, name: 'Jane Doe', items: ['Item 5', 'Item 6'], status: 'Rejected' },
    //     { id: 16, name: 'John Doe', items: ['Item 1', 'Item 2'], status: 'Rejected' },
    //     { id: 17, name: 'Jane Doe', items: ['Item 3', 'Item 4'], status: 'Rejected' },
    //     { id: 18, name: 'Jane Doe', items: ['Item 5', 'Item 6'], status: 'Rejected' },
    //     { id: 19, name: 'John Doe', items: ['Item 1', 'Item 2'], status: 'Rejected' },
    //     { id: 20, name: 'Jane Doe', items: ['Item 3', 'Item 4'], status: 'Rejected' },
    //     { id: 21, name: 'Jane Doe', items: ['Item 5', 'Item 6'], status: 'Rejected' },
    //     { id: 22, name: 'John Doe', items: ['Item 1', 'Item 2'], status: 'Rejected' },
    //     { id: 23, name: 'Jane Doe', items: ['Item 3', 'Item 4'], status: 'Rejected' },
    //     { id: 24, name: 'Jane Doe', items: ['Item 5', 'Item 6'], status: 'Rejected' },
    //     { id: 25, name: 'John Doe', items: ['Item 1', 'Item 2'], status: 'Rejected' },
    //     { id: 26, name: 'Jane Doe', items: ['Item 3', 'Item 4'], status: 'Rejected' },
    //     { id: 27, name: 'Jane Doe', items: ['Item 5', 'Item 6'], status: 'Rejected' },
    //     { id: 28, name: 'John Doe', items: ['Item 1', 'Item 2'], status: 'Rejected' },
    //     { id: 29, name: 'Jane Doe', items: ['Item 3', 'Item 4'], status: 'Rejected' },
    //     { id: 30, name: 'Jane Doe', items: ['Item 5', 'Item 6'], status: 'Rejected' },
    //     { id: 31, name: 'John Doe', items: ['Item 1', 'Item 2'], status: 'Rejected' },
    //     { id: 32, name: 'Jane Doe', items: ['Item 3', 'Item 4'], status: 'Rejected' },
    //     { id: 33, name: 'Jane Doe', items: ['Item 5', 'Item 6'], status: 'Rejected' },
    //     { id: 34, name: 'John Doe', items: ['Item 1', 'Item 2'], status: 'Rejected' },
    //     { id: 35, name: 'Jane Doe', items: ['Item 3', 'Item 4'], status: 'Rejected' },
    //     { id: 36, name: 'Jane Doe', items: ['Item 5', 'Item 6'], status: 'Rejected' },
    // ];

    const handleAccept = (orderId) => {
        console.log(`Order ${orderId} accepted`);
    };

    const handleReject = (orderId) => {
        console.log(`Order ${orderId} rejected`);
    };

    const [currentPage, setCurrentPage] = useState(0);
    const ordersPerPage = 6;
    const totalPages = Math.ceil(orders.length / ordersPerPage)

    const indexOfLastOrder = (currentPage + 1) * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };


    const GetHotelOrders = async () => {
        setLoading(true);
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${userInfo?.Token['token']}`
                },
            };

            const { data, status } = await axios.post(
                `http://localhost:5000/api/orders/getOrderByHotel`,
                {
                    hotelId: user._id
                },
                config
            );


            if (status == 201) {
                // setAllOrders(data.hotelOrders)
                setTimeout(() => { setAllOrders(data.hotelOrders); }, 800);
                setTimeout(() => { setLoading(false) }, 1000);
            }

        } catch (error) {
            setTimeout(() => { setLoading(false) }, 800);
            console.log("Error")

        }
    };



    useEffect(() => {
        GetHotelOrders()
    }, [])

    useEffect(() => {

        var neworders = [];
        allorders.forEach((order) => {
            if (order.orderAcceptOrDecline == "Rejected") {
                neworders.push(order)
            }
        })

        setOrders(neworders);

    }, [allorders])




    // ==========================================================================================================================
    const [grouporders, setGroupOrders] = useState([]);
    const [allgrouporders, setAllGroupOrders] = useState([]);
    const [selectedGroupOrder, setSelectedGroupOrder] = useState([]);

    const [currentgroupPage, setCurrentGroupPage] = useState(0);
    const groupordersPerPage = 6;
    const totalgroupPages = Math.ceil(grouporders.length / groupordersPerPage)

    const indexOfLastGroupOrder = (currentgroupPage + 1) * groupordersPerPage;
    const indexOfFirstGroupOrder = indexOfLastGroupOrder - groupordersPerPage;
    const currentGroupOrders = grouporders.slice(indexOfFirstGroupOrder, indexOfLastGroupOrder);

    const handleGroupPageChange = (newPage) => {
        setCurrentGroupPage(newPage);
    };

    const [personalOrder, setPersonalOrder] = useState(true);
    const toggleDetails = () => {
        setPersonalOrder(!personalOrder);
    };

    const getGroupOrderByHotel = async () => {
        setLoading(true);
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${userInfo?.Token['token']}`
                },
            };

            const { data, status } = await axios.post(
                `http://localhost:5000/api/groupOrders/gethotelgrouporders`,
                {
                    hotelId: user._id
                },
                config
            );

            console.log(data)

            if (status == 201) {
                setAllGroupOrders(data.hotelOrders);
                setTimeout(() => { setLoading(false) }, 1000);
            }

        } catch (error) {
            setTimeout(() => { setLoading(false) }, 800);
            console.log("Error")

        }
    };

    useEffect(() => {
        getGroupOrderByHotel()
    }, [])


    useEffect(() => {

        var newgrouporders = [];
        allgrouporders.forEach((order) => {
            if (order.orderStatus == "ORDER_REJECTED") {
                newgrouporders.push(order)
            }
        })

        setGroupOrders(newgrouporders);

    }, [allgrouporders])

    console.log(grouporders)

    return (
        <>
            <Header />
            <Flex
                p={20}
                style={{
                    backgroundImage: `url(${FoodBackgroundImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
                minHeight='100vh'
                color='white'
                align='center'
                justify='center'
            // minH={'80vh'}
            // align={'left'}
            // justify={'center'}
            // bg="gray"
            // p={20}
            >
                {/* {orders.length > 0 ? */}
                {loading ? (
                    <Spinner
                        thickness="4px"
                        speed="0.65s"
                        emptyColor="gray.200"
                        color="blue.500"
                        size="xl"
                    // ml="25%"
                    />) : <>
                    {
                        <Box p={8} width="70%" bg="white" borderRadius="md" boxShadow="md">
                            <Box display={"flex"} align="center" justify="center" ml={"20%"}>
                                {
                                    personalOrder &&
                                    <Text fontSize={"50px"} align={'center'} mb={6} color={"black"}>
                                        Rejected Orders
                                    </Text>
                                }
                                {
                                    !personalOrder &&
                                    <Text fontSize={"50px"} align={'center'} mb={6} color={"black"}>
                                        Group Rejected Orders
                                    </Text>
                                }
                                <Button onClick={toggleDetails} colorScheme="blue" mt={6} ml={10} >
                                    {personalOrder ? "Group Rejected Orders" : "Rejected Orders"}
                                </Button>
                            </Box>
                            {/* <Text fontSize="50px" align={'center'} mb={6} color={"black"}>
                            Rejected Orders
                        </Text> */}
                            <Table variant="striped">
                                <Thead>
                                    <Tr>
                                        {/* <Th>ID</Th> */}
                                        <Th>UserName</Th>
                                        {/* {personalOrder && <Th>Items</Th>} */}
                                        <Th>Items</Th>
                                        <Th>Amount</Th>
                                        <Th>Status</Th>
                                        {/* {!personalOrder && <Th>View</Th>} */}
                                    </Tr>
                                </Thead>

                                {
                                    personalOrder &&
                                    <Tbody>
                                        {currentOrders.map((order) => (
                                            <Tr key={order._id}>
                                                {/* <Td color="black">{order?._id.slice(0, 10)}....</Td> */}
                                                <Td color="black">{order.userName}</Td>
                                                {/* <Td color="black">{order.items.join(', ')}</Td> */}
                                                <Td color="black" onClick={() => { setSelectedOrder(order?.cartItems); onOpen(); }} _hover={{ cursor: "pointer" }}>{order.cartItems[0].name}...</Td>
                                                <Td color="black">{order.amount}</Td>
                                                <Td color="red"><Box border={"1px solid pale"} borderRadius={"10px"} w={"45%"} p={3} color="black" bg="red.300">{order.orderAcceptOrDecline}</Box></Td>
                                            </Tr>
                                        ))}
                                    </Tbody>
                                }
                                {
                                    !personalOrder &&
                                    <Tbody>
                                        {currentGroupOrders.map((order) => (
                                            <Tr key={order._id}>
                                                {/* <Td color="black">{order?._id.slice(0, 10)}....</Td> */}
                                                <Td color="black">{order.groupName}</Td>
                                                {/* <Td color="black">{order.items.join(', ')}</Td> */}
                                                <Td color="black" onClick={() => { setSelectedOrder(order?.items); onOpen(); }} _hover={{ cursor: "pointer" }}>{order.items[0].name}...</Td>
                                                <Td color="black">{order.amount}</Td>
                                                <Td color="red"><Box border={"1px solid pale"} borderRadius={"10px"} w={"45%"} p={3} color="black" bg="red.300">{"Rejected"}</Box></Td>
                                                {/* <Td color="black">
                                            <IconButton
                                                color="blue.400"
                                                size="lg"
                                                fontSize="md"
                                                icon={<ViewIcon />}
                                                onClick={() => { navigate("/grouporder/123456/1233/pigeons") }}
                                                aria-label="View"
                                            />
                                        </Td> */}
                                            </Tr>
                                        ))}
                                    </Tbody>
                                }
                                {orders.length == 0 && personalOrder &&
                                    <Tbody >
                                        <Td> <Box color="black"></Box></Td>
                                        <Td> <Box color="black"></Box></Td>
                                        <Td> <Box color="black">-- No Orders --</Box></Td>
                                        <Td> <Box color="black"></Box></Td>
                                    </Tbody>
                                }
                                {grouporders.length == 0 && !personalOrder &&
                                    <Tbody >
                                        <Td> <Box color="black"></Box></Td>
                                        <Td> <Box color="black"></Box></Td>
                                        <Td> <Box color="black">-- No Orders --</Box></Td>
                                        <Td> <Box color="black"></Box></Td>
                                    </Tbody>
                                }

                            </Table>

                            {(orders.length > 6) && personalOrder &&
                                <Pagination
                                    totalPages={totalPages}
                                    currentPage={currentPage}
                                    handlePageChange={handlePageChange}

                                />
                            }

                            {(grouporders.length > 6) && !personalOrder &&
                                <Pagination
                                    totalPages={totalgroupPages}
                                    currentPage={currentgroupPage}
                                    handlePageChange={handleGroupPageChange}

                                />
                            }
                            {/* {(orders.length > 6) &&
                            <Pagination totalPages={totalPages} currentPage={currentPage} handlePageChange={handlePageChange} />
                        } */}
                        </Box>
                    }
                </>
                }
                {/* ) : (
                    <Text p={8} fontSize="2xl" color="black" align="center">
                        -- No Orders --
                    </Text>
                )} */}
            </Flex>

            <Modal size="lg" onClose={onClose} isOpen={isOpen} isCentered>
                <ModalOverlay />
                {/* <ModalContent bg="green.300"> */}
                <ModalContent>
                    <ModalHeader align={"center"} fontSize={"40px"} color="white" fontWeight="bold" >{selectedOrder?.hotelName}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden' ml={10} color="white">
                            <Table variant="striped">
                                <Thead >
                                    <Tr >

                                        <Th color="black">Item Name</Th>
                                        <Th color="black">Price</Th>
                                        <Th color="black">Quantity</Th>

                                    </Tr>
                                </Thead>
                                <Tbody >
                                    {selectedOrder.map((item) => (
                                        <Tr key={item._id}>
                                            <Td color="black">{item.name}</Td>
                                            <Td color="black">{item.price}</Td>
                                            <Td color="black">{item.quantity}</Td>
                                        </Tr>
                                    ))}
                                </Tbody>
                            </Table>
                        </Box>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={() => { onClose(); setSelectedOrder([]) }}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <Footer />
        </>
    );
};

export default RejectedOrders;



