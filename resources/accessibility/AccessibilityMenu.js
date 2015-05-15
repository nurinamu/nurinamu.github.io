function createAccessibilityMenu(player)
{
    player.addEventListener("playing", playingHandler);
    player.addEventListener("pause", pausedHandler);
    player.addEventListener("ended", pausedHandler);
    player.addEventListener("volumechange", function (event)
    {
        if (player.getVolume() <= 0)
        {
            mutedHandler();
        }
        else
        {
            unmutedHandler();
        }
    });
}

function playHandler()
{
    amp.play();
}

function playingHandler()
{
    document.getElementById("playButton").className = "acc_menu_item hidden";
    document.getElementById("pauseButton").className = "acc_menu_item";
}

function pauseHandler()
{
    amp.pause();
}

function pausedHandler()
{
    document.getElementById("playButton").className = "acc_menu_item";
    document.getElementById("pauseButton").className = "acc_menu_item hidden";
}

function forwardHandler()
{
    var time = Math.min(amp.getCurrentTime() + (amp.getDuration() * 0.2), amp.getDuration());
    amp.setCurrentTime(time);
}

function backHandler()
{
    var time = Math.max(amp.getCurrentTime() - (amp.getDuration() * 0.2), 0);
    amp.setCurrentTime(time);
}

function stopHandler()
{
    amp.end();
}

function volumeUpHandler()
{
    amp.setVolume(amp.getVolume() + 0.1);
}

function volumeDownHandler()
{
    amp.setVolume(amp.getVolume() - 0.1);
}

function muteHandler()
{
    amp.mute();
}

function mutedHandler()
{
    document.getElementById("muteButton").className = "acc_menu_item hidden";
    document.getElementById("unmuteButton").className = "acc_menu_item";
}

function unmuteHandler()
{
    amp.unmute();
}

function unmutedHandler()
{
    document.getElementById("unmuteButton").className = "acc_menu_item hidden";
    document.getElementById("muteButton").className = "acc_menu_item";
}

function keypressHandler(event, func)
{
    if (event.keyCode == 32 || event.keyCode == 13)
    {
        func(event);
    }
}