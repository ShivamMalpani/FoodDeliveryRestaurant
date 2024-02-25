import React, { useState, useEffect } from 'react';
import {
    Box,
    Flex,
    Text,
    Input,
    Textarea,
    Button,
    FormControl,
    FormLabel,
    useToast,
} from '@chakra-ui/react';
import Header from '../Header/header';
import Footer from '../Footer/footer';
import { useNavigate } from 'react-router-dom';
import FoodBackgroundImage from '../img2.jpg';
import axios from "axios"

const ContactUs = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('userInfo'));
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const toast = useToast();

    useEffect(() => {
        if (!user) navigate('/');
    }, [user]);




    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,8}$/;
    //     try {

    //         if (!emailPattern.test(email)) {
    //             toast({
    //                 title: 'Invalid Email',
    //                 status: 'warning',
    //                 duration: 5000,
    //                 isClosable: true,
    //                 position: 'bottom',
    //             });
    //             return;
    //         }



    //         const response = await axios.post('https://api.sendgrid.com/v3/mail/send', {
    //             personalizations: [
    //                 {
    //                     to: [
    //                         {
    //                             email: 'akshaywairagadedp@gmail.com',
    //                         },
    //                     ],
    //                     subject: `Message from ${name}`,
    //                 },
    //             ],
    //             from: {
    //                 email: email,
    //             },
    //             content: [
    //                 {
    //                     type: 'text/plain',
    //                     value: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    //                 },
    //             ],
    //         }, {
    //             headers: {
    //                 Authorization: `Bearer YOUR_SENDGRID_API_KEY`,
    //                 'Content-Type': 'application/json',
    //             },
    //         });

    //         // console.log(response.data);
    //         // alert('Email sent successfully!');
    //         toast({
    //             title: 'Message Sent',
    //             description: 'Your message has been successfully sent!',
    //             status: 'success',
    //             duration: 5000,
    //             isClosable: true,
    //             position: 'bottom',
    //         });

    //     } catch (error) {
    //         console.error('Error sending email:', error);
    //         alert('Failed to send email');
    //     }
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,8}$/;
        try {

            if (!emailPattern.test(email)) {
                toast({
                    title: 'Invalid Email',
                    status: 'warning',
                    duration: 5000,
                    isClosable: true,
                    position: 'bottom',
                });
                return;
            }
            if (name == "" || message == "") {
                toast({
                    title: 'Please fill all fields',
                    status: 'warning',
                    duration: 5000,
                    isClosable: true,
                    position: 'bottom',
                });
                return;
            }

            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };

            const { data, status } = await axios.post(
                "http://localhost:5000/api/contact/contact-us",
                {
                    "name": name,
                    "email": email,
                    "message": message
                },
                config
            );



            if (status == 201) {

                setName('');
                setEmail('');
                setMessage('');
                toast({
                    title: 'Message Sent',
                    description: 'Your message has been successfully sent!',
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                    position: 'bottom',
                });
            }

        } catch {
            toast({
                title: 'Unable to send Message',
                description: 'Unable to send Message!',
                status: 'success',
                duration: 5000,
                isClosable: true,
                position: 'bottom',
            });
        }

    };

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
            >
                <Box
                    maxW="600px"
                    mt={10}
                    mx="auto"
                    p={8}
                    rounded="lg"
                    width="100%"
                    bg="rgba(0, 0, 0, 0.8)"
                >
                    <Text mb="4" fontSize="4xl" align="center">
                        Contact Us
                    </Text>
                    <Text mb="6" fontSize="lg" align="center">
                        Have a question or feedback? Reach out to us!
                    </Text>
                    <form onSubmit={handleSubmit}>
                        <FormControl mb="4">
                            <FormLabel>Name</FormLabel>
                            <Input
                                type="text"
                                placeholder="Your Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </FormControl>
                        <FormControl mb="4">
                            <FormLabel>Email</FormLabel>
                            <Input
                                type="email"
                                placeholder="Your Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </FormControl>
                        <FormControl mb="4">
                            <FormLabel>Message</FormLabel>
                            <Textarea
                                placeholder="Your Message"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            />
                        </FormControl>
                        <Button type="submit" colorScheme="teal">
                            Submit
                        </Button>
                    </form>
                </Box>
            </Flex>
            <Footer />
        </>
    );
};

export default ContactUs;
