import { useContext, useEffect, useState } from "react";
import React from "react";
import { AuthContext } from "../context/Contexts";
import { ComposedChart, Tooltip, CartesianGrid, Legend, Line, Scatter, XAxis, YAxis, ResponsiveContainer} from "recharts";
import { List, Card, Container, Typography, ImageList, ImageListItem, ImageListItemBar, Collapse, CardContent} from "@mui/material";
import { getTip, graphDef, AdvisoryWarning, TroubleshootTips } from "../data/Tips";
import { GraphContainer, InfoContainer, InfoButton, ExpandMore} from "../components/GraphComponents";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default function Graph() {

    const [user, _setUser] = useContext(AuthContext);
    const [data, setData] = useState([]);
    const [tipsVisible, setTipsVisibility] = useState(true);
    const [currTip, setTip] = useState("");  
    const [flexExpanded, setFlexExpanded] = useState(false);
    const [gripExpanded, setGripExpanded] = useState(false);
    const [writingExpanded, setWriteExpanded] = useState(false);

    const Troubleshoots = Object.keys(TroubleshootTips);
    const handleExpandClick = (tip) => {
        if(tip === Troubleshoots[0]) setFlexExpanded(!flexExpanded);
        else if(tip === Troubleshoots[1]) setGripExpanded(!gripExpanded);
        else if(tip === Troubleshoots[2]) setWriteExpanded(!writingExpanded);
    };

    const getTroubleshootState = (tip) => {
        if(tip === Troubleshoots[0]) return flexExpanded;
        else if(tip === Troubleshoots[1]) return gripExpanded;
        else if(tip === Troubleshoots[2]) return writingExpanded;
    }


    /**
     * Calculate the line of best fit using the least squares method
     */
    const buildLOBF= () => {
        let xValues = [];
        for(let i = 0; i < user.accuracies.length; i++) {
            xValues.push(i + 1);
        }
        let yValues = user.accuracies
        const n = xValues.length;
        let sumX = 0;
        let sumY = 0;
        let sumXY = 0;
        let sumXX = 0;
  
        for (let i = 0; i < n; i++) {
          sumX += xValues[i];
          sumY += yValues[i];
          sumXY += xValues[i] * yValues[i];
          sumXX += xValues[i] * xValues[i];
        }
  
        const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
        const b = (sumY - slope * sumX) / n;

        // Build line graph points
        const points = [];
        for(let day = 0; day < user.accuracies.length; day++) {
            let trendPoint = Math.round((((day + 1) * slope) + b) * 100) / 100;
            if(trendPoint >= 0) {
                points.push({
                    "name": "Day " + (day + 1),
                    "patient": Math.round(user.accuracies[day] * 100) / 100,
                    "trend": trendPoint
                });
            }
            else {
                points.push({
                    "name": "Day " + (day + 1),
                    "patient": Math.round(user.accuracies[day] * 100) / 100
                });
            }
        };
        setData(points);
    };

    /**
     * Set the current tip based on average error
     */
    const retrieveTip = () => {

        // Average all the errors
        let avgError = 0;
        user.accuracies.forEach(acc => {
            avgError += acc;
        });
        avgError = avgError / user.trialDay;

        // Get the appropriate tip
        setTip(getTip(avgError));
    };


    // Update data when data changes
    useEffect(() => {

        if(user == null) return;

        // Calculate line of best fit
        buildLOBF();

        // Set the current tip
        retrieveTip();

    // eslint-disable-next-line    
    }, [user]);


    return (

    <div className="Graph" style={{display: "flex", flexDirection: "column", backgroundColor: "#050633"}}>
        {
            !user ? <div/> :  // Only load page when user is available
            <div
                style={{
                    height: "100vh",
                    width: "100%",
                    display:"flex",
                    alignItems:"center",
                    alignContent:"center"
                }}
            >

                <GraphContainer
                    sx={{
                        width: "150%"
                    }}
                >
                    <Typography variant="h4"
                        style={{
                            color: "#3498db"
                        }}
                    >
                        Trend of Error in Drawings
                    </Typography>
                    <ResponsiveContainer >
                        <ComposedChart 
                            id="graph-container" 
                            data={data}

                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name"/>
                            <YAxis 
                                label={{ value: 'Error', angle: -90, position: 'insideLeft', fontSize: '1.5rem'}} 
                            /> 
                            <Legend/>
                            <Tooltip />
                            <Scatter name="Patient" dataKey="patient" fill="#8884d8" />
                            <Line type="monotone" name="Trend" dataKey="trend" stroke="#82ca9d"/>

                        </ComposedChart>
                    </ResponsiveContainer>                        
                </GraphContainer>
                <GraphContainer>
                    <Container 
                        style={{
                            display:"flex",
                            padding: "10dp",
                            margin: "15dp"

                        }}
                    >
                        <InfoButton variant="contained" onClick={() => setTipsVisibility(true)}>Tips</InfoButton>
                        <InfoButton variant="contained" onClick={() => setTipsVisibility(false)}>Drawings</InfoButton>


                    </Container>
                    <InfoContainer style={{
                        display: tipsVisible ? "block" :"none",
                        overflow:"auto"
                    }}
                    >
                        <Typography variant="h6">
                            What does this mean?
                        </Typography>
                        <hr style={{width:"100%", marginLeft:"0", marginTop:"0"}}/>

                        <Typography variant="p">
                            {graphDef}
                        </Typography>

                        <Typography variant="h6" style={{marginTop:"40px"}}>
                            How do I improve my sketches?
                        </Typography>
                        <hr style={{width:"100%", marginLeft:"0", marginTop:"0"}}/>

                        <Typography paragraph>
                            {currTip}
                        </Typography>

                        <Typography paragraph fontSize="13px" color="grey" fontWeight="bold">
                            *** {AdvisoryWarning}
                        </Typography>

                        {
                            Troubleshoots.map(tip => {
                                return <Card 
                                    sx={{
                                        display:"flex", 
                                        flexDirection:"column",
                                        marginTop:"15px"
                                    }}
                                    key={tip}
                                > 
                                    <Container sx={{display:"flex", justifyContent:"space-between"}}>
                                        <Typography variant="h6" padding="5px">
                                           {tip}
                                        </Typography>
                                        <ExpandMore
                                            expand={getTroubleshootState(tip) ? 1:0}
                                            onClick={() => {handleExpandClick(tip)}}
                                            aria-expanded={getTroubleshootState(tip)}
                                            aria-label="show more"
                                        >
                                            <ExpandMoreIcon/>
                                        </ExpandMore>
                                    </Container>
                                    <Collapse in={getTroubleshootState(tip)} timeout="auto" unmountOnExit>
                                        <CardContent>
                                            <List sx={{display:"flex", flexDirection:"column"}}>
                                                {Object.keys(TroubleshootTips[tip]).map(stepNum => {
                                                    return <Typography paragraph key={stepNum}>
                                                        {stepNum}. {TroubleshootTips[tip][stepNum]}
                                                    </Typography>
                                                })}
                                            </List>
                                        </CardContent>
        
                                    </Collapse>
                                </Card>
                            })
                        }


                    </InfoContainer>

                    <InfoContainer style={{
                        display: !tipsVisible ? "block":"none",
                        overflow:"hidden"
                    }}>
                        
                        <ImageList sx={{ width: "100%", height: "100%",}} cols={1} rowHeight={300}>
                            {user.attempts.map((sketch) => (
                                <ImageListItem key={sketch.day}>
                                    <Card
                                        sx={{
                                            borderRadius:"10px",
                                            border:"2px solid black",
                                        }}
                                    >
                                        {sketch.sketch}
                                    </Card>
                                    <ImageListItemBar
                                        title={sketch.day}
                                        position="below"
                                        style={{
                                            textAlign: "center",
                                            fontWeight: "bold",
                                        }}
                                    />
                                </ImageListItem>
                            ))}
                        </ImageList>

                    </InfoContainer>

                </GraphContainer>



            </div>
        }
    </div>
    );

}
