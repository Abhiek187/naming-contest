import express from "express";
import { MongoClient } from "mongodb";
import assert from "assert";
import config from "../config";

let mdb; // MongoDB object
MongoClient.connect(config.mongodbUri, {useUnifiedTopology: true}, (err, client) => {
	assert.equal(null, err);
	mdb = client.db("test"); // test is the default database
});

const router = express.Router();

router.get("/contests", (req, res) => {
	let contests = {};

	mdb.collection("contests").find({})
		.project({
			id: 1,
			categoryName: 1,
			contestName: 1
		})
		.each((err, contest) => {
			assert.equal(null, err);

			if (!contest) {
				// No more contests (make the key contests)
				res.send({ contests });
				return;
			}

			contests[contest.id] = contest;
		});
});

router.get("/names/:nameIds", (req, res) => {
	// Extract each comma-separated name ID
	const nameIds = req.params.nameIds.split(",").map(Number);
	let names = {};

	// Find all the names for each name ID
	mdb.collection("names").find({ id: {$in: nameIds} })
		.each((err, name) => {
			assert.equal(null, err);

			if (!name) {
				// No more names (make the key names)
				res.send({ names });
				return;
			}

			names[name.id] = name;
		});
});

// Get a dynamic contest ID route
router.get("/contests/:contestId", (req, res) => {
	mdb.collection("contests")
		.findOne({ id: Number(req.params.contestId) })
		.then(contest => res.send(contest))
		.catch(console.error);
});

export default router;
