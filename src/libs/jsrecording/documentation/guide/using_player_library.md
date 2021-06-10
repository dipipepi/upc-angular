{{= BackToPackageOverview }}

# Using Player Library

Players Library provide html content of video player. The library allows you to select the type of player by yourself. It is also possible to select player automatically. Autodetecting depends on browser's capability. For using {{=PlayerClient}} it must be configured.

## Configuring Players Library

{{=Config_ClientConfig}} contain different players plugin paths and configuration paths. For example:

```javascript
var playersConfiguration = {
    flashPlugin: 'assets/libs/flash/StrobeMediaPlayback.swf',
    hlsPlugin: 'assets/libs/flash/flashlsOSMF.swf',
    silverlightPlugin: '../../../assets/libs/silverlight/MediaPlayerTemplate.xap',
    playersConfiguration: 'assets/libs/jsplayerclient/playersConfigData.json',
    autoplay: true
};
```

Note: playersConfiguration.json file is already defined and supplied with the library.

## Get player automaticaly

We recommend to use this method.

```javascript
var playerClient = new PlayerClient(playersConfiguration);

var playerHTML = playerClient.getPlayer(options);
```

*options* is program's playback options defined in {{=PlayerParams}}. Normally this parameter is a response from {{=Services_ProgramService}}.getProgramPlaybackAddressDetails method.

## Select one of HTML5, WMP, Flash, Silverlight players

```javascript
var playerClient = new PlayerClient(playersConfiguration);

document.getElementById(containerHTML5Id).innerHTML =
    playerClient.getHTML5Player(options);

document.getElementById(containerFlashId).innerHTML =
    playerClient.getFlashPlayer(options);

document.getElementById(containerSilverlightId).innerHTML =
    playerClient.getSilverlightPlayer(options);

document.getElementById(containerWindowsMediaId).innerHTML =
    playerClient.getWindowsMediaPlayer(options);
```

Be careful, some browsers may not support manually selected player.