/**
 * SpriteDefinitions.js
 *
 * They outline sprites and how many fames they have, what speed the move at etc. 
 * This class also removed the need to deal with nasty strings inside the main codebase
 *
 * SpriteDefinitions can be ascced and set from any where like the following
 * mySpriteObj.setSpriteDef(Sprites.worms.walking);
 *
 *  author:  Ciarán McCann
 *  url: http://www.ciaranmccann.me/
 */
interface SpriteDefinition
{
    imageName: string;
    frameY: number;
    frameCount: number;
    msPerFrame: number;
}


module Sprites
{

    // These are defined frames for said animations
    export var animations = {

        walterWalking: {

            imageName: "wwalk",
            frameY: 0,
            frameCount: 8,
            msPerFrame: 50,

        },

        walterJumping: {
            imageName: "walter_jc_sprite",
            frameY: 0,
            frameCount: 6,
            msPerFrame: 50,

        },

        waterCoin: {

            imageName: "wcoins",
            frameY: 0,
            frameCount: 6,
            msPerFrame: 50,

        },

        electricityCoin: {

            imageName: "ecoins",
            frameY: 0,
            frameCount: 6,
            msPerFrame: 50,

        }
    }

}