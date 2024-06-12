import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';
import quizData from './data/quiz.json'assert { type: 'json' };

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get('/api/quiz', (req, res) => {
  const shuffledQuizData = shuffleQuestions([...quizData.quiz[0].question]).slice(0, 10).map(question => {
    const { correct, ...questionWithoutCorrect } = question;
    return questionWithoutCorrect;
  });
  res.json(shuffledQuizData);
});

app.post('/api/submitQuiz', (req, res) => {
  const userAnswers = req.body.answers;
  let score = 0;
  const questionsAndAnswers = [];
  for (let i = 0; i < userAnswers.length; i++) {
    const question = quizData.quiz[0].question.find(q => q.id === userAnswers[i].questionId);
    let isCorrect = false;
    if (question && userAnswers[i].answer === question.correct) {
      score++;
      isCorrect = true;
    }
    questionsAndAnswers.push({
      question: question.statement,
      userAnswer: userAnswers[i].answer,
      correct: isCorrect
    });
  }
  res.json({ score: score, questionsAndAnswers: questionsAndAnswers });
});

app.get('/translate', async (req, res) => {
  const { text, lang } = req.query;
  try {
    const response = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${lang}&dt=t&q=${encodeURIComponent(text)}`);
    const result = await response.json();
    res.json({ translatedText: result[0][0][0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.toString() });
  }
});

function shuffleQuestions(questions) {
  for (let i = questions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [questions[i], questions[j]] = [questions[j], questions[i]];
  }
  return questions;
}

app.listen(port, () => {
  console.log(`Server is running at port:${port}`);
});
