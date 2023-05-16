CREATE TABLE Users(
    id INT auto_increment PRIMARY KEY,
    user_first_name VARCHAR(50) NOT NULL,
    user_last_name VARCHAR(100) NOT NULL,
    user_email VARCHAR(50) NOT NULL,
    user_password VARCHAR(20) NOT NULL UNIQUE
);

--@block
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
    FOREIGN KEY (trainer_id) REFERENCES Users(id)
);

--@block
ALTER TABLE Trainings ADD COLUMN training_icon TEXT

--@block
CREATE TABLE User_trainings(
    id INT auto_increment PRIMARY KEY, 
    trainer_id INT NOT NULL,
    training_id INT NOT NULL,
    FOREIGN KEY (trainer_id) REFERENCES Users(id),
    FOREIGN KEY (training_id) REFERENCES Trainings(id)
);

--@block
INSERT INTO Users (user_first_name, user_last_name, user_email, user_password) VALUES ('Captain', 'Price', 'captain123@interia.eu', 'encrypted12345%');

INSERT INTO Users (user_first_name, user_last_name, user_email, user_password) VALUES ('Ghost', 'Riley', 'ghost123@wp.pl', 'IlovePancakes&');

INSERT INTO Users (user_first_name, user_last_name, user_email, user_password) VALUES ('James', 'Cook', 'Cookaustralia1770@gmail.com', 'SpeedMyBoat997')

--@block
INSERT INTO Trainings (  
    training_title,
    training_start_date,
    training_end_date,
    training_start_time,
    training_end_time,
    training_language,
    training_description,
    training_level,
    training_category,
    training_location,
    trainer_id,
    training_icon) VALUES (
        'Chess short course', '2023-06-1', '2023-07-01', '12:00', '16:00', 'english', 'This fantastic chess course teach you the basics of playing chess', 'beginner', 'popular', 'remote', 2, './icons/chess.jpg'
    );

    INSERT INTO Trainings (
    training_title,
    training_start_date,
    training_end_date,
    training_start_time,
    training_end_time,
    training_language,
    training_description,
    training_level,
    training_category,
    training_location,
    trainer_id,
    training_icon) VALUES (
        'Python programming with Price', '2023-07-15', '2023-10-15', '8:00', '17:00', 'polish', 'Learn python programming best techniques', 'advanced', 'Data science', 'remote', 1, './icons/python-techniques.jpg'
    );

--@block

INSERT INTO User_trainings(trainer_id, training_id) VALUES (2, 1) 

--@block
SELECT * FROM Users

--@block
ALTER TABLE Users MODIFY COLUMN user_password VARCHAR (255) NOT NULL