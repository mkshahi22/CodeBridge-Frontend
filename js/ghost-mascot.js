// Ghost Mascot Component with Chat Feature - Enhanced Version
(function () {
    // Create HTML elements with updated icons
    const ghostHTML = `
        <div class="ghost-mascot" title="CodeBridge Assistant">
            <img src="../assets/images/ghost.png" alt="Ghost Assistant">
        </div>
        <div id="ghost-message" class="ghost-message">Welcome! 👋</div>
        <div class="ghost-chat-window" id="ghost-chat-window">
            <div class="ghost-chat-header">
                <div class="ghost-chat-header-content">
                    <img src="../assets/images/logo.png" alt="CodeBridge Logo">
                    <h3>CodeBridge Assistant</h3>
                </div>
                <button class="ghost-chat-close" id="ghost-chat-close">&times;</button>
            </div>
            <div class="ghost-chat-body" id="ghost-chat-body">
                <div class="ghost-chat-message bot">
                    <div class="avatar">
                        <img src="../assets/images/ghost.png" alt="Bot">
                    </div>
                    <div class="message-content">Hi! I'm your CodeBridge assistant. What's your name? 😊</div>
                </div>
            </div>
            <div class="ghost-chat-footer">
                <div class="ghost-chat-input-wrapper">
                    <input type="text" class="ghost-chat-input" id="ghost-chat-input" placeholder="Type your message...">
                    <button class="ghost-chat-send" id="ghost-chat-send">Send</button>
                </div>
            </div>
        </div>
    `;

    // Insert into page when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initGhost);
    } else {
        initGhost();
    }

    function initGhost() {
        // Insert HTML
        document.body.insertAdjacentHTML('beforeend', ghostHTML);

        const ghost = document.querySelector('.ghost-mascot');
        const ghostMessage = document.getElementById('ghost-message');
        const chatWindow = document.getElementById('ghost-chat-window');
        const chatBody = document.getElementById('ghost-chat-body');
        const chatInput = document.getElementById('ghost-chat-input');
        const chatSend = document.getElementById('ghost-chat-send');
        const chatClose = document.getElementById('ghost-chat-close');

        let isDragging = false;
        let currentX, currentY, initialX, initialY;
        let isChatOpen = false;
        let conversationContext = [];
        let userName = '';
        let askedForName = false;

        // Time-based greeting
        function getTimeBasedGreeting() {
            const hour = new Date().getHours();
            if (hour < 6) return "Working late? Need help?";
            else if (hour < 12) return "Good morning! Ready to code?";
            else if (hour < 18) return "Need coding assistance?";
            else return "Evening! Let's build something!";
        }

        // Welcome message on load
        setTimeout(() => {
            ghostMessage.textContent = getTimeBasedGreeting();
            ghostMessage.classList.add('show');
            setTimeout(() => ghostMessage.classList.remove('show'), 4000);
        }, 1000);

        // Mouse tracking for ghost eyes effect
        let mouseX = 0, mouseY = 0;
        document.addEventListener('mousemove', (e) => {
            if (!isDragging) {
                const rect = ghost.getBoundingClientRect();
                mouseX = e.clientX - (rect.left + rect.width / 2);
                mouseY = e.clientY - (rect.top + rect.height / 2);
                const angle = Math.atan2(mouseY, mouseX) * (180 / Math.PI);
                const distance = Math.min(Math.sqrt(mouseX * mouseX + mouseY * mouseY) / 10, 5);
                ghost.style.transform = `rotate(${angle * 0.05}deg) translateX(${distance * 0.1}px)`;
            }
        });

        // Dragging functionality
        ghost.addEventListener('mousedown', (e) => {
            if (e.target === ghost || e.target.parentElement === ghost) {
                isDragging = true;
                const rect = ghost.getBoundingClientRect();
                initialX = e.clientX - rect.left;
                initialY = e.clientY - rect.top;
                ghost.style.cursor = 'grabbing';
            }
        });

        document.addEventListener('mousemove', (e) => {
            if (isDragging) {
                e.preventDefault();
                currentX = e.clientX - initialX;
                currentY = e.clientY - initialY;

                ghost.style.left = currentX + 'px';
                ghost.style.top = currentY + 'px';
                ghost.style.right = 'auto';
                ghost.style.bottom = 'auto';
                ghost.style.transform = 'none';
            }
        });

        document.addEventListener('mouseup', () => {
            if (isDragging) {
                isDragging = false;
                ghost.style.cursor = 'grab';
            }
        });

        // Click to open chat
        ghost.addEventListener('click', (e) => {
            if (!isDragging) {
                isChatOpen = !isChatOpen;
                if (isChatOpen) {
                    chatWindow.classList.add('active');
                    ghostMessage.classList.remove('show');
                    chatInput.focus();
                } else {
                    chatWindow.classList.remove('active');
                }
            }
        });

        // Close chat
        chatClose.addEventListener('click', () => {
            chatWindow.classList.remove('active');
            isChatOpen = false;
        });

        // Enhanced bot responses with more categories and context awareness
        const botResponses = {
            greetings: [
                "Hello{name}! Ready to build something amazing? 🚀",
                "Hey there{name}! How can I assist you today? 👋",
                "Hi{name}! What would you like to create? ✨",
                "Welcome back{name}! Let's make today productive! 💫"
            ],
            help: [
                "I can help you with:\n• CodeBridge features & platform\n• Meet our developers\n• Code generation & debugging\n• Project guidance\n• Language support\n• Getting started\n\nWhat interests you? 🤔",
                "I'm here to assist{name}! Ask me about:\n• Platform features\n• Our development team\n• Programming concepts\n• Tools & resources 💡"
            ],
            developers: [
                "CodeBridge is built with ❤️ by:\n\n👨‍💻 Mayank Prashar\n• Lead Developer & Co-Founder\n• Full-stack expert\n• AI/ML enthusiast\n\n👨‍💻 Dhruv Tripathi\n• Co-Founder & Backend Architect\n• Spring Boot specialist\n• Database optimization guru\n\nTogether, we're bridging the gap between human creativity and AI! 🌉",
                "Meet the minds behind CodeBridge:\n\n🚀 Mayank Prashar - Frontend wizard who crafted this beautiful interface you're using!\n\n🔧 Dhruv Tripathi - Backend genius ensuring everything runs smoothly!\n\nWe're passionate developers on a mission to empower coders worldwide! 💪"
            ],
            features: [
                "CodeBridge offers:\n✨ AI-powered code generation\n🔒 100% free forever\n🌐 Multi-language support (50+ languages)\n📚 Context-aware assistance\n⚡ Real-time generation\n🎨 Custom templates\n👥 Community showcase\n\nWhat interests you{name}? 🎯",
                "Our platform helps you go from prompt to production! Features include:\n• Smart code completion\n• Error detection & fixes\n• Performance optimization\n• Code reviews\n• File attachment support\n\nWant to know more? 🚀"
            ],
            code: [
                "I can help you generate code{name}! Just describe what you need:\n• Web applications\n• APIs & backends\n• Data processing scripts\n• UI components\n• Algorithms & logic 💻",
                "Need code assistance? Head to the dashboard to:\n• Generate code from natural language\n• Attach context files\n• Get syntax-highlighted output\n• Copy & use instantly\n\nReady to start? 🔥"
            ],
            pricing: [
                "Great news{name}! CodeBridge is 100% FREE! 🎉\n\n✅ No credit card required\n✅ Unlimited code generations\n✅ All features included\n✅ No hidden costs\n✅ Forever free\n\nWe believe coding tools should be accessible to everyone! Just sign up and start building! 🚀",
                "CodeBridge pricing is simple: FREE! 💰\n\n• All features unlocked\n• No usage limits\n• Community access\n• Share & collaborate\n• No subscription needed\n\nOur mission is to democratize AI-powered development! Start creating now! ✨"
            ],
            languages: [
                "CodeBridge supports 50+ languages including:\n• JavaScript/TypeScript\n• Python\n• Java\n• C++/C#\n• Go\n• Rust\n• Ruby\n• PHP\n• Swift\n• Kotlin\n\nAnd many more{name}! What's your favorite? 🌐",
                "We've got you covered for:\n• Frontend: React, Vue, Angular\n• Backend: Node, Django, Rails, Spring Boot\n• Mobile: Swift, Kotlin, Flutter\n• Data: SQL, R, Julia\n\nWhat are you building? 📱"
            ],
            projects: [
                "Need project ideas{name}? How about:\n• Portfolio website\n• REST API with authentication\n• Weather dashboard\n• Real-time chat app\n• E-commerce platform\n• Chrome extension\n• Discord bot\n\nPick one and let's build it! 💡",
                "Let's create something amazing! Consider:\n• Task management app\n• Data visualization dashboard\n• Blog platform\n• Social media clone\n• Game with leaderboard\n\nWhat excites you? 🚀"
            ],
            signup: [
                "Ready to start{name}? Click 'Get Started' to create your free account! 🎉\n\n✨ Takes 30 seconds\n✨ No payment info needed\n✨ Instant access\n✨ Forever free\n\nLet's build together!",
                "Join thousands of developers using CodeBridge{name}! Sign up now:\n• Quick registration\n• Free forever\n• All features unlocked\n• Community access\n\nCreate your account and start coding smarter! 🚀"
            ],
            thanks: [
                "You're very welcome{name}! Happy to help! 😊",
                "Anytime{name}! Let me know if you need anything else. 🤗",
                "My pleasure{name}! Keep building amazing things! 🚀",
                "Always here to assist{name}! Happy coding! ⚡"
            ],
            goodbye: [
                "Goodbye{name}! Come back anytime you need help! 👋",
                "See you later{name}! Happy coding! 💻",
                "Take care{name}! Keep building awesome projects! 🌟",
                "Until next time{name}! Good luck with your code! 🚀"
            ],
            motivation: [
                "You've got this{name}! Every expert was once a beginner. Keep pushing forward! 💪",
                "Remember{name}: debugging is being the detective in a crime movie where you're also the murderer! 🔍",
                "Great code isn't written, it's rewritten{name}. Keep iterating! 🔄",
                "Believe in yourself{name}! The only way to learn programming is by writing programs! 📝"
            ],
            askName: [
                "I'd love to know your name! What should I call you? 😊",
                "Before we continue, may I know your name? 🤝",
                "What's your name, friend? I'd like to personalize our chat! ✨"
            ],
            default: [
                "That's interesting{name}! Tell me more about what you're working on. 🤔",
                "I'm here to help{name}! Could you elaborate a bit? 💬",
                "I can help with:\n• Features\n• Meet developers\n• Code generation\n• Languages\n• Project ideas\n• Getting started\n\nWhat would you like to know? 🔍"
            ]
        };

        // Context-aware response system
        function getBotResponse(userMessage) {
            const msg = userMessage.toLowerCase().trim();
            conversationContext.push(msg);

            // Keep only last 5 messages for context
            if (conversationContext.length > 5) {
                conversationContext.shift();
            }

            // Capture name if not set
            if (!userName && !askedForName) {
                const words = msg.split(' ');
                // Simple name detection - if message is short and doesn't contain questions
                if (words.length <= 3 && !msg.includes('?') && !msg.includes('help') &&
                    !msg.match(/^(hi|hello|hey|what|how|when|where|why)/)) {
                    userName = words[0].charAt(0).toUpperCase() + words[0].slice(1);
                    askedForName = true;
                    return `Nice to meet you, ${userName}! 🎉 I'm here to help you with CodeBridge - our AI-powered code generation platform. I can tell you about:\n• Platform features\n• Our development team\n• How to get started\n• Project ideas\n\nWhat would you like to know?`;
                }
            }

            const nameTag = userName ? ` ${userName}` : '';

            // Greetings
            if (msg.match(/^(hi|hello|hey|greetings|sup|yo|howdy|hola)/)) {
                if (!userName && !askedForName) {
                    askedForName = true;
                    return botResponses.askName[Math.floor(Math.random() * botResponses.askName.length)];
                }
                return botResponses.greetings[Math.floor(Math.random() * botResponses.greetings.length)].replace('{name}', nameTag);
            }

            // Ask for name
            if (!userName && conversationContext.length > 2 && Math.random() > 0.5) {
                if (!msg.includes('name')) {
                    askedForName = true;
                    return "By the way, I'd love to know your name! What should I call you? 😊";
                }
            }

            // Goodbye
            if (msg.match(/(bye|goodbye|see you|later|farewell|exit|quit)/)) {
                return botResponses.goodbye[Math.floor(Math.random() * botResponses.goodbye.length)].replace('{name}', nameTag);
            }

            // Help
            if (msg.includes('help') || msg.includes('what can you do') || msg.includes('assist')) {
                return botResponses.help[Math.floor(Math.random() * botResponses.help.length)].replace('{name}', nameTag);
            }

            // Developers/Team/Creators
            if (msg.includes('developer') || msg.includes('creator') || msg.includes('team') ||
                msg.includes('who made') || msg.includes('who built') || msg.includes('founder') ||
                msg.includes('mayank') || msg.includes('dhruv')) {
                return botResponses.developers[Math.floor(Math.random() * botResponses.developers.length)];
            }

            // Features
            if (msg.includes('feature') || msg.includes('what is codebridge') || msg.includes('what does') ||
                msg.includes('capability') || msg.includes('offer') || msg.includes('can do')) {
                return botResponses.features[Math.floor(Math.random() * botResponses.features.length)].replace('{name}', nameTag);
            }

            // Code generation
            if (msg.includes('code') || msg.includes('generate') || msg.includes('create') || msg.includes('build')) {
                return botResponses.code[Math.floor(Math.random() * botResponses.code.length)].replace('{name}', nameTag);
            }

            // Languages
            if (msg.includes('language') || msg.includes('python') || msg.includes('javascript') ||
                msg.includes('java') || msg.includes('support')) {
                return botResponses.languages[Math.floor(Math.random() * botResponses.languages.length)].replace('{name}', nameTag);
            }

            // Pricing
            if (msg.includes('price') || msg.includes('cost') || msg.includes('pay') || msg.includes('plan') ||
                msg.includes('subscription') || msg.includes('free') || msg.includes('money')) {
                return botResponses.pricing[Math.floor(Math.random() * botResponses.pricing.length)].replace('{name}', nameTag);
            }

            // Signup
            if (msg.includes('signup') || msg.includes('sign up') || msg.includes('register') ||
                msg.includes('account') || msg.includes('join') || msg.includes('start')) {
                return botResponses.signup[Math.floor(Math.random() * botResponses.signup.length)].replace('{name}', nameTag);
            }

            // Projects
            if (msg.includes('project') || msg.includes('idea') || msg.includes('build what') || msg.includes('make what')) {
                return botResponses.projects[Math.floor(Math.random() * botResponses.projects.length)].replace('{name}', nameTag);
            }

            // Motivation
            if (msg.includes('motivate') || msg.includes('inspire') || msg.includes('encourage') ||
                msg.includes('stuck') || msg.includes('difficult') || msg.includes('hard')) {
                return botResponses.motivation[Math.floor(Math.random() * botResponses.motivation.length)].replace('{name}', nameTag);
            }

            // Thanks
            if (msg.includes('thank') || msg.includes('thanks') || msg.includes('thx') || msg.includes('appreciate')) {
                return botResponses.thanks[Math.floor(Math.random() * botResponses.thanks.length)].replace('{name}', nameTag);
            }

            // Default
            return botResponses.default[Math.floor(Math.random() * botResponses.default.length)].replace('{name}', nameTag);
        }

        function addMessage(message, isUser = false) {
            const messageDiv = document.createElement('div');
            messageDiv.className = `ghost-chat-message ${isUser ? 'user' : 'bot'}`;

            const avatarContent = isUser
                ? `<svg class="user-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                     <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                   </svg>`
                : `<img src="../assets/images/ghost.png" alt="Bot">`;

            messageDiv.innerHTML = `
                <div class="avatar">${avatarContent}</div>
                <div class="message-content">${message.replace(/\n/g, '<br>')}</div>
            `;
            chatBody.appendChild(messageDiv);
            chatBody.scrollTop = chatBody.scrollHeight;
        }

        function showTypingIndicator() {
            const typingDiv = document.createElement('div');
            typingDiv.className = 'ghost-chat-message bot';
            typingDiv.id = 'typing-indicator';
            typingDiv.innerHTML = `
                <div class="avatar">
                    <img src="../assets/images/ghost.png" alt="Bot">
                </div>
                <div class="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            `;
            chatBody.appendChild(typingDiv);
            chatBody.scrollTop = chatBody.scrollHeight;
        }

        function removeTypingIndicator() {
            const typingIndicator = document.getElementById('typing-indicator');
            if (typingIndicator) {
                typingIndicator.remove();
            }
        }

        function sendMessage() {
            const message = chatInput.value.trim();
            if (message === '') return;

            // Add user message
            addMessage(message, true);
            chatInput.value = '';

            // Show typing indicator
            showTypingIndicator();

            // Simulate bot response delay
            const responseDelay = 800 + Math.random() * 1200;
            setTimeout(() => {
                removeTypingIndicator();
                const response = getBotResponse(message);
                addMessage(response, false);
            }, responseDelay);
        }

        // Send message on button click
        chatSend.addEventListener('click', sendMessage);

        // Send message on Enter key
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });

        // Auto-focus input when chat opens
        chatWindow.addEventListener('transitionend', () => {
            if (chatWindow.classList.contains('active')) {
                chatInput.focus();
            }
        });
    }
})();