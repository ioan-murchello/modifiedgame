function testWebP(callback) {

    var webP = new Image();
    webP.onload = webP.onerror = function () {
    callback(webP.height == 2);
    };
    webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
    }
    
    testWebP(function (support) {
    
    if (support == true) {
    document.querySelector('body').classList.add('webp');
    }else{
    document.querySelector('body').classList.add('no-webp');
    }
    });

// game____________________________________

    let hasFlipped = false;
    let boardLock = false;
    let isEqual;
    let total_curency = 0;
    let total_curency_two = 0;
    let firstSumAttribure = 0, secondSumAttribute = 0;
    let first_card, second_card;
    
    let first_player_current_sum = 0;
    let second_player_current_sum = 0;
    let summer = 0;
    let playground_wrapper = document.querySelectorAll('.playground_wrapper');
    let inner_game_wrapper = document.querySelectorAll('.inner_game_wrapper');
    let playerss = document.querySelectorAll('.blocks_style');
    let cards_sum = document.querySelectorAll('.sum');
    let cardsss = document.querySelectorAll('.card_body');
    let game = document.querySelector('.main_menu');
    let game_wrapper = document.querySelector('.game_wrapper');
    let small_menu = document.querySelector('.small_menu');
    let restart = small_menu.querySelector('.restart');
    let go_to_menu = small_menu.querySelector('.go_to_menu');
    
    let first_curr = document.querySelector('.first_curr');
        first_curr.textContent = first_player_current_sum;
    
    let sec_curr = document.querySelector('.sec_curr');
        sec_curr.textContent = second_player_current_sum;
    
    let checkbox_input = document.querySelector('.inpt');
    let checked_unchecked = checkbox_input.checked;
      
    console.log(checked_unchecked)
    
    game_wrapper.append(game);
    
    let players = document.querySelector('.players');
    let sum_of_cards = document.querySelector('.game_cards');
    let start_btn = document.querySelector('.btn');
    
    let arr = ['airplane','airplane','baseball','baseball','education','education','fork','fork'];
    
     game.addEventListener('click', (event) => {
        let target = event.target;
    
        if(target.classList.contains('blocks_style')){
            firstSumAttribure = target.getAttribute('data-player');
            toggler('.blocks_style', 'for_btn', target)
        }
    
        if(target.classList.contains('sum')){
            secondSumAttribute = target.getAttribute('data-card');
            toggler('.sum', 'for_btn', target)
        }
    
        
     })
    
     start_btn.addEventListener('click', function(){
    
        start_btn.classList.add('for_btn');
    
        setTimeout(function(){
    
        if(firstSumAttribure == 1 && secondSumAttribute == 8){
    
            game.classList.add('opac');
    
            setTimeout(function(){ 
                game_wrapper.removeChild(game); 
                game.classList.remove('opac');
            }, 400)
            
            setTimeout(function(){
                game_wrapper.append(inner_game_wrapper[0]);
                inner_game_wrapper[0].classList.remove('hide');
                inner_game_wrapper[0].classList.add('show');
    
                start_btn.classList.remove('for_btn');
    
                }, 1000)
        }
    
        if(firstSumAttribure == 1 && secondSumAttribute == 16){
    
            game.classList.add('opac');
            setTimeout(function(){ 
                game_wrapper.removeChild(game); 
                game.classList.remove('opac');
            }, 400)
            
    
            inner_game_wrapper[1].querySelectorAll('.card_body').forEach(el => {
                el.classList.add('dwa');
            });
    
            
    
            setTimeout(function(){
                game_wrapper.append(inner_game_wrapper[1]);
                inner_game_wrapper[1].classList.remove('hide');
                inner_game_wrapper[1].classList.add('show');
    
                start_btn.classList.remove('for_btn');
    
                }, 1000)    
        }
    
        if(game.classList.contains('hide')){
            console.log('okkk')
            playerss.forEach(el => {
                el.classList.remove('for_btn');
            })
            cards_sum.forEach(el => {
                el.classList.remove('for_btn');
            }) ;
        }
    
        gameStart();
    
        },500)
    })
    
        function toggler(el, cl, tar){
            document.querySelectorAll(el).forEach(el => {
                if(el.classList.contains(cl)){
                    el.classList.remove(cl) 
                }else{
                    tar.classList.add(cl)
                }
            })
        }
    // --------------------------------------------------------------------
    
        function flipCard(e){
    
        if(boardLock) return;
    
        let target = e.target.parentElement;
            target.classList.add('flip')
     
        // false double click at one card
        if(target === first_card) return
    
        if(!hasFlipped){
            //first click
            hasFlipped = true;
            first_card = target;
        
        }
        else{
            //second cclick
            hasFlipped = false;
            second_card = target;
            //checkForMath two cards
            checkForMatch()
        }
    }
    
    function checkForMatch(){
        isEqual = first_card.getAttribute('data-card') === second_card.getAttribute('data-card');
        
        if(isEqual){
    
            total_curency++;
            total_curency_two++;
            summer = 0;
    
             }else{
    
            
            flippedCards();
    
        }
        
     
        if(firstSumAttribure == 1 && secondSumAttribute == 8 && total_curency == 4){
            setTimeout(() => {
                game_wrapper.append(small_menu);
                small_menu.classList.add('opacityout','show');
                small_menu.classList.remove('hide');
            }, 1000)
            
        }
    
        if(firstSumAttribure == 1 && secondSumAttribute == 16 && total_curency_two == 8){
            setTimeout(() => {
                game_wrapper.append(small_menu);
                small_menu.classList.add('opacityout','show');
                small_menu.classList.remove('hide');
            }, 1000)
            
        }
            
    }
    
    
    function disableCards(){
            first_card.removeEventListener('click', flipCard);
            second_card.removeEventListener('click', flipCard);
    }
    
    function flippedCards(){
        boardLock = true;
        setTimeout(() => {
            first_card.classList.remove('flip');
            second_card.classList.remove('flip');
    
        resetBoard()
    
        }, 1500)
    }
    
    function resetBoard(){
        //to havy
        // [hasFlipped, boardLock] = [false, false];
        // [first_card, second_card] = [null, null];
        // присвоіли фолс boardLock і скопіювали значення в hasFlipped;
        //better
        hasFlipped = boardLock = false;
        first_card = second_card = null;
        sec_curr.classList.add('cur_sum')
        
    }
    
    function gameStart(){
        let cards = document.querySelectorAll('.card_body');
        cards.forEach(card => {
            card.addEventListener('click', flipCard)
        
        let randomIndex = Math.floor(Math.random() * cards.length);
        card.style.order = randomIndex;
        })
    }
     
    
    function removeFlipClass(firstcl, cl){
    
            if(firstcl.length > 1){
                firstcl.forEach(el => {
                    el.classList.remove(cl);
                    el.removeEventListener('click', flipCard);
                })
            }
            else{
                firstcl.classList.remove(cl);
            }
            
    }
    
    function restarter(){
    
        if(total_curency == 4){
            removeFlipClass(cardsss, 'flip');
            small_menu.classList.remove('show');
            small_menu.classList.add('hide');
            total_curency = 0;
            total_curency_two = 0;
           
        }
    
        if(total_curency_two == 8){
            removeFlipClass(cardsss, 'flip');
            small_menu.classList.remove('show');
            small_menu.classList.add('hide');
            total_curency = 0;
            total_curency_two = 0;
            first_player_current_sum = 0;
            second_player_current_sum = 0;
            first_curr.textContent = first_player_current_sum = 0;
        }
       
        hasFlipped = boardLock = false;
        first_card = second_card = null;
        
        hasFlipped = false;
        boardLock = false;
        isEqual = null;
        
        setTimeout(()=>{ gameStart(); }, 300)
        
    }
    
    
    restart.addEventListener('click', () => {
        
        small_menu.classList.add('show');
    
        restarter();
        
    
    })
    
    go_to_menu.addEventListener('click', function(){
    
        hasFlipped = boardLock = false;
        first_card = second_card = null;
        
        hasFlipped = false;
        boardLock = false;
        isEqual = null;
    
        small_menu.classList.remove('show');
        small_menu.classList.add('hide');
    
            inner_game_wrapper.forEach(el => {
                el.classList.remove('show');
                el.classList.add('hide');
        })
    
        game_wrapper.append(game)
        game.classList.add('opacityout','show');
        game.classList.remove('opacity','hide');
    
        setTimeout(()=>{  game.classList.remove('opacity','opacityout') }, 300)
    
        restarter();
        
    })
     