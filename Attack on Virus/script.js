document.addEventListener('DOMContentLoaded', function() { 
    let gameState = 'instruction'
    let playerName = ''
    
    // Event Listeners
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
    })

    // functions
    const clearActiveScreen = () =>{
        const activeScreen = document.querySelectorAll('.screen.active')
        activeScreen.forEach(screen => {
            screen.classList.remove('active')
        })
    }

    const setActiveScreen = (screenID, clear = false) =>{
        if(clear){
            clearActiveScreen()
        }

        const screen = document.getElementById(screenID)
        screen.classList.add('active')
    }



    setActiveScreen("instructions-screen", true)
})