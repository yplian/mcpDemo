document.addEventListener('DOMContentLoaded', function() {
    // 移动菜单切换
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
        });
    }
    
    // 选项卡功能
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-pane');
    
    if (tabBtns.length > 0 && tabContents.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // 移除所有按钮的active类
                tabBtns.forEach(btn => btn.classList.remove('active'));
                
                // 添加当前按钮的active类
                this.classList.add('active');
                
                // 隐藏所有内容区域
                tabContents.forEach(content => content.classList.remove('active'));
                
                // 显示对应的内容区域
                const targetTab = document.getElementById(this.dataset.target);
                if (targetTab) {
                    targetTab.classList.add('active');
                }
            });
        });
    }
    
    // 滚动动画
    const scrollElements = document.querySelectorAll('.scroll-animation');
    
    // 检查元素是否在视口中
    const isElementInViewport = (el) => {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85
        );
    };
    
    // 处理滚动动画
    const handleScrollAnimation = () => {
        scrollElements.forEach(el => {
            if (isElementInViewport(el)) {
                el.classList.add('active');
            }
        });
    };
    
    // 初始检查
    handleScrollAnimation();
    
    // 滚动时检查
    window.addEventListener('scroll', () => {
        handleScrollAnimation();
    });
    
    // 图片延迟加载
    const lazyImages = document.querySelectorAll('.lazy-load');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.dataset.src;
                    
                    img.src = src;
                    img.classList.remove('lazy-load');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    } else {
        // 降级处理
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
            img.classList.remove('lazy-load');
        });
    }
    
    // 平滑滚动到锚点
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // 减去导航栏高度
                    behavior: 'smooth'
                });
                
                // 如果是在移动设备上，点击后关闭菜单
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    if (mobileMenuBtn) {
                        mobileMenuBtn.classList.remove('active');
                    }
                }
            }
        });
    });
    
    // 表单验证
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 获取表单字段
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');
            
            // 验证名称
            if (!nameInput.value.trim()) {
                showError(nameInput, '请输入您的姓名');
                return;
            } else {
                removeError(nameInput);
            }
            
            // 验证邮箱
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailInput.value.trim())) {
                showError(emailInput, '请输入有效的邮箱地址');
                return;
            } else {
                removeError(emailInput);
            }
            
            // 验证消息
            if (!messageInput.value.trim()) {
                showError(messageInput, '请输入您的留言内容');
                return;
            } else {
                removeError(messageInput);
            }
            
            // 模拟表单提交 - 在实际应用中替换为真实的API调用
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            
            submitBtn.disabled = true;
            submitBtn.textContent = '提交中...';
            
            // 模拟API请求延迟
            setTimeout(() => {
                // 显示成功消息
                const successMessage = document.createElement('div');
                successMessage.className = 'alert-success';
                successMessage.textContent = '您的消息已成功发送，我们会尽快回复您！';
                
                contactForm.reset();
                contactForm.appendChild(successMessage);
                
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
                
                // 3秒后移除成功消息
                setTimeout(() => {
                    successMessage.remove();
                }, 3000);
            }, 1500);
        });
        
        // 显示错误消息
        function showError(input, message) {
            const formGroup = input.closest('.form-group');
            const errorElement = formGroup.querySelector('.error-message') || document.createElement('div');
            
            errorElement.className = 'error-message';
            errorElement.textContent = message;
            
            if (!formGroup.querySelector('.error-message')) {
                formGroup.appendChild(errorElement);
            }
            
            formGroup.classList.add('has-error');
            input.focus();
        }
        
        // 移除错误消息
        function removeError(input) {
            const formGroup = input.closest('.form-group');
            const errorElement = formGroup.querySelector('.error-message');
            
            if (errorElement) {
                errorElement.remove();
            }
            
            formGroup.classList.remove('has-error');
        }
        
        // 输入时移除错误提示
        contactForm.querySelectorAll('.form-control').forEach(input => {
            input.addEventListener('input', function() {
                removeError(this);
            });
        });
    }
    
    // 固定导航栏滚动效果
    const header = document.querySelector('header');
    
    if (header) {
        let lastScrollTop = 0;
        
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > 100) {
                header.classList.add('scrolled');
                
                // 向下滚动时隐藏，向上滚动时显示
                if (scrollTop > lastScrollTop) {
                    header.classList.add('hidden');
                } else {
                    header.classList.remove('hidden');
                }
                
            } else {
                header.classList.remove('scrolled');
                header.classList.remove('hidden');
            }
            
            lastScrollTop = scrollTop;
        });
    }
    
    // 初始化 AOS 动画库 (如果存在)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true
        });
    }
});