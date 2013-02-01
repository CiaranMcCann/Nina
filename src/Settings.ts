/**
 *  Global settings for the whole game
 *
 *  author:  Ciarán McCann
 *  url: http://www.ciaranmccann.me/
 */
///<reference path="system/Utilies.ts" />

module Settings
{
 
    //General game settings
    export var SOUND = true;

    // development vars
    export var DEVELOPMENT_MODE = false; 
    export var LOG = true;
    export var PHYSICS_DEBUG_MODE = true;

    //Pasers commandline type arguments from the page url like this ?argName=value
    export function getSettingsFromUrl()
    {
        var argv = getUrlVars();
        var commands = ["physicsDebugDraw","devMode","sound"]

        if (argv[commands[0]] == "true")
        {
            PHYSICS_DEBUG_MODE = true;
        }

        if (argv[commands[1]] == "true")
        {
            DEVELOPMENT_MODE = true;
        }

        if (argv[commands[2]] == "false")
        {
            SOUND = false;
        }

        Logger.log(" Notice: argv are as follows " + commands);
    }

    export function getUrlVars()
    {
        var vars = {};
        window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) =>
        {
            vars[key] = value;
            return "";
        });
        return vars;
    }
}