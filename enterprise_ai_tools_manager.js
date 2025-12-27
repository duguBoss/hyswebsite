class EnterpriseAIToolsManager {
    constructor() {
        this.tools = [];
        this.categories = new Set();
        this.filteredTools = [];
        this.currentCategory = 'all';
        this.searchTerm = '';
        this.viewMode = 'grid';
        
        this.init();
    }

    async init() {
        await this.loadData();
        this.setupEventListeners();
        this.render();
        this.updateStats();
    }

    async loadData() {
        try {
            const response = await fetch('/AI工具集分类整理_最终版.md');
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            const content = await response.text();
            this.tools = this.parseMarkdownContent(content);
            this.filteredTools = [...this.tools];
            
            // 缓存数据
            localStorage.setItem('aiToolsData', JSON.stringify(this.tools));
            
        } catch (error) {
            console.error('加载数据失败:', error);
            
            // 尝试从缓存获取
            const cachedData = localStorage.getItem('aiToolsData');
            if (cachedData) {
                this.tools = JSON.parse(cachedData);
                this.filteredTools = [...this.tools];
                console.log('使用缓存数据');
            } else {
                // 使用备用数据
                this.tools = this.getFallbackData();
                this.filteredTools = [...this.tools];
                console.log('使用备用数据');
            }
        }
    }

    parseMarkdownContent(content) {
        const tools = [];
        const lines = content.split('\n');
        let currentCategory = '';
        let inTable = false;
        let headers = [];

        for (let line of lines) {
            line = line.trim();
            
            // 解析分类标题
            if (line.startsWith('## ')) {
                currentCategory = line.replace('## ', '').trim();
                this.categories.add(currentCategory);
                inTable = false;
                continue;
            }

            // 解析表格
            if (line.includes('|') && line.includes('工具名称')) {
                headers = line.split('|').map(h => h.trim()).filter(h => h);
                inTable = true;
                continue;
            }

            // 跳过表格分隔符
            if (inTable && line.includes('|') && line.includes('---')) {
                continue;
            }

            // 处理表格数据行
            if (inTable && line.includes('|') && !line.includes('工具名称')) {
                const cells = line.split('|').map(c => c.trim()).filter(c => c);
                
                if (cells.length >= 4) {
                    const tool = {
                        name: cells[0],
                        url: cells[1],
                        icon: cells[2],
                        description: cells[3],
                        category: currentCategory,
                        id: this.generateId(cells[0] + currentCategory)
                    };
                    
                    // 处理图标路径
                    if (tool.icon && !tool.icon.startsWith('http')) {
                        tool.icon = tool.icon.replace('hysaitool/images/', 'images/');
                    }
                    
                    // 验证URL
                    if (this.isValidUrl(tool.url)) {
                        tools.push(tool);
                    }
                }
            }
        }

        return tools;
    }

    generateId(str) {
        return str.toLowerCase().replace(/[^a-z0-9]/g, '-');
    }

    isValidUrl(string) {
        try {
            new URL(string);
            return true;
        } catch (_) {
            return false;
        }
    }

    getFallbackData() {
        return [
            {
                name: "豆包",
                url: "https://www.doubao.com/",
                icon: "images/doubao-icon.png",
                description: "智能对话助手，办公创作全能！",
                category: "🎯 热门推荐工具",
                id: "doubao-hot"
            },
            {
                name: "TRAE编程",
                url: "https://www.trae.cn/",
                icon: "images/trae.ai-logo.png",
                description: "AI编程IDE，Vibe Coding 必备！",
                category: "🎯 热门推荐工具",
                id: "trae-hot"
            },
            {
                name: "Gamma",
                url: "https://gamma.app",
                icon: "images/gamma-app-icon.png",
                description: "AI幻灯片演示生成工具",
                category: "📊 AI办公工具",
                id: "gamma-office"
            }
        ];
    }

    setupEventListeners() {
        // 搜索功能
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchTerm = e.target.value.toLowerCase();
                this.filterTools();
            });
        }

        // 分类按钮
        const categoriesContainer = document.getElementById('categories');
        if (categoriesContainer) {
            // 添加所有分类按钮
            const allBtn = document.createElement('button');
            allBtn.className = 'category-btn active';
            allBtn.setAttribute('data-category', 'all');
            allBtn.textContent = '全部工具';
            allBtn.addEventListener('click', () => this.setCategory('all'));
            categoriesContainer.appendChild(allBtn);

            // 添加其他分类按钮
            Array.from(this.categories).forEach(category => {
                const btn = document.createElement('button');
                btn.className = 'category-btn';
                btn.setAttribute('data-category', category);
                btn.textContent = category;
                btn.addEventListener('click', () => this.setCategory(category));
                categoriesContainer.appendChild(btn);
            });
        }

        // 视图切换
        const viewButtons = document.querySelectorAll('.view-btn');
        viewButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                viewButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.viewMode = btn.getAttribute('data-view');
                this.render();
            });
        });
    }

    setCategory(category) {
        this.currentCategory = category;
        
        // 更新按钮状态
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-category') === category) {
                btn.classList.add('active');
            }
        });

        this.filterTools();
    }

    filterTools() {
        this.filteredTools = this.tools.filter(tool => {
            const matchesCategory = this.currentCategory === 'all' || tool.category === this.currentCategory;
            const matchesSearch = this.searchTerm === '' || 
                tool.name.toLowerCase().includes(this.searchTerm) ||
                tool.description.toLowerCase().includes(this.searchTerm) ||
                tool.category.toLowerCase().includes(this.searchTerm);
            
            return matchesCategory && matchesSearch;
        });

        this.render();
    }

    render() {
        const grid = document.getElementById('toolsGrid');
        if (!grid) return;

        if (this.filteredTools.length === 0) {
            grid.innerHTML = `
                <div style="text-align: center; padding: 4rem 0; grid-column: 1/-1;">
                    <i class="fas fa-search" style="font-size: 3rem; color: var(--text-muted); margin-bottom: 1rem;"></i>
                    <h3 style="color: var(--text-secondary); margin-bottom: 0.5rem;">未找到相关工具</h3>
                    <p style="color: var(--text-muted);">请尝试其他搜索词或分类</p>
                </div>
            `;
            return;
        }

        if (this.viewMode === 'grid') {
            this.renderGridView(grid);
        } else {
            this.renderListView(grid);
        }
    }

    renderGridView(grid) {
        grid.innerHTML = this.filteredTools.map(tool => `
            <div class="tool-card" data-category="${tool.category}" data-name="${tool.name}">
                <div class="tool-header">
                    <img src="${tool.icon || 'images/default-icon.png'}" 
                         alt="${tool.name}" 
                         class="tool-icon" 
                         onerror="this.src='images/default-icon.png'"
                         loading="lazy">
                    <div class="tool-info">
                        <div class="tool-name">${tool.name}</div>
                        <a href="${tool.url}" target="_blank" class="tool-url">${this.truncateUrl(tool.url)}</a>
                    </div>
                </div>
                <div class="tool-description">${tool.description}</div>
                <div class="tool-footer">
                    <span class="tool-category">${tool.category}</span>
                    <a href="${tool.url}" target="_blank" class="tool-link">
                        访问工具 <i class="fas fa-external-link-alt"></i>
                    </a>
                </div>
            </div>
        `).join('');
    }

    renderListView(grid) {
        grid.innerHTML = this.filteredTools.map(tool => `
            <div class="tool-card tool-list-item" data-category="${tool.category}" data-name="${tool.name}">
                <div class="tool-header" style="align-items: center;">
                    <img src="${tool.icon || 'images/default-icon.png'}" 
                         alt="${tool.name}" 
                         class="tool-icon" 
                         onerror="this.src='images/default-icon.png'"
                         loading="lazy">
                    <div class="tool-info" style="flex: 1;">
                        <div class="tool-name">${tool.name}</div>
                        <div class="tool-description" style="margin-bottom: 0;">${tool.description}</div>
                    </div>
                    <div style="display: flex; gap: 1rem; align-items: center;">
                        <span class="tool-category">${tool.category}</span>
                        <a href="${tool.url}" target="_blank" class="tool-link">
                            访问 <i class="fas fa-external-link-alt"></i>
                        </a>
                    </div>
                </div>
            </div>
        `).join('');
    }

    truncateUrl(url, maxLength = 40) {
        if (url.length <= maxLength) return url;
        return url.substring(0, maxLength - 3) + '...';
    }

    updateStats() {
        // 更新头部统计
        document.getElementById('totalTools').textContent = this.tools.length;
        document.getElementById('totalCategories').textContent = this.categories.size;

        // 更新详细统计
        const stats = this.calculateDetailedStats();
        document.getElementById('aiOfficeTools').textContent = stats.office;
        document.getElementById('aiCreativeTools').textContent = stats.creative;
        document.getElementById('aiSearchTools').textContent = stats.search;
        document.getElementById('aiLearningTools').textContent = stats.learning;
    }

    calculateDetailedStats() {
        const stats = {
            office: 0,
            creative: 0,
            search: 0,
            learning: 0
        };

        this.tools.forEach(tool => {
            const category = tool.category.toLowerCase();
            if (category.includes('办公')) stats.office++;
            else if (category.includes('创作') || category.includes('效率')) stats.creative++;
            else if (category.includes('搜索')) stats.search++;
            else if (category.includes('学习') || category.includes('教育')) stats.learning++;
        });

        return stats;
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    new EnterpriseAIToolsManager();
});

// 添加一些交互增强
document.addEventListener('DOMContentLoaded', () => {
    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // 滚动时添加阴影效果
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.header');
        if (window.scrollY > 10) {
            header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
        } else {
            header.style.boxShadow = 'none';
        }
    });
});