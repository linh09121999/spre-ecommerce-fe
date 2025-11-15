"use client"
import { Box, Button, Step, StepLabel, Stepper, Typography } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import Image from "next/image";
import { useRouter } from "next/navigation";

import React, { useState, useEffect } from "react";
import { SiX } from "react-icons/si";
import { ToastContainer } from "react-toastify";

const Checkout: React.FC = () => {
    const router = useRouter()
    const sxStep: SxProps<Theme> = {
        py: '20px',
        // px: '40px',
        mx: 'auto',
        maxWidth: '1200px',
        '& .MuiStepLabel-root': {
            flexDirection: 'column'
        },
        '& .MuiSvgIcon-root': {
            height: '2rem',
            width: '2rem',
            '&.Mui-active': {
                color: 'var(--color-green-500)'
            },
            '&.Mui-completed': {
                color: 'var(--color-green-500)'
            }
        }
    }
    const steps = ["Cart", 'Address', 'Delivery', 'Payment', 'Confirm', 'Complete'];
    const [activeStep, setActiveStep] = useState(1);
    const [skipped, setSkipped] = useState(new Set<number>());

    const isStepSkipped = (step: number) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {
        if (activeStep > 1) {
            setActiveStep((prevActiveStep) => prevActiveStep - 1);
        } else {
            router.push('/cart')
        }
    };

    const handleReset = () => {
        setActiveStep(1);
    };

    return (
        <>
            <Box sx={{ width: '100%' }}>
                <Stepper activeStep={activeStep} sx={sxStep}>
                    {steps.map((label, index) => {
                        const stepProps: { completed?: boolean } = {};
                        const labelProps: {
                            optional?: React.ReactNode;
                        } = {};
                        if (isStepSkipped(index)) {
                            stepProps.completed = false;
                        }
                        return (
                            <Step key={label} {...stepProps}>
                                <StepLabel {...labelProps}>{label}</StepLabel>
                            </Step>
                        );
                    })}
                </Stepper>

                <div className="p-5 max-w-[1535px] mx-auto">
                    <div>

                    </div>
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2, justifySelf: 'end' }}>
                        <Button
                            color="inherit"
                            // disabled={activeStep === 1}
                            onClick={handleBack}
                            sx={{ mr: 1 }}
                        >
                            Back
                        </Button>
                        <Button onClick={handleNext}>
                            {activeStep === steps.length - 1 ? 'Finish' : 'Save and Continue'}
                        </Button>
                    </Box>
                </div>
            </Box>
            <ToastContainer position="top-right" autoClose={3000} />
        </>
    );
}

export default Checkout