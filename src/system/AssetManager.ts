/**
 * AssetManager.js
 * This manages the loading of image and sound assets. 
 * The loaded images and sounds are then acessable from any where by the following. 
 * AssetManager.images["myImageName"] no need for the full url or the extenision
 * 
 *  License: Apache 2.0
 *  author:  Ciar?n McCann
 *  url: http://www.ciaranmccann.me/
 */
///<reference path="../audio/Sound.ts"/>
///<reference path="../animation/SpriteDefinitions.ts"/>
declare var BufferLoader;

module AssetManager
{

    // Placing an image url in the below array
    // will make sure its is loaded before the game starts.
    // you can then acess the image by AssetManager.getImages("placeHolderImage")
    // no need for the full url or the extenision
    var priorityImages = [
         'data/images/FirstAlexBar.png',
         'data/images/FirstWalterBar.png',
         'data/images/level_design_level_01_00.png',
         'data/images/Pipe1.png',
         'data/images/Pipe3.png',
         'data/images/Pipe4.png',
         'data/images/waterParticle.png',
         'data/images/menu/Menu.png',
         'data/images/menu/button.png',
         'data/images/menu/highlightedbutton.png',
         'data/images/menu/walteralex.png',
         'data/images/extension.png',
         'data/images/eyes.png',
         'data/images/objectmap.png',
         'data/images/walterControl.png',
         'data/images/alexControl.png',
         'data/images/fridge.png',
         'data/images/wall.png',
         'data/images/level_design_level_01_00_front.png',
         'data/images/level_design_level_01_00_back.png',
         'data/images/Propeller.png',
         'data/images/Ligthning_for_wire_01.png',
         'data/images/Ligthning_for_wire_03.png',
         'data/images/Ligthning_for_wire_04.png',
         'data/images/EmptyBar.png'

    ];

    var priorityAudio = [
         'data/sounds/theme.wav',
         'data/sounds/browse.wav',
         'data/sounds/select.wav',
         'data/sounds/marioCoin.wav',
         'data/sounds/jump.wav'
    ]

    export var images = [];
    export var sounds = [];

    export function getImage(imageName : string) : HTMLImageElement
    {
        return images[imageName];
    }

    export function getSound(s) : Sound
    {
        return sounds[s];
    }

    export function loadImages(sources, callback)
    {

        var images = [];
        var loadedImages = 0;
        var numImages = 0;
        // get num of sources
        for (var src in sources)
        {
            numImages++;
        }
        for (var src in sources)
        {
            var name = sources[src].match("[a-z,A-Z,0-9,_]+[.]png")[0].replace(".png", "");

            if (images[name] == null)
            {
                images[name] = new Image();
                images[name].onload = function ()
                {
                    Logger.log(" Image " + this.src + " loaded sucessfully ");
                    if (++loadedImages >= numImages)
                    {
                        AssetManager.images = images;
                        callback();
                    }
                };
            } else
            {
                Logger.error("Image " + sources[src] + " has the same name as" + images[name].src);
            }

            images[name].src = sources[src];
        }

    }

    export function addSpritesDefToLoadList()
    {
        // Load all sprites
        for (var sprite in Sprites.animations)
        {
           priorityImages.push("data/images/" + Sprites.animations[sprite].imageName + ".png");
        }
     

    }

    export function loadAssets(callback)
    {
        addSpritesDefToLoadList();
        loadImages(priorityImages, function ()
        {
            loadSounds(priorityAudio, callback);

            if (priorityAudio.length <= 0)
            {
                callback();
            }
        });
    }

    export function loadSounds(sources, callback)
    {   
        try
        {

            var bufferLoader = new BufferLoader(Sound.context, sources, function (bufferList)
            {

                for (var i = 0; i < bufferList.length; i++)
                {
                    sounds[bufferList[i].name] = new Sound(bufferList[i].buffer);
                }

                callback();
            });
            bufferLoader.load();
        }catch(e) {

            callback();
        }
    }

}