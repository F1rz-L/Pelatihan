document.addEventListener('DOMContentLoaded', function() { 
    let gameState = 'instruction'
    let intervalCountdown = null
    let intervalTimer = null
    let intervalGame = null
    let intervalVirus = null
    let playerName = ''
    const buttonHeight = 150
    const lineHeight = 10
    const dangerHeight = 400
    let virusList = []
    const fileButtonName = []
    
    let fail = 0
    let score = 0
    
    function loadButton(){
        const button = ['D.jpg', 'F.jpg', 'J.jpg', 'K.jpg']
        button.forEach(btn => {
            const image = new Image()
            image.src = `img/${btn}`
            fileButtonName.push(image)
        })
    }

    // Event Listeners
    // keyup Document
    document.querySelector('#main-screen').addEventListener('keyup', function(e){
        if(e.key === 'Escape'){
            pauseGame()
        }else{
            keyEventVirus(e.key.toUpperCase())
        }
    })

    document.querySelector('#pause-screen').addEventListener('keyup', function(e){
        if(e.key === 'Escape'){
            resumeGame()
        }
    })

    document.querySelector('.form-control').addEventListener('keyup', function(e){
        checkPlayerInput()
    })
    
    // Click Event

    document.getElementById('btn-play').addEventListener('click', function(e){
        e.preventDefault()
        playerName = document.querySelector('.form-control').value
        if(playerName.trim() != ""){
            openCountdownScreen()
            document.getElementById('player-value').innerHTML = playerName
        }
    })

    document.getElementById('btn-continue').addEventListener('click', function(e){
        e.preventDefault()
        resumeGame()
    })

    document.getElementById('btn-restart').addEventListener('click', function(e){
        e.preventDefault()
        restartGame()
    })

    document.getElementById('menu-restart').addEventListener('click', function(e){
        e.preventDefault()
        restartGame()
    })

    document.getElementById('menu-quit').addEventListener('click', function(e){
        e.preventDefault()
        quitGame()
    })

    //
    // functions
    const getCanvas = () => {
        return /** @type {HTMLCanvasElement} */ (document.getElementById('game-canvas'))
    }

    const getContext = () => {
        return getCanvas().getContext('2d')
    }

    const checkPlayerInput = () => {
        const input = document.querySelector('.form-control').value
        const btnPlay = document.getElementById('btn-play')
        if (input.trim() == ""){
            btnPlay.classList.add('disabled')
        }else if (input.trim() != ""){
            btnPlay.classList.remove('disabled')
        }
    }

    const startCountdown = () => {
        let countdown = 3
        const cd = document.querySelector('.countdown-counter')
        cd.innerHTML = countdown
        intervalCountdown = setInterval(() => {
            countdown--
            cd.innerHTML = countdown
            if(countdown == 0){
                gameState = 'playing'
                clearInterval(intervalCountdown)
                setActiveScreen('main-screen', true)
                startTimer(true)
                draw()
                startGenerateVirus()
            }
        }, 1000)
    }

    const clearActiveScreen = () => {
        const activeScreen = document.querySelectorAll('.screen.active')
        activeScreen.forEach(screen => {
            screen.classList.remove('active')
        })
    }

    const setActiveScreen = (screenID, clear = false) => {
        if(clear){
            clearActiveScreen()
        }

        const screen = document.getElementById(screenID)
        screen.classList.add('active')
        document.getElementById(screenID).focus()
    }

    const pauseGame = () => {
        stopTimer()
        stopGenerateVirus()
        gameState = 'pause'
        setActiveScreen('pause-screen')
    }

    const resumeGame = () => {
        startTimer()
        gameState = "playing"
        draw()
        startGenerateVirus()
        setActiveScreen('main-screen', true)
    }

    function quitGame(){
        stopTimer()
        stopGenerateVirus()
        virusList = []
        openInstructionScreen()
        fail = 0
    }

    function restartGame(){
        stopTimer()
        stopGenerateVirus()
        virusList = []
        openCountdownScreen()
        fail = 0
    }

    const startTimer = (clear = false) => {
        if(clear){
            document.getElementById('time-value').innerHTML = '00:00'
        }

        intervalTimer = setInterval(() => {
            const time = document.getElementById('time-value').innerHTML
            const timeSplit = time.split(':')
            let minute = parseInt(timeSplit[0])
            let second = parseInt(timeSplit[1])
            if(second < 59){
                second++
            } else {
                second = 0
                minute++
            }
            second = second.toString().padStart(2, '0')
            minute = minute.toString().padStart(2, '0')

            document.getElementById('time-value').innerHTML = `${minute}:${second}`
        },1000)
    }

    const stopTimer = () => {
        clearInterval(intervalTimer)
    }

    const endGame = () => {
        gameState = 'end'
        setActiveScreen('end-screen', true)
    }

    const openCountdownScreen = () => {
        setActiveScreen('countdown-screen', true)
        startCountdown()
    }

    function openInstructionScreen(){
        setActiveScreen("instructions-screen", true)
        checkPlayerInput()
    }

    // Component
    class Virus{
        constructor(){
            this.width = 100
            this.height = 100
            this.image = new Image()
            this.image.src = 'img/virus.png'
            this.y = 0
            this.step = 5
            this.hit = false
            this.xList = [0,101,202,303]

            this.x = this.xList[Math.round(Math.random() * this.xList.length)]
            while(this.isStack()){
                this.x = this.xList[Math.round(Math.random() * this.xList.length)]
            }
            this.context = getContext()
        }

        attack(){
            this.hit = true
        }

        isDraw(){
            return this.y < (getCanvas().height - (buttonHeight + lineHeight + this.height)) && !this.hit
        }

        isDanger = () => {
            return this.y >= (getCanvas().height - (buttonHeight + lineHeight + dangerHeight + this.height))
            
        }

        isStack(){
            for(let virus of virusList){
                if(virus.x == this.x && this.y + this.height >= virus.y){
                    return true
                }
            }
        }

        draw(){
            if(this.isDraw()){
                this.context.drawImage(this.image, this.x, this.y, this.width, this.height)
                this.y += this.step
                console.log(this.y)
            }
        }
    }

    // Function Draw Game
    const drawTiles = (x) => {
        const ctx = getContext()
        const height = getCanvas().height
        ctx.fillStyle = '#282f35'
        ctx.fillRect(x, 0, 100, height)
    }

    const drawButton = (x, image) => {
        const ctx = getContext()
        const y = getCanvas().height - buttonHeight
        ctx.drawImage(image, x, y, 100, buttonHeight)
    }

    const drawLine = () => {
        const ctx = getContext()
        const y = getCanvas().height - (buttonHeight + lineHeight)
        ctx.fillStyle = '#5b6274'
        ctx.fillRect(0, y, getCanvas().width, lineHeight)
    }

    const drawDangerZone = (x) => {
        const ctx = getContext()
        const y = getCanvas().height - (buttonHeight + lineHeight + dangerHeight)
        ctx.globalAlpha = 0.4
        ctx.fillStyle = '#ff0000'
        ctx.fillRect(x, y, 100, dangerHeight)
        ctx.globalAlpha = 1
    }

    function startGenerateVirus(){
        intervalVirus = setInterval(() => {
            const virus = new Virus()
            virusList.push(virus)
        }, 1500)
    }

    function stopGenerateVirus(){
        clearInterval(intervalVirus)
    }

    function keyEventVirus(key){
        const keyList = ['D', 'F', 'J', 'K']
        const arrayPosition = [0, 101, 202, 303]
        for(let virus of virusList){
            const indexKey = keyList.indexOf(key)
            if(virus.x == arrayPosition[indexKey] && virus.isDraw()){
                if(virus.isDanger()){
                    score++
                    virus.attack()
                    break;
                }
            }
        }
        document.getElementById('score-value').innerHTML = score
    }

    const draw = () => {
            const arrayPosition = [0, 101, 202, 303]
            arrayPosition.forEach((position, index) => {
                drawTiles(position)
                drawButton(position, fileButtonName[index])
            })
            drawLine()
            arrayPosition.forEach((position) => {
                drawDangerZone(position)
            })
            virusList = virusList.filter((virus) =>{
                if(!virus.isDraw() && !virus.hit){
                    fail++
                }
                return virus.isDraw()
            })
            virusList.forEach(virus => {
                virus.draw()
            })

            document.getElementById('fail-value').innerHTML = fail
            if(gameState == "playing"){
                requestAnimationFrame(draw)
            }
        }

    openInstructionScreen()
    loadButton()
})