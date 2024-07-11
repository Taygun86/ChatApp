// Socket.IO'yu kullanarak sunucuya bağlanma

const socket = io.connect('Your Ip'); // Sunucunun URL'si

var selectedRecipient = "";
function selectRecipient(element) {
     selectedRecipient = element.textContent;
    console.log("Seçilen Alıcı:", selectedRecipient);
    document.getElementById("receiver").innerHTML = "Gönderilecek Kişi: "+selectedRecipient;

    
 }

function sendMessage() {
    var message = document.getElementById("messageInput").value;
    var receiver = selectedRecipient;
    
    
    console.log("Receiver Username:");
    // Mesajı göndermek için gereken işlemleri burada yapabilirsiniz
    console.log("Gönderilen Mesaj: " + message);
    if(receiver != ""){
        socket.emit('sendMessage', {receiver, message,sender});
    }
   
    // Mesaj giriş alanını temizle
    document.getElementById("messageInput").value = "";

    // Gönderen mesajı kendi ekranında da görüntüler
    if(receiver != "")
    {
        let messageContainer = document.getElementById("messageContainer");
        messageContainer.innerHTML += `<p><strong>${sender}:</strong> ${message}</p>`;
    }
    
}

// Client tarafından gönderilen mesajları dinleme
socket.on('receiveMessage', (message, sender) => {
    console.log('Alınan Mesaj:', message);
    // Mesajı ekranda gösterme işlemini buraya ekleyebilirsiniz
    let messageContainer = document.getElementById("messageContainer");
    messageContainer.innerHTML += `<p><strong>${sender}:</strong> ${message}</p>`;
});

var sender;
function setUsername(){
 sender = document.getElementById("usernameInput").value;
document.getElementById("kadi").innerHTML = "Kullanıcı Adınız: "+sender;
document.getElementsByClassName("container")[0].style.display = "flex";
document.getElementById("username-form").style.display = "none";
socket.emit("setUsername", sender);



}

function kisiekle(){
document.getElementsByClassName("container")[0].style.display = "none";
document.getElementById("kisi").style.display = "block";
    
}

function settings(){
    document.getElementsByClassName("container")[0].style.display = "none";
    document.getElementById("settings").style.display = "block";

}




