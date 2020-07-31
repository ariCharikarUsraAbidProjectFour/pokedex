const pokeDex = {};
// Collect user input
pokeDex.collectInfo = function() {
   return $('#nameOfPokemon').val();
};
// Make AJAX request with user inputted data
pokeDex.getInfo = function(name) {
    const urlAddress = 'https://pokeapi.co/api/v2/pokemon/' + name;
    $.ajax({
        url: urlAddress, 
        method: 'GET',
        dataType: 'json'
      }).then(function(result) {
        console.log(result);
      })
}
// Display data on the page
pokeDex.displayInfo = function() {};
pokeDex.eventlisteners = function () {
    const errorMessage = function() {
        if (pokeDex.collectInfo() !== pokeDex.getInfo()) {
         alert ('wrong');
        }
        else if (pokeDex.collectInfo() === parseInt($('#nameOfPokemon').val())) {
            alert('You dont write pokemon with numbers!');
        }
        else {
            pokeDex.getInfo();
        }
    }
    const formDisplay = $('form').on('submit', function(){
        errorMessage();
        $('.resultsSection').show();
        $('.formSection').hide();
    })
        // console.log($(this));
    // jquery element of this
        const pokemonName = pokeDex.collectInfo();
        console.log(pokemonName);
        pokeDex.getInfo(pokemonName);
        pokeDex.errorHandling();
        $('.resetButton').on('click', function(e) {
            $('.formSection').show();
            $('.resultsSection').hide(); 
            e.preventDefault();
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