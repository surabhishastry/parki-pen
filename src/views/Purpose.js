import {Typography, Container } from "@mui/material";

export default function Purpose() {


    return (
        <Container component="section" 
            sx={{ 
                display: "flex", 
                flexDirection: "column", 
                mt: 8, 
                mb: 4, 
                backgroundColor: "#FFFFFF"
            }}>
        
            <Typography variant="h4" marked="center" align="center" >
                Our Purpose
            </Typography>

            <Typography variant="h6" marked="center" align="left" margin="40px" >
                Parki-Pen empowers individuals with Parkinson's Disease to practice their motor skills while closely monitoring their progress. Our app provides a comprehensive solution, offering personalized insights and actionable advice to improve their quality of life. With Parki-Pen, users receive an accurate assessment of their handwriting accuracy percentage, accompanied by a detailed chart showcasing their data over a testing period. By doing so, individuals can implement targeted lifestyle changes and witness the alleviation of Parkinson's symptoms. For any questions, concerns, or suggestions, please contact us at parki.pen.app@gmail.com.
            </Typography>


        
        </Container>
    )

}