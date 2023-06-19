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
DROP TABLE IF EXISTS [preferenceType]
DROP TABLE IF EXISTS [review]
DROP TABLE IF EXISTS [userDrinks]
DROP TABLE IF EXISTS [post]
DROP TABLE IF EXISTS [user]
DROP TABLE IF EXISTS [drink]
DROP TABLE IF EXISTS [drinkType]


CREATE TABLE [user] (
  [firebaseId] nvarchar(255) PRIMARY KEY NOT NULL,
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
  [userId] nvarchar(255) NOT NULL,
  [friendId] nvarchar(255) NOT NULL,
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
  [id] int PRIMARY KEY IDENTITY NOT NULL,
  [userId] nvarchar(255) NOT NULL,
  [drinkTypeId] int NOT NULL,
  [preferenceTypeId] int NOT NULL
)
GO

CREATE TABLE [preferenceType] (
  [id] int PRIMARY KEY IDENTITY NOT NULL,
  [preferenceType] nvarchar(255) NOT NULL,
)
GO

CREATE TABLE [userDrinks] (
  [id] int IDENTITY NOT NULL,
  [userId] nvarchar(255) NOT NULL,
  [drinkId] int NOT NULL,
  [timesTried] int,
  [dateTime] dateTime NOT NULL
)
GO

CREATE TABLE [drinkQueue] (
  [id] int IDENTITY NOT NULL,
  [userId] nvarchar(255) NOT NULL,
  [drinkId] int NOT NULL,
  [displayWeight] double precision
  )
GO

CREATE TABLE [recommendedDrink] (
  [id] int IDENTITY NOT NULL,
  [userId] nvarchar(255) NOT NULL,
  [friendId] nvarchar(255) NOT NULL,
  [drinkId] int NOT NULL
)
GO

CREATE TABLE [post] (
  [id] int IDENTITY NOT NULL,
  [userId] nvarchar(255) NOT NULL,
  [drinkId] int NOT NULL,
  [dateTime] dateTime NOT NULL,
  [picture] nvarchar(255),
  [message] nvarchar(1000) NOT NULL
)
GO

CREATE TABLE [message] (
  [id] int IDENTITY NOT NULL,
  [userId] nvarchar(255) NOT NULL,
  [friendId] nvarchar(255) NOT NULL,
  [message] nvarchar(255) NOT NULL
)
GO

CREATE TABLE [review] (
  [id] int IDENTITY NOT NULL,
  [userId] nvarchar(255) NOT NULL,
  [drinkId] int NOT NULL,
  [score] int NOT NULL
)
GO

ALTER TABLE [friendJoin] ADD FOREIGN KEY ([userId]) REFERENCES [user] ([firebaseId])
GO

ALTER TABLE [friendJoin] ADD FOREIGN KEY ([friendId]) REFERENCES [user] ([firebaseId])
GO

ALTER TABLE [drink] ADD FOREIGN KEY ([drinkTypeId]) REFERENCES [drinkType] ([id])
GO

ALTER TABLE [preferredDrink] ADD FOREIGN KEY ([userId]) REFERENCES [user] ([firebaseId])
GO

ALTER TABLE [preferredDrink] ADD FOREIGN KEY ([drinkTypeId]) REFERENCES [drinkType] ([id])
GO

ALTER TABLE [preferredDrink] ADD FOREIGN KEY ([preferenceTypeId]) REFERENCES [preferenceType] ([id])
GO

ALTER TABLE [userDrinks] ADD FOREIGN KEY ([userId]) REFERENCES [user] ([firebaseId])
GO

ALTER TABLE [userDrinks] ADD FOREIGN KEY ([drinkId]) REFERENCES [drink] ([id])
GO

ALTER TABLE [drinkQueue] ADD FOREIGN KEY ([userId]) REFERENCES [user] ([firebaseId])
GO

ALTER TABLE [drinkQueue] ADD FOREIGN KEY ([drinkId]) REFERENCES [drink] ([id])
GO

ALTER TABLE [recommendedDrink] ADD FOREIGN KEY ([userId]) REFERENCES [user] ([firebaseId])
GO

ALTER TABLE [recommendedDrink] ADD FOREIGN KEY ([drinkId]) REFERENCES [drink] ([id])
GO

ALTER TABLE [recommendedDrink] ADD FOREIGN KEY ([friendId]) REFERENCES [user] ([firebaseId])
GO

ALTER TABLE [post] ADD FOREIGN KEY ([userId]) REFERENCES [user] ([firebaseId])
GO

ALTER TABLE [post] ADD FOREIGN KEY ([drinkId]) REFERENCES [drink] ([id])
GO

ALTER TABLE [message] ADD FOREIGN KEY ([userId]) REFERENCES [user] ([firebaseId])
GO

ALTER TABLE [message] ADD FOREIGN KEY ([friendId]) REFERENCES [user] ([firebaseId])
GO

ALTER TABLE [review] ADD FOREIGN KEY ([userId]) REFERENCES [user] ([firebaseId])
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
(1, 'Absolut Elyx', 1, 'Absolut'),
(2, 'Belvedere', 1, 'Belvedere'),
(3, 'Grey Goose',1, 'Grey'),
(4, 'Hangar 1',1, 'Hangar'),
(5, 'Chopin',1, 'Chopin'),
(6, 'Siete Leguas Reposado',2, 'Siete'),
(7, 'Cimarron Blanco Tequila',2, 'Cimarron'),
(8, 'La Gritona Reposado Tequila',2, 'Gritona'),
(9, 'Volcan De Mi Tierra Cristalino Tequila',2, 'Volcan'),
(10, 'Casa Dragones Blanco',2, 'Casa'),
(11, 'Partida Reposado',2, 'Patrida'),
(12, 'Elijah Craig Barrel Proof',3, 'Elijah'),
(13, 'Old Ezra 7-Year-Old',3, 'Ezra'),
(14, 'Widow Jane 10-Year-Old',3, 'Widow'),
(15, 'Four Roses Single Barrel',3, 'Four'),
(16, 'W.L. Weller 12-Year-Old',3, 'Weller'),
(17,'Frapin Chateau Fontpinot',6,'Frapin'),
(18,'Bache-Gabrilesen Tre Kors',6,'Bache'),
(19,'Bisquit & Dubouche VSOP',6,'Bisquit'),
(20,'Pierre Ferrand Double Cask Reserve Cognac',6,'Pierre'),
(21,'H by Hine',6,'H'),
(22,'GlenDronach 15 Revival Single Malt Whisky',4,'GlenDronach'),
(23,'Aberfeldy 12 Year Scotch Whisky',4,'Aberfeldy'),
(24,'Bowmore Islay Single Malt Scotch Whisky 15 Year Darkest',4,'Bowmore'),
(25,'Laphroaig Single Malt Scotch Whisky 10 Year Cask Strength',4,'Laphroaig'),
(26,'Talisker Distiller"s Edition',4,'Talisker'),
(27, 'Mount Gay Black Barrel',5,'MountGay'),
(28, 'Ten To One Caribbean White Rum',5,'10to1'),
(29, 'Barcelo Imperial',5,'Barcelo'),
(30, 'Don Q Cristal',5,'DonQ'),
(31, 'Sailor Jerry Spiced Rum',5,'SailorJ'),
(32,'Hakkaisan Tokubetsu Junmai',7,'Hakkaisan'),
(33,'Shichida Junmai',7,'Shichida'),
(34,'Dewazakura Cherry Bouquet Oka Ginjo',7,'Dewazakura')
SET IDENTITY_INSERT [drink] OFF

SET IDENTITY_INSERT [preferenceType] ON
INSERT INTO [preferenceType]
([id], [preferenceType])
VALUES
(0, 'none'),
(1, 'preferred'),
(2, 'never again')
SET IDENTITY_INSERT [preferenceType] OFF




