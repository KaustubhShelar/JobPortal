import { useEffect, useState } from "react";
import { getJobs } from "../../api/job";
import { Container, Card, CardContent, Typography, Grid } from "@mui/material";
import Navbar from "../../components/Navbar";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await getJobs();
        setJobs(response.data);
      } catch (error) {
        console.error("Error fetching jobs", error);
      }
    };
    fetchJobs();
  }, []);

  return (
    <div>
    <Navbar/>
    <Container maxWidth="lg">
      <Typography variant="h4" sx={{ my: 4 }}>Available Jobs</Typography>
      <Grid container spacing={3}>
        {jobs.map((job) => (
          <Grid item xs={12} sm={6} md={4} key={job.id}>
            <Card sx={{ boxShadow: 3 }}>
              <CardContent>
                <Typography variant="h6">{job.title}</Typography>
                <Typography variant="body2">{job.description}</Typography>
                <Typography variant="subtitle2" color="primary">
                  Salary: ${job.salary}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
    </div>
  );
};

export default Jobs;
