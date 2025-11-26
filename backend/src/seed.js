require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Models
const User = require('./models/User');
const TrainingModule = require('./models/TrainingModule');
const ShopItem = require('./models/ShopItem');
const Facility = require('./models/Facility');
const Vehicle = require('./models/Vehicle');

// Connect to DB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

async function seed() {
  // Clean DB
  await Promise.all([
    User.deleteMany({}),
    TrainingModule.deleteMany({}),
    ShopItem.deleteMany({}),
    Facility.deleteMany({}),
    Vehicle.deleteMany({})
  ]);

  // Admins
  const superAdmin = await User.create({
    name: "Super Admin",
    email: "superadmin@example.com",
    passwordHash: await bcrypt.hash('SuperPass123!', 10),
    role: "SUPER_ADMIN",
    status: "ACTIVE",
    city: "National",
    points: 0
  });

  const ulbAdmin = await User.create({
    name: "ULB Admin",
    email: "ulbadmin@city.com",
    passwordHash: await bcrypt.hash('Pass123!', 10),
    role: "ULB_ADMIN",
    status: "ACTIVE",
    city: "GreenCity",
    points: 0
  });

  // Demo citizens, workers, green champions
  const users = [
    { name: 'Ritika Citizen', email: 'citizen1@demo.com', role: 'CITIZEN' },
    { name: 'Amarjeet Citizen', email: 'citizen2@demo.com', role: 'CITIZEN' },
    { name: 'Ram Worker', email: 'worker1@demo.com', role: 'WORKER' },
    { name: 'Sita Green Champ', email: 'champion1@demo.com', role: 'GREEN_CHAMPION' },
    { name: 'Salim Green Champ', email: 'champion2@demo.com', role: 'GREEN_CHAMPION' },
  ];

  for (const u of users) {
    await User.create({
      name: u.name,
      email: u.email,
      passwordHash: await bcrypt.hash('User123!', 10),
      role: u.role,
      status: 'ACTIVE',
      city: "GreenCity",
      points: Math.floor(Math.random() * 100)
    });
  }

  // Facilities
  await Facility.create([
    { name: 'Biomethanization Plant', type: 'biomethanization', coords: { lat: 28.6, lon: 77.2 }, capacity: 120, contact: 'plant@city.com' },
    { name: 'Recycling Centre', type: 'recycling', coords: { lat: 28.61, lon: 77.19 }, capacity: 50, contact: 'recycle@city.com' },
  ]);

  // Vehicles
  await Vehicle.create([
    { regNo: "UP32WA1101", driverId: null, currentCoords: { lat: 28.6, lon: 77.25 }, routeId: "R1" },
    { regNo: "UP32WB2202", driverId: null, currentCoords: { lat: 28.61, lon: 77.27 }, routeId: "R2" }
  ]);

  // Shop items
  await ShopItem.create([
    { name: "Green Dustbin", category: "dustbin", price: 150, available: true, image: "/images/dustbin.png" },
    { name: "Compost Kit", category: "kit", price: 500, available: true, image: "/images/compostkit.png" }
  ]);

  // Training
  await TrainingModule.create({
    title: "Safe Waste Segregation",
    videos: ["https://vimeo.com/12345"],
    lessons: ["Always separate dry & wet waste."],
    mcqs: [
      { question: "What color is for organic waste?", options: ["Blue", "Green", "Yellow", "Black"], correct: 1 },
      { question: "Who collects wet waste?", options: ["Worker", "Citizen", "Admin", "None"], correct: 0 }
    ],
    passingScore: 2
  });

  mongoose.connection.close();
  console.log("Seed data loaded.");
}

seed();
