import {useEffect, useState} from "react";
import axios from "axios";

export const useQuestions = () => {
    const [questions, setQuestions] = useState([]);
    useEffect( () => {
        axios.get("http://localhost:8000/api/questions").then((reponse) => setQuestions(reponse.data))
    }, []);
    const findQuestion = (id) => {
        return questions.find(q => q.id === id)
    }
    return {questions, findQuestion}
}
