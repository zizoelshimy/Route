const express = require("express");
const mySQL = require("mysql2");
const app = express();
const port = 3000;

app.use(express.json());

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

const connection = mySQL.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "retail store",
});
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the database.");
});

// Update the price of 'Bread' to 25.00
app.put("/products/bread/price", (req, res) => {
  const query = "UPDATE Products SET Price = ? WHERE ProductName = ?";
  connection.execute(query, [25.0, "Bread"], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({
      message: "Bread price updated successfully",
      affectedRows: results.affectedRows,
    });
  });
});

// Delete the product 'Eggs'
app.delete("/products/eggs", (req, res) => {
  const query = "DELETE FROM Products WHERE ProductName = ?";
  connection.execute(query, ["Eggs"], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({
      message: "Eggs deleted successfully",
      affectedRows: results.affectedRows,
    });
  });
});

// Retrieve the total quantity sold for each product
app.get("/sales/total-quantity", (req, res) => {
  const query = `
    SELECT p.ProductID, p.ProductName, COALESCE(SUM(s.QuantitySold), 0) AS total_quantity_sold
    FROM Products p
    LEFT JOIN Sales s ON p.ProductID = s.ProductID
    GROUP BY p.ProductID, p.ProductName
  `;
  connection.execute(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

//Get the product with the highest stock
app.get("/products/highest-stock", (req, res) => {
  const query = "SELECT * FROM Products ORDER BY StockQuantity DESC LIMIT 1";
  connection.execute(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results[0] || null);
  });
});

//Find suppliers with names starting with 'F'
app.get("/suppliers/starting-with-f", (req, res) => {
  const query = "SELECT * FROM Suppliers WHERE SupplierName LIKE ?";
  connection.execute(query, ["F%"], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

//Show all products that have never been sold
app.get("/products/never-sold", (req, res) => {
  const query = `
    SELECT p.*
    FROM Products p
    LEFT JOIN Sales s ON p.ProductID = s.ProductID
    WHERE s.SaleID IS NULL
  `;
  connection.execute(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

// Get all sales along with product name and sale date
app.get("/sales/with-products", (req, res) => {
  const query = `
    SELECT s.SaleID, p.ProductName AS product_name, s.QuantitySold, s.SaleDate
    FROM Sales s
    INNER JOIN Products p ON s.ProductID = p.ProductID
    ORDER BY s.SaleDate DESC
  `;
  connection.execute(query, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
});

//Revoke UPDATE permission from "store_manager"
app.post("/admin/revoke-update", (req, res) => {
  const query =
    "REVOKE UPDATE ON `retail store`.* FROM 'store_manager'@'localhost'";
  connection.execute(query, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: "UPDATE permission revoked from store_manager" });
  });
});

// Grant DELETE permission to "store_manager" only on the Sales table
app.post("/admin/grant-delete-sales", (req, res) => {
  const query =
    "GRANT DELETE ON `retail store`.Sales TO 'store_manager'@'localhost'";
  connection.execute(query, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({
      message: "DELETE permission granted to store_manager on Sales table",
    });
  });
});
