// Simple front-end chatbot UI (replace with real API for production)
(function() {
  let chatbotForm = document.getElementById('chatbot-form');
  let chatbotInput = document.getElementById('chatbot-input');
  let chatbotMessages = document.getElementById('chatbot-messages');

  function appendMessage(sender, text) {
  const msg = document.createElement('div');
  msg.className = 'chatbot-message ' + (sender === 'user' ? 'user' : 'bot');
  msg.innerHTML = `<span>${text}</span>`;
  chatbotMessages.appendChild(msg);
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

if (chatbotForm) {
  chatbotForm.onsubmit = function(e) {
    e.preventDefault();
    const userMsg = chatbotInput.value.trim();
    if (!userMsg) return;
    appendMessage('user', userMsg);
    chatbotInput.value = '';
    // Simulate bot response (replace with real AI API call)
    setTimeout(() => {
      appendMessage('bot', getBotResponse(userMsg));
    }, 800);
  };
}
  function getBotResponse(msg) {
    msg = msg.toLowerCase();
    if (msg.includes('implant')) return "Dental implants are a permanent, natural-looking solution to missing teeth. Dr. Pedro uses advanced techniques for comfort and results.";
    if (msg.includes('emface')) return "Emface is a non-invasive facial treatment that lifts and rejuvenates skin with no needles or downtime. Ask us for a consultation!";
    if (msg.includes('tmj')) return "TMJ pain can be relieved with custom treatments. Dr. Pedro offers both non-surgical and advanced therapies.";
    if (msg.includes('appointment') || msg.includes('book')) return "You can book an appointment by calling (718) 555-1212 or using our contact form!";
    if (msg.includes('insurance')) return "We accept most major dental insurance plans. Please call to confirm your coverage.";
    if (msg.includes('hours')) return "Our office hours are Mon-Fri 9am-6pm, Sat 9am-2pm.";
    if (msg.includes('location') || msg.includes('address')) return "Our office is at 123 Main Street, Staten Island, NY 10301.";
    return "I'm here to help! Ask me anything about dental care, Emface, TMJ, or our services.";
  }
})();
