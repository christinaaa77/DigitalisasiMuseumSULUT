/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import firebase from 'firebase'; 

const TextToSpeech = ({ value }) => {
  const [audioUrl, setAudioUrl] = useState('');

  useEffect(() => {
    const convertTextToSpeech = async (text) => {
      const apiKey = 'AIzaSyAnxGe9WXtL1W0PyRPtZ99UIEdNlJI7hLE';
      const url = 'https://texttospeech.googleapis.com/v1/text:synthesize';

      const requestBody = {
        input: { text: text },
        voice: { languageCode: 'id-ID', name: 'id-ID-Standard-A' },
        audioConfig: { audioEncoding: 'LINEAR16' },
      };

      try {
        const response = await fetch(`${url}?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
          throw new Error('Failed to convert text to speech');
        }

        const responseData = await response.json();
        setAudioUrl(responseData.audioContent);
      } catch (error) {
        console.error('Error converting text to speech:', error);
      }
    };

    if (value) {
      convertTextToSpeech(value);
    }
  }, [value]);

  return (
    <div>
      {audioUrl && (
        <audio controls>
          <source src={`data:audio/wav;base64,${audioUrl}`} type="audio/wav" />
          Your browser does not support the audio element.
        </audio>
      )}
    </div>
  );
};

export default TextToSpeech;
