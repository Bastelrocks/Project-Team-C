# Soccer Player Database Application

Welcome to the Soccer Player Database Application! This web application provides a comprehensive database of soccer players from around the world. Explore detailed player profiles, statistics, and much more in a user-friendly interface. This web application is the final project for the Front End Bootcamp @Ironhack from Aug 20th to Nov 9th 2024 from Victor Fernandes Martins, Tim Rabisch and Raed Tarawneh.

## Features

- **Player Tables:** List soccer players, including name, position, team.
- **Team Listings:** Browse and search through a list of teams and their squad sizes.
- **Country-Based Filtering:** Easily filter teams based on their country.
- **Interactive User Interface:** Enjoy a seamless and engaging user interface with intuitive navigation.
- **Authentication:** Sign/Log in to create or edit player profiles, teams and transfers (specific functionality for authenticated users).
- **Responsive Design:** The design ensures seamless access on devices with a resolution from 1440 x 900 upwards. The site is not yet designed for resolutions below that.

## Used Technologies

- **Vue.js:** A progressive JavaScript framework used for building the dynamic user interface.
- **Vue Router:** For handling navigation and routing between pages within the application.
- **Pinia:** State management library for managing application-wide state in a centralized store.
- **Bootstrap:** Utilized for creating a responsive and attractive design easily.
- **Supabase:** As a backend service provider, storing data about players, teams, and other essential records.
- **HTML5 & CSS3:** Markup and stylesheets for structuring the website and adding presentational flair.
- **Netlify:** The hosting platform for deploying and managing the live application.

## Detailed view description

- **Homeview:** Basic starting page, which welcomes the user.
- **Teamsview:** Displays all teams within the database in a table with team name, foundation year and squad size. The squad sizes are derived through a query over the players within the database. By using the select button the user can filter the teams by country. A form to create new teams is only displayed to authenticated users.
- **Playerview:** Displays all players within the database in a table with image, name, back number, position, birth date, team (which is derived over a foreign key from the teamstable) and active status. Through a dropdown menu at the bottom of the table users can adjust the quantity of players that are shown. Also at the bottom of the table the user finds buttons "next" and "back" to browse through the players. Authenticated users see forms for creating and deleting players. By pressing the button "Add player to database" the player is inserted in the player table of the database, if the form is filled correctly. Providing an image-url is optional. The button "Delete player" deletes the row for the player in the player table of the database. Authenticated users also see an additional row in the table, where they can set the status of a player from active to retired and vice versa. Clicking the button there updates the entry for the player in the player table of the database.
- **Transferview:** Displays all transfers within the transfer table of the database with name of the player, club origin, club destination, transfer date and transfer value. Through a dropdown menu at the bottom of the table users can adjust the quantity of tranfers that are shown. Also at the bottom of the table the user finds buttons "next" and "back" to browse through the transfers. Authenticated users see an additional row within the table, where they can create new transfers. If the team is selected, the select player dropdown shows all players for the selected team. The dropdown "Select team" in club destination shows all teams except the one selected in club origin. When the button "Add this transfer" is clicked a new row in the transfer table of the database is created and the clubID for the selected player is updated in the player table of the database.
- **Registerview:** This view is only shown if the user is not authenticated. Through a form the user can create an account and create a team.
- **Aboutview:** This view contains a brief description of the project.
- **Contactview:** Displays a form where the user can send a message providing his name and emailadress. By clicking the button "Send message" a new row is inserted in the contact_requests table of the database.
- **NotFound:** Displays a "404"-image and a message if the user enters a non existing path in the the adress bar of the browser.

## Getting Started

To get a local copy up and running follow these steps:

### Prerequisites

- Node.js and npm should be installed on your system.
- Access to the project's source code repository.

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Bastelrocks/Project-Team-C
   cd soccerapp
   npm install
   npm run dev
