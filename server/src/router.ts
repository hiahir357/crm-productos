import { Router } from "express";
import { body, param } from "express-validator";
import { createProduct, getProducts, getProductById, updateProduct, updateAvailability, deleteProduct } from "./handlers/product";
import { handleInputErrors } from "./middlewares";


const router = Router()
/**
 * @swagger
 * components:
 *  schemas:
 *      Product:
 *          type: object
 *          properties:
 *              id:
 *                  type: integer
 *                  description: The Product id
 *                  example: 1
 *              name:
 *                  type: string
 *                  description: The Product name
 *                  example: Monitor Curvo de 49 pulgadas
 *              price:
 *                  type: number
 *                  description: The Product price
 *                  example: 300.12
 *              availability:
 *                  type: boolean
 *                  description: The Product availability
 *                  example: true
 */


/**
 * @swagger
 * /api/products:
 *      get:
 *          summary: Gest a product list
 *          tags:
 *              - Products
 *          description: Return a list of products
 *          responses:
 *              200:
 *                  description: Succesfull response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Product'
 */

router.get("/", getProducts)



/**
 * @swagger
 * /api/products:
 *  post:
 *      summary: Create a new product
 *      tags:
 *          - Products
 *      description: Send a new product for creating it on the database schema
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              example: "Monitor Curvo 49 pulgadas"
 *                          price:
 *                              type: number
 *                              example: 300.12
 *      responses:
 *          201:
 *              description: Product created succesfully
 *          400:
 *              description: Bad Request - Invalid input data
 */
router.post("/",
    // Validacion
    body("name")
        .notEmpty().withMessage("El nombre del producto no puede ir vacío"),
    body("price")
        .isNumeric().withMessage("Valor no válido")
        .notEmpty().withMessage("El precio del producto no puede ir vacío")
        .custom(value => value > 0).withMessage("Precio no válido"),
    handleInputErrors,
    createProduct
)


/**
 * @swagger
 * /api/products/{id}:
 *      get:
 *          summary: Get a product by id
 *          tags:
 *              - Products
 *          description: Returns a product
 *          parameters:
 *            - in: path
 *              name: id
 *              description: The id of the product to retreive
 *              required: true
 *              schema:
 *                  type: integer
 *          responses:
 *              200:
 *                  description: Succesfull response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Product'
 *              404:
 *                  description: Product Not Found
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  error:
 *                                      type: string
 *                                      description: Error message
 *                                      example: Producto no encontrado
 *              400:
 *                  description: Bad Request - Invalid id
 */
router.get("/:id",
    param("id").isInt().withMessage("Id no válido"),
    handleInputErrors,
    getProductById
)



/**
 * @swagger
 * /api/products/{id}:
 *  put:
 *      summary: Updates a product with user input
 *      tags:
 *          - Products
 *      description: Returns the updated product
 *      parameters:
 *            - in: path
 *              name: id
 *              description: The id of the product to update
 *              required: true
 *              schema:
 *                  type: integer
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              example: "Monitor Curvo 49 pulgadas"
 *                          price:
 *                              type: number
 *                              example: 300.12
 *                          availability:
 *                              type: boolean
 *                              example: true
 *      responses:
 *          200:
 *              description: Succesfull response
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          400:
 *              description: Bad Request - Invalid id or invalid input data
 *          404:
 *              description: Product Not Found
 */

router.put("/:id",
    // Validacion
    param("id").isInt().withMessage("Id no válido"),
    body("name")
        .notEmpty().withMessage("El nombre del producto no puede ir vacío"),
    body("price")
        .isNumeric().withMessage("Valor no válido")
        .notEmpty().withMessage("El precio del producto no puede ir vacío")
        .custom(value => value > 0).withMessage("Precio no válido"),
    body("availability")
        .isBoolean().withMessage("Valor para disponibilidad no válido"),
    handleInputErrors,
    updateProduct
)

router.patch("/:id",
    param("id").isInt().withMessage("Id no válido"),
    handleInputErrors,
    updateAvailability
)

router.delete("/:id",
    param("id").isInt().withMessage("Id no válido"),
    handleInputErrors,
    deleteProduct
)

export default router