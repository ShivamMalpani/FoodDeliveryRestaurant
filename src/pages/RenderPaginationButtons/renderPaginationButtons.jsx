import react, { useState, useEffect } from "react"
import {
    Button,
    Text,

} from '@chakra-ui/react'

const RenderPaginationButtons = (props) => {

    const { totalPages, currentPage, handlePageChange } = props;

    const MAX_VISIBLE_PAGES = 7;
    const pages = [];

    if (totalPages <= MAX_VISIBLE_PAGES) {
        for (let i = 0; i < totalPages; i++) {
            pages.push(
                <Button
                    key={i + 1}
                    style={{
                        padding: '10px',
                        margin: '0 5px',
                        cursor: 'pointer',
                        backgroundColor: currentPage === i ? 'lightblue' : 'lightgray',
                        borderRadius: '5px',
                    }}
                    onClick={() => handlePageChange(i)}
                >
                    {i + 1}
                </Button>
            );
        }
    } else {
        const startPages = [...Array(Math.min(2, totalPages))].map((_, index) => (
            <Button
                key={index + 1}
                style={{
                    padding: '10px',
                    margin: '0 5px',
                    cursor: 'pointer',
                    backgroundColor: currentPage === index ? 'lightblue' : 'lightgray',
                    borderRadius: '5px',
                }}
                onClick={() => handlePageChange(index)}
            >
                {index + 1}
            </Button>
        ));


        pages.push(...startPages);


        if ((totalPages - Math.min(2, totalPages) > 0) && currentPage < totalPages - 2) {
            pages.push(<Text key="ellipsis-end">...</Text>)

            const middlePages = [...Array(MAX_VISIBLE_PAGES - 4)].map((_, index) => {
                const pageNumber = Math.max(currentPage - Math.floor((MAX_VISIBLE_PAGES - 4) / 2), 2) + index;
                return (
                    <Button
                        key={pageNumber + 1}
                        style={{
                            padding: '10px',
                            margin: '0 5px',
                            cursor: 'pointer',
                            backgroundColor: currentPage === pageNumber ? 'lightblue' : 'lightgray',
                            borderRadius: '5px',
                        }}
                        onClick={() => handlePageChange(pageNumber)}
                    >
                        {pageNumber + 1}
                    </Button>
                );
            });

            pages.push(...middlePages, <Text key="ellipsis-end">...</Text>)

        }

        if (currentPage > totalPages - 3) {
            const endPages = [...Array(Math.min(2, totalPages))].map((_, index) => (
                <Button
                    key={totalPages - 2 + index}
                    style={{
                        padding: '10px',
                        margin: '0 5px',
                        cursor: 'pointer',
                        backgroundColor: currentPage === totalPages - 2 + index ? 'lightblue' : 'lightgray',
                        borderRadius: '5px',
                    }}
                    onClick={() => handlePageChange(totalPages - 2 + index)}
                >
                    {totalPages - 2 + index + 1}
                </Button>
            ));


            pages.push(<Text key="ellipsis-end">...</Text>, ...endPages);
        }
    }

    return pages;
};


export default RenderPaginationButtons;