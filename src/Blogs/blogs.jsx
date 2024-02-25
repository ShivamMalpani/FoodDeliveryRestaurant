import { React, useState, useEffect } from 'react';
import {
    Box,
    Flex,
    Heading,
    Text,
    Image,
    Button,
    SimpleGrid
} from '@chakra-ui/react';
import Header from '../Header/header';
import Footer from '../Footer/footer';
import Pagination from '../pages/Pagination/pagination';
import { useNavigate } from 'react-router-dom';
import FoodBackgroundImage1 from '../foodbackgroundimage.jpg';
import FoodBackgroundImage from '../img2.jpg';
// import foodbackground from '../foodbackground.jpg';

const Blogs = () => {



    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem('userInfo'));

    useEffect(() => {
        if (!user) navigate('/')
    }, [user])


    const initialBlogs = [
        {
            title: 'The Art of Sushi Making',
            description: 'Discover the secrets behind crafting the perfect sushi roll at home.',
            imageUrl: FoodBackgroundImage1,
        },
        {
            title: 'Exploring Local Delicacies',
            description: 'Embark on a culinary journey as we explore the flavors of local dishes in your area.',
            imageUrl: FoodBackgroundImage1,
        },
        {
            title: 'Mastering the Grill: BBQ Tips and Tricks',
            description: 'Become a grill master with our expert tips and tricks for the perfect BBQ experience.',
            imageUrl: FoodBackgroundImage1,
        },
        {
            title: 'The Art of Sushi Making',
            description: 'Discover the secrets behind crafting the perfect sushi roll at home.',
            imageUrl: FoodBackgroundImage1,
        },
        {
            title: 'Exploring Local Delicacies',
            description: 'Embark on a culinary journey as we explore the flavors of local dishes in your area.',
            imageUrl: FoodBackgroundImage1,
        },
        {
            title: 'Mastering the Grill: BBQ Tips and Tricks',
            description: 'Become a grill master with our expert tips and tricks for the perfect BBQ experience.',
            imageUrl: FoodBackgroundImage,
        },
    ];


    const [blogs, setBlogs] = useState(initialBlogs);
    const [currentPage, setCurrentPage] = useState(0);
    const BlogsPerPage = 6;
    const totalPages = Math.ceil(blogs.length / BlogsPerPage)

    const indexOfLastBlog = (currentPage + 1) * BlogsPerPage;
    const indexOfFirstBlog = indexOfLastBlog - BlogsPerPage;
    const currentBlog = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    return (
        <>
            <Header />
            <Flex
                minH="80vh"
                align="center"
                justify="center"
                direction="column"
                p={10}
                bgSize="cover"
                bgPosition="center"
                bgRepeat="no-repeat"
            // bg='gray'
            // style={{
            //     backgroundImage: `url(${FoodBackgroundImage})`,
            //     backgroundSize: 'cover',
            //     backgroundPosition: 'center',
            //     minHeight: '100vh',
            //     color: 'white',
            // }}
            >
                <Box>
                    <Box mb={8} mt={10} >
                        <Text fontSize="60px" color=".black" textAlign="center">
                            Explore Delicious Food Blogs
                        </Text>
                    </Box>

                    <Box width="100%">
                        <SimpleGrid columns={[1, 2, 3]} gap={4}>
                            {currentBlog.map((blog, index) => (
                                <Box
                                    maxW="md"
                                    borderWidth="1px"
                                    borderRadius="lg"
                                    overflow="hidden"
                                    boxShadow="lg"
                                >
                                    <Image src={blog.imageUrl} alt={blog.title} width="100%" height="200px" objectFit="cover" />
                                    <Box p="6">
                                        <Heading fontSize="xl" fontWeight="bold" mb={2} color="teal.300">
                                            {blog.title}
                                        </Heading>
                                        <Text color="black">{blog.description}</Text>
                                        <Button mt={4} colorScheme="teal" size="sm">
                                            Read More
                                        </Button>
                                    </Box>
                                </Box>
                            ))}

                        </SimpleGrid>
                        {
                            (blogs.length > 6) &&
                            <Pagination totalPages={totalPages} currentPage={currentPage} handlePageChange={handlePageChange} />
                        }

                    </Box>
                </Box>
            </Flex>
            <Footer />
        </>
    );
};

export default Blogs;

