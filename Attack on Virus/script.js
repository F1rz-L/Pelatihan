document.addEventListener('DOMContentLoaded', function() { 
    let gameState = 'instruction'
    let intervalCountdown = null
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

    document.getElementById('btn-play').addEventListener('click', function(e){
        e.preventDefault()
        playerName = document.querySelector('.form-control').value
        if(playerName.trim() != ""){
            openCountdownScreen()
        }
    })

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
        gameState = 'pause'
        setActiveScreen('pause-screen')
    }

    const resumeGame = () => {
        gameState = 'playing'
        setActiveScreen('main-screen', true)
    }

    const endGame = () => {
        gameState = 'end'
        setActiveScreen('end-screen', true)
    }

    const openCountdownScreen = () => {
        setActiveScreen('countdown-screen', true)
        startCountdown()
    }

    setActiveScreen("instructions-screen", true)
    checkPlayerInput()
})