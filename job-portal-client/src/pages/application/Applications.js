import { useEffect, useState } from "react";
import { getApplications } from "../../api/application";
import { getJobById } from "../../api/job";
import { Container, Card, CardContent, Typography, Grid } from "@mui/material";
import Navbar from "../../components/Navbar";
import { jwtDecode } from "jwt-decode";

const Applications = () => {
  const [applications, setApplications] = useState([]);
  const [jobDetails, setJobDetails] = useState({});

  const getUserIdFromToken = (token) => {
    if (!token) return null;
  
    try {
      const decodedToken = jwtDecode(token);
      return decodedToken.sub;
    } catch (error) {
      console.error("Invalid token", error);
      return null;
    }
  };

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const token = localStorage.getItem("token");
        const userId = getUserIdFromToken(token);
        console.log("User ID:", userId);
        const response = await getApplications(userId);
        console.log("response.data: ", response.data);
        setApplications(response.data);

        const jobData = {};
        for (const application of response.data) {
          const jobResponse = await getJobById(application.jobId);
          jobData[application.jobId] = jobResponse.data;
        }

        setJobDetails(jobData);
      } catch (error) {
        console.error("Error fetching applications or jobs", error);
      }
    };
    fetchApplications();
  }, []);

  return (
    <div>
    <Navbar/>
    <Container maxWidth="lg">
      <Typography variant="h4" sx={{ my: 4 }}>Available Applications</Typography>
      <Grid container spacing={3}>
        {applications.map((application) => {
          const job = jobDetails[application.jobId];
          return(
          <Grid item xs={12} sm={6} md={4} key={application.id}>
            <Card sx={{ boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h6">{job?.title || "Loading..."}</Typography>
                <Typography variant="body2">{application.status}</Typography>
                <Typography variant="subtitle2" color="primary">
                  Salary: ${job?.salary || "N/A"}
                </Typography>
                <Typography variant="body2">
                  Company: {job?.company || "N/A"}
                </Typography>
                <Typography variant="body2">
                  Location: {job?.location || "N/A"}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          );
        })}
      </Grid>
    </Container>
    </div>
  );
};

export default Applications;
