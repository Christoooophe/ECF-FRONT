import React from 'react';
import Header from "../components/Header.jsx";
import {useQuestions} from "../hooks/useQuestions.jsx";
import {QuestionsContext} from "../context/QuestionsContext.jsx";
import QuestionsDisplay from "../components/QuestionsDisplay.jsx";

const Main = () => {
    const context = {questions : useQuestions()}
    return (
        <QuestionsContext.Provider value={context}>
            <Header/>
            <QuestionsDisplay/>
        </QuestionsContext.Provider>
    );
};

export default Main;
