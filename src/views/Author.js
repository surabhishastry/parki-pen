import { Typography, Container } from "@mui/material";
import profile from "../static/profile_pic.png"


// Component describing the owner of the website
export default function Author() {


    return(
        <Container component="section" 
            sx={{ 
                display: "flex", 
                flexDirection: "column", 
                mt: 8, 
                mb: 4, 
                backgroundColor: "#FFFFFF"
            }}>


            <Typography variant="h4" marked="center" align="center" marginTop="40px">
                About Us
            </Typography>

            <Container 
                sx={{
                    display:"flex",
                    alignItems:"center",
                    margin:"20px"
                }}
            >

                <Typography variant="h6" marked="center" align="left" marginRight="40px" >
                    Greetings! My name is Surabhi Shastry, and I am a high school senior from Ellicott City, MD. I am passionate about improving the lives of patients dealing with PD. In the future, I aspire to pursue a career in medicine specializing in Neurology. 
                </Typography>
                <img src={profile} alt="Surabhi Profile" width="20%" style={{borderRadius:"50px"}}/>
            </Container>

            




        </Container>
    
    );
}