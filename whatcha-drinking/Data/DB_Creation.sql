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
  [id] int PRIMARY KEY,
  [password] nvarchar(255),
  [username] nvarchar(255),
  [firstName] nvarchar(255),
  [lastName] nvarchar(255),
  [address] nvarchar(255),
  [profilePic] nvarchar(255)
)
GO

CREATE TABLE [friendJoin] (
  [id] int PRIMARY KEY,
  [userId] int,
  [friendId] int,
  [isApproved] bit
)
GO

CREATE TABLE [alcohol] (
  [id] int PRIMARY KEY,
  [name] nvarchar(255),
  [alcoholTypeId] int,
  [picture] nvarchar (255)
)
GO

CREATE TABLE [alcoholType] (
  [id] int PRIMARY KEY,
  [type] nvarchar(255),
  [picture] nvarchar(255)
)
GO

CREATE TABLE [preferredDrink] (
  [id] int,
  [userId] int,
  [alcoholTypeId] int
)
GO

CREATE TABLE [userDrinks] (
  [id] int,
  [userId] int,
  [alcoholId] int,
  [dateTime] dateTime
)
GO

CREATE TABLE [drinkQueue] (
  [id] int,
  [userId] int,
  [alcoholId] int,
  [displayWeight] double precision
  )
GO

CREATE TABLE [recommendedDrink] (
  [id] int,
  [userId] int,
  [friendId] int,
  [alcoholId] int
)
GO

CREATE TABLE [post] (
  [id] int,
  [userId] int,
  [alcoholId] int,
  [dateTime] dateTime,
  [picture] nvarchar(255),
  [message] nvarchar(255)
)
GO

CREATE TABLE [message] (
  [id] int,
  [userId] int,
  [friendId] int,
  [message] nvarchar(255)
)
GO

CREATE TABLE [review] (
  [id] int,
  [userId] int,
  [alcoholId] int,
  [score] int
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

