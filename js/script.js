// 导航滚动隐藏/显示
let lastScrollTop = 0;
const header = document.getElementById('header');
const headerHeight = header.offsetHeight;

window.addEventListener('scroll', function() {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  if(scrollTop > lastScrollTop){
    header.style.top = `-${headerHeight}px`;
  } else {
    header.style.top = "0";
  }
  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// 轮播功能
document.querySelectorAll('.carousel').forEach(carousel => {
  const images = carousel.querySelectorAll('img');
  let index = 0;
  if (images.length > 0) {
    images[index].classList.add('active');

    const prev = carousel.querySelector('.prev');
    const next = carousel.querySelector('.next');

    if (prev) {
      prev.addEventListener('click', () => {
        images[index].classList.remove('active');
        index = (index - 1 + images.length) % images.length;
        images[index].classList.add('active');
      });
    }

    if (next) {
      next.addEventListener('click', () => {
        images[index].classList.remove('active');
        index = (index + 1) % images.length;
        images[index].classList.add('active');
      });
    }
  }
});

// 多语言切换功能
document.addEventListener('DOMContentLoaded', function() {
  // 检测用户浏览器语言并设置默认语言
  const userLang = navigator.language || navigator.userLanguage;
  let defaultLang = 'en';
  
  if (userLang.startsWith('ja')) {
    defaultLang = 'ja';
  } else if (userLang.startsWith('ko')) {
    defaultLang = 'ko';
  } else if (userLang.startsWith('zh-CN') || userLang.startsWith('zh-SG')) {
    defaultLang = 'zh-cn';
  } else if (userLang.startsWith('zh-TW') || userLang.startsWith('zh-HK')) {
    defaultLang = 'zh-tw';
  } else if (userLang.startsWith('es')) {
    defaultLang = 'es';
  }
  
  // 从本地存储读取用户偏好语言
  const savedLang = localStorage.getItem('preferredLanguage');
  if (savedLang) {
    defaultLang = savedLang;
  }
  
  // 设置默认语言
  setLanguage(defaultLang);
  document.getElementById('lang-select').value = defaultLang;
  
  // 语言选择事件
  document.getElementById('lang-select').addEventListener('change', function() {
    const lang = this.value;
    setLanguage(lang);
    localStorage.setItem('preferredLanguage', lang);
  });
});

// 设置语言函数
function setLanguage(lang) {
  // 更新文本内容
  document.querySelectorAll(`[data-lang-${lang}]`).forEach(element => {
    const content = element.getAttribute(`data-lang-${lang}`);
    if (content) {
      element.textContent = content;
    }
  });
  
  // 更新图片alt属性
  document.querySelectorAll(`img[data-lang-${lang}]`).forEach(img => {
    const altText = img.getAttribute(`data-lang-${lang}`);
    if (altText) {
      img.alt = altText;
    }
  });
  
  // 更新输入框占位符
  document.querySelectorAll(`[data-placeholder-${lang}]`).forEach(input => {
    const placeholder = input.getAttribute(`data-placeholder-${lang}`);
    if (placeholder) {
      input.placeholder = placeholder;
    }
  });
}
// FAQ折叠功能
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
      // 切换当前问题的激活状态
      question.classList.toggle('active');
      
      // 切换对应答案的显示状态
      const answer = question.nextElementSibling;
      answer.classList.toggle('active');
    });
  });