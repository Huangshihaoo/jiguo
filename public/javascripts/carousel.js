window.onload = () => {
    /* -=-=-=-=-=-=-=-=-=-=-=-轮播模块开始=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-*/
    // 轮播视口
    const carouselBox = document.querySelector('.carousel-box');
    // 视口宽度
    const boxWidth = carouselBox.clientWidth;
    // 轮播主体ul
    const ul = document.querySelector('.carousel');
    // 先复制第一份轮播图
    const firstLi = ul.firstElementChild.cloneNode(true)
    // 复制最后一份
    const lastLi = ul.lastElementChild.cloneNode(true)
    // 两个按钮
    let rBtn = document.querySelector('.next');
    let lBtn = document.querySelector('.last');

    // 最后一份插入到第一份元素上
    ul.insertBefore(lastLi, ul.firstElementChild)
    // 第一份插入到最后一份上
    ul.appendChild(firstLi)

    // 插入后的长度
    const lisLen = ul.querySelectorAll('.carousel-item').length;

    // 开始默认设置为第一组
    let flag = 1;
    // 定时器变量
    let timer = null;
    // 秒数
    const sce = 3000;

    lClick();
    rClick();

    // 自动播放
    timer = setInterval(() => {
        rBtn.click();
    }, sce)

    // 鼠标移入停止轮播
    carouselBox.addEventListener('mouseover', () => {
        clearInterval(timer);
        timer = null;
    })

    // 鼠标移出开始轮播
    carouselBox.addEventListener('mouseout', () => {
        timer = setInterval(() => {
            rBtn.click();
        }, sce)
    })

    // 左按钮点击事件   
    function lClick() {
        lBtn.addEventListener('click', () => {
            if (flag === 1) { // 如果是第一组
                // 先跳到复制的第一份，假的第四份
                ul.style.left = '0px';
                // 接下来要跳倒数第二份
                flag = lisLen - 2;
            } else {
                flag--;
                ul.style.transition = 'all .2s';
                ul.style.left = -boxWidth * flag + 'px';
            }
        })
    }

    // 右按钮点击事件
    function rClick() {
        rBtn.onclick = () => {
            if (flag === lisLen - 1) {
                flag = 1;
                ul.style.transition = 'all .2s';
            }
            ul.style.left = -boxWidth * (flag + 1) + 'px';
            flag++;
        }

    }

    // ul的过渡完成事件
    ul.addEventListener('transitionend', () => {
        if (ul.style.left === '0px') { // 如果是第一张在倒退就是第四张
            ul.style.transition = 'none'; // 先清掉过度
            ul.style.left = -boxWidth * (lisLen - 2) + 'px';
        }
        if (flag === lisLen - 1) {
            ul.style.transition = 'none';
            ul.style.left = -boxWidth + 'px';
        }
    })
    /* -=-=-=-=-=-=-=-=-=-=-=-轮播模块结束=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-*/

    /* -=-=-=-=-=-=-=-=-=-=-=-瀑布流来了=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-*/
    // 按钮
    const loadBtn = document.querySelector('.load a');
    // ul盒子
    const ulBox = document.querySelector('.dis');
    // 点击次数统计
    let clickNum = 0;
    // 加载按钮点击事件
    loadBtn.onclick = () => {
        // 改类名
        loadBtn.className = 'loading';
        // 获取数据
        getData((data) => {
            // 初始化元素字符串
            let eleStr = '';
            // 获取该渲染的数据
            let arrData = data[clickNum];
            // 点击次数增加
            clickNum++
            // 循环得到数据添加到元素字符串里
            for (let i = 0; i < arrData.length; i++) {
                eleStr += `<li class="discovery-item">
                                <a href="#">
                                    <img src="${arrData[i].img}" alt="">
                                    <div class="info">
                                        <p>${arrData[i].text}<span>可以测定食物成分及营养</span></p>
                                        <div class="foot">
                                            <span>${arrData[i].price}</span>
                                            <i class="iconfont icon-xinbaniconshangchuan-"></i>
                                            <i class="iconfont icon-dianzan"></i>
                                        </div>
                                    </div>
                                </a>
                            </li>`;
            }
            // 数据渲染
            ulBox.innerHTML += eleStr;
            // 类名改回
            loadBtn.className = 'moer';
            // 最多这么多数据了
            if (clickNum === data.length) {
                // 改内容
                loadBtn.innerHTML = '不能再点了';
                // 改类名
                loadBtn.className = 'none';
                // 禁止点击
                loadBtn.style.pointerEvents = 'none';
            }
        })
    }

    // 获取数据
    function getData(callback) {

        let xhr = new XMLHttpRequest();
        xhr.open('GET', '/getlist');

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    // 回调函数
                    callback(JSON.parse(xhr.response))
                }
            }
        }
        xhr.send();
    }

    /* -=-=-=-=-=-=-=-=-=-=-=-瀑布流完了=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-*/


    /* -=-=-=-=-=-=-=-=-=-=-=-回到顶部=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-*/
    // 点击按钮
    const topBtn = document.querySelector('.clickTop');
    // 精选报告离顶部的高度，作为按钮出现的被卷高度
    const reportOffsetTop = document.querySelector('.report').offsetTop;
    // 页面滚动监听
    window.onscroll = () => {
        // 页面被卷去高度大于精选报告离顶部的高度
        if (window.pageYOffset > reportOffsetTop) {
            // 按钮出现
            topBtn.style.bottom = '80px'
        } else {
            // 不到就隐藏
            topBtn.style.bottom = '-100px'
        }
    }

    // 第二个定时器
    let timer2 = null;

    // 按钮点击事件
    topBtn.onclick = () => {
        // 开始上升100
        let heig = 100;
        timer2 = setInterval(() => {
            // 上升高度叠加
            heig += 100;
            // 每次拿页面距离顶部的高度减去叠加的上升高度
            window.scroll(0, window.pageYOffset - heig);
            // 如果回到顶部了就清掉定时器
            if (window.pageYOffset === 0) {
                clearInterval(timer2)
                timer2 = null;
            }
        }, 20)
    }

    /* -=-=-=-=-=-=-=-=-=-=-=-回到顶部完了=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-*/

}
