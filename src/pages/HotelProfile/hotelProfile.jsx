import react, { useState, useEffect } from "react"
import Header from "../../Header/header";
import Footer from "../../Footer/footer";
import { useNavigate } from 'react-router-dom';
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Stack,
    useColorModeValue,
    Input,
    Heading,
    Textarea,
    Button,
    Image,
    Tooltip,
    Text
} from '@chakra-ui/react'
import { useToast } from "@chakra-ui/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import profile from "../../profile.png";
import FoodBackgroundImage from '../../img4.jpg';

const HotelProfile = () => {

    const toast = useToast();
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const user = userInfo ? userInfo.User : null
    const role = user?.role;
    const navigate = useNavigate();

    const [hotelName, setHotelName] = useState('Tech Cafe');
    const [hotelDescription, setHotelDescription] = useState('Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.');
    const [hotelRating, setHotelRating] = useState(4.5);
    const [selectedFiles, setSelectedFiles] = useState(["http://res.cloudinary.com/dojtv6qwl/image/upload/v1704533187/ptk5pvkpxz1sassuiwfl.jpg",
        "http://res.cloudinary.com/dojtv6qwl/image/upload/v1704533187/ptk5pvkpxz1sassuiwfl.jpg",]);

    useEffect(() => {
        if (!userInfo) {
            navigate("/login")
        }
    })

    const handleDelete = (indexToDelete) => {
        const updatedFiles = selectedFiles.filter((_, index) => index !== indexToDelete);
        setSelectedFiles(updatedFiles);
    };


    const postDetails = (pics) => {

        if (pics.type === "image/jpeg" || pics.type === "image/png") {
            const data = new FormData();
            data.append("file", pics);
            data.append("upload_preset", "chat-app");
            data.append("cloud_name", "dojtv6qwl");
            const images = selectedFiles;
            fetch("https://api.cloudinary.com/v1_1/dojtv6qwl/image/upload", {
                method: "post",
                body: data,
            })
                .then((res) => res.json())
                .then((data) => {
                    images.push(data.url.toString());
                    setSelectedFiles(images);
                })
                .catch((err) => {
                    console.log(err);

                });
        }

    };

    const handleFileChange = (e) => {
        console.log(e.target.files.length)
        for (let i = 0; i < e.target.files.length; i++) {
            const files = e.target.files[i];
            setTimeout(() => { postDetails(files) }, 200);
        }
    };

    const handleUpdate = async () => {


        if (hotelRating != "" && (hotelRating > 5 || hotelRating < 1)) {
            toast({
                title: "Rating Should be between 1 and 5 (both included)",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            return;
        }
        if (hotelName == "" || hotelDescription == "" || hotelRating == "") {


            toast({
                title: "Please Fill all fields",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            return;
        }

        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };

            // const { data, status } = await axios.post(
            //     "http://localhost:5000/api/items/additem",
            //     {

            //     },
            //     config
            // );

            setEdit(false);

        } catch (error) {
            toast({
                title: "Unable to Update Profile",
                description: error.response.data.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
        }
    };


    const [flag, setFlag] = useState(false);
    const [edit, setEdit] = useState(false);
    const [selectedImage, setSelectedImage] = useState(profile);
    const [selectedNewImage, setSelectedNewImage] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
            setSelectedNewImage(URL.createObjectURL(file));
        } else {
            toast({
                title: "Invalid Image Format",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
        }
    };

    const ToggleButton = (e) => {
        e.preventDefault();
        setFlag(true)
    }



    // const handleUpdateImage = (e) => {
    //     e.preventDefault();
    //     alert("Uploaded Successfully");
    //     setSelectedImage(selectedNewImage);
    //     setFlag(false);
    // }
    const handleUpdateImage = (e) => {
        e.preventDefault();
        if (selectedNewImage) {
            toast({
                title: "Image Uploaded Successfully",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setSelectedImage(selectedNewImage);
            setFlag(false);
        } else {
            toast({
                title: "Please select an image",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
        }
    };

    const handleDeleteImage = (e) => {
        e.preventDefault();
        setFlag(false);
    }

    const handleEdit = (e) => {
        e.preventDefault();
        setEdit(true);
    }

    return (
        <>
            <Header />
            <Flex
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
            // padding={10}
            // width={"100%"}
            // bg="green.400"
            >
                <Stack spacing={8} mx={'auto'} width={'50%'} py={12} px={6} >
                    <Stack align={'center'} p={3}>
                        <Text fontSize={'60px'} color="black">Profile</Text>
                    </Stack>
                    <Box
                        rounded={'lg'}
                        // bg={useColorModeValue('white', 'gray.700')}
                        border="1px solid"
                        boxShadow="5px 10px 18px #888888"
                        p={8}
                        // bg="gray"
                        bg="rgba(0, 0, 0, 0.8)"
                    >

                        <Box
                            w="200px"
                            h="200px"
                            borderRadius="full"
                            overflow="hidden"
                            bg="green"
                            color="white"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            ml={"35%"}
                            position="relative"
                            boxShadow="5px 1px 25px black"
                            _hover={{
                                cursor: "pointer",
                                transform: useColorModeValue('scale(1.1)', 'scale(1.1)')
                            }}

                        >
                            <Image
                                src={selectedImage}
                                alt="User Image"
                                objectFit="cover"
                                boxSize="100%"
                            />
                            {!flag && (
                                <Tooltip label="update Image" placement="bottom">
                                    <FontAwesomeIcon
                                        icon={faTrash}
                                        color="black"
                                        style={{
                                            position: 'absolute',
                                            bottom: "0%",
                                            cursor: 'pointer',

                                        }}
                                        onClick={ToggleButton}
                                    />
                                </Tooltip>
                            )}
                        </Box>
                        {flag && (
                            <Flex width={"100%"} justify={"center"}>
                                <Box>
                                    {(selectedNewImage && flag) &&
                                        <Button mt={2} mr={"10%"} onClick={handleUpdateImage} colorScheme="blue" width={"100%"} isDisabled={!selectedNewImage}>
                                            Upload
                                        </Button>
                                    }
                                    {(!selectedNewImage && flag) && (
                                        <Tooltip label="Select an Image" placement="bottom">
                                            <Button mt={2} mr={"10%"} onClick={handleUpdateImage} colorScheme="blue" width={"100%"} isDisabled={!selectedNewImage}>
                                                Upload
                                            </Button>
                                        </Tooltip>
                                    )}
                                </Box>
                                <Box>
                                    <Button mt={2} ml={"10%"} onClick={handleDeleteImage} colorScheme="red" width={"100%"}>
                                        Delete
                                    </Button>
                                </Box>
                            </Flex>
                        )}

                        <Stack spacing={4} align={"center"}>
                            {
                                flag &&
                                <FormControl id="image" isRequired>
                                    <FormLabel>Upload Profile Image</FormLabel>
                                    <Input
                                        color="white"
                                        p={1.5}
                                        type="file"
                                        accept=".jpg, .jpeg, .png"
                                        onChange={handleImageChange}
                                    />
                                </FormControl>
                            }

                            <FormControl id="name" isRequired={edit}>
                                <FormLabel>Name of Hotel</FormLabel>
                                <Input
                                    color="white"
                                    type="text"
                                    placeholder="Enter Name of Hotel"
                                    value={hotelName}
                                    onChange={(e) => { setHotelName(e.target.value) }}
                                    readOnly={!edit}
                                />
                            </FormControl>

                            <FormControl id="rating" isRequired={edit}>
                                <FormLabel>Rating of Hotel</FormLabel>
                                <Input
                                    color="white"
                                    type="number"
                                    placeholder="Enter Rating of Hotel"
                                    value={hotelRating}
                                    onChange={(e) => { setHotelRating(e.target.value) }}
                                    readOnly={!edit}
                                />
                            </FormControl>

                            <FormControl id="description" isRequired={edit}>
                                <FormLabel>Description</FormLabel>
                                <Textarea
                                    color="white"
                                    size="md"
                                    placeholder="Enter Description of Hotel"
                                    value={hotelDescription}
                                    onChange={(e) => { setHotelDescription(e.target.value) }}
                                    readOnly={!edit}
                                />
                            </FormControl>

                            <FormControl id="uploadimage" isRequired={edit}>
                                <FormLabel>Upload Images</FormLabel>
                                <Input
                                    p={1.5}
                                    type="file"
                                    multiple
                                    accept=".jpg, .jpeg, .png, .pdf"
                                    onChange={handleFileChange}
                                    isDisabled={!edit}
                                    color="white"
                                />
                                {selectedFiles.length > 0 && (
                                    <Box mt={2}>
                                        <Text fontWeight={"bold"} >Uploaded Files:</Text>
                                        <ul>
                                            {Array.from(selectedFiles).map((file, index) => (
                                                <Flex p={2}>
                                                    <li key={index}> {file.slice(0, 20)} ....</li>
                                                    {
                                                        edit &&
                                                        <Button ml={2} height={"30px"} onClick={() => { handleDelete(index) }}> <FontAwesomeIcon icon={faTrash} /></Button>
                                                    }

                                                </Flex>
                                            ))}
                                        </ul>
                                    </Box>
                                )}
                            </FormControl>
                            {
                                !edit &&
                                <Button mt={2} onClick={handleEdit} width={"50%"} >
                                    Edit Profile
                                </Button>
                            }
                            {
                                edit &&
                                <Button mt={2} onClick={handleUpdate} colorScheme="blue" width={"50%"} >
                                    Save
                                </Button>
                            }
                        </Stack>
                    </Box>
                </Stack>
            </Flex>
            <Footer />
        </>
    )
}

export default HotelProfile;

