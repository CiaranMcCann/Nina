var Utilies;
(function (Utilies) {
    function copy(newObject, oldObject) {
        for(var member in oldObject) {
            if(typeof (oldObject[member]) == "object") {
                newObject[member] = copy(newObject[member], oldObject[member]);
            } else {
                newObject[member] = oldObject[member];
            }
        }
        return newObject;
    }
    Utilies.copy = copy;
    ;
    function Distance(v1, v2) {
        return Math.sqrt(DistanceSquared(v1, v2));
    }
    Utilies.Distance = Distance;
    function DistanceSquared(v1, v2) {
        var x = v1.x - v2.x;
        var y = v1.y - v2.y;
        return new b2Vec2(x, y).LengthSquared();
    }
    Utilies.DistanceSquared = DistanceSquared;
    function findByValue(needle, haystack, haystackProperity) {
        for(var i = 0; i < haystack.length; i++) {
            if(haystack[i][haystackProperity] === needle) {
                return haystack[i];
            }
        }
        throw "Couldn't find object with proerpty " + haystackProperity + " equal to " + needle;
    }
    Utilies.findByValue = findByValue;
    function random(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    Utilies.random = random;
    function pickRandom(collection) {
        return collection[random(0, collection.length - 1)];
    }
    Utilies.pickRandom = pickRandom;
    var pickUnqineCollection = [];
    function pickUnqine(collection, stringId) {
        if(pickUnqineCollection[stringId]) {
            var items = pickUnqineCollection[stringId];
            if(items.length <= 0) {
                Logger.error("Out of unqine items in collection " + stringId);
                return;
            }
            var index = random(0, items.length - 1);
            var unqineItem = items[index];
            deleteFromCollection(items, index);
            return unqineItem;
        } else {
            pickUnqineCollection[stringId] = collection;
            return pickUnqine(collection, stringId);
        }
    }
    Utilies.pickUnqine = pickUnqine;
    function pickRandomSound(collection) {
        var sound = AssetManager.sounds[collection[random(0, collection.length - 1)]];
        if(!sound.play) {
            Logger.warn(" Somthing looks dogoy with the sound object " + sound);
        }
        return sound;
    }
    Utilies.pickRandomSound = pickRandomSound;
    function deleteFromCollection(collection, indexToRemove) {
        delete collection[indexToRemove];
        collection.splice(indexToRemove, 1);
    }
    Utilies.deleteFromCollection = deleteFromCollection;
    function isBetweenRange(value, rangeMax, rangeMin) {
        return value >= rangeMin && value <= rangeMax;
    }
    Utilies.isBetweenRange = isBetweenRange;
    function angleToVector(angle) {
        return new b2Vec2(Math.cos(angle), Math.sin(angle));
    }
    Utilies.angleToVector = angleToVector;
    function vectorToAngle(vector) {
        return Math.atan2(vector.y, vector.x);
    }
    Utilies.vectorToAngle = vectorToAngle;
    function toRadians(angleInDegrees) {
        return angleInDegrees * (Math.PI / 180);
    }
    Utilies.toRadians = toRadians;
    function toDegrees(angleInRdains) {
        return angleInRdains * (180 / Math.PI);
    }
    Utilies.toDegrees = toDegrees;
    function isNumber(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }
    Utilies.isNumber = isNumber;
})(Utilies || (Utilies = {}));
var Logger;
(function (Logger) {
    function log(message) {
        if(Settings.DEVELOPMENT_MODE || Settings.LOG) {
            console.info(message);
        }
    }
    Logger.log = log;
    function warn(message) {
        if(Settings.DEVELOPMENT_MODE || Settings.LOG) {
            console.warn(message);
        }
    }
    Logger.warn = warn;
    function debug(message) {
        if(Settings.DEVELOPMENT_MODE || Settings.LOG) {
            console.log(message);
        }
    }
    Logger.debug = debug;
    function error(message) {
        if(Settings.DEVELOPMENT_MODE || Settings.LOG) {
            console.error(message);
        }
    }
    Logger.error = error;
})(Logger || (Logger = {}));
var keyboard;
(function (keyboard) {
    var keys = [];
    (function () {
        $(window).keydown(function (e) {
            keys[e.which] = true;
        });
        $(window).keyup(function (e) {
            delete keys[e.which];
        });
    })();
    function isKeyDown(keyCode, actLikeKeyPress) {
        if (typeof actLikeKeyPress === "undefined") { actLikeKeyPress = false; }
        for(var key in keys) {
            if(key == keyCode) {
                if(actLikeKeyPress) {
                    delete keys[key];
                }
                return true;
            }
        }
        return false;
    }
    keyboard.isKeyDown = isKeyDown;
    keyboard.keyCodes = {
        'Backspace': 8,
        'Tab': 9,
        'Enter': 13,
        'Shift': 16,
        'Ctrl': 17,
        'Alt': 18,
        'Pause': 19,
        'Capslock': 20,
        'Esc': 27,
        'Pageup': 33,
        'Pagedown': 34,
        'End': 35,
        'Home': 36,
        'Leftarrow': 37,
        'Uparrow': 38,
        'Rightarrow': 39,
        'Downarrow': 40,
        'Insert': 45,
        'Delete': 46,
        '0': 48,
        '1': 49,
        '2': 50,
        '3': 51,
        '4': 52,
        '5': 53,
        '6': 54,
        '7': 55,
        '8': 56,
        '9': 57,
        'a': 65,
        'b': 66,
        'c': 67,
        'd': 68,
        'e': 69,
        'f': 70,
        'g': 71,
        'h': 72,
        'i': 73,
        'j': 74,
        'k': 75,
        'l': 76,
        'm': 77,
        'n': 78,
        'o': 79,
        'p': 80,
        'q': 81,
        'r': 82,
        's': 83,
        't': 84,
        'u': 85,
        'v': 86,
        'w': 87,
        'x': 88,
        'y': 89,
        'z': 90,
        'numpad0': 96,
        'numpad1': 97,
        'numpad2': 98,
        'numpad3': 99,
        'numpad4': 100,
        'numpad5': 101,
        'numpad6': 102,
        'numpad7': 103,
        'numpad8': 104,
        'numpad9': 105,
        'Multiply': 106,
        'Plus': 107,
        'Minut': 109,
        'Dot': 110,
        'Slash1': 111,
        'F1': 112,
        'F2': 113,
        'F3': 114,
        'F4': 115,
        'F5': 116,
        'F6': 117,
        'F7': 118,
        'F8': 119,
        'F9': 120,
        'F10': 121,
        'F11': 122,
        'F12': 123,
        'equal': 187,
        'Coma': 188,
        'Slash': 191,
        'Backslash': 220
    };
})(keyboard || (keyboard = {}));
