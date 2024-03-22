const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

// Define a route to read the JSON file and display data using HTML
app.get("/", (req, res) => {
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

      // Construct HTML content with table rows for each employee
      let htmlContent =
        "<!DOCTYPE html><html><head><title>Employee Data</title></head><body>";
      htmlContent += "<h1>Group 2</h1>";
      htmlContent += "<table border='1'>";
      htmlContent += "<tr><th>Name</th></tr>";

      // Iterate over each employee object in the array
      jsonData.group.forEach((student) => {
        htmlContent += `<tr><td>${student.name}</td></tr>`;
      });

      htmlContent += "</table></body></html>";

      // Send HTML response
      res.send(htmlContent);
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
