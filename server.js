// import https from "https";

// https.get("https://www.linkedinlearning.com", res => {
// 	console.log("Response status code: ", res.statusCode);

// 	res.on("data", chunk => {
// 		console.log(chunk.toString());
// 	});
// });

// import http from "http";

// const server = http.createServer();

// server.listen(8080);

// server.on("request", (req, res) => {
// 	res.write("Hello HTTP!\n");
// 	setTimeout(() => {
// 		res.write("I can stream!\n");
// 		res.end();
// 	}, 3000);
// });

import apiRouter from "./api";
import config from "./config";
import express from "express";
const server = express();

server.set("view engine", "ejs");

server.get("/", (req, res) => {
	res.render("index", {
		content: "Hello Express and <em>EJS!</em>"
	});
});

server.use("/api", apiRouter);
server.use(express.static("public"));

server.listen(config.port, () => {
	console.info("Express listening on port ", config.port);
});
