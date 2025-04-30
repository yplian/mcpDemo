// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 导航栏滚动时固定
    const nav = document.querySelector('.main-nav');
    const navHeight = nav.offsetHeight;
    const header = document.querySelector('.header');
    const headerHeight = header.offsetHeight;

    window.addEventListener('scroll', function() {
        if (window.scrollY > headerHeight) {
            nav.classList.add('fixed');
            document.body.style.paddingTop = navHeight + 'px';
        } else {
            nav.classList.remove('fixed');
            document.body.style.paddingTop = 0;
        }
    });

    // 导航栏激活状态
    const navLinks = document.querySelectorAll('.main-nav a');
    const sections = document.querySelectorAll('.section');

    window.addEventListener('scroll', function() {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });

    // 平滑滚动到锚点
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            window.scrollTo({
                top: targetSection.offsetTop - navHeight,
                behavior: 'smooth'
            });
        });
    });

    // 图片懒加载
    const lazyImages = document.querySelectorAll('img');

    const lazyLoad = function() {
        let lazyImagePositions = [];
        lazyImages.forEach(img => {
            lazyImagePositions.push(img.getBoundingClientRect().top + window.scrollY);
        });

        let onScrollLazy = function() {
            for (let i = 0; i < lazyImages.length; i++) {
                if (window.scrollY + window.innerHeight > lazyImagePositions[i] - 200) {
                    if (lazyImages[i].getAttribute('data-src')) {
                        lazyImages[i].src = lazyImages[i].getAttribute('data-src');
                        lazyImages[i].removeAttribute('data-src');
                    }
                }
            }
        };

        window.addEventListener('scroll', onScrollLazy);
        window.addEventListener('resize', onScrollLazy);
        window.addEventListener('orientationChange', onScrollLazy);
        onScrollLazy();
    };

    lazyLoad();

    // 添加景点收藏功能
    const attractionCards = document.querySelectorAll('.attraction-card');

    attractionCards.forEach(card => {
        const header = card.querySelector('.attraction-header');
        const favoriteBtn = document.createElement('button');
        favoriteBtn.className = 'favorite-btn';
        favoriteBtn.innerHTML = '<i class="far fa-heart"></i>';
        header.appendChild(favoriteBtn);

        favoriteBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            if (this.classList.contains('active')) {
                this.innerHTML = '<i class="fas fa-heart"></i>';
            } else {
                this.innerHTML = '<i class="far fa-heart"></i>';
            }
        });
    });

    // 响应式菜单
    const menuToggle = document.createElement('button');
    menuToggle.className = 'menu-toggle';
    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    nav.querySelector('.container').prepend(menuToggle);

    menuToggle.addEventListener('click', function() {
        nav.querySelector('ul').classList.toggle('show');
    });

    // 图片点击放大
    const images = document.querySelectorAll('.attraction-image img, .food-image img');

    images.forEach(img => {
        img.addEventListener('click', function() {
            const overlay = document.createElement('div');
            overlay.className = 'image-overlay';

            const imgClone = document.createElement('img');
            imgClone.src = this.src;

            const closeBtn = document.createElement('span');
            closeBtn.className = 'close-btn';
            closeBtn.innerHTML = '&times;';

            overlay.appendChild(imgClone);
            overlay.appendChild(closeBtn);
            document.body.appendChild(overlay);

            closeBtn.addEventListener('click', function() {
                document.body.removeChild(overlay);
            });

            overlay.addEventListener('click', function(e) {
                if (e.target === overlay) {
                    document.body.removeChild(overlay);
                }
            });
        });
    });
});
