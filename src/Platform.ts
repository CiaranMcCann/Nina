class Platform
{
	body: any;

	constructor(xInPixels: number, yInPixels: number, wInPixels: number, hInPixels: number)
	{
		var fixDef = new b2FixtureDef;
		fixDef.density = 1.0;
		fixDef.friction = 1.0;
		fixDef.restitution = 0.1;
		fixDef.shape = new b2PolygonShape();

		fixDef.shape.SetAsBox(
			Physics.pixelToMeters(wInPixels),
			Physics.pixelToMeters(hInPixels)
		);

		var bodyDef = new b2BodyDef;
		bodyDef.type = b2Body.b2_staticBody;
		bodyDef.position.x = Physics.pixelToMeters(xInPixels);
        bodyDef.position.y = Physics.pixelToMeters(yInPixels);
        this.body = Physics.world.CreateBody(bodyDef).CreateFixture(fixDef).GetBody();
	}
}