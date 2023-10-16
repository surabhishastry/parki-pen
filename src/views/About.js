import { Box, Grid, Typography, Container} from "@mui/material";
import pencil from "../static/pencil.png";
import graph from "../static/graph.png";
import custom from "../static/custom.png";
import curvyLines from "../static/curvy-lines.png";

const item = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    px: 5,
  };

export default function About () {

    return (
        <Box
            component="section"
            sx={{ 
                display: 'flex', 
                overflow: 'hidden',
                backgroundColor: "#116bd9"
            }}
        >
            <Container sx={{ mt: 15, mb: 30, display: 'flex', position: 'relative' }}>
                <Box
                    component="img"
                    src={curvyLines}
                    alt="curvy lines"
                    sx={{ pointerEvents: 'none', position: 'absolute', top: -180 }}
                />
                <Grid container spacing={10}>
                    <Grid item xs={12} md={4}>
                        <Box sx={item}>
                            <Box
                                component="img"
                                src={pencil}
                                alt="pencil"
                                sx={{ height: 55 }}
                            />
                            <Typography variant="h5" sx={{ my: 5 }}>
                            Progress Tracking
                            </Typography>
                            <Typography variant="h6" align="center">
                                Using Parki-Pen allows you to continuously track your motor skill control and tremor patterns over time. Provides Insights into how your condition is evolving.
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Box sx={item}>
                            <Box
                                component="img"
                                src={graph}
                                alt="graph"
                                sx={{ height: 55 }}
                            />
                            <Typography variant="h5" sx={{ my: 5 }}>
                                Treatment Efficacy
                            </Typography>
                            <Typography variant="h6" align="center">
                                By consistently using Parki-Pen, you can monitor the effectiveness of your treatments, medications, or therapies.
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Box sx={item}>
                            <Box
                                component="img"
                                src={custom}
                                alt="improve"
                                sx={{ height: 55 }}
                            />
                            <Typography variant="h5" sx={{ my: 5 }}>
                                Tailored Approach
                            </Typography>
                            <Typography variant="h6" align="center">
                                With Parki-Pen, you can identify what works best for you and make adjustments when needed to achieve better symptom management.
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>


            </Container>

        </Box>
    )


}