//filter tab
function showTabContent(tabId) {
    document.querySelectorAll('.tab-content').forEach(content => {
        content.style.display = 'none';
    });
    document.querySelectorAll('.tab-button').forEach(button => {
        button.classList.remove('active');
    });
    document.getElementById(tabId).style.display = 'block';
    document.querySelector(`[onclick="showTabContent('${tabId}')"]`).classList.add('active');
}

function filterProperties() {
    const selectedType = document.querySelector('.filter-select').value;
    const propertyCards = document.querySelectorAll('.property-card');

    propertyCards.forEach(card => {
        const propertyType = card.getAttribute('data-type');
        if (selectedType === 'all' || propertyType === selectedType) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

//image modal
function openModal(image) {
    const modal = document.getElementById("imageModal");
    const modalImg = document.getElementById("fullImage");
    const captionText = document.getElementById("caption");

    modal.style.display = "block"; // Show the modal
    modalImg.src = image.src; // Get the image source
    captionText.innerHTML = image.alt; // Get the image alt text
}

function closeModal() {
    const modal = document.getElementById("imageModal");
    modal.style.display = "none"; // Hide the modal
}

// Chatbox functionality
function openChatbox() {
    document.getElementById('chatbox').style.display = 'block';
}

function closeChatbox() {
    document.getElementById('chatbox').style.display = 'none';
}

// Handle displaying FAQ answers inside the chatbox
function showAnswer(faqId) {
    // Hide any other open answers
    const faqAnswers = document.querySelectorAll('.faq-answer');
    faqAnswers.forEach(answer => {
        answer.style.display = 'none';
    });

    // Display the selected FAQ answer
    document.getElementById(faqId).style.display = 'block';

    // Add FAQ answer as a bot message to the chat
    const answerText = document.getElementById(faqId).textContent;
    const messageContainer = document.querySelector('.messages');
    
    // Create a new message element with bot styling
    const botMessage = document.createElement('div');
    botMessage.className = 'message bot-message';
    botMessage.innerHTML = `<i class="fas fa-robot bot-icon"></i><span>${answerText}</span>`;
    messageContainer.appendChild(botMessage);

    // Scroll to the bottom of the chatbox to see the new message
    messageContainer.scrollTop = messageContainer.scrollHeight;
}

// Handle user input in the chatbox
function handleUserInput(event) {
    if (event.key === 'Enter') {
        const userInput = document.getElementById('userInput').value.trim();
        const messageContainer = document.querySelector('.messages');

        if (userInput !== "") {
            // Add user message to chat
            const userMessage = document.createElement('div');
            userMessage.className = 'message user-message';
            userMessage.innerHTML = `<i class="fas fa-user user-icon"></i><span>${userInput}</span>`;
            messageContainer.appendChild(userMessage);

            // Clear input field
            document.getElementById('userInput').value = '';

            // Scroll to the bottom of the chatbox
            messageContainer.scrollTop = messageContainer.scrollHeight;
        }
    }
}

// Example function to dynamically populate contract info
function loadContractDetails() {
    // Dummy data
    document.getElementById('contract-signed-date').textContent = '1st January 2024';
    document.getElementById('rent-due-date').textContent = '5th of each month';
    document.getElementById('lease-end-date').textContent = '31st December 2024';
    document.getElementById('landlord-name').textContent = 'John Doe';
    document.getElementById('landlord-contact').textContent = 'john.doe@example.com';
    document.getElementById('tenant-name').textContent = 'Jane Smith';
    document.getElementById('tenant-contact').textContent = 'jane.smith@example.com';
}

// Call this function when the Contracts tab is shown
function showTabContent(tabId) {
    var tabs = document.getElementsByClassName('tab-content');
    for (var i = 0; i < tabs.length; i++) {
        tabs[i].style.display = 'none';
    }
    document.getElementById(tabId).style.display = 'block';

    // Load contract details when the Contracts tab is shown
    if (tabId === 'contracts') {
        loadContractDetails();
    }
}


