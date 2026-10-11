const app = require("./app");
const sequelize = require("./config/database");
require("./models");

const PORT = process.env.DB_PORT;

app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    console.log("Postgres Sql Database Connected Successfully!");
    await sequelize.sync({ alter: true });
    console.log("Database models synchronized successfully!");

    console.log(`App start On Port : ${PORT}`);
  } catch (error) {
    console.error("Unable to connect database", error);
  }
});
