import { useContext, useState } from "react";
import { useNavigate } from 'react-router-dom'
import { signIn, signUp, sendResetEmail, signInWithGoogle } from "../firebase/AuthFunctions"
import { AuthContext, AlertContext } from "../context/Contexts";
import {FormContainer, HelpText, InputField, SubmitBtn, Title} from "../components/LoginComponents"
import { Container, Avatar, Button, IconButton, InputAdornment   } from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import google from '../static/google.png'

// eslint-disable-next-line
import { User } from "../data/User"; // Included for doc


export default function Login() {

    // Establish states for login variables
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');  
    const [showPassword, setShowPassword] = useState(false);
    
    // states for the visibility of login, signup and email recovery
    const [loginVisibility, setLoginVisibility] = useState(true);
    const [createVisibility, setCreateVisibility] = useState(false);
    const [recoveryVisibility, setRecoveryVisibility] = useState(false);

    // Retrieve user object from AuthProvider
    const [_user, setUser] = useContext(AuthContext);

    // Rerive alerts values and functions from AlertsProvider
    const [
        _isAlertVisible, _alertMsg, _severity, 
        _setAlertVisibility, showAlert
    ] = useContext(AlertContext);

    const navigate = useNavigate();

    const handleClickShowPassword = () => setShowPassword((show) => !show);
  
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };

    /**
     * Function to change the login method (login, new account creation or account recovery).
     * 
     * @param {String} method - target visibility (login, new account or recovery)
     */
    function changeVisibility(method) {
        if(method === "login") {
            setLoginVisibility(true);
            setCreateVisibility(false);
            setRecoveryVisibility(false);
            
            console.log("Moved to login page.");
        }
        else if(method === "create") {
            setLoginVisibility(false);
            setCreateVisibility(true);
            setRecoveryVisibility(false);

            console.log("Moved to new account creation page.");
        }
        else if(method === "recovery") {
            setLoginVisibility(false);
            setCreateVisibility(false);
            setRecoveryVisibility(true);

            console.log("Moved to account recovery page.");
        }
        else {
            console.error(method + " not a valid input for visibility.");
        }
    }

    /**
     * Authenticates login with Firebase.
     */
    const authenticateUser = async () => {
        
        const res = await signIn(email, password);

        if (res.success) {
            setUser(res.result); // Update the current user cache
            postAuthNavigation(res.result);
        }
        else { // Display the error
            //TODO: Update this to re-fetch until use is available
            showAlert("error", res.errorMessage);
        }
    }

    /**
     * Signs-up the new user with Firebase and adds new user info to cache
     */
    const createUser = async () => {

        if(firstname.length < 2) {
            showAlert("error", "First name required! Must be atleast 2 characters.");
            return;
        }

        console.log("Creating account for email " + email);
        const res = await signUp(firstname, lastname, email, password);
        
        if (res.success) {
            setUser(res.result); // Set new user info in cache
            console.log("Created user account for " + res.result.toString());
            postAuthNavigation(res.result)
        }
        else { // Display the error
            showAlert("error", res.errorMessage);
        }
    }

    /**
     * Sign-in user with Google Authentication
     */
    const onGoogleSignIn = async () => {
        console.log("Launching Google Auth...");

        const res = await signInWithGoogle(); // Sign-in
        if(res.success) {
            setUser(res.result); // Add signed-in user info with cache
            console.log("Signed-In user account for " + res.result.toString());
            postAuthNavigation(res.result);
        }
        else {
            if(res.errorMessage)
                showAlert("error", res.errorMessage);
        }
    }

    /**
     * Navigates to next webpage after sign-in/sign-up depending on status
     * 
     * @param {User} userInfo - User object that contains current user's info.
     */
    const postAuthNavigation = (userInfo) => {
        

        if(userInfo.chosenTrial ) { 
            if(userInfo.trialDay === userInfo.chosenTrial){ // If trial has ended
                showAlert("info", "Your trial has ended!");
                navigate("/graph");
            }                                // If trial is already chosen by user go to handwriting page
            else navigate("/handwriting");
        }
        else { // If trial is not chosen yet, go to "Get Started" page
            navigate("/getstarted")
        }
    }

    /**
     * Send recovery email for user
     */
    const recoverAccount = async() => {
        let res = await sendResetEmail(email);
        if(res.success) 
            showAlert("success", `Sent password reset link to ${email}.`);
        else 
            showAlert("error", res.errorMessage);
    }

    return (
        <div className="Login" style={{backgroundColor: "#050633"}}>


            <Container 
                style={{
                    height: "100vh",
                    display:"flex",
                    flexDirection:"column",
                    justifyContent:"center",
                    alignItems: "center"
                }}
            >
                <FormContainer className="setup">
                    
                    <Title variant="h4" style={{display : loginVisibility ? 'flex':'none'}}>Sign-in</Title>
                    <Title variant="h4" style={{display : createVisibility ? 'flex':'none'}}>Create Account</Title>
                    <Title variant="h4" style={{display : recoveryVisibility ? 'flex':'none'}}>Recover Account</Title>

                    <InputField label="First Name" 
                        onChange={e => setFirstName(e.target.value)}
                        style={{display : createVisibility ? 'flex':'none'}}
                    />
                    <InputField label="Last Name (Optional)" 
                        onChange={e => setLastName(e.target.value)}
                        style={{display : createVisibility ? 'flex':'none'}}
                    />
                    <InputField label="Email" 
                        onChange={e => setEmail(e.target.value)}
                    />
                    <InputField
                        id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        endadornment={
                            <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                            </InputAdornment>
                        }
                        label="Password"
                        onChange={e => setPassword(e.target.value)}
                        style={{display : loginVisibility || createVisibility ? 'flex':'none'}}
                    />

                    <SubmitBtn variant="contained" onClick={() => {
                        if(loginVisibility) authenticateUser()
                        else if(createVisibility) createUser()
                        else if(recoveryVisibility) recoverAccount()
                    }}>
                        Submit
                    </SubmitBtn>

                    <HelpText 
                        onClick={() => changeVisibility("create")}
                        style={{display : loginVisibility ? 'flex':'none'}}
                    >
                        New Member? Create an Account!
                    </HelpText>

                    <HelpText 
                        onClick={() => changeVisibility("recovery")}
                        style={{display : loginVisibility ? 'flex':'none'}}
                    >
                        Forgot Your Email?
                    </HelpText>

                    <HelpText 
                        onClick={() => changeVisibility("login")}
                        style={{display : !loginVisibility ? 'flex':'none'}}
                    >
                        Back to log-in
                    </HelpText>

                    <hr style={{
                        width:"85%",
                        height:"1px",
                        backgroundColor:"#000000",
                        display: !recoveryVisibility ? "flex" : "none"
                    }}/>

                    <Button
                        variant="contained"
                        startIcon={<Avatar variant="rounded" src={google}/>}
                        onClick={() => onGoogleSignIn()}
                        style={{
                            backgroundColor: "#4285f4",
                            margin: "15px",
                            display: !recoveryVisibility ? "flex" : "none"
                        }}
                    >
                        {(loginVisibility) ? "Sign-In with Google" : "Sign-up with Google"}
                    </Button>

                </FormContainer>
            </Container>
            
        </div>
    );

}