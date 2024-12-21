# Portfolio Project

## Overview
This is a personal portfolio project showcasing my skills, projects, and experience in web development. It features an engaging home page with a video/image fallback and a start button, along with additional pages for About, Projects, Resume, and Contact.

## Features
- **Home Page**: 
  - Plays a video with an image fallback if the video takes time to load.
  - Includes a "Start" button for navigation.
- **About Page**: 
  - Provides a biography and an interactive "Get Weather" button to retrieve the current weather based on the user's location.
- **Projects Page**: Displays my key projects with brief descriptions and links to live demos or repositories.
- **Resume Page**: Showcases my professional experience, education, and skills.
- **Contact Page**: Includes a form for visitors to reach out to me directly.
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices.

## Technologies Used
- **Frontend**: HTML, CSS, JavaScript
- **API Integration**: OpenWeather API (for weather data)
- **Styling Framework**: Tailwind CSS 

## How to Use
1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/portfolio-project.git
    ```
2. Navigate to the project directory:
    ```bash
    cd portfolio-project
    ```
3. Open the `index.html` file in your browser to view the portfolio.
4. Use the navigation menu to explore the Home, About, Projects, Resume, and Contact pages.
5. On the About page, click the "Get Weather" button to fetch real-time weather data.

## API Setup
1. Sign up for a free account at [OpenWeather](https://openweathermap.org/) to get an API key.
2. Replace the placeholder API key in the JavaScript file with your actual API key:
    ```javascript
    const apiKey = 'your_api_key_here';
    ```

## Project Structure
```
portfolio-project/
├── index.html         # Home page with video/image fallback and start button
├── about.html         # About page with Get Weather functionality
├── projects.html      # Projects page
├── resume.html        # Resume page
├── contact.html       # Contact page with form
├── clone.html
├── stories.html
├── racegear.html
├── src/
│   ├── styling/           # Stylesheets
│   ├── functions/            # JavaScript files
    ├── video/         # Videos used in the project
│   └── images/       # Images used in the project
└── README.md          # Project documentation
```
