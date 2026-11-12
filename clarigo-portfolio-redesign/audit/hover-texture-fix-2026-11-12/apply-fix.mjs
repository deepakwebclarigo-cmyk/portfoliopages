import fs from 'node:fs/promises';
const file='lib/motion-webgl.ts';let s=await fs.readFile(file,'utf8');
s=s.replace('  const textures = new Map<string, THREE.Texture>();','  const textures = new Map<string, THREE.Texture>();\n  const loadingTextures = new Set<string>(), failedTextures = new Set<string>();\n  const textureLoader = new THREE.TextureLoader();');
const old="    let texture = textures.get(source);\n    if (!texture) {\n      texture = new THREE.Texture(image); texture.colorSpace = THREE.SRGBColorSpace; texture.needsUpdate = true; texture.anisotropy = Math.min(4, renderer.capabilities.getMaxAnisotropy()); textures.set(source, texture);\n      if (textures.size > 3) { const oldest = textures.keys().next().value!; textures.get(oldest)?.dispose(); textures.delete(oldest); }\n    }\n    imageMaterial.map = texture; imageMaterial.needsUpdate = true;";
const replacement=[
"    const texture = textures.get(source);",
"    if (!texture) {",
"      if (loadingTextures.has(source) || failedTextures.has(source)) return;",
"      loadingTextures.add(source);",
"      // A responsive DOM image reports density-adjusted dimensions. Uploading it",
"      // directly can allocate a smaller texture than its decoded bitmap. Load the",
"      // selected URL independently so GPU storage uses the real pixel dimensions.",
"      textureLoader.load(source, loaded => {",
"        loadingTextures.delete(source);",
"        if (!alive) { loaded.dispose(); return; }",
"        try {",
"          loaded.colorSpace = THREE.SRGBColorSpace;",
"          loaded.anisotropy = Math.min(4, renderer.capabilities.getMaxAnisotropy());",
"          renderer.initTexture(loaded);",
"        } catch {",
"          loaded.dispose(); failedTextures.add(source); return;",
"        }",
"        textures.set(source, loaded);",
"        if (textures.size > 3) {",
"          const oldest = [...textures].find(([key, cached]) => key !== source && cached !== imageMaterial.map);",
"          if (oldest) { oldest[1].dispose(); textures.delete(oldest[0]); }",
"        }",
"        // Keep the DOM thumbnail visible while loading. Ignore a late completion",
"        // after pointer leave, filtering, navigation, or reduced-motion changes.",
"        if (link.isConnected && link.matches(':hover')) over({ pointerType: 'mouse', target: link });",
"      }, undefined, () => { loadingTextures.delete(source); failedTextures.add(source); });",
"      return;",
"    }",
"    if (!contextAvailable) return;",
"    imageMaterial.map = texture; imageMaterial.needsUpdate = true;"
].join('\n');
s=s.replaceAll('\r\n','\n');if(!s.includes(old))throw Error('Texture handoff differs from reviewed source.');s=s.replace(old,replacement);await fs.writeFile(file,s);console.log('Resolved responsive images through standalone GPU textures; preserved native thumbnails until upload is ready.');

