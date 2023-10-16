import { Container, Typography, Button } from "@mui/material";
import background from "../static/starry-sky.jpg"
import "../index.css"
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/Contexts";
import { ParkiPenLayoutSection, Background, Image, AppName, FeatureText } from "../components/ParkiPenComponents";


export default function ParkiPen() {

  const [user, _setUser] = useContext(AuthContext);
  const navigate = useNavigate();

  /**
   * Navigate to next page from home page.
   */
  function getStarted() {
    if(user == null) {
      navigate("/login");
    }
    else if(user.chosenTrial == null) {
      navigate("/getstarted");
    }
    else if(user.chosenTrial != null && user.trialDay === user.chosenTrial) {
      navigate("/graph");
    }
    else {
      navigate("/handwriting");
    }
  }

  return (
    <div style={{display:"block"}}>
    <ParkiPenLayoutSection>

      <Background 
        sx={{
          backgroundImage: `url(${background})`,
          backgroundPosition: 'center'
        }}
      />

      <AppName variant="h1">
        PARKI-PEN
      </AppName>

      <Container
        sx={{
          display: "flex",
          alignItems:"center",
          height: '100vh',
          minHeight: 500,
          maxHeight: 1300,
          width: '100%',
        }}
      >

        <Container
          sx={{
            ml:"-10%"
          }}
        >
          <FeatureText 
            sx={{
              minWidth:"300px",
            }}
          >
            ALGORITHMIC TRACING SYSTEM
          </FeatureText>

          <hr style={{
            width:"75%",
            position:"relative",
            left:"80px",
            top:"-25px",
            zIndex:1
          }}/>

        </Container>

        <Image
          component="img"
          src={require("../static/Brain.png")}
        />

        <Container 
          sx={{
            position:"relative",
            left:"-20%"
          }}
        >

          <Container>
            <FeatureText
              sx={{
                minWidth:"300px",
              }}
            >
              FINE MOTOR SKILLS
            </FeatureText>

            <hr style={{
              width:"80%",
              position:"relative",
              left:"-150px"
            }}/>

          </Container>

          <FeatureText
            sx={{
              minWidth:"300px",
              mt:"35%",
              ml:"80px"
            }}
          >
            PARKI-PEN OFFERS PERSONALIZED ADVICE
          </FeatureText>

          <hr style={{
              width:"60%",
              marginLeft:"80px",
              marginTop:"20px"
            }}/>

          <FeatureText
            sx={{
              minWidth:"300px",
              mt:"30px",
              ml:"80px"
            }}
          >
            DEDICATED TO PARKINSON'S PATIENTS
          </FeatureText>


        </Container>

      </Container>

    <Container
      sx={{
        display:"flex",
        alignItems:"center",
        position:"absolute",
        bottom:"20px",
        right:"0px"
      }}
    >
      <hr style={{
        width:"35%",
        marginLeft:"25%"
      }}/>

      <Button variant="text"
        sx={{
          color:"white",
          fontSize:22,
          fontFamily: "Open Sans, sans-serif",
          fontStyle: "normal",
          fontWeight: 400
        }} onClick={() => getStarted()}>
        GET STARTED
      </Button>

      <hr style={{
        width:"20%"
      }}/>

    </Container>

    <Typography
      sx={{
        fontStyle: "italic",
        fontSize: "22px",
        color: "#696969",
        position: "absolute",
        bottom:"20px",
        left:"30px"
      }}
    >
      "Every stroke is a step towards independence."
    </Typography>


      
    </ParkiPenLayoutSection>
    </div>



  )

}