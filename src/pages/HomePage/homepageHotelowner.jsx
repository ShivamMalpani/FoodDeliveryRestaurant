import react, { useState, useEffect } from "react"
import {
    Flex,
    Box,
    Heading,
    Text,
    Image,
    SimpleGrid,
    Badge
} from '@chakra-ui/react'
import Pagination from "../Pagination/pagination";
import hotelimage from "../../hotelimage.jpg"
import hotelimage2 from "../../hotelimage2.jpg"
import hotelimage3 from "../../hotelimage3.jpg"
import hotelimage4 from "../../hotelimage4.jpg"

const HomePageHotelOwner = () => {

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const user = userInfo ? userInfo.User : null

    const hotelName = 'Tech Cafe';
    const hotelDescription = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
    const hotelRating = 4.5;

    const hotelImages = [
        hotelimage,
        hotelimage2,
        hotelimage3,
        hotelimage4,
        hotelimage,
        hotelimage2,
        hotelimage3,
        hotelimage4,
        hotelimage,
        // hotelimage2,
        // hotelimage3,
        // hotelimage4,
        // hotelimage,
        // hotelimage2,
        // hotelimage3,
        // hotelimage4,
        // "http://res.cloudinary.com/dojtv6qwl/image/upload/v1704533187/ptk5pvkpxz1sassuiwfl.jpg",
        // "http://res.cloudinary.com/dojtv6qwl/image/upload/v1704533187/ptk5pvkpxz1sassuiwfl.jpg",
        // "http://res.cloudinary.com/dojtv6qwl/image/upload/v1704533187/ptk5pvkpxz1sassuiwfl.jpg",
        // "http://res.cloudinary.com/dojtv6qwl/image/upload/v1704533187/ptk5pvkpxz1sassuiwfl.jpg",
        // "http://res.cloudinary.com/dojtv6qwl/image/upload/v1704533187/ptk5pvkpxz1sassuiwfl.jpg",
        // "http://res.cloudinary.com/dojtv6qwl/image/upload/v1704533187/ptk5pvkpxz1sassuiwfl.jpg",
        // "http://res.cloudinary.com/dojtv6qwl/image/upload/v1704533187/ptk5pvkpxz1sassuiwfl.jpg",
        // "http://res.cloudinary.com/dojtv6qwl/image/upload/v1704533187/ptk5pvkpxz1sassuiwfl.jpg",
        // "http://res.cloudinary.com/dojtv6qwl/image/upload/v1704533187/ptk5pvkpxz1sassuiwfl.jpg",
        // "http://res.cloudinary.com/dojtv6qwl/image/upload/v1704533187/ptk5pvkpxz1sassuiwfl.jpg",
        // "http://res.cloudinary.com/dojtv6qwl/image/upload/v1704533187/ptk5pvkpxz1sassuiwfl.jpg",
        // "http://res.cloudinary.com/dojtv6qwl/image/upload/v1704533187/ptk5pvkpxz1sassuiwfl.jpg",
        // "http://res.cloudinary.com/dojtv6qwl/image/upload/v1704533187/ptk5pvkpxz1sassuiwfl.jpg",
        // "http://res.cloudinary.com/dojtv6qwl/image/upload/v1704533187/ptk5pvkpxz1sassuiwfl.jpg",
        // "http://res.cloudinary.com/dojtv6qwl/image/upload/v1704533187/ptk5pvkpxz1sassuiwfl.jpg",
        // "http://res.cloudinary.com/dojtv6qwl/image/upload/v1704533187/ptk5pvkpxz1sassuiwfl.jpg",
        // "http://res.cloudinary.com/dojtv6qwl/image/upload/v1704533187/ptk5pvkpxz1sassuiwfl.jpg",
        // "http://res.cloudinary.com/dojtv6qwl/image/upload/v1704533187/ptk5pvkpxz1sassuiwfl.jpg",
        // "http://res.cloudinary.com/dojtv6qwl/image/upload/v1704533187/ptk5pvkpxz1sassuiwfl.jpg",
        // "http://res.cloudinary.com/dojtv6qwl/image/upload/v1704533187/ptk5pvkpxz1sassuiwfl.jpg",
        // "http://res.cloudinary.com/dojtv6qwl/image/upload/v1704533187/ptk5pvkpxz1sassuiwfl.jpg",
        // "http://res.cloudinary.com/dojtv6qwl/image/upload/v1704533187/ptk5pvkpxz1sassuiwfl.jpg",
        // "http://res.cloudinary.com/dojtv6qwl/image/upload/v1704533187/ptk5pvkpxz1sassuiwfl.jpg",
        // "http://res.cloudinary.com/dojtv6qwl/image/upload/v1704533187/ptk5pvkpxz1sassuiwfl.jpg",
        // "http://res.cloudinary.com/dojtv6qwl/image/upload/v1704533187/ptk5pvkpxz1sassuiwfl.jpg",
        // "http://res.cloudinary.com/dojtv6qwl/image/upload/v1704533187/ptk5pvkpxz1sassuiwfl.jpg",
    ];


    const [currentPage, setCurrentPage] = useState(0);
    const hotelImagesPerPage = 6;
    const totalLength = hotelImages.length;
    const totalPages = Math.ceil(totalLength / hotelImagesPerPage)

    const indexOfLastHotelImage = (currentPage + 1) * hotelImagesPerPage;
    const indexOfFirstHotelImage = indexOfLastHotelImage - hotelImagesPerPage;
    const currentHotelImages = hotelImages.slice(indexOfFirstHotelImage, indexOfLastHotelImage);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };




    return (
        <>
            <Flex
                minH={'80vh'}
                align={'left'}
                justify={'center'}
            // bg="gray"
            >
                <Box p={20}>
                    <Box bg="green.500" p={4} color="white">
                        <Text fontSize={"50px"} align="center">
                            {user?.userName == undefined ? user?.username : user?.userName}
                        </Text>
                    </Box>
                    <Box p={4}>
                        <Text fontSize="xl" color="black">{hotelDescription}</Text>
                        <Badge variant="solid" colorScheme="teal" fontSize="md" mt={2}>
                            Rating: {hotelRating}
                        </Badge>
                    </Box>
                    <Box>
                        <SimpleGrid columns={[1, 2, 3]} gap={4} p={4}>
                            {currentHotelImages.map((image, index) => (
                                <Image key={index} src={image} alt={`Hotel Image ${index + 1}`} aspectRatio={3 / 2} objectFit={'cover'} width="100%" height="100%" border="10px" />
                            ))}
                        </SimpleGrid>
                        {
                            (totalLength > 6) &&
                            <Pagination totalPages={totalPages} currentPage={currentPage} handlePageChange={handlePageChange} />
                        }
                    </Box>

                </Box>
            </Flex>
        </>
    )
}

export default HomePageHotelOwner;

