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

       alexWalking: {
            imageName: "elecs_wc_small_small",
            frameY: 0,
            frameCount: 8,
            msPerFrame: 50,

        },

       walterJumping: {

           imageName: "Walter_full_jump",
            frameY: 0,
            frameCount: 10,
            msPerFrame: 50,

        },

       alexJumping: {
           imageName: "Alex_full_jump",
            frameY: 0,
            frameCount: 10,
            msPerFrame: 50,

       },

        waterCoin: {

            imageName: "wcoins",
            frameY: 0,
            frameCount: 7,
            msPerFrame: 100,

        },

        electricityCoin: {

            imageName: "ecoins",
            frameY: 0,
            frameCount: 7,
            msPerFrame: 100,

        },

        fireAnim:
        {
            imageName: "fire",
            frameY: 0,
            frameCount: 4,
            msPerFrame: 120
        },

        cloudAnimCreation:
        {
            imageName: "cloud_sprite",
            frameY: 0,
            frameCount: 9,
            msPerFrame: 150
        },

        cloudAnimWithoutAlex:
        {
            imageName: "cloud",
            frameY: 0,
            frameCount: 1,
            msPerFrame: 0
        },

        cloudAnimWithAlex:
        {
            imageName: "thunder",
            frameY: 0,
            frameCount: 5,
            msPerFrame: 200
        },

        /*cloudAnimRemove:
        {
            imageName: "cloud_sprite(2)",
            frameY: 0,
            frameCount: 9,
            msPerFrame:150
        },*/

        droplet:
        {
            imageName: "droplet",
            frameY: 0,
            frameCount: 1,
            msPerFrame: 0
        },

        transformerAlex: {
            imageName: "generator",
            frameY: 0,
            frameCount: 4,
            msPerFrame: 50,
        },

        transformerAlex: {
            imageName: "generator",
            frameY: 0,
            frameCount: 4,
            msPerFrame: 50,
    },
        alexElectrified: {
            imageName: "Alex_electrified_sprite",
            frameY: 0,
            frameCount: 9,
            msPerFrame: 10,

        },

        
        walterIdel: {
            imageName: "walter_idle_sprite",
            frameY: 0,
            frameCount: 4,
            msPerFrame: 250,

        },

         alexIdel: {
            imageName: "alex_idle_sprite",
            frameY: 0,
            frameCount: 4,
            msPerFrame: 250,

         },

         buttonsAlex:
         {
             imageName: "button_op_animation",
             frameY: 0,
             frameCount: 2,
             msPerFrame: 250,
         }
     
    }
}