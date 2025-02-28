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
VALUES (1,'11d03c77895b0bd739efc2ae2a05d469143af7ceb124648ba94bc9103a616382', '9a0f37cc4a18adffb7bc8b7897aa727fe4779fcad8764417aa0285705d4f667b', 'Dmitry', 'Bondarev', 'bondareff.dmitry@mail.ru', '0x28fF6c3b3427EB2E0e1eD25e512f3201074EA426');
INSERT INTO Accounts (acc, id, balance, acctype) 
VALUES (1, 1, 1000.00, 'Checking');
INSERT INTO Transactions (transid, acc, transdate, transvalue) 
VALUES (1, 1, '2025-01-01', -1000.00);
