import React, {useState} from 'react';
import Header from "../components/Header.jsx";
import {useQuestions} from "../hooks/useQuestions.jsx";
import {QuestionsContext} from "../context/QuestionsContext.jsx";
import QuestionsDisplay from "../components/QuestionsDisplay.jsx";

const Main = () => {
    const context = {questions : useQuestions()}
    const [score, setScore] = useState(0)
    return (
        <QuestionsContext.Provider value={context}>
            <Header/>
            <QuestionsDisplay score={{score, setScore}}/>
        </QuestionsContext.Provider>
    );
};

export default Main;
