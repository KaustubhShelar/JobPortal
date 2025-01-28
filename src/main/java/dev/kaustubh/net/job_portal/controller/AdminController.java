package dev.kaustubh.net.job_portal.controller;

import dev.kaustubh.net.job_portal.service.JobService;
import dev.kaustubh.net.job_portal.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin")
public class AdminController {
    @Autowired
    private UserService userService;
    @Autowired
    private JobService jobService;

    @DeleteMapping("/jobs/{id}")
    public ResponseEntity<?> deleteJob(@PathVariable String id){
        try{
            jobService.deleteJob(id);
            return ResponseEntity.status(HttpStatus.OK).body("Job with ID " + id + " has been deleted.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

}
