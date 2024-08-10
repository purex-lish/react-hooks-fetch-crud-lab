import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import NewQuestionForm from "./NewQuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);

  // Fetch questions from the API when the component mounts
  useEffect(() => {
    fetch('http://localhost:4000/questions')
      .then(response => response.json())
      .then(data => setQuestions(data))
      .catch(error => console.error('Error fetching questions:', error));
  }, []);

  // Function to add a new question
  const addQuestion = (newQuestion) => {
    fetch('http://localhost:4000/questions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newQuestion),
    })
      .then(response => response.json())
      .then(data => setQuestions([...questions, data]))
      .catch(error => console.error('Error adding question:', error));
  };

  // Function to delete a question
  const deleteQuestion = (id) => {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setQuestions(questions.filter(question => question.id !== id));
      })
      .catch(error => console.error('Error deleting question:', error));
  };

  // Function to update a question
  const updateQuestion = (id, correctIndex) => {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ correctIndex }),
    })
      .then(() => {
        setQuestions(questions.map(question =>
          question.id === id ? { ...question, correctIndex } : question
        ));
      })
      .catch(error => console.error('Error updating question:', error));
  };

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? (
        <NewQuestionForm onAddQuestion={addQuestion} />
      ) : (
        <QuestionList
          questions={questions}
          onDelete={deleteQuestion}
          onUpdate={updateQuestion}
        />
      )}
    </main>
  );
}

export default App;
