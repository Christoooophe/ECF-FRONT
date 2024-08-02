import React, {useEffect, useState} from 'react';
import axios from "axios";

const QuestionsDisplay = () => {

    const [questions, setQuestions] = useState([]);
    const [question, setQuestion] = useState("");
    const [response, setResponse] = useState("");
    const [userResponse, setUserResponse] = useState("");
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const changeQuestion = () => {
        setQuestion(questions[currentQuestion].question);
        setResponse(questions[currentQuestion].reponse);
        setCurrentQuestion(currentQuestion + 1)
    }
    const fetchData = async() => {
        await axios
            .get("http://localhost:8000/api/questions")
            .then((response) => setQuestions(response.data))
    }


    return (
        <div>
            {
                !ready ?
                    <button onClick={() => {changeQuestion(), setReady(true)}}>Prêt à jouer ?</button>
                :
                    <div>
                        <p>{question}</p>
                        <p>{response}</p>
                        <p>{currentQuestion}</p>
                        <p>{userResponse}</p>
                        <input type={"text"} onChange={(e) => setUserResponse(e.target.value)}/>
                        <button onClick={() => {changeQuestion()}}>Question suivante</button>
                    </div>
            }


        </div>
    );
};

export default QuestionsDisplay;
