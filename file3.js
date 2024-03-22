const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(express.json()); // Middleware to parse JSON bodies

// Define a route to read the JSON file
app.get("/group", (req, res) => {
  // Define the path to the JSON file
  const filePath = path.join(__dirname, "data", "group.json");

  // Read the JSON file
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      res.status(500).send("Error reading file");
      return;
    }

    try {
      const jsonData = JSON.parse(data);
      res.json(jsonData);
    } catch (error) {
      console.error("Error parsing JSON:", error);
      res.status(500).send("Error parsing JSON");
    }
  });
});

// Define a route to add data (Create operation)
app.post("/data", (req, res) => {
  // Assuming req.body contains the new person's data
  const newPerson = {
    id: 4, // Assign a unique ID, you can use a counter or generate dynamically
    name: "Anmar Jarjees",
  };

  // Read the existing data from the JSON file
  const filePath = path.join(__dirname, "data", "group.json");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      res.status(500).send("Error reading file");
      return;
    }

    try {
      // Parse the existing JSON data
      const jsonData = JSON.parse(data);

      // Add the new person to the group array
      jsonData.group.push(newPerson);

      // Write the updated data back to the JSON file
      fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), (err) => {
        if (err) {
          console.error("Error writing file:", err);
          res.status(500).send("Error writing file");
          return;
        }
        res.send("Person added successfully");
      });
    } catch (error) {
      console.error("Error parsing JSON:", error);
      res.status(500).send("Error parsing JSON");
    }
  });
});

// Define a route to update data (Update operation)
app.put("/data/:id", (req, res) => {
  const idToUpdate = req.params.id; // Assuming ID to update is passed in URL parameter
  const updatedData = req.body; // Assuming updated data is passed in the request body

  // Read the existing data from the JSON file
  const filePath = path.join(__dirname, "data", "group.json");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      res.status(500).send("Error reading file");
      return;
    }

    try {
      // Parse the existing JSON data
      const jsonData = JSON.parse(data);

      // Find the index of the data to update
      const index = jsonData.group.findIndex(
        (item) => item.id === parseInt(idToUpdate)
      );

      if (index !== -1) {
        // Update the data with the provided ID
        jsonData.group[index] = { ...jsonData.group[index], ...updatedData };

        // Write the updated data back to the JSON file
        fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), (err) => {
          if (err) {
            console.error("Error writing file:", err);
            res.status(500).send("Error writing file");
            return;
          }
          res.send("Data updated successfully");
        });
      } else {
        res.status(404).send("Data not found");
      }
    } catch (error) {
      console.error("Error parsing JSON:", error);
      res.status(500).send("Error parsing JSON");
    }
  });
});

// Define a route to delete data (Delete operation)
app.delete("/data/:id", (req, res) => {
  const idToDelete = req.params.id; // Assuming ID to delete is passed in URL parameter

  // Read the existing data from the JSON file
  const filePath = path.join(__dirname, "data", "group.json");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      res.status(500).send("Error reading file");
      return;
    }

    try {
      // Parse the existing JSON data
      const jsonData = JSON.parse(data);

      // Filter out the data with the provided ID
      jsonData.group = jsonData.group.filter(
        (item) => item.id !== parseInt(idToDelete)
      );

      // Write the updated data back to the JSON file
      fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), (err) => {
        if (err) {
          console.error("Error writing file:", err);
          res.status(500).send("Error writing file");
          return;
        }
        res.send("Data deleted successfully");
      });
    } catch (error) {
      console.error("Error parsing JSON:", error);
      res.status(500).send("Error parsing JSON");
    }
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
