const WebSocket = require("ws");

// Use host-assigned port, or fallback to 8080 locally
const PORT = process.env.PORT || 8080;

const wss = new WebSocket.Server({ port: PORT });

console.log(`Server running at ws://localhost:${PORT}`);




messages = " \n \n \n \n \n \n \n \n \n>>> This is the Start of the Chat";

// Runs when a browser connects
wss.on("connection", (socket) => {
  console.log("Client connected");
  
  socket.send(messages);

  // Runs when this client sends a message
  socket.on("message", (message) => {
    console.log("Received:", message.toString());
	
	string = message.toString();
	
	//remove all characters up to first newline
	const firstIndex = messages.indexOf("\n")
	messages = messages.substr(firstIndex + 1);
	
	
	//add new message
	messages = messages + "\n" + string;
	
	

	//Sends to everyone
    for (const client of wss.clients) {
	  if (client.readyState === WebSocket.OPEN) { // make sure the client is still connected
		client.send(messages);
	  }
	}

  });

  socket.on("close", () => {
    console.log("Client disconnected");
  });
});

