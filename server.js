import apiRouter from "./api";
import config from "./config";
import sassMiddleware from "node-sass-middleware";
import path from "path";
import serverRender from "./serverRender";
import express from "express";
const server = express();

server.use(sassMiddleware({
	src: path.join(__dirname, "sass"),
	dest: path.join(__dirname, "public")
}));

server.set("view engine", "ejs");

// Allow all pages to be refreshed
server.get(["/", "/contest/:contestId"], (req, res) => {
	serverRender(req.params.contestId)
		.then(({ initialMarkup, initialData }) => {
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
server.use(express.static("public"));

server.listen(config.port, config.host, () => {
	console.info("Express listening on port ", config.port);
});
