import React, { useState, useEffect } from 'react';
import {
    Box,
    Flex,
    Heading,
    HStack,
    Stack,
    Text,
    Button,
    Image,
    Center
} from '@chakra-ui/react';
import Header from '../../Header/header';
import Footer from '../../Footer/footer';
import { useNavigate, useParams } from 'react-router-dom';
import StatusImage from "../../StatusImage.png"
import FoodBackgroundImage from '../../img2.jpg';


const Congrats = () => {

    const params = useParams();
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const user = userInfo ? userInfo.User : null;
    const navigate = useNavigate();
    const OrderNo = params.id

    useEffect(() => {
        if (!user) navigate('/login');
    }, [user]);

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
            // mt={10}
            // bg="gray"
            >
                <Box mt={10}>
                    <Text fontSize={"50px"} align={'center'} color={"black"} mb={3}>
                        Congratulation !
                    </Text>

                    <Flex
                        direction="column"
                        justify="space-between"
                        mb={4}
                        p={4}
                        bg="white"
                        boxShadow="md"
                        borderRadius="md"
                        height="400px"
                        width="320px"
                    >
                        <Image src={StatusImage} alt={"StatusImage"} />
                        <Stack align="left">
                            <Text fontSize="lg" color="black" fontWeight="semibold" >Hi Customer,</Text>
                            <Text></Text>
                            <Text></Text>
                            <Text></Text>
                            <Text></Text>
                            <Text fontSize="lg" color="black" fontWeight="semibold">Order Successfully Placed.</Text>
                            <Text color="black" >Your Order will be delivered by Fri 11, Jan 2024. </Text>
                            <Text></Text>
                            <Text></Text>
                            <Text color="black" >We are Pleased to confirm your order no {OrderNo}.</Text>
                            <Text color="black" >Thank you for shopping with Food Delivery Service!</Text>

                            <Button fontSize="md" width={200} colorScheme="blue" mt={2} ml={10}>
                                Manage Your Order
                            </Button>
                        </Stack>
                    </Flex>
                </Box>

            </Flex>
            <Footer />
        </>
    );
};

export default Congrats;



