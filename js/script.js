// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
  // 多语言切换功能
  const langSelect = document.getElementById('lang-select');
  const sidebarLangSelect = document.getElementById('sidebar-lang-select');
  
  // 初始化语言为英语
  setLanguage('en');
  
  // 语言选择器事件
  langSelect.addEventListener('change', function() {
    setLanguage(this.value);
  });
  
  sidebarLangSelect.addEventListener('change', function() {
    setLanguage(this.value);
    langSelect.value = this.value;
  });
  
  // 设置语言函数
  function setLanguage(lang) {
    // 更新所有带有data-lang属性的元素
    document.querySelectorAll('[data-lang-' + lang + ']').forEach(element => {
      const attr = 'data-lang-' + lang;
      if (element.tagName === 'INPUT' && element.getAttribute('placeholder')) {
        element.placeholder = element.getAttribute(attr);
      } else {
        element.textContent = element.getAttribute(attr);
      }
    });
    
    // 更新图片alt属性
    document.querySelectorAll('img[data-lang-' + lang + ']').forEach(img => {
      img.alt = img.getAttribute('data-lang-' + lang);
    });
  }
  
  // 轮播图功能
  const carousels = document.querySelectorAll('.carousel');
  
  carousels.forEach(carousel => {
    const images = carousel.querySelectorAll('img');
    const prevBtn = carousel.querySelector('.prev');
    const nextBtn = carousel.querySelector('.next');
    let currentIndex = 0;
    
    // 显示当前图片
    function showImage(index) {
      images.forEach(img => img.classList.remove('active'));
      images[index].classList.add('active');
    }
    
    // 上一张
    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      showImage(currentIndex);
    });
    
    // 下一张
    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % images.length;
      showImage(currentIndex);
    });
    
    // 自动轮播
    let interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % images.length;
      showImage(currentIndex);
    }, 5000);
    
    // 鼠标悬停时暂停轮播
    carousel.addEventListener('mouseenter', () => {
      clearInterval(interval);
    });
    
    // 鼠标离开时恢复轮播
    carousel.addEventListener('mouseleave', () => {
      interval = setInterval(() => {
        currentIndex = (currentIndex + 1) % images.length;
        showImage(currentIndex);
      }, 5000);
    });
  });
  
  // FAQ折叠功能
  const faqQuestions = document.querySelectorAll('.faq-question');
  
  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      // 切换当前问题的活跃状态
      question.classList.toggle('active');
      
      // 获取对应的答案元素
      const answer = question.nextElementSibling;
      
      // 切换答案的显示状态
      answer.classList.toggle('active');
    });
  });
  
  // 菜单切换功能
  const menuToggle = document.querySelector('.menu-toggle');
  const sidebarNav = document.querySelector('.sidebar-nav');
  const overlay = document.querySelector('.overlay');
  
  // 同步两个语言选择器
  langSelect.addEventListener('change', () => {
    sidebarLangSelect.value = langSelect.value;
  });
  
  // 切换侧边栏显示状态
  function toggleSidebar() {
    sidebarNav.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.classList.toggle('overflow-hidden'); // 防止背景滚动
  }
  
  menuToggle.addEventListener('click', toggleSidebar);
  overlay.addEventListener('click', toggleSidebar);
  
  // 点击侧边栏链接后关闭侧边栏
  document.querySelectorAll('.sidebar-nav a').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        toggleSidebar();
      }
    });
  });
  
  // 窗口大小变化时自动调整导航显示方式
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      sidebarNav.classList.remove('active');
      overlay.classList.remove('active');
      document.body.classList.remove('overflow-hidden');
    }
  });
  
  // 导航栏滚动效果
  let lastScrollTop = 0;
  const header = document.getElementById('header');
  
  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // 向下滚动超过100px时隐藏导航栏，向上滚动时显示
    if (scrollTop > lastScrollTop && scrollTop > 100) {
      header.style.top = '-80px';
    } else {
      header.style.top = '0';
    }
    
    lastScrollTop = scrollTop;
  });
  
  // 表单提交处理
  const contactForm = document.querySelector('.contact-form');
  
  contactForm.addEventListener('submit', function(e) {
    //不阻止默认行为
    //e.preventDefault(); ←删除这行

  // 提交后延迟显示提示
  setTimeout(() => {
    alert('Thank you for your message! We will get back to you soon.');
  }, 300);
  });
});