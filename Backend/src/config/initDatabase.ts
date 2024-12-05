import sequelize from "./database";

async function initDatabase() {
  try {
    await sequelize.sync({ force: true });
    console.log("✅ Base de données synchronisée avec succès");
  } catch (error) {
    console.error(
      "❌ Erreur lors de la synchronisation de la base de données:",
      error
    );
    throw error;
  }
}

export default initDatabase;
