import { Vector3 } from "three";

export const points = {
  aaa: new Vector3(0, 0, 0),
  aab: new Vector3(0, 0, 1),
  aba: new Vector3(0, 1, 0),
  abb: new Vector3(0, 1, 1),
  baa: new Vector3(1, 0, 0),
  bab: new Vector3(1, 0, 1),
  bba: new Vector3(1, 1, 0),
  bbb: new Vector3(1, 1, 1),
};

export const tiles = {};

export class Tile {
  position;
  planes = [];

  constructor(pos) {
    this.position = pos.clone();

    this.addPlane("aab", "bab", "bbb", "abb");
  }

  addPlane(...pts) {
    let plane = [];

    for (let i = 0; i < pts.length; i++) {
      let point = points[pts[i]];
    }
  }

  getPlanes() {

  }
}
