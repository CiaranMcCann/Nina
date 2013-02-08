var Settings;
(function (Settings) {
    Settings.SOUND = true;
    Settings.DEVELOPMENT_MODE = false;
    Settings.LOG = true;
    Settings.PHYSICS_DEBUG_MODE = true;
    function getSettingsFromUrl() {
        var argv = getUrlVars();
        var commands = [
            "physicsDebugDraw", 
            "devMode", 
            "sound"
        ];
        if(argv[commands[0]] == "true") {
            Settings.PHYSICS_DEBUG_MODE = true;
        }
        if(argv[commands[1]] == "true") {
            Settings.DEVELOPMENT_MODE = true;
        }
        if(argv[commands[2]] == "false") {
            Settings.SOUND = false;
        }
        Logger.log(" Notice: argv are as follows " + commands);
    }
    Settings.getSettingsFromUrl = getSettingsFromUrl;
    function getUrlVars() {
        var vars = {
        };
        window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
            vars[key] = value;
            return "";
        });
        return vars;
    }
    Settings.getUrlVars = getUrlVars;
})(Settings || (Settings = {}));
