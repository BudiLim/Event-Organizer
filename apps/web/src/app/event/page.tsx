'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import hero from '../../assets/dynamic/hero_landing_page.png';
import hero2 from '../../assets/dynamic/music1.png';
import hero3 from '../../assets/dynamic/Blackpink.png';
import hero4 from '../../assets/dynamic/Marshmello_Fornite_Concert.png';
import hero5 from '../../assets/dynamic/Tim_Renai_Kinshi_Jourei.webp';
import afgan from '../../assets/afgan.png';
import billie_eilish from '../../assets/billie_eilish.png';
import hozier from '../../assets/hozier.png';
import adele from '../../assets/adele.png';
import rf from '../../assets/rizki_febian.png';
import ed_sheeran from '../../assets/ed_sheeran.png';
import black_pink from '../../assets/black_pink.png';
import coldplay from '../../assets/Coldplay.png';
import jkt48 from '../../assets/jkt48.png';
import twice from '../../assets/twice.png';
import one_direction from '../../assets/one_direction.png';
import fifth_harmony from '../../assets/fifth_harmony.png';
import alan_walker from '../../assets/alan_walker.png';
import marshmello from '../../assets/marshmello.png';
import snake from '../../assets/snake.png';
import Link from 'next/link';

const SingleBands = [
  {
    id: 1,
    name: 'Afgan',
    location: 'Jakarta',
    date: '10 - 9 - 2024',
    image: afgan,
  },
  {
    id: 2,
    name: 'Billie Eilish',
    location: 'Jakarta',
    date: '21 - 9 - 2024',
    image: billie_eilish,
  },
  {
    id: 3,
    name: 'Hozier',
    location: 'Bandung',
    date: '15 - 10 - 2024',
    image: hozier,
  },
  {
    id: 4,
    name: 'Adele',
    location: 'Jakarta',
    date: '11 - 10 - 2024',
    image: adele,
  },
  {
    id: 5,
    name: 'Rizki Febian',
    location: 'Bandung',
    date: '24 - 10 - 2024',
    image: rf,
  },
  {
    id: 6,
    name: 'Ed Sheeran',
    location: 'Bandung',
    date: '8 - 12 - 2024',
    image: ed_sheeran,
  },
];

const heroImages = [
  hero,
  hero2,
  hero3,
  hero4,
  hero5,
  // Add any other images you want to use dynamically
];

export default function LandingPage() {
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTransitioning(true);
      setTimeout(() => {
        setCurrentHeroIndex((prevIndex) => {
          const nextIndex = (prevIndex + 1) % heroImages.length;
          setTransitioning(false);
          return nextIndex;
        });
      }, 500); // Match this delay with the transition duration
    }, 7000); // Change image every 4 seconds

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="relative w-full pb-20">
      <div className="relative mx-auto lg:w-[90%] h-[450px] lg:h-screen shadow-lg shadow-slate-500 overflow-hidden rounded-lg">
        <div
          className={`relative w-full h-full transition-all duration-500 ${transitioning ? 'opacity-0' : 'opacity-100'}`}
        >
          <Image
            src={heroImages[currentHeroIndex]}
            alt="hero"
            layout="fill"
            objectFit="cover"
          />
        </div>
      </div>

      <div id="category" className="flex flex-col items-center text-white">
        {/* single band */}

        <h1 className="text-[32px] text-white font-medium py-[35px]">
          Single <span className="font-bold">Band</span>{' '}
        </h1>
        <div className="grid grid-cols-3 gap-20">
          {SingleBands.map((service) => (
            <div key={service.id} className="">
              <Link href={`/event/${service.id}`}>
                <div className="relative w-[300px] h-[450px] shadow-lg shadow-white rounded-[20px] transform transition-transform duration-100 hover:scale-105">
                  <Image src={service.image} alt="afgan" />
                  <div className="absolute inset-0 flex flex-col justify-end items-center">
                    <div className="flex flex-col justify-center items-center bg-black bg-opacity-50 w-full h-[120px] text-xl rounded-b-[20px]">
                      <h1 className="font-bold">{service.name}</h1>
                      <h1>{service.location}</h1>
                      <h1>{service.date}</h1>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
