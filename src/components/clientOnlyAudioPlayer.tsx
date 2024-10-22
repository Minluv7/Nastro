// components/ClientOnlyAudioPlayer.tsx
"use client"; // Deze component is een Client Component

import AudioPlayer from './audioPlayer'; 

export default function ClientOnlyAudioPlayer() {
  return <AudioPlayer />;
}
