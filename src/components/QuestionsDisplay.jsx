import React, {useEffect, useState} from 'react';
import axios from "axios";

const QuestionsDisplay = ({score}) => {

    const [questions, setQuestions] = useState([]);
    const [question, setQuestion] = useState("");
    const [response, setResponse] = useState("");
    const [userResponse, setUserResponse] = useState("");
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [ready, setReady] = useState(false);
    const [bonneReponse, setBonneReponse] = useState(false);
    const [displayMessage, setDisplayMessage] = useState(false);
    const [messageFinal, setMessageFinal] = useState(false)

    useEffect(() => {
        fetchData();
    }, []);

    const changeQuestion = () => {
        if (currentQuestion === questions.length) {
            setMessageFinal(true);
            setCurrentQuestion(0);
            return;
        }
        setDisplayMessage(false);
        setQuestion(questions[currentQuestion].question);
        setResponse(questions[currentQuestion].reponse);
        setCurrentQuestion(currentQuestion + 1)
    }

    const updateScore = () => {
        score.setScore(score.score + 1)
    }

    const checkResponse = () => {
        if (userResponse.toLowerCase() === response) {
            updateScore();
            setBonneReponse(true);
        }
        else {
            setBonneReponse(false);
        }
        setUserResponse("");
        setDisplayMessage(true);
    }
    const fetchData = async() => {
        await axios
            .get("http://localhost:8000/api/questions")
            .then((response) => setQuestions(response.data))
    }

    const replay = () => {
        setMessageFinal(false);
        changeQuestion();
    }

    function jeu() {
        return (
            <div>
                <p>{score.score}</p>
                <p>{question}</p>
                {
                    displayMessage ?
                        <>
                            {
                                bonneReponse ?
                                    <p>La réponse était bien {response}</p>
                                    :
                                    <p>Mauvaise réponse, la réponse attendue était : {response}</p>
                            }
                            <button onClick={() => {changeQuestion()}}>Question suivante</button>
                        </>
                        :
                        <>
                            <input id="input" type={"text"} onChange={(e) => setUserResponse(e.target.value)} value={userResponse}/>
                            <button onClick={() => checkResponse()}>Valider</button>
                        </>
                }
            </div>
        )
    }
    return (
        <div>
            {
                !messageFinal ?
                    !ready ?
                        <button onClick={() => {changeQuestion(), setReady(true)}}>Prêt à jouer ?</button>
                    :
                       jeu()
                :
                    <div>
                        <p>Bravo, vous avez terminé ce quizz !</p>
                        <p>Votre score est de {score.score}</p>
                        <p>Voulez vous rejouer ?</p>
                        <button onClick={() => replay()}>Rejouer</button>
                    </div>
            }


        </div>
    );
};

export default QuestionsDisplay;
