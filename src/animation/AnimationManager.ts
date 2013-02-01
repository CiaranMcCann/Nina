/**
 * ParticleEffectManager.js
 * This simply manages an arrray of particle effects, updates and draws them 
 * once the effect it complete it will be removed from the collection
 *
 *  author:  Ciarán McCann
 *  url: http://www.ciaranmccann.me/
 */
///<reference path="Sprite.ts"/>
///<reference path="SpriteDefinitions.ts"/>
///<reference path="../system/AssetManager.ts"/>
///<reference path="../system/Utilies.ts"/>
///<reference path="../system/Timer.ts" />
///<reference path="../Settings.ts" />

class AnimationManager
{

    particleEffects;

    constructor ()
    {
        this.particleEffects = [];
    }

    add(effect)
    {
        this.particleEffects.push(effect);
    }

    stopAll()
    {
        for (var i = this.particleEffects.length - 1; i >= 0; i--)
        {
            this.particleEffects[i].finished = true;
        }
    }

    draw(ctx)
    {
        for (var i = this.particleEffects.length - 1; i >= 0; i--)
        {
            this.particleEffects[i].draw(ctx);
        }
    }

    update()
    {
        for (var i = this.particleEffects.length - 1; i >= 0; i--)
        {
            this.particleEffects[i].update();

            //TODO deleting while looping??
            if (this.particleEffects[i].finished == true)
            {
                Utilies.deleteFromCollection(this.particleEffects, i);
            }

        }


    }


}