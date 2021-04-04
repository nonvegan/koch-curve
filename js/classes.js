class KochSegment {
  constructor(pos, dir) {
    this.pos = pos;
    this.dir = dir;
  }
  static angle = Math.PI / 3;
  
  children() {
    const scaledDir = this.dir.copy().scale(1 / 3);
    const children = [];
    children.push(new KochSegment(this.pos, scaledDir));
    children.push(new KochSegment(children[0].pos.copy().add(children[0].dir), scaledDir.copy().rotate(KochSegment.angle)));
    children.push(new KochSegment(children[1].pos.copy().add(children[1].dir), scaledDir.copy().rotate(-KochSegment.angle)));
    children.push(new KochSegment(children[2].pos.copy().add(children[2].dir), scaledDir));
    return children;
  }
}

class Vector {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  copy() {
    return new Vector(this.x, this.y);
  }
  add(vector) {
    this.x += vector.x;
    this.y += vector.y;
    return this;
  }
  scale(ratio) {
    this.x *= ratio;
    this.y *= ratio;
    return this;
  }
  rotate(omega) {
    [this.x, this.y] = [
      Math.cos(omega) * this.x - Math.sin(omega) * this.y, 
      Math.sin(omega) * this.x + Math.cos(omega) * this.y
    ];
    return this;
  }
}

export { Vector, KochSegment };
