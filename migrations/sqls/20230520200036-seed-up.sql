CREATE TABLE Users(
    id INT auto_increment PRIMARY KEY,
    user_first_name VARCHAR(50) NOT NULL,
    user_last_name VARCHAR(100) NOT NULL,
    user_email VARCHAR(50) NOT NULL,
    user_password VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE Trainings(
    id INT auto_increment PRIMARY KEY,
    training_title VARCHAR(255) NOT NULL,
    training_start_date DATE,
    training_end_date DATE,
    training_start_time TIME,
    training_end_time TIME,
    training_language VARCHAR(50) NOT NULL,
    training_description TEXT,
    training_level VARCHAR(20) NOT NULL,
    training_category VARCHAR(255) NOT NULL,
    training_location VARCHAR(100) NOT NULL,
    trainer_id INT NOT NULL,
    trainer TEXT,
    training_icon TEXT,
    FOREIGN KEY (trainer_id) REFERENCES Users(id)
);

CREATE TABLE User_trainings(
    id INT auto_increment PRIMARY KEY, 
    trainer_id INT NOT NULL,
    training_id INT NOT NULL,
    user_email TEXT,
    FOREIGN KEY (trainer_id) REFERENCES Users(id),
    FOREIGN KEY (training_id) REFERENCES Trainings(id)
);