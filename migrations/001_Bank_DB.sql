/*CREATE SCHEMA SampleBank;
use SampleBank;
*/



#Customer 
CREATE TABLE  Users ( 
id int AUTO_INCREMENT PRIMARY KEY,
passhash VARCHAR(100) NOT NULL,
salt VARCHAR(100) NOT NULL,
fname varchar(50) NOT NULL,
lname varchar(50) NOT NULL,  
email varchar(50) NULL,
wallet varchar(100) NULL); 


#Accounts 
CREATE TABLE  Accounts ( 
acc int AUTO_INCREMENT PRIMARY KEY,
id int NOT NULL,  
balance DECIMAL(9,2) NOT NULL,
acctype varchar(15) NOT NULL,
CHECK (acctype IN ('Checking', 'Credit', 'Savings')),
FOREIGN KEY (id) REFERENCES Users (id)); 


CREATE TABLE  Transactions ( 
transid int AUTO_INCREMENT PRIMARY KEY,
acc int NOT NULL,
transdate date NOT NULL, 
transvalue DECIMAL(9,2) NOT NULL, 
FOREIGN KEY (acc) REFERENCES Accounts (acc));


INSERT INTO Users (id, passhash, salt, fname, lname, email, wallet) 
VALUES (1,'edee29f882543b956620b26d0ee0e7e950399b1c4222f5de05e06425b4c995e9', 'SUPER-S@LT!', 'Dmitry', 'Bondarev', 'bondareff.dmitry@mail.ru', '0x28fF6c3b3427EB2E0e1eD25e512f3201074EA426');
INSERT INTO Accounts (acc, id, balance, acctype) 
VALUES (1, 1, 1000.00, 'Checking');
INSERT INTO Transactions (transid, acc, transdate, transvalue) 
VALUES (1, 1, '2025-01-01', -1000.00);