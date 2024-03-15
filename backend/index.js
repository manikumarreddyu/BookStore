import express from 'express';
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import booksRoute from './routes/booksRoute.js';
import cors from 'cors';

const app = express();

// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS POLICY
// Option 1: Allow All Origins with Default of cors(*)
app.use(cors());
// Option 2: Allow Custom Origins
// app.use(
//   cors({
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type'],
//   })
// );

app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('Welcome To MERN Stack Tutorial');
});

app.use('/books', booksRoute);

mongoose
    .connect(mongoDBURL)
    .then(() => {
        console.log('App connected to database');
        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });


// import express from "express";
// import { PORT, mongoDBURL } from "./config.js";
// import mongoose from "mongoose";
// import { Book } from "./models/bookModel.js";

// const app = express();

// app.use(express.json());

// app.get('/', (request, response) => {
//     console.log(request)
//     return response.status(234).send("welcome to book store")
// });

// //Route for save a new book

// app.post('/books',async(request,response)=>{
//     try{
//         if(!request.body.title ||
//             !request.body.author||
//             !request.body.publishYear)
//             {
//                 return response.status(400).send({
//                     message:'send all required fields:title,author,publisher',
//                 });
//             }
//             const newBook={
//                 title:request.body.title,
//                 author:request.body.author,
//                 publishYear:request.body.publishYear,
//             };
//             const book=await Book.create(newBook);
//             return response.status(201).send(book);
//     }catch(error)
//     {
//         console.log(error.message);
//         response.status(500).send({message:error.message});
//     }
// });

// app.get('/books',async(request,response)=>{
//     try{
//         const books=await Book.find({});
//         return response.status(200).json({
//             count:books.length,
//             data:books
//         });
//     }catch(error)
//     {
//         console.log(error.message);
//         response.status(500).send({message:error.message});
//     }
// });

// //route for get one book from database by id
// app.get('/books/:_id',async(request,response)=>{
//     try{
//         const{ _id }=request.params;
//         const book=await Book.findById({_id});
//         return response.status(200).json(book);
//     }
//     catch(error)
//     {
//         console.log(error.message);
//         response.status(500).send({message:error.message});
//     }
// });

// mongoose.connect(mongoDBURL).then(() => {
//     console.log('app connected to data base');
//     app.listen(PORT, () => {
//         console.log(`App is listening to port: ${PORT}`)
//     })
// }).catch((error) => {
//     console.log(error);
// });

