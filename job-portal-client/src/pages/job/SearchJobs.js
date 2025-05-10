import React, { useState, useEffect } from "react";
import { TextField, Button, Grid, Autocomplete, Card, CardContent, Typography, CircularProgress } from "@mui/material";
import axios from "axios";
import Navbar from "../../components/Navbar"

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
  const [skillsLoading, setSkillsLoading] = useState(false);
  const [locationsLoading, setLocationsLoading] = useState(false);
  const [searchLocation, setSearchLocation] = useState("");
  const [searchSkill, setSearchSkill] = useState("");

  // Fetch locations dynamically based on input
  useEffect(() => {
    if (!searchLocation.trim()) {
      setLocations([]); // Clear suggestions if input is empty
      return;
    }

    const timeoutId = setTimeout(async () => {
      try {
        setLocationsLoading(true);
        const response = await axios.get(`http://localhost:8080/api/jobs/locations?query=${searchLocation}`);
        console.log(response.data);
        setLocations(response.data);
      } catch (error) {
        console.error("Error fetching locations", error);
      } finally {
        setLocationsLoading(false);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchLocation]);

  // Fetch skills dynamically based on input
  useEffect(() => {
    if (!searchSkill.trim()) {
      setSkills([]); // Clear suggestions if input is empty
      return;
    }

    const timeoutId = setTimeout(async () => {
      try {
        setSkillsLoading(true);
        const response = await axios.get(`http://localhost:8080/api/jobs/skills?query=${searchSkill}`);
        setSkills(response.data);
      } catch (error) {
        console.error("Error fetching skills", error);
      } finally {
        setSkillsLoading(false);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchSkill]);

  const handleLocationChange = (event, newValue) => {
    setSearchLocation(newValue || ""); // Update search term
    setFilters({ ...filters, location: newValue || "" });

    // **Clear the dropdown options after selection**
    setTimeout(() => {
      setLocations([]);
    }, 100); 
  };

  const handleSkillsChange = (event, newValue) => {
    setSearchSkill(""); // Clear search term
    setFilters({ ...filters, skillsRequired: newValue || [] });

    // **Clear the dropdown options after selection**
    setTimeout(() => {
      setSkills([]);
    }, 100);
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8080/api/jobs", {
        params: {
          ...filters,
          skillsRequired: filters.skillsRequired.join(","),
        },
      });
      setJobs(response.data);
    } catch (error) {
      console.error("Error fetching jobs", error);
    }
    setLoading(false);
  };

  return (
    <div>
    <Navbar />
    <div style={{ padding: "20px" }}>   
      <h2>Search Jobs</h2>

      <Grid container spacing={2}>
        {/* Location Search */}
        <Grid item xs={12} sm={6} md={4}>
          <Autocomplete
            options={locations}
            value={filters.location}
            onInputChange={(event, newValue) => {
              setSearchLocation(newValue || ""); // Update search term
              if (!newValue) {
                setLocations([]); // Clear options when input is empty
              }
            }}
            onChange={handleLocationChange}
            freeSolo
            loading={locationsLoading}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search Location"
                placeholder="Start typing..."
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {locationsLoading ? <CircularProgress color="inherit" size={20} /> : null}
                      {params.InputProps.endAdornment}
                    </>
                  ),
                }}
              />
            )}
          />
        </Grid>

        {/* Experience Input */}
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            fullWidth
            label="Experience (Years)"
            name="requiredExperience"
            type="number"
            value={filters.requiredExperience}
            onChange={(e) => setFilters({ ...filters, requiredExperience: e.target.value })}
          />
        </Grid>

        {/* Skills Search */}
        <Grid item xs={12} sm={6} md={4}>
          <Autocomplete
            multiple
            options={skills}
            value={filters.skillsRequired}
            onInputChange={(event, newValue) => setSearchSkill(newValue || "")}
            onChange={handleSkillsChange}
            freeSolo
            loading={skillsLoading}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search Skills"
                placeholder="Start typing..."
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {skillsLoading ? <CircularProgress color="inherit" size={20} /> : null}
                      {params.InputProps.endAdornment}
                    </>
                  ),
                }}
              />
            )}
          />
        </Grid>
      </Grid>

      <Button variant="contained" color="primary" onClick={handleSearch} style={{ marginTop: "20px" }}>
        Search
      </Button>

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
    </div>
  );
};

export default SearchJobs;
