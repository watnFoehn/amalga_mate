////////////////////////////////////////////////
const mongoose = require('mongoose');
const User = require("../models/User.js");

mongoose
  .connect(
    process.env.MONGODB_URI,
    { useNewUrlParser: true }
  )
  .then(x => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

const users = [
  {
    username: "Anthony",
    password: "",
    email: "anthony@anthony.com",
    imgName: "Anthony.png",
    imgPath: "https://res.cloudinary.com/lorberta/image/upload/v1542360897/folder-name/Anthony.jpg",
    learnGroup: "Robot Learn Group",
    languages: "German, English",
    location: "",
    getInTouch: "come to Yoga with me",
    music: "",
    sports: "Yoga",
    culinary: "Bircher Muesli",
  },
  {
    username: "Carlos",
    password: "",
    email: "carlos@climbing.fr",
    imgName: "Carlos.png",
    imgPath: "https://res.cloudinary.com/lorberta/image/upload/v1542360899/folder-name/Carlos.jpg",
    learnGroup: "",
    languages: "nur Deutsch",
    location: "",
    getInTouch: "",
    music: "",
    sports: "experimental dance",
    culinary: "",
  },
  {
    username: "Matthias",
    password: "",
    email: "matze@atze.com",
    imgName: "Matthias.png",
    imgPath: "https://res.cloudinary.com/lorberta/image/upload/v1542360897/folder-name/Matthias.jpg",
    learnGroup: "The Zone",
    languages: "English, German",
    location: "",
    getInTouch: "slack",
    music: "Gabba, Emina Sonnad",
    sports: "you find me at the gym, pumping iron!",
    culinary: "all",
  },
  {
    username: "Max",
    password: "",
    email: "max@ih.com",
    imgName: "",
    imgPath: "",
    learnGroup: "Magic",
    languages: "English, German, a little bit of French",
    location: "",
    getInTouch: "write me on Whatsapp: +49123456789",
    music: "Chansons, Emina Sonnad",
    sports: "cycling",
    culinary: "Chartreuse",
  },
  {
    username: "Gandalf",
    password: "",
    email: "grey@nm.eu",
    imgName: "Gandalf.png",
    imgPath: "https://res.cloudinary.com/lorberta/image/upload/v1542360891/folder-name/Gandalf.png",
    learnGroup: "",
    languages: "Elvish",
    location: "",
    getInTouch: "send me an insect please",
    music: "",
    sports: "eagle riding",
    culinary: "",
  },
  {
    username: "Emina",
    password: "",
    email: "emin@ukulele.us",
    imgName: "Emina.png",
    imgPath: "https://res.cloudinary.com/lorberta/image/upload/v1542360892/folder-name/Emina.jpg",
    learnGroup: "",
    languages: "English, Spanish",
    location: "",
    getInTouch: "just walk up to me and we'll get together",
    music: "",
    sports: "running",
    culinary: "",
  },
  {
    username: "Axel",
    password: "",
    email: "axel@alterschwede.com",
    imgName: "Axel.png",
    imgPath: "https://res.cloudinary.com/lorberta/image/upload/v1542360899/folder-name/Axel.jpg",
    learnGroup: "Alter Schwede! Ich lerne deutsch!",
    languages: "English, Swedish",
    location: "",
    getInTouch: "just come over, let's talk",
    music: "Swedish House Mafia, Emina Sonnad",
    sports: "",
    culinary: "Köttbullar",
  },
  {
    username: "Anjali",
    password: "",
    email: "angel@skyr.oof",
    imgName: "Anjali.png",
    imgPath: "https://res.cloudinary.com/lorberta/image/upload/v1542360892/folder-name/Angali.jpg",
    learnGroup: "",
    languages: "",
    location: "",
    getInTouch: "send me a text",
    music: "70s jams",
    sports: "rock'n'roll dancing",
    culinary: "healthy food",
  },
  {
    username: "Thor",
    password: "",
    email: "thor@einartjorft.com",
    imgName: "Thor.png",
    imgPath: "https://res.cloudinary.com/lorberta/image/upload/v1542360891/folder-name/Thor.png",
    learnGroup: "no need",
    languages: "",
    location: "",
    getInTouch: "",
    music: "",
    sports: "",
    culinary: "Snus",
  },
  {
    username: "Katrin",
    password: "",
    email: "kat@googlemail.com",
    imgName: "Katrin.png",
    imgPath: "https://res.cloudinary.com/lorberta/image/upload/v1542360900/folder-name/Katrin.jpg",
    learnGroup: "yes no maybe",
    languages: "",
    location: "",
    getInTouch: "Only Threema, no WhatsApp",
    music: "SkaPunk",
    sports: "",
    culinary: "currently on a pork diet",
  },
  {
    username: "Ziggy",
    password: "",
    email: "ziggy@israel.com",
    imgName: "Ziggy.png",
    imgPath: "https://res.cloudinary.com/lorberta/image/upload/v1542360902/folder-name/Ziggy.jpg",
    learnGroup: "",
    languages: "nur Deutsch",
    location: "",
    getInTouch: "just talk to me",
    music: "Britney Spears forever",
    sports: "",
    culinary: "love cabbage",
  },
  {
    username: "Nele",
    password: "",
    email: "nele@nele.org",
    imgName: "Nele.png",
    imgPath: "https://res.cloudinary.com/lorberta/image/upload/v1542360892/folder-name/Nele.jpg",
    learnGroup: "",
    languages: "German, English, Norwegian",
    location: "",
    getInTouch: "WhatsApp please",
    music: "pan flute music & ambient",
    sports: "meet me Tuesdays at the bar workout",
    culinary: "",
  },
  {
    username: "Pernille",
    password: "",
    email: "perni@norway.eu",
    imgName: "Pernille.png",
    imgPath: "https://res.cloudinary.com/lorberta/image/upload/v1542360900/folder-name/Pernille.jpg",
    learnGroup: "",
    languages: "Swedish",
    location: "",
    getInTouch: "contact by Email please",
    music: "",
    sports: "cycling, yoga",
    culinary: "Gouda",
  },
  {
    username: "Tom",
    password: "",
    email: "tomtomtom@inode.de",
    imgName: "Tom.png",
    imgPath: "https://res.cloudinary.com/lorberta/image/upload/v1542360896/folder-name/Tom.jpg",
    learnGroup: "yes, if it involves music",
    languages: "Frenglish",
    location: "",
    getInTouch: "snail mail",
    music: "disco",
    sports: "disco",
    culinary: "",
  },
  {
    username: "Binu",
    password: "",
    email: "binu@gmail.eu",
    imgName: "Binu.png",
    imgPath: "https://res.cloudinary.com/lorberta/image/upload/v1542360892/folder-name/Binu.jpg",
    learnGroup: "",
    languages: "Japanese, Hungarian, Finnish",
    location: "",
    getInTouch: "snail mail",
    music: "disco",
    sports: "thai boxing, crossfit",
    culinary: "",
  },
  {
    username: "Khalil",
    password: "",
    email: "king@khalil.com",
    imgName: "Khalil.png",
    imgPath: "https://res.cloudinary.com/lorberta/image/upload/v1542360896/folder-name/Khalil.jpg",
    learnGroup: "Machine Learning",
    languages: "Spanish, German, English",
    location: "",
    getInTouch: "let's grab a beer",
    music: "Emina Sonnad, Percussions",
    sports: "couching",
    culinary: "ask Tomaat",
  },
  {
    username: "Anna D.",
    password: "",
    email: "anna.d@tele2.de",
    imgName: "AnnaD",
    imgPath: "https://res.cloudinary.com/lorberta/image/upload/v1542360900/folder-name/AnnaD.jpg",
    learnGroup: "I prefer to work alone",
    languages: "Deutsch",
    location: "",
    getInTouch: "carrier pidgeon",
    music: "hardcore",
    sports: "ballet",
    culinary: "",
  },
  {
    username: "Anna S.",
    password: "",
    email: "anna.s@vodafone.de",
    imgName: "AnnaS",
    imgPath: "https://res.cloudinary.com/lorberta/image/upload/v1542360902/folder-name/AnnaS.jpg",
    learnGroup: "just tell me where, I'm in",
    languages: "Deutsch",
    location: "",
    getInTouch: "",
    music: "Pirate Metal",
    sports: "Stepdance",
    culinary: "",
  },
  {
    username: "Liang",
    password: "",
    email: "liang@liang.com",
    imgName: "Liang.png",
    imgPath: "https://res.cloudinary.com/lorberta/image/upload/v1542360895/folder-name/Liang.jpg",
    learnGroup: "every programming language please",
    languages: "English, Chinese",
    location: "",
    getInTouch: "write me on Slack!",
    music: "Metal, join me for a Cannibal Corpse concert",
    sports: "Basejumping",
    culinary: "vegan",
  },
  {
    username: "Lindsay",
    password: "",
    email: "laber@gmx.net",
    imgName: "Lindsay.png",
    imgPath: "https://res.cloudinary.com/lorberta/image/upload/v1542360896/folder-name/Lindsay.jpg",
    learnGroup: "yes, I would love to meet up",
    languages: "nur Deutsch",
    location: "",
    getInTouch: "",
    music: "Tekkno and Gabba",
    sports: "into curling",
    culinary: "love cooking Persian cuisine",
  },
  {
    username: "Feli",
    password: "",
    email: "feli@gmail.com",
    imgName: "Feli.png",
    imgPath: "https://res.cloudinary.com/lorberta/image/upload/v1542360896/folder-name/Feli.jpg",
    learnGroup: "",
    languages: "nur Deutsch",
    location: "",
    getInTouch: "by PokeAPI please, let's battle first",
    music: "",
    sports: "",
    culinary: "no preferences",
  },
  {
    username: "Eullin",
    password: "",
    email: "eu@llin.io",
    imgName: "Eullin.png",
    imgPath: "https://res.cloudinary.com/lorberta/image/upload/v1542360902/folder-name/Eullin.jpg",
    learnGroup: "",
    languages: "Klingon",
    location: "",
    getInTouch: "just hold up your Bat'leth",
    music: "",
    sports: "truck pulling",
    culinary: "gagh",
  },
  {
    username: "Samanta",
    password: "",
    email: "manta@gmx.net",
    imgName: "Samantha.png",
    imgPath: "https://res.cloudinary.com/lorberta/image/upload/v1542360892/folder-name/Samantha.jpg",
    learnGroup: "I teach CSS Styling",
    languages: "CSS only :)",
    location: "",
    getInTouch: "approach me by song",
    music: "8bit, nintendocore",
    sports: "Wrestling champion 2017, wanna train with me?",
    culinary: "",
  },

];

User.create(users, (err) => {
  if (err) { throw (err) }
  console.log(`Created ${users.length} users`)
  mongoose.connection.close()
});
