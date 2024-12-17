import { BufferGeometry, Float32BufferAttribute } from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';

export class GridMesh {
  geometries = [];

  constructor() {}

  vectorsToNumbers(vectors) {
    const numbers = [];

    for (const vector of vectors) {
      vector.x && numbers.push(vector.x);
      vector.y && numbers.push(vector.y);
      vector.z && numbers.push(vector.z);
    }

    return numbers;
  }

  addFace(verts, uvs) {
    verts = this.vectorsToNumbers(verts);
    uvs = this.vectorsToNumbers(uvs);

    const geometry = new BufferGeometry();

    const position = new Float32BufferAttribute(verts, 3);
    const uv = new Float32BufferAttribute(uvs, 2);

    geometry.setAttribute('position', position);
    geometry.setAttribute('uv', uv);
    geometry.computeVertexNormals();
    this.geometries.push(geometry);
  }

  get geometry() {
    const geometry = mergeGeometries(this.geometries);
    geometry.computeBoundingSphere();

    return geometry;
  }
}
