import React from 'react';
import '../globals.css';
import dynamic from 'next/dynamic';

const PresenceClient = dynamic(() => import('./presence-client.tsx'), {
  ssr: false,
});

const Presence = () => {
  return <PresenceClient />;
};

export default Presence;
