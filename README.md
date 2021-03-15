# Getting Started with Class Pet

## Run Locally

### `createdb myclasspet`

### `npm run seed`

### `npm install`

### create .env file (see below)

### `npm run start-server`

### open a new terminal `npm start`

to create your .env file, <br />
add the following:<br />
SPEECH_SECRET is from Configure Direct Line<br />
PET_SPEECH_KEY_SECRET is from the petspeech keys and endpoint<br />

---

# Built for Microsoft Azure U.S. Hack for Accessibility

## By Fullstack Academy Alumni:

May Hein, Eric Zou, Teofilo Callanaupa, Kaitlin Browne

## In consultation with:

Brooklyn Autism Center
brooklynautismcenter.org

---

## Inspiration

We have all individually worked with individuals ages 9 to 13 with Autism Spectrum Disorder (ASD) and we wanted to be able to incorporate our skills with the NERD stack and Azure to help in a remote learning environment.

## What it does

ClassPet is a task and token management web app designed to assist teachers, caretakers, and students in a remote learning environment. Teachers/caretakers can create schedules and assign token points to tasks. Students are able to see their schedule and earn token points upon task completion. Students can interact with the Azure chat bot to learn more about how to complete their task, and can claim rewards using token points. Teachers are able to see the rewards that a student has claimed and are able to redeem them.

## How we built it

We used Node.js, Express.js, PostgreSQL, and Sequelize to create our RESTful API routes. For our front-end, we used React, Redux, Material-UI, and Semantic-UI. FullCalendar was used to create the basis for the calendar component. Azure’s QnAMaker was used for the web chat component.

## Challenges we ran into

Learning how to use the Azure bot services and attempting to integrate the bot with our web app was our biggest challenge.

## Accomplishments that we're proud of

We are proud that we were able to come so far in creating a tool that the Brooklyn Autism Center could use in a remote environment. We are also proud to complete our first hackathon while working with new technologies in a limited time frame on Zoom.

## What we learned

We learned how to train machine learning bots and deploy them into our web app. We also learned how to manage the bot services in resource groups and connect speech services to a qna bot. When talking with a representative from the Brooklyn Autism Center, we also learned about the challenges that remote learning has imposed on teachers, caretakers, and students during covid.

## What's next for Class Pet

Integrating a web chat feature to allow teachers and students to communicate directly on the web app. Also integrate custom commands so that students can navigate the website with the class pet bot.
