import axios from "axios";

export const getApplications = async (userId) => {
    console.log("userID " + userId);
    return await axios.get(`http://localhost:8080/api/applications?userId=${userId}`);
};
  
// export const getJobById = async (jobId) => {
//     return await axios.get(`http://localhost:8080/api/jobs/${jobId}`);
// };