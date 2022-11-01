
const barsDiv = document.querySelector(".barsDiv");
const butt = document.querySelectorAll(".press");
const buttonsDiv = document.querySelector(".buttons");
const dropBox = document.querySelector("#sortType");




buttonsDiv.addEventListener("click", perms);

document.addEventListener("DOMContentLoaded", function() {
    arre = createArray();
    renderBars(arre);
});

let randing = [];

function createArray() {
    let array = [];
    for (let i = 0; i < 25; i++) {
        array.push(Math.floor(Math.random()*100)%50 + 1);
        randing[i] = array[i];
    }
    return array;
}

function renderBars(arr) {
    // console.log(arr)
    for (let i = 0; i < 25; i++) {
        let bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.height = arr[i] + "vh";
        barsDiv.appendChild(bar);
    }
}




function randomise() {
    
    randing = [];
    newAr = createArray();
    while (barsDiv.firstChild) {
        barsDiv.removeChild(barsDiv.lastChild);
    }
    renderBars(newAr);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function taskBubble() {
    for (let j=0; j<25; j++) {
        let count = 0;
        for (let i = 0; i < 24-j;i++) {
            barsDiv.children[i].style.backgroundColor = "rgb(35, 240, 52)";
            barsDiv.children[i+1].style.backgroundColor = "rgb(35, 240, 52)"
            if (randing[i] > randing[i+1]) {
                let temp = barsDiv.children[i+1].style.height;
                barsDiv.children[i+1].style.height = barsDiv.children[i].style.height;
                barsDiv.children[i].style.height = temp;
                temp = randing[i+1];
                randing[i+1] = randing[i];
                randing[i] = temp;
                count += 1;
            }
            await sleep(100);
            barsDiv.children[i].style.backgroundColor = "rgb(221, 194, 178)";
            barsDiv.children[i+1].style.backgroundColor = "rgb(221, 194, 178)"
        }
        if (count == 0) {
            break;
        }
    }
}

async function taskSelection() {
    for (let i = 0; i < 24; i++) {
        let low = randing[i];
        let ind = 0;
        barsDiv.children[i].style.backgroundColor = "rgb(35, 240, 52)";

        for (let j = i+1; j < 25; j++)  {
            barsDiv.children[j].style.backgroundColor = "rgb(35, 240, 52)";
            if (randing[j] < low) {
                low = randing[j];
                ind = j;
            }
            await sleep(100);
            barsDiv.children[j].style.backgroundColor = "rgb(221, 194, 178)";
            
        }
        barsDiv.children[i].style.backgroundColor = "rgb(221, 194, 178)"
        if (ind != 0) {
            let temp = barsDiv.children[ind].style.height;
                barsDiv.children[ind].style.height = barsDiv.children[i].style.height;
                barsDiv.children[i].style.height = temp;
                temp = randing[ind];
                randing[ind] = randing[i];
                randing[i] = temp;
        }
    }
}

function perms(e) {
    if (e.target.classList.contains("randomIt")) {
        randomise();
    }
    else if (e.target.classList.contains("runn")) {
        if (dropBox.options.selectedIndex == 0) {
            taskBubble();
        }
        else if (dropBox.options.selectedIndex == 1) {
            taskSelection();
        }
        
    }
}


