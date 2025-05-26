const socket = io();

socket.on('connect', () => {
  console.log('🟢 Conectado al WebSocket:', socket.id);
});

socket.on('productAdded', (data) => {
  console.log('🆕 Producto agregado vía socket:', data);
});
