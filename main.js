$(document).ready(function() {
    console.log("Assignment #8 - Interactive Website Loaded");
    console.log("Student: Alisher Akhmett | Group: SE 2425");

    $('body').append('<div class="loading-spinner"><div class="spinner"></div></div>');
    
    $(window).on('load', function() {
        $('.loading-spinner').fadeOut(500, function() {
            $(this).remove();
        });
    });

    $('a[href*="#"]').on('click', function (e) {
        const target = $(this.getAttribute('href'));
        if (target.length) {
            e.preventDefault();
            $('html, body').stop().animate({
                scrollTop: target.offset().top - 80
            }, 1000);
        }
    });

    $('.navbar-nav .nav-link').on('click', function() {
        $('.navbar-nav .nav-link').removeClass('active');
        $(this).addClass('active');
    });

    $(window).scroll(function() {
        if ($(window).scrollTop() > 50) {
            $('.navbar').addClass('navbar-scrolled');
        } else {
            $('.navbar').removeClass('navbar-scrolled');
        }
    });

    if ($('.hero-content .lead').length) {
        const text = "Web Developer & Frontend Enthusiast";
        const element = $('.hero-content .lead');
        let i = 0;
        
        element.text('');
        
        function typeWriter() {
            if (i < text.length) {
                element.text(element.text() + text.charAt(i));
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        
        setTimeout(typeWriter, 1000);
    }

    $('.hero-content').addClass('fade-in-up');

    let clickCount = 0;
    $('#demo-btn').on('click', function() {
        clickCount++;
        const messages = [
            "JavaScript is awesome!",
            "This is interactive content!",
            "Click count: " + clickCount,
            "Welcome to my portfolio!",
            "Thanks for exploring!"
        ];
        $('#demo-text').text(messages[clickCount % messages.length]).addClass('pulse-effect');
        
        setTimeout(function() {
            $('#demo-text').removeClass('pulse-effect');
        }, 1000);
    });

    let counterValue = 0;
    $('#counter-up').on('click', function() {
        counterValue++;
        $('#counter-value').text(counterValue).addClass('pulse-effect');
        setTimeout(() => $('#counter-value').removeClass('pulse-effect'), 300);
    });

    $('#counter-down').on('click', function() {
        counterValue--;
        $('#counter-value').text(counterValue).addClass('pulse-effect');
        setTimeout(() => $('#counter-value').removeClass('pulse-effect'), 300);
    });

    $('#fade-demo').on('click', function() {
        $('#demo-image').fadeToggle(500);
    });

    $('#slide-demo').on('click', function() {
        $('#demo-panel').slideToggle(500);
    });

    $('.gallery-item img, .gallery-img').on('click', function() {
        const imgSrc = $(this).attr('src');
        const imgAlt = $(this).attr('alt');
        
        const lightboxHtml = `
            <div class="lightbox" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; 
                 background: rgba(0,0,0,0.9); display: flex; justify-content: center; align-items: center; 
                 z-index: 9999; cursor: pointer;">
                <div class="lightbox-content" style="position: relative; max-width: 90%; max-height: 90%;">
                    <img src="${imgSrc}" alt="${imgAlt}" style="width: 100%; height: auto; border-radius: 10px; 
                         box-shadow: 0 0 50px rgba(255,255,255,0.3);">
                    <button class="close-lightbox" style="position: absolute; top: -50px; right: 10px; 
                            background: white; border: none; border-radius: 50%; width: 40px; height: 40px; 
                            cursor: pointer; font-size: 18px; font-weight: bold;">&times;</button>
                </div>
            </div>
        `;
        
        $('body').append(lightboxHtml);
        $('.lightbox').hide().fadeIn(300);
    });

    $(document).on('click', '.close-lightbox, .lightbox', function(e) {
        if (e.target === this || $(e.target).hasClass('close-lightbox')) {
            $('.lightbox').fadeOut(300, function() {
                $(this).remove();
            });
        }
    });

    $('[data-filter]').on('click', function() {
        const filter = $(this).data('filter');
        
        $('[data-filter]').removeClass('active');
        $(this).addClass('active');
        
        if (filter === 'all') {
            $('.project-item').fadeIn(500);
        } else {
            $('.project-item').hide();
            $(`.project-item[data-category*="${filter}"]`).fadeIn(500);
        }
    });

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        $('#message').on('input', function() {
            const charCount = $(this).val().length;
            $('#charCount').text(charCount);
            
            if (charCount > 500) {
                $(this).addClass('is-invalid');
                $('#charCount').addClass('text-danger');
            } else {
                $(this).removeClass('is-invalid').addClass('is-valid');
                $('#charCount').removeClass('text-danger');
            }
        });

        $('#contactForm input, #contactForm select, #contactForm textarea').on('blur input', function() {
            validateField(this);
        });

        $('#contactForm').on('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            
            $(this).find('input[required], select[required], textarea[required]').each(function() {
                if (!validateField(this)) {
                    isValid = false;
                }
            });

            if (!$('#privacy').is(':checked')) {
                $('#privacy').addClass('is-invalid');
                isValid = false;
            }

            if (isValid) {
                showFormSuccess();
            } else {
                showFormError('Please correct the errors above and try again.');
            }
        });

        $('#contactForm').on('reset', function() {
            setTimeout(() => {
                $(this).find('.is-valid, .is-invalid').removeClass('is-valid is-invalid');
                $('#formResult').empty();
                $('#charCount').text('0');
            }, 10);
        });
    }

    function animateSkills() {
        $('.progress-bar').each(function() {
            const $progressBar = $(this);
            const width = $progressBar.css('width');
            const elementTop = $progressBar.offset().top;
            const elementBottom = elementTop + $progressBar.outerHeight();
            const viewportTop = $(window).scrollTop();
            const viewportBottom = viewportTop + $(window).height();
            
            if (elementBottom > viewportTop && elementTop < viewportBottom && !$progressBar.hasClass('animated')) {
                $progressBar.css('width', '0%').addClass('animated');
                $progressBar.animate({ width: width }, 2000);
            }
        });
    }

    function animateCounters() {
        $('.counter').each(function() {
            const $this = $(this);
            const countTo = parseInt($this.attr('data-count'));
            const elementTop = $this.offset().top;
            const elementBottom = elementTop + $this.outerHeight();
            const viewportTop = $(window).scrollTop();
            const viewportBottom = viewportTop + $(window).height();
            
            if (elementBottom > viewportTop && elementTop < viewportBottom && !$this.hasClass('counted')) {
                $this.addClass('counted');
                $({ countNum: 0 }).animate({
                    countNum: countTo
                }, {
                    duration: 2000,
                    easing: 'swing',
                    step: function() {
                        $this.text(Math.floor(this.countNum));
                    },
                    complete: function() {
                        $this.text(countTo);
                    }
                });
            }
        });
    }

    $(window).scroll(function() {
        animateSkills();
        animateCounters();
        
        $('.content-card, .project-card').each(function() {
            const elementTop = $(this).offset().top;
            const elementBottom = elementTop + $(this).outerHeight();
            const viewportTop = $(window).scrollTop();
            const viewportBottom = viewportTop + $(window).height();
            
            if (elementBottom > viewportTop && elementTop < viewportBottom) {
                $(this).addClass('fade-in-up');
            }
        });
    });

    $(window).scroll(function() {
        if ($(this).scrollTop() > 300) {
            $('#backToTop').fadeIn();
        } else {
            $('#backToTop').fadeOut();
        }
    });

    $('#backToTop').click(function() {
        $('html, body').animate({ scrollTop: 0 }, 1000);
        return false;
    });

    $('[data-bs-toggle="tooltip"]').tooltip();
    
    $('[data-bs-toggle="popover"]').popover();

    $('.project-card .card').hover(
        function() {
            $(this).find('.card-img-top').css('transform', 'scale(1.1)');
        },
        function() {
            $(this).find('.card-img-top').css('transform', 'scale(1)');
        }
    );

    $('.btn').hover(
        function() {
            $(this).addClass('shadow-lg');
        },
        function() {
            $(this).removeClass('shadow-lg');
        }
    );

    function validateField(field) {
        const $field = $(field);
        const value = $field.val().trim();
        let isValid = true;

        $field.removeClass('is-valid is-invalid');

        if ($field.prop('required') && value === '') {
            $field.addClass('is-invalid');
            isValid = false;
        }
        else if ($field.attr('type') === 'email' && value !== '') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                $field.addClass('is-invalid');
                isValid = false;
            } else {
                $field.addClass('is-valid');
            }
        }
        else if (value !== '') {
            $field.addClass('is-valid');
        }

        return isValid;
    }

    function showFormSuccess() {
        const successHtml = `
            <div class="alert alert-success alert-dismissible fade show" role="alert">
                <i class="fas fa-check-circle me-2"></i>
                <strong>Success!</strong> Your message has been sent successfully. 
                I'll get back to you within 24 hours!
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            </div>
        `;
        
        $('#formResult').html(successHtml);
        $('#contactForm')[0].reset();
        $('#contactForm').find('.is-valid, .is-invalid').removeClass('is-valid is-invalid');
        $('#charCount').text('0');
        
        $('html, body').animate({
            scrollTop: $('#formResult').offset().top - 100
        }, 500);
    }

    function showFormError(message) {
        const errorHtml = `
            <div class="alert alert-danger alert-dismissible fade show" role="alert">
                <i class="fas fa-exclamation-triangle me-2"></i>
                <strong>Error!</strong> ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            </div>
        `;
        
        $('#formResult').html(errorHtml);
        
        const firstError = $('#contactForm .is-invalid').first();
        if (firstError.length) {
            $('html, body').animate({
                scrollTop: firstError.offset().top - 100
            }, 500);
        }
    }

    function debounce(func, wait, immediate) {
        let timeout;
        return function executedFunction() {
            const context = this;
            const args = arguments;
            const later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }

    const handleScroll = debounce(function() {
        animateSkills();
        animateCounters();
    }, 100);

    $(window).scroll(handleScroll);

    let konamiCode = [];
    const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
    
    $(document).keydown(function(e) {
        konamiCode.push(e.keyCode);
        if (konamiCode.length > konamiSequence.length) {
            konamiCode.shift();
        }
        
        if (konamiCode.join(',') === konamiSequence.join(',')) {
            $('body').addClass('rainbow-mode');
            alert('🎉 Easter egg activated! You found the Konami Code! 🎉');
            setTimeout(() => $('body').removeClass('rainbow-mode'), 5000);
        }
    });

    $('.navbar-brand').dblclick(function() {
        $(this).addClass('pulse-effect');
        setTimeout(() => $(this).removeClass('pulse-effect'), 1000);
        console.log('🎯 Double click detected! You found a hidden feature!');
    });

    console.log('✅ All interactive features loaded successfully!');
    console.log('🚀 Website ready for Assignment #8 demonstration');
});

document.addEventListener('DOMContentLoaded', function() {
    
    const darkModeToggle = document.createElement('button');
    darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    darkModeToggle.className = 'btn btn-outline-light position-fixed';
    darkModeToggle.style.cssText = 'top: 100px; right: 20px; z-index: 1000; border-radius: 50%; width: 45px; height: 45px;';
    darkModeToggle.title = 'Toggle Dark Mode';
    
    darkModeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        const icon = this.querySelector('i');
        if (document.body.classList.contains('dark-mode')) {
            icon.className = 'fas fa-sun';
            localStorage.setItem('darkMode', 'true');
        } else {
            icon.className = 'fas fa-moon';
            localStorage.setItem('darkMode', 'false');
        }
    });
    
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
        darkModeToggle.querySelector('i').className = 'fas fa-sun';
    }
    
    document.body.appendChild(darkModeToggle);

    console.log('📊 Performance Metrics:');
    console.log('Page Load Time:', window.performance.timing.loadEventEnd - window.performance.timing.navigationStart + 'ms');
    console.log('DOM Ready Time:', window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart + 'ms');
});

const darkModeStyles = `
    <style>
    .dark-mode {
        background-color: #1a1a1a !important;
        color: #ffffff !important;
    }
    .dark-mode .navbar {
        background-color: #000000 !important;
    }
    .dark-mode .content-card,
    .dark-mode .example-card {
        background-color: #2d2d2d !important;
        border-color: #404040 !important;
        color: #ffffff !important;
    }
    .dark-mode .bg-light {
        background-color: #2d2d2d !important;
    }
    .rainbow-mode * {
        animation: rainbow 2s infinite linear !important;
    }
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
    </style>
`;

document.head.insertAdjacentHTML('beforeend', darkModeStyles);