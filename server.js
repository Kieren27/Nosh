const http = require("http")
const chalk = require("chalk")
const app = require("./app")
 
const PORT = process.env["PORT"] ?? 3000
const server = http.createServer(app)

server.listen(PORT, () => {
  console.log(
    chalk.purple("Server is listening on PORT:"),
    chalk.orange(PORT),
    chalk.pink("Get your routine on!")
  )
})