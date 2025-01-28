package dev.kaustubh.net.job_portal.service;

import dev.kaustubh.net.job_portal.model.Job;
import dev.kaustubh.net.job_portal.model.User;
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

    public Job updateJob(String id, Job jobUpdates) {
        Job existingJob = jobRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Job not found"));

        if (jobUpdates.getTitle() != null) {
            existingJob.setTitle(jobUpdates.getTitle());
        }
        if (jobUpdates.getDescription() != null) {
            existingJob.setDescription(jobUpdates.getDescription());
        }
        if (jobUpdates.getLocation() != null) {
            existingJob.setLocation(jobUpdates.getLocation());
        }
        if (jobUpdates.getSalary() != 0) {
            existingJob.setSalary(jobUpdates.getSalary());
        }
        if (jobUpdates.getSkillsRequired() != null) {
            List<String> existingSkills = existingJob.getSkillsRequired();
            if(existingSkills != null){
                jobUpdates.getSkillsRequired().forEach(skill -> {
                    if (!existingSkills.contains(skill)) {
                        existingSkills.add(skill);
                    }
                });
            }else {
                existingJob.setSkillsRequired(jobUpdates.getSkillsRequired());
            }
        }
        if (jobUpdates.getEmployerId() != null) {
            existingJob.setEmployerId(jobUpdates.getEmployerId());
        }
        if (jobUpdates.getRequiredExperience() != 0) {
            existingJob.setRequiredExperience(jobUpdates.getRequiredExperience());
        }
        if (jobUpdates.getRequiredEducation() != null) {
            existingJob.setRequiredEducation(jobUpdates.getRequiredEducation());
        }

        return jobRepository.save(existingJob);
    }
}
