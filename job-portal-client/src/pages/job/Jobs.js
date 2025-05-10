import { useEffect, useState } from "react";
import { getJobs } from "../../api/job";
import {
  Container, Card, CardContent, Typography,
  Pagination, List, ListItem, Divider, Box, Grid
} from "@mui/material";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);
  const jobsPerPage = 5;

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

  const indexOfLastJob = page * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

  return (
    <div>
      <Navbar />
      <Container maxWidth="md">
        <Typography variant="h4" sx={{ my: 4, textAlign: "center", fontWeight: "bold" }}>
          Available Jobs
        </Typography>

        <Grid container spacing={3}>
          {currentJobs.map((job) => (
            <Grid item xs={12} key={job.id}>
              <Card
                sx={{
                  boxShadow: 3,
                  transition: "0.3s",
                  "&:hover": { boxShadow: 6, transform: "scale(1.02)" },
                  borderRadius: 2,
                  padding: 2
                }}
              >
                <CardContent>
                  <Link to={`/jobs/${job.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                    <Typography variant="h6" sx={{ fontWeight: "bold", color: "#3d5afe" }}>
                      {job.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#666" }}>
                      {job.description}
                    </Typography>
                    <Typography variant="subtitle2" sx={{ color: "#2E7D32", fontWeight: "bold" }}>
                      Salary: ${job.salary}
                    </Typography>
                  </Link>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          <Pagination
            count={Math.ceil(jobs.length / jobsPerPage)}
            page={page}
            onChange={(event, value) => setPage(value)}
            variant="outlined"
            shape="rounded"
            color="primary"
            sx={{
              "& .MuiPaginationItem-root": {
                fontWeight: "bold",
              },
            }}
          />
        </Box>
      </Container>
    </div>
  );
};

export default Jobs;
