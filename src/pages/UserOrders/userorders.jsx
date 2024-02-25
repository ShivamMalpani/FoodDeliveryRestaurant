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
import { IconButton } from '@chakra-ui/react';
import { EditIcon, DeleteIcon, ViewIcon } from '@chakra-ui/icons';
import Header from '../../Header/header';
import Footer from '../../Footer/footer';
import Pagination from '../Pagination/pagination';
import FoodBackgroundImage from '../../img4.jpg';
import axios from "axios"
import { useNavigate } from 'react-router-dom';
const UserOrders = () => {



    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const user = userInfo ? userInfo.User : null
    const path = window.location.pathname;
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) navigate('/login')
    }, [user])

    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState([]);

    // const orders = [
    //     { id: 1, name: 'John Doe', items: ['Item 1', 'Item 2'], status: 'Pending', hotelName: "Tech cafe", },
    //     { id: 2, name: 'Jane Doe', items: ['Item 3', 'Item 4'], status: 'Accepted', hotelName: "Tech cafe", },
    //     { id: 3, name: 'Jane Doe', items: ['Item 5', 'Item 6'], status: 'Rejected', hotelName: "Tech cafe", },
    //     { id: 4, name: 'John Doe', items: ['Item 1', 'Item 2'], status: 'Pending', hotelName: "Tech cafe", },
    //     { id: 5, name: 'Jane Doe', items: ['Item 3', 'Item 4'], status: 'Accepted', hotelName: "Tech cafe", },
    //     { id: 6, name: 'Jane Doe', items: ['Item 5', 'Item 6'], status: 'Rejected', hotelName: "Tech cafe", },
    //     { id: 7, name: 'John Doe', items: ['Item 1', 'Item 2'], status: 'Pending', hotelName: "Tech cafe", },
    //     { id: 8, name: 'Jane Doe', items: ['Item 3', 'Item 4'], status: 'Accepted', hotelName: "Tech cafe", },
    //     { id: 9, name: 'Jane Doe', items: ['Item 5', 'Item 6'], status: 'Rejected', hotelName: "Tech cafe", },
    // ];


    const GetUserOrders = async () => {
        setLoading(true);
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${userInfo?.Token['token']}`
                },
            };

            const { data, status } = await axios.post(
                `http://localhost:5000/api/orders/getOrderByUser`,
                {
                    userId: user._id
                },
                config
            );


            if (status == 201) {
                // setOrders(data.userOrders)
                setTimeout(() => { setOrders(data.userOrders); }, 800);
                setTimeout(() => { setLoading(false) }, 1000);
            }

        } catch (error) {
            setTimeout(() => { setLoading(false) }, 800);
            console.log("Error")

        }
    };


    useEffect(() => {
        GetUserOrders()
    }, [])


    const handleAccept = (orderId) => {
        console.log(`Order ${orderId} accepted`);
    };

    const handleReject = (orderId) => {
        console.log(`Order ${orderId} rejected`);
    };



    const [currentPage, setCurrentPage] = useState(0);
    const ordersPerPage = 6;
    const totalPages = Math.ceil(orders?.length / ordersPerPage)

    const indexOfLastOrder = (currentPage + 1) * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = orders?.slice(indexOfFirstOrder, indexOfLastOrder);

    const { isOpen, onOpen, onClose } = useDisclosure();


    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };


    // ==========================================================================================================================

    const handleFetchAllGroups = async () => {

        try {

            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };

            const { data, status } = await axios.post(
                "http://localhost:5000/api/groupOrders/getusergrouporders",
                {
                    "userId": user._id,
                },
                config
            );


            if (status == 201) {
                const listofgroup = data.userGroups;
                const afterfiltering = []
                listofgroup.map((items, index) => {
                    if (items.orderStatus !== "ORDER_PENDING")
                        afterfiltering.splice(0, 0, items)
                })

                setGroupOrders(afterfiltering)

            }

        } catch (error) {
            console.log(error)
        }
    }

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

    useEffect(() => {
        handleFetchAllGroups()
    }, [])





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
            // align={'center'}
            // justify={'center'}
            // bg="gray"
            // p={20}

            >
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
                        <Box p={8} width="75%" bg="white" borderRadius="md" boxShadow="md">
                            <Box display={"flex"} align="center" justify="center" ml={"35%"}>
                                {
                                    personalOrder &&
                                    <Text fontSize={"50px"} align={'center'} mb={6} color={"black"}>
                                        Orders
                                    </Text>
                                }
                                {
                                    !personalOrder &&
                                    <Text fontSize={"50px"} align={'center'} mb={6} color={"black"}>
                                        Group Orders
                                    </Text>
                                }
                                <Button onClick={toggleDetails} colorScheme="blue" mt={6} ml={10} >
                                    {personalOrder ? "Group Orders" : "Personal Orders"}
                                </Button>
                            </Box>

                            <Table variant="striped">
                                <Thead >
                                    <Tr >
                                        {/* <Th>ID</Th> */}
                                        {!personalOrder && <Th>Group Name</Th>}
                                        {!personalOrder && <Th>Group Number</Th>}
                                        <Th>Hotel Name</Th>
                                        {/* {personalOrder && <Th>Items</Th>} */}
                                        {personalOrder && <Th>Items</Th>}
                                        {!personalOrder && <Th>View Items</Th>}
                                        {personalOrder && <Th>Items</Th>}
                                        <Th>Status</Th>
                                        {/* {personalOrder && <Th>Action</Th>} */}
                                    </Tr>
                                </Thead>
                                {
                                    personalOrder &&
                                    <Tbody>
                                        {currentOrders.map((order) => (
                                            <Tr key={order.id}>
                                                {/* <Td color="black">{order?._id.slice(0, 10)}...</Td> */}
                                                {/* <Td color="black">{user.userName}</Td> */}
                                                <Td color="black">{order.hotelName}</Td>
                                                <Td color="black" onClick={() => { setSelectedOrder(order?.cartItems); onOpen(); }} _hover={{ cursor: "pointer" }}>{order.cartItems[0].name}...</Td>
                                                <Td color="black">{order.amount}</Td>
                                                {/* <Td color={order.status == "Accepted" ? 'green' : (order.status == "Rejected") ? 'red' : "black"}>{order.status}</Td> */}
                                                <Td color="red"><Box border={"1px solid pale"} borderRadius={"10px"} w={"50%"} p={3} color="white" bg="green.500">{order.orderStatus}</Box></Td>
                                                {/* <Td>
                                                    <Flex justify={"space-between"}>
                                                        <Button ml={2} colorScheme="red" onClick={() => handleReject(order._id)} isDisabled={(order.orderStatus == "Rejected") || (order.orderStatus == "Accepted") || (order.orderStatus == "Processed") || (order.orderStatus == "Delivered") ? true : false}>
                                                            Reject
                                                        </Button>
                                                    </Flex>
                                                </Td> */}
                                            </Tr>
                                        ))}
                                    </Tbody>
                                }
                                {
                                    !personalOrder &&
                                    <Tbody>
                                        {currentGroupOrders.map((order) => (
                                            <Tr key={order.id} >
                                                {/* <Td color="black">{order?._id.slice(0, 10)}...</Td> */}
                                                {/* <Td color="black">{user.userName}</Td> */}
                                                <Td color="black">{order.groupName}</Td>
                                                <Td color="black">{order.groupId}</Td>
                                                <Td color="black">{order.hotelName}</Td>
                                                <Td color="black">
                                                    <IconButton
                                                        color="blue.400"
                                                        size="lg"
                                                        fontSize="md"
                                                        icon={<ViewIcon />}
                                                        onClick={() => { navigate(`/grouporder/${order.groupId}/${order.hotelId}/${order.groupName}`) }}
                                                        aria-label="View"
                                                    />
                                                </Td>
                                                {/* <Td color="black">{order.amount}</Td> */}
                                                {/* <Td color={order.status == "Accepted" ? 'green' : (order.status == "Rejected") ? 'red' : "black"}>{order.status}</Td> */}
                                                {order.orderStatus == "ORDER_PLACED" &&
                                                    <Td color="red"><Box border={"1px solid pale"} borderRadius={"10px"} w={"63%"} p={3} color="white" bg="green.500">Pending</Box></Td>
                                                }
                                                {order.orderStatus == "ORDER_REJECTED" &&
                                                    <Td color="red"><Box border={"1px solid pale"} borderRadius={"10px"} w={"63%"} p={3} color="white" bg="green.500">Rejected</Box></Td>
                                                }
                                                {order.orderStatus == "ORDER_DELIVERED" &&
                                                    <Td color="red"><Box border={"1px solid pale"} borderRadius={"10px"} w={"63%"} p={3} color="white" bg="green.500">Delivered</Box></Td>
                                                }
                                                {order.orderStatus == "ORDER_ACCEPTED" &&
                                                    <Td color="red"><Box border={"1px solid pale"} borderRadius={"10px"} w={"63%"} p={3} color="white" bg="green.500">Processed</Box></Td>
                                                }

                                                {/* {
                                                    <Td color="red"><Box border={"1px solid pale"} borderRadius={"10px"} w={"60%"} p={3} color="white" bg="green.500">{order.orderStatus}</Box></Td>
                                                } */}
                                                {/* <Td>
                                                    <Flex justify={"space-between"}>
                                                        <Button ml={2} colorScheme="red" onClick={() => handleReject(order._id)} isDisabled={(order.orderStatus == "Rejected") || (order.orderStatus == "Accepted") || (order.orderStatus == "Processed") || (order.orderStatus == "Delivered") ? true : false}>
                                                            Reject
                                                        </Button>
                                                    </Flex>
                                                </Td> */}
                                            </Tr>
                                        ))}
                                    </Tbody>
                                }
                                {orders.length == 0 && personalOrder &&
                                    <Tbody >
                                        <Td> <Box color="black"></Box></Td>
                                        <Td> <Box color="black"></Box></Td>
                                        {/* <Td> <Box color="black"></Box></Td> */}
                                        <Td> <Box color="black">-- No Orders --</Box></Td>
                                        <Td> <Box color="black"></Box></Td>
                                        <Td> <Box color="black"></Box></Td>
                                        <Td> <Box color="black"></Box></Td>
                                    </Tbody>
                                }
                                {grouporders.length == 0 && !personalOrder &&
                                    <Tbody >
                                        <Td> <Box color="black"></Box></Td>
                                        <Td> <Box color="black"></Box></Td>
                                        {/* <Td> <Box color="black"></Box></Td> */}
                                        <Td> <Box color="black">-- No Orders --</Box></Td>
                                        <Td> <Box color="black"></Box></Td>
                                        <Td> <Box color="black"></Box></Td>
                                        <Td> <Box color="black"></Box></Td>
                                    </Tbody>
                                }
                            </Table>
                            {orders.length > 6 && personalOrder && (
                                <Pagination
                                    totalPages={totalPages}
                                    currentPage={currentPage}
                                    handlePageChange={handlePageChange}
                                />
                            )}
                            {(grouporders.length > 6) && !personalOrder &&
                                <Pagination
                                    totalPages={totalgroupPages}
                                    currentPage={currentgroupPage}
                                    handlePageChange={handleGroupPageChange}

                                />
                            }

                        </Box>
                    }
                </>
                }
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
            {/* ======================================================================================================================================================================= */}
            {/* <Header />
            <Flex
                minH={'80vh'}
                align={'left'}
                justify={'center'}
                bg="gray"
            >
                {orders.length > 0 ?
                    <Box width={"100%"} padding={30} align={'center'} justify={'center'}>

                        <Table variant="striped">
                            <Thead >
                                <Tr >
                                    <Th>ID</Th>
                                    <Th>Name</Th>
                                    <Th>Items</Th>
                                    <Th>Hotel Name</Th>
                                    <Th>Status</Th>
                                    <Th>Actions</Th>
                                </Tr>
                            </Thead>
                            <Tbody >
                                {currentOrders.map((order) => (
                                    <Tr key={order.id}>
                                        <Td>{order.id}</Td>
                                        <Td>{order.name}</Td>
                                        <Td>{order.items.join(', ')}</Td>
                                        <Td >{order.hotelName}</Td>
                                        <Td color={order.status == "Accepted" ? 'green' : (order.status == "Rejected") ? 'red' : "black"}>{order.status}</Td>
                                        <Td>
                                            <Flex justify={"space-between"}>
                                                <Button ml={2} colorScheme="red" onClick={() => handleReject(order.id)} isDisabled={(order.status == "Rejected") || (order.status == "Accepted") ? true : false}>
                                                    Reject
                                                </Button>
                                            </Flex>
                                        </Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>

                        {(orders.length > 6) &&
                            <Pagination totalPages={totalPages} currentPage={currentPage} handlePageChange={handlePageChange} />
                        }

                    </Box> :
                    <Box p={20} width="70%" color="red" align="center" marginTop={40}>

                        -- No Orders --
                    </Box>

                }
            </Flex>
            <Footer /> */}
            {/* ================================================================================================================================================================ */}
        </>
    );
};

export default UserOrders;



