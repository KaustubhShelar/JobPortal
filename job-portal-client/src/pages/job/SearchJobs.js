import React, { useState, useEffect } from "react";
import { TextField, Button, Grid, MenuItem, Select, InputLabel, FormControl, Card, CardContent, Typography } from "@mui/material";
import axios from "axios";

const SearchJobs = () => {
  const [filters, setFilters] = useState({
    location: "",
    requiredExperience: "",
    skillsRequired: [],
  });

  const [locations, setLocations] = useState([]);
  const [skills, setSkills] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch locations and skills from the database on component mount
  useEffect(() => {
    const fetchFilters = async () => {
      try {
        // const locationResponse = await axios.get("http://localhost:8080/api/jobs/locations");
        // setLocations(locationResponse.data);

        const skillsResponse = await axios.get("http://localhost:8080/api/jobs/skills");
        setSkills(skillsResponse.data);
      } catch (error) {
        console.error("Error fetching filter data", error);
      }
    };

    fetchFilters();
  }, []);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSkillsChange = (e) => {
    setFilters({ ...filters, skillsRequired: e.target.value });
  };

  const handleClearSkills = () => {
    setFilters({ ...filters, skillsRequired: [] });
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8080/api/jobs", {
        params: {
          ...filters,
          skillsRequired: Array.isArray(filters.skillsRequired) ? filters.skillsRequired.join(",") : filters.skillsRequired,
        },
      });
      console.log("response: " +filters.location );
      console.log("response: " +filters.skillsRequired );
      console.log("response: " +filters.requiredExperience );
      setJobs(response.data);
    } catch (error) {
      console.error("Error fetching jobs", error);
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Search Jobs</h2>

      {/* Filter Section */}
      <Grid container spacing={2}>
        {/* Location Dropdown */}
        <Grid item xs={12} sm={6} md={4}>
          <FormControl fullWidth>
            <InputLabel>Location</InputLabel>
            <Select name="location" value={filters.location} onChange={handleChange}>
              <MenuItem value="">All Locations</MenuItem>
              {locations.map((loc) => (
                <MenuItem key={loc} value={loc}>{loc}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* Experience Input */}
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            fullWidth
            label="Experience (Years)"
            name="requiredExperience"
            type="number"
            value={filters.requiredExperience}
            onChange={handleChange}
          />
        </Grid>

        {/* Skills Dropdown */}
        <Grid item xs={12} sm={6} md={4}>
          <FormControl fullWidth>
            <InputLabel>Skills(select multiple)</InputLabel>
            <Select name="skillsRequired" value={filters.skillsRequired} onChange={handleSkillsChange}
            multiple
            renderValue={(selected) => Array.isArray(selected) ? selected.join(", ") : selected}
            >
              <MenuItem onClick={handleClearSkills} style={{ color: "red" }}>Clear All
              </MenuItem>
              {skills.map((skill) => (
                <MenuItem key={skill} value={skill}>{skill}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      <Button variant="contained" color="primary" onClick={handleSearch} style={{ marginTop: "20px" }}>
        Search
      </Button>

      {/* Display Jobs */}
      <div style={{ marginTop: "20px" }}>
        {loading ? (
          <p>Loading...</p>
        ) : (
          jobs.map((job) => (
            <Card key={job.id} style={{ marginBottom: "15px" }}>
              <CardContent>
                <Typography variant="h6">{job.title}</Typography>
                <Typography variant="body2">{job.location}</Typography>
                <Typography variant="body2">Experience Required: {job.requiredExperience} years</Typography>
                <Typography variant="body2">Skills: {job.skillsRequired.join(", ")}</Typography>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default SearchJobs;
