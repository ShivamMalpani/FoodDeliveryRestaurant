import React, { useState } from 'react';
import {
    Box,
    Text,
    Button,
    Flex,
    Table,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import Header from '../../Header/header';
import Footer from '../../Footer/footer';
import Pagination from '../Pagination/pagination';
import { FaTimes } from 'react-icons/fa';
import FoodBackgroundImage from '../../img4.jpg';


const Notifications = () => {


    const params = useParams()

    const listofnotifications = [
        { id: 1, description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. PageMaker including versions of Lorem Ipsum" },
        { id: 2, description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. PageMaker including versions of Lorem Ipsum" },
        { id: 3, description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. PageMaker including versions of Lorem Ipsum" },
        { id: 4, description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. PageMaker including versions of Lorem Ipsum" },
        { id: 5, description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. PageMaker including versions of Lorem Ipsum" },
        { id: 6, description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. PageMaker including versions of Lorem Ipsum" },
        { id: 7, description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. PageMaker including versions of Lorem Ipsum" },
    ];


    const [currentPage, setCurrentPage] = useState(0);
    const notificationsPerPage = 6;
    const totalPages = Math.ceil(listofnotifications.length / notificationsPerPage)

    const indexOfLastNotification = (currentPage + 1) * notificationsPerPage;
    const indexOfFirstNotification = indexOfLastNotification - notificationsPerPage;
    const currentNotifications = listofnotifications.slice(indexOfFirstNotification, indexOfLastNotification);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };


    const removeItem = async (notificationId) => {
        const answer = window.confirm(`Do you want to Delete?${notificationId}`);
        if (answer) {

            try {
                const config = {
                    headers: {
                        "Content-type": "application/json",
                    },
                };



                // const { data, status } = await axios.post(
                //     "http://localhost:5000/api/items/deleteitem",
                //     {
                //         "itemId": itemId
                //     },
                //     config
                // );

                // if (status == 200) {

                //     toast({
                //         title: "Item Delete Successful",
                //         status: "success",
                //         duration: 5000,
                //         isClosable: true,
                //         position: "bottom",
                //     });
                //     setTimeout(() => { fetchallitems() }, 200);
                // }

            } catch (error) {
                console.log("Error")
            }
        }
    };


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
            // minH={'80vh'}
            // align={'center'}
            // justify={'center'}
            // bg="gray"
            // p={20}
            >
                {listofnotifications.length > 0 ? (
                    <Box p={8} width="80%" bg="white" borderRadius="md" boxShadow="md">
                        <Text fontSize="50px" align={'center'} mb={6} color={"black"}>
                            Notifications
                        </Text>
                        <Table variant="striped">
                            {/* <Thead>
                                <Tr>
                                    <Th>Description</Th>
                                    <Th>Action</Th>
                                </Tr>
                            </Thead> */}
                            <Tbody>
                                {currentNotifications.map((notification) => (
                                    <Tr key={notification.id}>
                                        <Td color="black">{notification.description}</Td>
                                        <Td>
                                            <Button
                                                colorScheme="red"
                                                size="sm"
                                                onClick={() => removeItem(notification?.id)}
                                            >
                                                <FaTimes />
                                            </Button>
                                        </Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>

                        {listofnotifications.length > 6 && (
                            <Pagination
                                totalPages={totalPages}
                                currentPage={currentPage}
                                handlePageChange={handlePageChange}
                            />
                        )}
                    </Box>
                ) : (
                    <Text p={8} fontSize="2xl" color="gray.600" align="center">
                        -- There are no notifications for you. --
                    </Text>
                )}
            </Flex>
            <Footer />
        </>
    );
};
export default Notifications;




