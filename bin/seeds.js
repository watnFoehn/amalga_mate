////////////////////////////////////////////////
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
    imgName: "",
    imgPath: "",
    learnGroup: "Robot Learn Group",
    languages: "German, English",
    location: "",
    getInTouch: "come to Yoga with me",
    music: "",
    sports: "Yoga",
    culinary: "Bircher Muesli",
  },
  {
    username: "Khalil",
    password: "",
    email: "king@khalil.com",
    imgName: "",
    imgPath: "",
    learnGroup: "Machine Learning",
    languages: "Spanish, German, English",
    location: "",
    getInTouch: "let's grab a beer",
    music: "Emina Sonnad, Percussions",
    sports: "couching",
    culinary: "ask Tomaat",
  },
  {
    username: "Matthias",
    password: "",
    email: "matze@atze.com",
    imgName: "",
    imgPath: "",
    learnGroup: "Magic",
    languages: "English, German",
    location: "",
    getInTouch: "leave me alone",
    music: "Gabba, Emina Sonnad",
    sports: "lifting heavy weights",
    culinary: "all",
  },
  {
    username: "Maxence",
    password: "",
    email: "max@ih.com",
    imgName: "",
    imgPath: "",
    learnGroup: "Magic",
    languages: "English, German, a little bit of French",
    location: "",
    getInTouch: "write me on Whatsapp: +49123456789",
    music: "Chansons, Emina Sonnad",
    sports: "running",
    culinary: "Chartreuse",
  },
  {
    username: "Axel",
    password: "",
    email: "axel@alterschwede.com",
    imgName: "",
    imgPath: "",
    learnGroup: "Alter Schwede! Ich lerne deutsch!",
    languages: "English, Swedish",
    location: "",
    getInTouch: "just come over, let's talk",
    music: "Swedish House Mafia, Emina Sonnad",
    sports: "",
    culinary: "Köttbullar",
  },
  {
    username: "Liang",
    password: "",
    email: "liang@liang.com",
    imgName: "",
    imgPath: "",
    learnGroup: "every programming language please",
    languages: "English, Chinese",
    location: "",
    getInTouch: "write me on Slack!",
    music: "Heavy Metal",
    sports: "Basejumping",
    culinary: "vegan",
  },
  {
    username: "Thor",
    password: "",
    email: "thor@einartjorft.com",
    imgName: "",
    imgPath: "",
    learnGroup: "",
    languages: "",
    location: "",
    getInTouch: "",
    music: "",
    sports: "",
    culinary: "Snus",
  },
  {
    username: "Liang",
    password: "",
    email: "liang@liang.com",
    imgName: "",
    imgPath: "",
    learnGroup: "every programming language please",
    languages: "English, Chinese",
    location: "",
    getInTouch: "write me on Slack!",
    music: "Emina Sonnad",
    sports: "Basejumping",
    culinary: "vegan",
  },
  {
    username: "Liang",
    password: "",
    email: "liang@liang.com",
    imgName: "",
    imgPath: "",
    learnGroup: "every programming language please",
    languages: "English, Chinese",
    location: "",
    getInTouch: "write me on Slack!",
    music: "Emina Sonnad",
    sports: "Basejumping",
    culinary: "vegan",
  },
];

User.create(users, (err) => {
  if (err) { throw (err) }
  console.log(`Created ${users.length} users`)
  mongoose.connection.close()
});