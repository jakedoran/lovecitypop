var queue = {
    songs: [
        ["WknKmJMnrXw", "Anri - Remember Summer Days"],
        ["3c82wuWlZOY", "鈴木雅之「Misty Mauve」Live at Club Martini.rv"],
        ["cUwFxBNTiQI", "Keiko Kimura - 電話しないで"],
        ["rf1AyqA6PjY", "JUNKO YAGAMI (八神 純子) - Communication"],
        ["yKKOj1ywtL4", "Yumi Matsutoya - 影になって (We're All Free)"],
        ["n0nMHnCBU-U", "Anri - Windy Summer"],
        ["lF2Vn844K3o", "Toshiki Kadomatsu - I Must Change My Life"],
        ["ZhK2Jmq73qc", "UKO - Signal"],
        ["OSuL_d2o10I", "Anri - Good Bye"],
        ["iDVyV7lAsTc", "Makoto Matsushita - First Light"],
        ["t2wjCX81CHM", "Tatsuro Yamashita - For You"],
    ]
} 
var currentlyPlayingIndex = 0;

// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
      height: '50%',
      width: '100%',
      videoId: 'WknKmJMnrXw',
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
      }
    });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
    event.target.playVideo(); // page has loaded, autoplay 
}

// 5. The API calls this function when the player's state changes.
function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.ENDED) {
        // video has ended, go to next one
        forwardInQueue();
    }
}

function loadVideo(id, name){
    player.cueVideoById(id);
    player.playVideo();

    // new song playing, change now playing title
    $('#title').html(name);
    
    // also figure out the next song
    var upNextIndex = currentlyPlayingIndex +1;
    if(currentlyPlayingIndex >= queue.songs.length){
        currentlyPlayingIndex = 0; // if its the last, next will be the first
    }
    $('#upNext').html(queue.songs[upNextIndex][1]); // change up next label
}

function forwardInQueue(){
    currentlyPlayingIndex++;

    if(currentlyPlayingIndex >= queue.songs.length){
        currentlyPlayingIndex = 0; // go back to start
    }

    var id = queue.songs[currentlyPlayingIndex][0];
    var name = queue.songs[currentlyPlayingIndex][1];
    loadVideo(id, name);
}

function backInQueue(){
    if(currentlyPlayingIndex <= 0){
        currentlyPlayingIndex = queue.songs.length; // go to end
    }

    currentlyPlayingIndex--;
    var id = queue.songs[currentlyPlayingIndex][0];
    var name = queue.songs[currentlyPlayingIndex][1];
    loadVideo(id, name);
}




// Playback
$('#play').on('click', function () {
    player.playVideo();
});

$('#pause').on('click', function () {
    player.pauseVideo();
});


// Forward + backward controls
$('#next').on('click', function () {
    forwardInQueue();
});

$('#prev').on('click', function () {
    backInQueue();
});



/*


                                           ,╓╖╗╗╗╣╣▄╦,                          
                                  ,╓╦╗╬╣╬▓▓▓▓▓▓▓▓▓▓█▓▓▌⌐                        
                                ╣▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓█████▓▓µ                       
                                ▀█████▓▓▓▓▓▓▓▓▓▓▓██████▓▓▄                      
                                 ▀███████████▓▓▓▓█████████▓µ                    
                                  ╙██████████████▓▓▓▓▓▓▓▓▓▓▓⌐                   
                                    ▓████████████████▓▓▓▓▓▓▓▌                   
                                     ╙█████████████████▓▓▓▓▓▓▒                  
                                       ▐██████████████▓▓▓▓▓▓▓▓µ                 
                                        ╫███████████▓▓▓▓▓▓▓▓▓▓▓⌐                
                                        ╫███████████▓▓▓▓▓▓▓▓▓▓█▓⌐               
                                       ▄████████████▓▓▓▓▓▓▓▓▓███▓               
                                     ╓▓▓█████████████████▓▓▓▓▓███▓              
                             ,,╗▄▓▓▓▓█▓███████████████████▓▓▓▓▓▓▓█▓⌐            
                       ,╓╓╦╬▓▓▓▓█████████▀╠████████▓▓▓██████▓▓▓▓▓▓█▓            
                  ╓╦╣▓▓▓▓▓▓▓▓▓▓███████▀`  ╫█████▓▓▓▓▓▓▓█▓▓████▓▓▓▓▓█▄,,╓▄       
              ╥╬▓▓▓▓▓▓▓▓▓▓██████▓▀▀▀      ▓████▓▓▓▓▓▓▓▓█████▓▓█▓▓▓▓▓▓▓▓▀        
          ,╗╣▓▓▓▓▓████████▀▀╙            ]█████▓▓▓▓▓▓▓▓█████▓▓▓▓▓▓▓██╨          
  ╦▄▄▄▓▓▓▓▓▓███▀▀▀▀▀▀╙                   ║████▓▓▓▓▓▓▓███████▓▓▓▓▓███▓           
  ╙╙▀▀████████▀                          ║███████▓▓▓████████▓▓▓█████▌           
      ╙╙`╙▀▀                             '██████████████████████▓▓▓█Ö           
                                          ╠█████████████████████▓▓▓▓▌⌐          
                                         ,▓██████████████████████▓▓▓▓▓ç         
                                        ╓▓███████████████████████▓▓▓▓▓▓▓╦       
                                       ╬██████████████████████████▓▓▓▓▓▓▓µ      
                                      ╫███████████████████████████▓▓▓▓▓▓█▓▄     
                                     ▓████████████████████████████▓▓▓▓▓▓▓██µ    
                                    ▓███████████████▀▀▀▓███████████▓▓▓▓▓▓▓█▌    
                                   ╫█████████████▀▄▓███████████████▓▓▓▓▓▓▓▓█∩   
                                 ▄▓██████████▀▐▄████████████████████▓▓▓▓▓▓▓█▄   
                               ,▓███████▀▀    ╫██████▓██▓▓▀▀▀▀▀▀▀▀▓█▓▓▓▓▓███▌   
                               ╣██████▒               ▓▓          "▓█▓▓▓▓███▀   
                              ╓▓▓▓█████╕              ▓▓           `▓█▓▓▓███∩   
                               ▓█▓▓▓████▄             ▓▌            └▓▓▓▓███    
                                ▀██▓▓▓████Q          ▐▓▌            ╓▓▓▓▓██▌    
                                 `▀▓███████▄         ╠╬▌           ║▓▓▓▓▓▓█∩    
                                    ╙▀██▓███▓╕     ╓╬▓▌╬╬⌐        ╔▓▓▓▓▓▓▓█∩    
                                       ╙▀▓████▌▄▄▄▄▓▓█▄╬╬▄,      ,▓▓▓▓▓▓███∩    
                                          ▐▓███████████▒▓███▓▄,  ╬█▓▓▓▓▓██▌     
                                        ╓▄█████████████▒▓███████▄▓▓▓▓▓▓███∩     
                                      ╗▓█████████████▌╠╬▓█████████▓▓▓▓▓██▓      
                                    ╓▓█████████▄▓██▓█▒╫╬▓▌█Ü▀████▓▓▓▓▓███∩      
                                   ▄█████████████▓▓██Ö╠╬▓█▀  .▓██▓▓▓▓███▌       
                                 .▓████▓█╨  ╙██▌ ╠▓█▓ ╠╬█▓   ╫▓▓█▓▓▓▓███∩       
                                ╓▓███▓█▓▓,   ╙██µ╠▓▓█⌐▌╬█∩  ╬█▀▓▓▓▓▓████        
                               ╓▓███▓██▄▒▀▄    ██╠╬▓▓⌐▌╫▌  ▄█╨╓█▓▓▓▓████▌       
                               ▓███▓█▀ ╙▀▓▄▓▄   ▓▓╬╫█µ╬▌  ▄▌  ╠█▓▓▓██████∩      
                              ║████▓▌     ╙▓█▓⌐ ²█▓▓█▄╬▓╦▓▌  ╓▓▓▓▓▓██████▌      
                              ████▓█▀▄▄,     ▀█▄ ╠████╬▓█▌ ╓▓▓▓▓▓▓██▀█████      
                             ╓████▓█▓▄▄▓▓▓▄▄   ╙█▓▓█▓█╬▓▓▄▓╨ ╓▓▓▓██▓▓█████      
                             ╠███▓█▒    ╙╙▀▀▓▓▓▄▓▓████╬▓█▄▄▄▄▓▓▓▓█▓╝╝█████      
                             ▓███▓█           ;▓▓████▌▒▒╬╬▌╙╠▓▓▓█▓   █████      
                             ▓███▓█╦▄▄╣▀▓▓███▓▀▀▒▓█████▓▓▀▓▓▓▓▓▓█▒  ┌█████      
                             ▓███▓█▄▄╣▀▀▀`'  ,▄▓▀▓█████▒▓▄µ╠▓▓▓██▓▀▀▓████▌      
                             ▀███▓█▌      ,▄██▀╓▓█╢███▓▒▌ ▀█▓▓██╨╙▀▀█████▒      
                             ]██████   ╓▄▓▓▓╨ ╓██Ü▓█▓██▒▓▌╠▓▓▓█▒   ▄████▓       
                              ▓███▓█▌▓▀▀▓▓╨  ▄██∩╔█▌╫█▓╬▓█▓▓▓█▓▀▄ ╓█████∩       
                              ╚██████▄▓▀   ,▓▓▓  ▓█▒]█▓╫▒█▓▓▓█∩ `▓█████▀        
                               ▀████▓█╦   ╓▓▄▓  ╫▓▓ ]█▓╫Q╣▓▓█▀  ▄█████▀         
                                ▓██████▄ ╬▓▄▓  ╓█▓▌ ]█▌╫▒▓▓▓█▄╓▓█████▌          
                                 ▀███████▌▓▓   ▓▌▓∩  ▓▒╬▄▓█▓▓▓▓▓████▀           
                                  ╙████████▄  ╓█╢▌   ▓▓███████████▀▀Θ           
                                    ▀██████████▓▓▄,╓▄████████████╨              
                                      ▀███████████████████████▀╨                
                                        ╙▀█████████████████▀╙                   
                                            ╙╙▀▀▓██▀▀▀▀▀                       

*/



    
           
      

