# The Shoestring Traveller

### Development mode:

#### Frontend:
- cd client
- yarn start

#### Backend:
- cd server
- nodemon

#### Batch import:
- node << drag batchImport.js here >>
- If articles is deleted and re-imported to Mongo, must recreate text index with following object for search bar to work: { "title": "text" }

### Production mode:

#### Frontend:
- cd client
- yarn start

#### Backend:
cd server
NODE_ENV=production yarn start

<img width="1440" alt="Screen Shot 2022-09-15 at 9 48 10 PM" src="https://user-images.githubusercontent.com/96800876/190558761-6392c6ff-285e-4f73-965d-a11b0f1163ec.png">
