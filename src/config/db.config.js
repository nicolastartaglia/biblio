module.exports = {
    HOST: "localhost",
    USER: "ntartaglia",
    PASSWORD: "*Manitou1",
    DB: "biblio",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };