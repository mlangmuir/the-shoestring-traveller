# The Shoestring Traveller - Travel Website

For my final project for the Diploma of Full-Stack Web Development at Concordia University, I created a travel website where I share my amazing experiences travelling the world, as well as advice on how to travel on a shoestring budget.

The project demonstrates the knowledge that I acquired through this full-stack program. It uses React.js on the frontend, Node.js on the backend and MongoDB as its database. I also implemented some APIs to the project, such as Auth0 for the sign in component and EmailJS, which allows me to receive emails with form data from the Contact page.

The website is currently deployed at the following link: https://theshoestringtraveller.matthewlangmuir.com/

## Development mode:

### Frontend:
- In the terminal, enter `cd client`, `yarn`, and then `yarn start`.

### Backend:
- `cd server` to enter the backend directory. Install the following dependencies with `yarn add`: mongodb, express, nodemon and morgan. Run the proxy by entering `nodemon` in the terminal.

### Batch import to MongoDB:
- All articles need to be imported to the database. In the server folder, run `node << drag batchImport.js file in here >>`
- Go to articles collection in MongoDB and create text index with following object: `{ "title": "text" }`

## Production mode:

### Frontend:
- `cd client`
- `yarn build`

### Backend:
- `cd server`
- `NODE_ENV=production yarn start`

<img width="1440" alt="Screen Shot 2022-09-15 at 9 48 10 PM" src="https://user-images.githubusercontent.com/96800876/190558761-6392c6ff-285e-4f73-965d-a11b0f1163ec.png">
