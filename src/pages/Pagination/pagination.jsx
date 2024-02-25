import react, { useState, useEffect } from "react"
import {
    Box,
    Button,
} from '@chakra-ui/react'
import RenderPaginationButtons from "../RenderPaginationButtons/renderPaginationButtons";

const Pagination = (props) => {


    const { totalPages, currentPage, handlePageChange } = props;
    return (
        <Box style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            <Button
                style={{ padding: '10px', marginRight: '10px', cursor: 'pointer' }}
                onClick={() => handlePageChange(Math.max(currentPage - 1, 0))}
                disabled={currentPage === 0}
            >
                Previous
            </Button>
            <RenderPaginationButtons totalPages={totalPages} currentPage={currentPage} handlePageChange={handlePageChange} />
            <Button
                style={{ padding: '10px', marginLeft: '10px', cursor: 'pointer' }}
                onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages - 1))}
                disabled={currentPage === totalPages - 1}
            >
                Next
            </Button>
        </Box>
    )
}

export default Pagination;

