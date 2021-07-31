let boids = function(p){ 
    const flock = [];
    let predator = null;
    p.setup = function(){ 
        var parentDiv = document.getElementById("boids");
        var myCanvas = p.createCanvas(parentDiv.offsetWidth, parentDiv.offsetHeight);
        var element = document.getElementById("defaultCanvas0");
        element.style.width = null;
        element.style.height = null;
        myCanvas.parent("boids");
        p.angleMode(p.DEGREES);
        for(i = 0; i < 100; i ++){ 
            flock.push(new Boid(p, 0.5, false));
        }
        predator = new Boid(p, 0.5, true);
        flock.push(predator);
        p.resizeCanvas(parentDiv.offsetWidth, parentDiv.offsetHeight);
    }

    p.draw = function(){ 
        p.background('#202020');
        for(let boid of flock) {
            boid.flock(p, flock); 
            boid.update(p);
            boid.show(p);
        }
    }
}

let lorenz = function(p){ 
    var lorenzAttractor;
    let rotation = 0;
    p.setup = function(){
        var parentDiv = document.getElementById("lorenz");
        var myCanvas = p.createCanvas(parentDiv.offsetWidth, parentDiv.offsetHeight, p.WEBGL);
        var element = document.getElementById("defaultCanvas1");
        p.colorMode(p.HSB);
        element.style.width = null;
        element.style.height = null;
        myCanvas.parent("lorenz");

        let x = (coords, params) => { 
            return params[0] * (coords[1] - coords[0]);
        }
        let y = (coords, params) => { 
            return coords[0] * (params[1] - coords[2]) - coords[1];
        }
        let z = (coords, params) => { 
            return coords[0] * coords[1] - params[2] * coords[2];
        }

        lorenzAttractor = new attractor([x, y, z], [10, 28, 8/3]);
        p.resizeCanvas(parentDiv.offsetWidth, parentDiv.offsetHeight);
    }

    p.draw = function(){ 
        lorenzAttractor.show(p);
        p.orbitControl();
    }
}


let projectBoids = new p5(boids);
let projectLorenz = new p5(lorenz);
