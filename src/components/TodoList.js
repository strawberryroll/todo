import React, { useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import CreateTask from '../modals/CreateTask';
import Card from './Card';

const TodoList = () => {
    const [modal, setModal] = useState(false);
    const [taskList, setTaskList] = useState([]);
    
    useEffect(() => {
        let arr = localStorage.getItem("taskList");
       
        if(arr){
            let obj = JSON.parse(arr);
            setTaskList(obj);
        }
    }, []);

    const deleteTask = (index) => {
        let tempList = taskList;
        tempList.splice(index, 1);
        localStorage.setItem("taskList", JSON.stringify(tempList));
        setTaskList(tempList);
        window.location.reload();
    };

    const updateListArray = (obj, index) => {
        let tempList = taskList;
        tempList[index] = obj;
        localStorage.setItem("taskList", JSON.stringify(tempList));
        setTaskList(tempList);
        window.location.reload();
    };

    const toggle = () => {
        setModal(!modal);
    };

    const saveTask = (taskObj) => {
        let tempList = taskList;
        taskObj.Completed = false;  // Initialize the Completed property
        tempList.push(taskObj);
        localStorage.setItem("taskList", JSON.stringify(tempList));
        setTaskList(tempList);
        setModal(false);
    };

    return (
        <>
            <Box
                sx={{
                    height: '200px',
                    width: '100%',
                    backgroundColor: '#E9EEF6',
                    paddingTop: '50px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
                    borderBottom: '2px solid #D3D3D3',
                }}
                className="header"
            >
                <Typography variant="h3" component="h3" gutterBottom sx={{ fontWeight: 'bold', color: '#333' }}>
                    Todo List
                </Typography>
                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={() => setModal(true)}
                    sx={{
                        mt: 2,
                        backgroundColor: '#5D93E1',
                        '&:hover': {
                            backgroundColor: '#4A7BBE',
                        },
                        '&:active': {
                            backgroundColor: '#3E6CA3',
                        },
                        padding: '10px 20px',
                        fontSize: '1rem',
                        fontWeight: 'bold',
                        borderRadius: '25px',
                        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                        transition: 'background-color 0.3s ease, transform 0.3s ease',
                    }}
                >
                    Create Task
                </Button>
            </Box>
            <div className="task-container">
                {taskList && taskList.map((obj, index) => <Card taskObj={obj} index={index} deleteTask={deleteTask} updateListArray={updateListArray} />)}
            </div>
            <CreateTask toggle={toggle} modal={modal} save={saveTask} />
        </>
    );
};

export default TodoList;
