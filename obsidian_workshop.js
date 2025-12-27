// 黑曜石科技工坊 - 共享功能脚本

// DOM 加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 初始化导航功能
    initNavigation();
    
    // 初始化搜索功能
    initSearch();
    
    // 初始化分类功能
    initCategories();
    
    // 初始化统计信息
    initStatistics();
    
    // 初始化滚动效果
    initScrollEffects();
});

/**
 * 初始化导航功能
 */
function initNavigation() {
    // 获取当前页面路径
    const currentPath = window.location.pathname;
    const currentPage = currentPath.split('/').pop();
    
    // 为当前页面的导航链接添加活跃状态
    const navLinks = document.querySelectorAll('.top-nav .nav-link');
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href').split('/').pop();
        if (linkPage === currentPage || (currentPage === 'obsidian_workshop.html' && linkPage === '')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

/**
 * 初始化搜索功能
 */
function initSearch() {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return;
    
    searchInput.addEventListener('input', handleSearch);
    
    // 添加搜索快捷键支持
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + F 聚焦搜索框
        if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
            e.preventDefault();
            searchInput.focus();
        }
    });
}

/**
 * 处理搜索逻辑
 */
function handleSearch(e) {
    const searchTerm = e.target.value.toLowerCase();
    const toolCards = document.querySelectorAll('.tool-card');
    const categorySections = document.querySelectorAll('.category-section');
    
    toolCards.forEach(card => {
        const toolName = card.dataset.name.toLowerCase();
        const toolDescription = card.querySelector('.tool-description').textContent.toLowerCase();
        const toolUrl = card.querySelector('.tool-url').textContent.toLowerCase();
        
        if (toolName.includes(searchTerm) || toolDescription.includes(searchTerm) || toolUrl.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
    
    // 显示/隐藏分类标题
    categorySections.forEach(section => {
        const cards = section.querySelectorAll('.tool-card');
        const visibleCards = Array.from(cards).filter(card => card.style.display !== 'none');
        const categoryTitle = section.querySelector('.category-title');
        const toolsGrid = section.querySelector('.tools-grid');
        
        if (visibleCards.length > 0) {
            categoryTitle.style.display = 'flex';
            toolsGrid.style.display = 'grid';
        } else {
            categoryTitle.style.display = 'none';
            toolsGrid.style.display = 'none';
        }
    });
    
    // 更新统计信息
    updateStatistics(searchTerm);
}

/**
 * 初始化分类功能
 */
function initCategories() {
    const categoryLinks = document.querySelectorAll('.sidebar-nav .nav-link');
    
    categoryLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 移除所有活跃状态
            categoryLinks.forEach(l => l.classList.remove('active'));
            
            // 添加当前链接的活跃状态
            this.classList.add('active');
            
            const category = this.dataset.category;
            
            // 显示/隐藏对应分类的工具
            showCategory(category);
            
            // 平滑滚动到内容顶部
            const content = document.querySelector('.content-area');
            content.scrollIntoView({ behavior: 'smooth' });
        });
    });
}

/**
 * 显示指定分类的工具
 */
function showCategory(category) {
    const categorySections = document.querySelectorAll('.category-section');
    
    categorySections.forEach(section => {
        const sectionCategory = section.dataset.category;
        const categoryTitle = section.querySelector('.category-title');
        const toolsGrid = section.querySelector('.tools-grid');
        
        if (category === 'all' || sectionCategory === category) {
            categoryTitle.style.display = 'flex';
            toolsGrid.style.display = 'grid';
        } else {
            categoryTitle.style.display = 'none';
            toolsGrid.style.display = 'none';
        }
    });
}

/**
 * 初始化移动端菜单（暂时禁用，修复中）
 */
function initMobileMenu() {
    // 暂时禁用移动端菜单功能，避免DOM操作错误
    return;
}

/**
 * 初始化统计信息
 */
function initStatistics() {
    updateStatistics();
}

/**
 * 更新统计信息
 */
function updateStatistics(searchTerm = '') {
    const totalTools = document.querySelectorAll('.tool-card').length;
    const categories = document.querySelectorAll('.category-section');
    const visibleTools = searchTerm 
        ? Array.from(document.querySelectorAll('.tool-card')).filter(card => card.style.display !== 'none').length 
        : totalTools;
    
    // 更新统计面板
    const totalToolsElement = document.getElementById('totalTools');
    const categoriesCountElement = document.getElementById('categoriesCount');
    const visibleToolsElement = document.getElementById('visibleTools');
    
    if (totalToolsElement) {
        totalToolsElement.textContent = totalTools;
    }
    
    if (categoriesCountElement) {
        categoriesCountElement.textContent = categories.length;
    }
    
    if (visibleToolsElement) {
        visibleToolsElement.textContent = visibleTools;
    }
}

/**
 * 初始化滚动效果
 */
function initScrollEffects() {
    // 为导航链接添加平滑滚动
    const smoothLinks = document.querySelectorAll('a[href^="#"]');
    smoothLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    
    // 滚动时添加导航栏样式变化
    window.addEventListener('scroll', function() {
        const topNav = document.querySelector('.top-nav');
        if (window.scrollY > 50) {
            topNav.style.background = 'rgba(15, 52, 96, 0.98)';
            topNav.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.4)';
        } else {
            topNav.style.background = 'rgba(15, 52, 96, 0.95)';
            topNav.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
        }
    });
}

/**
 * 初始化分类导航高亮
 */
function initCategoryHighlight() {
    // 监听滚动事件，高亮当前可见分类
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const category = entry.target.dataset.category;
                highlightCategory(category);
            }
        });
    }, {
        rootMargin: '-100px 0px -80% 0px'
    });
    
    // 观察所有分类区域
    const categorySections = document.querySelectorAll('.category-section');
    categorySections.forEach(section => {
        observer.observe(section);
    });
}

/**
 * 高亮指定分类
 */
function highlightCategory(category) {
    const categoryLinks = document.querySelectorAll('.sidebar-nav .nav-link');
    categoryLinks.forEach(link => {
        if (link.dataset.category === category) {
            link.classList.add('active');
        } else if (link.dataset.category !== 'all') {
            link.classList.remove('active');
        }
    });
}

/**
 * 获取URL参数
 */
function getUrlParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

/**
 * 格式化数字（添加千位分隔符）
 */
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * 显示提示信息
 */
function showToast(message, type = 'info', duration = 3000) {
    // 创建提示元素
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    
    // 添加样式
    toast.style.cssText = `
        position: fixed;
        top: 100px;
        right: 30px;
        padding: 15px 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        z-index: 9999;
        animation: slideInRight 0.3s ease;
    `;
    
    // 添加动画
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // 添加到页面
    document.body.appendChild(toast);
    
    // 自动移除
    setTimeout(() => {
        toast.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, duration);
}

/**
 * 复制文本到剪贴板
 */
async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        showToast('复制成功！', 'success');
        return true;
    } catch (err) {
        showToast('复制失败，请手动复制', 'error');
        return false;
    }
}

/**
 * 初始化延迟加载
 */
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    observer.unobserve(img);
                }
            });
        });
        
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => {
            observer.observe(img);
        });
    }
}

// 导出公共函数（如果需要）
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initNavigation,
        initSearch,
        initCategories,
        initMobileMenu,
        initStatistics,
        initScrollEffects,
        getUrlParam,
        formatNumber,
        showToast,
        copyToClipboard,
        initLazyLoading
    };
}