const express = require("express");
const router = express.Router();
const Movie = require("../../db/schemas/movieschemas");

//router.get("/", async(req, res) => {
   // const Movies = await Movie.find();
    //res.json(Movies);
//});

router.get("/", async (req, res) => {
    const queryParams = req.query;
    const filters = {};
    if (queryParams.name) {
        filters.name = {
            $regex: `^${queryParams.name}`,
            $options: "i",
        };
    }
    if (queryParams.rating) {
        filters.rating = {
            $gte: parseFloat(queryParams.rating),
        };
    }
    const movies = await Movie.find(filters);
    res.json(movies);
});


router.post("/", async (req, res) => {
    try {
    console.log(req.body);
    const moviesData = req.body;
    const newMovie = new Movie(moviesData);
    await newMovie.save();
    res.json({
        message: "movie added sucessfully",
    });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error",
        });
    }
});    

router.put("/:id", async (req, res) => {
    try{
        const movieId = req.params.id;
        const updatedMovieData = req.body;
        await Movie.findByIdAndUpdate(movieId, updatedMovieData)
        res.json({
            message: "Movie updated sucessfully",
        });
    }   catch (error) {
        console.log(error);
        res.status(400).json({
            message: "Internal Server Error",
        });
    }
});

router.delete("/:id", async (req, res) => {
    try{
        const movieId = req.params.id;
        await Movie.findByIdAndDelete(movieId)
        res.json({
            message: "Movie deleted sucessfully",
        });
    }   catch (error) {
        console.log(error);
        res.status(400).json({
            message: "Internal Server Error",
        });
    }
});

router.get("./id", async (req,res) => {
    try{
        const movieId = req.prams.id;
        console.log("Handling the get ny id request");
        const movie = await Movie.findById(movieId);
        res.json( movie);
    }  catch(error) {
       if (error.kind === "ObjectId") {
          res.status(404).json ({message: "Movie not found"})
        } else{
         res.status(500).json({message: "Internal Server Error"})
        }

 
    }
});    

router.get("/", async (req, res) => {
    const queryParams = req.query;
    const filters = {};
    if (queryParams.name) {
        filters.name = {
            $regex: '^$(queryParams.name)',
            $options: "i",
        };
    }
    if (queryParams.rating) {
        filters.rating = {
            $gte: parseFloat(queryparams.rating),
        };
    }
    const movies = await Movie.find(filters);
    res.json(movies);
});


module.exports = router;
