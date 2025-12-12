const dbCreate = require("../models/index");

 function initialiseData(){
    dbCreate.sequelize.sync({force: true}).then(() => {
        initialRole();
        initialDepartment();
        initialGrade();
        initialJobTitle();
        initialLocation();
        initialCategory();
        initialStatus();  
    });

    const Role = dbCreate.role;

    function initialRole() {   
        Role.create({
            Id: 1,
            Type: "Admin"
        });
        Role.create({
            Id: 2,
            Type: "User"
        });
    }

    const Department = dbCreate.department;
    
    function initialDepartment() {
        Department.create({
            Id: 1,
            Name: "DTS"
        });
        Department.create({
            Id: 2,
            Name: "ESS"
        });
        Department.create({
            Id: 3,
            Name: "PES"
        });
    }
    
    const Location = dbCreate.location;
    
    function initialLocation() {
        Location.create({
            Id: 1,
            Name: "Bengaluru"
        });
        Location.create({
            Id: 2,
            Name: "Kochi"
        });
        Location.create({
            Id: 3,
            Name: "Trivandrum"
        });
    }
    
    const Grade = dbCreate.grade;
    
    function initialGrade() {
        Grade.create({
            Id: 1,
            Type: "A1"
        });
        Grade.create({
            Id: 2,
            Type: "A2"
        });
        Grade.create({
            Id: 3,
            Type: "B"
        });
    }
    
    const JobTitle = dbCreate.jobTitle;
    
    function initialJobTitle() {
        JobTitle.create({
            Id: 1,
            Name: "HR"
        });
        JobTitle.create({
            Id: 2,
            Name: "Software Engineer"
        });
        JobTitle.create({
            Id: 3,
            Name: "Designer"
        });
        JobTitle.create({
            Id: 4,
            Name: "BU"
        });
    }

    const Category = dbCreate.category;
    
    function initialCategory() {
        Category.create({
            Id: 1,
            Type: "Announcement"
        });
        Category.create({
            Id: 2,
            Type: "Event"
        });
        Category.create({
            Id: 3,
            Type: "Holiday"
        });
    }

    const Status = dbCreate.status;

    function initialStatus() {
        Status.create({
            Id: 1,
            Type: "Draft"
        });
        Status.create({
            Id: 2,
            Type: "Sent"
        });
        Status.create({
            Id: 3,
            Type: "Failed"
        });
    }
}

module.exports = initialiseData();