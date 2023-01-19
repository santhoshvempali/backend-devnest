var socket=io()
var userList=document.getElementById("active_users_list")
var roomList=document.getElementById("active_rooms_list")
var message = document.getElementById("messageInput");
var sendMessageBtn = document.getElementById("send_message_btn");
var roomInput = document.getElementById("roomInput");
var createRoomBtn = document.getElementById("room_add_icon_holder");
var chatDisplay = document.getElementById("chat");

var currentRoom = "globalChat";
var myUsername = "";

sendMessageBtn.addEventListener('click',function(){
    socket.emit("sendMessage",message.value)
    message.value=null
})

socket.on("connect",function(){
    myUsername=prompt("Enter name");
    socket.emit("createUser",myUsername)
})

socket.on("updatechat",function(username,data){
    if(username=="INFO"){
        chatDisplay.innerHTML+= `<div class="announcement"><span>${data}</span></div>`;
    }else {
        console.log("Displaying user message");
        chatDisplay.innerHTML += `<div class="message_holder ${
          username === myUsername ? "me" : ""
        }">
                                    <div class="pic"></div>
                                    <div class="message_box">
                                      <div id="message" class="message">
                                        <span class="message_name">${username}</span>
                                        <span class="message_text">${data}</span>
                                      </div>
                                    </div>
                                  </div>`;
      }
    
      chatDisplay.scrollTop = chatDisplay.scrollHeight;

})

socket.on("updateRooms", function (rooms, newRoom) {
    roomlist.innerHTML = "";
  
    for (var index in rooms) {
      roomlist.innerHTML += `<div class="room_card" id="${rooms[index].name}"
                                  onclick="changeRoom('${rooms[index].name}')">
                                  <div class="room_item_content">
                                      <div class="pic"></div>
                                      <div class="roomInfo">
                                      <span class="room_name">#${rooms[index].name}</span>
                                      <span class="room_author">${rooms[index].creator}</span>
                                      </div>
                                  </div>
                              </div>`;
    }
  
    document.getElementById(currentRoom).classList.add("active_item");
  });
  
  function changeRoom(room) {
    if (room != currentRoom) {
      socket.emit("updateRooms", room);
      document.getElementById(currentRoom).classList.remove("active_item");
      currentRoom = room;
      document.getElementById(currentRoom).classList.add("active_item");
    }
}