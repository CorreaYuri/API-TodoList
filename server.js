import express from 'express';
import cors from 'cors';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


const app = express();
const port = 3000;

app.use(express.json());
app.use(cors())




app.get('/tasks', async (req, res) =>{

    let allTasks = [];
    
    if (req.query) {

        allTasks = await prisma.tasks.findMany({

            where: {
                titulo: req.query.titulo 
            }
        })
       

    } else {
        console.log('Nenhum filtro foi aplicado');
        allTasks = await prisma.tasks.findMany()
    }
    
    res.status(200).json(allTasks);



});


app.post('/tasks', async (req, res) => {

    await prisma.tasks.create({
        data: {
            titulo: req.body.titulo,
            dataHora: new Date().toISOString(),
            local: req.body.local,
            descricao: req.body.descricao
        }
    })
    res.status(201).send('Task criada com sucesso!');
});

app.put('/tasks/:id', async (req, res) => {

    await prisma.tasks.update({

        where:{
            id:req.params.id
        },
        data: {
            titulo: req.body.titulo,
            local: req.body.local,
            descricao: req.body.descricao
        }
    })
    console.log(req.body)
    res.status(201).send('Task criada com sucesso!');
});

app.delete('/tasks/:id', async (req, res) => {
    await prisma.tasks.delete({
        where: {
            id: req.params.id
        }
    })
    res.status(200).send('Task deletada com sucesso!');
});


app.listen(port)