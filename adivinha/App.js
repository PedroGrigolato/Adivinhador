import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';

export default function App() {
  const [randomNumber, setRandomNumber] = useState(null);
  const [guess, setGuess] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [message, setMessage] = useState('');
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = () => {
    setRandomNumber(Math.floor(Math.random() * 100) + 1);
    setGuess('');
    setAttempts(0);
    setMessage('');
    setGameOver(false);
  };

  const handleGuess = () => {
    const userGuess = parseInt(guess);
    
    if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
      Alert.alert('Por favor, digite um número válido entre 1 e 100');
      return;
    }

    const newAttempts = attempts + 1;
    setAttempts(newAttempts);

    if (userGuess === randomNumber) {
      setMessage('Parabéns, você acertou!');
      setGameOver(true);
    } else if (newAttempts >= 5) {
      setMessage(`Você perdeu! O número era ${randomNumber}. Tente novamente.`);
      setGameOver(true);
    } else {
      setMessage(
        userGuess < randomNumber 
          ? 'O número é maior. Tente novamente!' 
          : 'O número é menor. Tente novamente!'
      );
      setGuess('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Adivinhe o Número (1-100)</Text>
      <Text style={styles.attempts}>Tentativas: {attempts}/5</Text>
      
      {!gameOver && (
        <>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={guess}
            onChangeText={setGuess}
            placeholder="Digite seu palpite"
          />
          <Button title="Adivinhar" onPress={handleGuess} />
        </>
      )}
      
      <Text style={styles.message}>{message}</Text>
      
      {gameOver && (
        <Button title="Jogar Novamente" onPress={startNewGame} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  attempts: {
    fontSize: 18,
    marginBottom: 20,
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
    backgroundColor: 'white',
  },
  message: {
    fontSize: 18,
    marginVertical: 20,
    textAlign: 'center',
    color: '#333',
  },
});