// Modern I-Ching Divination Website JavaScript - Enhanced Version
document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS
    AOS.init({
        duration: 1000,
        easing: 'ease-out',
        once: false,
        mirror: true
    });

    // Initialize Particles.js
    if (document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: "#c8aa6e"
                },
                shape: {
                    type: "circle",
                    stroke: {
                        width: 0,
                        color: "#000000"
                    }
                },
                opacity: {
                    value: 0.3,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 2,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#c8aa6e",
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 0.5,
                    direction: "none",
                    random: true,
                    straight: false,
                    out_mode: "out",
                    bounce: false,
                    attract: {
                        enable: true,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: {
                        enable: true,
                        mode: "grab"
                    },
                    onclick: {
                        enable: true,
                        mode: "push"
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 0.5
                        }
                    },
                    push: {
                        particles_nb: 3
                    }
                }
            },
            retina_detect: true
        });
    }

    // Hero Canvas Animation
    const canvas = document.getElementById('hero-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;
        
        // Resize handler
        window.addEventListener('resize', () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        });
        
        // Hexagram particles
        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.size = Math.random() * 3 + 1;
                this.speedX = Math.random() * 1 - 0.5;
                this.speedY = Math.random() * 1 - 0.5;
                this.color = 'rgba(200, 170, 110, ' + (Math.random() * 0.3 + 0.1) + ')';
            }
            
            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                
                if (this.x > width || this.x < 0) {
                    this.speedX = -this.speedX;
                }
                
                if (this.y > height || this.y < 0) {
                    this.speedY = -this.speedY;
                }
            }
            
            draw() {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }
        
        const particles = [];
        for (let i = 0; i < 100; i++) {
            particles.push(new Particle());
        }
        
        function animate() {
            ctx.clearRect(0, 0, width, height);
            
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();
                
                // Connect particles
                for (let j = i; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 100) {
                        ctx.beginPath();
                        ctx.strokeStyle = 'rgba(200, 170, 110, ' + (0.1 - distance/1000) + ')';
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
            
            requestAnimationFrame(animate);
        }
        
        animate();
    }

    // Elements
    const preloader = document.getElementById('preloader');
    const themeToggle = document.getElementById('theme-toggle');
    const castButton = document.getElementById('cast-button');
    const resetButton = document.getElementById('reset-button');
    const aiButton = document.getElementById('ai-button');
    const aboutButton = document.getElementById('about-button');
    const aboutModal = document.getElementById('about-modal');
    const closeBtn = document.querySelector('.close-btn');
    const resultContainer = document.getElementById('result-container');
    const yinYang = document.getElementById('yin-yang');
    
    // Hide preloader after page loads
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('fade-out');
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 800);
        }, 2000); // Extra delay for dramatic effect
    });

    // Theme toggle
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        
        if (document.body.classList.contains('dark-mode')) {
            themeToggle.innerHTML = '<span>☀️</span>';
        } else {
            themeToggle.innerHTML = '<span>🌙</span>';
        }
    });

    // About modal
    aboutButton.addEventListener('click', () => {
        aboutModal.classList.add('show');
    });

    closeBtn.addEventListener('click', () => {
        aboutModal.classList.remove('show');
    });

    window.addEventListener('click', (e) => {
        if (e.target === aboutModal) {
            aboutModal.classList.remove('show');
        }
    });

    // 3D Parallax effect on mouse move
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth - 0.5;
        const mouseY = e.clientY / window.innerHeight - 0.5;
        
        if (yinYang) {
            yinYang.style.transform = `rotate(${mouseX * 20}deg) translateX(${mouseX * 30}px) translateY(${mouseY * 30}px)`;
        }
        
        // Parallax effect for 3D hexagrams
        const hexagrams = document.querySelectorAll('.hexagram-3d');
        hexagrams.forEach(hexagram => {
            const depth = parseFloat(getComputedStyle(hexagram).getPropertyValue('--z'));
            const x = mouseX * (depth * -0.1);
            const y = mouseY * (depth * -0.1);
            hexagram.style.transform = `translateX(${x}px) translateY(${y}px) translateZ(var(--z)) rotate(var(--rotate))`;
        });
    });

    // Scroll animations
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        
        // Parallax effect for background elements
        const brushStrokes = document.querySelectorAll('.brush-stroke');
        brushStrokes.forEach(stroke => {
            stroke.style.transform = `translateY(${scrollY * 0.05}px) rotate(var(--rotate))`;
        });
        
        // Add more scroll animations here as needed
    });

    // Cast I-Ching
    if (castButton) {
        castButton.addEventListener('click', performDivination);
    }

    if (resetButton) {
        resetButton.addEventListener('click', resetDivination);
    }

    if (aiButton) {
        aiButton.addEventListener('click', getAIInterpretation);
    }

    // Add event delegation for the AI卦象解析 button that will be added dynamically
    document.addEventListener('click', function(e) {
        if (e.target && (e.target.id === 'ai-gua-explain-btn' || e.target.closest('#ai-gua-explain-btn'))) {
            // 獲取當前卦象資訊
            const primaryTitle = document.querySelector('.hexagram-title').textContent;
            const changedTitle = document.querySelector('.hexagram-pair .transformation-arrow') ? 
                              document.querySelectorAll('.hexagram-title')[1].textContent : "無變卦";
            
            // 創建 AI 解析彈窗
            const aiModal = document.createElement('div');
            aiModal.className = 'modal';
            aiModal.innerHTML = `
                <div class="modal-content">
                    <button class="close-btn"><i class="fas fa-times"></i></button>
                    <div class="modal-scroll">
                        <h2>AI卦象解析</h2>
                        <div class="modal-decoration"></div>
                        <p><strong>本卦：</strong>${primaryTitle}</p>
                        <p><strong>變卦：</strong>${changedTitle}</p>
                        
                        <div class="ai-interpretation-content">
                            ${generateAIInterpretation()}
                        </div>
                        
                        <div class="ai-interpretation-actions mt-2">
                            <button id="ai-embed-chat" class="btn btn-primary">
                                <span class="btn-text">AI智能解讀</span>
                                <span class="btn-glow"></span>
                            </button>
                        </div>
                    </div>
                </div>
            `;
            
            document.body.appendChild(aiModal);
            
            // 顯示彈窗
            setTimeout(() => {
                aiModal.classList.add('show');
            }, 10);
            
            // 綁定關閉按鈕事件
            const closeBtn = aiModal.querySelector('.close-btn');
            closeBtn.addEventListener('click', () => {
                aiModal.classList.remove('show');
                setTimeout(() => {
                    aiModal.remove();
                }, 400);
            });
            
            // 綁定點擊背景關閉事件
            aiModal.addEventListener('click', (e) => {
                if (e.target === aiModal) {
                    aiModal.classList.remove('show');
                    setTimeout(() => {
                        aiModal.remove();
                    }, 400);
                }
            });
            
            // 綁定 AI 智能解讀按鈕事件
            const aiEmbedChatBtn = aiModal.querySelector('#ai-embed-chat');
            aiEmbedChatBtn.addEventListener('click', () => {
                // 替換內容為 iframe
                const aiContent = aiModal.querySelector('.ai-interpretation-content');
                aiContent.innerHTML = `
                    <iframe width="100%" height="400px" allow="microphone *" src="https://www.gptbots.ai/widget/eeavspiekwtrdohhv0wh33d/chat.html"></iframe>
                `;
                
                // 隱藏按鈕
                aiEmbedChatBtn.style.display = 'none';
            });
        }
    });

    // Divination logic
    function performDivination() {
        if (castButton.classList.contains('casting')) {
            return;
        }
        
        // Start casting animation
        castButton.classList.add('casting');
        castButton.querySelector('.btn-text').textContent = '占卜中...';
        
        // Rotate yin-yang
        let rotation = 0;
        const spinInterval = setInterval(() => {
            rotation += 10;
            yinYang.style.setProperty('--rotation', rotation);
        }, 50);
        
        // Simulate divination process
        resultContainer.innerHTML = `
            <div class="divination-loading" data-aos="fade-up">
                <div class="loading-symbol"></div>
                <p>正在解讀卦象...</p>
            </div>
        `;
        resultContainer.classList.add('active');
        
        // Simulate delay for the divination process
        setTimeout(() => {
            clearInterval(spinInterval);
            
            // Generate the hexagrams
            const castResult = castHexagram();
            displayResult(castResult);
            
            // Reset button state
            castButton.classList.remove('casting');
            castButton.querySelector('.btn-text').textContent = '開始占卜';
            
            // Scroll to result
            setTimeout(() => {
                resultContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 300);
        }, 3000);
    }

    function resetDivination() {
        resultContainer.classList.remove('active');
        setTimeout(() => {
            resultContainer.innerHTML = '';
        }, 500);
        
        // Reset yin-yang
        yinYang.style.setProperty('--rotation', 0);
    }

    function getAIInterpretation() {
        if (!resultContainer.innerHTML || !resultContainer.classList.contains('active')) {
            alert('請先進行占卜！');
            return;
        }
        
        // 直接導向到易智大師
        window.open('https://gptbots.ai/s/csM8pJE7', '_blank');
    }

    // Hexagram casting function
    function castHexagram() {
        // Generate 6 lines (each has value 6-9)
        // 6: old yin (changing)
        // 7: young yang (stable)
        // 8: young yin (stable)
        // 9: old yang (changing)
        const lines = [];
        const changingLines = [];
        
        for (let i = 0; i < 6; i++) {
            const lineValue = Math.floor(Math.random() * 4) + 6;
            lines.push(lineValue);
            
            if (lineValue === 6 || lineValue === 9) {
                changingLines.push(i);
            }
        }
        
        // Create the primary hexagram
        const primaryHexagram = lines.map(line => {
            return line === 7 || line === 9 ? 1 : 0; // 1 for yang, 0 for yin
        });
        
        // Create the changed hexagram
        const changedHexagram = [...primaryHexagram];
        changingLines.forEach(lineIndex => {
            changedHexagram[lineIndex] = changedHexagram[lineIndex] === 1 ? 0 : 1;
        });
        
        // 確定卦象數字，使用正確的易經六十四卦查詢
        const primaryNumber = determineHexagramNumber(primaryHexagram);
        const changedNumber = changingLines.length > 0 ? determineHexagramNumber(changedHexagram) : null;
        
        // 獲取上下卦的符號 (左三爻為上卦，右三爻為下卦)
        const primaryUpperSymbol = getTrigramSymbol(primaryHexagram.slice(0, 3));
        const primaryLowerSymbol = getTrigramSymbol(primaryHexagram.slice(3, 6));
        
        const changedUpperSymbol = changedNumber ? getTrigramSymbol(changedHexagram.slice(0, 3)) : null;
        const changedLowerSymbol = changedNumber ? getTrigramSymbol(changedHexagram.slice(3, 6)) : null;
        
        return {
            primary: {
                number: primaryNumber,
                hexagram: primaryHexagram,
                name: getHexagramName(primaryNumber),
                upperSymbol: primaryUpperSymbol,
                lowerSymbol: primaryLowerSymbol
            },
            changed: changedNumber ? {
                number: changedNumber,
                hexagram: changedHexagram,
                name: getHexagramName(changedNumber),
                upperSymbol: changedUpperSymbol,
                lowerSymbol: changedLowerSymbol
            } : null,
            lines: lines,
            changingLines: changingLines
        };
    }

    // Display divination result
    function displayResult(result) {
        const changedHexagramHTML = result.changed ? `
            <div class="transformation-arrow">→</div>
            <div class="hexagram-card" data-aos="fade-left" data-aos-delay="600">
                <h3 class="hexagram-title">${result.changed.number}. ${result.changed.name}</h3>
                <div class="gua-symbol">${result.changed.upperSymbol}${result.changed.lowerSymbol}</div>
                <div class="gua-vertical">
                    ${result.changed.hexagram.slice(0, 3).map((line, index) => `
                        <div class="gua-line ${result.changingLines.includes(index) ? 'moving-line' : ''}">
                            ${line === 1 ? '<div class="line-solid"></div>' : '<div class="line-broken"></div>'}
                        </div>
                    `).join('')}
                    ${result.changed.hexagram.slice(3, 6).map((line, index) => `
                        <div class="gua-line ${result.changingLines.includes(index + 3) ? 'moving-line' : ''}">
                            ${line === 1 ? '<div class="line-solid"></div>' : '<div class="line-broken"></div>'}
                        </div>
                    `).join('')}
                </div>
                <div class="hexagram-text">
                    <p class="gua-verse">${getHexagramVerse(result.changed.number)}</p>
                    <p class="gua-meaning">${getHexagramMeaning(result.changed.number)}</p>
                </div>
            </div>
        ` : '';

        resultContainer.innerHTML = `
            <div class="divination-result">
                <div class="hexagram-pair">
                    <div class="hexagram-card" data-aos="fade-right" data-aos-delay="300">
                        <h3 class="hexagram-title">${result.primary.number}. ${result.primary.name}</h3>
                        <div class="gua-symbol">${result.primary.upperSymbol}${result.primary.lowerSymbol}</div>
                        <div class="gua-vertical">
                            ${result.primary.hexagram.slice(0, 3).map((line, index) => `
                                <div class="gua-line ${result.changingLines.includes(index) ? 'moving-line' : ''}">
                                    ${line === 1 ? '<div class="line-solid"></div>' : '<div class="line-broken"></div>'}
                                </div>
                            `).join('')}
                            ${result.primary.hexagram.slice(3, 6).map((line, index) => `
                                <div class="gua-line ${result.changingLines.includes(index + 3) ? 'moving-line' : ''}">
                                    ${line === 1 ? '<div class="line-solid"></div>' : '<div class="line-broken"></div>'}
                                </div>
                            `).join('')}
                        </div>
                        <div class="hexagram-text">
                            <p class="gua-verse">${getHexagramVerse(result.primary.number)}</p>
                            <p class="gua-meaning">${getHexagramMeaning(result.primary.number)}</p>
                        </div>
                    </div>
                    ${changedHexagramHTML}
                </div>
                
                ${result.changingLines.length > 0 ? `
                    <div class="changing-lines" data-aos="fade-up" data-aos-delay="900">
                        <h3>變爻分析</h3>
                        <div class="moving-lines-summary">
                            共有 ${result.changingLines.length} 個變爻：${result.changingLines.map(l => l + 1).join('、')} 爻
                        </div>
                        <table class="lines-table">
                            <thead>
                                <tr>
                                    <th>爻位</th>
                                    <th>爻象</th>
                                    <th>性質</th>
                                    <th>變化</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${result.lines.map((line, index) => `
                                    <tr class="${result.changingLines.includes(index) ? 'moving-line' : ''}">
                                        <td>${index + 1}</td>
                                        <td>${index === 0 ? '初爻' : 
                                          index === 1 ? '二爻' : 
                                          index === 2 ? '三爻' : 
                                          index === 3 ? '四爻' : 
                                          index === 4 ? '五爻' : '上爻'}${index === 4 ? '(君位)' : 
                                          index === 0 || index === 3 ? '(臣位)' : 
                                          index === 2 || index === 5 ? '(應位)' : '(民位)'}
                                        </td>
                                        <td>${getLineNature(line)}</td>
                                        <td>${result.changingLines.includes(index) ? 
                                            (line === 6 ? '陰變陽' : '陽變陰') : 
                                            '不變'}
                                        </td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                        <div class="ai-interpretation-actions mt-2">
                            <button id="ai-gua-explain-btn" class="btn btn-primary">
                                <span class="btn-text">AI解析此卦象</span>
                                <span class="btn-glow"></span>
                            </button>
                        </div>
                    </div>
                ` : ''}
                
                <div class="ai-interpretation-actions" data-aos="fade-up" data-aos-delay="1200">
                    <button id="ai-explain-btn" class="btn btn-primary" onclick="document.getElementById('ai-button').click()">
                        <span class="btn-text">AI智能解讀</span>
                        <span class="btn-glow"></span>
                    </button>
                </div>
            </div>
        `;
        
        // Refresh AOS for new content
        AOS.refresh();
    }

    // Generate AI interpretation
    function generateAIInterpretation() {
        // 在實際應用中，這裡會調用AI API進行解讀
        const interpretations = [
            `<h4>整體卦象解讀</h4>
            <p>您的卦象顯示當前處於轉變階段，有重要的內在能量正在積累。這個時期適合深思熟慮並為未來行動做準備，而非草率決定。</p>
            <p>卦象中的陰陽平衡表明，您需要在剛柔之間找到平衡點。目前的情況可能看似平靜，但暗流湧動，變化即將到來。</p>
            
            <h4>關係方面</h4>
            <p>在人際關係中，保持謙遜和開放的態度將為您帶來支持。不要強求結果，讓事情自然發展。重要關係可能正處於微妙調整期，耐心和理解是關鍵。</p>
            
            <h4>事業發展</h4>
            <p>工作或事業上，現階段最好專注於鞏固基礎、積累知識和完善技能，而非貿然擴張。卦象顯示潛在的障礙可能會出現，提前做好準備能夠轉危為安。</p>
            
            <h4>行動建議</h4>
            <p>建議採取中庸之道，避免極端行為。保持警覺但不必過度擔憂，觀察變化並適時調整計劃。當下最重要的是培養內在力量和智慧，為未來的重大機遇做準備。</p>
            
            <h4>互動問答</h4>
            <div class="ai-interactive">
                <iframe width="100%" height="300px" allow="microphone *" src="https://www.gptbots.ai/widget/eeavspiekwtrdohhv0wh33d/chat.html"></iframe>
            </div>`,
            
            `<h4>整體卦象解讀</h4>
            <p>您的卦象呈現出強大的創造力和突破性能量。這是一個重要的轉折點，過去的努力即將開花結果，新的機會正在形成。</p>
            <p>陽爻的優勢表明這是行動和外向表達的時期。然而變爻也提醒您需要靈活應對即將到來的變化，不要固執於單一方案。</p>
            
            <h4>關係方面</h4>
            <p>人際關係將進入活躍期，社交圈可能擴大，有機會結識對您未來發展有幫助的人。已有的關係可能需要重新審視，確保它們與您的新方向相符合。</p>
            
            <h4>事業發展</h4>
            <p>事業上有重大進展的徵兆，可能出現新的項目或合作機會。勇於創新和冒險將帶來回報，但也需注意不要忽略細節和可能的風險。</p>
            
            <h4>行動建議</h4>
            <p>此時應當積極主動，但保持明智和平衡。利用當前的有利能量推動重要計劃，同時為可能的變化做好準備。保持開放心態，靈活調整策略將幫助您最大化成功機會。</p>
            
            <h4>互動問答</h4>
            <div class="ai-interactive">
                <iframe width="100%" height="300px" allow="microphone *" src="https://www.gptbots.ai/widget/eeavspiekwtrdohhv0wh33d/chat.html"></iframe>
            </div>`
        ];
        
        return interpretations[Math.floor(Math.random() * interpretations.length)];
    }

    // Helper functions for hexagram determination
    function determineHexagramNumber(hexagram) {
        // 卦爻是從底部向上數的，最下面的是初爻（第一爻）
        // 依照規則，左三爻為上卦，右三爻為下卦
        const upperTrigram = hexagram.slice(0, 3);  // 上卦（左三爻）
        const lowerTrigram = hexagram.slice(3, 6);  // 下卦（右三爻）
        
        // 轉換成八卦符號
        const upperSymbol = getTrigramSymbol(upperTrigram);
        const lowerSymbol = getTrigramSymbol(lowerTrigram);
        
        // 八卦定義的映射表，確保符號與名稱正確對應
        const hexagramMap = {
            "☰☰": 1,  // 乾
            "☷☷": 2,  // 坤
            "☵☳": 3,  // 屯
            "☶☵": 4,  // 蒙
            "☵☰": 5,  // 需
            "☰☵": 6,  // 訟
            "☷☵": 7,  // 師
            "☵☷": 8,  // 比
            "☴☰": 9,  // 小畜
            "☰☱": 10, // 履
            "☷☰": 11, // 泰
            "☰☷": 12, // 否
            "☰☲": 13, // 同人
            "☲☰": 14, // 大有
            "☷☶": 15, // 謙
            "☳☷": 16, // 豫
            "☱☳": 17, // 隨
            "☶☴": 18, // 蠱
            "☷☱": 19, // 臨
            "☴☷": 20, // 觀
            "☲☳": 21, // 噬嗑
            "☶☲": 22, // 賁
            "☶☷": 23, // 剝
            "☷☳": 24, // 復
            "☰☳": 25, // 无妄
            "☶☰": 26, // 大畜
            "☶☳": 27, // 頤
            "☱☴": 28, // 大過
            "☵☵": 29, // 坎
            "☲☲": 30, // 離
            "☱☶": 31, // 咸
            "☳☴": 32, // 恆
            "☰☶": 33, // 遯
            "☳☰": 34, // 大壯
            "☲☷": 35, // 晉
            "☷☲": 36, // 明夷
            "☴☲": 37, // 家人
            "☲☱": 38, // 睽
            "☵☶": 39, // 蹇
            "☳☵": 40, // 解
            "☶☱": 41, // 損
            "☴☳": 42, // 益
            "☱☰": 43, // 夬
            "☰☴": 44, // 姤
            "☱☷": 45, // 萃
            "☷☴": 46, // 升
            "☱☵": 47, // 困
            "☵☴": 48, // 井
            "☱☲": 49, // 革
            "☲☴": 50, // 鼎
            "☳☳": 51, // 震
            "☶☶": 52, // 艮
            "☴☶": 53, // 漸
            "☳☱": 54, // 歸妹
            "☳☲": 55, // 豐
            "☲☶": 56, // 旅
            "☴☴": 57, // 巽
            "☱☱": 58, // 兌
            "☴☵": 59, // 渙
            "☵☱": 60, // 節
            "☴☱": 61, // 中孚
            "☳☶": 62, // 小過
            "☵☲": 63, // 既濟
            "☲☵": 64  // 未濟
        };
        
        // 完整的卦象
        const guaSymbol = upperSymbol + lowerSymbol;
        
        // 從映射表中查找卦象對應的數字
        if (hexagramMap[guaSymbol]) {
            return hexagramMap[guaSymbol];
        }
        
        // 如果找不到映射，使用備用方法
        let hash = 0;
        for (let i = 0; i < hexagram.length; i++) {
            hash = ((hash << 1) + hexagram[i]) % 64;
        }
        return hash + 1; // 轉換為1-64範圍
    }
    
    // 根據爻線獲取八卦符號 (1 = 陽爻, 0 = 陰爻)
    function getTrigramSymbol(trigram) {
        const trigramMap = {
            "111": "☰", // 乾 (天)
            "000": "☷", // 坤 (地)
            "100": "☳", // 震 (雷)
            "001": "☶", // 艮 (山)
            "101": "☲", // 離 (火)
            "010": "☵", // 坎 (水)
            "110": "☱", // 兌 (澤)
            "011": "☴"  // 巽 (風)
        };
        
        const key = trigram.join("");
        return trigramMap[key] || "";
    }

    // Hexagram name lookup (simplified)
    function getHexagramName(number) {
        const names = [
            "乾 - 天", "坤 - 地", "屯 - 初難", "蒙 - 蒙昧", "需 - 等待", "訟 - 爭訟", 
            "師 - 眾", "比 - 親比", "小畜 - 馴養", "履 - 履行", "泰 - 通泰", "否 - 閉塞", 
            "同人 - 同道", "大有 - 大得", "謙 - 謙虛", "豫 - 喜悅", "隨 - 隨從", "蠱 - 蠱惑", 
            "臨 - 臨照", "觀 - 觀察", "噬嗑 - 咬合", "賁 - 裝飾", "剝 - 剝落", "復 - 復返", 
            "无妄 - 無妄", "大畜 - 畜養", "頤 - 養正", "大過 - 過度", "坎 - 水", "離 - 火", 
            "咸 - 感應", "恆 - 恆久", "遯 - 遯隱", "大壯 - 壯大", "晉 - 晉升", "明夷 - 傷明", 
            "家人 - 家族", "睽 - 睽違", "蹇 - 蹇澀", "解 - 解難", "損 - 損減", "益 - 增益", 
            "夬 - 決斷", "姤 - 遇合", "萃 - 萃聚", "升 - 上升", "困 - 困厄", "井 - 井泉", 
            "革 - 革新", "鼎 - 鼎新", "震 - 震動", "艮 - 止", "漸 - 漸進", "歸妹 - 歸女", 
            "豐 - 豐盈", "旅 - 旅行", "巽 - 風", "兌 - 澤", "渙 - 渙散", "節 - 節制", 
            "中孚 - 誠信", "小過 - 小過", "既濟 - 已成", "未濟 - 未成"
        ];
        
        // Ensure number is valid
        const index = (number - 1) % 64;
        return names[index];
    }

    // Get hexagram verse (simplified)
    function getHexagramVerse(number) {
        const verses = [
            "元亨利貞。", "元亨，利牝馬之貞。君子有攸往，先迷後得主，利西南得朋，東北喪朋。安貞，吉。", 
            "元亨，利貞，勿用有攸往，利建侯。", "亨。匪我求童蒙，童蒙求我。初筮告，再三瀆，瀆則不告。利貞。", 
            "有孚，光亨，貞吉。利涉大川。", "有孚，窒。惕中吉，終凶。利見大人，不利涉大川。", 
            "貞，丈人，吉無咎。", "吉。原筮，元永貞，無咎。不寧方來，後夫凶。", 
            "亨。密雲不雨，自我西郊。", "履虎尾，不咥人，亨。", 
            "小往大來，吉，亨。", "否之匪人，不利君子貞，大往小來。", 
            "同人於野，亨。利涉大川，利君子貞。", "元亨。", 
            "亨，君子有終。", "利建侯行師。", 
            "元亨利貞，無咎。", "元亨，利涉大川。先甲三日，後甲三日。", 
            "元亨，利貞。至於八月有凶。", "盥而不薦，有孚顒若。", 
            "亨。利用獄。", "亨。小利有攸往。", 
            "不利有攸往。", "亨。出入無疾，朋來無咎。反復其道，七日來復，利有攸往。", 
            "元亨，利貞。其匪正有眚，不利有攸往。", "利貞，不家食，吉。利涉大川。", 
            "貞吉。觀頤，自求口實。", "棟橈，利有攸往，亨。", 
            "習坎，有孚，維心亨，行有尚。", "利貞，亨。畜牝牛，吉。", 
            "亨，利貞，取女吉。", "亨，無咎，利貞，利有攸往。", 
            "亨，小利貞。", "利貞。", 
            "康侯用錫馬蕃庶，晝日三接。", "利艱貞。", 
            "利女貞。", "小事吉。", 
            "利西南，不利東北；利見大人，貞吉。", "利西南，無所往，其來復吉。有攸往，夙吉。", 
            "有孚，元吉，無咎，可貞，利有攸往。曷之用？二簋可用享。", "利有攸往，利涉大川。", 
            "揚於王庭，孚號，有厲，告自邑，不利即戎，利有攸往。", "女壯，勿用取女。", 
            "亨。王假有廟，利見大人，亨，利貞。用大牲吉，利有攸往。", "元亨，用見大人，勿恤，南征吉。", 
            "亨，貞，大人吉，無咎，有言不信。", "改邑不改井，無喪無得，往來井井。汔至，亦未繘井，羸其瓶，凶。", 
            "己日乃孚，元亨，利貞，悔亡。", "元吉，亨。", 
            "亨。震來虩虩，笑言啞啞。震驚百里，不喪匕鬯。", "艮其背，不獲其身；行其庭，不見其人，無咎。", 
            "女歸吉，利貞。", "征凶，無攸利。", 
            "亨，王假之，勿憂，宜日中。", "小亨，旅貞吉。", 
            "小亨，利攸往，利見大人。", "亨，利貞。", 
            "亨。王假有廟，利涉大川，利貞。", "亨。苦節不可貞。", 
            "豚魚吉，利涉大川，利貞。", "亨，利貞，可小事，不可大事。飛鳥遺之音，不宜上宜下，大吉。", 
            "亨，小利貞，初吉終亂。", "亨，小狐汔濟，濡其尾，無攸利。"
        ];
        
        // Ensure number is valid
        const index = (number - 1) % 64;
        return verses[index];
    }

    // Get hexagram meaning (simplified)
    function getHexagramMeaning(number) {
        const meanings = [
            "象徵天、剛健。", "象徵地、柔順。", "象徵初生、艱難。", 
            "象徵蒙昧、啟蒙。", "象徵等待、期待。", "象徵爭訟、爭端。", 
            "象徵軍隊、戰爭。", "象徵親密、親附。", "象徵小有積蓄。", 
            "象徵履行、踐行。", "象徵通泰、安泰。", "象徵閉塞、不通。", 
            "象徵和同、團結。", "象徵大有收穫。", "象徵謙虛、謙遜。", 
            "象徵安樂、愉悅。", "象徵隨從、追隨。", "象徵整治、革新。", 
            "象徵監臨、統治。", "象徵觀察、瞻仰。", "象徵咬合、刑罰。", 
            "象徵文飾、修飾。", "象徵剝落、侵蝕。", "象徵回復、回歸。", 
            "象徵不妄為、真實。", "象徵大積蓄、準備。", "象徵頤養、保養。", 
            "象徵過度、大的過失。", "象徵險阻、坎坷。", "象徵附著、光明。", 
            "象徵感應、交感。", "象徵恆久、持久。", "象徵退避、隱遁。", 
            "象徵強盛、壯大。", "象徵前進、晉升。", "象徵光明受損、艱難。", 
            "象徵家庭、家族。", "象徵背離、乖離。", "象徵艱難、險阻。", 
            "象徵緩解、解除。", "象徵減損、損失。", "象徵增益、利益。", 
            "象徵決斷、決裂。", "象徵相遇、邂逅。", "象徵聚合、聚集。", 
            "象徵上升、長進。", "象徵困窮、困境。", "象徵水井、養人。", 
            "象徵變革、革新。", "象徵鼎器、穩定。", "象徵震動、震撼。", 
            "象徵靜止、止欲。", "象徵漸進、逐漸。", "象徵婚嫁、歸往。", 
            "象徵豐盛、盛大。", "象徵旅行、旅居。", "象徵順從、謙遜。", 
            "象徵喜悅、和悅。", "象徵渙散、離散。", "象徵節制、節儉。", 
            "象徵誠信、孚信。", "象徵小有過越。", "象徵已經完成、成功。", 
            "象徵尚未完成、有待努力。"
        ];
        
        // Ensure number is valid
        const index = (number - 1) % 64;
        return meanings[index];
    }

    // Get line nature
    function getLineNature(lineValue) {
        switch(lineValue) {
            case 6: return "老陰 (變)";
            case 7: return "少陽 (靜)";
            case 8: return "少陰 (靜)";
            case 9: return "老陽 (變)";
            default: return "";
        }
    }
});