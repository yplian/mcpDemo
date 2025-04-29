// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', () => {
    // 行程选项卡切换功能
    const dayBtns = document.querySelectorAll('.day-btn');
    const dayContents = document.querySelectorAll('.day-content');

    dayBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // 移除所有按钮和内容的active类
            dayBtns.forEach(b => b.classList.remove('active'));
            dayContents.forEach(content => content.classList.remove('active'));

            // 为当前点击的按钮添加active类
            btn.classList.add('active');

            // 显示对应的内容
            const dayNumber = btn.getAttribute('data-day');
            const targetContent = document.getElementById(`day-${dayNumber}`);
            targetContent.classList.add('active');
        });
    });

    // 图片加载处理
    const images = document.querySelectorAll('.spot-image img');

    // 设置默认的占位图样式
    const createPlaceholder = (imgElement, placeholderText) => {
        const parent = imgElement.parentElement;

        // 创建占位元素
        const placeholder = document.createElement('div');
        placeholder.className = 'image-placeholder';
        placeholder.style.backgroundColor = '#e0e0e0';
        placeholder.style.width = '100%';
        placeholder.style.height = '240px';
        placeholder.style.display = 'flex';
        placeholder.style.alignItems = 'center';
        placeholder.style.justifyContent = 'center';
        placeholder.style.color = '#666';
        placeholder.style.fontSize = '1.2rem';
        placeholder.style.borderRadius = '8px';

        // 添加景点名称
        const text = document.createElement('div');
        text.textContent = placeholderText || '自然风光';

        // 添加图标
        const icon = document.createElement('i');
        icon.className = 'fas fa-image';
        icon.style.marginRight = '10px';
        icon.style.fontSize = '1.5rem';

        // 组合占位图
        const content = document.createElement('div');
        content.style.display = 'flex';
        content.style.flexDirection = 'column';
        content.style.alignItems = 'center';
        content.style.gap = '10px';

        content.appendChild(icon);
        content.appendChild(text);
        placeholder.appendChild(content);

        // 替换原图片
        parent.replaceChild(placeholder, imgElement);
    };

    images.forEach(img => {
        // 设置图片加载动画
        img.style.opacity = '0';
        img.style.transition = 'opacity 1s ease';

        // 图片加载成功时显示
        img.onload = function() {
            this.style.opacity = '1';
        };

        // 图片加载失败时显示占位图
        img.onerror = function() {
            const altText = this.alt;
            createPlaceholder(this, altText);
        };

        // 如果图片已经缓存，立即显示
        if (img.complete) {
            if (img.naturalWidth === 0) {
                // 图片加载失败
                const altText = img.alt;
                createPlaceholder(img, altText);
            } else {
                // 图片已加载
                img.style.opacity = '1';
            }
        }
    });

    // 滚动动画
    const scrollElements = document.querySelectorAll('section, .highlight-item, .tip-card');

    const elementInView = (el, percentageScroll = 100) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <=
            (window.innerHeight || document.documentElement.clientHeight) * (percentageScroll/100)
        );
    };

    const displayScrollElement = (element) => {
        element.classList.add('scrolled');
    };

    const hideScrollElement = (element) => {
        element.classList.remove('scrolled');
    };

    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 90)) {
                displayScrollElement(el);
            } else {
                hideScrollElement(el);
            }
        });
    };

    // 添加滚动效果的样式
    const style = document.createElement('style');
    style.textContent = `
        section, .highlight-item, .tip-card {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }

        section.scrolled, .highlight-item.scrolled, .tip-card.scrolled {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);

    // 初始检查元素是否在视图中
    handleScrollAnimation();

    // 监听滚动事件
    window.addEventListener('scroll', () => {
        handleScrollAnimation();
    });

    // 添加平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});