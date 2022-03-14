import express from 'express';

const app = express();

const add = (a: number, b: number): number => a + b;

app.get('/', (req, res) => {
    console.log(add(5, 5))
    res.send('start');
})

app.listen(5000, () => console.log('server running'));