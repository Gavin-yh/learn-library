if(typeof registerPaint !== "undefined") {
    registerPaint("background-canvas", class {
        static get inputProperties() {
            return["--background-canvas"];
        }

        paint(ctx, geom, properties) {
            console.log(ctx)
            console.log(geom)
            console.log(properties)
            eval(properties.get("--background-canvas").toString())(
                ctx, geom, properties 
            )
            
        }
    })
}