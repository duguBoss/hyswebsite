// Markdown数据加载器
class MarkdownDataLoader {
    constructor() {
        this.markdownUrl = '../AI工具集分类整理_最终版.md';
        this.fallbackData = null;
    }

    async loadMarkdownData() {
        try {
            const response = await fetch(this.markdownUrl);
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
            const content = await response.text();
            return this.parseMarkdownContent(content);
        } catch (error) {
            console.error('加载markdown文件失败:', error);
            
            // 如果加载失败，尝试从本地存储获取
            const cachedData = localStorage.getItem('aiToolsData');
            if (cachedData) {
                console.log('使用缓存的数据');
                return JSON.parse(cachedData);
            }
            
            // 如果缓存也没有，使用备用数据
            console.log('使用备用示例数据');
            return this.getFallbackData();
        }
    }

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

            // 跳过表格分隔符
            if (inTable && line.includes('|---')) {
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
                    
                    // 验证工具数据
                    if (this.validateTool(tool)) {
                        categories[currentCategory].push(tool);
                    }
                }
            }
        }

        // 过滤掉空分类
        const filteredCategories = {};
        Object.keys(categories).forEach(key => {
            if (categories[key].length > 0) {
                filteredCategories[key] = categories[key];
            }
        });

        // 缓存数据到本地存储
        localStorage.setItem('aiToolsData', JSON.stringify(filteredCategories));
        
        return filteredCategories;
    }

    // 清理markdown单元格内容
    cleanMarkdownCell(cell) {
        if (!cell) return '';
        
        // 移除markdown链接格式 [text](url)
        cell = cell.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
        
        // 移除HTML标签
        cell = cell.replace(/<[^>]*>/g, '');
        
        // 移除图片格式
        cell = cell.replace(/!\[[^\]]*\]\([^)]+\)/g, '');
        
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

    // 验证工具数据
    validateTool(tool) {
        return tool.name && 
               tool.name !== '' && 
               tool.url && 
               tool.url !== '' &&
               tool.url.startsWith('http');
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

    // 获取备用数据
    getFallbackData() {
        return {
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
    }
}

// 更新页面管理器以使用数据加载器
window.MarkdownDataLoader = MarkdownDataLoader;