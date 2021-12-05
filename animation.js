$(document).ready(function () {

    let i =2;
    //intro to scene 2
    $('#start').click(function () { 
        $('#scene-1').addClass('slide-up');
    });

    $('#reset').click(function(){
        i=2;
    })
     
    document.getElementById(`scene-${i}`).addEventListener('animationend', function () {
        $(`#scene-${i-1}`).hide();
        //$('.title').show();
        //$('.title').addClass('title-shrink');
    })

    $('.next').click(function(){
        $(`#scene-${i}`).addClass('slide-up');
        i++;
    })

    $('#submit').click(function(){
        $('#movies-left').hide();
    });

    const loading = [
        "hacking the mainframe", "traveling through hyperspace", "booby-trapping house", "checking if this is a dream", "saving princess for Lord Farquaad",
        "visiting Crema, Italy", "checking if Daniel Day Lewis has won another oscar", "fetching data from Pandora", "dancing in the rain",
        "vetting yet another Princess Diana biopic", "aquiring a symbiote", "writing another musical", "creating a Hans Zimmer score",
        "not mentioning F***t C**b", "traveling through a black hole", "looking for Brad Pitt", "looking for the colonial woman on the wing", "excluding Ryan Reynolds movies",
        "avoiding that powerline","living the same day over", "mapping out the multiverse", "checking for cameras"
        
    ];

    let max = loading.length;
    let elem = $('#loading');

    function randomize(){
        let rand = Math.floor(Math.random() * max);
        elem.fadeOut(function(){
            elem.text(`${loading[rand]}...`);
            elem.fadeIn();
        })
    }
    

    document.getElementById(`scene-4`).addEventListener('animationend', function(){
        setInterval(randomize, 3000)
        window.setTimeout(doneLoading, 10000);
    });

    function doneLoading(){
        $('#scene-5').addClass('slide-up');
    }

    document.getElementById('scene-5').addEventListener('animationend', function(){
        $('#scene-5').hide();
    })


});