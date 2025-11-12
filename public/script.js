// Função para abrir e fechar o menu mobile
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

menuBtn.addEventListener('click', () => {
    const isExpanded = mobileMenu.classList.toggle('hidden');
    menuBtn.setAttribute('aria-expanded', !isExpanded);
});

// Função para fechar o menu mobile ao clicar em um link
document.querySelectorAll('#mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        menuBtn.setAttribute('aria-expanded', 'false');
    });
});

// Slider Logic
let slideIndex = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');

function showSlides(n) {
    // Reset all slides and dots
    slides.forEach(slide => {
        slide.classList.add('opacity-0');
        slide.style.opacity = '0'; // Garante que a transição funcione
    });
    dots.forEach(dot => {
        dot.classList.add('bg-white/50');
        dot.classList.remove('bg-white');
    });

    // Loop logic
    if (n >= slides.length) { slideIndex = 0 }    
    if (n < 0) { slideIndex = slides.length - 1 }
    
    // Show current slide and dot
    slides[slideIndex].classList.remove('opacity-0');
    slides[slideIndex].style.opacity = '0.7'; // Define a opacidade para 70%
    dots[slideIndex].classList.remove('bg-white/50');
    dots[slideIndex].classList.add('bg-white');
}

// Automatic transition (5 seconds)
function autoSlide() {
    slideIndex++;
    showSlides(slideIndex);
}

let slideInterval = setInterval(autoSlide, 5000); // Muda o slide a cada 5 segundos

// Dot navigation listener
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        clearInterval(slideInterval); // Para o intervalo ao clicar
        slideIndex = index;
        showSlides(slideIndex);
        slideInterval = setInterval(autoSlide, 5000); // Reinicia o intervalo
    });
});

// Run the initial setup
showSlides(slideIndex);


// Funções para o Custom Modal (Substitui alert()/confirm())
const modal = document.getElementById('custom-modal');
const modalTitle = document.getElementById('modal-title');
const modalContent = document.getElementById('modal-content');

window.showCustomModal = function(title, content) {
    modalTitle.textContent = title;
    modalContent.textContent = content;
    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

window.closeCustomModal = function() {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
}

// Simulação de envio do formulário de Contato
window.showContactMessage = function() {
    const status = document.getElementById('contact-status');
    status.classList.remove('hidden');
    setTimeout(() => {
        status.classList.add('hidden');
    }, 5000);
    
    // Limpa o formulário após a simulação de envio
    document.querySelector('#contato form').reset();
    
    showCustomModal("Mensagem Enviada", "Obrigado por nos contatar! Sua mensagem foi enviada à secretaria paroquial e será respondida em breve.");
}

// Função para o Pedido de Oração no Footer
window.showPrayerRequest = function() {
    showCustomModal(
        "Pedido de Oração Online",
        "Para enviar uma intenção de oração, por favor, utilize o Formulário de Contato na seção 'Fale Conosco' e selecione a opção 'Pedido de Oração'. Sua intenção será colocada em nossas Missas e Orações."
    );
}

// Adiciona smooth scrolling para todos os links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});