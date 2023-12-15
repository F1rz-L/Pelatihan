document.addEventListener('DOMContentLoaded', function() { 
    let gameState = 'instruction'
    let intervalCountdown = null
    let playerName = ''
    
    // Event Listeners
    // keyup Document
    document.addEventListener('keyup', function(e){
        if(e.key === 'Escape' && gameState == 'playing'){
            pauseGame()
        }
        if(e.key === 'Escape' && gameState == 'pause'){
            resumeGame()
        }
    })


    document.querySelector('.form-control').addEventListener('keyup', function(e){
        const btnPlay = document.getElementById('btn-play')
        if (e.target.value.trim() == ""){
            btnPlay.classList.add('disabled')
        }else if (e.target.value.trim() != ""){
            btnPlay.classList.remove('disabled')
        }
    })

    document.getElementById('btn-play').addEventListener('click', function(e){
        e.preventDefault()
        playerName = document.querySelector('.form-control').value
        setActiveScreen('countdown-screen', true)
        startCountdown()
    })

    // functions
    const startCountdown = () => {
        let countdown = 3
        const cd = document.querySelector('.countdown-counter')
        cd.innerHTML = countdown
        intervalCountdown = setInterval(() => {
            countdown--
            cd.innerHTML = countdown
            if(countdown == 0){
                clearInterval(intervalCountdown)
                startGame()
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
    }

    const startGame = () => {
        gameState = 'playing'
        setActiveScreen('main-screen', true)
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



    setActiveScreen("instructions-screen", true)
})