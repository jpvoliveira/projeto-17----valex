import express, {json, Request, Response} from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
dotenv.config()

const app = express()

app.use(json())
app.use(cors())

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Running on ${port}`)
})

app.get('/check/:id',(req: Request, res:Response)=>{  
    const {id} = req.params
    res.send({id})
})