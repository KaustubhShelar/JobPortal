package dev.kaustubh.net.job_portal.controller;

import co.elastic.clients.elasticsearch.nodes.Http;
import dev.kaustubh.net.job_portal.model.Application;
import dev.kaustubh.net.job_portal.model.Job;
import dev.kaustubh.net.job_portal.model.User;
import dev.kaustubh.net.job_portal.service.ApplicationService;
import dev.kaustubh.net.job_portal.service.JobService;
import dev.kaustubh.net.job_portal.service.UserService;
import dev.kaustubh.net.job_portal.util.JwtUtil;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/applications")
public class ApplicationController {
    @Autowired
    private ApplicationService applicationService;
    @Autowired
    private JobService jobService;
    @Autowired
    private UserService userService;
    @Autowired
    private JwtUtil jwtUtil;

    @GetMapping("")
    public ResponseEntity<List<Application>> getAllApplications(){
        return ResponseEntity.ok(applicationService.allApplications());
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<Application>> getApplicationById(@PathVariable String userId){
       return ResponseEntity.ok(applicationService.applicationByUserId(userId));
    }

    private double calculateRankScore(User user, Job job, Application application){
        double matchingSkills = user.getSkills().stream()
                .filter(skill -> job.getSkillsRequired().contains(skill))
                .count();

        double skillsScore = ((matchingSkills / job.getSkillsRequired().size()) * 100);

        double experienceScore = (((double) application.getExperience() / job.getRequiredExperience()) * 100);
        experienceScore = Math.min(experienceScore, 100);

        double educationScore = application.getEducation().equals(job.getRequiredEducation()) ? 100 : 50;

        return (skillsScore * 0.5) + (experienceScore * 0.3) + (experienceScore * 0.2);
    }

    @PostMapping("/create")
    public ResponseEntity<?> createApplication(@RequestBody Application application, HttpServletRequest request){
        try {
            Job job = jobService.jobById(application.getJobId());
            if(job == null){
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Job Not Found!");
            }

            String authorizationHeader = request.getHeader("Authorization");
            if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Authorization token is missing or invalid.");
            }
            String token = authorizationHeader.substring(7);
            String email = jwtUtil.extractEmail(token);
            User user = userService.userByEmail(email);
            if(user == null){
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User Not Found!");
            }

            double rankScore = calculateRankScore(user, job, application);

            Application savedApplication = applicationService.createApplication(application, email, rankScore);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedApplication);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PatchMapping("/{id}/{status}")
    public ResponseEntity<?> updateStatus(@PathVariable String id, @PathVariable String status){
        try {
            Application application = applicationService.applicationById(id);
            application = applicationService.updateApplicationStatus(application, status);

            return ResponseEntity.status(HttpStatus.OK).body(application);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}
