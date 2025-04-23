const mongoose = require("mongoose");
const data = require("./data.js");
const Listing = require("../Models/listing.js");
main().then(() => {
    console.log("Database Connected");
}).catch((err) => {
    console.log(`Error : ${err}`);
});
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/Nestinn');
  
    
  };
  const initDB = async () => {
    await Listing.deleteMany({});
    const listingsWithOwner = data.data.map((obj) => ({
      ...obj,
      owner: "67fe5c8cfaafef584a9d17cf",
  }));
  await Listing.insertMany(listingsWithOwner);
    console.log("DATABASE Intialized");
  }
  initDB();