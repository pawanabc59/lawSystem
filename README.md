# lawSystem
A platform where anyone can find lawyer online and give the case to lawyer

## Process
1. Lawyer first register themselves on the website then they have to update the profile for being in the list of other lawyers.
2. User register themselves on the website.
3. User can see the list of lawyers and they can select any lawyer.
4. After selecting the lawyer the user needs to submit the case to the lawyer and the case file.
5. Lawyer will get the notification that there is a case for him.
6. Lawyer will have the coice of accepting or rejecting the case. An email will be sent to the user about the decision of lawyer. If lawyer rejects the case then he needs to submit the reason for rejection.
7. Lawyer can see there approved cases in mycase tab.



## Installation
[Download the XAMPP](https://www.apachefriends.org/download.html)

Import the [sql file](https://github.com/pawanabc59/lawSystem/blob/master/lawsystem.sql) in phpmyadmin to have all the table and columns.

Installing NodeJs
```
$ sudo apt-get install nodejs
```

Cloning the repo
```
$ git clone https://github.com/pawanabc59/lawSystem.git
```
or download the zip file

Installing the dependencies
```
$ cd lawSystem
$ npm install
```

Start the XAMPP server and run this command in terminal or cmd to start the project.
```
$ nodemon app.js
```

Project will run on port 8050. Type this in browser
```
$ http://localhost:8050/login
```

## Technology stack
1.  Bootstrap
2.  HTML
3.  CSS
4.  NodeJS
