package dev.kaustubh.net.job_portal.repository;

import dev.kaustubh.net.job_portal.model.Application;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ApplicationRepository extends MongoRepository<Application, String> {
    Optional<List<Application>> findByUserId(String userId);
    Optional<List<Application>> findByJobId(String jobId);
    Optional<List<Application>> findByStatus(String status);
}
