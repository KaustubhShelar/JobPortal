package dev.kaustubh.net.job_portal.controller;

import dev.kaustubh.net.job_portal.model.Application;
import dev.kaustubh.net.job_portal.repository.ApplicationRepository;
import dev.kaustubh.net.job_portal.service.ApplicationService;
import dev.kaustubh.net.job_portal.service.JobService;
import dev.kaustubh.net.job_portal.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/admin")
public class AdminController {
    @Autowired
    private UserService userService;
    @Autowired
    private JobService jobService;
    @Autowired
    private ApplicationService applicationService;

    @DeleteMapping("/jobs/{id}")
    public ResponseEntity<?> deleteJob(@PathVariable String id){
        try{
            jobService.deleteJob(id);
            if(!applicationService.applicationByJobId(id).isEmpty()){
                List<Application> applicationList = applicationService.applicationByJobId(id);
                for(Application application : applicationList){
                    applicationService.deleteApplication(application.getId());
                    System.out.println("Delete application successful. id = " + application.getId());
                }
            }
            return ResponseEntity.status(HttpStatus.OK).body("Job with ID " + id + " has been deleted " +
                    "along with all the related applications.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

}
