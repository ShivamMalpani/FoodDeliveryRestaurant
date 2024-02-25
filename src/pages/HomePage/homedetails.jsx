import react, { useState, useEffect } from "react"
import {
    Flex,
    Box,
    Text,
    Image,
    Badge,
    Grid,
    GridItem,
    Link,
    Button
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';
import manImage from "../../manimage.jpg"
import FoodBackgroundImage from '../../img4.jpg';
import akshay from '../../akshay.jpg';
import manish from '../../manish.jpg';
import tishang from '../../tishang.jpeg';
import sushant from '../../sushant.png';


const Homedetails = () => {

    const appName = 'Sam Verma';
    const appDescription = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
    const appRating = 4.5;
    const navigate = useNavigate();
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
                            Food Delivery App
                        </Text>
                    </Box>
                    <Box p={4}>
                        <Text fontSize="xl" color="black">{appDescription}</Text>
                        <Badge variant="solid" colorScheme="teal" fontSize="md" mt={2}>
                            Rating: {appRating}
                        </Badge>
                    </Box>
                    <Box>
                        <Grid templateColumns={['1fr', '1fr', 'repeat(4, 1fr)']} gap={4} width={"100%"} >
                            <GridItem>

                                <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden' _hover={{ cursor: "pointer" }}>
                                    <Image src={sushant} boxSize={'100%'} aspectRatio={3 / 2} objectFit={'cover'} width={"100%"} height={"100%"} />
                                    <Box p='6'>
                                        <Box display='flex' alignItems='baseline'>

                                            <Button
                                                color='black'
                                                fontWeight='semibold'
                                                letterSpacing='wide'
                                                fontSize='2xl'
                                                textTransform='uppercase'

                                            >
                                                <Link href="https://www.linkedin.com/in/sushant-yerawar-b0191a204/" style={{ textDecoration: 'none' }}> Sushant Yerawar</Link>
                                            </Button>
                                        </Box>

                                        <Box
                                            mt='1'
                                            fontWeight='semibold'
                                            as='h4'
                                            lineHeight='tight'
                                            noOfLines={4}
                                        >
                                            {appDescription}
                                        </Box>
                                    </Box>
                                </Box>
                            </GridItem>

                            <GridItem>

                                <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden' _hover={{ cursor: "pointer" }}>
                                    <Image src={akshay} boxSize={'100%'} aspectRatio={3 / 2} objectFit={'cover'} width={"100%"} height={"100%"} />
                                    <Box p='6'>
                                        <Box display='flex' alignItems='baseline'>

                                            <Button
                                                color='black'
                                                fontWeight='semibold'
                                                letterSpacing='wide'
                                                fontSize='2xl'
                                                textTransform='uppercase'

                                            >
                                                <Link href="https://www.linkedin.com/in/akshay-wairagade-b93081204/" style={{ textDecoration: 'none' }}>Akshay Wairagade</Link>
                                            </Button>


                                        </Box>

                                        <Box
                                            mt='1'
                                            fontWeight='semibold'
                                            as='h4'
                                            lineHeight='tight'
                                            noOfLines={4}
                                        >
                                            {appDescription}
                                        </Box>
                                    </Box>
                                </Box>
                            </GridItem>

                            <GridItem>

                                <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden' _hover={{ cursor: "pointer" }}>
                                    <Image src={manish} boxSize={'100%'} aspectRatio={3 / 2} objectFit={'cover'} width={"100%"} height={"100%"} />
                                    <Box p='6'>
                                        <Box display='flex' alignItems='baseline'>
                                            <Button
                                                color='black'
                                                fontWeight='semibold'
                                                letterSpacing='wide'
                                                fontSize='2xl'
                                                textTransform='uppercase'

                                            >
                                                <Link href="https://www.linkedin.com/in/manish-salunkhe/" style={{ textDecoration: 'none' }}>Manish Salunkhe</Link>
                                            </Button>


                                        </Box>

                                        <Box
                                            mt='1'
                                            fontWeight='semibold'
                                            as='h4'
                                            lineHeight='tight'
                                            noOfLines={4}
                                        >
                                            {appDescription}
                                        </Box>
                                    </Box>
                                </Box>
                            </GridItem>

                            <GridItem>

                                <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden' _hover={{ cursor: "pointer" }}>
                                    <Image src={tishang} boxSize={'100%'} aspectRatio={3 / 2} objectFit={'cover'} width={"100%"} height={"100%"} />
                                    <Box p='6'>
                                        <Box display='flex' alignItems='baseline'>
                                            <Button
                                                color='black'
                                                fontWeight='semibold'
                                                letterSpacing='wide'
                                                fontSize='2xl'
                                                textTransform='uppercase'

                                            >
                                                <Link href="https://www.linkedin.com/in/tishang-prajapati-720917206/" style={{ textDecoration: 'none' }}>Tishang Prajapati</Link>
                                            </Button>

                                        </Box>

                                        <Box
                                            mt='1'
                                            fontWeight='semibold'
                                            as='h4'
                                            lineHeight='tight'
                                            noOfLines={4}
                                        >
                                            {appDescription}
                                        </Box>
                                    </Box>
                                </Box>
                            </GridItem>

                        </Grid>
                    </Box>
                </Box>
            </Flex >
        </>
    )
}

export default Homedetails;

