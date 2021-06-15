import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";

import postRoutes from "./routes/posts.js";

const CONNECTION_STRING =
	"mongodb+srv://pephan:Aggies0422@cluster0.hgyki.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

// Create express server
const app = express();
// Declare port for express server, either server env or 5000
const PORT = process.env.PORT || 5000;
// Middleware
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/posts", postRoutes);

app.get("/", (req, res) => {
	res.status(200).send(`
    <h1>Hello from API ^.^</h1>
    <pre>
            ______
          &lt; Moo! &gt;
            ------
                  \\   ^__^
                    \\ (oo)\\_______
                      (__)\\       )\\/\\
                          ||----w |
                          ||     ||
    </pre>
  `);
});

// Mongoose helps us connect to MongoDB
mongoose
	.connect(CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
	.catch((error) => console.error(error));
mongoose.set("useFindAndModify", false);
