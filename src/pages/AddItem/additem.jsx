import react, { useState, useEffect, useRef } from "react"
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import {
    Select, Flex, Box, Heading, Input, Textarea, NumberInput, NumberInputField, Button, VStack, FormControl, FormLabel, InputGroup, InputRightElement, useColorModeValue, Stack, Text, Link
} from '@chakra-ui/react'
import Header from "../../Header/header";
import Footer from "../../Footer/footer";
import FoodBackgroundImage from '../../img2.jpg';
const AddItem = () => {

    const fileInput = useRef(null);
    const navigate = useNavigate();
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const user = userInfo ? userInfo.User : null;
    const toast = useToast();
    const [item, setItem] = useState({
        name: '',
        description: '',
        price: 0,
        photo: null,
        rating: 0,
        category: ""
    });


    useEffect(() => {
        if (!user) navigate('/login')
    }, [user])


    const handleAddItem = async () => {

        if (item.rating > 5 || item.rating < 1) {
            toast({
                title: "Rating Should be between 1 and 5 (both included)",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            return;
        }

        if (item.name === '' || item.description === '' || item.price === 0 || item.photo === null || item.rating == 0 || item.category === '') {
            toast({
                title: "Please Fill all fields",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            return;
        }

        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };

            const { data, status } = await axios.post(
                "http://localhost:5000/api/items/additem",
                {
                    "name": item.name,
                    "hotelId": user._id,
                    "price": item.price,
                    "imageLink": item.photo,
                    "quantity": 1,
                    "availabilityStatus": true,
                    "description": item.description,
                    "rating": item.rating,
                    "reviews": ["reviews"],
                    "category": item.category
                },
                config
            );


            if (status == 201) {
                setItem({
                    name: '',
                    description: '',
                    price: 0,
                    photo: null,
                    rating: 0,
                    category: ''
                })
                toast({
                    title: "Item Added Successful",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom",
                });
                fileInput.current.value = ''
            }



        } catch (error) {
            toast({
                title: "Unable to add a new Item",
                description: error.response.data.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
        }
    };

    const SubmitItem = () => {
        setTimeout(() => { handleAddItem() }, 1000);
    }

    const postDetails = (pics) => {

        if (pics === undefined) {
            toast({
                title: "Please Select an Image!",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            return;
        }

        if (pics.type === "image/jpeg" || pics.type === "image/png") {
            const data = new FormData();
            data.append("file", pics);
            data.append("upload_preset", "chat-app");
            data.append("cloud_name", "dojtv6qwl");

            fetch("https://api.cloudinary.com/v1_1/dojtv6qwl/image/upload", {
                method: "post",
                body: data,
            })
                .then((res) => res.json())
                .then((data) => {
                    setItem({ ...item, photo: data.url.toString() })

                })
                .catch((err) => {
                    console.log(err);

                });
        } else {
            toast({
                title: "Please Select an Image!",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });

            return;
        }
    };

    console.log(item)

    return (
        <>
            <Header />
            <Flex
                p={14}
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
            // // bg={useColorModeValue('gray.50', 'gray.800')}
            // padding={9}
            // bg="green.400"
            >
                <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6} width="100%">
                    <Stack align={'center'}>
                        <Text fontSize={"50px"} color="black">Add New Item </Text>
                    </Stack>
                    <Box
                        rounded={'lg'}
                        // bg={useColorModeValue('white', 'gray.700')}
                        border="1px solid"
                        boxShadow="5px 10px 18px #888888"
                        p={8}
                        bg="gray.600">
                        <Stack spacing={4}>

                            <FormControl id="name" isRequired>
                                <FormLabel>Name of Item</FormLabel>
                                <Input
                                    color="white"
                                    type="text"
                                    placeholder="Name of Item"
                                    value={item.name}
                                    onChange={(e) => setItem({ ...item, name: e.target.value })}
                                />
                            </FormControl>

                            <FormControl id="description" isRequired>
                                <FormLabel>Description</FormLabel>
                                <Textarea
                                    color="white"
                                    placeholder="Description"
                                    mb={4}
                                    value={item.description}
                                    onChange={(e) => setItem({ ...item, description: e.target.value })}
                                />
                            </FormControl>

                            <FormControl id="price" isRequired>
                                <FormLabel>Price</FormLabel>
                                <Input
                                    color="white"
                                    type="number"
                                    placeholder="Price"
                                    value={item.price}
                                    onChange={(e) => setItem({ ...item, price: e.target.value })}
                                />
                            </FormControl>
                            <FormControl id="rating" isRequired>
                                <FormLabel>Rating</FormLabel>
                                <Input
                                    color="white"
                                    type="number"
                                    placeholder="Rating"
                                    value={item.rating}
                                    onChange={(e) => setItem({ ...item, rating: e.target.value })}
                                />
                            </FormControl>
                            <FormControl id="category" isRequired>
                                <FormLabel>Category</FormLabel>
                                <Select
                                    // bg="red"
                                    placeholder="Veg/Non-Veg"
                                    color="black"
                                    // bg="white"
                                    value={item.category}
                                    onChange={(e) => setItem({ ...item, category: e.target.value })}
                                    styles={{
                                        menu: {
                                            background: 'gray.100', // Change the background color of the box containing options
                                        },
                                    }}
                                >
                                    <option value="" >&nbsp;</option>
                                    <option value="Veg">Veg</option>
                                    <option value="Non-Veg" >Non-Veg</option>
                                    {/* <option value="Both">Both</option> */}
                                </Select>
                            </FormControl>

                            <FormControl id="pic" isRequired>
                                <FormLabel>Upload your Picture</FormLabel>
                                <Input
                                    color="white"
                                    ref={fileInput}
                                    type="file"
                                    p={1.5}
                                    accept="image/*"
                                    onChange={(e) => postDetails(e.target.files[0])}
                                />
                            </FormControl>
                            <Stack spacing={10}>
                                <Button
                                    onClick={SubmitItem}
                                    bg={'green.400'}
                                    color={'white'}
                                    _hover={{
                                        bg: 'green.500',
                                    }}>
                                    Add Item
                                </Button>
                            </Stack>
                        </Stack>
                    </Box>
                </Stack>
            </Flex>
            <Footer />
        </>
    )
};

export default AddItem;

