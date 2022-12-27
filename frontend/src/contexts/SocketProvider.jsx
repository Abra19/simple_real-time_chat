import React, { useMemo } from 'react';

import { SocketContext } from './index.js';

const SocketProvider = ({ api, children }) => {
  const { addNewMessage, addNewChannel } = api;
  const values = useMemo(() => ({ addNewMessage, addNewChannel }), [addNewMessage, addNewChannel]);
  return (
    <SocketContext.Provider value={values}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
