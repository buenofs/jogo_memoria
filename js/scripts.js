document.addEventListener('DOMContentLoaded', () => {
    const questions = {
        "Ansiedade": [
            {
                question: "Como controlar uma crise de ansiedade?",
                answers: ["Respire profundamente", "Organizar sua rotina", "Use técnicas de relaxamento", "Pratique exercícios físicos", "Evitar bebidas estimulantes", "Procure um profissional"],
                videoUrl: "https://www.youtube.com/embed/Zeg2JZFNQdY?si=kPuAKQpW0HD5mqrz"
            },
            {
                secretCode: "Posição: 1, Código: ⭡",
                question: "Quais os sintomas da ansiedade?",
                answers: ["Preocupação excessiva", "Inquietação", "Dificuldade de concentração", "Tensão muscular", "Irritabilidade", "Insônia"],
                videoUrl: "https://www.youtube.com/embed/MdMVCQdfWUk?si=xrvAUvI5dcU5bpzF"
            },
            {
                question: "Como a ansiedade pode ser tratada?",
                answers: ["Abordagens terapêuticas", "Terapia cognitivo-comportamental", "Medicamentos", "Meditação", "Atividades físicas", "Consultas com terapeutas"],
                videoUrl: "https://www.youtube.com/embed/R3GEIgnpo9U?si=0fv4Oat9epSPk9KA"
            }
        ],
        "Depressão": [
            {
                secretCode: "Posição: 2, Código: ⭡",
                question: "Quais são os sintomas comuns da depressão?",
                answers: ["Tristeza", "Vazio", "Desesperança", "Perda de interesse", "Insônia", "Dificuldade de concentração"],
                videoUrl: "https://www.youtube.com/embed/8n25Y5zhcp4?si=85f1wX27CydaJvo8"
            },
            {
                secretCode: "Posição: 3, Código: ⭢",
                question: "Quais fatores podem desencadear a depressão?",
                answers: ["Eventos traumáticos", "Estresse crônico", "Histórico de depressão", "Desequilíbrios químicos no cérebro", "Doenças médicas", "Uso de certos medicamentos"],
                videoUrl: "https://www.youtube.com/embed/wgcjHZnjUMU?si=wNrNcIONmB_w6pcA"
            },
            {
                question: "Como ajudar alguém que está com depressão?",
                answers: ["Ouça atentamente sem julgamento", "Incentive-os a procurar ajuda", "Ofereça apoio prático", "Não dar conselhos não solicitados", "Esteja ciente dos sinais", "Cuide de si mesmo"],
                videoUrl: "https://www.youtube.com/embed/t2MJC_39hjk?si=1UUN-wIa9rXYQmIS"
            }
        ],
        "Estresse": [
            {
                secretCode: "Posição: 4, Código: ⭣",
                question: "Quais são os principais sintomas do estresse?",
                answers: ["Alterações no apetite", "Problemas de sono", "Tensão muscular", "Ansiedade", "Dificuldade de concentração", "Baixa imunidade"],
                videoUrl: "https://www.youtube.com/embed/WJ810aHVnGY?si=FSDFWcRGnwJPYhZd"
            },
            {
                secretCode: "Posição: 5, Código: ⭣",
                question: "Como posso reduzir o estresse?",
                answers: ["Prática regular de exercícios físicos", "Respiração profunda", "Postura corporal", "Cuidados na alimentação", "Práticas de relaxamento", "Pausas regulares durante o dia"],
                videoUrl: "https://www.youtube.com/embed/zpQOCJVuF50?si=cIaiXHS8KLe-GtLG"
            },
            {
                question: "Quais são as principais causas do estresse?",
                answers: ["Problemas financeiros", "Conflitos familiares", "Preocupações com a saúde", "Expectativas irreais", "Conflitos interpessoais ", "Problemas com autoestima"],
                videoUrl: "https://www.youtube.com/embed/2klTKG3x8CU?si=ylWEwb6-h5zbWqyr"
            }
        ],
    };

    const initialPageContainer = document.querySelector('.initial-page');
    const gameCategoriesContainer = document.querySelector('.game-categories');
    const categoryButtons = document.querySelectorAll('.category-buttons button');
    const questionTitleContainer = document.querySelector('.question-title');
    const gameContainer = document.querySelector('.game-container');
    const cardContainer = document.querySelector('.card-container');
    const videoContainer = document.querySelector('.video-container');
    let currentVideoUrl = '';
    let isProcessing = false;
    let category = '';
    let question = '';
    let currentSecretCode = '';

    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            category = button.textContent;
            startGame(category, true);  // Passa true para indicar que estamos reiniciando o jogo
        });
    });

    document.getElementById('start-game').addEventListener('click', function() {
        initialPageContainer.style.animation = 'fadeOut 1s forwards';
        
        setTimeout(() => {
            initialPageContainer.style.display = 'none';
            initialPageContainer.style.animation = '';
            
            gameCategoriesContainer.style.display = 'block';
            gameCategoriesContainer.style.animation = 'fadeIn 1s forwards';
        }, 1000); // Espera a animação de fade out terminar
    });

    let secretCode = ['ArrowUp', 'ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowDown'];
    let inputSequence = [];

    document.addEventListener('keydown', (event) => {
        inputSequence.push(event.key);
        if (inputSequence.length > secretCode.length) {
            inputSequence.shift();
        }

        if (inputSequence.join('') === secretCode.join('')) {
            let containers = document.querySelectorAll('.initial-page, .game-container, .game-categories');
            containers.forEach(container => {
                container.style.animation = '';
                container.classList.add('shake');
            });

            setTimeout(() => {
                containers.forEach(container => {
                    container.style.display = 'none';
                });
                let specialPage = document.querySelector('.special-page');
                specialPage.style.display = 'block';
                specialPage.style.animation = 'pop 0.5s forwards, fadeIn 1s forwards';

                let section = document.querySelector('.special-page section');

                Object.keys(questions).forEach(category => {
                    let title = document.createElement('h2');
                    title.textContent = category;
                    section.appendChild(title);
    
                    questions[category].forEach(item => {
                        let videoContainer = document.createElement('div');
                        videoContainer.classList.add('video-container-special');

                        let videoTitle = document.createElement('p');
                        videoTitle.textContent = item.question;
                        videoContainer.appendChild(videoTitle);
                    
                        let video = document.createElement('iframe');

                        let iframeWidth = "560";
                        let iframeHeight = "315";
                
                        if (window.innerWidth <= 600) {
                            iframeWidth = "100%";
                            iframeHeight = "250";
                        }

                        video.src = item.videoUrl;
                        video.width = iframeWidth;
                        video.height = iframeHeight;
                        video.frameBorder = "0";
                        video.referrerPolicy = "strict-origin-when-cross-origin";
                        video.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
                        video.allowFullscreen = true;
                        videoContainer.appendChild(video);
    
                        section.appendChild(videoContainer);
                    });
                });
            }, 2000); // 2 seconds delay
        }
    });

    function startGame(category, isRestarting) {
        resetStyles();
        gameContainer.style.display = 'block';
        gameContainer.style.animation = 'fadeIn 1s forwards';
        const questionData = questions[category][Math.floor(Math.random() * questions[category].length)];
        question = questionData.question;
        currentSecretCode = questionData.secretCode;
        setQuestionTitle(questionData.question);
        currentVideoUrl = questionData.videoUrl;

        let answers = [...questionData.answers];

        if (window.innerWidth <= 600) {
            answers = answers.slice(0, 3);
        }

        if (isRestarting && videoContainer.style.display === 'block') {
            hideVideo(); // Esconde o vídeo com fade out se ele estiver visível
            setTimeout(() => {
                initializeGame(answers, true); // Adiciona as cartas com efeito de cascata reverso
            }, 1000); // Espera o fade out do vídeo terminar antes de adicionar as cartas
        } else {
            initializeGame(answers, false); // Adiciona as cartas imediatamente se o vídeo não estiver visível
        }
    }

    function setQuestionTitle(question) {
        questionTitleContainer.innerHTML = `<h1 id="question-title">${question}</h1>`;
    }

    function initializeGame(answers, isReverseCascade) {
        cardContainer.innerHTML = '';
        const shuffledAnswers = shuffle([...answers, ...answers]); // Duplica e embaralha as respostas
        
        shuffledAnswers.forEach((answer, index) => {
            const card = document.createElement('div');
            card.classList.add('card');

            const cardInner = document.createElement('div');
            cardInner.classList.add('card-inner');

            const frontFace = document.createElement('div');
            frontFace.classList.add('card-front');

            const backFace = document.createElement('div');
            backFace.classList.add('card-back');
            const backFaceText = document.createElement('p');
            backFaceText.classList.add('card-text');
            backFaceText.textContent = answer;
            backFace.appendChild(backFaceText);

            cardInner.appendChild(frontFace);
            cardInner.appendChild(backFace);
            card.appendChild(cardInner);
            card.addEventListener('click', flipCard);
            cardContainer.appendChild(card);

            questionTitleContainer.style.animation = 'fadeIn 1s forwards';
            card.style.animation = 'fadeIn 1s forwards';
            setTimeout(() => {
                questionTitleContainer.style.display = 'block';
                card.style.display = 'block';
            }, index * 300); // Ajusta o intervalo para criar o efeito de cascata reverso
        });
    }

    function flipCard() {
        if (!this.classList.contains('flipped') && !this.classList.contains('matched') && !isProcessing) {
            this.classList.add('flipped');
            checkMatch();
        }
    }

    function checkMatch() {
        const flippedCards = document.querySelectorAll('.card.flipped:not(.matched)');
        if (flippedCards.length === 2) {
            isProcessing = true;
            const firstCard = flippedCards[0];
            const secondCard = flippedCards[1];
            if (firstCard.querySelector('.card-back').textContent === secondCard.querySelector('.card-back').textContent) {
                celebrateMatch();
                firstCard.classList.add('matched');
                secondCard.classList.add('matched');
                isProcessing = false;
            } else {
                setTimeout(() => {
                    firstCard.classList.remove('flipped');
                    secondCard.classList.remove('flipped');
                    isProcessing = false;
                }, 1000);
            }
            checkGameOver();
        }
    }

    function checkGameOver() {
        const matchedCards = document.querySelectorAll('.card.matched');
        const totalCards = document.querySelectorAll('.card').length;
        if (matchedCards.length === totalCards) {
            setTimeout(() => {
                gameOverCelebration();
            }, 1000);

            setTimeout(() => {
                triggerCascadeFlip();
            }, 4000);
        }
    }

    function triggerCascadeFlip() {
        const cards = document.querySelectorAll('.card');
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.remove('flipped'); // Remove o flipped
            }, index * 300); // Ajusta o intervalo para criar o efeito de cascata
        });

        setTimeout(() => {
            triggerFadeOut();
        }, cards.length * 300 + 700); // Espera até que todas as cartas tenham virado
    }

    function triggerFadeOut() {
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            card.style.animation = 'fadeOut 1s forwards';
        });
        questionTitleContainer.style.animation = 'fadeOut 1s forwards';
        setTimeout(() => {
            cardContainer.innerHTML = ''; // Limpa o container de cartas
            questionTitleContainer.innerHTML = ''; // Limpa o título da pergunta
            showVideo();
        }, 1000); // Espera a animação de fade out terminar
    }

    function showVideo() {
        let iframeWidth = "560";
        let iframeHeight = "315";

        if (window.innerWidth <= 600) {
            iframeWidth = "100%";
            iframeHeight = "250";
        }

        videoContainer.innerHTML = `
            <div class="video-title">
                <h2>Parabéns!</h2>
                <p>Você acaba de dar um passo muito importante ao demonstrar interesse em entender melhor sobre <strong>${category.toLowerCase()}</strong>. Para auxiliar ainda mais, separamos um vídeo interessante relacionado ao tema do desafio que você acabou de concluir (${question}).</p>
                ${currentSecretCode ? `<p>Código secreto liberado! Ao juntar os 5 códigos, digite eles na sequência proposta.</p><p><strong>Guarde esse código:</strong> ${currentSecretCode}</p>` : ''}
            </div>
            <iframe width="${iframeWidth}" height="${iframeHeight}" src="${currentVideoUrl}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        `;        
        videoContainer.style.display = 'block';
        videoContainer.style.animation = 'fadeIn 1s forwards';
    }

    function hideVideo() {
        if (videoContainer.style.display === 'block') {
            videoContainer.style.animation = 'fadeOut 1s forwards';
            setTimeout(() => {
                videoContainer.style.display = 'none';
                videoContainer.innerHTML = ''; // Limpa o conteúdo do vídeo
                videoContainer.style.animation = '';
            }, 1000); // Espera a animação de fade out terminar
        }
    }

    function resetStyles() {
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => {
            card.style.animation = '';
        });
        questionTitleContainer.style.display = 'none';
        questionTitleContainer.style.animation = '';
        videoContainer.style.animation = '';
    }

    function celebrateMatch() {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
        window.navigator.vibrate(200);
    }

    function gameOverCelebration() {
        const duration = 10 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
    
        function randomInRange(min, max) {
            return Math.random() * (max - min) + min;
        }
    
        const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();
    
        if (timeLeft <= 0) {
            return clearInterval(interval);
        }
    
        const particleCount = 50 * (timeLeft / duration);
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
        confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
        }, 250);
    }

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    const interBubble = document.querySelector('.interactive');
    let curX = 0;
    let curY = 0;
    let tgX = 0;
    let tgY = 0;

    function move() {
        curX += (tgX - curX) / 20;
        curY += (tgY - curY) / 20;
        interBubble.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`;
        requestAnimationFrame(() => {
            move();
        });
    }

    window.addEventListener('mousemove', (event) => {
        tgX = event.clientX;
        tgY = event.clientY;
    });

    move();
});
