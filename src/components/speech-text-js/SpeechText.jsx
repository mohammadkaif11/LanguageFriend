'use client'
import 'regenerator-runtime/runtime';
import React from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';


const Dictaphone = () => {
    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition,
      } = useSpeechRecognition() ;
              
      return (
        <div>
          <p>Microphone: {listening ? 'on' : 'off'}</p>
          <button onClick={()=>{
            console.log('started');
            void SpeechRecognition.startListening();
          }}>Start</button>
          <button onClick={()=>{
            console.log('started');
            void SpeechRecognition.stopListening();
          }}>Stop</button>
          <button onClick={resetTranscript}>Reset</button>
          <p>{transcript}</p>
        </div>
      );
    
  };
  export default Dictaphone;
  