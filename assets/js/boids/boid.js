class Boid { 
    constructor(p, boidSize, isPredator){ 
        this.maxForce = 1.5;
        this.maxSpeed = 6;
        this.isPredator = isPredator;
        this.position = p.createVector(p.random(p.width), p.random(p.height));
        this.velocity = p.createVector(p.random(this.maxSpeed), p.random(this.maxSpeed));
        this.acceleration = p.createVector();
        this.boidSize = boidSize;
    }

    update(p){ 
        this.position.add(this.velocity);
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.maxSpeed);
        this.edges(p);
        this.acceleration.set(0, 0, 0); 
    }

    flock(p, boids){
        if(this.isPredator){ 
            this.acceleration.add(this.prey(p, boids).mult(this.boidSize));
        }else{ 
            this.acceleration.add(this.seperation(p, boids).mult(this.boidSize));
            this.acceleration.add(this.alignment(p, boids).mult(this.boidSize));
            this.acceleration.add(this.cohesion(p, boids).mult(this.boidSize));
            this.acceleration.add(this.flee(p, boids));
        }

    }

    prey(p, boids){ 
        let nearestPrey = null;
        let shortestDist = null;

        for(let boid of boids){ 
            let d = p.dist( this.position.x, this.position.y, boid.position.x, boid.position.y);
            if(shortestDist == null || d < shortestDist && boid != this){ 
                shortestDist = d;
                nearestPrey = boid;
            }
        }
        
        p.strokeWeight(5);
        p.stroke(0);
        p.line(this.position.x, this.position.y, nearestPrey.position.x, nearestPrey.position.y);
        let boidDir = p5.Vector.sub(nearestPrey.position, this.position);
        return boidDir.div(80);
        
    }

    seperation(p, boids){ 
        let avg = p.createVector();
        let total = 0;
        for(let boid of boids){ 
            let d = p.dist( this.position.x, this.position.y, boid.position.x, boid.position.y);
            if (this != boid && d < 40 * this.boidSize && !boid.isPredator){ 
                let diff = p5.Vector.sub(this.position, boid.position);
                diff.div(d * d);
                avg.add(diff);
                total++;
            }
        }

        if(total > 0){ 
            
            avg.setMag(this.maxSpeed * this.boidSize );
            avg.sub(this.velocity);
            avg.limit(this.maxForce * 0.6 * this.boidSize );
        }

        return avg;
    }

    alignment(p, boids){ 
        let avg = p.createVector();
        let total = 0;
        for(let boid of boids){ 
            let d = p.dist( this.position.x, this.position.y, boid.position.x, boid.position.y);
            if (this != boid && d < 40 * this.boidSize && !boid.isPredator){ 
                avg.add(boid.position)
                total++;
            }
        }
        if(total > 0){ 
            avg.div(total);
            avg.sub(this.position);
            avg.limit(this.maxForce * 0.8 * this.boidSize );
        }

        return avg.div(100 );
    }

    cohesion(p, boids){
        let steering = p.createVector();
        let total = 0;
        for(let boid of boids){ 
            let d = p.dist( this.position.x, this.position.y, boid.position.x, boid.position.y);

            if (this != boid && d < 60 * this.boidSize && !boid.isPredator){ 
                steering.add(boid.velocity)
                total++;
            }
        }
        if(total > 0){ 
            steering.div(total); 
            steering.sub(this.velocity);
            steering.limit(this.maxForce * 1.3);
        }

        return steering;
    }

    flee(p, boids){ 
        for(let boid of boids){ 
            let d = p.dist( this.position.x, this.position.y, boid.position.x, boid.position.y);
            if (d < 80 * this.boidSize && boid.isPredator){ 
                let boidDir = p5.Vector.sub(this.position, boid.position);
                return boidDir.div(40);
            }
        }
    }

    edges(p){ 
        if(this.position.x > p.width){ 
            this.position.x = 0;
        }else if(this.position.x < 0){
            this.position.x = p.width;
        }
        if(this.position.y > p.height){ 
            this.position.y = 0;
        }else if(this.position.y < 0){
            this.position.y = p.height;
        }
    }

    getForwardAngle(){ 
        let normVel = p5.Vector.normalize(this.velocity);
        let angle = Math.atan2(normVel.y, normVel.x);
        angle *= 180/Math.PI;
        return angle;
    }

    show(p){ 
        if(this.isPredator){ 
            p.strokeWeight(this.boidSize * 16 + this.boidSize * 16 * 0.15);
            p.stroke('red');
        }else{ 
            p.strokeWeight(this.boidSize * 16);
            p.stroke(255);
        }
        p.push();
        p.translate(this.position.x, this.position.y);
        p.rotate(this.getForwardAngle() + 90);
        p.triangle(-0.5, 0, 0.5, 0, 0,-1);
        p.pop();
    }
}