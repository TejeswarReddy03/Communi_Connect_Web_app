# Communi Connect Web App

## Project Overview

The Communi Connect Web App is a platform designed to address and resolve ongoing community problems by harnessing the collective input and concerns of community members. Its primary purpose is to facilitate efficient communication between community members and authorities, ultimately leading to actionable solutions and improved community well-being.

### Key Goals

- Allow every member of the community to post their problems while maintaining their anonymity.
- Create a user-friendly and accessible platform for community members to voice their concerns.
- Streamline communication between community members and relevant authorities.
- Foster a sense of community engagement and collaboration to address issues effectively.
- Drive positive change within the community by providing a platform for actionable solutions.

## Installation

To set up the Communi Connect Web App, follow these steps:
1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/TejeswarReddy03/Communi_Connect_Web_app.git

### Backend Installation

1. Navigate to the `backend` folder:

   ```bash
   cd backend
   1.Install the required backend dependencies using npm:
       npm install
        If you encounter any errors during the installation process, you may need to install the dependencies explicitly. Run the following commands to install the dependencies separately:
          example:npm install express
                   npm install mongoose
### Frontend Installation
1.Navigate to the 'frontend' folder:
 ```bash
   cd frontend
   1.Install the required frontend dependencies using npm:
       npm install
        If you encounter any errors during the installation process, you may need to install the dependencies explicitly. Run the following commands to install the dependencies separately.

### Usage
To run the Communi Connect Web App, follow these steps:

1.After installing dependencies, make sure to put your keys and configuration in a .env file in the root directory of both the backend and frontend folders.
2.Start the frontend server:
     ```bash
        cd frontend
        npm start
3.Start the backend server:
    ```bash
        cd backend
        node ./index.js

These commands will start both the frontend and backend components of the Communi Connect Web App. You can then access the application by opening it in your web browser.You can change the port as per the your system.



## Features

### How to Use

#### User Registration and Login

1. **User Registration:**
   - Upon visiting the website, new users are directed to the signup page.
   - Fill out the required registration information.
   - After successful registration, you will be redirected to the login page.

2. **User Login:**
   - Enter your credentials (username and password) to log in.

#### Home Page Navigation

3. **Home Page:**
   - Upon successful login, you will be redirected to the home page.
   - Here, you can learn more about the web app and its features.

4. **Navigation Menu:**
   - The navigation menu allows you to access various sections of the website, including Maps, View Markers, Posts, Chats, and Announcements.

#### Maps

5. **Maps:**
   - Use the "Add Marker" feature on the top left to mark noteworthy incidents on the map in your pincode area.
   - Note that all fields are mandatory, and specific conditions must be met, such as minimum and maximum radius values.

#### View Markers

6. **View Markers:**
   - View markers in your pincode area based on your current location and the radius of the marker.
   - If you fall within the marker's radius, you can see its description, images, and other details.

#### Posts

7. **Posts:**
   - Post content by mentioning your username and content.
   - Only users within the same pincode area can view your posts.
   - The "Posts" section is vital for sharing information within the community.

#### Chats

8. **Chats:**
   - Use this section to chat with individuals who fall within the same pincode area.

#### Announcements

9. **Announcements:**
   - Important information can be conveyed through announcements.
   - New announcements are sent to users via email.
   - You can also use filters to sort and access specific announcement data.

#### Logout

10. **Logout:**
    - To log out, click on the "Logout" option in the navigation menu.

These steps outline how to use the various features of the Communi Connect Web App effectively. Explore the different sections to contribute to your community and stay informed about important matters.



















   
