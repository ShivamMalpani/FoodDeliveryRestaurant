import react, { useState, useEffect } from "react"
import { Flex, useToast, useColorModeValue, Image, Text, Box, Stack } from "@chakra-ui/react";
import axios from "axios";
import Header from "../Header/header";
import Footer from "../Footer/footer";
import verifyemail from "../verifyemail.png"
import FoodBackgroundImage from '../img2.jpg';
import { useParams } from 'react-router-dom';

const VerifiedMail = () => {

    const params = useParams()
    const email = params.id;

    return (
        <>
            <Header />
            <Flex
                style={{
                    backgroundImage: `url(${FoodBackgroundImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
                minHeight='100vh'
                color='white'
                align='center'
                justify='center'
                width="100%"
            >
                <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6} >
                    <Stack align={'center'}>
                        <Text fontSize={"40px"} textAlign={"center"} color="black">Please verify your email</Text>
                    </Stack>
                    <Image
                        src={verifyemail}
                        alt='verifyemail'
                        align={'center'}
                    />
                </Stack>
            </Flex>
            <Footer />
        </>
    )
};

export default VerifiedMail;