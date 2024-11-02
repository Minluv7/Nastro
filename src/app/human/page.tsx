"use client";
import { useEffect, useState } from 'react';

export default function Human() {
  interface Aura {
    name: string;
    svg: string;
    description: string;
    location: string;
    color: string;
  }

  const [auraColors, setAuraColors] = useState<Aura[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAura, setSelectedAura] = useState<Aura | null>(null); // State for the selected aura
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility

  useEffect(() => {
    const fetchAuraColors = async () => {
      try {
        const response = await fetch('/database/auraColors.json');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setAuraColors(data.auraColors);
      } catch (error) {
        console.error('Failed to fetch aura colors:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAuraColors();
  }, []);

  const openModal = (aura: Aura) => {
    setSelectedAura(aura);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedAura(null);
    setIsModalOpen(false);
  };

  return (
    <div>
      <h1 className="text-3xl uppercase font-bold mb-6">Human</h1>
      <div>
        <p>A human being has an aura, an energetic field that surrounds us and reflects our physical, emotional, mental, and spiritual state. This energy field is subtle, but many believe it influences how we feel, how others perceive us, and how we interact with the world around us. The aura can take on different colors, which are associated with the emotions, thoughts, and energies a person is emitting at any given moment.</p>
        <p className="pt-4">Auras consist of multiple layers or dimensions, often referred to as the physical, emotional, mental, and spiritual layers. Each layer has its own frequency and is connected to a specific aspect of our experience. The colors of the aura can vary from bright, vibrant tones to darker or more muted hues, depending on a person&apos;s inner state. A bright, strong aura is often associated with a healthy, balanced life, while dark or cloudy auras may indicate stress, negative emotions, or physical discomfort.</p>
        <p className="pt-4">Each color in the aura carries its own meaning. For example, a blue aura can signify calm, wisdom, and communication, while a red aura represents energy, passion, and sometimes anger. Green is often linked to healing and balance, while yellow symbolizes creativity and intellect. However, the aura is not static; it changes constantly in response to our emotions, thoughts, and physical condition. Someone going through a period of sadness or stress may have a cloudy aura, while practices like meditation or spending time in nature can help clear and strengthen the aura.</p>
        <p className="pt-4">In spiritual traditions, it is often believed that auras are not only visible to those with a highly developed sixth sense but that they can also influence our interactions with others. A strong, positive energy field can attract people and create a sense of comfort or safety, while a weak or disturbed aura may cause discomfort in others.</p>
        <p className="py-4">Some people consciously try to strengthen or cleanse their aura through meditation, breathing techniques, energy healing, or working with crystals. This is done to release negative energies and bring the aura into balance, which in turn may improve physical and mental health. Additionally, auras are sometimes linked to chakras, the energy centers in the body that are each connected to different aspects of our health and well-being.</p>
      </div>

      <h2 className='uppercase text-xl'>Aura Colors</h2>
      {loading ? (
        <p>Loading aura colors...</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {auraColors.map((aura) => (
            <li
              key={aura.name}
              className="flex flex-col items-center shadow-md p-4 rounded-lg transform transition-transform duration-300 hover:scale-105 cursor-pointer"
              onClick={() => openModal(aura)} // Open modal on click
            >
              <div dangerouslySetInnerHTML={{ __html: aura.svg }} />
              <h2 className="text-xl uppercase font-semibold mt-4">{aura.name}</h2>
            </li>
          ))}
        </ul>
      )}

      {/* Modal for aura description */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
            {selectedAura && (
              <>
                <h2 className="text-2xl text-background font-bold mb-4">{selectedAura.name}</h2>
                <p className='text-background pb-4'>Location: {selectedAura.location}</p>
                <p  className='text-background pb-4'>Color: {selectedAura.color}</p>
                <p className='text-background'>{selectedAura.description}</p>
              </>
            )}
            <button
              className="mt-6 bg-background text-white px-4 py-2 rounded-lg"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}

      <div className='flex items-center flex-col gap-8'>
      <h2 className="uppercase text-xl">Opening Chakra&apos;s with Avatar</h2>
        <div className="responsive-container">
          <iframe
            src="https://www.youtube.com/embed/cH-HT9WCtiQ?si=AsJUZdUYU0lFCOCa&amp;start=4"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </div>
  );
}
