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
    Text
} from '@chakra-ui/react'
import Congrats from "../Congrats.png"
import Header from "../Header/header";
import Footer from "../Footer/footer";

const Verified = () => {
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
                "http://localhost:5000/api/auth/verify/",
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
                minH={'80vh'}
                align={'center'}
                justify={'center'}
                bg="gray"
            // bg={useColorModeValue('gray.50', 'gray.800')}
            >
                <div style={{ margin: "3px", paddingTop: "10px" }}>
                    <div style={{ margin: "3px", paddingTop: "10px" }}>
                        <Text align={'center'} fontSize="20px">Email Verified Successfully </Text>
                        {/* <Text align={'center'} fontSize="20px">Congratulations! Your email has been successfully verified.</Text> */}
                    </div>
                    <div>
                        <Image
                            src={Congrats}
                            alt='Congrats'
                            align={'center'}
                        />
                        <Text align={'center'} margin="1%" fontSize="20px">Go to the login Page</Text>
                        <Button marginLeft="40%" marginTop="2%" backgroundColor={"green.200"} onClick={() => { navigate("/login") }}>Login</Button>
                    </div>
                </div>

            </Flex>
            <Footer />
        </>
    )
};

export default Verified;