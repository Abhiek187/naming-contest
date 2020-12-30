// Entry point for the server (configured in package.json)
import apiRouter from "../api/"; // extra slash to indicate directory instead of file
import bodyParser from "body-parser";
import config from "./config";
import express from "express";
import path from "path";
import sassMiddleware from "node-sass-middleware";
import serverRender from "./serverRender";

const server = express();
server.use(bodyParser.json()); // parse the body of the POST request

// Convert .scss files into .css files
server.use(sassMiddleware({
	src: path.join(__dirname, "../../sass"),
	dest: path.join(__dirname, "../../dist")
}));

server.set("view engine", "ejs"); // <%= Embedded JavaScript Templating %>

// Allow all pages to be refreshed
server.get(["/", "/contest/:contestId"], (req, res) => {
	serverRender(req.params.contestId)
		.then(({ initialMarkup, initialData }) => {
			// Render index.ejs in the views folder
			res.render("index", {
				initialMarkup,
				initialData
			});
		})
		.catch(error => {
			console.error(error);
			res.status(404).send("Bad Request"); // show a 404 error
		});
});

server.use("/api", apiRouter);
// The dist directory holds the static content
server.use(express.static(path.join(__dirname, "../../dist")));

server.listen(config.port, config.host, () => {
	console.info("Express listening on port ", config.port);
});
