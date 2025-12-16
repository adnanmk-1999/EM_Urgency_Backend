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
                Username: "admin1999",
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
                Username: "alice1999",
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
                Username: "bob1999",
                Email: "mohamedkhalidadnan@gmail.com",
                Password: bcrypt.hashSync("Bob@123", SALT_ROUNDS),
                Gender: "Male",
                Contact: "9876556787",
                Image: "https://example.com/bob.png",
                Location_Id: 2,
                Department_Id: 3,
                Grade_Id: 1,
                Job_Title_Id: 3,
            },
            {
                Id: 4,
                Name: "Clara",
                Username: "clara1999",
                Email: "clara@email.com",
                Password: bcrypt.hashSync("Clara@123", SALT_ROUNDS),
                Gender: "Female",
                Contact: "9012345678",
                Image: "https://example.com/clara.png",
                Location_Id: 2,      // Berlin
                Department_Id: 2,    // Security
                Grade_Id: 2,
                Job_Title_Id: 2      // Doctor
            },
            {
                Id: 5,
                Name: "David",
                Username: "david1999",
                Email: "david@email.com",
                Password: bcrypt.hashSync("David@123", SALT_ROUNDS),
                Gender: "Male",
                Contact: "9123456789",
                Image: "https://example.com/david.png",
                Location_Id: 1,      // Stuttgart
                Department_Id: 1,    // Operations
                Grade_Id: 2,
                Job_Title_Id: 1      // Nurse
            }
        ]);

        // ==========================
        // USER ↔ ROLE MAPPING
        // ==========================
        console.log("Mapping users to roles...");

        const UserRoles = db.sequelize.models.user_roles;

        await UserRoles.bulkCreate(
            [
                { user_id: 1, role_id: 2 },
                { user_id: 1, role_id: 1 },
                { user_id: 2, role_id: 1 },
                { user_id: 3, role_id: 1 },
                { user_id: 4, role_id: 1 },
                { user_id: 5, role_id: 1 },
            ],
            { ignoreDuplicates: true }
        );
        // ==========================
        // ALERTS
        // ==========================
        console.log("Seeding alerts...");

        await Alert.bulkCreate([
            // ======================
            // 2025-12-16
            // ======================
            {
                Id: 1,
                Subject: "Fire Drill Announcement",
                Message: "Scheduled fire drill at 10:00 AM. Please cooperate.",
                Date: new Date("2025-12-16T08:00:00.000Z"),
                SentCount: 10,
                category_id: 1,
                status_id: 2,
                Created_By: 1
            },
            {
                Id: 2,
                Subject: "System Maintenance",
                Message: "IT maintenance from 22:00 to 02:00. Services may be unavailable.",
                Date: new Date("2025-12-16T20:00:00.000Z"),
                SentCount: 11,
                category_id: 1,
                status_id: 1,
                Created_By: 1
            },
            {
                Id: 3,
                Subject: "Emergency Ward Overload",
                Message: "Emergency ward capacity exceeded. Redirect patients.",
                Date: new Date("2025-12-16T09:30:00.000Z"),
                SentCount: 9,
                category_id: 2,
                status_id: 2,
                Created_By: 1
            },
            {
                Id: 4,
                Subject: "Public Holiday Notice",
                Message: "Hospital will operate with minimal staff tomorrow.",
                Date: new Date("2025-12-16T00:00:00.000Z"),
                SentCount: 5,
                category_id: 3,
                status_id: 2,
                Created_By: 1
            },
            {
                Id: 5,
                Subject: "Security Alert",
                Message: "Unauthorized access attempt detected near main entrance.",
                Date: new Date("2025-12-16T12:46:00.385Z"),
                SentCount: 6,
                category_id: 2,
                status_id: 3,
                Created_By: 1
            },

            // ======================
            // 2025-12-17
            // ======================
            {
                Id: 6,
                Subject: "Power Backup Test",
                Message: "Backup generators will be tested at noon.",
                Date: new Date("2025-12-17T12:00:00.000Z"),
                SentCount: 7,
                category_id: 1,
                status_id: 1,
                Created_By: 1
            },
            {
                Id: 7,
                Subject: "Patient Record Audit",
                Message: "Mandatory audit of patient records in all departments.",
                Date: new Date("2025-12-17T09:00:00.000Z"),
                SentCount: 9,
                category_id: 2,
                status_id: 2,
                Created_By: 1
            },
            {
                Id: 8,
                Subject: "Parking Restriction",
                Message: "Parking area B closed for maintenance.",
                Date: new Date("2025-12-17T06:00:00.000Z"),
                SentCount: 4,
                category_id: 1,
                status_id: 2,
                Created_By: 1
            },
            {
                Id: 9,
                Subject: "Security Drill",
                Message: "Security evacuation drill at 15:00.",
                Date: new Date("2025-12-17T15:00:00.000Z"),
                SentCount: 6,
                category_id: 2,
                status_id: 2,
                Created_By: 1
            },
            {
                Id: 10,
                Subject: "Cafeteria Closure",
                Message: "Cafeteria closed due to maintenance.",
                Date: new Date("2025-12-17T11:00:00.000Z"),
                SentCount: 5,
                category_id: 3,
                status_id: 3,
                Created_By: 1
            },

            // ======================
            // 2025-12-18
            // ======================
            {
                Id: 11,
                Subject: "Blood Donation Camp",
                Message: "Voluntary blood donation camp in Hall A.",
                Date: new Date("2025-12-18T10:00:00.000Z"),
                SentCount: 10,
                category_id: 2,
                status_id: 2,
                Created_By: 1
            },
            {
                Id: 12,
                Subject: "Water Supply Shutdown",
                Message: "Water supply will be shut down for 2 hours.",
                Date: new Date("2025-12-18T14:00:00.000Z"),
                SentCount: 12,
                category_id: 1,
                status_id: 1,
                Created_By: 1
            },
            {
                Id: 13,
                Subject: "Pharmacy Stock Update",
                Message: "Critical medicines stock update required.",
                Date: new Date("2025-12-18T09:30:00.000Z"),
                SentCount: 13,
                category_id: 2,
                status_id: 2,
                Created_By: 1
            },
            {
                Id: 14,
                Subject: "Network Outage",
                Message: "Temporary network outage expected.",
                Date: new Date("2025-12-18T16:00:00.000Z"),
                SentCount: 8,
                category_id: 1,
                status_id: 3,
                Created_By: 1
            },
            {
                Id: 15,
                Subject: "Holiday Schedule Reminder",
                Message: "Please review updated holiday duty schedule.",
                Date: new Date("2025-12-18T08:00:00.000Z"),
                SentCount: 14,
                category_id: 3,
                status_id: 2,
                Created_By: 1
            }
        ]);

        // ==========================
        // RESPONSES (Accepted / Rejected) – for 15 alerts
        // ==========================
        console.log("Seeding responses...");

        await Response.bulkCreate([
            // --------------------------
            // 2025-12-16 alerts (1–5)
            // --------------------------
            { Id: 1, alert_id: 1, user_id: 1, response: "Accepted" },
            { Id: 2, alert_id: 1, user_id: 2, response: "Accepted" },
            { Id: 3, alert_id: 1, user_id: 3, response: "Rejected" },
            { Id: 4, alert_id: 1, user_id: 5, response: "Accepted" },

            { Id: 5, alert_id: 2, user_id: 1, response: "Accepted" },
            { Id: 6, alert_id: 2, user_id: 2, response: "Accepted" },
            { Id: 7, alert_id: 2, user_id: 5, response: "Accepted" },

            { Id: 8, alert_id: 3, user_id: 3, response: "Accepted" },
            { Id: 9, alert_id: 3, user_id: 2, response: "Rejected" },

            { Id: 10, alert_id: 4, user_id: 1, response: "Accepted" },
            { Id: 11, alert_id: 4, user_id: 4, response: "Accepted" },
            { Id: 12, alert_id: 4, user_id: 5, response: "Rejected" },

            { Id: 13, alert_id: 5, user_id: 4, response: "Accepted" },
            { Id: 14, alert_id: 5, user_id: 1, response: "Rejected" },

            // --------------------------
            // 2025-12-17 alerts (6–10)
            // --------------------------
            { Id: 15, alert_id: 6, user_id: 1, response: "Accepted" },
            { Id: 16, alert_id: 6, user_id: 2, response: "Accepted" },
            { Id: 17, alert_id: 6, user_id: 5, response: "Accepted" },

            { Id: 18, alert_id: 7, user_id: 2, response: "Accepted" },
            { Id: 19, alert_id: 7, user_id: 5, response: "Accepted" },
            { Id: 20, alert_id: 7, user_id: 3, response: "Rejected" },

            { Id: 21, alert_id: 8, user_id: 1, response: "Accepted" },
            { Id: 22, alert_id: 8, user_id: 4, response: "Rejected" },

            { Id: 23, alert_id: 9, user_id: 4, response: "Accepted" },
            { Id: 24, alert_id: 9, user_id: 3, response: "Accepted" },

            { Id: 25, alert_id: 10, user_id: 2, response: "Accepted" },
            { Id: 26, alert_id: 10, user_id: 4, response: "Accepted" },
            { Id: 27, alert_id: 10, user_id: 1, response: "Rejected" },

            // --------------------------
            // 2025-12-18 alerts (11–15)
            // --------------------------
            { Id: 28, alert_id: 11, user_id: 1, response: "Accepted" },
            { Id: 29, alert_id: 11, user_id: 2, response: "Accepted" },
            { Id: 30, alert_id: 11, user_id: 3, response: "Rejected" },

            { Id: 31, alert_id: 12, user_id: 5, response: "Accepted" },
            { Id: 32, alert_id: 12, user_id: 2, response: "Accepted" },

            { Id: 33, alert_id: 13, user_id: 2, response: "Accepted" },
            { Id: 34, alert_id: 13, user_id: 1, response: "Accepted" },
            { Id: 35, alert_id: 13, user_id: 4, response: "Rejected" },

            { Id: 36, alert_id: 14, user_id: 3, response: "Accepted" },
            { Id: 37, alert_id: 14, user_id: 1, response: "Accepted" },

            { Id: 38, alert_id: 15, user_id: 4, response: "Accepted" },
            { Id: 39, alert_id: 15, user_id: 2, response: "Rejected" },
        ]);


        // ==========================
        // USER ↔ ALERT MAPPING
        // ==========================
        console.log("Mapping users to alerts...");

        // Sequelize auto-creates this join table model because of `through: "user_alerts"`
        const UserAlerts = db.sequelize.models.user_alerts;

        if (!UserAlerts) {
            throw new Error(
                "Join table model 'user_alerts' not found. Check `through: \"user_alerts\"` in models/index.js and table naming."
            );
        }

        /**
         * IMPORTANT:
         * This requires that Alerts are already seeded BEFORE this runs.
         * i.e., Alert table must contain Ids you reference below.
         */

        await UserAlerts.bulkCreate(
            [
                // Admin gets all
                ...Array.from({ length: 15 }, (_, i) => ({ user_id: 1, alert_id: i + 1 })),

                // Others get subset
                { user_id: 2, alert_id: 1 },
                { user_id: 2, alert_id: 6 },
                { user_id: 2, alert_id: 11 },

                { user_id: 3, alert_id: 3 },
                { user_id: 3, alert_id: 9 },
                { user_id: 3, alert_id: 14 },

                { user_id: 4, alert_id: 5 },
                { user_id: 4, alert_id: 10 },
                { user_id: 4, alert_id: 15 },

                { user_id: 5, alert_id: 2 },
                { user_id: 5, alert_id: 7 },
                { user_id: 5, alert_id: 12 },
            ],
            { ignoreDuplicates: true }
        );

        console.log("Updating random responses (simulate user actions)...");

        const RESPONSES = ["Accepted", "Rejected"];
        const RESPONSE_PROBABILITY = 0.65; // 65% users respond

        const allResponses = await Response.findAll({ raw: true });

        for (const r of allResponses) {
            // Decide randomly if user responded
            if (Math.random() < RESPONSE_PROBABILITY) {
                const randomDecision =
                    RESPONSES[Math.floor(Math.random() * RESPONSES.length)];

                await Response.update(
                    { Response: randomDecision },
                    { where: { Id: r.Id } }
                );
            }
        }


        console.log("\n✨ SEEDING COMPLETED SUCCESSFULLY ✨");
        process.exit(0);

    } catch (err) {
        console.error("❌ Seeding failed:", err);
        process.exit(1);
    }
}

seed();
