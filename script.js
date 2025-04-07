// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.padding = '10px 0';
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.padding = '15px 0';
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const navbarToggler = document.querySelector('.navbar-toggler');
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    navbarToggler.click();
                }
            }
        });
    });

    // Loan calculator functionality
    const loanAmountInput = document.getElementById('loanAmount');
    const loanTermInput = document.getElementById('loanTerm');
    const interestRateInput = document.getElementById('interestRate');
    const calculateBtn = document.getElementById('calculateBtn');
    const monthlyPaymentOutput = document.getElementById('monthlyPayment');
    const totalPaymentOutput = document.getElementById('totalPayment');
    const totalInterestOutput = document.getElementById('totalInterest');

    if (calculateBtn) {
        calculateBtn.addEventListener('click', function() {
            const principal = parseFloat(loanAmountInput.value);
            const interestRate = parseFloat(interestRateInput.value) / 100 / 12;
            const loanTerm = parseFloat(loanTermInput.value) * 12;
            
            if (principal > 0 && interestRate > 0 && loanTerm > 0) {
                const x = Math.pow(1 + interestRate, loanTerm);
                const monthlyPayment = (principal * x * interestRate) / (x - 1);
                
                const totalPayment = monthlyPayment * loanTerm;
                const totalInterest = totalPayment - principal;
                
                monthlyPaymentOutput.innerHTML = '₹' + monthlyPayment.toFixed(2);
                totalPaymentOutput.innerHTML = '₹' + totalPayment.toFixed(2);
                totalInterestOutput.innerHTML = '₹' + totalInterest.toFixed(2);
            }
        });
    }

    // Form validation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple validation
            let isValid = true;
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const message = document.getElementById('message').value;
            
            if (name.trim() === '') {
                isValid = false;
                document.getElementById('name').classList.add('is-invalid');
            } else {
                document.getElementById('name').classList.remove('is-invalid');
            }
            
            if (email.trim() === '' || !isValidEmail(email)) {
                isValid = false;
                document.getElementById('email').classList.add('is-invalid');
            } else {
                document.getElementById('email').classList.remove('is-invalid');
            }
            
            if (phone.trim() === '' || !isValidPhone(phone)) {
                isValid = false;
                document.getElementById('phone').classList.add('is-invalid');
            } else {
                document.getElementById('phone').classList.remove('is-invalid');
            }
            
            if (message.trim() === '') {
                isValid = false;
                document.getElementById('message').classList.add('is-invalid');
            } else {
                document.getElementById('message').classList.remove('is-invalid');
            }
            
            if (isValid) {
                // Here you would typically send the form data to a server
                // For demo purposes, we'll just show a success message
                const formContainer = document.querySelector('.form-container');
                const successMessage = document.createElement('div');
                successMessage.className = 'alert alert-success';
                successMessage.innerHTML = 'Thank you for your message! We will get back to you soon.';
                
                formContainer.innerHTML = '';
                formContainer.appendChild(successMessage);
            }
        });
    }

    // Helper functions for validation
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function isValidPhone(phone) {
        const phoneRegex = /^\d{10}$/;
        return phoneRegex.test(phone);
    }

    // Animation on scroll
    const animatedElements = document.querySelectorAll('.loan-card, .feature-card, .step-card, .eligibility-item');
    
    function checkIfInView() {
        const windowHeight = window.innerHeight;
        const windowTopPosition = window.scrollY;
        const windowBottomPosition = windowTopPosition + windowHeight;
        
        animatedElements.forEach(function(element) {
            const elementHeight = element.offsetHeight;
            const elementTopPosition = element.offsetTop;
            const elementBottomPosition = elementTopPosition + elementHeight;
            
            // Check if element is in view
            if (
                (elementBottomPosition >= windowTopPosition) &&
                (elementTopPosition <= windowBottomPosition)
            ) {
                element.classList.add('animated');
            }
        });
    }
    
    // Run on page load
    checkIfInView();
    
    // Run on scroll
    window.addEventListener('scroll', checkIfInView);
});