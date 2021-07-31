class attractor{ 
    constructor(equations, params){ 
        this.point = [0.01, 0, 0];
        this.dt = 0.01;
        this.params = params;
        this.equations = equations;
        this.points = new Array();
        this.points.push(new p5.Vector(this.point[0], this.point[1], this.point[2]));
        this.startIndex = 0;
    }

    step(){ 
        let d = []
        for(let i = 0; i < this.point.length; i++){ 
            d[i] = this.equations[i](this.point, [10, 28, 8/3]) * this.dt;
        }
        for(let i = 0; i < this.point.length; i++){ 
            this.point[i] += d[i];
        }
    }

    show(p){ 
        p.background('#202020');
        this.step();
        if(this.points.length < 500){ 
            this.points.push(new p5.Vector(this.point[0], this.point[1], this.point[2]));
        }else{ 
            this.points[this.startIndex] = new p5.Vector(this.point[0], this.point[1], this.point[2]);
            if(this.startIndex == 500){ 
                this.startIndex = 0;
            }else{ 
                this.startIndex++;
            }

        }


        p.translate(0, 0, -80);

        p.scale(5);
        p.stroke(255);
        p.noFill();

        let hu = 0;
        p.beginShape();

        for (let i = 0; i < this.points.length; i++) {
            p.stroke(100, 255, 255);
            let index = (this.startIndex + i) % this.points.length;
            p.vertex(this.points[index].x, this.points[index].y, this.points[index].z);

            hu += 1;
            if (hu > 255) {
            hu = 0;
            }
        }
        p.endShape();

    }
}