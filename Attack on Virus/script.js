document.addEventListener('DOMContentLoaded', function() { 
    let gameState = 'instruction'
    let intervalCountdown = null
    let intervalTimer = null
    let playerName = ''
    
    // Event Listeners
    // keyup Document
    document.querySelector('#main-screen').addEventListener('keyup', function(e){
        if(e.key === 'Escape'){
            pauseGame()
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
        stopTimer()
        openCountdownScreen()
    })

    document.getElementById('menu-restart').addEventListener('click', function(e){
        e.preventDefault()
        stopTimer()
        openCountdownScreen()
    })

    document.getElementById('menu-quit').addEventListener('click', function(e){
        e.preventDefault()
        stopTimer()
        openInstructionScreen()
    })

    //
    // functions
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
                clearInterval(intervalCountdown)
                setActiveScreen('main-screen', true)
                startTimer(true)
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
        gameState = 'pause'
        setActiveScreen('pause-screen')
    }

    const resumeGame = () => {
        startTimer()
        gameState = 'playing'
        setActiveScreen('main-screen', true)
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

    openInstructionScreen()
})