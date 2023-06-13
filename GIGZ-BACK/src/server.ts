import express from "express";

import v1 from "./v1";
import useDatabase from "./composition/useDatabase";

const app = express();
const port = process.env.PORT || 8080;

const { database } = useDatabase()

app.use(express.json());

app.use(function(req, _, next) {
	console.log("🚥 %s %s", req.method, req.path);
	next();
});

app.use("/api/v1/", v1);

app.listen(port, () => console.log(`🚀 API listening on port ${port}`));
