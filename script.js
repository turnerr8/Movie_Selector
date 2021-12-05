$(document).ready(function () {

    //variables

    //const variables
    const key = "76da26dba7783c14fb292c53e3947f3e";
    const region="US";
    const watchRegion = 'US';
    const picPath = 'https://image.tmdb.org/t/p/original';

    //INPUT VARIABLES
    

    //object with genre codes
    const genres ={
        action:'28',
        adventure: '12',
        animation: '16',
        comedy: '35',
        crime : '80',
        documentary: '99',
        drama: '18',
        family: '10751',
        fantasy: '14',
        history: '36',
        horror: '27',
        music: '10402',
        mystery: '9648',
        romance: '10749',
        sciFi: '878',
        thriller: '53',
        war: '10752',
        western: '37'
    }

    //providers codes
    const providers = {
        netflix: '8',
        amazon: '9',
        disney: '337',
        hulu: '15',
        mubi: '11',
        paramount: '531',
        hbo: '384',
        peacock: '386',
        peacockPrem: '387',
        apple: '350',
        showtime: '37',
    }

    //genre toggles for creating key
    const genreToggle = {
        action: false,
        adventure: false,
        animation: false,
        comedy: false,
        crime : false,
        documentary: false,
        drama: false,
        family: false,
        fantasy: false,
        history: false,
        horror: false,
        music: false,
        mystery: false,
        romance: false,
        sciFi: false,
        thriller: false,
        war: false,
        western: false
    }

    //provider toggle for creating key
    const providersToggle = {
        netflix: false,
        amazon: false,
        disney: false,
        hulu: false,
        mubi: false,
        paramount: false,
        hbo: false,
        peacock: false,
        peacockPrem: false,
        apple: false,
        showtime: false,
    }


    //mutable request variables
    let beforeDate = '';
    let afterDate = '';
    let origRequest = 'https://api.themoviedb.org/3/discover/movie?api_key=76da26dba7783c14fb292c53e3947f3e&language=en-US&region=US&sort_by=popularity.desc&page=1';
    let andButton = true;
 
    
    //page creation

    //creates all genre buttons
    function createGenre(){
        let genHtml='';
        for(el in genreToggle){
            genHtml+=`<button class="genre-option buttons">${el}</button>`
        }
        $('#genre-choices').append(genHtml);
    }
    createGenre();

    $('.genre-option').click(function (e) { 
        let element = $(this);
        let genre = element.text();
        genreToggle[genre]=!genreToggle[genre];
        if(genreToggle[genre]==true){
            element.addClass('genre-active');
        } else {
            element.removeClass('genre-active');
        }
        getMovieNum();
        console.log(genreToggle)
    });

    //toggle between and / or for genres
    $('#and-or').click(function(e){
        if(andButton==true){
            andButton=!andButton;
            //$(this).removeClass('unflip');
            $(this).addClass('flip');
            $('.or').removeClass('faded');
            $('.and').addClass('faded');
            
        } else {
            andButton=!andButton;
            $(this).removeClass('flip');
            //$(this).addClass('unflip');
            $('.and').removeClass('faded');
            $('.or').addClass('faded');
            
            
        }
        getMovieNum();
        console.log(andButton)

    });

    //scene 2
    function createProvider(){
        let provHtml='';
        for(el in providersToggle){
            provHtml+=`<button class="provider-option buttons">${el}</button>`
        }
        $('#provider-choices').html(provHtml);
    }
    createProvider();
    
    $('.provider-option').click(function(e){
        let element = $(this);
        let provider = element.text();
        providersToggle[provider]=!providersToggle[provider];
        if(providersToggle[provider]==true){
            element.addClass('provider-active');
        } else {
            element.removeClass('provider-active');
        }
        console.log(providersToggle);
        getMovieNum();
    })

    //returns string to add to request of movies before this date
    function beforeYear(bef){
       if(bef==''){
           return'';
       } else {
           return `&release_date.lte=${bef}-01-01`;
       }
    }

    //return string to add to request of movies after this date
    function afterYear(aft){
        if(aft==''){
            return'';
        } else {
            return `&release_date.gte=${aft}-01-01`;
        }
    }

    //return string that includes codes of selected genres separated by | for or otherwise , for and
    function getGenre(){
        let text = '';
        let x = ''
        if(andButton==true){
            x=','
        } else {
            x='|'
        }

        //if no genre selected return blank
        let numTrue=0;
        for(element in genreToggle){
            if(genreToggle[element]==true){
                numTrue++;
            }
        }
        if(numTrue==0){
            return'';
        } else{
            text+='&with_genres='
            for(element in genreToggle){
                if(genreToggle[element]==true){
                    text+=`${genres[element]}${x}`
                }
            }
            return text;
        }        
    }

     //return string including codes of selected providers
     function getProviders(){
        let text = '';
        let numTrue = 0;

        for(el in providersToggle){
            if(providersToggle[el]==true){
                numTrue++;
            }
        }

        if(numTrue==0){
            return '';
        } else {
            text+='&with_watch_providers=';
            for(el in providersToggle){
                if(providersToggle[el]==true){
                    
                    text+=`${providers[el]}|`;
                }
            }
            text+=`&watch_region=${watchRegion}`;
            return text;
        }

    }

    function getRandom(numOfPages){
        return Math.floor(Math.random()*numOfPages);
    }

    function movieCounter(toNumber){
        const element = $('#movie-number');
        const space = 70;
        let count = +$('#movie-number').text();
        const inc = Math.ceil(toNumber/space);
        console.log(toNumber);
        console.log(count);
        

        if(count<toNumber){
            count = count+inc
            element.text(count);
            setTimeout(movieCounter(toNumber), 3);

        }else if(count>toNumber){
            count = count-inc;
            $('#movie-number').text(count);
            setTimeout(movieCounter(toNumber), 3);
        } else if(count>toNumber-40 && count<toNumber+40){
            element.text(toNumber);
        }
    }

    //updates movie number after every selection of genre or provider

    function getMovieNum(){
        let movieNum;
        let html = '';
        html += getGenre();
        html += getProviders();
        let finalRequest = origRequest+html;
        console.log(finalRequest)
        $.ajax({
            url: finalRequest,
            async: false,
            dataType: 'json',
            success: function(data) {
                movieNum = +data.total_results
            }
        });
        console.log(typeof movieNum)

        //movieCounter(movieNum);
        $('#movie-number').text(movieNum)
    }


    //generate random movie from path
    function generate(path, pages){

        pages = parseInt(pages);
        let randomPage = getRandom(pages)+1;
        path+=`&page=${randomPage}`;
        //console.log(finalRequest)


        //get random movie from list of movies
        let movieList;
        $.ajax({
            url: path,
            async: false,
            dataType: 'json',
            success: function(data){
                movieList= data;
            }
        })
        let movieArray = movieList.results;
        let movieFinal = movieArray[getRandom(movieArray.length)];
        return movieFinal;
    }

//takes movie and movie # as params then adds the info to the html page
    function posterCreation(movie, i){
        $(`#movie-${i}-title`).text(movie.title);
        $(`#movie-${i}-image`).attr('src', `${picPath}${movie.poster_path}`);
        $(`#movie-${i}-image`).click(function(){
            window.open(`https://www.google.com/search?q=${movie.title} movie`, '_blank').focus();
        })
        
        $(`#movie-${i}-info`).text(movie.overview);
    }


    //final submission
    $('#submit').click(function(){
        beforeDate=document.getElementById("year-lte").value;
        afterDate=document.getElementById("year-gte").value;

        let finalRequest = origRequest;
        finalRequest+=getGenre();
        finalRequest+=beforeYear(beforeDate);
        finalRequest+=afterYear(afterDate);
        finalRequest+=getProviders();

        //get pages for randomization
        let pages = '';
        $.ajax({
            url: finalRequest,
            async: false,
            dataType: 'json',
            success: function(data) {
                console.log(data);
                pages=data.total_pages;
            }
        });

        console.log(finalRequest);

        let movie1 = generate(finalRequest, pages);
        let movie2 = generate(finalRequest, pages);

        posterCreation(movie1, 1);
        posterCreation(movie2, 2);
    });

    $('#reset').click(function(){
        location.reload();
            
        
    })


});