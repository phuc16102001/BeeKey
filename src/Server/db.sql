USE MASTER
DROP DATABASE BEEKEY
GO

CREATE DATABASE BEEKEY
GO
USE BEEKEY

CREATE TABLE ACCOUNT(
	USERNAME VARCHAR(30),
	PASSWORD CHAR(32),
	TYPE INT,
	GENDER BOOLEAN,
	PHONE VARCHAR(12),
	ADDRESS VARCHAR(30),
	COIN INT,
	
	CONSTRAINT PK_ACCOUNT PRIMARY KEY(USERNAME)
)

CREATE TABLE CATEGORY(
	CATEGORY_ID SERIAL,
	CATEGORY_NAME VARCHAR(30),

	CONSTRAINT PK_CATEGORY PRIMARY KEY(CATEGORY_ID)
)

CREATE TABLE TASK(
	TASK_ID SERIAL,
	DESCRIPTION TEXT,
	OFFER INT,
	DEADLINE DATETIME,
	CATEGORY_ID INT,
	LANCER_ID VARCHAR(30),
	USER_ID VARCHAR(30)

	CONSTRAINT PK_TASK PRIMARY KEY(TASK_ID)
)

CREATE TABLE FEEDBACK(
	FEEDBACK_ID SERIAL,
	DESCRIPTION TEXT,
	STAR INT,
	LANCER_ID VARCHAR(30),
	USER_ID VARCHAR(30)
	
	CONSTRAINT PK_FEEDBACK PRIMARY KEY(FEEDBACK_ID)
)

CREATE TABLE SOLUTION(
	SOLUTION_ID SERIAL,
	DESCRIPTION TEXT,
	STATUS BOOLEAN,
	DATE DATETIME,
	LANCER_ID VARCHAR(30),
	TASK_ID INT,

	CONSTRAINT PK_SOLUTION PRIMARY KEY(SOLUTION_ID)
)

CREATE TABLE COUNTER_OFFER(
	TASK_ID INT,
	LANCER_ID VARCHAR(30),
	OFFER INT,
	REASON TEXT,

	CONSTRAINT PK_COUNTER_OFFER PRIMARY KEY(TASK_ID,LANCER_ID)
)

CREATE TABLE CHAT(
	SEND_ID VARCHAR(30),
	RECEIVE_ID VARCHAR(30),
	DATE_TIME DATETIME,
	CONTENT TEXT

	CONSTRAINT PK_CHAT PRIMARY KEY(SEND_ID,RECEIVE_ID,DATE_TIME)
)

CREATE TABLE ATTACH_FILE(
	TASK_ID INT,
	FILE_PATH VARCHAR(500)

	CONSTRAINT PK_ATTACH_FILE PRIMARY KEY(TASK_ID,FILE_PATH)
)

--------------------------------------------------------------------

ALTER TABLE TASK ADD
CONSTRAINT FK_TASK_CATEGORY FOREIGN KEY(CATEGORY_ID) REFERENCES CATEGORY(CATEGORY_ID),
CONSTRAINT FK_TASK_ACCOUNT_1 FOREIGN KEY(LANCER_ID) REFERENCES ACCOUNT(USERNAME),
CONSTRAINT FK_TASK_ACCOUNT_2 FOREIGN KEY(USER_ID) REFERENCES ACCOUNT(USERNAME)

--------------------------------------------------------------------

INSERT INTO ACCOUNT(USERNAME,PASSWORD,TYPE) VALUES
('admin',CONVERT(CHAR(64),HASHBYTES('SHA2_256','admin'),2),1)

INSERT INTO CATEGORY(CATEGORY_NAME) VALUES
('Testing'),
('Mobile application'),
('Desktop application'),
('Web application'),
('Cyber security'),
('Data analysis')