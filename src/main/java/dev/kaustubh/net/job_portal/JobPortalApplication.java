package dev.kaustubh.net.job_portal;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class})
@RestController
public class JobPortalApplication {

	public static void main(String[] args) {
		SpringApplication.run(JobPortalApplication.class, args);
	}

	@GetMapping("/home")
	public String getRoot(){

		BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
		String hash = "$2a$10$R9HTTKjjP39N0oA6F9W6LudQxpAOoIHJ3mof7KxiN7iWhp9MLfTMq";
		String plainPassword = "kaustubh88";
//		System.out.println("plainPassword: " + plainPassword);
		System.out.println("Password matches: " + encoder.matches(plainPassword, hash));

		return "This is a Job Portal!.";
	}


}
