// components/AudioPlayer.js
import { useEffect, useRef } from 'react';

export default function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null); // Specificeer het type

  useEffect(() => {
    // Controleer of audioRef.current niet null is voordat je play aanroept
    if (audioRef.current) {
      audioRef.current.play();  // Speel het liedje af zodra de app laadt
    }
  }, []);

  return (
    <audio ref={audioRef} loop controls muted>
      <source src="https://soundcloud.com/selim-ahing-z/huzura-yolculuk-ney-sesi-huzur-veren-muzik-relax-music?utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing" type="audio/mpeg" />
      Your browser does not support the audio element.
    </audio>
  );
}
