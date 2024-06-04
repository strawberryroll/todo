import React, { useState } from 'react';
import { Box, Button, Card as MUICard, CardContent, CardActions, Typography } from '@mui/material';
import EditTask from '../modals/EditTask';
import CheckTask from '../modals/CheckTask';

const Card = ({ taskObj, index, deleteTask, updateListArray }) => {
    const [modal, setModal] = useState(false);

    const colors = [
        {
            primaryColor: "#5D93E1",
            secondaryColor: "#ECF3FC"
        },
        {
            primaryColor: "#F9D288",
            secondaryColor: "#FEFAF1"
        },
        {
            primaryColor: "#5DC250",
            secondaryColor: "#F2FAF1"
        },
        {
            primaryColor: "#F48687",
            secondaryColor: "#FDF1F1"
        },
        {
            primaryColor: "#B964F7",
            secondaryColor: "#F3F0FD"
        }
    ];

    const toggle = () => {
        setModal(!modal);
    };

    const updateTask = (obj) => {
        updateListArray(obj, index);
    };

    const handleDelete = () => {
        deleteTask(index);
    };

    return (
        <MUICard
            sx={{
                width: 270,
                boxShadow: '0px 3px 50px rgba(0, 0, 0, 0.1)',
                marginBottom: 4,
                position: 'relative'
            }}
        >
            <Box
                sx={{
                    height: 10,
                    backgroundColor: colors[index % 5].primaryColor
                }}
            />
            <CardContent
                sx={{
                    backgroundColor: taskObj.Completed ? '#F0F0F0' : '#FFFFFF',
                    textDecoration: taskObj.Completed ? 'line-through' : 'none'
                }}
            >
                <Typography
                    variant="h5"
                    component="div"
                    sx={{
                        backgroundColor: colors[index % 5].secondaryColor,
                        borderRadius: 1,
                        padding: 1,
                        textAlign: 'center',
                        fontWeight: 'bold',
                        color: colors[index % 5].primaryColor
                    }}
                >
                    {taskObj.Name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                    {taskObj.Description}
                </Typography>
            </CardContent>
            <CardActions
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '16px'
                }}
            >
                <CheckTask taskObj={taskObj} index={index} updateListArray={updateListArray} />
                <Box>
                    <Button
                        size="small"
                        sx={{
                            color: colors[index % 5].primaryColor,
                            cursor: 'pointer'
                        }}
                        onClick={() => setModal(true)}
                    >
                        Edit
                    </Button>
                    <Button
                        size="small"
                        sx={{
                            color: colors[index % 5].primaryColor,
                            cursor: 'pointer'
                        }}
                        onClick={handleDelete}
                    >
                        Delete
                    </Button>
                </Box>
            </CardActions>
            <EditTask modal={modal} toggle={toggle} updateTask={updateTask} taskObj={taskObj} />
        </MUICard>
    );
};

export default Card;
