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
          // this is to empty out ever
          $('.resultsSection').empty();  
          console.log(result);
          const pokemonOutput =
          `<div class="outputContainer">
                    <div class="pokemonImage">
                        <img class ="pokeImg" src="${result.sprites.front_default}" alt="${result.name}">    
                    </div>
                        <div class="pokemonDescription">
                            <h2 class="outputName">${result.name}</h2>
                            <p class="description"></p>
                        </div>
                            
            </div>`
                $('.resultsSection').append(pokemonOutput)
                console.log(pokemonOutput)
      }).fail((error) => {
         $('.resultsSection').empty(); 
                 const errorDisplay = 
                `<div class="displayError">
                <p class="errorMessage">Not a pokemon!</p>
                </div>`

    $('.resultsSection').append(errorDisplay)
      
    })


    }

pokeDex.errorCatch = function(){
    
    if (!/^[a-z]+$/.test($('input').val())){
        alert('error:please enter pokemon name lower case!')
        // $('form').html(errorDisplay)
    }
    else {
    const pokemonName = pokeDex.collectInfo();
    $('#nameOfPokemon').val('');
    // console.log(pokemonName);
    pokeDex.getInfo(pokemonName);
    $('.resultsSection').show();
    $('.resetSection').show();
    $('.formSection').hide();
    }


}


pokeDex.eventlisteners = function () {
        
        $('form').on('submit', function(e){
            // e.preventDefault();
            pokeDex.errorCatch();

        $('.resetSection').on('click',function(e) {
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