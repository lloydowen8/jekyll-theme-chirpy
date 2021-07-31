let sketch = function(p){ 
    const flock = [];
    let predator = null;
    p.setup = function(){ 
        var parentDiv = document.getElementById("canvasParent");
        var myCanvas = p.createCanvas(parentDiv.offsetWidth, parentDiv.offsetHeight);
        var element = document.getElementById("defaultCanvas0");
        element.style.width = null;
        element.style.height = null;
        myCanvas.parent("canvasParent");
        p.angleMode(p.DEGREES);
        document.getElementById("boidCanvas").remove();
        for(i = 0; i < 100; i ++){ 
            flock.push(new Boid(p, 1, false));
        }
        predator = new Boid(p, 1, true);
        flock.push(predator);
    }

    p.draw = function(){ 
        p.background('#888888c7');
        for(let boid of flock) {
            boid.flock(p, flock); 
            boid.update(p);
            boid.show(p);
        }
    }

    p.windowResized = function(){ 
        var parentDiv = document.getElementById("canvasParent");
        p.resizeCanvas(parentDiv.offsetWidth, parentDiv.offsetHeight);
    }
}


let landingBoids = new p5(sketch);
