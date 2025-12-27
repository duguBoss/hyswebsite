function requestAndParseHTML(url) {
  var xhr = new XMLHttpRequest();

  xhr.open('GET', url, false);
  xhr.send();

  if (xhr.status === 200) {
    try {
      var html = xhr.responseText;

      var parser = new DOMParser();
      var doc = parser.parseFromString(html, 'text/html');

      return doc;
    } catch (e) {
      return null;
    }
  } else {
    return null;
  }
}

function matchStrings(list, input) {
  const result = [];

  for (const item of list) {
    const str = item.title;

    let inputIndex = 0;
    let strIndex = 0;

    while (inputIndex < input.length && strIndex < str.length) {
      if (input[inputIndex] === str[strIndex] || input[inputIndex].toLowerCase() === str[strIndex].toLowerCase()) {
        inputIndex++;
        strIndex++;
      } else {
        strIndex++;
      }
    }

    if (inputIndex === input.length) {
      result.push(item);
    }
  }

  return result;
}

/**
 * 解析 SiteMap 方法，如果 SiteMap 模版变更，记得更新此逻辑
 * @param {Document | null} doc SiteMap 的 HTML 内容
 * @returns { href: string; title: string }[]
 */
function getListFromDoc(doc) {
  if (doc) {
    const listDOM = doc.querySelectorAll('.T1 a');

    if (listDOM) {
      const list = Array.from(listDOM).map((item) => {
        const href = item.getAttribute('href');
        const title = item.getAttribute('title');
  
        return { href, title };
      });

      return list;
    }
  }

  return null;
}

/**
 * 创建视图层，这里修改样式
 * @param {HTMLElement} container DOM 容器
 * @param {{ href: string; title: string }[]} data 数据
 */
function createSearchView(container, data) {
  const input = document.getElementById('bdcsMain');

  const resultPanel = document.querySelector('.qijishow-search-result');

  if (!input || !resultPanel) {
    return;
  }

  input.addEventListener('input', () => {
    resultPanel.innerHTML = '';

    if (input.value) {
      resultPanel.style.opacity = '1';
      const matchedRes = matchStrings(data, input.value);

      if (matchedRes) {
        matchedRes.forEach((item) => {
          const view = document.createElement('a');
          view.setAttribute('href', item.href);
          view.setAttribute('title', item.title);
          view.setAttribute('target', '_blank');
          view.innerText = item.title;
  
          resultPanel.appendChild(view);
        });
      }
    } else {
      resultPanel.style.opacity = '0';
    }
  });

  input.addEventListener('blur', () => {
    setTimeout(() => {
      resultPanel.innerHTML = '';
      resultPanel.style.opacity = '0';
    }, 200);
  });
}

function initialSearch(id, siteMapUrl) {
  const container = document.getElementById(id);

  const siteMap = requestAndParseHTML(siteMapUrl);

  const data = getListFromDoc(siteMap);

  createSearchView(container, data);
}

/**
 * 执行方法：第一个参数改成自己的容器 ID，参考 index.html，第二个参数改成自己的 sitemap.html，例如：https://www.qijishow.com/sitemap.html，避免跨域，否则请求会失败
 */
initialSearch('search_form', 'https://www.qijishow.com/sitemap.html');
