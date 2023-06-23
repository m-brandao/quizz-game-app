import React, { useState } from 'react';
import Question from '../Question/Question';
import quizzData from '../QuizzData/quizzData';
import { PDFDownloadLink, Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const Quizz = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [name, setName] = useState('');

    const handleAnswer = (selectedOption) => {
        const currentAnswer = quizzData[currentQuestion].correctAnswer;
        if (selectedOption === currentAnswer) {
            setScore(score + 5);
        }

        if (currentQuestion < quizzData.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            setShowScore(true);
        }
    };

    const handleRestart = () => {
        setCurrentQuestion(0);
        setScore(0);
        setShowScore(false);
        setName('');
    };

    const generatePDF = () => (
        <Document>
            <Page style={styles.page}>
                <View style={styles.section}>
                    <Text style={styles.title}>Quiz Result</Text>
                    <Text style={styles.subtitle}>Name: {name}</Text>
                    <Text style={styles.subtitle}>Score: {score}</Text>
                </View>
            </Page>
        </Document>
    );

    const styles = StyleSheet.create({
        page: {
            fontFamily: 'Helvetica',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: 50,
            paddingBottom: 50,
        },
        section: {
            margin: 10,
            padding: 10,
            flexGrow: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        title: {
            fontSize: 20,
            marginBottom: 20,
            fontWeight: 'bold',
        },
        subtitle: {
            fontSize: 16,
            marginBottom: 10,
        },
    });

    if (showScore) {
        return (
            <div>
                <h2>Quiz Finished!</h2>
                <p>Your final score is: {score}</p>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                />
                <PDFDownloadLink document={generatePDF()} fileName={`quiz_result_${name}.pdf`}>
                    {({ blob, url, loading }) =>
                        loading ? 'Generating PDF...' : 'Download PDF'
                    }
                </PDFDownloadLink>
                <button onClick={handleRestart}>Restart Quiz</button>
            </div>
        );
    }

    return (
        <Question
            question={quizzData[currentQuestion]}
            handleAnswer={handleAnswer}
        />
    );
};

export default Quizz;
