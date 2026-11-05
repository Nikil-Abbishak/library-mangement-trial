package com.library.management;

import java.sql.Connection;
import javax.sql.DataSource;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class LibraryManagementApplication {

    public static void main(String[] args) {
        SpringApplication.run(LibraryManagementApplication.class, args);
    }

    @Bean
    public CommandLineRunner databaseConnectionCheck(DataSource dataSource) {
        return args -> {
            try (Connection connection = dataSource.getConnection()) {
                System.out.println("=================================================");
                System.out.println("  SUCCESS: Connected to Supabase PostgreSQL!");
                System.out.println("  Database Name   : " + connection.getCatalog());
                System.out.println("  PostgreSQL Ver. : " + connection.getMetaData().getDatabaseProductVersion());
                System.out.println("=================================================");
            } catch (Exception e) {
                System.err.println("=================================================");
                System.err.println("  FAILED to connect to Supabase: " + e.getMessage());
                System.err.println("=================================================");
                throw e;
            }
        };
    }
}
