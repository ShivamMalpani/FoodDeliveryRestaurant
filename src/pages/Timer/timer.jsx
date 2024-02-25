import React, { useState, useEffect } from 'react';
import { Box, Text } from '@chakra-ui/react';

const Clock = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const formatTime = (date) => {
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();
        return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };

    return (
        <Box
            textAlign="center"
            p={"4px"}
            bgGradient="linear(to-r, teal.300, blue.500)"
            borderRadius="xl"
            boxShadow="xl"
            color="white"
        >
            <Text fontSize="2xl" fontWeight="bold">
                {formatTime(time)}
            </Text>
        </Box>
    );
};

export default Clock;