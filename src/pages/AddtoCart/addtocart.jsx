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
    Spinner
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import Footer from "../../Footer/footer";
import Header from "../../Header/header";
import food from "../../food.png"
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import FoodBackgroundImage from '../../img4.jpg';

const AddToCart = () => {

    const navigate = useNavigate();
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const hotelid = JSON.parse(localStorage.getItem('hotelid'));
    const user = userInfo ? userInfo.User : null;
    const [amount, setAmount] = useState(0);
    const [cartItems, setCartItems] = useState([]);
    const [cartid, setCartId] = useState()
    const toast = useToast();
    var hotelName = JSON.parse(localStorage.getItem('hotelname'));
    const [fetchloading, setFetchLoading] = useState(true);

    useEffect(() => {
        if (!user) navigate('/login');
    }, [user]);


    const GetAllItems = async () => {
        setFetchLoading(true)

        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${userInfo?.Token['token']}`
                },
            };

            const { data, status } = await axios.post(
                `http://localhost:5000/api/v1/cart/hotel/${hotelid}`,
                {
                    userID: user._id
                },
                config
            );

            var amount1 = 0;
            for (let i = 0; i < data.items.length; i++) {
                amount1 += (data.items[i].price) * (data.items[i].quantity)
            }



            // setAmount(amount1)
            // setCartItems(data.items);
            // setCartId(data.cartid)
            // setFetchLoading(false)

            if (status == 200) {
                // setAllOrders(data.hotelOrders)
                setTimeout(() => { setCartId(data.cartid); setCartItems(data.items); setAmount(amount1); }, 800);
                setTimeout(() => { setFetchLoading(false) }, 1000);
            }

        } catch (error) {
            console.log(error)
            setTimeout(() => { setFetchLoading(false) }, 400);
        }
    };


    const increaseQuantity = async (item) => {

        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${userInfo?.Token['token']}`
                },
            };

            const { data, status } = await axios.post(
                `http://localhost:5000/api/v1/cart/add`,
                {
                    "hotelID": hotelid,
                    "item": item
                },
                config
            );

            if (status == 200) {
                GetAllItems();
            }

        } catch (error) {
            console.log(error)
        }
    };

    const decreaseQuantity = async (item) => {
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${userInfo?.Token['token']}`
                },
            };

            const { data, status } = await axios.post(
                `http://localhost:5000/api/v1/cart/remove`,
                {
                    "hotelID": hotelid,
                    "item": item
                },
                config
            );

            if (status == 200) {
                GetAllItems();
            }

        } catch (error) {
            console.log(error)
        }
    };

    const removeItem = async (item) => {
        // alert("hello")
        try {
            console.log(item, hotelid)
            const config = {
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${userInfo?.Token['token']}`
                },
            };

            const { data, status } = await axios.delete(
                `http://localhost:5000/api/v1/cart/erase?itemID=${item.itemID}&hotelID=${hotelid}`,
                config
            );
            console.log(data, "sttata")
            if (status == 200) {
                GetAllItems();
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
                    "http://localhost:5000/api/orders/addOrder",
                    {
                        "userId": user._id,
                        "hotelId": hotelid,
                        "hotelName": hotelName,
                        "userName": user.userName,
                        "cartItems": cartItems,
                        "amount": amount,
                    },
                    config
                );

                if (status == 201) {
                    toast({
                        title: "Order Placed Successful",
                        status: "success",
                        duration: 5000,
                        isClosable: true,
                        position: "bottom",
                    });
                    DirectDeleteCart();
                    navigate(`/congrats/${data?.order._id}`)
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
    };


    const DeleteCart = async () => {

        const answer = window.confirm('Are you sure?');
        if (answer) {

            try {
                const config = {
                    headers: {
                        "Content-type": "application/json",
                        "Authorization": `Bearer ${userInfo?.Token['token']}`
                    },
                };

                const { data, status } = await axios.delete(
                    `http://localhost:5000/api/v1/cart/hotel/${hotelid}`,
                    config
                );

                if (status == 202) {
                    toast({
                        title: "Cart Deleted Successful",
                        status: "success",
                        duration: 5000,
                        isClosable: true,
                        position: "bottom",
                    });
                    GetAllItems();
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
    };

    const DirectDeleteCart = async () => {
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${userInfo?.Token['token']}`
                },
            };

            const { data, status } = await axios.delete(
                `http://localhost:5000/api/v1/cart/hotel/${hotelid}`,
                config
            );

            GetAllItems();

        } catch (error) {
            console.log(error)
        }
    };



    useEffect(() => {
        GetAllItems()
    }, []);

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [groupname, setGroupName] = useState("");
    const [groups, setGroup] = useState([]);
    const [loading, setLoading] = useState(false);
    const [generatedNumber, setGeneratedNumber] = useState(null);
    const [flag, setFlag] = useState(0);
    const [display, setDisplay] = useState(0);
    const [code, setCode] = useState('');

    const AddtoGroup = async () => {
        setCode("")
        setDisplay(0)
        setGeneratedNumber(null)
        setFlag(3)
        onOpen();
    }

    const generateNumber = async () => {
        try {
            if (groupname != "") {
                const gr = groups;
                setLoading(true);
                setGroupName('')

                const randomNumber = Math.floor(100000 + Math.random() * 900000);

                const config = {
                    headers: {
                        "Content-type": "application/json",
                    },
                };

                const { data, status } = await axios.post(
                    "http://localhost:5000/api/groupOrders/createGroup",
                    {
                        "hotelId": hotelid,
                        "hotelName": hotelName,
                        "userName": user.userName,
                        "userId": user._id,
                        "groupId": randomNumber,
                        "groupName": groupname
                    },
                    config
                );

                setTimeout(() => {
                    setGeneratedNumber(randomNumber);
                    handleFetchAllGroups()
                    // gr.splice(0, 0, [groupname, randomNumber])
                    // setGroup(gr);
                    toast({
                        title: "Group created Successful",
                        status: "success",
                        duration: 5000,
                        isClosable: true,
                        position: "bottom",
                    });
                    setLoading(false);
                }, 600);

            } else {
                toast({
                    title: "Enter name of group",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom",
                });
                setLoading(false);
            }
        } catch (error) {
            console.log(error)
            setLoading(false);
        }

    };

    const JoinGroup = async () => {
        setLoading(true);
        setDisplay(0);
        try {
            if (code != "") {

                const config = {
                    headers: {
                        "Content-type": "application/json",
                    },
                };

                const { data, status } = await axios.post(
                    "http://localhost:5000/api/groupOrders/joinGroup",
                    {
                        "userName": user.userName,
                        "userId": user._id,
                        "groupId": code
                    },
                    config
                );

                setTimeout(() => {
                    toast({
                        title: "Group Joined Successful",
                        status: "success",
                        duration: 5000,
                        isClosable: true,
                        position: "bottom",
                    });
                    handleFetchAllGroups()
                    setDisplay(1);
                    setLoading(false);
                }, 1000);
            }
            else {
                toast({
                    title: "Enter Group Number",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom",
                });
                setLoading(false);
            }
        } catch (error) {
            console.log(error)
            setLoading(false);
        }
    }

    const Additemtogroup = async () => {

        setLoading(true);
        setDisplay(0);

        try {
            if (code != "") {

                const config = {
                    headers: {
                        "Content-type": "application/json",
                    },
                };

                const { data, status } = await axios.post(
                    "http://localhost:5000/api/groupOrders/groups/addCartToGroup",
                    {
                        "userName": user.userName,
                        "userId": user._id,
                        "groupId": code,
                        "cartId": cartid,
                        "Amount": amount

                    },
                    config
                );



                setTimeout(() => {
                    toast({
                        title: "Item Added Successful",
                        status: "success",
                        duration: 5000,
                        isClosable: true,
                        position: "bottom",
                    });
                    setDisplay(1)
                    setLoading(false);
                    DirectDeleteCart();
                }, 1000);

            }
            else {
                toast({
                    title: "Enter Group Number",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom",
                });
                setLoading(false);
            }
        } catch (error) {
            console.log(error)
            setLoading(false);
        }

    }


    const handleInputChange = (event) => {
        setGroupName(event.target.value);
    };


    const [allGroups, setAllGroups] = useState([]);


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
                    if (items.orderStatus === "ORDER_PENDING")
                        afterfiltering.splice(0, 0, items)
                })

                setAllGroups(afterfiltering)

            }

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        handleFetchAllGroups();
    }, [])


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

                {fetchloading ? (
                    <Spinner
                        thickness="4px"
                        speed="0.65s"
                        emptyColor="gray.200"
                        color="blue.500"
                        size="xl"
                    // ml="25%"
                    />) : <>
                    {
                        <Box width={"100%"} padding={30} align={'center'} justify={'center'}>
                            {
                                cartItems.length > 0 &&
                                <Text fontSize={"50px"} align={'center'} color={"black"} mb={3}>
                                    Catalogs Added
                                </Text>
                            }


                            <Flex>
                                <Box w="30%" pr={4}>
                                    <Flex
                                        direction="column"
                                        justify="space-between"
                                        ml={4}
                                        p={4}
                                        bg="white"
                                        boxShadow="md"
                                        borderRadius="md"
                                        maxH="400px"
                                        overflowY="auto"
                                    >
                                        <Heading color="black">Groups</Heading>
                                        <Box>
                                            <Button onClick={() => { setFlag(1); onOpen(); setCode(''); setDisplay(0) }}>Join Group</Button>
                                            <Button m={2} onClick={() => { setFlag(2); onOpen(); setGeneratedNumber('') }}>Create group</Button>
                                        </Box>
                                        <Box color="black" pt={2}>
                                            {allGroups.length > 0 ? (
                                                allGroups.map((group, ind) => (
                                                    <Box key={ind} color="black" border="1px solid black" bg="white" p={2} mt={2} borderRadius="md" _hover={{ cursor: "pointer" }}
                                                        onClick={() => {
                                                            navigate(`/group/${group.groupId}/${hotelid}/${group.groupName}`)
                                                        }}
                                                    >
                                                        {group.groupName} - {group.groupId}
                                                    </Box>
                                                ))
                                            ) : (
                                                <Box>No Groups</Box>
                                            )}
                                        </Box>
                                    </Flex>
                                </Box>
                                {/* {cartItems.length > 0 && */}
                                <Box display={"flex"} w="70%">
                                    <Box w="80%">
                                        {cartItems.map((item) => (
                                            <Flex
                                                key={item.id}
                                                justify="space-between"
                                                mb={4}
                                                p={4}
                                                bg="white"
                                                boxShadow="md"
                                                borderRadius="md"
                                            >
                                                <Text fontSize="xl" color="black">{item.name}</Text>
                                                <Image
                                                    rounded="lg"
                                                    width="120px"
                                                    height="120px"
                                                    fit="cover"
                                                    src={item.imageLink}
                                                    alt={item.name}
                                                    draggable="false"
                                                    loading="lazy"
                                                />
                                                <Flex alignItems="center">
                                                    <Button onClick={() => decreaseQuantity(item)} size="sm" variant="outline">
                                                        -
                                                    </Button>
                                                    <Text mx={2} color="black">{item.quantity}</Text>
                                                    <Button onClick={() => increaseQuantity(item)} size="sm" variant="outline">
                                                        +
                                                    </Button>
                                                    <Button onClick={() => removeItem(item)} colorScheme="red" size="sm" m={1}>
                                                        Remove
                                                    </Button>
                                                </Flex>
                                            </Flex>
                                        ))}
                                    </Box>

                                    {
                                        cartItems.length === 0 &&
                                        <Box textAlign="center" pt={6} w="100%" mr={"15%"} >
                                            <Text fontSize={"50px"} color="black" align={"center"}>-- Cart is empty --</Text>
                                        </Box>
                                    }
                                    {cartItems.length > 0 &&
                                        <Box w="50%" pl={4}>
                                            <Flex
                                                direction="column"
                                                justify="space-between"
                                                mb={4}
                                                p={4}
                                                bg="white"
                                                boxShadow="md"
                                                borderRadius="md"
                                                height="420px"
                                            >
                                                <Stack spacing="4" align="left">
                                                    <Text fontSize="xl" color="black" fontWeight="semibold">Order Summary</Text>
                                                    <HStack justify="space-between">
                                                        <Text fontSize="lg" fontWeight="semibold" color="black">Subtotal:</Text>
                                                        <Text fontSize="lg" color="black">₹{amount}</Text>
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
                                                        <Text fontSize="lg" color="black">₹{amount}</Text>
                                                    </HStack>
                                                    <Box>
                                                        <Button colorScheme="green" size="lg" fontSize="md" width={320} onClick={Payment}>
                                                            Payment
                                                        </Button>
                                                    </Box>
                                                    <Box>
                                                        <Button colorScheme="green" size="lg" fontSize="md" width={320} onClick={AddtoGroup}>
                                                            Add to Group
                                                        </Button>
                                                    </Box>
                                                    <Box>
                                                        <Button size="lg" fontSize="md" width={320} onClick={DeleteCart}>
                                                            Delete Cart
                                                        </Button>
                                                    </Box>
                                                </Stack>
                                            </Flex>
                                        </Box>}

                                    {/* <Box w="40%">
                                <Flex
                                    direction="column"
                                    justify="space-between"
                                    ml={4}
                                    p={4}
                                    bg="white"
                                    boxShadow="md"
                                    borderRadius="md"
                                    maxH={"350px"}
                                    overflowY="auto"
                                >
                                    <Heading color="black">Groups</Heading>
                                    <Box>
                                        <Button onClick={() => { setFlag(1); onOpen(); setCode(''); setDisplay(0) }}>Join Group</Button>
                                        <Button m={2} onClick={() => { setFlag(2); onOpen(); setGeneratedNumber('') }}>Create group</Button>
                                    </Box>
                                    <Box color="black" pt={2}>
                                        {groups.length > 0 ? (
                                            groups.map((group, ind) => (
                                                <Box key={ind} color="black" border="1px solid black" bg="white" p={2} mt={2} borderRadius="md" _hover={{ cursor: "pointer" }}
                                                    onClick={() => { navigate(`/group/${group[1]}/${hotelid}/${group[0]}`) }}
                                                >
                                                    {group[0]}
                                                </Box>
                                            ))
                                        ) : (
                                            <Box>No Groups</Box>
                                        )}
                                    </Box>
                                </Flex>
                            </Box> */}
                                </Box>
                                {/* ) 
                        : (

                            hotelid ?
                                <Text fontSize={"50px"} color="white" align={"center"}>-- Nothing is Added to the Cart --</Text> :
                                <Text fontSize={"50px"} color="white" align={"center"}>-- Please Select Hotel --</Text>

                        )} */}


                            </Flex>
                        </Box>
                    }
                </>
                }


                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalCloseButton />
                        <ModalBody>
                            {
                                flag == 3 &&
                                <>
                                    <ModalHeader align="center">Add to Group</ModalHeader>
                                    <Box display={"flex"} alignItems="center">
                                        <Input
                                            placeholder="Enter Group ID"
                                            value={code}
                                            onChange={(e) => { setCode(e.target.value) }}
                                            mt={4}
                                            color="black"
                                            border="solid"
                                        />
                                        <Button
                                            colorScheme="blue"
                                            size="md"
                                            onClick={Additemtogroup}
                                            mt={4}
                                            ml={1}
                                            pl={5}
                                            pr={5}
                                        >
                                            Add
                                        </Button>
                                    </Box>
                                    {loading ? (
                                        <Center pt={2}>
                                            <Spinner />
                                        </Center>
                                    ) : (
                                        display == 1 && <Text fontSize="xl" pt={2} align={"center"} fontWeight={"300px"} color="green">Added to Group {code}</Text>
                                    )}
                                </>
                            }
                            {
                                flag == 1 &&
                                <>
                                    <ModalHeader align="center">Join Group</ModalHeader>
                                    <Box display={"flex"} alignItems="center">
                                        <Input
                                            placeholder="Enter Group ID"
                                            value={code}
                                            onChange={(e) => { setCode(e.target.value) }}
                                            mt={4}
                                            color="black"
                                            border="solid"
                                        />
                                        <Button
                                            colorScheme="blue"
                                            size="md"
                                            onClick={JoinGroup}
                                            mt={4}
                                            ml={1}
                                            pl={5}
                                            pr={5}
                                        >
                                            Join
                                        </Button>
                                    </Box>
                                    {loading ? (
                                        <Center pt={2}>
                                            <Spinner />
                                        </Center>
                                    ) : (
                                        display == 1 && <Text fontSize="xl" pt={2} align={"center"} fontWeight={"300px"} color="green">You Joined {code} Group</Text>
                                    )}
                                </>
                            }
                            {
                                flag == 2 &&
                                <>
                                    <ModalHeader align="center">Create Group</ModalHeader>
                                    <Box display={"flex"} alignItems="center">
                                        <Input
                                            placeholder="Enter Name of Group"
                                            value={groupname}
                                            onChange={handleInputChange}
                                            mt={4}
                                            color="black"
                                            border="solid"
                                        />
                                        <Button
                                            colorScheme="blue"
                                            size="md"
                                            onClick={generateNumber}
                                            mt={4}
                                            ml={1}
                                            pl={5}
                                            pr={5}
                                        >
                                            Create
                                        </Button>
                                    </Box>
                                    {loading ? (
                                        <Center pt={2}>
                                            <Spinner />
                                        </Center>
                                    ) : (
                                        generatedNumber && <Text fontSize="xl" pt={2} align={"center"} fontWeight={"300px"}>Group ID: {generatedNumber}</Text>
                                    )}
                                </>
                            }
                        </ModalBody>
                        {/* <ModalFooter>
                            <Button colorScheme="blue" onClick={onClose}>
                                Close
                            </Button>
                        </ModalFooter> */}
                    </ModalContent>
                </Modal>
            </Flex>
            <Footer />
        </>
    );
};

export default AddToCart;
