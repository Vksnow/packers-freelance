import pool from "./config/dbConfig.js";
import app from "./index.js";


const PORT = process.env.PORT || 5000;

(async () => {
    try {
        const connection = await pool.getConnection();
        console.log("😊 Database connected successfully!");
        connection.release();
        if (connection) {
            await app.listen(PORT, () => {
                console.log(`😎 Server running at http://localhost:${PORT}`);
            })
        }
    } catch (error) {
        console.error("😫 DB connection failed:", error);
        process.exit(1);
    }
}
)()