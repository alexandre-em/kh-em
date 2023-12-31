'use client';
import { Button } from '@mui/material';
import Image from 'next/image';
import React from 'react';

import Footer from '@/components/Footer';
import Linksgroup from '@/components/Linksgroup';
import Navbar from '@/components/Navbar';

const expositions = [
  {
    date: '1995',
    name: 'Le cambodge et ses peintres / Mairie Paris 20',
  },
  {
    date: '1997.04',
    name: 'Pagode de Vincennes / Vincennes',
  },
  {
    date: '2000',
    name: 'Salle de sports / Bussy-Saint-Georges',
  },
  {
    date: '2008.03',
    name: 'Exposition "Au carré" galerie Le Corbusier / Trappes',
  },
  {
    date: '2009.03',
    name: '75e Salon de la Ste Régionale des Beaux-arts / Choisy-le-roi',
  },
  {
    date: '2009',
    name: "CCAThiaisiennes et Ste Regionale des Beaux-arts / Thiais (Prix de l'A.J.E.A.F.O.M)",
  },
  {
    date: '2010',
    name: 'CCAThiaisiennes et Ste Régionale des Beaux-arts / Thiais (Prix des Amis de la Cité)',
  },
  {
    date: '2010',
    name: 'Salon office de Tourisme / Choisy-le-roi',
  },
  {
    date: '2011',
    name: "76e salon de la Ste Régionale des Beaux-arts / Choisy-le-roi (Médaille d'or de la ville de Choisy)",
  },
  {
    date: '2012.10',
    name: "Salon d'automne / Paris Champs Elysées",
  },
  {
    date: '2012.12',
    name: 'Exposition "Espace 7 Parnassiens" / Paris 14',
  },
  {
    date: '2012.12 - 2013-01',
    name: "Salon d'Argenson - Galerie EVERARTS / Paris 14",
  },
  {
    date: '2013',
    name: 'Banque Tarneaud, Exposion: Le Lonzac',
  },
  {
    date: '2014',
    name: 'Exposition Choisy-le-roi',
  },
  {
    date: '2016.03.23-04.02',
    name: 'Exposition Choisy-le-roi, (Prix Amis de la cité: huile 20 "Qui sont-ils?")',
  },
  {
    date: '2016.10.26-11.10',
    name: 'Salon de Thiais (Prix du maire de Thiais: huile 37 Reve animal)',
  },
];

export default function Profile() {
  return (
    <main style={{ height: '100%', overflow: 'auto' }}>
      <Navbar />
      <div className="flex flex-row flex-wrap mt-5 justify-evenly overflow-x-hidden">
        <div>
          <Image
            src="/EM.jpg"
            alt="em"
            loading="lazy"
            width={400}
            height={300}
            className="w-[200px] h-[200px] object-cover sm:h-[300px] sm:w-[300px] mr-5 mb-5 rounded-full"
          />
          <Linksgroup />
        </div>
        <div className="flex flex-col md:w-1/2 w-fit md:m-0 m-2">
          <h1 className="font-extrabold text-2xl text-gray-700">Khindelvert Em</h1>
          <i className="opacity-75 text-sm text-gray-700 font-light mb-5">Artiste peintre-lithographe</i>
          <p className="text-justify mb-2 text-gray-700 opacity-90">
            M. EM Khindelvert, peintre et lithographe Né au Cambodge en 1956, Em Khindelvert vit en France depuis 1973 de ce fait
            il se considère comme français d&apos;origine cambodgienne.
            <br />
            <br />
            Il peint depuis l&apos;âge de 14 ans, il est naturellement porté à s&apos;exprimer à travers l&apos;image. Ainsi,
            quand il arrive en France, à l&apos;âge de 17ans, il continue à être à l&apos;écoute de ses dispositions et traduit,
            sur du papier ou toile, ses divers états d&apos;âme et ses impressions. C&apos;est pour lui l&apos;occasion de
            rencontrer nombre artistes renommés, qui lui font connaître toutes sortes de techniques et de styles. Les techniques
            d&apos;impression le forment à devenir particulièrement habile et précis. Quel que soit le domaine abordé, il essaie
            de faire de son mieux, en étant le plus efficace possible. Aussi, il prend le temps nécessaire pour réaliser les
            choses qui doivent être faite, il analyse chaque élément d&apos;une situation complexe, il observe et médite,
            réfléchit sur les différentes possibilités de procéder avant de prendre une décision.
            <br />
            <br />
            Em est un homme de réflexion mais également d&apos;une sensibilité nourrie par une imagination fertile. L&apos;image
            de son travail artistique est un mélange de culture française et de culture khmère dans ses compositions apparaissent
            des plantes, les animaux et des êtres pleins de vie et de fraîcheur. On y retrouve toujours l&apos;harmonie et le
            bonheur de créer une équilibre entre le passé et sa vie présente et laisse une large place au rêve et à
            l&apos;imaginaire.
            <br />
            <br />
            Les traditions anciennes sont mêlées à sa manière de voir les objets, les êtres et leurs interrelations; une vision
            moderne nourrie par le monde occidental. Il voudrait transmettre la culture cambodgienne aux jeunes générations, sans
            forcement être insistant ni didactique. Honnête envers lui-même, ouvert à tout ce que la vie peut lui offrir, il est
            très changeant dans son expression artistique, qui séduit le regard par un usage étonnant de la couleur. Ses thèmes
            préfères sont la représentation de la femme et sa féminité. Par une association de couleurs qui lui est propre, il met
            en valeur la beauté du corps féminin. Em n&apos;oublie jamais de s&apos;attacher à un détail, de souligner
            l&apos;importance de ce qui peut paraître secondaire dans ses peintures qui fleurissent telles que des fleurs
            exotiques ou s&apos;élèvent telles des flammes. Il sait le pouvoir de la nature et veut représenter sur des
            arrière-plans comiques naturellement puissants, la délicatesse dont sont capables les hommes, et du fragile.
          </p>
          <Button href="https://payload.cargocollective.com/1/19/621815/10023275/chaos_889.jpg">
            Lire &quot;Entre l&apos;ordre et le chaos&quot; écrit par Aline Mori
          </Button>
        </div>
      </div>
      <div className="p-5 font-bold text-2xl bg-gray-400 ">
        <b className="text-gray-600">Exposition</b>
        <div className="flex flex-col flex-wrap text-gray-600 mt-5">
          {expositions.map(({ date, name }) => (
            <div className="flex flex-row flex-wrap text-sm" key={`${date}-${name}`}>
              <div className="flex-[0.25] font-medium">{date}</div>
              <div className="flex-[0.75] font-normal">{name}</div>
            </div>
          ))}
        </div>
      </div>
      <Footer style={{ backgroundColor: '#6b7280', color: 'white' }} />
      <Image
        src="https://storage.googleapis.com/khindelvert-af786.appspot.com/uploads/44039628-4ba4-4966-8a08-fcd42a61de18/27-Les-poules-et-le-coq-56x76-2008_1000.png"
        alt="image"
        loading="lazy"
        width={560}
        height={760}
        className="absolute bottom-0 right-0 z-[-10] w-full mix-blend-darken opacity-20 blur-sm"
      />
    </main>
  );
}
