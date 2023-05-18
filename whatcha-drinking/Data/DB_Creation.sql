USE [master]
GO

IF db_id('WhatchaDrinking') IS NULL
CREATE DATABASE [WhatchaDrinking]

GO
USE [WhatchaDrinking]
GO


DROP TABLE IF EXISTS [recommendedDrink]
DROP TABLE IF EXISTS [friendJoin]
DROP TABLE IF EXISTS [message]
DROP TABLE IF EXISTS [drinkQueue]
DROP TABLE IF EXISTS [preferredDrink]
DROP TABLE IF EXISTS [review]
DROP TABLE IF EXISTS [userDrinks]
DROP TABLE IF EXISTS [post]
DROP TABLE IF EXISTS [user]
DROP TABLE IF EXISTS [alcohol]
DROP TABLE IF EXISTS [alcoholType]


CREATE TABLE [user] (
  [firebaseId] int PRIMARY KEY NOT NULL,
  [username] nvarchar(255),
  [firstName] nvarchar(255),
  [lastName] nvarchar(255),
  [address] nvarchar(255),
  [profilePic] nvarchar(255)
)
GO

CREATE TABLE [friendJoin] (
  [id] int PRIMARY KEY IDENTITY NOT NULL,
  [userId] int NOT NULL,
  [friendId] int NOT NULL,
  [isApproved] bit
)
GO

CREATE TABLE [alcohol] (
  [id] int PRIMARY KEY IDENTITY NOT NULL,
  [name] nvarchar(255) NOT NULL,
  [alcoholTypeId] int NOT NULL,
  [picture] nvarchar (255)
)
GO

CREATE TABLE [alcoholType] (
  [id] int PRIMARY KEY IDENTITY NOT NULL,
  [type] nvarchar(255) NOT NULL,
  [picture] nvarchar(255)
)
GO

CREATE TABLE [preferredDrink] (
  [id] int IDENTITY NOT NULL,
  [userId] int NOT NULL,
  [alcoholTypeId] int NOT NULL
)
GO

CREATE TABLE [userDrinks] (
  [id] int IDENTITY NOT NULL,
  [userId] int NOT NULL,
  [alcoholId] int NOT NULL,
  [dateTime] dateTime NOT NULL
)
GO

CREATE TABLE [drinkQueue] (
  [id] int IDENTITY NOT NULL,
  [userId] int NOT NULL,
  [alcoholId] int NOT NULL,
  [displayWeight] double precision
  )
GO

CREATE TABLE [recommendedDrink] (
  [id] int IDENTITY NOT NULL,
  [userId] int NOT NULL,
  [friendId] int NOT NULL,
  [alcoholId] int NOT NULL
)
GO

CREATE TABLE [post] (
  [id] int IDENTITY NOT NULL,
  [userId] int NOT NULL,
  [alcoholId] int NOT NULL,
  [dateTime] dateTime NOT NULL,
  [picture] nvarchar(255),
  [message] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [message] (
  [id] int IDENTITY NOT NULL,
  [userId] int NOT NULL,
  [friendId] int NOT NULL,
  [message] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [review] (
  [id] int IDENTITY NOT NULL,
  [userId] int NOT NULL,
  [alcoholId] int NOT NULL,
  [score] int NOT NULL
)
GO

ALTER TABLE [friendJoin] ADD FOREIGN KEY ([userId]) REFERENCES [user] ([id])
GO

ALTER TABLE [friendJoin] ADD FOREIGN KEY ([friendId]) REFERENCES [user] ([id])
GO

ALTER TABLE [alcohol] ADD FOREIGN KEY ([alcoholTypeId]) REFERENCES [alcoholType] ([id])
GO

ALTER TABLE [preferredDrink] ADD FOREIGN KEY ([userId]) REFERENCES [user] ([id])
GO

ALTER TABLE [preferredDrink] ADD FOREIGN KEY ([alcoholTypeId]) REFERENCES [alcoholType] ([id])
GO

ALTER TABLE [userDrinks] ADD FOREIGN KEY ([userId]) REFERENCES [user] ([id])
GO

ALTER TABLE [userDrinks] ADD FOREIGN KEY ([alcoholId]) REFERENCES [alcohol] ([id])
GO

ALTER TABLE [drinkQueue] ADD FOREIGN KEY ([userId]) REFERENCES [user] ([id])
GO

ALTER TABLE [drinkQueue] ADD FOREIGN KEY ([alcoholId]) REFERENCES [alcohol] ([id])
GO

ALTER TABLE [recommendedDrink] ADD FOREIGN KEY ([userId]) REFERENCES [user] ([id])
GO

ALTER TABLE [recommendedDrink] ADD FOREIGN KEY ([alcoholId]) REFERENCES [alcohol] ([id])
GO

ALTER TABLE [recommendedDrink] ADD FOREIGN KEY ([friendId]) REFERENCES [user] ([id])
GO

ALTER TABLE [post] ADD FOREIGN KEY ([userId]) REFERENCES [user] ([id])
GO

ALTER TABLE [post] ADD FOREIGN KEY ([alcoholId]) REFERENCES [alcohol] ([id])
GO

ALTER TABLE [message] ADD FOREIGN KEY ([userId]) REFERENCES [user] ([id])
GO

ALTER TABLE [message] ADD FOREIGN KEY ([friendId]) REFERENCES [user] ([id])
GO

ALTER TABLE [review] ADD FOREIGN KEY ([userId]) REFERENCES [user] ([id])
GO

ALTER TABLE [review] ADD FOREIGN KEY ([alcoholId]) REFERENCES [alcohol] ([id])
GO

--SET IDENTITY_INSERT [user] ON
--INSERT INTO [user]
--([id], [password],[username],[firstName],[LastName],[address],[profilePic])
--VALUES
--(1,'123456','rstroud','Robert','Stroud','123 Example Street, TN 37075', ''),
--(2,'123456','cstroud','Chie','Stroud','123 Example Street, TN 37075', '')
--SET IDENTITY_INSERT [user] OFF

