import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getJobById } from "../../api/job";
import { Container, Card, CardContent, Typography, Button } from "@mui/material";
import Navbar from "../../components/Navbar";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await getJobById(id);
        setJob(response.data);
      } catch (error) {
        console.error("Error fetching job details", error);
      }
    };
    fetchJobDetails();
  }, [id]);

  if (!job) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <div>
      <Navbar />
      <Container maxWidth="md">
        <Card sx={{ boxShadow: 3, mt: 4 }}>
          <CardContent>
            <Typography variant="h4">{job.title}</Typography>
            <Typography variant="h6" color="textSecondary">{job.company}</Typography>
            <Typography variant="body1" sx={{ mt: 2 }}>{job.description}</Typography>
            <Typography variant="subtitle1" color="primary" sx={{ mt: 2 }}>
              Salary: ${job.salary}
            </Typography>

            <Button variant="contained" color="primary" sx={{ mt: 3 }}>
              Apply Now
            </Button>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
};

export default JobDetails;
