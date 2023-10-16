import { useContext } from "react";
import { useNavigate } from 'react-router-dom'
import { AuthContext } from "../context/Contexts";
import { updateUser } from "../firebase/UserFunctions";
import { AlertContext } from "../context/Contexts";
import { Container, Typography, List, ListItem, Button } from "@mui/material";
import styled from "@emotion/styled";


const TrialBtn = styled(Button) ({
    backgroundColor: "#3366cc",
    maxWidth: "200px",
    color: "#FFFFFF",
    marginRight:"30px",
    marginBottom: "25px",
    marginTop: "15px",
    '&:hover': {
      backgroundColor:"#346edb"
    }
})

export default function GetStarted() {

    const navigate = useNavigate();
    const [user, _setUser] = useContext(AuthContext);

    const startUpSteps = [
        {num: 1, step:"Click on one of the buttons below to start writing."},
        {num: 2, step:"Select a symbol to trace."},
        {num: 3, step:"Change the color to your liking."},
        {num: 4, step:"Click the 'Restart' button if needed."},
        {num: 5, step:"Click the 'Submit' when satisfied."},
        {num: 6, step:"Click the 'Calculate Accuracy' button."},
        {num: 7, step:"Repeat the process for 7 days."},
        {num: 8, step:"Display a scatterplot chart with a line of best fit to show the correlation of the sample points (better accuracy, more improved handwriting)."}
      ];

    // Rerive alerts values and functions from AlertsProvider
    const [
        _isAlertVisible, _alertMsg, _severity, 
        _setAlertVisibility, showAlert
    ] = useContext(AlertContext);

    /**
     * Save trial selection in the user info.
     * 
     * @param {Number} numDays - Number of days in chosen trial. 
     */
    async function onTrialClick(numDays) {

        user.chosenTrial = numDays;

        // Update user to firebase in the background
        updateUser(user)

        // Indicate success with alert
        showAlert("success", `Welcome! Get started with your ${numDays} day trial with a sketch.`);
        
        // Navigate to drawing page
        navigate("/handwriting");
        
        
    }

    return (

        <div className="GetStarted" 
            style={{
                backgroundColor: "#050633",
                display:"flex",
                alignItems:"center",
                justifyContent:"center",
                height:"100vh",
                width: "100%"
            }}>
            <Container
                style={{
                    backgroundColor: "#FFFFFF",
                    display:"flex",
                    flexDirection:"column",
                    alignItems:"center",
                    justifyContent:"center",
                    width:"45%",
                    borderRadius:"10px"
                }}
            >
                <Typography variant="h3" color="#3366cc" margin="15px">
                    Steps to Use the App
                </Typography>

                <List
                    sx={{
                        display:"flex",
                        flexDirection:"column"
                    }}
                >
                    {startUpSteps.map((step) => {
                        return(
                            <ListItem key={"Step " + step.num}>
                                <Typography variant="p" fontSize="16px">
                                    {step.num}. {step.step}
                                </Typography>
                            </ListItem>
                        )
                    })}
                </List>

                <Container
                    sx={{
                        width: "100%",
                        display:"flex",
                        alignItems:"center",
                        justifyContent:"center"
                    }}
                >
                    <TrialBtn onClick={() => onTrialClick(7)}>
                        Start Writing - 7-day Trial
                    </TrialBtn>
                    <TrialBtn onClick={() => onTrialClick(14)}>
                        Start Writing - 14-day Trial
                    </TrialBtn>
                    <TrialBtn onClick={() => onTrialClick(30)}>
                        Start Writing - 30-day Trial
                    </TrialBtn>
                </Container>

            </Container>
        </div>


    )
}
