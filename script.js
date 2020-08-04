const pokeDex = {};
// Collect user input
pokeDex.collectInfo = function() {
    return $('#nameOfPokemon').val().toLowerCase();
};
// Make AJAX request with user inputted data
pokeDex.getInfo = function(name) {
    const urlAddress = 'https://pokeapi.co/api/v2/pokemon/' + name;
    $.ajax({
        url: urlAddress, 
        method: 'GET',
        dataType: 'json'
    }).then(function(result) {
          // this is to empty out everytime user inputs data 
        $('.resultsSection').empty();  
        // Displays result and error message
        const pokemonOutput =
            `<div class="outputContainer">
                <div class="pokemonImage">
                    <img class ="pokeImg" src="${result.sprites.front_default}" alt="${result.name}">    
                </div>
                <div class="pokemonDescription">
                    <h2 class="outputName">${result.name}</h2>
                    <p class="description">${result.types[0].type.name}</p>
                </div>
                                
            </div>`;
        $('.resultsSection').append(pokemonOutput);
    }).fail((error) => {
        // if user input is incorrect then an error message will be shown
        $('.resultsSection').empty(); 
        const errorDisplay = 
            `<div class="displayError">
                <p class="errorMessage">Not a pokemon!</p>
            </div>`;

    $('.resultsSection').append(errorDisplay)   
    })

}

// catch errors in user's input
pokeDex.errorCatch = function(){
    // if user inputs any numerical value then error message is shown
    
    if (!/^[a-z]+$/.test(pokeDex.collectInfo())) {
        alert('error:please enter pokemon name!')
        // $('form').html(errorDisplay)
    }
    else {
    const pokemonName = pokeDex.collectInfo();
    pokeDex.getInfo(pokemonName);
    $('.resultsSection').show();
    $('.resetSection').show();
    $('.formSection').hide();
    }


}

//eventlistner
pokeDex.eventlisteners = function () {

    $('form').on('submit', function(){
        pokeDex.errorCatch(); 

    $('.resetSection').on('click', function(e) {
    $('#nameOfPokemon').val('');
    $('.formSection').show();
    $('.resultsSection').hide(); 
    $('.resetSection').hide();
    e.preventDefault();
        


    })
    })

}

        
// Start app
pokeDex.init = function () {
    pokeDex.eventlisteners();
}
// Document Ready
$(function() {
	pokeDex.init();
})