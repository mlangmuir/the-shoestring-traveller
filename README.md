# The Shoestring Traveller

Development:

Frontend:
cd client
yarn start

Backend:
cd server
nodemon

Batch import:
node < drag batchImport.js here >
If articles is deleted and re-imported to Mongo, must recreate text index with following object for search bar to work: { "title": "text" }