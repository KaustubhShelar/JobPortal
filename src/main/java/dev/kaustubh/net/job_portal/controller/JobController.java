package dev.kaustubh.net.job_portal.controller;

import dev.kaustubh.net.job_portal.model.Job;
import dev.kaustubh.net.job_portal.model.User;
import dev.kaustubh.net.job_portal.service.JobService;
import dev.kaustubh.net.job_portal.service.UserService;
import dev.kaustubh.net.job_portal.util.JwtUtil;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/jobs")
public class JobController {

    @Autowired
    private JobService jobService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserService userService;

    @GetMapping("")
    public ResponseEntity<List<Job>> getAllJobs(){
        return ResponseEntity.ok(jobService.allJobs());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Job> getJobById(@PathVariable String id){
        return ResponseEntity.ok(jobService.jobById(id));
    }

    @GetMapping("/employer/{employerId}")
    public ResponseEntity<List<Job>> getJobByEmployerId(@PathVariable String employerId){
        return ResponseEntity.ok(jobService.jobByEmployerId(employerId));
    }

    @PostMapping("/create")
    public ResponseEntity<?> createJob(@RequestBody Job job, HttpServletRequest request) {
        try {
            // Extract JWT token from the Authorization header
            String authorizationHeader = request.getHeader("Authorization");
            if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Authorization token is missing or invalid.");
            }

            String token = authorizationHeader.substring(7);
            String email = jwtUtil.extractEmail(token);

            // Verify if the user exists and is valid
            userService.userByEmail(email); // Throws exception if not found
            job.setEmployerId(email); // Set employerId as the current user's email

            Job savedJob = jobService.createJob(job);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedJob);
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
        }
    }

    @PatchMapping("/{id}")
    public ResponseEntity<?> updateJob(@PathVariable String id, @RequestBody Job jobUpdates) {
        try {
            Job updatedJob = jobService.updateJob(id, jobUpdates);
            return ResponseEntity.ok().body(updatedJob);
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
        }
    }

//    @GetMapping("/{skill}")
//    public ResponseEntity<List<Job>> getJobBySkill(@PathVariable String skill){
//        return ResponseEntity.ok(jobService.jobBySkill(skill));
//    }

}
