/*CREATE SCHEMA SampleBank;
use SampleBank;
*/
#UserInfo
CREATE TABLE Loginfo ( 
login VARCHAR(10) NOT NULL,
passhash bigint NOT NULL,
PRIMARY KEY (login));


#Customer 
CREATE TABLE  Users ( 
login varchar(10) NOT NULL,
fname varchar(50) NOT NULL,
lname varchar(50) NOT NULL,  
email varchar(50) NULL,
wallet varchar(100) NULL, 
phone bigint NOT NULL, 
city varchar(50) NOT NULL, 
state varchar(2) NOT NULL, 
zip int NOT NULL, 
street_address varchar(50) NOT NULL, 
PRIMARY KEY (login),
FOREIGN KEY (login) REFERENCES Loginfo (login)); 


#Customer 
CREATE TABLE  Accounts ( 
acc varchar(10) NOT NULL,
login varchar(10) NOT NULL,  
balance int NOT NULL,
acctype varchar(15) NOT NULL,
PRIMARY KEY (acc),
CHECK (acctype IN ('Checking', 'Credit', 'Savings')),
FOREIGN KEY (login) REFERENCES Loginfo (login)); 


CREATE TABLE  Transactions ( 
transid varchar(15) NOT NULL,
acc varchar(10) NOT NULL,
transdate date NOT NULL, 
transvalue DECIMAL(9,2) NOT NULL, 
PRIMARY KEY (transid),
FOREIGN KEY (acc) REFERENCES Accounts (acc));

INSERT INTO Loginfo (login, passhash) VALUES ('dminator', 675387);
INSERT INTO Users (login, fname, lname, email, wallet, phone, city, state, zip, street_address) 
VALUES ('dminator', 'Dmitry', 'Bondarev', 'bondareff.dmitry@mail.ru', '0x28fF6c3b3427EB2E0e1eD25e512f3201074EA426', 5514448789,'Phoenix', 'AZ', 85308, '111 Nowhere');
INSERT INTO Accounts (acc, login, balance, acctype) 
VALUES ('111111', 'dminator', 1000.00, 'Checking');
INSERT INTO Transactions (transid, acc, transdate, transvalue) 
VALUES ('1', '111111', '2025-01-01', -1000.00);