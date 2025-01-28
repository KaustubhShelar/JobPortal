package dev.kaustubh.net.job_portal.service;

import dev.kaustubh.net.job_portal.model.Application;
import dev.kaustubh.net.job_portal.model.User;
import dev.kaustubh.net.job_portal.repository.ApplicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ApplicationService {
    @Autowired
    private ApplicationRepository applicationRepository;

    public List<Application> allApplications(){
        return applicationRepository.findAll();
    }

    public Application applicationById(String id){
        return applicationRepository.findById(id).orElseThrow(() -> new RuntimeException("Application not found!"));
    }

    public List<Application> applicationByUserId(String userId){
        return applicationRepository.findByUserId(userId).orElseThrow(() -> new RuntimeException("Application not found!"));
    }

    public Application createApplication(Application application, String userId, double rankScore){
        System.out.println("userId: "+ userId + " rankScore: " + rankScore);
        application.setUserId(userId);
        application.setRankScore(rankScore);
        return applicationRepository.save(application);
    }

    public Application updateApplicationStatus(Application application, String status){
        application.setStatus(status);
        return applicationRepository.save(application);
    }
}
