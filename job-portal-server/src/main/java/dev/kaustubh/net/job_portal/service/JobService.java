package dev.kaustubh.net.job_portal.service;

import dev.kaustubh.net.job_portal.model.Application;
import dev.kaustubh.net.job_portal.model.Job;
import dev.kaustubh.net.job_portal.model.User;
import dev.kaustubh.net.job_portal.repository.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JobService {
    @Autowired
    private JobRepository jobRepository;
    @Autowired
    private MongoTemplate mongoTemplate;

    public List<Job> getJobsByFilter(String title,String location,Double salary,String requiredEducation,Integer requiredExperience){
        Query query = new Query();
        if(title != null && !title.isEmpty()){
            query.addCriteria(Criteria.where("title").is(title));
        }
        if (location != null && !location.isEmpty()) {
            query.addCriteria(Criteria.where("location").is(location));
        }
        if (salary != null) {
            query.addCriteria(Criteria.where("salary").is(salary));
        }
        if (requiredEducation != null && !requiredEducation.isEmpty()) {
            query.addCriteria(Criteria.where("requiredEducation").is(requiredEducation));
        }
        if (requiredExperience != null) {
            query.addCriteria(Criteria.where("requiredExperience").is(requiredExperience));
        }
        return mongoTemplate.find(query, Job.class);
    }

    public Job jobById(String id){
        return jobRepository.findById(id).orElseThrow(() -> new RuntimeException("Job not found!"));
    }

    public List<Job> jobByEmployerId(String employerId){
        return jobRepository.findByEmployerId(employerId);
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
