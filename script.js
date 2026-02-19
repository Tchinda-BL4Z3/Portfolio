document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navbarHeight = document.querySelector('#mainNavbar').offsetHeight;
                const offsetPosition = targetElement.offsetTop - navbarHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });

                // Close navbar on mobile after click
                const navbarToggler = document.getElementById('navbarNav');
                if (navbarToggler && navbarToggler.classList.contains('show')) {
                    new bootstrap.Collapse(navbarToggler, {
                        toggle: false
                    }).hide();
                }
            }
        });
    });

    // Add 'active' class to nav links on scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.7
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${entry.target.id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Fade-in animation on scroll
    const faders = document.querySelectorAll('.fade-in');
    const appearOptions = {
        threshold: 0.3,
        rootMargin: "0px 0px -50px 0px" // Start animation 50px before bottom of viewport
    };
    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.style.animation = `fadeIn 1s ease-out forwards`;
                appearOnScroll.unobserve(entry.target);
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });

    // Terminal Contact Form Handler
    const contactForm = document.getElementById('contactForm');
    const terminalContent = document.getElementById('terminalContent');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form values
            const name = document.getElementById('terminalName').value.trim();
            const email = document.getElementById('terminalEmail').value.trim();
            const subject = document.getElementById('terminalSubject').value.trim();
            const message = document.getElementById('terminalMessage').value.trim();

            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                addTerminalLine('erreur', 'Format d\'email invalide. Veuillez réessayer.');
                return;
            }

            // Validate all fields
            if (!name || !email || !subject || !message) {
                addTerminalLine('erreur', 'Tous les champs sont obligatoires. Veuillez remplir le formulaire complètement.');
                return;
            }

            // Add user input to terminal
            addTerminalLine('utilisateur', `nom: ${name}`);
            addTerminalLine('utilisateur', `email: ${email}`);
            addTerminalLine('utilisateur', `sujet: ${subject}`);
            addTerminalLine('utilisateur', `message: ${message}`);

            // Simulate sending message with effect
            addTerminalLine('systeme', 'Envoi du message en cours...');

            setTimeout(() => {
                // Simulate sending
                addTerminalLine('systeme', '⚡ Connexion établie...');
                
                setTimeout(() => {
                    addTerminalLine('systeme', '📤 Transmission des données...');
                    
                    setTimeout(() => {
                        // Create email data object
                        const contactData = {
                            name: name,
                            email: email,
                            subject: subject,
                            message: message,
                            timestamp: new Date().toLocaleString('fr-FR')
                        };

                        // Store in localStorage (for demo purposes)
                        let messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
                        messages.push(contactData);
                        localStorage.setItem('contactMessages', JSON.stringify(messages));

                        // Send via Formspree using FormData (more compatible than forcing JSON)
                        const formEndpoint = 'https://formspree.io/f/xykdpqel';
                        // set hidden reply-to for non-JS fallback
                        const replyHidden = document.getElementById('replytoHidden');
                        if (replyHidden) replyHidden.value = email;

                        const fd = new FormData();
                        fd.append('name', name);
                        fd.append('email', email);
                        fd.append('subject', subject);
                        fd.append('message', message);
                        fd.append('_subject', `Nouveau message site: ${subject}`);
                        fd.append('_replyto', email);

                        fetch(formEndpoint, {
                            method: 'POST',
                            headers: {
                                'Accept': 'application/json'
                            },
                            body: fd
                        })
                        .then(response => {
                            if (response.ok) {
                                addTerminalLine('systeme', '✅ Message envoyé avec succès!');
                                addTerminalLine('systeme', `Confirmé à: ${new Date().toLocaleTimeString('fr-FR')}`);
                                contactForm.reset();
                                document.getElementById('terminalName').focus();
                            } else {
                                // Save locally if server returns non-OK
                                addTerminalLine('systeme', '⚠ Envoi échoué côté serveur — message enregistré localement.');
                                contactForm.reset();
                            }
                        })
                        .catch(error => {
                            // Network or CORS error: keep message locally and inform user
                            addTerminalLine('systeme', '⚠ Erreur réseau/CORS — message enregistré localement.');
                            contactForm.reset();
                        });
                    }, 800);
                }, 800);
            }, 600);

            // Scroll terminal content to bottom
            setTimeout(() => {
                terminalContent.scrollTop = terminalContent.scrollHeight;
            }, 100);
        });
    }

    // Helper function to add lines to terminal
    function addTerminalLine(type, text) {
        const line = document.createElement('div');
        line.className = 'terminal-line';
        line.style.animation = 'fadeIn 0.3s ease-out forwards';

        const prompt = document.createElement('span');
        prompt.className = 'terminal-prompt';

        const content = document.createElement('span');
        content.className = 'terminal-text';

        if (type === 'utilisateur') {
            prompt.textContent = '> ';
            prompt.style.color = '#00ff88';
            content.style.color = '#00ff88';
        } else if (type === 'systeme') {
            prompt.textContent = '$ ';
            prompt.style.color = '#1e90ff';
            content.style.color = '#1e90ff';
        } else if (type === 'erreur') {
            prompt.textContent = '⚠ ';
            prompt.style.color = '#ff6b6b';
            content.style.color = '#ff6b6b';
        }

        content.textContent = text;
        line.appendChild(prompt);
        line.appendChild(content);
        terminalContent.appendChild(line);

        // Auto-scroll to bottom
        terminalContent.scrollTop = terminalContent.scrollHeight;
    }
});