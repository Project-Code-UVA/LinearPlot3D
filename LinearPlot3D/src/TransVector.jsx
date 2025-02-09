

// Takes in input values for the vector position
// and uses them to calculate what the transformed position 
// and current position (given a time) should be
//
// The returned vector stores all of these values,
// accessable via the getter functions. These can be accessed
// just using "vector.x", though the result cannot be changed
export default class Vector {
  #origX;
  #origY;
  #origZ;
  #matrix;
  #transX;
  #transY;
  #transZ;
  #currX;
  #currY;
  #currZ;
  #animTime;
  
  // Read updateTime note about what "time" exactly refers to
  constructor(x, y, z, matrix, time = 0) {
    this.#origX = parseFloat(x);
    this.#origY = parseFloat(y);
    this.#origZ = parseFloat(z);
    this.#matrix = matrix;
    this.#updateTranslatedVec();
    this.#updateTime(time);
  }

  #updateTranslatedVec() {
    this.#transX = this.#origX * this.#matrix[0] + this.#origY * this.#matrix[1] + this.#origZ * this.#matrix[2];
    this.#transY = this.#origX * this.#matrix[3] + this.#origY * this.#matrix[4] + this.#origZ * this.#matrix[5];
    this.#transZ = this.#origX * this.#matrix[6] + this.#origY * this.#matrix[7] + this.#origZ * this.#matrix[8];
  }

  #updateCurrentVec() {
    this.#applyLinearTransform();
    // this.#applyRotationalTransform();
  }

  #applyLinearTransform() {
    this.#currX = this.#origX + this.#animTime*(this.#transX - this.#origX);
    this.#currY = this.#origY + this.#animTime*(this.#transY - this.#origY);
    this.#currZ = this.#origZ + this.#animTime*(this.#transZ - this.#origZ);
  }

  #applyRotationalTransform() {
    
  }

  // Time can be any decimal value but it will be truncated
  // to a value between 0 and 1, corresponding to how far
  // along the animation the vector should be
  #updateTime(time) {
    this.#animTime = ((time % 1) + 1) % 1;
    this.#updateCurrentVec();
  }

  get x() { return this.#origX; }
  get y() { return this.#origY; }
  get z() { return this.#origZ; }
  get transX() { return this.#transX; }
  get transY() { return this.#transY; }
  get transZ() { return this.#transZ; }
  get currX() { return this.#currX; }
  get currY() { return this.#currY; }
  get currZ() { return this.#currZ; }
  get animTime() { return this.#animTime; }

}

