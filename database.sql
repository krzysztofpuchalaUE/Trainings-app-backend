CREATE TABLE Users(
    id INT auto_increment PRIMARY KEY,
    user_first_name VARCHAR(50) NOT NULL,
    user_last_name VARCHAR(100) NOT NULL,
    user_email VARCHAR(50) NOT NULL,
    user_password VARCHAR(20) NOT NULL UNIQUE
);
--@block
SELECT DISTINCT Trainings.training_category FROM Trainings


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
ALTER TABLE Trainings ADD COLUMN trainer TEXT

--@block
DELETE FROM Users;

--@block
DELETE FROM Trainings;

--@block
DELETE FROM User_trainings;

--@block
SELECT id FROM Users WHERE user_email = 'krzysztof.p.rp@gmail.com'

--@block
SELECT user_first_name, user_last_name FROM Users WHERE user_email = 'krzysztof.p.rp@gmail.com'


--@block
ALTER TABLE Trainings ADD COLUMN training_icon TEXT

--@block
ALTER TABLE Trainings DROP COLUMN training_icon

--@block
CREATE TABLE User_trainings(
    id INT auto_increment PRIMARY KEY, 
    trainer_id INT NOT NULL,
    training_id INT NOT NULL,
    FOREIGN KEY (trainer_id) REFERENCES Users(id),
    FOREIGN KEY (training_id) REFERENCES Trainings(id)
);


--@block
ALTER TABLE Trainings ADD COLUMN training_icon TEXT
--@block
ALTER TABLE User_trainings ADD FOREIGN KEY (user_id)REFERENCES Users(id)

--@block
ALTER TABLE User_trainings DROP COLUMN user_email

--@block
SELECT * FROM User_trainings

--@block
SELECT * FROM Trainings

--@block
   SELECT Trainings.id FROM Trainings WHERE Trainings.training_title = 'Chess short course' AND Trainings.training_category = "popular" AND Trainings.trainer_id = 2

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

INSERT INTO User_trainings(trainer_id, training_id, user_email) VALUES (2, 1, 'krzysztof.p.rp@gmail.com') 

--@block
SELECT * FROM Users

--@block
ALTER TABLE Users MODIFY COLUMN user_password VARCHAR (255) NOT NULL

--@block
SELECT user_password FROM Users WHERE user_email = 'kkk.puszek@gmail.com'

--@block
SELECT Trainings.id, Trainings.training_title, Trainings.training_start_date, Trainings.training_end_date, Trainings.training_start_time, Trainings.training_end_time, Trainings.training_language, Trainings.training_description,Trainings.training_level, Trainings.training_category,Trainings.training_location,Trainings.trainer_id,Trainings.training_icon FROM Trainings INNER JOIN User_trainings ON Trainings.trainer_id = User_trainings.trainer_id AND Trainings.id = User_trainings.training_id WHERE User_trainings.user_email = 'krzysztof.p.rp@gmail.com'


--@block

      UPDATE Trainings SET training_title = "trening 1", training_start_date = '2023-06-1', training_end_date = '2023-06-1', training_start_time = '16:00', training_end_time = '16:00', training_language = 'polisj', training_description = "none", training_level = "advanced", training_category = "none",training_location = "dom", trainer = "On", trainer_id = 3, training_icon = 'Cos' WHERE id = 56