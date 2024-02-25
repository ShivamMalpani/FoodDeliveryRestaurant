import {
    Box,
    chakra,
    Container,
    SimpleGrid,
    Stack,
    Text,
    VisuallyHidden,
    Input,
    IconButton,
    useColorModeValue,
    Image
} from '@chakra-ui/react'
import { FaInstagram, FaTwitter, FaYoutube, FaLinkedin } from 'react-icons/fa'
import { BiMailSend } from 'react-icons/bi'
import logo from "../logo.png"


const SocialButton = ({ label, href, children }) => {
    return (
        <chakra.button
            bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
            rounded={'full'}
            w={8}
            h={8}
            cursor={'pointer'}
            as={'a'}
            href={href}
            display={'inline-flex'}
            alignItems={'center'}
            justifyContent={'center'}
            transition={'background 0.3s ease'}
            _hover={{
                bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
            }}>
            <VisuallyHidden>{label}</VisuallyHidden>
            {children}
        </chakra.button>
    )
}


const Footer = () => {
    return (
        <Box
            bg={useColorModeValue('gray.200', 'gray.900')}
            color={useColorModeValue('gray.700', 'gray.200')}
        >
            <Container as={Stack} maxW={'6xl'} py={6}>
                <SimpleGrid
                    templateColumns={{ sm: '1fr 1fr', md: '2fr 1fr 1fr 2fr' }}
                    spacing={6}>
                    <Stack spacing={6}>
                        <Box>
                            <Image
                                boxSize='100px'
                                src={logo}
                                alt='Logo'
                                borderRadius="100px"
                            />
                        </Box>
                        <Text fontSize={'sm'}>© 2023 Campus Delivery Services. All rights reserved</Text>
                        <Stack direction={'row'} spacing={6}>
                            <SocialButton label={'Twitter'} href={'#'}>
                                <FaTwitter />
                            </SocialButton>
                            <SocialButton label={'YouTube'} href={'#'}>
                                <FaYoutube />
                            </SocialButton>
                            <SocialButton label={'Instagram'} href={'#'}>
                                <FaInstagram />
                            </SocialButton>
                            <SocialButton label={'Linkedin'} href={'#'}>
                                <FaLinkedin />
                            </SocialButton>
                        </Stack>
                    </Stack>
                    <Stack align={'flex-start'}>
                        <Box><b>Company</b></Box>
                        <Box as="a" href={'/about-us'}>
                            About us
                        </Box>
                        <Box as="a" href={'blogs'}>
                            Blog
                        </Box>
                        <Box as="a" href={'/contact-us'}>
                            Contact us
                        </Box>
                    </Stack>
                    <Stack align={'flex-start'}>
                        <Box><b>Support</b></Box>
                        <Box as="a" href={'#'}>
                            Help Center
                        </Box>
                        <Box as="a" href={'#'}>
                            Terms of Service
                        </Box>
                        <Box as="a" href={'#'}>
                            Privacy Policy
                        </Box>

                    </Stack>
                    <Stack align={'flex-start'}>
                        <Box><b>Stay up to date</b></Box>
                        <Stack direction={'row'}>
                            <Input

                                placeholder={'Your email address'}
                                bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
                                border={0}
                                _focus={{
                                    bg: 'whiteAlpha.300',
                                }}
                            />
                            <IconButton
                                bg={useColorModeValue('green.400', 'green.800')}
                                color={useColorModeValue('white', 'gray.800')}
                                _hover={{
                                    bg: 'green.600',
                                }}
                                aria-label="Subscribe"
                                icon={<BiMailSend />}
                            />
                        </Stack>
                    </Stack>
                </SimpleGrid>
            </Container>
        </Box>
    )
};

export default Footer;