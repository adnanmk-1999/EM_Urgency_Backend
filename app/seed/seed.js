const bcrypt = require("bcryptjs");
const db = require("../models");

// ==========================
// MODELS
// ==========================
const Alert = require("../models/alert.model");
const Category = require("../models/category.model")
const Department = require("../models/department.model");
const Grade = require("../models/grade.model");
const JobTitle = require("../models/jobTitle.model");
const Location = require("../models/location.model");
const Response = require("../models/response.model")
const Role = require("../models/role.model");
const Status = require("../models/status.model");
const User = require("../models/user.model");

// ==========================
// CONFIG
// ==========================
const SALT_ROUNDS = 10;

async function seed() {
    try {
        console.log("🌱 Seeding started...");

        console.log("Clearing old em_urgency data (child → parent)...");

        // ===== CHILD TABLES =====
        await Response.destroy({ where: {} });
        await Role.destroy({ where: {} });

        // ===== CORE TABLES =====
        await Alert.destroy({ where: {} });
        await User.destroy({ where: {} });

        // ===== LOOKUP TABLES =====
        await Status.destroy({ where: {} });
        await Category.destroy({ where: {} });
        await Location.destroy({ where: {} });
        await Department.destroy({ where: {} });
        await Grade.destroy({ where: {} });
        await JobTitle.destroy({ where: {} });

        console.log("Old em_urgency data cleared");

        // ==========================
        // ROLES
        // ==========================
        console.log("Seeding roles...");
        await Role.bulkCreate([
            { Id: 1, Type: "User" },
            { Id: 2, Type: "Admin" },
        ]);

        // ==========================
        // STATUS
        // ==========================
        console.log("Seeding status...");
        await Status.bulkCreate([
            { Id: 1, Type: "Draft" },
            { Id: 2, Type: "Sent" },
            { Id: 3, Type: "Failed" },
        ]);

        // ==========================
        // CATEGORY
        // ==========================
        console.log("Seeding categories...");
        await Category.bulkCreate([
            { Id: 1, Type: "Announcement" },
            { Id: 2, Type: "Event" },
            { Id: 3, Type: "Holiday" },
        ]);

        // ==========================
        // MASTER DATA
        // ==========================
        console.log("Seeding locations...");
        await Location.bulkCreate([
            { Id: 1, Name: "Stuttgart" },
            { Id: 2, Name: "Berlin" },
        ]);

        console.log("Seeding departments...");
        await Department.bulkCreate([
            { Id: 1, Name: "Operations" },
            { Id: 2, Name: "Security" },
            { Id: 3, Name: "IT" },
        ]);

        console.log("Seeding grades...");
        await Grade.bulkCreate([
            { Id: 1, Type: "G1" },
            { Id: 2, Type: "G2" },
        ]);

        console.log("Seeding job titles...");
        await JobTitle.bulkCreate([
            { Id: 1, Name: "Nurse" },
            { Id: 2, Name: "Doctor" },
            { Id: 3, Name: "Dispatcher" },
        ]);

        // ==========================
        // USERS
        // ==========================
        console.log("Seeding users...");
        await User.bulkCreate([
            {
                Id: 1,
                Name: "Admin",
                Username: "admin",
                Email: "admin@email.com",
                Password: bcrypt.hashSync("Admin@123", SALT_ROUNDS),
                Gender: "Male",
                Contact: "8978776554",
                Image: "https://example.com/admin.png",
                Location_Id: 1,
                Department_Id: 3,
                Grade_Id: 1,
                Job_Title_Id: 3,
            },
            {
                Id: 2,
                Name: "Alice",
                Username: "alice",
                Email: "alice@email.com",
                Password: bcrypt.hashSync("Alice@123", SALT_ROUNDS),
                Gender: "Female",
                Contact: "8876567876",
                Image: "https://example.com/alice.png",
                Location_Id: 1,
                Department_Id: 1,
                Grade_Id: 1,
                Job_Title_Id: 3,
            },
            {
                Id: 3,
                Name: "Bob",
                Username: "bob",
                Email: "bob@email.com",
                Password: bcrypt.hashSync("Bob@123", SALT_ROUNDS),
                Gender: "Male",
                Contact: "9876556787",
                Image: "https://example.com/bob.png",
                Location_Id: 2,
                Department_Id: 3,
                Grade_Id: 1,
                Job_Title_Id: 3,
            },
        ]);

        // ==========================
        // USER ↔ ROLE MAPPING
        // ==========================
        console.log("Mapping users to roles...");

        const UserRoles = db.sequelize.models.user_roles;

        await UserRoles.bulkCreate(
            [
                { user_id: 1, role_id: 2 }, // Admin → Admin
                { user_id: 1, role_id: 1 }, // Admin → User
                { user_id: 2, role_id: 1 }, // Alice → User
                { user_id: 3, role_id: 1 }, // Bob → User
            ],
            { ignoreDuplicates: true }
        );


        console.log("\n✨ SEEDING COMPLETED SUCCESSFULLY ✨");
        process.exit(0);

    } catch (err) {
        console.error("❌ Seeding failed:", err);
        process.exit(1);
    }
}

seed();
