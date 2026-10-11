const app = require("./app");
const sequelize = require("./config/database");

const PORT = process.env.DB_PORT;

app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    console.log("Postgres Sql Database Connected Successfully!");
    console.log(`App start On Port : ${PORT}`);
  } catch (error) {
    console.error("Unable to connect database", error);
  }
});
