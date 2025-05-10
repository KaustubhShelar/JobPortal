import axios from "axios";

export const getJobs = async () => {
    return await axios.get("http://localhost:8080/api/jobs");
};
  
export const getJobById = async (jobId) => {
    return await axios.get(`http://localhost:8080/api/jobs/${jobId}`);
};