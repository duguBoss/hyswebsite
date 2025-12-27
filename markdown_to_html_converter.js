/**
 * Markdown转HTML批量转换器
 * 用于将AI工具集的markdown文档转换为HTML展示格式
 */

class MarkdownToHTMLConverter {
    constructor() {
        this.templates = {
            card: this.getCardTemplate(),
            list: this.getListTemplate(),
            grid: this.getGridTemplate()
        };
    }

    /**
     * 主要转换函数 - 将markdown内容转换为HTML
     * @param {string} markdownContent - markdown格式的内容
     * @param {string} format - 输出格式 ('card', 'list', 'grid')
     * @returns {object} - 包含HTML和统计信息的对象
     */
    convert(markdownContent, format = 'card') {
        const startTime = performance.now();
        
        try {
            const parsedData = this.parseMarkdown(markdownContent);
            const html = this.generateHTML(parsedData, format);
            const stats = this.generateStats(parsedData);
            
            const endTime = performance.now();
            const processingTime = (endTime - startTime).toFixed(2);
            
            return {
                success: true,
                html: html,
                stats: stats,
                processingTime: processingTime,
                parsedData: parsedData
            };
            
        } catch (error) {
            console.error('转换失败:', error);
            return {
                success: false,
                error: error.message,
                html: this.getErrorHTML(error.message)
            };
        }
    }

    /**
     * 解析markdown内容
     * @param {string} content - markdown内容
     * @returns {object} - 解析后的数据
     */
    parseMarkdown(content) {
        const categories = {};
        const lines = content.split('\n');
        let currentCategory = '';
        let inTable = false;
        let headers = [];
        let totalTools = 0;

        for (let line of lines) {
            line = line.trim();
            
            // 解析分类标题
            if (line.startsWith('## ')) {
                currentCategory = line.replace('## ', '').trim();
                if (!categories[currentCategory]) {
                    categories[currentCategory] = {
                        name: currentCategory,
                        tools: [],
                        count: 0
                    };
                }
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
                        id: this.generateId(cells[0] + currentCategory),
                        createdAt: new Date().toISOString()
                    };
                    
                    // 处理图标路径
                    if (tool.icon && !tool.icon.startsWith('http')) {
                        tool.icon = tool.icon.replace('hysaitool/images/', 'images/');
                    }
                    
                    // 验证URL
                    if (this.isValidUrl(tool.url)) {
                        categories[currentCategory].tools.push(tool);
                        categories[currentCategory].count++;
                        totalTools++;
                    }
                }
            }
        }

        return {
            categories: categories,
            totalCategories: Object.keys(categories).length,
            totalTools: totalTools,
            processedAt: new Date().toISOString()
        };
    }

    /**
     * 生成HTML输出
     * @param {object} data - 解析后的数据
     * @param {string} format - 输出格式
     * @returns {string} - HTML字符串
     */
    generateHTML(data, format) {
        const { categories } = data;
        let html = '';

        switch (format) {
            case 'card':
                html = this.generateCardHTML(categories);
                break;
            case 'list':
                html = this.generateListHTML(categories);
                break;
            case 'grid':
                html = this.generateGridHTML(categories);
                break;
            default:
                html = this.generateCardHTML(categories);
        }

        return html;
    }

    /**
     * 生成卡片式HTML
     * @param {object} categories - 分类数据
     * @returns {string} - HTML字符串
     */
    generateCardHTML(categories) {
        let html = '';
        
        for (const [categoryName, category] of Object.entries(categories)) {
            if (category.tools.length === 0) continue;
            
            html += `
                <div class="category-section" data-category="${this.escapeHtml(categoryName)}">
                    <div class="category-header">
                        <h2 class="category-title">${this.escapeHtml(categoryName)}</h2>
                        <span class="category-count">${category.tools.length} 个工具</span>
                    </div>
                    <div class="tools-grid">
                        ${category.tools.map(tool => this.generateToolCard(tool)).join('')}
                    </div>
                </div>
            `;
        }

        return html;
    }

    /**
     * 生成工具卡片
     * @param {object} tool - 工具数据
     * @returns {string} - HTML字符串
     */
    generateToolCard(tool) {
        return `
            <div class="tool-card" data-tool-id="${tool.id}" data-category="${this.escapeHtml(tool.category)}">
                <div class="tool-card-header">
                    <img src="${this.escapeHtml(tool.icon || 'images/default-icon.png')}" 
                         alt="${this.escapeHtml(tool.name)}" 
                         class="tool-icon"
                         onerror="this.src='images/default-icon.png'"
                         loading="lazy">
                    <div class="tool-info">
                        <h3 class="tool-name">${this.escapeHtml(tool.name)}</h3>
                        <a href="${this.escapeHtml(tool.url)}" 
                           target="_blank" 
                           class="tool-url"
                           rel="noopener noreferrer">
                            ${this.truncateUrl(tool.url)}
                        </a>
                    </div>
                </div>
                <div class="tool-card-body">
                    <p class="tool-description">${this.escapeHtml(tool.description)}</p>
                </div>
                <div class="tool-card-footer">
                    <span class="tool-category-tag">${this.escapeHtml(tool.category)}</span>
                    <a href="${this.escapeHtml(tool.url)}" 
                       target="_blank" 
                       class="tool-visit-btn"
                       rel="noopener noreferrer">
                        访问工具 <i class="fas fa-external-link-alt"></i>
                    </a>
                </div>
            </div>
        `;
    }

    /**
     * 生成列表式HTML
     * @param {object} categories - 分类数据
     * @returns {string} - HTML字符串
     */
    generateListHTML(categories) {
        let html = '<div class="tools-list">';
        
        for (const [categoryName, category] of Object.entries(categories)) {
            if (category.tools.length === 0) continue;
            
            html += `
                <div class="category-section" data-category="${this.escapeHtml(categoryName)}">
                    <div class="category-header">
                        <h2 class="category-title">${this.escapeHtml(categoryName)}</h2>
                        <span class="category-count">${category.tools.length} 个工具</span>
                    </div>
                    <div class="tools-list-container">
                        ${category.tools.map(tool => this.generateToolListItem(tool)).join('')}
                    </div>
                </div>
            `;
        }

        html += '</div>';
        return html;
    }

    /**
     * 生成工具列表项
     * @param {object} tool - 工具数据
     * @returns {string} - HTML字符串
     */
    generateToolListItem(tool) {
        return `
            <div class="tool-list-item" data-tool-id="${tool.id}" data-category="${this.escapeHtml(tool.category)}">
                <div class="tool-list-header">
                    <img src="${this.escapeHtml(tool.icon || 'images/default-icon.png')}" 
                         alt="${this.escapeHtml(tool.name)}" 
                         class="tool-icon-small"
                         onerror="this.src='images/default-icon.png'"
                         loading="lazy">
                    <div class="tool-list-info">
                        <h3 class="tool-name">${this.escapeHtml(tool.name)}</h3>
                        <p class="tool-description">${this.escapeHtml(tool.description)}</p>
                    </div>
                    <div class="tool-list-actions">
                        <span class="tool-category-tag">${this.escapeHtml(tool.category)}</span>
                        <a href="${this.escapeHtml(tool.url)}" 
                           target="_blank" 
                           class="tool-visit-btn-small"
                           rel="noopener noreferrer">
                            访问
                        </a>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * 生成网格式HTML
     * @param {object} categories - 分类数据
     * @returns {string} - HTML字符串
     */
    generateGridHTML(categories) {
        let html = '<div class="tools-grid-container">';
        
        for (const [categoryName, category] of Object.entries(categories)) {
            if (category.tools.length === 0) continue;
            
            html += `
                <div class="category-grid-section" data-category="${this.escapeHtml(categoryName)}">
                    <div class="category-grid-header">
                        <h2 class="category-grid-title">${this.escapeHtml(categoryName)}</h2>
                        <span class="category-grid-count">${category.tools.length}</span>
                    </div>
                    <div class="tools-grid">
                        ${category.tools.map(tool => this.generateToolGridItem(tool)).join('')}
                    </div>
                </div>
            `;
        }

        html += '</div>';
        return html;
    }

    /**
     * 生成工具网格项
     * @param {object} tool - 工具数据
     * @returns {string} - HTML字符串
     */
    generateToolGridItem(tool) {
        return `
            <div class="tool-grid-item" data-tool-id="${tool.id}" data-category="${this.escapeHtml(tool.category)}">
                <div class="tool-grid-header">
                    <img src="${this.escapeHtml(tool.icon || 'images/default-icon.png')}" 
                         alt="${this.escapeHtml(tool.name)}" 
                         class="tool-grid-icon"
                         onerror="this.src='images/default-icon.png'"
                         loading="lazy">
                    <h3 class="tool-grid-name">${this.escapeHtml(tool.name)}</h3>
                </div>
                <div class="tool-grid-body">
                    <p class="tool-grid-description">${this.escapeHtml(tool.description)}</p>
                </div>
                <div class="tool-grid-footer">
                    <a href="${this.escapeHtml(tool.url)}" 
                       target="_blank" 
                       class="tool-grid-link"
                       rel="noopener noreferrer">
                        使用工具
                    </a>
                </div>
            </div>
        `;
    }

    /**
     * 生成统计信息
     * @param {object} data - 解析后的数据
     * @returns {object} - 统计信息
     */
    generateStats(data) {
        const { categories, totalCategories, totalTools } = data;
        
        const categoryStats = {};
        for (const [name, category] of Object.entries(categories)) {
            categoryStats[name] = {
                count: category.count,
                percentage: ((category.count / totalTools) * 100).toFixed(1)
            };
        }

        return {
            totalCategories,
            totalTools,
            categoryStats,
            largestCategory: this.getLargestCategory(categories),
            averageToolsPerCategory: (totalTools / totalCategories).toFixed(1)
        };
    }

    /**
     * 获取最大的分类
     * @param {object} categories - 分类数据
     * @returns {object} - 最大分类信息
     */
    getLargestCategory(categories) {
        let maxCount = 0;
        let largestCategory = '';
        
        for (const [name, category] of Object.entries(categories)) {
            if (category.count > maxCount) {
                maxCount = category.count;
                largestCategory = name;
            }
        }
        
        return {
            name: largestCategory,
            count: maxCount
        };
    }

    /**
     * 生成ID
     * @param {string} str - 输入字符串
     * @returns {string} - 生成的ID
     */
    generateId(str) {
        return str.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
    }

    /**
     * 验证URL
     * @param {string} string - URL字符串
     * @returns {boolean} - 是否有效
     */
    isValidUrl(string) {
        try {
            new URL(string);
            return true;
        } catch (_) {
            return false;
        }
    }

    /**
     * 截断URL
     * @param {string} url - URL字符串
     * @param {number} maxLength - 最大长度
     * @returns {string} - 截断后的URL
     */
    truncateUrl(url, maxLength = 50) {
        if (url.length <= maxLength) return url;
        return url.substring(0, maxLength - 3) + '...';
    }

    /**
     * HTML转义
     * @param {string} text - 输入文本
     * @returns {string} - 转义后的文本
     */
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    /**
     * 错误HTML
     * @param {string} errorMessage - 错误信息
     * @returns {string} - 错误HTML
     */
    getErrorHTML(errorMessage) {
        return `
            <div class="error-container">
                <div class="error-icon">⚠️</div>
                <h3>转换失败</h3>
                <p>${this.escapeHtml(errorMessage)}</p>
                <button onclick="location.reload()" class="retry-btn">重试</button>
            </div>
        `;
    }

    /**
     * 获取卡片模板
     * @returns {string} - CSS模板
     */
    getCardTemplate() {
        return `
            <style>
                .category-section {
                    margin-bottom: 3rem;
                }
                
                .category-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 1.5rem;
                    padding-bottom: 1rem;
                    border-bottom: 2px solid var(--border-color);
                }
                
                .category-title {
                    font-size: 1.5rem;
                    font-weight: 600;
                    color: var(--text-primary);
                }
                
                .category-count {
                    background: var(--accent-color);
                    color: white;
                    padding: 0.25rem 0.75rem;
                    border-radius: 1rem;
                    font-size: 0.875rem;
                }
                
                .tools-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
                    gap: 1.5rem;
                }
                
                .tool-card {
                    background: var(--bg-card);
                    border: 1px solid var(--border-color);
                    border-radius: 0.75rem;
                    padding: 1.5rem;
                    transition: all 0.3s ease;
                }
                
                .tool-card:hover {
                    transform: translateY(-4px);
                    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
                    border-color: var(--accent-color);
                }
                
                .tool-card-header {
                    display: flex;
                    align-items: flex-start;
                    gap: 1rem;
                    margin-bottom: 1rem;
                }
                
                .tool-icon {
                    width: 48px;
                    height: 48px;
                    border-radius: 0.5rem;
                    object-fit: cover;
                }
                
                .tool-name {
                    font-size: 1.125rem;
                    font-weight: 600;
                    margin-bottom: 0.25rem;
                }
                
                .tool-url {
                    font-size: 0.875rem;
                    color: var(--text-muted);
                    text-decoration: none;
                }
                
                .tool-url:hover {
                    color: var(--accent-color);
                }
                
                .tool-description {
                    color: var(--text-secondary);
                    margin-bottom: 1rem;
                    line-height: 1.6;
                }
                
                .tool-card-footer {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                
                .tool-category-tag {
                    background: var(--bg-hover);
                    color: var(--text-secondary);
                    padding: 0.25rem 0.75rem;
                    border-radius: 0.5rem;
                    font-size: 0.75rem;
                }
                
                .tool-visit-btn {
                    background: var(--accent-color);
                    color: white;
                    padding: 0.5rem 1rem;
                    border-radius: 0.5rem;
                    text-decoration: none;
                    font-weight: 500;
                    transition: all 0.3s ease;
                }
                
                .tool-visit-btn:hover {
                    background: var(--primary-color);
                    transform: translateX(4px);
                }
            </style>
        `;
    }

    /**
     * 获取列表模板
     * @returns {string} - CSS模板
     */
    getListTemplate() {
        return `
            <style>
                .tool-list-item {
                    background: var(--bg-card);
                    border: 1px solid var(--border-color);
                    border-radius: 0.75rem;
                    padding: 1.5rem;
                    margin-bottom: 1rem;
                    transition: all 0.3s ease;
                }
                
                .tool-list-item:hover {
                    border-color: var(--accent-color);
                    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
                }
                
                .tool-list-header {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                }
                
                .tool-icon-small {
                    width: 40px;
                    height: 40px;
                    border-radius: 0.5rem;
                    object-fit: cover;
                }
                
                .tool-list-info {
                    flex: 1;
                }
                
                .tool-list-actions {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                }
                
                .tool-visit-btn-small {
                    background: var(--accent-color);
                    color: white;
                    padding: 0.5rem 1rem;
                    border-radius: 0.5rem;
                    text-decoration: none;
                    font-size: 0.875rem;
                    transition: all 0.3s ease;
                }
                
                .tool-visit-btn-small:hover {
                    background: var(--primary-color);
                }
            </style>
        `;
    }

    /**
     * 获取网格模板
     * @returns {string} - CSS模板
     */
    getGridTemplate() {
        return `
            <style>
                .tools-grid-container {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                    gap: 2rem;
                }
                
                .category-grid-section {
                    background: var(--bg-card);
                    border: 1px solid var(--border-color);
                    border-radius: 1rem;
                    padding: 1.5rem;
                }
                
                .category-grid-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 1rem;
                    padding-bottom: 1rem;
                    border-bottom: 1px solid var(--border-color);
                }
                
                .tools-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
                    gap: 1rem;
                }
                
                .tool-grid-item {
                    background: var(--bg-secondary);
                    border: 1px solid var(--border-color);
                    border-radius: 0.5rem;
                    padding: 1rem;
                    text-align: center;
                    transition: all 0.3s ease;
                }
                
                .tool-grid-item:hover {
                    transform: translateY(-2px);
                    border-color: var(--accent-color);
                }
                
                .tool-grid-icon {
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                    margin: 0 auto 1rem;
                    object-fit: cover;
                }
                
                .tool-grid-name {
                    font-size: 1rem;
                    font-weight: 600;
                    margin-bottom: 0.5rem;
                }
                
                .tool-grid-description {
                    font-size: 0.875rem;
                    color: var(--text-secondary);
                    margin-bottom: 1rem;
                }
                
                .tool-grid-link {
                    display: inline-block;
                    background: var(--accent-color);
                    color: white;
                    padding: 0.5rem 1rem;
                    border-radius: 0.5rem;
                    text-decoration: none;
                    font-size: 0.875rem;
                }
            </style>
        `;
    }
}

// 批量转换器类
class BatchConverter {
    constructor() {
        this.converter = new MarkdownToHTMLConverter();
        this.batchResults = [];
    }

    /**
     * 批量转换多个markdown文件
     * @param {Array} files - 文件数组
     * @param {object} options - 转换选项
     * @returns {Promise} - 转换结果
     */
    async batchConvert(files, options = {}) {
        const results = [];
        const { format = 'card', concurrent = 3 } = options;

        // 分批处理，避免同时处理过多文件
        const batches = this.createBatches(files, concurrent);
        
        for (const batch of batches) {
            const batchResults = await Promise.all(
                batch.map(file => this.convertFile(file, format))
            );
            results.push(...batchResults);
        }

        return {
            totalFiles: files.length,
            successful: results.filter(r => r.success).length,
            failed: results.filter(r => !r.success).length,
            results: results,
            summary: this.generateBatchSummary(results)
        };
    }

    /**
     * 转换单个文件
     * @param {File} file - 文件对象
     * @param {string} format - 输出格式
     * @returns {Promise} - 转换结果
     */
    async convertFile(file, format) {
        try {
            const content = await this.readFile(file);
            const result = this.converter.convert(content, format);
            
            return {
                fileName: file.name,
                success: result.success,
                html: result.html,
                stats: result.stats,
                processingTime: result.processingTime,
                error: result.error
            };
        } catch (error) {
            return {
                fileName: file.name,
                success: false,
                error: error.message
            };
        }
    }

    /**
     * 读取文件内容
     * @param {File} file - 文件对象
     * @returns {Promise} - 文件内容
     */
    readFile(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = e => resolve(e.target.result);
            reader.onerror = e => reject(new Error('文件读取失败'));
            reader.readAsText(file);
        });
    }

    /**
     * 创建批次
     * @param {Array} items - 项目数组
     * @param {number} batchSize - 批次大小
     * @returns {Array} - 批次数组
     */
    createBatches(items, batchSize) {
        const batches = [];
        for (let i = 0; i < items.length; i += batchSize) {
            batches.push(items.slice(i, i + batchSize));
        }
        return batches;
    }

    /**
     * 生成批量转换摘要
     * @param {Array} results - 转换结果数组
     * @returns {object} - 摘要信息
     */
    generateBatchSummary(results) {
        const successful = results.filter(r => r.success);
        const totalProcessingTime = successful.reduce((sum, r) => sum + parseFloat(r.processingTime || 0), 0);
        
        return {
            averageProcessingTime: successful.length > 0 ? (totalProcessingTime / successful.length).toFixed(2) : 0,
            totalToolsProcessed: successful.reduce((sum, r) => sum + (r.stats?.totalTools || 0), 0),
            largestCategory: this.findMostCommonCategory(successful)
        };
    }

    /**
     * 找到最常见的分类
     * @param {Array} results - 成功的转换结果
     * @returns {string} - 最常见的分类名称
     */
    findMostCommonCategory(results) {
        const categoryCounts = {};
        
        results.forEach(result => {
            if (result.stats?.categoryStats) {
                Object.keys(result.stats.categoryStats).forEach(category => {
                    categoryCounts[category] = (categoryCounts[category] || 0) + 1;
                });
            }
        });

        return Object.keys(categoryCounts).reduce((a, b) => 
            categoryCounts[a] > categoryCounts[b] ? a : b, ''
        );
    }
}

// 导出供其他脚本使用
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        MarkdownToHTMLConverter,
        BatchConverter
    };
}

// 全局变量供浏览器使用
if (typeof window !== 'undefined') {
    window.MarkdownToHTMLConverter = MarkdownToHTMLConverter;
    window.BatchConverter = BatchConverter;
}