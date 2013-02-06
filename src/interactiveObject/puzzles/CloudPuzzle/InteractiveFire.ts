///<reference path="../BasePuzzle.ts"/>
///<reference path="../../animation/Sprite.ts/>
///<reference path="../../../system/Physics.ts"/>
///<reference path="Cloud.ts"/>

class InteractiveFire extends BasePuzzle {
    private _puzzleManager: IPuzzleManager;
    public static isCloudCreated: bool = false;
    public static hasWalterCollision: bool = false;

    constructor(pm: IPuzzleManager, xInPixels: number, yInPixels: number) {
        super(new Sprite(Sprites.animations.fireAnim), xInPixels, yInPixels);

        var width = Physics.pixelToMeters(150)
        var height = Physics.pixelToMeters(10);

        super.SetupPhysics(0.0, 1.0, 0.0, width, height);
        this._puzzleManager = pm;
    }

    beginContact(contact) {
        var a: any = contact.GetFixtureA().GetBody().GetUserData();
        var b: any = contact.GetFixtureB().GetBody().GetUserData();

        var other: any = a instanceof InteractiveFire ? b : a;

        if (!(other instanceof Walter) || InteractiveFire.hasWalterCollision) return;

        //if the other collider is Walter, we create a cloud
        InteractiveFire.isCloudCreated = InteractiveFire.hasWalterCollision = true;
    }

    DrawSprite(ctx) {
        this.sprite.draw(ctx, -this.sprite.getFrameWidth() / 2, -this.sprite.getFrameHeight() / 0.935);
    }

    Update() {
        if (InteractiveFire.isCloudCreated) {
            InteractiveFire.isCloudCreated = false;
            this._puzzleManager.CreatePuzzle(new Cloud(this._puzzleManager));
        }
        super.Update();
    }
}