
 const overlay = document.querySelector('#overlay');
 const btnReset = overlay.querySelector('.btn__reset');
 const phrases = [
   'love is in the air',
   'cant find the sparkle',
   'ulibka',
   'hakuna matata'
 ];
 const divPhrase = document.getElementById('phrase');
 const ul = divPhrase.getElementsByTagName('ul')[0];
 const qwerty = document.getElementById('qwerty');
 const btns = qwerty.getElementsByTagName('button');
 let missed = 0;
 let hearts = document.querySelectorAll('.tries img');
 console.log(hearts);

 function randomPhrase(arr){
   let phrase = arr[Math.floor(Math.random() * arr.length)];
   let newPhrase = phrase.split('');
   console.log(newPhrase);
   return newPhrase;
 }

 function addPhraseToDisplay(bu){
   for(let i=0; i<bu.length; i++){
     let li = document.createElement('li');
     li.textContent = bu[i];
     ul.appendChild(li);
     if(li.textContent !== ' '){
       li.className = 'letter';
     } else{
       li.className = 'space';
     }
   }
 }
 function checkLetter(btn){
   let letterFound = null;
   const letter = document.querySelectorAll('.letter');
   for(let i=0; i<letter.length; i++){
     if(letter[i].textContent === btn.textContent){
       letter[i].classList.add('show');
       letterFound = true;
     }
   }
   return letterFound;
 }

 function checkWin(){
   const show = document.querySelectorAll('.show');
   const letter = document.querySelectorAll('.letter');
   if(show.length === letter.length){
     overlay.style.display = '';
     btnReset.textContent = 'U got it, dude.';
     overlay.className = 'win';
   } else if(missed === 5){
     overlay.style.display = '';
     btnReset.textContent = 'Sorry, dude, u lost.Try again';
     overlay.className = 'lose';
   }
 }

 btnReset.addEventListener('click',()=>{
   ul.textContent = '';
   overlay.style.display = 'none';
   for(let i=0; i<btns.length; i++){
     btns[i].removeAttribute('class');
     btns[i].removeAttribute('disabled');
   }
   for(let i=0; i<ul.children.length; i++){
     ul.children[i].removeAttribute('class');
   }
   missed = 0;
   addPhraseToDisplay(randomPhrase(phrases));
   for(let i=0; i<hearts.length; i++){
     hearts[i].src = 'images/liveHeart.png';
   }
 });

 qwerty.addEventListener('click', (e)=>{
   if(e.target.tagName === 'BUTTON'){
      e.target.className = 'chosen';
      e.target.setAttribute('disabled', true);
      let letterFound = checkLetter(e.target);
      if(letterFound === null){
        for(let i=0; i<hearts.length; i++){
               hearts[missed].src = 'images/lostHeart.png';
        }
        missed += 1;
      }
      checkWin();
   }
 });


