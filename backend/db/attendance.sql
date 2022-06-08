CREATE DATABASE IF NOT EXISTS dbAttendance;
USE dbAttendance;

DROP TABLE IF EXISTS Follow_ups;
DROP TABLE IF EXISTS Attendance_records;
DROP TABLE IF EXISTS Students;
DROP TABLE IF EXISTS Assignments;
DROP TABLE IF EXISTS Users;

CREATE TABLE Students (
    student_id varchar(7) PRIMARY KEY NOT NULL,
    first_name varchar(255) NOT NULL,
    last_name varchar(255) NOT NULL,
    photo_path varchar(255) NOT NULL
);

CREATE TABLE Assignments(
    assignment_id int PRIMARY KEY NOT NULL,
    course_id int
);

CREATE TABLE Users(
    user_id int AUTO_INCREMENT PRIMARY KEY NOT NULL,
    canvas_token varchar(255) NOT NULL,
    username varchar(255) NOT NULL,
    first_name varchar(255) NOT NULL,
    last_name varchar(255) NOT NULL,
    password_hash varchar(255) NOT NULL
);

CREATE TABLE Attendance_records(
    attendance_id int AUTO_INCREMENT PRIMARY KEY NOT NULL,
    time_stamp datetime,
    assignment_id int NOT NULL,
    student_id varchar(7) NOT NULL,
    user_id int NOT NULL,
    FOREIGN KEY (assignment_id) REFERENCES Assignments(assignment_id),
    FOREIGN KEY (student_id) REFERENCES Students(student_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TABLE Follow_ups(
    follow_up_id int AUTO_INCREMENT PRIMARY KEY NOT NULL,
    unverified_student_id varchar(7),
    first_name varchar(255) NOT NULL,
    last_name varchar(255) NOT NULL,
    path_to_image varchar(255) NOT NULL,
    time_stamp datetime,
    assignment_id int NOT NULL,
    user_id int NOT NULL,
    FOREIGN KEY (assignment_id) REFERENCES Assignments(assignment_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

INSERT INTO `Assignments` VALUES (280470, 77766);

INSERT INTO `Students` VALUES ('1799828', 'Rowan', 'Fimmano', 'https://www.influencive.com/wp-content/uploads/2021/01/31DF93AD-9D52-4637-8889-B0370B41F542-758x544.jpeg');
INSERT INTO `Students` VALUES ('1813368 ', 'Javad', 'Hamidi', 'https://www.influencive.com/wp-content/uploads/2021/01/31DF93AD-9D52-4637-8889-B0370B41F542-758x544.jpeg');
INSERT INTO `Students` VALUES ('1827437', 'Mitchell', 'Kempen', 'https://www.influencive.com/wp-content/uploads/2021/01/31DF93AD-9D52-4637-8889-B0370B41F542-758x544.jpeg');
INSERT INTO `Students` VALUES ('1800380', 'Zhaohan', 'Lie', 'https://www.influencive.com/wp-content/uploads/2021/01/31DF93AD-9D52-4637-8889-B0370B41F542-758x544.jpeg');
