const chatBox = document.getElementById("chat-box");
const chatForm = document.getElementById("chat-form");
const userInput = document.getElementById("user-input");
const imageInput = document.getElementById("image-input");

let step = 0;
let visitorName = "";

function appendMessage(sender, text, imageURL = null) {
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("message", sender);
  messageDiv.textContent = text;
  chatBox.appendChild(messageDiv);

  if (imageURL) {
    const img = document.createElement("img");
    img.src = imageURL;
    img.classList.add("upload-preview");
    chatBox.appendChild(img);
  }

  chatBox.scrollTop = chatBox.scrollHeight;
}

function botReply(input) {
  if (step === 0) {
    appendMessage("bot", "Hi there! 👋 What's your name?");
    step++;
  } else if (step === 1) {
    visitorName = input;
    appendMessage("bot", `Nice to meet you, ${visitorName}! Did you witness any forest event (fire, illegal activity, etc)?`);
    step++;
  } else if (step === 2) {
    appendMessage("bot", "Please enter the Location where you Plot the Illegal Activity.");
    step++;
  } else if (step === 3) {
    appendMessage("bot", "Thank you for reporting. If you captured an image, please upload it now.");
    imageInput.style.display = "block";
    step++;
  } else if (step === 4) {
    appendMessage("bot", "We’ve received your message. A forest officer will review it shortly. 🌲");
  }
}

chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const input = userInput.value.trim();
  if (!input && !imageInput.files.length) return;

  if (input) {
    appendMessage("user", input);
    userInput.value = "";
    setTimeout(() => botReply(input), 500);
  }
});

imageInput.addEventListener("change", () => {
  const file = imageInput.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    appendMessage("user", "📸 Uploaded image:", e.target.result);
    appendMessage("bot", "Thank you. The image has been sent to the forest officer.");
    // Here you would typically upload the image to a server or send it via email/API
  };
  reader.readAsDataURL(file);
});
