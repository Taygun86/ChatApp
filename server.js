const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Express.js ile ilgili kodlar buraya eklenebilir
// Mesajları saklayacak bir dizi oluşturalım



let users = {};

// Özel mesaj gönderme işlevi
function sendPrivateMessage( receiverId, message, sender) {
    io.to(receiverId).emit('receiveMessage', message, sender);
}

// Socket.IO ile ilgili kodlar buraya eklenebilir
io.on('connection', (socket) => {
    console.log('Yeni bir kullanıcı bağlandı:', socket.id);

    // Kullanıcı adını al ve kullanıcıları sakla
    socket.on('setUsername', (username) => {
        users[socket.id] = username;
        
     
        console.log('Kullanıcı adı belirlendi:', username);
      
    });

    // Özel mesaj gönderme isteği al
    socket.on('sendMessage', ({  receiver, message,sender }) => {
      console.log("hedef: ",receiver );
        var receiverId = Object.keys(users).find(key => users[key] === receiver); // Kullanıcı adına göre ilgili kullanıcının socket id'sini bulma
        sendPrivateMessage( receiverId, message , sender);
    });

    // Bağlantı kesildiğinde kullanıcıyı kaldır
    socket.on('disconnect', () => {
        delete users[socket.id];
        console.log('Bir kullanıcı ayrıldı:', socket.id);
    });
});


// Socket.IO ile ilgili kodlar buraya eklenebilir

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});