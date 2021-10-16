class Point {
  constructor(x, y,dat,i) {
    this.x = x;
    this.y = y;
    this.data=dat;
    this.index=i
  }
  show(clrd){
    strokeWeight(1);
    stroke(255,200);
    if (clrd){stroke('red');strokeWeight(2)}
    point(this.x,this.y)
  }
  distanceFrom(other) {
    const dx = other.x - this.x;
    const dy = other.y - this.y;
    return Math.sqrt(dx * dx + dy * dy);
  }
}
//---------------------------------

class Rectangle {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.left = x - w ;
    this.right = x + w ;
    this.top = y - h;
    this.bottom = y + h;
  }

  contains(point) {
    return (this.left <= point.x && point.x <= this.right &&
      this.top <= point.y && point.y <= this.bottom);
  }

  intersects(range) {
    return !(this.right < range.left || range.right < this.left ||
      this.bottom < range.top || range.bottom < this.top);
  }

  show(clrd){
    noFill();
    rectMode(CENTER);
    strokeWeight(0.3);
    stroke(255);
    if (clrd){stroke('blue'); strokeWeight(2);}
    rect(this.x,this.y,this.w*2,this.h*2)
  }
  ///*
  xDistanceFrom(point) {
    if (this.left <= point.x && point.x <= this.right) {
      return 0;
    }

    return Math.min(
      Math.abs(point.x - this.left),
      Math.abs(point.x - this.right)
    );
  }

  yDistanceFrom(point) {
    if (this.top <= point.y && point.y <= this.bottom) {
      return 0;
    }

    return Math.min(
      Math.abs(point.y - this.top),
      Math.abs(point.y - this.bottom)
    );
  }

  distanceFrom(point) {
    const dx = this.xDistanceFrom(point);
    const dy = this.yDistanceFrom(point);
    return Math.sqrt(dx * dx + dy * dy);
  }
  //*/
}

class Circle{
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.rSquared = this.r * this.r;
  }

  contains(point) {
    // check if the point is in the circle by checking if the euclidean distance of
    // the point and the center of the circle if smaller or equal to the radius of
    // the circle
    let d = Math.pow((point.x - this.x), 2) + Math.pow((point.y - this.y), 2);
    return d <= this.rSquared;
  }

  intersects(range) {

    let xDist = Math.abs(range.x - this.x);
    let yDist = Math.abs(range.y - this.y);

    // radius of the circle
    let r = this.r;

    let w = range.w / 2;
    let h = range.h / 2;

    let edges = Math.pow((xDist - w), 2) + Math.pow((yDist - h), 2);

    // no intersection
    if (xDist > (r + w) || yDist > (r + h))
      return false;

    // intersection within the circle
    if (xDist <= w || yDist <= h)
      return true;

    // intersection on the edge of the circle
    return edges <= this.rSquared;
  }
}

//--------------------------------
class QuadTree {
  constructor(boundary, n) {
    this.boundary = boundary;
    this.capacity = n;
    this.points = [];
    this.divided = false;
  }

  get children() {
    if (this.divided) {
      return [
        this.ne,
        this.nw,
        this.se,
        this.sw
      ];
    } else {
      return [];
    }
  }
  
  subdivide() {
    let x = this.boundary.x;
    let y = this.boundary.y;
    let w = this.boundary.w;
    let h = this.boundary.h;
    let ne = new Rectangle(x + w / 2, y - h / 2, w / 2, h / 2);
    this.ne = new QuadTree(ne, this.capacity);
    let nw = new Rectangle(x - w / 2, y - h / 2, w / 2, h / 2);
    this.nw = new QuadTree(nw, this.capacity);
    let se = new Rectangle(x + w / 2, y + h / 2, w / 2, h / 2);
    this.se = new QuadTree(se, this.capacity);
    let sw = new Rectangle(x - w / 2, y + h / 2, w / 2, h / 2);
    this.sw = new QuadTree(sw, this.capacity);
    this.divided = true;
  }

  insert(point) {

    if (!this.boundary.contains(point)) {
      return false;
    }

    if (this.points.length < this.capacity) {
      this.points.push(point);
      return true;
    } else {
      if (!this.divided) {
        this.subdivide();
      }
      if (this.ne.insert(point)) {
        return true;
      } else if (this.nw.insert(point)) {
        return true;
      } else if (this.se.insert(point)) {
        return true;
      } else if (this.sw.insert(point)) {
        return true;
      }
    }
  }

  query(range, found) {
    if (!found) {
      found = [];
    }
    if (!this.boundary.intersects(range)) {
      return;
    } else {
      for (let p of this.points) {
        if (range.contains(p)) {
          found.push(p);
        }
      }
      if (this.divided) {
        this.nw.query(range, found);
        this.ne.query(range, found);
        this.sw.query(range, found);
        this.se.query(range, found);
      }
    }
    return found;
  }

  show() {
    this.boundary.show();
    for (let p of this.points) {
      p.show();
    }

    if (this.divided) {
      this.ne.show();
      this.nw.show();
      this.se.show();
      this.sw.show();
    }
  }
  
  forEach(fn) {
    this.points.forEach(fn);
    if (this.divided) {
      this.ne.forEach(fn);
      this.nw.forEach(fn);
      this.se.forEach(fn);
      this.sw.forEach(fn);
    }
  
  }
  ///*
  
  closest(searchPoint, maxCount = 1, maxDistance = Infinity) {
    if (typeof searchPoint === "undefined") {
      throw TypeError("Method 'closest' needs a point");
    }
    return this.kNearest(searchPoint, maxCount, maxDistance, 0, 0).found;
  }

  kNearest(searchPoint, maxCount, maxDistance, furthestDistance, foundSoFar) {
    let found = [];

    this.children.sort((a, b) => a.boundary.distanceFrom(searchPoint) - b.boundary.distanceFrom(searchPoint))
      .forEach((child) => {
        const distance = child.boundary.distanceFrom(searchPoint);
        if (distance > maxDistance) {
          return;
        } else if (foundSoFar < maxCount || distance < furthestDistance) {
          const result = child.kNearest(searchPoint, maxCount, maxDistance, furthestDistance, foundSoFar);
          const childPoints = result.found;
          found = found.concat(childPoints);
          foundSoFar += childPoints.length;
          furthestDistance = result.furthestDistance;
        }
      });

    this.points.sort((a, b) => a.distanceFrom(searchPoint) - b.distanceFrom(searchPoint))
      .forEach((p) => {
        const distance = p.distanceFrom(searchPoint);
        if (distance > maxDistance) {
          return;
        } else if (foundSoFar < maxCount || distance < furthestDistance) {
          found.push(p);
          furthestDistance = Math.max(distance, furthestDistance);
          foundSoFar++;
        }
      });

    return {
      found: found.sort((a, b) => a.distanceFrom(searchPoint) - b.distanceFrom(searchPoint)).slice(0, maxCount),
      furthestDistance
    };
  }
 
  //*/
}


//--------------------------------

