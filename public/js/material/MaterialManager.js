import * as THREE from 'three';

export class MaterialManager {
  materials = {};
  textureLoader;

  constructor() {
    this.textureLoader = new THREE.TextureLoader();
  }

  getMaterial(name) {
    console.log(this);

    if (this.materials[name]) {
      return this.materials[name];
    }

    throw new Error(`There's no material with the name "${name}".`)
  }

  loadTexture(path, isExternal = true) {
    if (!path) {
      return undefined;
    }

    const url = isExternal ? `https://corsproxy.io/?${encodeURIComponent(path)}` : path;
    const texture = this.textureLoader.load(url);

    texture.colorSpace = THREE.SRGBColorSpace;

    return texture;
  }

  addMaterial(config) {
    const id = config.id;
    const material = this.getMaterialFromConfig(config);
    this.materials[id] = material;
  }

  getMaterialFromConfig(config) {
    const materialConfig = {};
    let material;
    
    const alphaMap = this.loadTexture(config.maps.alpha, config.external);
    const bumpMap = this.loadTexture(config.maps.bump, config.external);
    const diffuseMap = this.loadTexture(config.maps.diffuse, config.external);
    const emissiveMap = this.loadTexture(config.maps.emissive, config.external);
    const environmentMap = this.loadTexture(config.maps.environment, config.external);
    const normalMap = this.loadTexture(config.maps.normal, config.external);
    const occlusionMap = this.loadTexture(config.maps.occlusion, config.external);
    const roughnessMap = this.loadTexture(config.maps.roughness, config.external);
    const specularMap = this.loadTexture(config.maps.specular, config.external);

    if (alphaMap) materialConfig.alphaMap = alphaMap;
    if (bumpMap) materialConfig.bumpMap = bumpMap;
    if (diffuseMap) materialConfig.map = diffuseMap;
    if (emissiveMap) materialConfig.emissiveMap = emissiveMap;
    if (environmentMap) materialConfig.envMap = environmentMap;
    if (normalMap) materialConfig.normalMap = normalMap;
    if (occlusionMap) materialConfig.aoMap = occlusionMap;
    if (roughnessMap) materialConfig.roughnessMap = roughnessMap;
    if (specularMap) materialConfig.specularMap = specularMap;

    switch (config.type) {
      case "basic":
        material = new THREE.MeshBasicMaterial(materialConfig);
        break;
      case "depth":
        material = new THREE.MeshDepthMaterial(materialConfig);
        break;
      case "lambert":
        material = new THREE.MeshLambertMaterial(materialConfig);
        break;
      case "matcap":
        material = new THREE.MeshMatcapMaterial(materialConfig);
        break;
      case "normal":
        material = new THREE.MeshNormalMaterial(materialConfig);
        break;
      case "phong":
        material = new THREE.MeshPhongMaterial(materialConfig);
        break;
      case "physical":
        material = new THREE.MeshPhysicalMaterial(materialConfig);
        break;
      case "standard":
        material = new THREE.MeshStandardMaterial(materialConfig);
        break;
      case "toon":
        material = new THREE.MeshToonMaterial(materialConfig);
        break;
      default:
        material = new THREE.MeshStandardMaterial(materialConfig);
        break;
    }

    return material;
  }
}
