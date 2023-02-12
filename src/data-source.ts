import "reflect-metadata"
import path from "path"
import { DataSource, DataSourceOptions } from "typeorm";
require("dotenv").config()


const setDataSourceConfig = (): DataSourceOptions => {
    const entitiesPath: string = path.join(__dirname, "./entities/**.{js,ts}");
    const migrationsPath: string = path.join(__dirname, "./migrations/**.{js,ts}");

    if (process.env.NODE_ENV === "production") {
        return {
            type: "postgres",
            url: process.env.DATABASE_URL,
            entities: [entitiesPath],
            migrations: [migrationsPath]
        }
    }

    if (process.env.NODE_ENV === "test") {
        return {
            type: "sqlite",
            database: ":memory:",
            synchronize: true,
            entities: [entitiesPath], 
        };
    }

    return {
        type: "postgres",
        url: process.env.DATABASE_URL,
        ssl: process.env.NODE_END === "production" ?
        {rejectUnauthorized:false} 
        : false,

        logging: true,
        synchronize: false,
        entities: process.env.NODE_ENV === "production" ? ["dist/entities/*.js"] : ['src/entities/*.ts'],
        migrations: process.env.NODE_ENV === "production" ? ["dist/migrations/*.js"] : ['src/migrations/*.ts']
    }





}


const dataSourceConfigs = setDataSourceConfig();
export default new DataSource(dataSourceConfigs);



// const AppDataSource = new DataSource(
//     process.env.NODE_ENV === "test"?
//     {
//         type: "sqlite",
//         database: ":memory:",
//         synchronize: true,
//         entities: ["src/entities/*.ts"]
//     } :
//     {
//         type: "postgres",
//         url: process.env.DATABASE_URL,
//         ssl: process.env.NODE_END === "production" ?
//         {rejectUnauthorized:false} 
//         : false,

//         logging: true,
//         synchronize: false,
//         entities: process.env.NODE_ENV === "production" ? ["dist/entities/*.js"] : ['src/entities/*.ts'],
//         migrations: process.env.NODE_ENV === "production" ? ["dist/migrations/*.js"] : ['src/migrations/*.ts']
//     }
// )

