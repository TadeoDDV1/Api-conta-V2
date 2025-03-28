const express = require('express');
const app = express();

app.use(express.json());

const tacos = [
    {id: 1, name: 'taco al pastor', price: 15, enroll : true},
    {id: 2, name: 'taco de asada', price: 15, enroll: false},

]

app.get('/', (_req, res)=>{
    res.send('api finanzas')

});

app.get('/api/tacos', (_req, res)=>{
    res.send(tacos)
});

app.get('api/tacos/id', (req,res)=>{
    const taco = tacos.find(c => c.id === parseInt(req.params.id));
    if(!taco) return res.status(404).send('no encontrado');
    else res.send(taco);
})

app.post('/api/tacos', (req, res)=> {
    const taco = {
        id: tacos.length + 1,
        name: req.body.name,
        price: req.body.price,
        enroll: req.body.enroll === 'true'
    };
    tacos.push(taco);
    res.send(taco);
});

app.delete ('api/tacos/:id', (req,res)=>{
    const taco = tacos.find(c => c.id === parseInt(req.params.id));
    if(!taco)return res.status(404).send('no encontrado');
    const index = tacos.indexOf(taco);
    tacos.splice(index, 1);
    res.send(taco);

});

const port = process.env.port || 3000;
app.listen(port, ()=> console.log('escuchado desde el puerto ${PORT}... '));
