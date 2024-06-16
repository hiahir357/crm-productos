import {connectDb} from "../server"
import db from "../config/db"


jest.mock("../config/db")

describe("DB Connection", () => {
    it("Should handle DB connection error", async () => {
        jest.spyOn(db, "authenticate")
            .mockRejectedValueOnce(new Error("Error al conectar a base de datos"))
        
        const consoleSpy = jest.spyOn(console,  "log")
        await connectDb()
        expect(consoleSpy).toHaveBeenCalledWith(
            expect.stringContaining("Error al conectar a base de datos")
        )
    })
})