import react, { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom';
import { Input, InputGroup } from "@chakra-ui/input";
import {
    Flex,
    Box,
    Heading,
    Text,
    Grid,
    GridItem,
    InputLeftElement,
    Badge,
    Select,
    Checkbox,
    Spinner
} from '@chakra-ui/react'
import axios from "axios";
import { SearchIcon } from "@chakra-ui/icons";
import Pagination from "../Pagination/pagination";
import { StarIcon } from '@chakra-ui/icons';
import FoodBackgroundImage from '../../img4.jpg';
const HomePageUser = () => {


    const navigate = useNavigate();
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const hotelid = JSON.parse(localStorage.getItem('hotelid'));
    const keys = ["userName"]
    const description = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. PageMaker including versions of Lorem Ipsum"
    // const initialHotels = [
    //     { id: 1, name: 'Tech Cafe', description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. PageMaker including versions of Lorem Ipsum" },
    //     { id: 2, name: 'D-Mark', description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum" },
    //     { id: 3, name: 'Galav', description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum" },
    //     { id: 4, name: 'Sai', description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum" },
    //     { id: 5, name: 'amrutulya ', description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum" },
    //     { id: 6, name: 'kumar', description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum" },
    //     { id: 7, name: 'Tech Cafe', description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum" },
    //     { id: 8, name: 'D-Mark', description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum" },
    //     { id: 9, name: 'Galav', description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum" },
    //     { id: 10, name: 'Sai', description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum" },
    //     { id: 11, name: 'amrutulya ', description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum" },
    //     { id: 12, name: 'kumar', description: "Lorem Ipsum is simply dummy " },
    // ];

    const [originalhotels, setOriginalHotels] = useState([]);
    const [hotels, setHotels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        if (hotelid) {
            localStorage.removeItem("hotelid");
            localStorage.removeItem("hotelname");
        }
    }, [])

    const [currentPage, setCurrentPage] = useState(0);
    const HotelsPerPage = 6;
    const totalPages = Math.ceil(hotels.length / HotelsPerPage)

    const indexOfLastHotel = (currentPage + 1) * HotelsPerPage;
    const indexOfFirstHotel = indexOfLastHotel - HotelsPerPage;
    const currentHotels = hotels.slice(indexOfFirstHotel, indexOfLastHotel);
    const [filterVeg, setFilterVeg] = useState(false);
    const [filterNonVeg, setFilterNonVeg] = useState(false);
    const [filterBoth, setFilterBoth] = useState(false);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const fetchallhotels = async () => {
        setLoading(true);
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };

            const { data, status } = await axios.get(
                "http://localhost:5000/api/auth/hotels",
                config
            );

            console.log(data.hotels[0])
            if (status == 200) {
                // setOriginalHotels(data.hotels)
                // setHotels(data.hotels);
                setTimeout(() => { setHotels(data.hotels); setOriginalHotels(data.hotels); }, 700);
                setTimeout(() => { setLoading(false) }, 500);
            }

        } catch (error) {
            setTimeout(() => { setLoading(false) }, 500);
            console.log("Error")
        }
    }

    useEffect(() => {
        fetchallhotels();
    }, [])

    useEffect(() => {
        const filteredHotels = originalhotels.filter(item => {
            const isMatchingSearch = keys.some(key =>
                item[key].toLowerCase().includes(searchQuery.toLowerCase())
            );
            const isVegMatch = !filterVeg || item.isVeg;
            const isNonVegMatch = !filterNonVeg || !item.isVeg;
            const isBothMatch = !filterBoth || item.isBoth;

            return isMatchingSearch && isVegMatch && isNonVegMatch && isBothMatch;
        });

        const arr = filteredHotels.filter((item) => keys.some((key) => item[key].toLowerCase().includes(searchQuery.toLowerCase())));

        if (arr.length || searchQuery)
            setHotels(arr)
        else
            setHotels(filteredHotels)

        // setHotels(filteredHotels);
    }, [searchQuery, filterVeg, filterNonVeg, originalhotels]);


    // useEffect(() => {
    //     const arr = originalhotels.filter((item) => keys.some((key) => item[key].toLowerCase().includes(searchQuery.toLowerCase())));

    //     if (arr.length || searchQuery)
    //         setHotels(arr)
    //     else
    //         setHotels(originalhotels)
    // }, [searchQuery])

    return (
        <>
            <Flex
                minH={'80vh'}
                align={'left'}
                justify={'center'}
            // bg="gray"
            >
                <Box p={20}>

                    <Box display="flex" alignItems="center">
                        <Checkbox
                            isChecked={filterVeg}
                            onChange={() => setFilterVeg(!filterVeg)}
                            colorScheme="green"
                            size="lg"
                            mr={4}
                            borderColor="black"
                        >
                            Veg
                        </Checkbox>
                        <Checkbox
                            isChecked={filterNonVeg}
                            onChange={() => setFilterNonVeg(!filterNonVeg)}
                            colorScheme="red"
                            size="lg"
                            mr={4}
                            borderColor="black"
                        >
                            Non-Veg
                        </Checkbox>
                        <Checkbox
                            isChecked={filterBoth}
                            onChange={() => setFilterBoth(!filterBoth)}
                            colorScheme="blue"
                            size="lg"
                            mr={4}
                            borderColor="black"
                        >
                            Both
                        </Checkbox>
                    </Box>

                    <Text fontSize={"50px"} mb={5} align={'center'} color={"black"} >
                        Hotels
                    </Text>

                    <InputGroup   >
                        <InputLeftElement pointerEvents='none'>
                            <SearchIcon color='gray.300' />
                        </InputLeftElement>
                        <Input
                            textColor={"black"}
                            width="1190px"
                            placeholder="Search items..."
                            mb={4}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            borderColor={"black"}
                        />

                    </InputGroup>


                    {loading ? (
                        <Spinner
                            thickness="4px"
                            speed="0.65s"
                            emptyColor="gray.200"
                            color="blue.500"
                            size="xl"
                            ml="45%"
                        />) : <>
                        {
                            hotels.length ?
                                <Box>
                                    <Grid templateColumns={['1fr', '1fr', 'repeat(3, 1fr)']} gap={4} width="100%">
                                        {/* {currentHotels.filter((hotel) => keys.some((key) => hotel[key].toLowerCase().includes(searchQuery.toLowerCase()))).map((hotel) => ( */}
                                        {currentHotels.map((hotel) => (
                                            <GridItem key={hotel.id} height="50%" maxH={"50%"} >
                                                <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden' _hover={{ bg: 'green.100', cursor: "pointer" }} >
                                                    <Box p='6' onClick={() => { navigate(`/catalog/${hotel._id}/${hotel.userName}`) }} >
                                                        <Text fontSize={"50px"} mb={2} align="center" textTransform='uppercase' color="black">
                                                            {hotel.userName}
                                                        </Text>
                                                        <Box display='flex' alignItems='baseline'>

                                                            <Badge borderRadius='full' px='2' colorScheme='teal'>
                                                                New
                                                            </Badge>
                                                            <Box
                                                                color='black'
                                                                fontWeight='semibold'
                                                                letterSpacing='wide'
                                                                fontSize='xs'
                                                                textTransform='uppercase'
                                                                ml='2'
                                                            >
                                                                {hotel?.userName}
                                                            </Box>

                                                            {/* <Box
                                                            width="40%"
                                                            color='black'
                                                            fontWeight='semibold'
                                                            fontSize='xs'
                                                            textTransform='uppercase'
                                                            align={"right"}
                                                        >
                                                            🔴 Non-Veg
                                                        </Box> */}
                                                            <Box
                                                                width="40%"
                                                                color='black'
                                                                fontWeight='semibold'
                                                                fontSize='xs'
                                                                textTransform='uppercase'
                                                                align={"right"}
                                                            >
                                                                🟢 Veg
                                                            </Box>

                                                            <Box
                                                                width="40%"
                                                                color='white'
                                                                fontWeight='semibold'
                                                                fontSize='xs'
                                                                align={"right"}
                                                            >
                                                                <Badge borderRadius='10px' px='2' bg='green.600'>
                                                                    <Text color="white" p={"2px"}>3★</Text>
                                                                </Badge>
                                                            </Box>
                                                        </Box>

                                                        <Box
                                                            mt='1'
                                                            fontWeight='semibold'
                                                            as='h4'
                                                            lineHeight='tight'
                                                            noOfLines={5}
                                                        >
                                                            {description}
                                                            {/* {hotel?.description} */}
                                                        </Box>


                                                        <Box display='flex' mt='2' alignItems='center'>
                                                            {Array(5)
                                                                .fill('')
                                                                .map((_, i) => (
                                                                    <StarIcon
                                                                        key={i}
                                                                        color={i < 3 ? 'teal.500' : 'gray.300'}
                                                                    />
                                                                ))}
                                                            {/* <Box as='span' ml='2' color='gray.600' fontSize='sm'>
                                                            {item?.reviews.length} reviews
                                                        </Box> */}
                                                        </Box>

                                                    </Box>
                                                </Box>
                                            </GridItem>

                                        ))}
                                    </Grid>
                                    {
                                        (hotels.length > 6) &&
                                        <Pagination totalPages={totalPages} currentPage={currentPage} handlePageChange={handlePageChange} />

                                    }
                                </Box> :
                                <Box align={'center'} color={"white"}  >
                                    -- No Hotels Listed --
                                </Box>
                        }
                    </>
                    }

                    {/* ========================================================================================================================================================================= */}
                    {/* 
                    {
                        hotels.length ?
                            <Box>
                                <Grid templateColumns={['1fr', '1fr', 'repeat(3, 1fr)']} gap={4} width="100%">
                                    {currentHotels.filter((item) => keys.some((key) => item[key].toLowerCase().includes(searchQuery))).map((item) => (
                                        <GridItem key={item.id} onClick={() => { navigate(`/catalog/${item.id}`) }}>
                                            <Box
                                                _hover={{
                                                    bg: 'green.200',
                                                    cursor: 'pointer',
                                                }}
                                                border="1px"
                                                p={4}
                                                borderRadius="md"
                                                boxShadow="md">
                                                <Flex height="100px" overflowY="auto" >
                                                    <Box width="350px">
                                                        <Box direction="column" alignItems="center" textAlign="center" >
                                                            <Heading as="h3" size="lg" mb={2}>
                                                                {item.name}
                                                            </Heading>
                                                            <Text fontSize="xl" color="blue" mb={4} >
                                                                {item?.description}
                                                            </Text>
                                                        </Box>

                                                    </Box>
                                                </Flex>
                                            </Box>
                                        </GridItem>

                                    ))}
                                </Grid>
                                {
                                    (hotels.length > 6) &&
                                    <Pagination totalPages={totalPages} currentPage={currentPage} handlePageChange={handlePageChange} />

                                }
                            </Box> :
                            <Box align={'center'} color={"red"}  >
                                -- No Hotels Listed --
                            </Box>
                    } */}
                </Box>
                {/* ========================================================================================================================================================================= */}
            </Flex >
        </>
    )
}

export default HomePageUser;

