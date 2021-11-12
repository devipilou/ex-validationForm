const inpUtilisateur = document.querySelector('.form-group:nth-child(1) input');
const inpMail = document.querySelector('.form-group:nth-child(2) input');
const inpMdp = document.querySelector('.form-group:nth-child(3) input');
const inpConfirme = document.querySelector('.form-group:nth-child(4) input');
const allImg = document.querySelectorAll('.icone-verif');
const allSpan = document.querySelectorAll('span');
const allLigne = document.querySelectorAll('.ligne div');
const allInput = document.querySelectorAll('input');
const btnSub = document.querySelector('form button');
const form = document.querySelector('form');
let resultat = document.querySelector('.resultat');

const controleValidation = {
    pseudo : 0,
    mail : 0,
    mdp : 0,
    conf : 0
}
const refValidation = {
    pseudo : 1,
    mail : 1,
    mdp : 1,
    conf : 1
}


// Validation du pseudo
inpUtilisateur.addEventListener('input', (e) => {

    if(e.target.value.length >= 3){
        allImg[0].style.display = "inline";
        allImg[0].src = "ressources/check.png";
        allSpan[0].style.display = "none";
        controleValidation['pseudo'] = 1;
    }else{
        allImg[0].style.display = "inline";
        allImg[0].src = "ressources/error.png";
        allSpan[0].style.display = "inline";
        controleValidation['pseudo'] = 0;
    }
    // console.log(controleValidation);

})

// Validation du mail
inpMail.addEventListener('input', (e) => {

    const regexEmail = /\S+@\S+\.\S+/;

    if(e.target.value.search(regexEmail) === 0){

        allImg[1].style.display = "inline";
        allImg[1].src = "ressources/check.png";
        allSpan[1].style.display = "none";
        controleValidation['mail'] = 1;

    }else if(e.target.value.search(regexEmail) === -1){

        allImg[1].style.display = "inline";
        allImg[1].src = "ressources/error.png";
        allSpan[1].style.display = "inline";
        controleValidation['mail'] = 0;
    }
    // console.log(controleValidation);

})

// Validation création du mdp
let valeurInp;
const specialCar = /[^a-zA-Z0-9]/;
const alphabet = /[a-z]/i;
const chiffres = /[0-9]/;

let objValidation = {
    symbole: 0,
    lettre: 0,
    chiffre : 0
}
inpMdp.addEventListener('input', (e) => {

    valeurInp = e.target.value;

    if(valeurInp.search(specialCar) !== -1){
        objValidation.symbole = 1;
    }
    if(valeurInp.search(alphabet) !== -1){
        objValidation.lettre = 1;
    }
    if(valeurInp.search(chiffres) !== -1){
        objValidation.chiffre = 1;
    }
    // console.log(objValidation);

    if(e.inputType = 'deleteContentBackward'){
        if(valeurInp.search(specialCar) === -1){
            objValidation.symbole = 0;
        }
        if(valeurInp.search(alphabet) === -1){
            objValidation.lettre = 0;
        }
        if(valeurInp.search(chiffres) === -1){
            objValidation.chiffre = 0;
        }
    }
    // console.log(objValidation);
    // console.log(controleValidation);
    

    let testAll = 0;
    for(const property in objValidation){
        if(objValidation[property] > 0){
            testAll++;
        }
    }
    if(testAll < 3 ){
        allSpan[2].style.display = "inline";
        allImg[2].style.display = "inline";
        allImg[2].src = "ressources/error.png";
        controleValidation['mdp'] = 0;
    }else{
        allSpan[2].style.display = "none";
        allImg[2].src = "ressources/check.png";
        controleValidation['mdp'] = 1;


        // force mdp
        if(valeurInp.length <= 6 && valeurInp.length > 0){
            allLigne[0].style.display = "block";
            allLigne[1].style.display = "none";
            allLigne[2].style.display = "none";
        }else if (valeurInp.length <= 9 && valeurInp.length > 6){
            allLigne[0].style.display = "block";
            allLigne[1].style.display = "block";
            allLigne[2].style.display = "none";
        }else if (valeurInp.length > 9){
            allLigne[0].style.display = "block";
            allLigne[1].style.display = "block";
            allLigne[2].style.display = "block";
        }else if(valeurInp.length === 0){
            allLigne[0].style.display = "none";
            allLigne[1].style.display = "none";
            allLigne[2].style.display = "none";
        }
    }

})

// confirmation
inpConfirme.addEventListener('input', (e) => {

    if(e.target.value.length === 0){
        allImg[3].style.display = "inline";
        allImg[3].src = "ressources/error.png";
        controleValidation['conf'] = 0;
    }else if(e.target.value === valeurInp){
        allImg[3].style.display = "inline";
        allImg[3].src = "ressources/check.png";
        controleValidation['conf'] = 1;
    }else{
        allImg[3].style.display = "inline";
        allImg[3].src = "ressources/error.png";
        controleValidation['conf'] = 0;
    }
    // console.log(controleValidation);

})

// Controle des validations
allInput.forEach(input => {
    input.addEventListener('input', () => {
        if(controleValidation === refValidation){
            btnSub.classList.remove('hidden');
        }else{
            btnSub.classList.add('hidden');
        }
    })

})
if(controleValidation === refValidation){
    btnSub.classList.remove('hidden');
}else{
    btnSub.classList.add('hidden');
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    let testVal = 0;

    for(let prop in controleValidation){
        if (controleValidation[prop] === refValidation[prop]){
            testVal++;
            
        }
    }
    console.log("nombre de validations : " + testVal);

    if(testVal === 4){
        console.log("Submited");
        resultat.innerText = ("OK!! formulaire accepté");
    }else{
        console.log("Error");
        resultat.innerText = ("Invalide!! formulaire refusé");
    }
})