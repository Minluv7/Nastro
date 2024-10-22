import { useRef, useState } from 'react';

export default function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);  // Default: niet aan het spelen

  // Functie om de audio aan/uit te zetten
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();  // Pauzeer de audio
      } else {
        audioRef.current.play().catch((error) => {
          console.error("Playback failed:", error);
        });   // Speel de audio af
      }
      setIsPlaying(!isPlaying);    // Wissel de speelstatus
    }
  };

  return (
    <div className='float-right fixed top-[44rem] right-[3rem]'>
      {/* Button voor aan-/uitzetten van de audio */}
      <button
        type="button"
        className="btn btn-primary btn-md audio-btn bg-slate-300 p-4 rounded-md"
        onClick={togglePlay}  // Gebruik de toggle functie
      >
        {isPlaying ? (
          // Pauze-icoon als de audio speelt
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 16 16"
            height="20"
            width="20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M8 2.81v10.38c0 .67-.81 1-1.28.53L3 10H1c-.55 0-1-.45-1-1V7c0-.55.45-1 1-1h2l3.72-3.72C7.19 1.81 8 2.14 8 2.81zm7.53 3.22l-1.06-1.06-1.97 1.97-1.97-1.97-1.06 1.06L11.44 8 9.47 9.97l1.06 1.06 1.97-1.97 1.97 1.97 1.06-1.06L13.56 8l1.97-1.97z"
            ></path>
          </svg>
        ) : (
          // Play-icoon als de audio gepauzeerd is
          <svg
            stroke="currentColor"
            strokeWidth="0"
            viewBox="0 0 16 16"
            height="20"
            width="20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M12 8.02c0 1.09-.45 2.09-1.17 2.83l-.67-.67c.55-.56.89-1.31.89-2.16 0-.85-.34-1.61-.89-2.16l.67-.67A3.99 3.99 0 0 1 12 8.02zM7.72 2.28L4 6H2c-.55 0-1 .45-1 1v2c0 .55.45 1 1 1h2l3.72 3.72c.47.47 1.28.14 1.28-.53V2.81c0-.67-.81-1-1.28-.53zm5.94.08l-.67.67a6.996 6.996 0 0 1 2.06 4.98c0 1.94-.78 3.7-2.06 4.98l.67.67A7.973 7.973 0 0 0 16 8c0-2.22-.89-4.22-2.34-5.66v.02zm-1.41 1.41l-.69.67a5.05 5.05 0 0 1 1.48 3.58c0 1.39-.56 2.66-1.48 3.56l.69.67A5.971 5.971 0 0 0 14 8.02c0-1.65-.67-3.16-1.75-4.25z"
            ></path>
          </svg>
        )}
      </button>

      {/* Audio element */}
      <audio ref={audioRef} loop>
        <source src="music/duduk-and-ney.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}
