package com.example.tasker;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication(scanBasePackages = "com.example.tasker")
@Configuration
@ComponentScan(basePackages = {
        "com.example.tasker.Classes",
        "com.example.tasker.Config",
        "com.example.tasker.Controllers",
        "com.example.tasker.Repository",
        "com.example.tasker.Request",
        "com.example.tasker.Service"
})
public class TaskerApplication {

    public static void main(String[] args) {
        SpringApplication.run(TaskerApplication.class, args);
    }
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**").allowedOrigins("*");
            }
        };
    }
}

