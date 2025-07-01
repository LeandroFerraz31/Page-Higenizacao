// ===== NAVEGAÇÃO =====
// Seleciona elementos do menu de navegação
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');
const navLinks = document.querySelectorAll('.nav__link');

// Mostra o menu no celular ao clicar no ícone de hambúrguer
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
    });
}

// Esconde o menu no celular ao clicar no ícone de fechar
if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
}

// Esconde o menu no celular ao clicar em um link
const linkAction = () => {
    navMenu.classList.remove('show-menu');
};
navLinks.forEach(n => n.addEventListener('click', linkAction));

// ===== LINK ATIVO AO ROLAR =====
// Destaca o link do menu correspondente à seção visível na tela
const sections = document.querySelectorAll('section[id]');

const scrollActive = () => {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 150;
        const sectionId = current.getAttribute('id');
        const sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            sectionsClass?.classList.add('active-link');
        } else {
            sectionsClass?.classList.remove('active-link');
        }
    });
};
window.addEventListener('scroll', scrollActive);

// ===== EFEITO NO CABEÇALHO AO ROLAR =====
// Altera o fundo e sombra do cabeçalho ao rolar a página
const scrollHeader = () => {
    const header = document.getElementById('header');
    if (window.scrollY >= 50) {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
    }
};
window.addEventListener('scroll', scrollHeader);

// ===== BOTÃO VOLTAR AO TOPO =====
// Mostra/esconde o botão de voltar ao topo ao rolar
const scrollTop = document.getElementById('scroll-top');

const scrollToTop = () => {
    if (window.scrollY >= 560) {
        scrollTop.classList.add('show');
    } else {
        scrollTop.classList.remove('show');
    }
};
window.addEventListener('scroll', scrollToTop);

// Faz o botão de voltar ao topo rolar suavemente para o início
if (scrollTop) {
    scrollTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== ROLAGEM SUAVE =====
// Adiciona rolagem suave para links com âncoras
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== FORMULÁRIO DE CONTATO =====
// Envia os dados do formulário para o WhatsApp
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Obtém os dados do formulário
        const formData = new FormData(this);
        const name = formData.get('name');
        const whatsapp = formData.get('whatsapp');
        const service = formData.get('service');
        const message = formData.get('message');
        
        // Cria a mensagem para o WhatsApp
        let whatsappMessage = `Olá! Gostaria de solicitar um orçamento.\n\n`;
        whatsappMessage += `*Nome:* ${name}\n`;
        whatsappMessage += `*WhatsApp:* ${whatsapp}\n`;
        whatsappMessage += `*Serviço:* ${getServiceName(service)}\n`;
        if (message) {
            whatsappMessage += `*Mensagem:* ${message}\n`;
        }
        whatsappMessage += `\nAguardo retorno. Obrigado!`;
        
        // Codifica a mensagem para URL
        const encodedMessage = encodeURIComponent(whatsappMessage);
        
        // Abre o WhatsApp com a mensagem
        const whatsappURL = `https://wa.me/5551983012611?text=${encodedMessage}`;
        window.open(whatsappURL, '_blank');
        
        // Limpa o formulário
        this.reset();
        
        // Mostra notificação de sucesso
        showNotification('Redirecionando para o WhatsApp...', 'success');
    });
}

// Função auxiliar para obter o nome completo do serviço
function getServiceName(serviceValue) {
    const services = {
        'higienizacao-sofas': 'Higienização de Sofás',
        'limpeza-colchoes': 'Limpeza de Colchões',
        'higienizacao-tapetes': 'Higienização de Tapetes',
        'impermeabilizacao': 'Impermeabilização',
        'estofados-comerciais': 'Estofados Comerciais',
        'estofados-veiculares': 'Estofados Veiculares'
    };
    return services[serviceValue] || serviceValue;
}

// ===== SISTEMA DE NOTIFICAÇÕES =====
// Exibe notificações flutuantes na tela
function showNotification(message, type = 'info') {
    // Remove notificações existentes
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Cria elemento de notificação
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
        <div class="notification__content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification__close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Aplica estilos à notificação
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 9999;
        display: flex;
        align-items: center;
        gap: 1rem;
        max-width: 400px;
        animation: slideIn 0.3s ease-out;
    `;
    
    // Adiciona funcionalidade ao botão de fechar
    const closeBtn = notification.querySelector('.notification__close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 0.25rem;
        border-radius: 0.25rem;
        opacity: 0.8;
    `;
    
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOut 0.3s ease-in forwards';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Adiciona a notificação ao corpo da página
    document.body.appendChild(notification);
    
    // Remove automaticamente após 5 segundos
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOut 0.3s ease-in forwards';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// Adiciona animações CSS para notificações
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification__content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        flex: 1;
    }
    
    .notification__close:hover {
        opacity: 1;
        background-color: rgba(255, 255, 255, 0.1);
    }
`;
document.head.appendChild(notificationStyles);

// ===== ANIMAÇÕES AO ROLAR =====
// Aplica animações suaves a elementos quando entram na viewport
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observa cards de serviços, diferenciais e depoimentos para animação
const animateElements = document.querySelectorAll('.service__card, .differential__card, .testimonial__card, .about__stat');
animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ===== CARROSSEL DE DEPOIMENTOS (Opcional) =====
// Alterna automaticamente os depoimentos exibidos
const testimonialCards = document.querySelectorAll('.testimonial__card');
let currentTestimonial = 0;

function showTestimonial(index) {
    testimonialCards.forEach((card, i) => {
        if (i === index) {
            card.style.display = 'block';
            card.style.opacity = '1';
            card.style.transform = 'translateX(0)';
        } else {
            card.style.opacity = '0.5';
            card.style.transform = 'translateX(20px)';
        }
    });
}

// Rotaciona depoimentos a cada 5 segundos
if (testimonialCards.length > 1) {
    setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonialCards.length;
        showTestimonial(currentTestimonial);
    }, 5000);
}

// ===== VALIDAÇÃO DO FORMULÁRIO =====
// Valida os campos do formulário ao perder o foco
const formInputs = document.querySelectorAll('.form__input');

formInputs.forEach(input => {
    input.addEventListener('blur', validateInput);
    input.addEventListener('input', clearValidation);
});

function validateInput(e) {
    const input = e.target;
    const value = input.value.trim();
    
    // Remove classes de validação
    input.classList.remove('form__input--error', 'form__input--success');
    
    // Valida com base no tipo de entrada
    let isValid = true;
    
    if (input.hasAttribute('required') && !value) {
        isValid = false;
    }
    
    if (input.type === 'email' && value && !isValidEmail(value)) {
        isValid = false;
    }
    
    if (input.type === 'tel' && value && !isValidPhone(value)) {
        isValid = false;
    }
    
    // Aplica classes de validação visual
    if (value) {
        input.classList.add(isValid ? 'form__input--success' : 'form__input--error');
    }
}

function clearValidation(e) {
    const input = e.target;
    input.classList.remove('form__input--error', 'form__input--success');
}

// Valida formato de e-mail
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Valida formato de telefone
function isValidPhone(phone) {
    const phoneRegex = /^[\(\)\s\-\+\d]{10,}$/;
    return phoneRegex.test(phone);
}

// Adiciona estilos CSS para validação do formulário
const validationStyles = document.createElement('style');
validationStyles.textContent = `
    .form__input--error {
        border-color: #ef4444 !important;
        box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1) !important;
    }
    
    .form__input--success {
        border-color: #10b981 !important;
        box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.1) !important;
    }
`;
document.head.appendChild(validationStyles);

// ===== FORMATAÇÃO DE NÚMERO DE TELEFONE =====
// Formata automaticamente o campo de WhatsApp com máscara
const phoneInput = document.getElementById('whatsapp');
if (phoneInput) {
    phoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        
        if (value.length >= 11) {
            value = value.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');
        } else if (value.length >= 7) {
            value = value.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, '($1) $2-$3');
        } else if (value.length >= 3) {
            value = value.replace(/^(\d{2})(\d{0,5})/, '($1) $2');
        } else if (value.length >= 1) {
            value = value.replace(/^(\d{0,2})/, '($1');
        }
        
        e.target.value = value;
    });
}

// ===== ANIMAÇÃO DE CARREGAMENTO =====
// Aplica animações ao carregar a página
window.addEventListener('load', () => {
    // Esconde a tela de carregamento, se existir
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => loader.remove(), 500);
    }
    
    // Anima elementos da seção hero ao carregar
    const heroElements = document.querySelectorAll('.hero__title, .hero__subtitle, .hero__description');
    heroElements.forEach((el, index) => {
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 200);
    });
});

// ===== OTIMIZAÇÃO DE PERFORMANCE =====
// Função para limitar chamadas excessivas em eventos de rolagem
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Aplica debounce aos eventos de rolagem para melhor performance
window.removeEventListener('scroll', scrollActive);
window.removeEventListener('scroll', scrollHeader);
window.removeEventListener('scroll', scrollToTop);

window.addEventListener('scroll', debounce(scrollActive, 10));
window.addEventListener('scroll', debounce(scrollHeader, 10));
window.addEventListener('scroll', debounce(scrollToTop, 10));

// ===== MELHORIAS DE ACESSIBILIDADE =====
// Fecha o menu com a tecla Esc no celular
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('show-menu')) {
        navMenu.classList.remove('show-menu');
        navToggle.focus();
    }
});

// Gerencia o foco ao abrir o menu no celular
navToggle?.addEventListener('click', () => {
    setTimeout(() => {
        const firstLink = navMenu.querySelector('.nav__link');
        firstLink?.focus();
    }, 100);
});

// ===== ALTERNÂNCIA DE TEMA =====
// Alterna entre modo claro e escuro
const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        if (currentTheme === 'dark') {
            document.documentElement.removeAttribute('data-theme');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem('theme', 'dark');
        }
    });

    // Carrega o tema salvo do localStorage
    if (localStorage.getItem('theme') === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
}

// ===== MENSAGEM DE BOAS-VINDAS NO CONSOLE =====
// Exibe mensagem no console para desenvolvedores
console.log('%c🚀 JP Higienizações - Website carregado com sucesso!', 'color: #1e3a8a; font-size: 16px; font-weight: bold;');
console.log('%c💻 Desenvolvido com HTML, CSS e JavaScript', 'color: #6b7280; font-size: 12px;');

// ===== TRATAMENTO DE ERROS =====
// Captura erros globais e os registra no console
window.addEventListener('error', (e) => {
    console.error('Erro capturado:', e.error);
});

// ===== REGISTRO DE SERVICE WORKER (Opcional) =====
// Registra um service worker para funcionalidades offline
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('Service Worker registrado:', registration);
            })
            .catch(registrationError => {
                console.log('Falha ao registrar Service Worker:', registrationError);
            });
    });
}