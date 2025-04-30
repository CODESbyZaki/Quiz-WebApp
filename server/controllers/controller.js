import Questions from "../models/questionSchema.js";
import Results from "../models/resultSchema.js";
import questions, {answers} from "../database/data.js  "
// Controller functions
export const getQuestions = async (req, res) => {
    try {
        // Simulate fetching questions data
        const q = await Questions.find()
        res.json(q)
    } catch (error) {
        res.status(500).json('Error fetching questions data');
    }
};

// export const addQuestions = async (req, res) => {
//     try {
//         const data = await Questions.insertMany({ questions, answers}, function(err, data){})
//             res.json({ msg: "Data Saved Successfully...!", data})
//     } catch (error) {
//         res.json({error})
//     }
// };


export const addQuestions = async (req, res) => {
    try {
        const data = await Questions.insertMany({ questions, answers });
        res.json({ msg: "Data Saved Successfully!", data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const dropQuestions = async (req, res) => {
    try {
        await Questions.deleteMany();
    res.json({ msg: "Questions Deleted Successfully...!"});

    } catch (error) {
        res.status(500).send('Error deleting questions');
    }
};

export const getResults = async (req, res) => {
    try {
        const r = await Results.find()
        res.json(r)
    } catch (error) {
        res.status(500).send('Error fetching results data');
    }
};

// export const saveResult = async (req, res) => {
//     try {
//         const {username, result, attempts, points, achived} = req.body;
//         if(!username, !result) throw new Error('Data not provided');

//         await Results.create({username, result, attempts, points, achived}, function(err,data){
//             res.json({msg : "Result saved successfully"})
//         })
        
//     } catch (error) {
//         res.status(500).send('Error saving result data');
//     }
// };

export const saveResult = async (req, res) => {
    try {
        const result = await Results.create({
            username: req.body.username,
            result: req.body.result,
            attempts: req.body.attempts,
            points: req.body.points,
            achieved: req.body.achieved,
        });
        res.json({ msg: "Result saved successfully!", result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteResult = async (req, res) => {
    try {
        await Results.deleteMany();
        res.json({ msg: "Result Deleted Successfully...!"})
    } catch (error) {
        res.status(500).send('Error deleting result data');
    }
};


