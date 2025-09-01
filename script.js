  
    AOS.init({ duration: 1000, once: true });

    // Mobile Menu
    document.getElementById('menu-btn').addEventListener('click', () => {
      document.getElementById('mobile-menu').classList.toggle('hidden');
    });

    // Dark / Light Mode
    document.getElementById('theme-toggle').addEventListener('click', () => {
      document.body.classList.toggle('bg-gray-950');
      document.body.classList.toggle('bg-white');
      document.body.classList.toggle('text-gray-100');
      document.body.classList.toggle('text-gray-900');
    });

    // Scroll Progress
    window.onscroll = () => {
      let progress = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
      document.getElementById('progressBar').style.width = progress + "%";
    };

    // Typing Effect for Heading and Paragraph
    const headingText = "YoungDev Journey ⭐";
    const paraText = "I’m currently doing my internship with YoungDev Intern ⭐. This landing page is one of my internship tasks, showcasing my passion for modern UI/UX, animations, and interactive web design.";
    let headingIndex = 0;
    let paraIndex = 0;
    const headingElement = document.getElementById("typing");
    const paraElement = document.getElementById("typingPara");

    function typeHeading() {
      if (headingIndex < headingText.length) {
        headingElement.innerHTML += headingText.charAt(headingIndex);
        headingIndex++;
        setTimeout(typeHeading, 100);
      } else {
        paraElement.classList.remove('hidden');
        typeParagraph();
      }
    }

    function typeParagraph() {
      if (paraIndex < paraText.length) {
        paraElement.innerHTML += paraText.charAt(paraIndex);
        paraIndex++;
        setTimeout(typeParagraph, 30);
      }
    }
    typeHeading();

    // Image Slider
    const slides = document.querySelectorAll('.slider-img');
    let currentSlide = 0;
    setInterval(() => {
      slides[currentSlide].classList.remove('active');
      currentSlide = (currentSlide + 1) % slides.length;
      slides[currentSlide].classList.add('active');
    }, 3000);

    // Confetti Function
    function launchConfetti() {
      const colors = ['#6366f1', '#ec4899', '#8b5cf6', '#f59e0b'];
      for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.borderRadius = '50%';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * window.innerWidth + 'px';
        confetti.style.top = '-10px';
        confetti.style.zIndex = '1001';
        confetti.style.animation = `fall ${Math.random() * 3 + 2}s linear`;
        document.body.appendChild(confetti);
        setTimeout(() => confetti.remove(), 5000);
      }
    }

    // Explore Button Popup and Scroll
    document.getElementById('exploreBtn').addEventListener('click', (e) => {
      e.preventDefault();
      const popup = document.getElementById('explorePopup');
      popup.classList.add('show');
      launchConfetti();
      setTimeout(() => {
        popup.classList.remove('show');
        const target = document.querySelector('#features');
        target.scrollIntoView({ behavior: 'smooth' });
        target.classList.add('animate-pulse');
        setTimeout(() => target.classList.remove('animate-pulse'), 1500);
      }, 3000);
    });

    // Close Discover Popup
    document.getElementById('closePopup').addEventListener('click', () => {
      document.getElementById('explorePopup').classList.remove('show');
      const target = document.querySelector('#features');
      target.scrollIntoView({ behavior: 'smooth' });
    });

    // Pricing Choose Buttons
    document.querySelectorAll('.choose-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const plan = btn.dataset.plan;
        const iconClass = btn.dataset.icon;
        const popup = document.getElementById('pricingPopup');
        const popupTitle = document.getElementById('pricingPopupTitle');
        const popupIcon = document.getElementById('pricingPopupIcon');
        popupTitle.innerText = `Welcome to ${plan}! 🌌`;
        popupIcon.className = `pricing-icon ${iconClass} text-yellow-400`;
        popup.classList.add('show');
        launchConfetti();
        setTimeout(() => {
          popup.classList.remove('show');
        }, 4000);
      });
    });

    // Pricing Popup Buttons
    document.getElementById('proceedToContact').addEventListener('click', () => {
      document.getElementById('pricingPopup').classList.remove('show');
      const target = document.querySelector('#contact');
      target.scrollIntoView({ behavior: 'smooth' });
    });

    document.getElementById('closePricingPopup').addEventListener('click', () => {
      document.getElementById('pricingPopup').classList.remove('show');
    });

    // Pricing Toggle
    const toggle = document.getElementById("togglePricing");
    const toggleDot = document.getElementById("toggleDot");
    const prices = document.querySelectorAll(".price");
    function updatePrices() {
      prices.forEach(price => {
        price.innerText = toggle.checked ? "$" + price.dataset.yearly : "$" + price.dataset.monthly;
      });
      toggleDot.style.left = toggle.checked ? "calc(100% - 1.75rem)" : "0.5rem";
    }
    toggle.addEventListener("change", updatePrices);
    updatePrices(); // Initialize prices on page load

    // Particles
    const canvas = document.getElementById("particles");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    let particles = Array.from({length: 60}, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2 + 1,
      dx: (Math.random() - 0.5) * 0.5,
      dy: (Math.random() - 0.5) * 0.5
    }));
    function draw() {
      ctx.clearRect(0,0,canvas.width,canvas.height);
      ctx.fillStyle = "rgba(255,255,255,0.7)";
      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fill();
        p.x += p.dx; p.y += p.dy;
        if(p.x<0||p.x>canvas.width) p.dx*=-1;
        if(p.y<0||p.y>canvas.height) p.dy*=-1;
      });
      requestAnimationFrame(draw);
    }
    draw();

    // Contact Form Validation
    document.getElementById("contactForm").addEventListener("submit", function(e) {
      e.preventDefault();
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const subject = document.getElementById("subject").value.trim();
      const message = document.getElementById("message").value.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!name) {
        alert("Please enter your name.");
        return;
      }
      if (!email || !emailRegex.test(email)) {
        alert("Please enter a valid email address.");
        return;
      }
      if (!subject) {
        alert("Please enter a subject.");
        return;
      }
      if (!message) {
        alert("Please enter your message.");
        return;
      }

      alert("Thank you, " + name + "! Your cosmic message about '" + subject + "' has been sent! 🌟");
      launchConfetti();
      document.getElementById("contactForm").reset();
    });
