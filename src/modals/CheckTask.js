import React, { useState } from 'react';
import { Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';

const CheckTask = ({ taskObj, index, updateListArray }) => {
    const [checked, setChecked] = useState(taskObj.Completed);

    const handleChange = (event) => {
        setChecked(event.target.checked);
        let updatedTask = { ...taskObj, Completed: event.target.checked };
        updateListArray(updatedTask, index);
    };

    return (
        <div>
            <Checkbox
                checked={checked}
                onChange={handleChange}
                color="primary"
                inputProps={{ 'aria-label': 'primary checkbox' }}
            />
        </div>
    );
};

export default CheckTask;
