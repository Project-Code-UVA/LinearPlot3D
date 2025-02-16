
import * as THREE from "three";

// Takes in input values for the vector position
// and uses them to calculate what the transformed position 
// and current position (given a time) should be
//
// The returned vector stores all of these values,
// accessable via the getter functions. These can be accessed
// just using "vector.x", though the result cannot be changed
export default class Vector {
  #orig
  #trans
  #curr
  #matrix;
  #animTime;
  
  // Read updateTime note about what "time" exactly refers to
  constructor(x, y, z, matrix, time = 0) {
    this.#orig = new THREE.Vector3(parseFloat(x), parseFloat(y), parseFloat(z));
    this.#matrix = new THREE.Matrix3(matrix[0], matrix[1], matrix[2], matrix[3], matrix[4], matrix[5], matrix[6], matrix[7], matrix[8]);
    this.#updateTranslatedVec();
    this.#updateTime(time);
  }

  #updateTranslatedVec() {
    this.#trans = this.#orig.clone();
    this.#trans.applyMatrix3(this.#matrix);
  }

  #updateCurrentVec() {
    // this.#applyLinearTransform();
    this.#applyRotationalTransform();
  }

  #applyLinearTransform() {
    this.#curr = this.#orig.clone();

    let dif = new THREE.Vector3().subVectors(this.#trans, this.#orig);
    this.#curr.addScaledVector(dif, this.#animTime);
  }

  // Get spherical coordinates for the starting vector
  // and the ending vector
  #applyRotationalTransform() {
    let sphstart = new THREE.Spherical().setFromVector3(this.#orig);
    let sphend = new THREE.Spherical().setFromVector3(this.#trans);
    let sphcurr = sphstart.clone();

    let radiusdif = sphend.radius - sphstart.radius;
    let phidif = sphend.phi - sphstart.phi;
    let thetadif = sphend.theta - sphstart.theta;
    sphcurr.phi = sphcurr.phi + this.#animTime*phidif;
    sphcurr.theta = sphcurr.theta + this.#animTime*thetadif;
    sphcurr.radius = sphcurr.radius + this.#animTime*radiusdif;
    this.#curr = new THREE.Vector3().setFromSpherical(sphcurr);
  }

  // Time can be any decimal value but it will be truncated
  // to a value between 0 and 1, corresponding to how far
  // along the animation the vector should be
  #updateTime(time) {
    this.#animTime = ((time % 1) + 1) % 1;
    this.#updateCurrentVec();
  }

  get x() { return this.#orig.x; }
  get y() { return this.#orig.y; }
  get z() { return this.#orig.z; }
  get transX() { return this.#trans.x; }
  get transY() { return this.#trans.y; }
  get transZ() { return this.#trans.z; }
  get currX() { return this.#curr.x; }
  get currY() { return this.#curr.y; }
  get currZ() { return this.#curr.z; }
  get animTime() { return this.#animTime; }

}

