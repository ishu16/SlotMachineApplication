$(document).ready(function() {
    //Global variables
    var inputName;
    var AmountofCredits = 10;
    var creditAmountBetted = 0;
    var numberOfTimesUserAddedCoins = 0;
    var completed = 0,
        imgHeight = 2748,
        posArr = [
            0, //Bell - 6
            160, //Number7 - 7 
            330, //Watermelon - 5
            474, //Lemon - 3
            620, //Plum - 4
            756, //Cherry - 2
            908, //Bell - 6
            1078, //Number7 - 7
            1248, //Watermelon - 5
            1392, //Lemon - 3
            1538, //Plum - 4
            1674, //Cherry - 2
            1826, //Bell - 6
            2000, //Number7 - 7
            2170, //Watermelon - 5
            2314, //Lemon - 3
            2460, //Plum - 4
            2596 //Cherry - 2
        ];
    
    var win = [];
    win[0] = win[908] = win[1826] = 6;
    win[160] = win[1078] = win[2000] = 2;
    win[330] = win[1248] = win[2170] = 4;
    win[474] = win[1392] = win[2314] = 3;
    win[620] = win[1538] = win[2460] = 5;
    win[756] = win[1674] = win[2596] = 7;

    //Class of the Slot
    class Slot {
        constructor(domElementPassedFromTheHTML, max, accelerationOfTheReels) {
            this.speedOfTheReels = 0; //speedOfTheReels of the slot at any point of time
            this.accelerationOfTheReels = accelerationOfTheReels; //speedOfTheReels will increase at this rate
            this.setIntervalTimeForEachSlot = null; //holds setInterval object for the given slot
            this.domElementPassedFromTheHTML = domElementPassedFromTheHTML; //dom element of the slot
            this.maxSpeed = max; //max speedOfTheReels this slot can have
            this.pos = null; //final position of the slot  
            this.whetherStarted = false;
            $(domElementPassedFromTheHTML).pan({
                fps: 30,
                dir: 'down'
            });
            $(domElementPassedFromTheHTML).spStop();
        }
        /**
            * @method start
            * Starts a slot
            */
        start() {
            $('#result').html('');
            var _this = this;
            $(_this.domElementPassedFromTheHTML).addClass('motion');
            $(_this.domElementPassedFromTheHTML).spStart();
            _this.whetherStarted = true;
            _this.setIntervalTimeForEachSlot = window.setInterval(function () {
                if (_this.speedOfTheReels < _this.maxSpeed) {
                    _this.speedOfTheReels += _this.accelerationOfTheReels;
                    $(_this.domElementPassedFromTheHTML).spSpeed(_this.speedOfTheReels);
                }
            }, 100);
        }
        /**
            * @method stop
            * Stops a slot
            */
        stop() {
            var _this = this, limit = 30;
            clearInterval(_this.setIntervalTimeForEachSlot);
            _this.whetherStarted = false;
            _this.setIntervalTimeForEachSlot = window.setInterval(function () {
                if (_this.speedOfTheReels > limit) {
                    _this.speedOfTheReels -= _this.accelerationOfTheReels;
                    $(_this.domElementPassedFromTheHTML).spSpeed(_this.speedOfTheReels);
                }
                if (_this.speedOfTheReels <= limit) {
                    _this.finalPos(_this.domElementPassedFromTheHTML);
                    $(_this.domElementPassedFromTheHTML).spSpeed(0);
                    $(_this.domElementPassedFromTheHTML).spStop();
                    clearInterval(_this.setIntervalTimeForEachSlot);
                    $(_this.domElementPassedFromTheHTML).removeClass('motion');
                    _this.speedOfTheReels = 0;
                }
            }, 100);
        }
        /**
            * @method finalPos
            * Finds the final position of the slot
            */
        finalPos() {
            var domElementPassedFromTheHTML = this.domElementPassedFromTheHTML, el_id, pos, posMin = 2000000000, best, bgPos, i, j, k;
            el_id = $(domElementPassedFromTheHTML).attr('id');
            pos = document.getElementById(el_id).style.backgroundPosition;
            pos = pos.split(' ')[1];
            pos = parseInt(pos, 10);
            for (i = 0; i < posArr.length; i++) {
                for (j = 0; ; j++) {
                    k = posArr[i] + (imgHeight * j);
                    if (k > pos) {
                        if ((k - pos) < posMin) {
                            posMin = k - pos;
                            best = k;
                            this.pos = posArr[i];
                        }
                        break;
                    }
                }
            }
            best += imgHeight + 4;
            bgPos = "0 " + best + "px";
            $(domElementPassedFromTheHTML).animate({
                backgroundPosition: "(" + bgPos + ")"
            }, {
                    duration: 200,
                    complete: function () {
                        completed++;
                    }
                });
        }
        /**
            * @method reset
            * Reset a slot to initial state
            */
        reset() {
            var el_id = $(this.domElementPassedFromTheHTML).attr('id');
            $._spritely.instances[el_id].t = 0;
            $(this.domElementPassedFromTheHTML).css('background-position', '0px 4px');
            this.speedOfTheReels = 0;
            completed = 0;
            $('#result').html('');

        }
    }



    

    function enableControl() {
        $('#control').attr("disabled", false);
    }

    function disableControl() {
        $('#control').attr("disabled", true);
    }

    function printResult() {
        var res;
        if((win[a.pos] === win[b.pos] && win[a.pos] === win[c.pos]) || (win[a.pos] === win[b.pos] || win[a.pos] === win[c.pos] || win[b.pos] === win[c.pos])) {
            res = "You Win!";
            if ((win[a.pos] === win[b.pos] && win[a.pos] === win[c.pos]) || (win[a.pos] === win[b.pos] || win[a.pos] === win[c.pos])){
                valueWon = win[a.pos];
                alert("Won : "+valueWon+". "+" Multiplier : "+creditAmountBetted+"."+'\n'+'\n'+" Total : "+(valueWon*creditAmountBetted));
                AmountofCredits += (valueWon*creditAmountBetted);
            }else if (win[b.pos] === win[c.pos]) {
                valueWon = win[b.pos];
                alert("Won : "+valueWon+". "+" Multiplier : "+creditAmountBetted+"."+'\n'+'\n'+" Total : "+(valueWon*creditAmountBetted));
                AmountofCredits += (valueWon*creditAmountBetted);
            }else{
                Error("Error in the logic.");
            }
            creditAmountBetted = 0;
            DisplaysLabels();
        } else {
            res = "You Lose";
            creditAmountBetted = 0;
            DisplaysLabels();
        }
        $('#result').html(res);
    }


    //Pre program Displays
    function DisplaysLabels () {
        $('#betAmount-label').html('Amount of Credits : '+AmountofCredits);
        $('#creditAmount-label').html('Amount betted : '+creditAmountBetted);
    }

    DisplaysLabels();

    //create slot objects
    var a = new Slot('#slot1', 30, 1),
        b = new Slot('#slot2', 45, 2),
        c = new Slot('#slot3', 70, 3);

    /**
    * Event handlers for the Buttons in the DOM model
    */

    //Start Button 
    $('#control').click(function() {
        var x;
        if (creditAmountBetted > 0){
            if(!(a.whetherStarted)) {
                a.start();
                b.start();
                c.start();
                
                disableControl(); 
                
                x = window.setInterval(function() {
                    if(a.speedOfTheReels >= a.maxSpeed && b.speedOfTheReels >= b.maxSpeed && c.speedOfTheReels >= c.maxSpeed) {
                        enableControl();
                        window.clearInterval(x);
                    }
                }, 100);
            }else{
                alert("The Spinner is already spinning.");
            }
        }else{
            alert("Please bet some credits first.");
        }
    });
    
    //Image click Function
    $('.slot').click(function() {
        if (a.whetherStarted){
            a.stop();
            b.stop();
            c.stop();

            disableControl();
            
            x = window.setInterval(function() {
                if(a.speedOfTheReels === 0 && b.speedOfTheReels === 0 && c.speedOfTheReels === 0 ) {
                    enableControl();
                    window.clearInterval(x);
                    printResult();
                }
            }, 100);
        }else{
            alert("Spin the Spinner first.");
        }
    });

    //Bet One Button
    $('#betone').click(function() {
        if (AmountofCredits > 0){
            if (creditAmountBetted < 3){
                creditAmountBetted += 1;
                AmountofCredits -= 1;
                DisplaysLabels();
            }else{
                alert("You can't bet more than 3 credits.");
            }
        }else{
            alert("Please add more coins to the Slot Machine");
        }
    });

    //Bet Max Button
    $('#betmax').click(function() {
        if (AmountofCredits > 0){
            if (creditAmountBetted < 3){
                creditAmountBetted += 3;
                AmountofCredits -= 3;
                DisplaysLabels();
            }else{
                alert("You can't bet more than 3 credits.");
            }
        }else{
            alert("Please add more coins to the Slot Machine");
        }
    });

    //Reset
    $('#reset').click(function() {
        //Firebase connectivity 
        var database;
        var config = {
            apiKey: "AIzaSyCgxC3ic2VnD7B0MED1VsQbURZ6IGyRl4s",
            authDomain: "slotmachine-43ef6.firebaseapp.com",
            databaseURL: "https://slotmachine-43ef6.firebaseio.com",
            projectId: "slotmachine-43ef6",
            storageBucket: "",
            messagingSenderId: "1047371090574"
        };
        firebase.initializeApp(config);
        database = firebase.database();
          
        inputName = prompt('enter your name');
        //JSON format 
        var data = {
            name: inputName,
            score: AmountofCredits
        }
        console.log(data);
        var ref = database.ref('scores');
        ref.push(data);

        alert("Input Name : "+inputName+"\n"+"Score : "+AmountofCredits+"\n"+"Sent to Firebase.");
        creditAmountBetted = 0;
        AmountofCredits = 10;
        DisplaysLabels();

        a.reset();
        b.reset();
        c.reset();
    });

    //Add Coin Button
    $('#add-coin').click(function() {
        if (AmountofCredits < 50){
            numberOfTimesUserAddedCoins += 1;
            AmountofCredits += 5;
            DisplaysLabels();
        }else{
            alert("You have adequate credits to play, please finish the current credits to add more.")
        }
    });

    $('#stats').click(function() {
        window.location = "stats.html"
    });
});
