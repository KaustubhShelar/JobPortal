package dev.kaustubh.net.job_portal.service;

import dev.kaustubh.net.job_portal.model.Job;
import dev.kaustubh.net.job_portal.repository.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JobService {
    @Autowired
    private JobRepository jobRepository;

    public List<Job> allJobs(){
        return jobRepository.findAll();
    }

    public Job jobById(String id){
        return jobRepository.findById(id).orElseThrow(() -> new RuntimeException("Job not found!"));
    }

    public Job createJob(Job job) {
        return jobRepository.save(job);
    }

    public void deleteJob(String id) {
        if (!jobRepository.existsById(id)) {
            throw new RuntimeException("Job with ID " + id + " not found.");
        }
        jobRepository.deleteById(id);
    }
}
