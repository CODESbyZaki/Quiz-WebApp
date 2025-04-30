import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import {config} from 'dotenv';
import morgan from 'morgan';
import router from './router/route.js';
const app = express();

// import connection file
import connect from './database/conn.js';

// Middleware
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
config();

// routes
app.use('/api', router) /**apis*/

// Default route
app.get('/', (req, res) => {
    try {
        res.json('Get Request');
    } catch (error) {
        res.json(error);
    }
});


// Start the server
const port = process.env.PORT || 8080;

//Start only if we have valid connection
connect().then(()=>{
    try {
        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
    } catch (error) {
        console.log("Cannot connect");
        
    }
}).catch(error =>  {
    console.log("Invalid Database  Connection")
})

export default app;
