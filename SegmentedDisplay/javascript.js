{let seg1 = document.querySelector(`.seg1`)
let seg2 = document.querySelector(`.seg2`)
let seg3 = document.querySelector(`.seg3`)
let seg4 = document.querySelector(`.seg4`)
let seg5 = document.querySelector(`.seg5`)
let seg6 = document.querySelector(`.seg6`)
let seg7 = document.querySelector(`.seg7`)

let no1 = [seg2,seg5]
let no2 = [seg1,seg3,seg4,seg5,seg7]
let no3 = [seg1,seg3,seg4,seg6,seg7]
let no4 = [seg2,seg4,seg3,seg6]
let no5 = [seg1,seg2,seg4,seg6,seg7]
let no6 = [seg1,seg2,seg4,seg5,seg6,seg7]
let no7 = [seg1,seg3,seg6]
let no8 = [seg2,seg5,seg1,seg3,seg4,seg6,seg7]
let no9 = [seg1,seg2,seg3,seg4,seg6,seg7]
let no0 = [seg1,seg2,seg3,seg5,seg6,seg7]}

let t = 0

// setInterval(() => {
//     t++;
//     `no${t}`.for
// }, 1);
let centiSekon =0, sekon=0, timer;



function UpdateTimer() {
    centiSekon++;
    if(centiSekon ==100) {
        sekon++;
        centiSekon = 0;
        }
        updateDisplay()
    }

function updateDisplay(){
    document.querySelector('#sekDisplay').innerHTML = sekon.toString().padStart(3,'0');
    document.querySelector('#centiSekDisplay').innerHTML = centiSekon.toString().padStart(2,'0');
}

function btnstart(){
    interval = setInterval(UpdateTimer, 10)
}
