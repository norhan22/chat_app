# chat app

## Websockets

- WebSocket is a protocol 
- it is providing full-duplex communication channels over a single TCP connection. Where as, HTTP providing half-duplex communication.
    -  **TCP / IP** :
       **T**ransmission **C**ontrol **P**rotocol/**I**nternet **P**rotocol
       -   a
       communications protocol for computer networks, the main protocol for the
       internet. *(Transport layer)*
    - **full-duplex** :  describes simultaneous data transmission and receptions over one channel.
    - **Half-duplex** devices can only transmit in one direction at one time.
      Data can move in two directions, but not at the same time. 
      
      <img src="https://www.comms-express.com/infozone/wp-content/uploads/2017/01/half-full-duplex.png">


- The WebSocket API is an advanced technology that makes it possible to open a
two-way interactive communication session between the user's browser and a
server. With this API, you can send messages to a server and receive
event-driven responses without having to poll the server for a reply.

- WebSockets are useful when the server needs to push some real time information to the client about some events that happened on the server. This avoids the client making multiple polling HTTP requests to verify if some event has occurred on the server.