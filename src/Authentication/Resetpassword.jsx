import react, { useState, useEffect } from "react"
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Stack,
    Button,
    Text,
    useColorModeValue,
} from '@chakra-ui/react'
import Footer from "../Footer/footer";
import Header from "../Header/header";
import FoodBackgroundImage from '../img2.jpg';

const ResetPassword = () => {



    const [showpassword, setShowPassword] = useState(false);
    const [showconfirmpassword, setShowConfirmPassword] = useState(false);
    const toast = useToast();
    const handleClickPassword = () => setShowPassword(!showpassword);
    const handleClickconfirmPassword = () => setShowConfirmPassword(!showconfirmpassword);
    const params = useParams()

    const [password, setPassword] = useState(null);
    const [confirmpassword, setConfirmPassword] = useState(null)
    const navigate = useNavigate();

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const user = userInfo ? userInfo.User : null


    useEffect(() => {
        if (user) {
            navigate("/")
        }
    })


    const handleSubmit = async () => {

        if (password.length < 6) {
            toast({
                title: "password should be minimum 6 characters",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });

            return;
        }

        if (!password || !confirmpassword) {
            toast({
                title: "Please Enter a password",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });

            return;
        }
        else if (password != confirmpassword) {
            toast({
                title: "Passwords are Not Matching",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });

            return;
        } else {

            try {
                const config = {
                    headers: {
                        "Content-type": "application/json",
                    },
                };

                const { data } = await axios.post(
                    `http://localhost:5000/api/auth//reset-password/${params.id}/${params.token}`,
                    {
                        "password": password,
                    },
                    config
                );

                toast({
                    title: "Password is Updated Successfully",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom",
                });

                if (data) {
                    setTimeout(() => { navigate("/login") }, 500);
                }

            } catch (error) {
                toast({
                    title: "Error Occured!",
                    description: error.response.data.message,
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom",
                });

            }
        }
    }



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

            // minH={'80vh'}
            // align={'center'}
            // justify={'center'}
            // // bg={useColorModeValue('gray.50', 'gray.800')}
            // bg="gray"
            >
                <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                    <Stack align={'center'}>
                        <Text fontSize={'50px'} color="black" >Reset Password</Text>
                    </Stack>
                    <Box
                        rounded={'lg'}
                        bg={useColorModeValue('white', 'gray.700')}
                        // boxShadow={'lg'}
                        border="1px solid"
                        boxShadow="5px 10px 18px #888888"
                        p={8}
                    >
                        <Stack spacing={4}>


                            <FormControl id="password" isRequired>
                                <FormLabel color="black">Password</FormLabel>
                                <InputGroup size="md">
                                    <Input
                                        color="black"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        type={showpassword ? "text" : "password"}
                                        placeholder="Enter password"
                                    />
                                    <InputRightElement width="4.5rem">
                                        <Button h="1.75rem" size="sm" onClick={handleClickPassword}>
                                            {showpassword ? "Hide" : "Show"}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                            </FormControl>
                            <FormControl id="password" isRequired>
                                <FormLabel color="black">Confirm Password</FormLabel>
                                <InputGroup size="md">
                                    <Input
                                        color="black"
                                        value={confirmpassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        type={showconfirmpassword ? "text" : "password"}
                                        placeholder="Enter password"
                                    />
                                    <InputRightElement width="4.5rem">
                                        <Button h="1.75rem" size="sm" onClick={handleClickconfirmPassword}>
                                            {showconfirmpassword ? "Hide" : "Show"}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>

                            </FormControl>
                            <Button
                                onClick={handleSubmit}
                                bg={'blue.400'}
                                color={'white'}
                                width="100%"
                                marginTop={2}
                                _hover={{
                                    bg: 'blue.500',
                                }}>
                                Submit
                            </Button>

                        </Stack>
                    </Box>
                </Stack>
            </Flex>

            <Footer />
        </>
    )
}

export default ResetPassword;