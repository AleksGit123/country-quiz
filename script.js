
// buttons
let randomBtn = document.querySelector(".random");
let resetBtn = document.querySelector(".reset");

// empty variables
let word = "";
let mixed = "";
let inputWord = "";
let randomIndex = [];

// html tags
let guessingWord = document.querySelector(".guessing_word");
let circleOfTries = document.querySelectorAll(".circles_of_tries");
let inputs = document.querySelectorAll("input");
let numOfTries = document.querySelector(".num_of_tries");
let mistakeLetters = document.querySelector(".num_of_mistakes")

let countMistakes = -1;



function generateWord(){
   randomIndex = [];
    
    fetch("https://random-word-api.vercel.app/api?words=1&length=6")
    .then(response =>{
        return response.json();
    })
    .then(data =>{
        word = data[0];
        mixed = "";
        console.log(word)

        // generate unique numbers
        while (randomIndex.length < 6) {
            let randomNum = Math.floor(Math.random() * 6);
            if (!randomIndex.includes(randomNum)) {
                randomIndex.push(randomNum);
            }
        }

        // save mixed words
        for(let i = 0;i < randomIndex.length;i++){
            // console.log(randomIndex[i])
            mixed += data[0][randomIndex[i]];
        }

        guessingWord.innerHTML = mixed;
        console.log(mixed);
    })
    return word;

}


inputs.forEach(input => input.disabled = true)

randomBtn.addEventListener("click", ()=>{
inputs.forEach(input => input.disabled = false)
    
    mixed = "";
    generateWord();

});

// count number of tries
function tries(input){
    ++countMistakes;
    console.log(countMistakes)
//    console.log(circleOfTries[0])
    if(countMistakes < 5){
        circleOfTries[countMistakes].style.display = "block";
        numOfTries.innerHTML = `${countMistakes + 1} / 5`;
        mistakeLetters.innerHTML += `${input.value},`;

    }
    else{
        inputs.forEach(input => input.disabled = true)
    
    }
    
}

inputs.forEach((input,index) =>{
    input.addEventListener("input", (e)=>{
    let splited = input.value.split("");
        // console.log(splited)

        // if input word is deleted, input whole word is deleted
       if( splited.length > 0){
        inputWord += splited[splited.length-1];
        }
        else if(splited.length < 1){
            inputWord = inputWord.slice(0,-1);
            input.style.backgroundColor = "transparent";
        }
        else{
         console.log("error");
        }
        console.log(inputWord)


        // check if a letter is in the cottect place/
       if(input.value === ""){

            // input.value = "";
            input.style.backgroundColor = "transparent";
            
        }
        else if(input.value === word[index]){
            input.style.backgroundColor = "green";
        }
        else{
            input.style.backgroundColor = "red";
            tries(input);
        
        }


          // check if word is correct
        if(inputWord === word){
            console.log("correct");
            guessingWord.innerHTML = "correct";
        }
      
    })
    
    
})


resetBtn.addEventListener("click",() =>{
    guessingWord.innerHTML = "W O R D";
    inputs.forEach(input => input.value = "");
    inputs.forEach(input => input.disabled = true);
    circleOfTries.forEach(circle => circle.style.display = "none");
    inputs.forEach(input => input.style.backgroundColor = "transparent");
    countMistakes = -1;
    numOfTries.innerHTML = `0/5`;
    mistakeLetters.innerHTML = "";
    inputWord = "";
    mixed = "";
    word = "";
    randomIndex = [];
    // countMistakes = -1;

})

