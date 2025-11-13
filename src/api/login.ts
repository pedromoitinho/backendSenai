import express, {Request, Response, Express} from "express";
import prisma from "../prisma";

export const loginApi: Express = express();
loginApi.use(express.json());

let userAuthenticated:number = 0;

loginApi.post("/", async(req:Request, res:Response) => {
	const {name, password} = req.body;
	if(!name || !password){
		return res.status(400).json({message: "Precisa de nome e senha"});
	};

	try{
		const user = await prisma.user.findUnique({
			where: {name},
		});
		if(name == user.name && password == user.password){
			return res.status(200).json({message: "Login bem-sucedido"});
			userAuthenticated = 1;
		};
		if(name != user.name || password != user.password){
			return res.status(400).json({message: "Login mal feito"});
			userAuthenticated = 0;
		};
	}
	catch(err){
		res.status(400).json({err: "Usuário não encontrado"});
	}
});

loginApi.post("/registro", async(req: Request, res: Response) => {
	const {name, password} = req.body;
	if(!name || !password){
		return res.status(400).json({message: "Precisa de nome e senha"});
	};
	try{
		const user = await prisma.user.create({
			data: {name, password},
		});
		return res.status(201).json({message: user});
	}
	catch(err){
		console.error("Erro ao criar usuário:", err);
		res.status(500).json({err: "Erro ao criar usuário", details: err.message});
	}
});

loginApi.get("/:id", async(req: Request, res: Response) => {
	const {id} = req.params;
	try{
		const user = await prisma.user.findUnique({
			where: {id: parseInt(id)},
		});
		if(!user){
			return res.status(404).json({message: "Usuário não encontrado"});
		}
		return res.status(200).json({message: user});
	}
	catch(err){
		res.status(500).json({err: "Erro ao buscar usuário"});
	}
});


loginApi.use("/health", (_, res: Response) => {
	try{
		res.status(200).json({message: "Login funcionando"});
	}
	catch(err){
		res.status(500).json({message: err});
	};
});

