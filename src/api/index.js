// Handle all the routing
import express from "express";
import { MongoClient, ObjectID } from "mongodb";
import assert from "assert";
import config from "../server/config";

let mdb; // MongoDB object
MongoClient.connect(config.mongodbUri, {useUnifiedTopology: true}, (err, client) => {
	assert.equal(null, err);
	mdb = client.db("test"); // test is the default database
});

const router = express.Router();

router.get("/contests", (req, res) => {
	let contests = {};

	// Retrieve all the contests data (key: _id, value: contest object)
	mdb.collection("contests").find({})
		// Only get the _id, categoryName, and the contestName
		.project({
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

			contests[contest._id] = contest;
		});
});

// Get a dynamic contest ID route
router.get("/contests/:contestId", (req, res) => {
	mdb.collection("contests")
		.findOne({ _id: ObjectID(req.params.contestId) })
		.then(contest => res.send(contest))
		.catch(error => {
			console.error(error);
			res.status(404).send("Bad Request");
		});
});

router.get("/names/:nameIds", (req, res) => {
	// Extract each comma-separated name ID
	const nameIds = req.params.nameIds.split(",").map(ObjectID);
	let names = {};

	// Find all the names for each name ID
	mdb.collection("names").find({ _id: {$in: nameIds} })
		.each((err, name) => {
			assert.strictEqual(null, err);

			if (!name) {
				// No more names (make the key names)
				res.send({ names });
				return;
			}

			names[name._id] = name;
		});
});

router.post("/names", (req, res) => {
	// Read the request body and send the new name as JSON
	const contestId = ObjectID(req.body.contestId);
	const name = req.body.newName;

	// Insert the new name into names
	mdb.collection("names").insertOne({ name }).then(result =>
		// Find the contest associated with the name and add it to the name IDs
		mdb.collection("contests").findOneAndUpdate(
			{ _id: contestId }, // query to find the contest
			// result.insertedId = the _id of the inserted object
			{ $push: { nameIds: result.insertedId } }, // modify the name IDs
			{ returnOriginal: false } // return the updated collection
		).then(doc =>
			res.send({
				// doc.value = updated contests collection
				updatedContest: doc.value,
				newName: { _id: result.insertedId, name }
			})
		)
	).catch(error => {
		console.error(error);
		res.status(404).send("Bad Request");
	});
});

export default router;
