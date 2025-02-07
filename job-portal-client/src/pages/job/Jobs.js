import { useEffect, useState } from "react";
import { getJobs } from "../../api/job";
import { 
  Container, Card, CardContent, Typography, 
  Pagination, List, ListItem, Divider 
} from "@mui/material";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);
  const jobsPerPage = 5; // Adjust as needed

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

  // Pagination Logic
  const indexOfLastJob = page * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

  return (
    <div>
      <Navbar />
      <Container maxWidth="md">
        <Typography variant="h4" sx={{ my: 4 }}>Available Jobs</Typography>

        <Card sx={{ boxShadow: 3}}>
          <CardContent>
            <List>
              {currentJobs.map((job) => (
                <div key={job.id}>
                  <ListItem 
                    button 
                    component={Link} 
                    to={`/jobs/${job.id}`} 
                    sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}
                  >
                    <Typography variant="h6">{job.title}</Typography>
                    <Typography variant="body2" color="textSecondary">{job.description}</Typography>
                    <Typography variant="subtitle2" color="primary">Salary: ${job.salary}</Typography>
                  </ListItem>
                  <Divider />
                </div>
              ))}
            </List>
          </CardContent>
        </Card>

        {/* Pagination */}
        <Pagination 
          count={Math.ceil(jobs.length / jobsPerPage)} 
          page={page} 
          onChange={(event, value) => setPage(value)}
          sx={{ display: "flex", justifyContent: "center", mt: 2 }}
        />
      </Container>
    </div>
  );
};

export default Jobs;
