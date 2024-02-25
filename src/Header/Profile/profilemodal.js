import { ViewIcon } from "@chakra-ui/icons";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure,
    IconButton,
    Text,
    Image,
} from "@chakra-ui/react";

const ProfileModal = ({ user, children }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            {children ? (
                <span onClick={onOpen}>{children}</span>
            ) : (
                <IconButton d={{ base: "flex" }} icon={<ViewIcon />} onClick={onOpen} />
            )}
            <Modal size="lg" onClose={onClose} isOpen={isOpen} isCentered>
                <ModalOverlay />
                <ModalContent h="410px">
                    {/* <ModalHeader
                        fontSize="30px"
                        fontFamily="Work sans"
                        d="flex"
                        justifyContent="center"
                    >
                        UserName: {user.firstName + " " + user.lastName}
                    </ModalHeader>
                    <ModalCloseButton /> */}
                    <ModalBody
                        d="flex"
                        flexDir="column"
                        alignItems="center"
                        justifyContent="space-between"
                    >
                        <Image
                            borderRadius="full"
                            boxSize="150px"
                            src={user.pic}
                            alt={user.firstName}
                            marginLeft="30%"
                        />
                        <ModalCloseButton />
                        <ModalHeader
                            fontSize="30px"
                            fontFamily="Work sans"
                            d="flex"
                            justifyContent="center"
                        >
                            UserName: {user.userName}
                        </ModalHeader>
                        <ModalHeader
                            fontSize="30px"
                            fontFamily="Work sans"
                            d="flex"
                            justifyContent="center"
                        >
                            Email: {(user.emailId).length >= 20 ? user.emailId.slice(0, 20) + "...." : user.emailId}
                        </ModalHeader>
                        {/* <Text
                            fontSize={{ base: "28px", md: "25px" }}
                            fontFamily="Work sans"
                        >
                            Email: {user.emailId}
                        </Text> */}
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={onClose}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default ProfileModal;
