"use client";

import React from "react";
import { Backdrop, CircularProgress } from '@mui/material'
import { useStateGeneral } from "@/useState/useStateGeneral";

const Loading: React.FC = () => {
    const { loading } = useStateGeneral()

    return (
        <>
            {loading &&
                <Backdrop
                    sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                    open={loading}
                >
                    <CircularProgress color="inherit" />
                </Backdrop>
            }
        </>
    )
}

export default Loading