import React, {useEffect, useState} from 'react';
import axios from "axios";
import '../styles/QuestionsDisplay.css'

const QuestionsDisplay = ({score, user, id}) => {

    const [questions, setQuestions] = useState([]);
    const [question, setQuestion] = useState("");
    const [response, setResponse] = useState("");
    const [userResponse, setUserResponse] = useState("");
    const [currentQuestion, setCurrentQuestion] = useState(user.userProgression);
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

    const checkResponse = () => {
        if (userResponse.toLowerCase() === response) {
            score.setScore(score.score + 1);
            setBonneReponse(true);
        }
        else {
            if (score.score > 0) {
                score.setScore(score.score - 1);
            }
            setBonneReponse(false);
        }
        // updateScoreAndProgression();
        setUserResponse("");
        setDisplayMessage(true);
    }
    const fetchData = async() => {
        await axios
            .get("http://localhost:8000/api/questions")
            .then((response) => setQuestions(response.data))
    }

    // const updateScoreAndProgression = async () => {
    //     await axios
    //         .put(`http://localhost:8000/api/joueur/update/${id}`, {
    //             progression : user.userProgression,
    //             points : user.userScore
    //         })
    // }

    const replay = () => {
        setMessageFinal(false);
        changeQuestion();
    }

    function jeu() {
        return (
            <div className="jeu">
                <h3>Question {currentQuestion} / {questions.length}</h3>
                <p>Votre score : {score.score}</p>
                <h1 id="h1">{question}</h1>
                {
                    displayMessage ?
                        <>
                            {
                                bonneReponse ?
                                    <p>La réponse était bien {response}, vous gagnez 1 point</p>
                                    :
                                    <p>Mauvaise réponse, la réponse attendue était : {response}, vous perdez 1 point</p>
                            }
                            <button onClick={() => {changeQuestion()}}>Question suivante</button>
                        </>
                        :
                        <div id="button-valider">
                            <input id="input" type={"text"} placeholder="Votre réponse ici..." onChange={(e) => setUserResponse(e.target.value)} value={userResponse}/>
                            <button onClick={() => checkResponse()}>Valider →</button>
                        </div>
                }
            </div>
        )
    }
    return (
        <div id="main">
            {
                !messageFinal ?
                    !ready ?
                        <button onClick={() => {changeQuestion(), setReady(true)}}>Prêt à jouer ?</button>
                    :
                       jeu()
                :
                    <div className="jeu">
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
