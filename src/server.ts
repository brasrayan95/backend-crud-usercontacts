import app from "./app";
import AppDataSource from "./data-source";

(async () => {
    await AppDataSource.initialize()
    .catch((err) => {
        console.error("Error during Data source initializations", err)
    })

    app.listen(3002, () => {
        console.log("Servidor executando")
    })
})()