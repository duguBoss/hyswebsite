// AI工具数据管理器
class AIToolsManager {
    constructor() {
        this.toolsData = {};
        this.filteredData = {};
        this.currentCategory = 'all';
        this.searchQuery = '';
    }

    // 解析markdown文件内容
    async parseMarkdownFile(filePath) {
        try {
            // 在实际环境中，这里会通过AJAX加载markdown文件
            // 现在使用模拟数据展示功能
            const response = await fetch(filePath);
            const markdownContent = await response.text();
            return this.parseMarkdownContent(markdownContent);
        } catch (error) {
            console.error('加载markdown文件失败:', error);
            // 如果加载失败，返回空数据
            return this.getDefaultCategories();
        }
    }

    // 解析markdown内容
    parseMarkdownContent(content) {
        const categories = this.getDefaultCategories();
        const lines = content.split('\n');
        let currentCategory = '';
        let inTable = false;
        let headers = [];

        for (let line of lines) {
            line = line.trim();
            
            // 解析分类标题
            if (line.startsWith('## ')) {
                currentCategory = line.replace('## ', '').trim();
                if (!categories[currentCategory]) {
                    categories[currentCategory] = [];
                }
                inTable = false;
                continue;
            }

            // 解析表格
            if (line.includes('|') && line.includes('工具名称')) {
                // 表头行
                headers = line.split('|').map(h => h.trim()).filter(h => h);
                inTable = true;
                continue;
            }

            if (inTable && line.includes('|') && !line.includes('---')) {
                // 数据行
                const cells = line.split('|').map(c => c.trim()).filter(c => c);
                if (cells.length >= 4) {
                    const tool = {
                        name: this.cleanMarkdownCell(cells[0]),
                        url: this.extractUrlFromMarkdown(cells[1]),
                        icon: this.cleanMarkdownCell(cells[2]),
                        description: this.cleanMarkdownCell(cells[3])
                    };
                    
                    if (tool.name && tool.url) {
                        categories[currentCategory].push(tool);
                    }
                }
            }
        }

        return categories;
    }

    // 清理markdown单元格内容
    cleanMarkdownCell(cell) {
        if (!cell) return '';
        
        // 移除markdown链接格式 [text](url)
        cell = cell.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
        
        // 移除HTML标签
        cell = cell.replace(/<[^>]*>/g, '');
        
        // 移除多余的空格
        cell = cell.trim();
        
        return cell;
    }

    // 从markdown中提取URL
    extractUrlFromMarkdown(cell) {
        if (!cell) return '';
        
        // 提取markdown链接中的URL
        const urlMatch = cell.match(/\[([^\]]*)\]\(([^)]+)\)/);
        if (urlMatch) {
            return urlMatch[2].trim();
        }
        
        // 提取纯URL
        const plainUrlMatch = cell.match(/https?:\/\/[^\s]+/);
        if (plainUrlMatch) {
            return plainUrlMatch[0].trim();
        }
        
        return cell.trim();
    }

    // 获取默认分类
    getDefaultCategories() {
        return {
            "🎯 热门推荐工具": [],
            "📊 AI办公工具": [],
            "🚀 AI效率提升": [],
            "💻 AI编程工具": [],
            "🛠️ 其他工具": []
        };
    }

    // 搜索工具
    searchTools(query) {
        this.searchQuery = query;
        
        if (!query.trim()) {
            this.filteredData = { ...this.toolsData };
        } else {
            this.filteredData = {};
            Object.keys(this.toolsData).forEach(category => {
                this.filteredData[category] = this.toolsData[category].filter(tool => 
                    tool.name.toLowerCase().includes(query.toLowerCase()) ||
                    tool.description.toLowerCase().includes(query.toLowerCase())
                );
            });
        }
    }

    // 按分类过滤
    filterByCategory(category) {
        this.currentCategory = category;
        
        if (category === 'all') {
            this.filteredData = { ...this.toolsData };
        } else {
            this.filteredData = {};
            if (this.toolsData[category]) {
                this.filteredData[category] = this.toolsData[category];
            }
        }
    }

    // 获取过滤后的数据
    getFilteredData() {
        return this.filteredData;
    }

    // 获取统计信息
    getStats() {
        let totalTools = 0;
        let totalCategories = Object.keys(this.toolsData).length;
        
        Object.values(this.toolsData).forEach(tools => {
            totalTools += tools.length;
        });

        return {
            totalTools,
            totalCategories,
            lastUpdate: new Date().toLocaleDateString('zh-CN')
        };
    }
}

// 页面管理器
class PageManager {
    constructor() {
        this.toolsManager = new AIToolsManager();
        this.init();
    }

    async init() {
        // 尝试加载markdown文件
        try {
            // 在实际环境中，这里会加载真实的markdown文件
            // 现在使用模拟数据
            await this.loadSampleData();
        } catch (error) {
            console.error('初始化失败:', error);
            await this.loadSampleData();
        }

        this.setupEventListeners();
        this.renderPage();
    }

    async loadSampleData() {
        // 模拟数据 - 在实际环境中会从markdown文件加载
        const sampleData = {
            "🎯 热门推荐工具": [
                {
                    name: "豆包",
                    url: "https://www.doubao.com/",
                    icon: "hysaitool/images/doubao-icon.png",
                    description: "智能对话助手，办公创作全能！"
                },
                {
                    name: "绘蛙",
                    url: "https://ihuiwa.paluai.com/aibot",
                    icon: "hysaitool/images/ihuiwa-icon.png",
                    description: "AI电商营销工具，免费生成商品图"
                },
                {
                    name: "TRAE编程",
                    url: "https://www.trae.cn/",
                    icon: "hysaitool/images/trae.ai-logo.png",
                    description: "AI编程IDE，Vibe Coding 必备！"
                }
            ],
            "📊 AI办公工具": [
                {
                    name: "ChatBA",
                    url: "https://www.chatba.com",
                    icon: "hysaitool/images/chatba-icon.png",
                    description: "AI幻灯片生成工具"
                },
                {
                    name: "Decktopus AI",
                    url: "https://www.decktopus.com/?utm_source=ai-bot.cn",
                    icon: "hysaitool/images/decktopus-ai-icon.png",
                    description: "AI驱动的在线演示文稿生成器"
                },
                {
                    name: "Gamma",
                    url: "https://gamma.app",
                    icon: "hysaitool/images/gamma-app-icon.png",
                    description: "AI幻灯片演示生成工具"
                }
            ],
            "🚀 AI效率提升": [
                {
                    name: "秘塔AI搜索",
                    url: "https://metaso.cn/?s=aibot1&referrer_s=aibot1",
                    icon: "hysaitool/images/metaso-ai-search-icon.png",
                    description: "最好用的AI搜索工具，没有广告，直达结果"
                },
                {
                    name: "文多多AiPPT",
                    url: "https://docmee.cn/?source=ai-bot",
                    icon: "hysaitool/images/wenduoduo-Logo.png",
                    description: "AI一键生成PPT，支持AI配图和智能资料整合"
                },
                {
                    name: "博思AIPPT",
                    url: "https://pptgo.cn/?utm_source=referrals&utm_content=aibot&_channel_track_key=LkU8aJjk",
                    icon: "hysaitool/images/pptgo-icon.png",
                    description: "PPT效率神器，AI一键生成PPT"
                }
            ],
            "💻 AI编程工具": [
                {
                    name: "TRAE编程",
                    url: "https://www.trae.cn/?utm_source=advertising&utm_medium=aibot_ug_cpa&utm_term=hw_trae_aibot",
                    icon: "hysaitool/images/trae.ai-logo.png",
                    description: "AI编程IDE，Vibe Coding 必备！"
                },
                {
                    name: "Cursor",
                    url: "https://www.cursor.com/?utm_source=ai-bot.cn",
                    icon: "hysaitool/images/Cursor-logo.png",
                    description: "AI代码编辑器，快速进行编程和软件开发"
                },
                {
                    name: "通义灵码",
                    url: "https://lingma.aliyun.com/lingma",
                    icon: "hysaitool/images/tongyi-lingma-icon-1.png",
                    description: "阿里推出的免费AI编程工具，基于通义大模型"
                }
            ],
            "🛠️ 其他工具": [
                {
                    name: "AiPPT",
                    url: "https://www.aippt.cn/?utm_type=Navweb&utm_source=ai-bot&utm_page=aippt&utm_plan=ppt&utm_unit=AIPPT&utm_keyword=50608",
                    icon: "hysaitool/images/AiPPT-logo-0526.png",
                    description: "AI快速生成高质量PPT"
                },
                {
                    name: "Flowith",
                    url: "https://flowith.paluai.com/aibot",
                    icon: "hysaitool/images/flowith-icon.png",
                    description: "免费用Gemini 3、GPT-5"
                }
            ]
        };

        this.toolsManager.toolsData = sampleData;
        this.toolsManager.filteredData = { ...sampleData };
    }

    setupEventListeners() {
        // 搜索功能
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.toolsManager.searchTools(e.target.value);
                this.renderTools();
            });
        }

        // 导航菜单
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                
                // 更新导航状态
                document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
                e.target.classList.add('active');

                // 获取分类
                const href = e.target.getAttribute('href');
                const category = this.getCategoryFromHref(href);
                
                this.toolsManager.filterByCategory(category);
                this.renderTools();
            });
        });

        // 平滑滚动
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    getCategoryFromHref(href) {
        const categoryMap = {
            '#hot': '🎯 热门推荐工具',
            '#office': '📊 AI办公工具',
            '#efficiency': '🚀 AI效率提升',
            '#coding': '💻 AI编程工具',
            '#other': '🛠️ 其他工具'
        };
        return categoryMap[href] || 'all';
    }

    renderTools() {
        const content = document.getElementById('content');
        const data = this.toolsManager.getFilteredData();
        
        let html = '';
        let totalCount = 0;

        Object.keys(data).forEach(category => {
            if (data[category] && data[category].length > 0) {
                const categoryId = this.generateCategoryId(category);
                html += `
                    <div class="section" id="${categoryId}">
                        <div class="section-header">
                            <h2 class="section-title">${category}</h2>
                            <p class="section-subtitle">共 ${data[category].length} 个工具</p>
                        </div>
                        <div class="tools-grid">
                            ${data[category].map(tool => this.renderToolCard(tool, category)).join('')}
                        </div>
                    </div>
                `;
                totalCount += data[category].length;
            }
        });

        if (totalCount === 0) {
            html = '<div class="no-results">😔 没有找到匹配的工具</div>';
        }

        content.innerHTML = html;
        this.updateStats();
    }

    renderToolCard(tool, category) {
        return `
            <div class="tool-card">
                <div class="tool-header">
                    <img src="${tool.icon || 'images/default-icon.png'}" alt="${tool.name}" class="tool-icon" onerror="this.src='images/default-icon.png'">
                    <div class="tool-info">
                        <div class="tool-name">${tool.name}</div>
                        <a href="${tool.url}" target="_blank" class="tool-url">${this.truncateUrl(tool.url)}</a>
                    </div>
                </div>
                <div class="tool-description">${tool.description}</div>
                <div class="tool-footer">
                    <span class="tool-category">${category}</span>
                    <a href="${tool.url}" target="_blank" class="tool-link">访问工具</a>
                </div>
            </div>
        `;
    }

    truncateUrl(url) {
        if (url.length > 40) {
            return url.substring(0, 40) + '...';
        }
        return url;
    }

    generateCategoryId(category) {
        return category.replace(/[^\w\s]/g, '').replace(/\s+/g, '-').toLowerCase();
    }

    updateStats() {
        const stats = this.toolsManager.getStats();
        document.getElementById('totalTools').textContent = stats.totalTools;
        document.getElementById('totalCategories').textContent = stats.totalCategories;
        document.getElementById('updatedTime').textContent = stats.lastUpdate;
        document.getElementById('lastUpdate').textContent = new Date().toLocaleString('zh-CN');
    }

    renderPage() {
        this.renderTools();
    }
}

// 页面加载完成后初始化
let pageManager;

document.addEventListener('DOMContentLoaded', () => {
    pageManager = new PageManager();
});

// 导出给全局使用
window.AIToolsManager = AIToolsManager;
window.PageManager = PageManager;