import "dotenv/config";
import express, {Express, Response} from "express";
import cors from "cors";
import { loginApi } from "./api/login";

const app: Express = express();
const port = process.env.PORT ?? 3000;

app.use(express.json());
app.use(cors());
app.use("/login", loginApi);	

app.get("/", (_, res: Response) => {
	try{
		res.status(200).json({message: "Servidor rodando ok"});
	}
	catch(err){
		res.status(500).json({message: err});
	};
});

app.listen(port, () => {
	try{
		console.log(`Servidor rodando em http://localhost:${port}/`);
	}
	catch(err){
		console.log(err);
	};
});