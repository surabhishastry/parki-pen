import * as React from 'react';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';

export default function TransitionAlerts(props) {
  const {open, setOpen, message, ...alertProps} = props

  return (
    <Box 
        sx={{
            width:"100%", 
            marginTop:"80px", 
            display:"flex", 
            alignItems:"center",
            justifyContent:"center",
            position: "absolute"
        }}>
      <Collapse in={open}>
        <Alert
            variant='filled'
            action={
                <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                    setOpen(false);
                }}
                >
                <CloseIcon fontSize="inherit" />
                </IconButton>
            }
            sx={{ mb: 2, minWidth: '100%', margin:"auto"}}
            {...alertProps}
        >
          {message}
        </Alert>
      </Collapse>
    </Box>
  );
}
