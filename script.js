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
          const displayName = $('.outputName').html(result.name);
          const displayImg = $('.pokeImg').attr('src', result.sprites.front_default);
      })
}

pokeDex.errorCatch = function(){
    
    if (!/^[a-z]+$/.test($('input').val())){
        // alert('error:please enter pokemon name!')
        $('form').html(errorDisplay)
    }
    else {
    const pokemonName = pokeDex.collectInfo();
    $('#nameOfPokemon').val('');
    console.log(pokemonName);
    pokeDex.getInfo(pokemonName);
    $('.resultsSection').show();
    $('.formSection').hide();
    }


}


pokeDex.eventlisteners = function () {

        $('form').on('submit', function(){
          pokeDex.errorCatch(); 

        $('.resetButton').on('click', function(e) {
            $('.formSection').show();
            $('.resultsSection').hide(); 
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