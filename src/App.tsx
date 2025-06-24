// App.tsx
import React, { useEffect, useRef, useState } from 'react';
import questions from '../questions.json';

const App = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [step, setStep] = useState<'question' | 'success' | 'error' | 'no-audio'>('question');
  const [index, setIndex] = useState(0);
  const [questioning, setQuestioning] = useState(true);

  const current = questions[index];

  const playVideo = (src: string, cb: () => void) => {
    if (videoRef.current) {
      videoRef.current.src = src;
      videoRef.current.onended = cb;
      videoRef.current.play();
    }
  };

  const startListening = () => {
    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    if (!SpeechRecognition) {
      alert('דפדפן לא תומך בזיהוי קולי');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'he-IL';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event: any) => {
      const text = event.results[0][0].transcript.trim();
      console.log('זוהתה תשובה:', text);
      if (text === current.expectedAnswer) {
        setStep('success');
      } else {
        setStep('error');
      }
    };

    recognition.onerror = () => setStep('no-audio');
    recognition.onnomatch = () => setStep('no-audio');

    recognition.start();
  };

  useEffect(() => {
    if (step === 'question') {
      setQuestioning(true);
      playVideo(current.videoUrl, () => {
        startListening();
        setQuestioning(false);
      });
    } else {
      let video = '';
      if (step === 'success') video = 'https://drive.google.com/uc?export=download&id=1ercrBYuWTtc2tw1-NOurZgsRiwsH3avD';
      if (step === 'error') video = 'https://drive.google.com/uc?export=download&id=15Fg0MKVpozpgLFAyrK7082IdF1K-lPg1';
      if (step === 'no-audio') video = 'https://drive.google.com/uc?export=download&id=12ev-DvyhueoSr64lVGz3SfFNV8FgQM0H';

      playVideo(video, () => {
        if (step === 'success') {
          if (index + 1 < questions.length) {
            setIndex(index + 1);
            setStep('question');
          } else {
            alert('סיימת את כל השאלות!');
          }
        } else {
          setStep('question');
        }
      });
    }
  }, [step, index]);

  return (
    <div className="flex justify-center items-center h-screen">
      <video ref={videoRef} controls className="w-full max-w-3xl" />
      {!questioning && <p>האזנה לתשובתך...</p>}
    </div>
  );
};

export default App;
