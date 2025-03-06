// Selectăm elementele din HTML
const chatBox = document.getElementById("chat-box");
const optionsContainer = document.getElementById("options-container");
const sendSound = document.getElementById("send-sound");
const receiveSound = document.getElementById("receive-sound");

// Poza pentru NPC (folosește calea corectă sau un URL absolut, dacă e necesar)
const npcImageHTML = '<img src="npc.png" alt="NPC" />';

// Conversația (poți modifica textul și opțiunile după preferință)
const conversation = [
  { npc: "Things are going to be really bad soon.", options: ["What? What do you mean by that?", "Uhm...", "Who are you?"] },
  { npc: "He is there, waiting for each of you to fall into his trap.", options: ["Tell me what happened!", "You're scaring me.", "Who is this 'he'?"] },
  { npc: "You don’t want to know. Trust me.", options: ["I need to know!", "Stop playing games.", "Just tell me."] },
  { npc: "You'll find out by yourself after you receive that call.", options: ["What is this all even about??", "You're mad crazy!", "Just say it!!"] },
  { npc: "Don't say I didn't warn you", options: ["What do you mean?", "Warn me about what?!", "AT LEAST TELL ME WHAT'S GOING ON!!!"] }
];

let step = 0;

// Adaugă mesajul NPC
function addNpcMessage(text) {
  setTimeout(() => {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", "npc-message");
    messageDiv.innerHTML = npcImageHTML + "<span>" + text + "</span>";
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
    
    // Redă sunetul de primire
    receiveSound.currentTime = 0;
    receiveSound.play();
  }, 500); // întârziere pentru efect
}

// Adaugă mesajul utilizatorului
function addUserMessage(text) {
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("message", "user-message");
  messageDiv.innerText = text;
  chatBox.appendChild(messageDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
  
  // Redă sunetul de trimitere
  sendSound.currentTime = 0;
  sendSound.play();
}

// Afișează opțiunile de răspuns
function showOptions(options) {
  optionsContainer.innerHTML = "";
  options.forEach(option => {
    const button = document.createElement("button");
    button.classList.add("option-button");
    button.innerText = option;
    button.addEventListener("click", () => handleUserChoice(option));
    optionsContainer.appendChild(button);
  });
}

// Gestionează alegerea utilizatorului și continuă conversația
function handleUserChoice(userText) {
  addUserMessage(userText);
  step++;
  
  if (step < conversation.length) {
    optionsContainer.innerHTML = "";
    setTimeout(() => {
      addNpcMessage(conversation[step].npc);
      showOptions(conversation[step].options);
    }, 1000);
  } else {
    optionsContainer.innerHTML = "";
    setTimeout(() => addNpcMessage("This conversation is over."), 1000);
  }
}

// Începe conversația
function startChat() {
  addNpcMessage(conversation[0].npc);
  showOptions(conversation[0].options);
}

startChat();
