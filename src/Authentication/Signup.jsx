import react, { useState, useEffect } from "react"
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import img2 from '../img2.jpg'
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Stack,
    Button,
    Heading,
    Text,
    Link,
    useColorModeValue,
    Image,
    Spinner
} from '@chakra-ui/react'
import FoodBackgroundImage from '../foodbackgroundimage.jpg';
import React from 'react'
import googleImage from '../assets/googleImage.jpg';
import { useGoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { signup, signupGoogle } from "../redux/actions/auth";
import Header from "../Header/header";
import Footer from "../Footer/footer";


const SignUp = () => {


    const handleClick = () => setShow(!show);
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const toast = useToast();
    const [email, setEmail] = useState(null);
    const [username, setUserName] = useState(null);
    const [password, setPassword] = useState(null);

    const navigate = useNavigate();
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const [loading, setLoading] = useState(false);
    const [signUpLoading, setSignUpLoading] = useState(false);

    useEffect(() => {
        if (userInfo) navigate('/')
    }, [userInfo])

    function handleGoogleLoginSuccess(tokenResponse) {
        signUpGoogle(tokenResponse);
        // console.log(tokenResponse);
        // const accessToken = tokenResponse.access_token;

        // dispatch(signupGoogle(accessToken, navigate))
    }

    const login = useGoogleLogin({ onSuccess: handleGoogleLoginSuccess });

    // const signUpGoogle = (accessToken) => API.post("/users/signup", {
    //     googleAccessToken: accessToken
    // }, {
    //     headers: {
    //         "Content-type": "application/json",
    //     }
    // })



    const signUpGoogle = async (tokenResponse) => {
        // e.preventDefault();
        setSignUpLoading(true);
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };

            const { data, status } = await axios.post(
                "http://localhost:5000/api/auth/signup",
                {
                    "userName": username,
                    "emailId": email,
                    "password": password,
                    "googleAccessToken": tokenResponse.access_token
                },
                config
            );

            // toast({
            //     title: "Account created Successfully",
            //     status: "success",
            //     duration: 5000,
            //     isClosable: true,
            //     position: "bottom",
            // });

            // localStorage.setItem("userInfo", JSON.stringify(data));
            // setTimeout(() => { navigate("/") }, 300);

            if (status == 200) {
                toast({
                    title: `Mail has send to ${data?.email}. please Verify it`,
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom",
                });

                setTimeout(() => { setSignUpLoading(false) }, 500);
                setTimeout(() => { navigate(`/verifymail/${data?.email}`) }, 800);
            } else if (status == 201) {
                toast({
                    title: `Mail has already send. please Verify it`,
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom",
                });
                setTimeout(() => { setSignUpLoading(false) }, 500);
            } else if (status == 202) {
                setTimeout(() => { setSignUpLoading(false) }, 500);
                toast({
                    title: `User already exist`,
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom",
                });
            }

        } catch (error) {
            setTimeout(() => { setSignUpLoading(false) }, 500);
            toast({
                title: "Error Occured!",
                description: error.response.data.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });

        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        const pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,8}$/

        if (!pattern.test(email)) {
            toast({
                title: "Invalid Email",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setLoading(false);

            return;
        }

        if (password.length < 6) {
            toast({
                title: "password should be minimum 6 characters",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setLoading(false);
            return;
        }



        if (!username || !email || !password) {
            toast({
                title: "Please Fill all the fields",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setLoading(false);
            return;
        }
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };

            const { data, status } = await axios.post(
                "http://localhost:5000/api/auth/signup",
                {
                    "userName": username,
                    "emailId": email,
                    "password": password,
                    // "role": "user"
                },
                config
            );

            console.log(data, "datahuh")

            // toast({
            //     title: `Mail has send to ${email}. please Verify it`,
            //     status: "success",
            //     duration: 5000,
            //     isClosable: true,
            //     position: "bottom",
            // });

            // localStorage.setItem("userInfo", JSON.stringify(data));
            // setTimeout(() => { navigate(`/verifymail/${email}`) }, 500);

            if (status == 200) {
                toast({
                    title: `Mail has send to ${email}. please Verify it`,
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom",
                });
                // setTimeout(() => { navigate(`/verifymail/${email}`) }, 500);
                setTimeout(() => { setLoading(false) }, 500);
                setTimeout(() => { navigate(`/verifymail/${email}`) }, 800);
            } else if (status == 201) {
                setTimeout(() => { setLoading(false) }, 500);
                toast({
                    title: `Mail has already send. please Verify it`,
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom",
                });
            } else if (status == 202) {
                setTimeout(() => { setLoading(false) }, 500);
                toast({
                    title: `User already exist`,
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom",
                });
            }

        } catch (error) {
            setTimeout(() => { setLoading(false) }, 500);
            toast({
                title: "Error Occured!",
                description: error.response.data.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });

        }
    };




    return (
        <>
            <Header />
            <Flex
                style={{
                    backgroundImage: `url(${img2})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',

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
                padding={10}
            >
                <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6} width="100%" zIndex={2}>
                    <Stack align={'center'}>
                        <Text fontSize={'5xl'} color="black" fontWeight={'400'}>Create an Account </Text>
                    </Stack>
                    <Box
                        rounded={'lg'}
                        bg={useColorModeValue('white', 'gray.700')}
                        border="1px solid"
                        boxShadow="5px 10px 18px #888888"
                        p={8}>
                        <Stack spacing={4}>

                            <FormControl id="firstName" isRequired>
                                <FormLabel color="black">UserName</FormLabel>
                                <Input
                                    type="text"
                                    value={username}
                                    placeholder="Enter UserName"
                                    onChange={(e) => { setUserName(e.target.value) }}
                                    color="black" />
                            </FormControl>
                            <FormControl id="email" isRequired>
                                <FormLabel color="black">Email</FormLabel>
                                <Input
                                    type="email"
                                    value={email}
                                    placeholder="Enter Email"
                                    onChange={(e) => { setEmail(e.target.value) }}
                                    color="black" />
                            </FormControl>

                            <FormControl id="password" isRequired>
                                <FormLabel color="black">Password</FormLabel>
                                <InputGroup size="md">
                                    <Input
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        type={show ? "text" : "password"}
                                        placeholder="Enter Password"
                                        color="black"
                                    />
                                    <InputRightElement width="4.5rem">
                                        <Button h="1.75rem" size="sm" onClick={handleClick}>
                                            {show ? "Hide" : "Show"}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                            </FormControl>
                            <Stack spacing={2}>
                                {loading ? (
                                    <Spinner
                                        thickness="4px"
                                        speed="0.65s"
                                        emptyColor="gray.200"
                                        color="blue.500"
                                        size="xl"
                                        ml="42%"
                                    />
                                ) : (
                                    <Button
                                        onClick={submitHandler}
                                        bg={'blue.400'}
                                        color={'white'}
                                        _hover={{
                                            bg: 'blue.500',
                                        }}>
                                        SignUp
                                    </Button>
                                )}
                                {/* <Button
                                    onClick={submitHandler}
                                    bg={'blue.400'}
                                    color={'white'}
                                    _hover={{
                                        bg: 'blue.500',
                                    }}>
                                    SignUp
                                </Button> */}
                                {signUpLoading ? (
                                    <Spinner
                                        thickness="4px"
                                        speed="0.65s"
                                        emptyColor="gray.200"
                                        color="blue.500"
                                        size="xl"
                                        ml="42%"
                                    />
                                ) : (
                                    <Button
                                        onClick={() => login()}
                                        bg={'green.200'}
                                        color={'black'}
                                        _hover={{
                                            bg: 'green.300',
                                        }}>
                                        <Image
                                            boxSize='15px'
                                            src={googleImage}
                                            alt='Google'
                                            width="10%"
                                            height="60%"
                                            margin="6px"
                                            paddingTop="1%"

                                        />
                                        Sign up with google
                                    </Button>
                                )}
                                {/* <Button
                                    onClick={() => login()}
                                    bg={'green.200'}
                                    color={'black'}
                                    _hover={{
                                        bg: 'green.300',
                                    }}>
                                    <Image
                                        boxSize='15px'
                                        src={googleImage}
                                        alt='Google'
                                        width="8%"
                                        height="60%"
                                        margin="6px"
                                        paddingTop="1%"

                                    />
                                    Sign up with google
                                </Button> */}
                                <span style={{ textAlign: "center", color: "black" }} >or</span>
                                <Stack pt={2}>

                                    <Text align={'center'} color="black">
                                        Already have an account?
                                        <Link href="/login" color={'blue.400'}> Login</Link>
                                    </Text>
                                </Stack>
                            </Stack>
                        </Stack>
                    </Box>
                </Stack>
            </Flex>
            <Footer />
        </>
    )
};

export default SignUp;