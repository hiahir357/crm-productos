import request from "supertest"
import server from "../../server"

describe("POST /api/products", () => {

    it("should display validation errors", async () => {
        const response = await request(server).post("/api/products").send({})

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("errors")
        expect(response.body.errors).toHaveLength(4)
        
        expect(response.status).not.toBe(201)
        expect(response.body.errors).not.toHaveLength(3)

    })

    it("should validate that the price is greater than 0", async () => {
        const response = await request(server).post("/api/products").send({
            name: "Mouse Optico",
            price: 0
        })

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("errors")
        expect(response.body.errors).toHaveLength(1)
        
        expect(response.status).not.toBe(201)
        expect(response.body.errors).not.toHaveLength(3)

    })

    it("should validate that the price is a valid number and greater than 0", async () => {
        const response = await request(server).post("/api/products").send({
            name: "Mouse Optico",
            price: "Foo"
        })

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("errors")
        expect(response.body.errors).toHaveLength(2)
        
        expect(response.status).not.toBe(201)
        expect(response.body.errors).not.toHaveLength(3)

    })

    it("should create a new product", async() => {
        const response = await request(server).post("/api/products").send({
            name: "Mouse Optico",
            price: 12.3
        })

        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty("data")
        
        expect(response.status).not.toBe(400)
        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty("errors")
    })
})

describe("GET /api/products", () => {

    it("should check if /api/products url exists", async () => {
        const response = await request(server).get("/api/products")
        expect(response.status).not.toBe(404)
    })

    it("should return a json response with products", async () => {
        const response = await request(server).get("/api/products")

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty("data")
        expect(response.headers["content-type"]).toMatch(/json/)
        expect(response.body.data).toHaveLength(1)
        expect(response.body).not.toHaveProperty("errors")
    })
})

describe("GET /api/products/:id", () => {
    it("Should return a 404 response for a non-existent product", async () => {
        const noExistentProductId = 2000;
        const response = await request(server).get(`/api/products/${noExistentProductId}`)
        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty("error")
        expect(response.body.error).toBe("Producto no encontrado")
    })

    it("Should check a valid id in the url", async () => {
        const notValidProductId = "foo";
        const response = await request(server).get(`/api/products/${notValidProductId}`)
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("errors")
        expect(response.body.errors).toHaveLength(1)
        expect(response.body.errors[0].msg).toBe("Id no válido")
    })

    it("Should get a json response for a single product", async () => {
        const productId = 1;
        const response = await request(server).get(`/api/products/${productId}`)
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty("data")
    })
})

describe("PUT /api/products/:id", () => {

    it("Should check a valid id in the url", async () => {
        const notValidProductId = "foo";
        const response = await request(server).put(`/api/products/${notValidProductId}`).send({
            name: "Mouse Optico",
            availability: true,
            price: 40
        })

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("errors")
        expect(response.body.errors).toHaveLength(1)
        expect(response.body.errors[0].msg).toBe("Id no válido")
    })

    it("Should display validation error messages when updating a product", async () => {
        const response = await request(server).put("/api/products/1").send({})
        expect(response.status).toBe(400)
        expect(response.body.errors).toBeTruthy()
        expect(response.body.errors).toHaveLength(5)
        
        expect(response.body).not.toHaveProperty("data")
        expect(response.status).not.toBe(200)
    })

    it("Should validate that the price is greater than 0", async () => {
        const response = await request(server).put("/api/products/1").send({
            name: "Mouse Optico",
            availability: true,
            price: -40
        })
        expect(response.status).toBe(400)
        expect(response.body.errors).toBeTruthy()
        expect(response.body.errors).toHaveLength(1)
        expect(response.body.errors[0].msg).toBe("Precio no válido")
        
        expect(response.body).not.toHaveProperty("data")
        expect(response.status).not.toBe(200)
    })

    it("Should return a 404 response for a non-existent product", async () => {
        const noExistentProductId = 2000;
        const response = await request(server).put(`/api/products/${noExistentProductId}`).send({
            name: "Mouse Optico",
            availability: true,
            price: 40
        })
        
        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty("error")
        expect(response.body.error).toBe("Producto no encontrado")
    })

    it("Should update an existing product with valid data", async () => {
        const productId = 1;
        const response = await request(server).put(`/api/products/${productId}`).send({
            name: "Mouse Optico",
            availability: true,
            price: 40
        })
        
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty("data")

        expect(response.status).not.toBe(400)
        expect(response.body).not.toHaveProperty("errors") 
    })

})

describe("PATCH /api/products/:id", () => {

    it("Should check a valid id in the url", async () => {
        const notValidProductId = "foo";
        const response = await request(server).patch(`/api/products/${notValidProductId}`)

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("errors")
        expect(response.body.errors).toHaveLength(1)
        expect(response.body.errors[0].msg).toBe("Id no válido")
    })


    it("Should return a 404 response for a non-existent product", async () => {
        const noExistentProductId = 2000;
        const response = await request(server).patch(`/api/products/${noExistentProductId}`)
        
        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty("error")
        expect(response.body.error).toBe("Producto no encontrado")
    })

    it("Should update an existing product", async () => {
        const productId = 1;
        const response = await request(server).patch(`/api/products/${productId}`)
        
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty("data")
        expect(response.body.data.availability).toBe(false)

        expect(response.status).not.toBe(404)
        expect(response.status).not.toBe(400)
        expect(response.body).not.toHaveProperty("errors") 
    })

})

describe("DELETE /api/products/:id", () => {
    it("Should check a valid id", async () => {
        const notValidProductId = "foo";
        const response = await request(server).delete(`/api/products/${notValidProductId}`)
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty("errors")
        expect(response.body.errors).toHaveLength(1)
        expect(response.body.errors[0].msg).toBe("Id no válido")
    })

    it("Should return a 404 response for a non-existent product", async () => {
        const noExistentProductId = 2000;
        const response = await request(server).delete(`/api/products/${noExistentProductId}`)
        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty("error")
        expect(response.body.error).toBe("Producto no encontrado")
        expect(response.status).not.toBe(200)
    })

    it("Should delete an existing product", async () => {
        const productId = 1;
        const response = await request(server).delete(`/api/products/${productId}`)
        
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty("data")
        expect(response.body.data).toBe("Producto Eliminado")

        expect(response.status).not.toBe(400)
        expect(response.status).not.toBe(404)
        expect(response.body).not.toHaveProperty("errors") 
    })
})