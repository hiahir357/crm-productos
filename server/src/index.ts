import server from "./server";
import colors from "colors"

server.listen(4000, () => {
    console.log(colors.magenta.bold("Listening on http://localhost:4000/"))
})