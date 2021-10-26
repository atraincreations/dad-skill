// necessary variables for logging xp
var level = 1;
var levelMaxXP = 0;
var xpBarStart = 0;
var xpAmount = xpBarStart;
var xpLevelPercent = 0;

$(document).ready(function(){
    //console.log("load");
    $("#inner-progress").width(xpBarStart + '%');
    createLevelTotal();
    levelCapMath();
})

// create level xp total using equation (level/x)^y
// x = 0.07 and y = 2
function createLevelTotal(){
    console.log("You are level: " + level);
    var x = 0.07;
    var y = 2;
    levelMaxXP = Math.round(Math.pow((level/x), y));
    console.log("XP needed to level: " + levelMaxXP);
}

// ensure that the xp translates appropriately as points and an overall percentage
// and doesn't break outside the xp bar
function levelCapMath(){
    // call level xp total and math the earned xp
    xpLevelPercent = Math.round((xpAmount/levelMaxXP)*100);
    console.log("Level percentage complete: " + xpLevelPercent)
}

function animateLevelUp() {
    $('.run-animation').css('animation', 'pulse 1.5s');
}


// function for button press recognition and altering xp
$(document).on("click", "#choice-one-btn", function(){
    console.log("have some xp!");
    var earnedXP = Math.floor((Math.random() * (level * 10)) + 1);
    console.log("You earned " + earnedXP + " xp!")
    xpAmount = xpAmount + earnedXP;
    $('.xp-bar-text').text(xpAmount + "/" + levelMaxXP);
    levelCapMath();
    if (xpAmount < levelMaxXP){
        $("#inner-progress").width(xpLevelPercent + '%');
    } else {
        animateLevelUp();
        $('#inner-progress').removeClass('.run-animation');
        xpAmount = 0;
        level++;
        createLevelTotal();
        levelCapMath();
        $('.xp-bar-text').text(xpAmount + "/" + levelMaxXP);
        $("#inner-progress").width(xpLevelPercent + '%');
    }
    
})