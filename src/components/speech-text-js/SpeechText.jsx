'use client'
import 'regenerator-runtime/runtime';
import React, { useState } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';


const Dictaphone = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("");

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const startListening = () => {
    console.log('Started listening in', selectedLanguage);
    void SpeechRecognition.startListening({language:selectedLanguage,continuous:true});
  };

  const stopListening = () => {
    console.log('Stopped listening');
   void  SpeechRecognition.stopListening();
  };

  return (
    <div>
      <p>Microphone: {listening ? 'on' : 'off'}</p>

      {/* Start button with language */}
      <button onClick={startListening}>Start</button>

      {/* Stop button */}
      <button onClick={stopListening}>Stop</button>

      {/* Language selection dropdown */}
      <label>
        Select Language:
        <select value={selectedLanguage} onChange={(e)=>{
          setSelectedLanguage(e.target.value);
        }}>
          <option value="en-US">English (US)</option>
          <option value="es-ES">Spanish (Spain)</option>
          {/* Add more language options as needed */}
        </select>
      </label>

      {/* Reset button */}
      <button onClick={resetTranscript}>Reset</button>

      {/* Display transcript */}
      <p>{transcript}</p>
    </div>
  );
};

export default Dictaphone;