import react, { useState, useEffect } from "react"
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {
    Button,
    Image,
    Flex,
    useColorModeValue,
    Text,
    Stack,
    Box
} from '@chakra-ui/react'
import Congrats from "../Congrats.png"
// import FoodBackgroundImage from '../foodbackgroundimage.jpg';
import FoodBackgroundImage from '../img2.jpg'
import Header from "../Header/header";
import Footer from "../Footer/footer";

const VerifyEmailOnAccountCreation = () => {

    const params = useParams()
    const toast = useToast();
    const navigate = useNavigate();


    const handleSubmit = async () => {
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };

            const { data } = await axios.post(
                `http://localhost:5000/api/auth/verifynewemail/${params.id}/${params.token}`,
                {
                    "id": params.id,
                },
                config
            );


            toast({
                title: "Account Verified Successfully",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });

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



    useEffect(() => {
        handleSubmit()
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
                width="100%"
            >
                <Stack style={{ margin: "3px" }}>
                    <Text align={'center'} fontSize="20px" color={"Black"}>Email Verified Successfully </Text>
                    <Box>
                        <Image
                            src={Congrats}
                            alt='Congrats'
                            align={'center'}
                        />
                        <Text align={'center'} margin="1%" fontSize="20px" color="Black">Go to the login Page</Text>
                        <Button marginLeft="40%" marginTop="2%" backgroundColor={"green.200"} onClick={() => { navigate("/login") }}>Login</Button>
                    </Box>
                </Stack>

            </Flex>
            <Footer />
        </>
    )
};

export default VerifyEmailOnAccountCreation;
