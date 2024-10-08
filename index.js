const teclasNum = [...document.querySelectorAll(".num")]
const teclasOp = [...document.querySelectorAll(".top")]
const teclaRes = document.querySelector(".res")
const display = document.getElementById("display")
const tOn = document.getElementById("ton")
const tlimpar = document.getElementById("tlimpar")
const tigual = document.getElementById("tigual")

let listenerAdd = false
let sinal = false
let decimal = false
let calculado = false

function addFunc() {

    if (listenerAdd) return;
    // Se os listeners já foram adicionados, não faz nada

    teclasNum.map(e => {
    
        e.addEventListener("click", handleNumClick)
    
    })

    teclasOp.map(e => {
        e.addEventListener("click", (evt) => {
            
            if(!sinal) {
                sinal=true
                decinal = false
                if(display.innerHTML == '0') {
                    display.innerHTML = ""
                }
                display.innerHTML += evt.target.innerHTML
            }
        })
    })

    listenerAdd = true;
}

function handleNumClick(evt) {
    // verifcação da classe, se está ligado ou nao!
    if (tOn.classList.contains("on")) {
        if (calculado) {
            display.innerHTML = ""
            calculado = false
        }

        sinal = false
        const val_dis = document.getElementById("display").textContent
    
        

        if(evt.target.innerHTML == ',') {
            if(!decimal) {
                decimal = true
                if (display.innerHTML == "0") {
                    display.innerHTML = "0."
                } else {
                    display.innerHTML += '.'
                }  
            }   
        } else {
            if (display.innerHTML == "0") {
                display.innerHTML = evt.target.innerHTML
                return
            }
            if (val_dis.length < 15) {
                display.innerHTML += evt.target.innerHTML
            }
        }  
    }
}

tlimpar.addEventListener("click", () => {
    decimal = false
    sinal = false
    display.innerHTML = "0"
})

tOn.addEventListener("click", () => {
    if (tOn.classList.contains("on")) {
        tOn.classList.remove("on")
        tOn.style.backgroundColor = "rgb(211, 0, 0)"
        listenerAdd = false

        teclasNum.forEach(e => {
            e.removeEventListener("click", handleNumClick);
        });
    } else {
        tOn.classList.add("on")
        tOn.style.backgroundColor = "rgb(28, 189, 0)"
        addFunc()
    }
})

tigual.addEventListener("click", () => {
    sinal = false
    decimal = false
    const res = eval(display.innerHTML)

    if (res == "Infinity") {
        display.innerHTML = "ERRO divisão"
        calculado = true
    } else if (res) {
        display.innerHTML = res
        calculado = true
    } else {
        display.innerHTML = "ERRO"
        calculado = true
    }
})