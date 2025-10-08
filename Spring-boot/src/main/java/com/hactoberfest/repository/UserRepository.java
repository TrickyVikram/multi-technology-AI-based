package com.hactoberfest.repository;

import com.hactoberfest.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
	java.util.Optional<User> findByUsername(String username);
}
