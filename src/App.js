import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

function App() {
  const [message, setMessage] = useState("");
  const [roomId, setRoomId] = useState("");

  useEffect(() => {
    socket.on("message", (msg) => {
      setMessage(msg);
    });

    return () => {
      socket.disconnect();
    };
  }, []);
  const joinRoomHandler = () => {
    socket.emit("joinRoom", roomId);
  };

  return (
    <div>
      <input
        placeholder="Enter room id = "
        onChange={(e) => setRoomId(e.target.value)}
      />
      <button onClick={joinRoomHandler}>Join</button>
      <h1>Socket.IO React App</h1>
      <p>Message from server: {message}</p>
    </div>
  );
}

export default App;
