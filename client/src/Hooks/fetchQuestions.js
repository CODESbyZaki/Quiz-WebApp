import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
// redux actions
import * as Action from '../redux/question_reducer';
import { getServerData } from "../helper/helper";

// fetch question hook to fetch api data and set value to store
export const useFetchQuestion = () => {
    const dispatch = useDispatch();

    const [getData, setGetData] = useState({ 
        isLoading: false, 
        apiData: [], 
        serverError: null 
    });

    useEffect(() => {
        const fetchQuestions = async () => {
            setGetData(prev => ({ ...prev, isLoading: true }));

            try {
                // Simulating an API call with static data
                
                const [{questions, answers}] =  await getServerData('http://localhost:5000/api/questions')

                console.log({questions, answers});
                

                if (questions.length > 0) {
                    setGetData({ isLoading: false, apiData:{questions, answers}, serverError: null });

                    // Dispatch actions to Redux store
                    dispatch(Action.startExamAction({question : questions, answers}));
                } else {
                    throw new Error("No question available");
                }
            } catch (error) {
                setGetData({ 
                    isLoading: false, 
                    apiData: [], 
                    serverError: error.message // Store error message
                });
            }
        };

        fetchQuestions(); // Call the async function
    }, [dispatch]);

    return [getData, setGetData];
};

// MoveAction Dispatch Function
export const MovePrevQuestion = ()=> async (dispatch)=>{
    try {
        dispatch(Action.movePrevAction())
    } catch (error) {
        console.log(error);
    }
}
export const MoveNextQuestion = ()=> async (dispatch)=>{
    try {
        dispatch(Action.moveNextAction())
    } catch (error) {
        console.log(error);
    }
}
