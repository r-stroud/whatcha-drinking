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
DROP TABLE IF EXISTS [drink]
DROP TABLE IF EXISTS [drinkType]


CREATE TABLE [user] (
  [id] int PRIMARY KEY IDENTITY NOT NULL,
  [firebaseId] nvarchar(255) NOT NULL,
  [email] nvarchar(255) NOT NULL,
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

CREATE TABLE [drink] (
  [id] int PRIMARY KEY IDENTITY NOT NULL,
  [name] nvarchar(255) NOT NULL,
  [drinkTypeId] int NOT NULL,
  [picture] nvarchar (255)
)
GO

CREATE TABLE [drinkType] (
  [id] int PRIMARY KEY IDENTITY NOT NULL,
  [type] nvarchar(255) NOT NULL,
  [picture] nvarchar(255)
)
GO

CREATE TABLE [preferredDrink] (
  [id] int IDENTITY NOT NULL,
  [userId] int NOT NULL,
  [drinkTypeId] int NOT NULL
)
GO

CREATE TABLE [userDrinks] (
  [id] int IDENTITY NOT NULL,
  [userId] int NOT NULL,
  [drinkId] int NOT NULL,
  [dateTime] dateTime NOT NULL
)
GO

CREATE TABLE [drinkQueue] (
  [id] int IDENTITY NOT NULL,
  [userId] int NOT NULL,
  [drinkId] int NOT NULL,
  [displayWeight] double precision
  )
GO

CREATE TABLE [recommendedDrink] (
  [id] int IDENTITY NOT NULL,
  [userId] int NOT NULL,
  [friendId] int NOT NULL,
  [drinkId] int NOT NULL
)
GO

CREATE TABLE [post] (
  [id] int IDENTITY NOT NULL,
  [userId] int NOT NULL,
  [drinkId] int NOT NULL,
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
  [drinkId] int NOT NULL,
  [score] int NOT NULL
)
GO

ALTER TABLE [friendJoin] ADD FOREIGN KEY ([userId]) REFERENCES [user] ([id])
GO

ALTER TABLE [friendJoin] ADD FOREIGN KEY ([friendId]) REFERENCES [user] ([id])
GO

ALTER TABLE [drink] ADD FOREIGN KEY ([drinkTypeId]) REFERENCES [drinkType] ([id])
GO

ALTER TABLE [preferredDrink] ADD FOREIGN KEY ([userId]) REFERENCES [user] ([id])
GO

ALTER TABLE [preferredDrink] ADD FOREIGN KEY ([drinkTypeId]) REFERENCES [drinkType] ([id])
GO

ALTER TABLE [userDrinks] ADD FOREIGN KEY ([userId]) REFERENCES [user] ([id])
GO

ALTER TABLE [userDrinks] ADD FOREIGN KEY ([drinkId]) REFERENCES [drink] ([id])
GO

ALTER TABLE [drinkQueue] ADD FOREIGN KEY ([userId]) REFERENCES [user] ([id])
GO

ALTER TABLE [drinkQueue] ADD FOREIGN KEY ([drinkId]) REFERENCES [drink] ([id])
GO

ALTER TABLE [recommendedDrink] ADD FOREIGN KEY ([userId]) REFERENCES [user] ([id])
GO

ALTER TABLE [recommendedDrink] ADD FOREIGN KEY ([drinkId]) REFERENCES [drink] ([id])
GO

ALTER TABLE [recommendedDrink] ADD FOREIGN KEY ([friendId]) REFERENCES [user] ([id])
GO

ALTER TABLE [post] ADD FOREIGN KEY ([userId]) REFERENCES [user] ([id])
GO

ALTER TABLE [post] ADD FOREIGN KEY ([drinkId]) REFERENCES [drink] ([id])
GO

ALTER TABLE [message] ADD FOREIGN KEY ([userId]) REFERENCES [user] ([id])
GO

ALTER TABLE [message] ADD FOREIGN KEY ([friendId]) REFERENCES [user] ([id])
GO

ALTER TABLE [review] ADD FOREIGN KEY ([userId]) REFERENCES [user] ([id])
GO

ALTER TABLE [review] ADD FOREIGN KEY ([drinkId]) REFERENCES [drink] ([id])
GO

SET IDENTITY_INSERT [drinkType] ON
INSERT INTO [drinkType]
([id],[type],[picture])
VALUES
(1, 'Vodka', ''),
(2, 'Tequila', ''),
(3, 'Bourbon', ''),
(4, 'Scotch', ''),
(5, 'Rum', ''),
(6, 'Cognac', ''),
(7, 'Other', '')
SET IDENTITY_INSERT [drinkType] OFF

SET IDENTITY_INSERT [drink] ON
INSERT INTO [drink]
([id],[name],[drinkTypeId],[picture])
VALUES
(1, 'Absolut Elyx', 1, ''),
(2, 'Belvedere', 1, ''),
(3, 'Grey Goose',1, ''),
(4, 'Hangar 1',1, ''),
(5, 'Chopin',1, ''),
(6, 'Siete Leguas Reposado',2, ''),
(7, 'Cimarron Blanco Tequila',2, ''),
(8, 'La Gritona Reposado Tequila',2, ''),
(9, 'Volcan De Mi Tierra Cristalino Tequila',2, ''),
(10, 'Casa Dragones Blanco',2, ''),
(11, 'Partida Reposado',2, ''),
(12, 'Elijah Craig Barrel Proof',3, ''),
(13, 'Old Ezra 7-Year-Old',3, ''),
(14, 'Widow Jane 10-Year-Old',3, ''),
(15, 'Four Roses Single Barrel',3, ''),
(16, 'W.L. Weller 12-Year-Old',3, '')
SET IDENTITY_INSERT [drink] OFF




