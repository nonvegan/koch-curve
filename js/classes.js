class KochSegment {
  constructor(pos, dir, angle) {
    this.pos = pos;
    this.dir = dir;
    this.angle = angle;
  }

  children() {
    const children = [];
    const scaledDir = this.dir.copy().scale(1 / 3);
    children.push(new KochSegment(this.pos, scaledDir, this.angle));
    children.push(new KochSegment(children[0].pos.copy().add(children[0].dir), scaledDir.copy().rotate(-this.angle), this.angle));
    children.push(new KochSegment(children[1].pos.copy().add(children[1].dir), scaledDir.copy().rotate(this.angle), this.angle));
    children.push(new KochSegment(children[2].pos.copy().add(children[2].dir), scaledDir, this.angle));
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
    let x2 = Math.cos(omega) * this.x - Math.sin(omega) * this.y;
    let y2 = Math.sin(omega) * this.x + Math.cos(omega) * this.y;
    this.x = x2;
    this.y = y2;
    return this;
  }
}

export { Vector, KochSegment };
