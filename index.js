const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const courses = [
    { id : 1, name : "Lasse" },
    { id : 2, name : "Henriette" },
    { id : 3, name : "Camilla" }
];

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/api/courses/', (req, res) => {
    res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send('Not found'); // 404
    res.send(course);
});

app.post('/api/courses', (req, res) => {
    const schema = Joi.object({
        name: Joi.string()
            .min(3)
            .required()
    });

    const result = schema.validate(req.body);
    if (result.error) {
        res.status(400).send(result.error.details[0].message);
        return;
    }

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));