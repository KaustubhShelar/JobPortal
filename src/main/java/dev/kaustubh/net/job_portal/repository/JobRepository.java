package dev.kaustubh.net.job_portal.repository;

import dev.kaustubh.net.job_portal.model.Job;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobRepository extends MongoRepository<Job, String> {
    List<Job> findByEmployerId(String employerId);
//    List<Job> findBySkillsRequiredContaining(String skill);
}
