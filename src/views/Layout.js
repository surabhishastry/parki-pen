import { styled, AppBar, Toolbar, Button, Container } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useContext, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom"
import { AuthContext, AlertContext } from "../context/Contexts";
import { logOut } from "../firebase/AuthFunctions";
import TransitionAlerts from "../components/Alert";

const AppBarText = styled(Button) ({
    position:"relative",
    color:"white",
    backgroundColor: "transparent",
    fontFamily: "IBMPlexMono, monospace",
    fontStyle: "normal",
    fontWeight: 400
  });

// App Bar
export default function Layout() {

    const navigate = useNavigate();
    const [user, _setUser] = useContext(AuthContext);
    const [loginVisibility, setLoginVisibility] = useState(true);

    // Rerive alerts values and functions from AlertsProvider
    const [
        isAlertVisible, alertMsg, severity, 
        setAlertVisibility, showAlert
    ] = useContext(AlertContext);

    useEffect(() => {
        // Set the availabaility of the log-in button based on auth status
        setLoginVisibility(!user)

    }, [user] )


    /**
     * Navigates to the main page
     */
    function backHome() {
        navigate("/");    
    }

    /**
     * Navigates to the login page
     */
    function moveToLogIn() {
        setLoginVisibility(false);
        navigate("/login")
    }

    /**
     * Signs out user and navigates to the main page
     */
    async function signOutUser() {

        let res = await logOut();
        if(res.success) { // Sign-out was a success
            setLoginVisibility(true);
            navigate("/");

            // Display success alert
            showAlert("success", "Successfully Signed-Out!");
        }
        else { // Display error
            showAlert("error", res.errorMessage);
        }
    }


    return (

        <div className="Layout">
            <AppBar position="fixed" >
                <Toolbar display="flex">
                    <Container
                        sx={{
                            display:"flex",
                            position:"absolute",
                            left:"20px",
                            top:"-5px"
                        }}
                    >
                        <AppBarText onClick={() => backHome()} disableRipple 
                            sx={{
                                fontSize:"35px"
                            }}
                        >
                            PARKI-PEN
                        </AppBarText>
                        {(!user || loginVisibility) ? <div></div> : 
                            <div style={{display: user.chosenTrial ? "inline-block": "none"}}>
                                <AppBarText 
                                    variant="text" size="med" onClick={() =>navigate("/handwriting")} 
                                    sx={{
                                        display: (user.trialDay < user.chosenTrial) ? "inline-block":"none",
                                        fontSize:"25px",
                                        marginTop:"10px",
                                        marginLeft: "20px"
                                    }}
                                >
                                    Sketch
                                </AppBarText>
                                <AppBarText size="med" onClick={() => navigate("/graph")} 
                                    sx={{
                                        display: (user.trialDay !== 0) ? "inline-block": "none",
                                        fontSize:"25px",
                                        marginTop:"10px",
                                        marginLeft: "20px"
                                    }}
                                >
                                    Stats
                                </AppBarText>
                            </div>
                        
                        }
                        

                    </Container>


                    {(!user || loginVisibility) ? (
                        <AppBarText 
                            size="large" 
                            onClick={() => moveToLogIn()} 
                            disableRipple 
                            sx={{
                                position:"absolute",
                                fontSize:"20px",
                                right:"20px"
                            }}
                            display={loginVisibility ? "inline":"none"}
                        >
                            Log-In
                        </AppBarText>
                    ):(

                        <Container
                            sx={{
                                display: (user && !loginVisibility) ? "flex" : "none",
                                position:"absolute",
                                alignItems:"center",
                                justifyContent:"right",
                                right:"20px"
                            }}
                        >
                            <AppBarText size="large" onClick={() => signOutUser()} disableRipple sx={{fontSize:"20px" }}>
                                Sign-Out
                            </AppBarText>

                            <AppBarText size="large" disableRipple sx={{fontSize:"20px" }}>
                                |
                            </AppBarText>

                            <AppBarText size="large" disableRipple sx={{fontSize:"20px" }}>
                                {user.firstName} {user.lastName}
                            </AppBarText>

                            <AccountCircleIcon
                                sx={{
                                    top:"20px",
                                }}
                            ></AccountCircleIcon>
                        </Container>
                    )} 
                </Toolbar>
            </AppBar>
            <TransitionAlerts
                open={isAlertVisible}
                setOpen={setAlertVisibility}
                message={alertMsg}
                severity={severity}
            />
            <Outlet/>
        </div>

    );

}