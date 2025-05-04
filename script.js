// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            
            // Toggle animation for menu button
            const spans = this.querySelectorAll('span');
            spans.forEach(span => span.classList.toggle('active'));
        });
    }
    
    // Newsletter form submission
    const newsletterForm = document.getElementById('newsletter-form');
    const newsletterMessage = document.getElementById('newsletter-message');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (validateEmail(email)) {
                // Simulate form submission
                newsletterMessage.textContent = 'Thank you for subscribing to our newsletter!';
                newsletterMessage.style.color = '#28a745';
                emailInput.value = '';
                
                // Reset message after 5 seconds
                setTimeout(() => {
                    newsletterMessage.textContent = '';
                }, 5000);
            } else {
                newsletterMessage.textContent = 'Please enter a valid email address.';
                newsletterMessage.style.color = '#dc3545';
            }
        });
    }
    
    // Blog filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const blogPosts = document.querySelectorAll('.blog-card');
    
    if (filterButtons.length > 0 && blogPosts.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-category');
                
                // Filter blog posts
                blogPosts.forEach(post => {
                    const postCategory = post.getAttribute('data-category');
                    
                    if (filterValue === 'all' || filterValue === postCategory) {
                        post.style.display = 'block';
                    } else {
                        post.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // Contact form validation and submission
    const contactForm = document.getElementById('contact-form');
    const formResponse = document.getElementById('form-response');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form inputs
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const subjectInput = document.getElementById('subject');
            const messageInput = document.getElementById('message');
            
            // Clear previous error messages
            document.querySelectorAll('.error-message').forEach(error => {
                error.textContent = '';
            });
            
            // Validate inputs
            let isValid = true;
            
            if (nameInput.value.trim() === '') {
                document.getElementById('name-error').textContent = 'Please enter your name';
                isValid = false;
            }
            
            if (emailInput.value.trim() === '') {
                document.getElementById('email-error').textContent = 'Please enter your email';
                isValid = false;
            } else if (!validateEmail(emailInput.value.trim())) {
                document.getElementById('email-error').textContent = 'Please enter a valid email address';
                isValid = false;
            }
            
            if (subjectInput.value === '') {
                document.getElementById('subject-error').textContent = 'Please select a subject';
                isValid = false;
            }
            
            if (messageInput.value.trim() === '') {
                document.getElementById('message-error').textContent = 'Please enter your message';
                isValid = false;
            }
            
            // If form is valid, simulate submission
            if (isValid) {
                // In a real application, you would send this data to a server
                formResponse.textContent = 'Thank you for your message! We will get back to you soon.';
                formResponse.className = 'form-response success';
                
                // Reset form
                contactForm.reset();
                
                // Hide success message after 5 seconds
                setTimeout(() => {
                    formResponse.style.display = 'none';
                }, 5000);
            }
        });
        
        // Add input event listeners for real-time validation
        const inputs = contactForm.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', function() {
                const errorElement = document.getElementById(`${this.id}-error`);
                
                if (this.value.trim() !== '') {
                    // Clear error message when user starts typing
                    if (errorElement) {
                        errorElement.textContent = '';
                    }
                }
                
                // Validate email in real-time
                if (this.type === 'email' && this.value.trim() !== '') {
                    if (!validateEmail(this.value.trim())) {
                        document.getElementById('email-error').textContent = 'Please enter a valid email address';
                    } else {
                        document.getElementById('email-error').textContent = '';
                    }
                }
            });
        });
    }
    
    // FAQ accordion functionality
    const accordionToggles = document.querySelectorAll('.accordion-toggle');
    
    if (accordionToggles.length > 0) {
        accordionToggles.forEach(toggle => {
            toggle.addEventListener('click', function() {
                // Close other accordion items
                accordionToggles.forEach(item => {
                    if (item !== this) {
                        item.classList.remove('active');
                        item.nextElementSibling.style.maxHeight = 0;
                        item.nextElementSibling.style.padding = 0;
                    }
                });
                
                // Toggle current accordion item
                this.classList.toggle('active');
                const content = this.nextElementSibling;
                
                if (this.classList.contains('active')) {
                    content.style.maxHeight = content.scrollHeight + 30 + 'px';
                    content.style.padding = '15px';
                } else {
                    content.style.maxHeight = 0;
                    content.style.padding = 0;
                }
            });
        });
    }
    
    // Image slider for featured posts (enhance UX)
    const postCards = document.querySelectorAll('.post-card');
    
    if (postCards.length > 0) {
        postCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.querySelector('.post-image img').style.transform = 'scale(1.05)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.querySelector('.post-image img').style.transform = 'scale(1)';
            });
        });
    }
    
    // Pagination functionality (for blog page)
    const paginationButtons = document.querySelectorAll('.pagination-btn');
    
    if (paginationButtons.length > 0) {
        paginationButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                paginationButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                if (!this.classList.contains('next')) {
                    this.classList.add('active');
                }
                
                // In a real application, you would load different posts here
                // For now, just scroll to top of blog posts section
                document.querySelector('.blog-posts').scrollIntoView({ behavior: 'smooth' });
            });
        });
    }
});

// Helper function to validate email format
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}