'use client';

import {
  ChannelProvider,
  useAbly,
  usePresence,
  usePresenceListener,
  AblyProvider,
} from 'ably/react';
import Ably from 'ably';

function generateRandomId() {
  return Math.random().toString(36).substr(2, 9);
}

export default function PresenceClient() {
  const key = process.env.NEXT_PUBLIC_ABLY_API_KEY;

  if (key === undefined || key.length === 0) {
    throw Error(
      'NEXT_PUBLIC_ABLY_API_KEY not set in environment. See README for instructions.'
    );
  }

  const client = new Ably.Realtime({
    key,
    clientId: generateRandomId(),
    logLevel: 1,
  });

  return (
    <AblyProvider client={client}>
      <ChannelProvider channelName='your-channel-name'>
        <PresenceClientChild></PresenceClientChild>
      </ChannelProvider>
    </AblyProvider>
  );
}

function PresenceClientChild() {
  const ably = useAbly();
  const { updateStatus } = usePresence(
    { channelName: 'your-channel-name' },
    { foo: 'bar' }
  );
  const { presenceData } = usePresenceListener(
    { channelName: 'your-channel-name' },
    (update) => {
      console.log(update);
    }
  );

  const presentClients = presenceData.map((msg, index) => (
    <li key={msg.clientId}>
      {msg.clientId}: {JSON.stringify(msg.data)}
    </li>
  ));

  return (
    <main>
      <br />
      <div>I am: {ably.auth.clientId}</div>
      <div>UsePresenceModes</div>
      <h2>Present Clients</h2>
      <ul>{presentClients}</ul>
    </main>
  );
}
