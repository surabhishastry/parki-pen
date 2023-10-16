import { styled, Button, Container, TextField, Typography } from "@mui/material";


export const FormContainer = styled(Container) ({
    backgroundColor: "#FFFFFF",
    display:"flex",
    borderRadius: "5px",
    alignItems: "center",
    flexDirection:"column",
    width: "auto",
});

export const InputField = styled(TextField) ({
    margin: 10,
    width: 300

});

export const Title = styled(Typography) ({
    variant: "h4",
    fontStyle: "bold", 
    color: "#3498db",
    textAlign: "center",
    margin: 20
});

export const SubmitBtn = styled(Button) ({
    backgroundColor: "#4285f4",
    marginTop: 15,
    marginBottom:20,
    height: 40,
    width: 100,
    fontStyle: "bold",
    fontSize: 15

});

export const HelpText = styled(Button) ({
    variant: "text",
    color: "#505050",
    textAlign: "center",
    marginTop: "-10px"
});
