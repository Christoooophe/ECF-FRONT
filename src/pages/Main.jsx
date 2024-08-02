import React, {useEffect, useState} from 'react';
import Header from "../components/Header.jsx";
import {useQuestions} from "../hooks/useQuestions.jsx";
import {QuestionsContext} from "../context/QuestionsContext.jsx";
import QuestionsDisplay from "../components/QuestionsDisplay.jsx";
import axios from "axios";

const Main = () => {
    const context = {questions : useQuestions()}
    const [score, setScore] = useState(0)
    const [userScore, setUserScore] = useState(0);
    const [userProgression, setUserProgression] = useState(0);
    const [id, setId] = useState(1722589153682);

    useEffect(() => {
        fetchData();
    }, []);
    const fetchData = async() => {
        await axios
            .get("http://localhost:8000/api/joueurs/"+id)
            .then((response) => {setUserScore(response.data.score), setUserProgression(response.data.progression) })
            .catch((error) => console.log(error))
    }

    return (
        <QuestionsContext.Provider value={context}>
            <Header/>
            <QuestionsDisplay score={{score, setScore}} user={{userScore, setUserScore, userProgression, setUserProgression}} id={id}/>
        </QuestionsContext.Provider>
    );
};

export default Main;
