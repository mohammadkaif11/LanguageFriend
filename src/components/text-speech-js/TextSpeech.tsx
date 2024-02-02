'use client'
import { useState, useEffect } from 'react';

const TextToSpeech = () => {
  const [text, setText] = useState<string>('Hello, this is a sample text.');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('bn-IN');
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);

  useEffect(() => {
    // Fetch the available voices when the component mounts
    if ('speechSynthesis' in window) {
      setVoices(speechSynthesis.getVoices());
      speechSynthesis.addEventListener('voiceschanged', () => {
        setVoices(speechSynthesis.getVoices());
      });
    }
  }, []);

  const speakText = () => {
    try {
      if ('speechSynthesis' in window) {
        const synth = window.speechSynthesis;
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = selectedLanguage;
        console.log(selectedLanguage);
        speechSynthesis.speak(utterance);
      } else {
        console.error('SpeechSynthesis is not supported in this browser.');
      }
    } catch (error) {
      console.log(error);
    }
  
  };

  return (
    <div>
      <textarea value={text} onChange={(e) => setText(e.target.value)} />
      <label>
        Select Language:
        <select value={selectedLanguage} onChange={(e) => setSelectedLanguage(e.target.value)}>
          <option value="en-US">English (US)</option>
          <option value="es-ES">Spanish (Spain)</option>
          <option value="hi-IN">Hindi (India)</option>
          <option value="mr-IN">Marathi (India)</option>
          <option value="kn-IN">kananda (India)</option>
          <option value="ur-IN">urdu (India)</option>
          {/* Add more language options as needed */}
        </select>
      </label>
      <label>
        Select Voice:
        <select
          value={selectedVoice ? selectedVoice.voiceURI : ''}
          onChange={(e) => {
            const selectedVoiceURI = e.target.value;
            const voice = voices.find((v) => v.voiceURI === selectedVoiceURI);
            setSelectedVoice(voice ?? null);
          }}
        >
          {voices.map((voice) => (
            <option key={voice.voiceURI} value={voice.voiceURI}>
              {voice.name}
            </option>
          ))}
        </select>
      </label>
      <button onClick={speakText}>Speak</button>
    </div>
  );
};

export default TextToSpeech;
