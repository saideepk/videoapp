# videoapp
Youtube like application been developed for my MCA semester 6 Main project

Github sourc - https://github.com/saideepk/videoapp

To run this Project (ONLINE VIDEO STREAMING AND SHARING MANAGEMENT SYSTEM), the administrator has to go through following softwares set-up and instructions for smooth flow of application.

Softwares to Install 
Xampp 1.8.2 - https://sourceforge.net/projects/xampp/files/XAMPP%20Windows/1.8.2/

XAMPP is an open source free software developed by Apache friends. XAMPP software package contains Apache distributions for Apache server, MariaDB, PHP, and Perl. And it is basically a local host or a local server. This local server works on your own desktop or laptop computer. You can just install this software on your laptop or desktop and test the clients or your website before uploading it to the remote web server or computer. This XAMPP server software gives you suitable environment for testing MYSQL, PHP, Apache and Perl projects on the local computer.


NodeJS - https://nodejs.org/en/download/
Node.js is an open source, cross-platform runtime environment for developing server-side and networking applications. Node.js applications are written in JavaScript, and can be run within the Node.js runtime on OS X, Microsoft Windows, and Linux.



How to Use the application
> Install the required above two softwares and allow the required permissions, when asked
> Copy the source from DVD to hard disk (better create a folder in D drive), unzip it, now you have complete source on your machine
> Next open installed xampp software, search for xampp in start menu, double click to open it.
> once xampp window is revealed, start apache and mysql by clicking start button on the popup window, this will start apache and mysql services.
> Under MySQL, click on "Admin" button next to open sql admin in browser.
> Once PHPMyAdmin opened in browser, Create a Database  by clicking on "New" link on left side, give the name as "videoapp" and save to create database.
> Click on videoapp database, and click on import button from top-center menu, next click on choose file and select videoapp.sql from the source folder. Click    on Go button to save data, Tables will be imported to database.
> Now come to desktop, open command prompt and cd to the source folder, there run this two commands to check versions
    node -v
    npm -v (make sure node version is greater that version 8)
> next run this command "npm install" on the source folder, this will download all dependencies for the project.
> after successfull npm install, run this command to start our application "node server.js" and ignore the window for now.
> go to browser and type "http://localhost:3000/", this will be our project url to access.
> now start enjoyin the video features by registering and login to the application, after succesfull login you are able to upload and manage videos.
> Enjoy your private video stream application






