import app from "./app";
import AppDataSource from "./data-source";

(async () => {
    await AppDataSource.initialize()
    .catch((err) => {
        console.error("Error during Data source initializations", err)
    })

    const port = process.env.PORT || 3005

    app.listen(port, () => {
        console.log("Server running on http://localhost:" + port)
    })
})()