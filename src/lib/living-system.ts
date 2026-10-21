import * as THREE from "three";

/**
 * "Powers of ten" — one GPU particle system that morphs through six worlds:
 * 0 galaxy · 1 earth · 2 DNA · 3 bloom · 4 atom · 5 black hole.
 * Progress is a continuous float driven by scroll, so the page plays like a film.
 */
export type LivingSystem = {
  setProgress: (p: number) => void;
  setReducedMotion: (r: boolean) => void;
  dispose: () => void;
};

const C = (h: string) => new THREE.Color(h);
const PAL_A = ["#3a5bff", "#1e6bff", "#ff3d81", "#ff5a1f", "#ff2e63", "#ff3b1f"].map(C);
const PAL_B = ["#ff4fa3", "#5ff2ff", "#eaf2ff", "#ffb000", "#7c4dff", "#ffa63d"].map(C);
const PAL_C = ["#ffe2a8", "#3ddc84", "#00e5ff", "#ffe14d", "#00f0ff", "#fff4d6"].map(C);
const BG_A = ["#2b1a6e", "#06345e", "#5a0f3c", "#5e2a00", "#2a0f5e", "#5e1400"].map(C);
const BG_B = ["#6e1a4f", "#0b5e4a", "#06455e", "#4a5e00", "#06505e", "#5e3a00"].map(C);
const SPIN = [0.22, 0.12, 0.35, 0.06, 0.9, 0.55];
const RIGID = [0, 1, 1, 1, 0, 0];
const TILT_X = [0.55, 0.3, 0.0, 1.15, 0.45, 0.2];
const TILT_Z = [0.15, 0.25, 0.9, 0.0, 0.35, 0.1];

const VERT = /* glsl */ `
uniform float uP, uTime, uIntro, uPix, uSize, uAspect, uTanFov, uShockT;
uniform vec2 uMouse, uShock;
uniform vec3 uColA[6]; uniform vec3 uColB[6]; uniform vec3 uColC[6];
uniform float uSpin[6]; uniform float uRigid[6];
attribute vec3 aP0; attribute vec3 aP1; attribute vec3 aP2; attribute vec3 aP3; attribute vec3 aP4; attribute vec3 aP5;
attribute vec4 aRand; attribute vec3 aT0; attribute vec3 aT1;
varying vec3 vColor; varying float vAlpha;
vec3 P(int i){ if(i==0)return aP0; if(i==1)return aP1; if(i==2)return aP2; if(i==3)return aP3; if(i==4)return aP4; return aP5; }
float T(int i){ if(i==0)return aT0.x; if(i==1)return aT0.y; if(i==2)return aT0.z; if(i==3)return aT1.x; if(i==4)return aT1.y; return aT1.z; }
vec3 pal(int i, float t){ return t < 0.5 ? mix(uColA[i], uColB[i], t*2.0) : mix(uColB[i], uColC[i], t*2.0-1.0); }
mat2 rot(float a){ float c=cos(a), s=sin(a); return mat2(c,-s,s,c); }
vec3 spin(vec3 p, int i){
  float d = mix(length(p.xz)*0.5+0.6, 1.0, uRigid[i]);
  p.xz = rot(uTime*uSpin[i]/d) * p.xz; return p;
}
void main(){
  int a = int(min(floor(uP), 4.0)); int b = a + 1;
  float f = uP - float(a);
  float ff = clamp((f - aRand.x*0.35)/0.65, 0.0, 1.0); ff = ff*ff*(3.0-2.0*ff);
  vec3 pos = mix(spin(P(a), a), spin(P(b), b), ff);
  float burst = sin(ff*3.14159);
  vec3 dir = normalize(aRand.yzw*2.0 - 1.0 + 1e-4);
  pos += dir * burst * (1.2 + aRand.x*3.5);
  pos.xz = rot(burst*(aRand.y-0.5)*5.0) * pos.xz;
  pos += vec3(sin(uTime*1.3+aRand.y*40.0), cos(uTime*1.1+aRand.z*40.0), sin(uTime*0.9+aRand.w*40.0)) * 0.03;
  float ie = 1.0 - pow(1.0 - uIntro, 3.0);
  pos = mix(dir*0.05, pos, ie) + dir * sin(ie*3.14159) * (2.0 + aRand.x*4.0);

  vec4 mv = modelViewMatrix * vec4(pos, 1.0);
  float depth = -mv.z;
  vec2 m = uMouse * vec2(uAspect, 1.0) * uTanFov * depth;
  vec2 d = mv.xy - m; float r = length(d);
  mv.xy += d/(r+1e-3) * exp(-r*r*0.7) * 1.1;
  float age = uTime - uShockT;
  vec2 s = uShock * vec2(uAspect, 1.0) * uTanFov * depth;
  vec2 ds = mv.xy - s; float rs = length(ds);
  mv.xy += ds/(rs+1e-3) * exp(-pow(rs - age*7.0, 2.0)*1.5) * exp(-age*1.4) * 1.4;
  gl_Position = projectionMatrix * mv;

  float tw = 0.7 + 0.3*sin(uTime*3.0 + aRand.w*60.0);
  gl_PointSize = uSize * (0.35 + aRand.w*aRand.w*1.8) * tw * uPix / depth;
  vColor = mix(pal(a, T(a)), pal(b, T(b)), ff) * (1.0 + burst*0.9);
  vAlpha = (0.45 + 0.55*aRand.z) * ie;
}`;

const FRAG = /* glsl */ `
varying vec3 vColor; varying float vAlpha;
void main(){
  float d = length(gl_PointCoord - 0.5);
  if (d > 0.5) discard;
  float a = pow(1.0 - d*2.0, 1.7);
  gl_FragColor = vec4(vColor, a * vAlpha);
}`;

const BG_FRAG = /* glsl */ `
varying vec2 vUv;
uniform float uTime, uAspect; uniform vec3 uBgA, uBgB; uniform vec2 uMouse;
float h(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7)))*43758.5453); }
float n(vec2 p){ vec2 i=floor(p), f=fract(p); f=f*f*(3.0-2.0*f);
  return mix(mix(h(i),h(i+vec2(1,0)),f.x), mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x), f.y); }
float fbm(vec2 p){ float v=0.0, a=0.5; for(int i=0;i<5;i++){ v+=a*n(p); p=p*2.03+17.0; a*=0.5; } return v; }
void main(){
  vec2 p = vUv*vec2(uAspect,1.0)*2.2 + uMouse*0.08;
  float q = fbm(p*0.8 - uTime*0.012);
  float k = fbm(p + vec2(uTime*0.02, 0.0) + q*1.6);
  float m = fbm(p*1.6 + 4.0 - q);
  vec3 col = vec3(0.039,0.047,0.063);
  col += uBgA * smoothstep(0.35, 0.95, k) * 0.55;
  col += uBgB * smoothstep(0.5, 1.0, m) * 0.35;
  col *= 0.55 + 0.6*smoothstep(1.2, 0.1, length(vUv - vec2(0.68, 0.5)));
  gl_FragColor = vec4(col, 1.0);
}`;

function rng(seed: number) {
  let s = seed;
  return () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646;
}

export function createLivingSystem(canvas: HTMLCanvasElement): LivingSystem {
  const small = window.innerWidth < 768;
  const N = small ? 14000 : 38000;
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, small ? 1.5 : 1.75));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 200);
  camera.position.set(0, 0, 13);
  const root = new THREE.Group();
  scene.add(root);

  // ---------- Formations ----------
  const r = rng(11);
  const g = () => (r() + r() + r() + r() - 2) * 0.87; // ~gaussian
  const P = Array.from({ length: 6 }, () => new Float32Array(N * 3));
  const T = Array.from({ length: 6 }, () => new Float32Array(N));
  const set = (k: number, i: number, x: number, y: number, z: number, t: number) => {
    const a = P[k]!;
    a[i * 3] = x; a[i * 3 + 1] = y; a[i * 3 + 2] = z;
    T[k]![i] = t;
  };
  const GOLD = Math.PI * (3 - Math.sqrt(5));

  for (let i = 0; i < N; i++) {
    const u = i / N;
    // 0 — spiral galaxy
    if (u < 0.14) set(0, i, g() * 0.6, g() * 0.32, g() * 0.6, 1);
    else {
      const rad = 0.4 + Math.pow(r(), 1.3) * 6.8;
      const arm = Math.floor(r() * 4);
      const th = arm * (Math.PI / 2) + rad * 0.95 + g() * 0.32 * (1.3 - rad / 8);
      set(0, i, Math.cos(th) * rad, g() * 0.12 * (1.2 - rad / 8), Math.sin(th) * rad, r() < 0.18 ? 0.5 : r() * 0.45 + (rad < 1.6 ? 0.35 : 0));
    }
    // 1 — earth
    if (u < 0.7) {
      const y = 1 - 2 * r(), a = r() * Math.PI * 2, s = Math.sqrt(1 - y * y);
      const x = Math.cos(a) * s, z = Math.sin(a) * s;
      const land = Math.sin(3 * x + 1) * Math.sin(3.4 * y) * Math.sin(2.7 * z + 2) + 0.45 * Math.sin(7 * x + 5 * z) * Math.sin(6 * y + 1);
      const R = 2.6 + (land > 0.12 ? 0.04 : 0);
      set(1, i, x * R, y * R, z * R, land > 0.12 ? 1 : 0);
    } else if (u < 0.9) {
      const y = 1 - 2 * r(), a = r() * Math.PI * 2, s = Math.sqrt(1 - y * y), R = 2.75 + r() * 0.4;
      set(1, i, Math.cos(a) * s * R, y * R, Math.sin(a) * s * R, 0.5);
    } else if (u < 0.95) set(1, i, 4.4 + g() * 0.22, 0.9 + g() * 0.22, g() * 0.22, 0.5);
    else { const a = r() * Math.PI * 2; set(1, i, Math.cos(a) * 3.7, g() * 0.03, Math.sin(a) * 3.7, 0.55); }
    // 2 — DNA double helix
    if (u < 0.58) {
      const t = r() * 2 - 1, s = r() < 0.5 ? 0 : 1, a = t * Math.PI * 7 + s * Math.PI;
      set(2, i, Math.cos(a) * 1.15 + g() * 0.05, t * 5, Math.sin(a) * 1.15 + g() * 0.05, s);
    } else if (u < 0.88) {
      const t = Math.floor(r() * 56) / 28 - 1, a = t * Math.PI * 7, v = r() * 2 - 1;
      set(2, i, Math.cos(a) * 1.15 * v, t * 5 + g() * 0.02, Math.sin(a) * 1.15 * v, 0.5);
    } else set(2, i, g() * 4, g() * 4, g() * 4, r());
    // 3 — bloom (phyllotaxis)
    if (u < 0.62) {
      const k = u / 0.62, rad = Math.sqrt(k) * 3, a = i * GOLD;
      set(3, i, Math.cos(a) * rad, -0.25 * rad * rad + 0.6, Math.sin(a) * rad, k * 0.6);
    } else {
      const pk = Math.floor(r() * 34), a = (pk / 34) * Math.PI * 2 + (pk % 2) * 0.09;
      const along = r(), rad = 3 + along * 2.4, w = Math.sin(along * Math.PI) * 0.38 * (r() * 2 - 1);
      set(3, i, Math.cos(a) * rad - Math.sin(a) * w, -1.6 + along * 0.9 + g() * 0.05, Math.sin(a) * rad + Math.cos(a) * w, 1);
    }
    // 4 — atom
    if (u < 0.12) set(4, i, g() * 0.38, g() * 0.38, g() * 0.38, 0);
    else if (u < 0.6) {
      const ring = Math.floor(r() * 3), a = r() * Math.PI * 2, R = 3.3 + g() * 0.06;
      let x = Math.cos(a) * R, y = g() * 0.05, z = Math.sin(a) * R;
      const tilt = (ring - 1) * 1.05;
      const y2 = y * Math.cos(tilt) - z * Math.sin(tilt); z = y * Math.sin(tilt) + z * Math.cos(tilt); y = y2;
      const rr = ring * 1.0; const x2 = x * Math.cos(rr) - z * Math.sin(rr); z = x * Math.sin(rr) + z * Math.cos(rr); x = x2;
      set(4, i, x, y, z, 1);
    } else {
      const ax = Math.floor(r() * 3), sg = r() < 0.5 ? -1 : 1, d = (0.9 + Math.abs(g()) * 1.2) * sg;
      const v = [g() * 0.5, g() * 0.5, g() * 0.5]; v[ax] = d;
      set(4, i, v[0]!, v[1]!, v[2]!, 0.5);
    }
    // 5 — black hole
    if (u < 0.74) {
      const rad = 1.45 + Math.pow(r(), 2) * 5.5, a = r() * Math.PI * 2;
      set(5, i, Math.cos(a) * rad, g() * 0.04 * rad, Math.sin(a) * rad, 1 - Math.min(1, (rad - 1.45) / 4));
    } else if (u < 0.86) {
      const a = r() * Math.PI * 2, R = 1.28 + g() * 0.025;
      set(5, i, Math.cos(a) * R, g() * 0.02, Math.sin(a) * R, 1);
    } else {
      const y = (r() < 0.5 ? -1 : 1) * (0.4 + Math.pow(r(), 1.5) * 7.5), w = 0.06 + Math.abs(y) * 0.045;
      set(5, i, g() * w, y, g() * w, 0.5);
    }
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(P[0]!, 3));
  P.forEach((p, k) => geo.setAttribute(`aP${k}`, new THREE.BufferAttribute(p, 3)));
  const rand = new Float32Array(N * 4);
  for (let i = 0; i < N * 4; i++) rand[i] = r();
  geo.setAttribute("aRand", new THREE.BufferAttribute(rand, 4));
  const t0 = new Float32Array(N * 3), t1 = new Float32Array(N * 3);
  for (let i = 0; i < N; i++) for (let j = 0; j < 3; j++) { t0[i * 3 + j] = T[j]![i]!; t1[i * 3 + j] = T[j + 3]![i]!; }
  geo.setAttribute("aT0", new THREE.BufferAttribute(t0, 3));
  geo.setAttribute("aT1", new THREE.BufferAttribute(t1, 3));

  const uniforms = {
    uP: { value: 0 }, uTime: { value: 0 }, uIntro: { value: 0 }, uPix: { value: 400 }, uSize: { value: small ? 0.075 : 0.06 },
    uAspect: { value: 1 }, uTanFov: { value: Math.tan(THREE.MathUtils.degToRad(21)) },
    uMouse: { value: new THREE.Vector2(9, 9) }, uShock: { value: new THREE.Vector2(9, 9) }, uShockT: { value: -100 },
    uColA: { value: PAL_A }, uColB: { value: PAL_B }, uColC: { value: PAL_C }, uSpin: { value: SPIN }, uRigid: { value: RIGID },
  };
  const mat = new THREE.ShaderMaterial({ vertexShader: VERT, fragmentShader: FRAG, uniforms, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending });
  const points = new THREE.Points(geo, mat);
  points.frustumCulled = false;
  root.add(points);

  // Nebula backdrop
  const bgU = { uTime: uniforms.uTime, uAspect: uniforms.uAspect, uMouse: { value: new THREE.Vector2() }, uBgA: { value: BG_A[0]!.clone() }, uBgB: { value: BG_B[0]!.clone() } };
  const bgMat = new THREE.ShaderMaterial({
    vertexShader: "varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.9999, 1.0); }",
    fragmentShader: BG_FRAG, uniforms: bgU, depthWrite: false, depthTest: false,
  });
  const bg = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), bgMat);
  bg.frustumCulled = false; bg.renderOrder = -1;
  scene.add(bg);

  // Distant stars
  const SN = small ? 600 : 1800;
  const sp = new Float32Array(SN * 3);
  for (let i = 0; i < SN; i++) { sp[i * 3] = (r() - 0.5) * 120; sp[i * 3 + 1] = (r() - 0.5) * 70; sp[i * 3 + 2] = -20 - r() * 40; }
  const sGeo = new THREE.BufferGeometry();
  sGeo.setAttribute("position", new THREE.BufferAttribute(sp, 3));
  const stars = new THREE.Points(sGeo, new THREE.PointsMaterial({ size: 1.4, sizeAttenuation: false, color: 0xf4f0e8, transparent: true, opacity: 0.6, depthWrite: false }));
  scene.add(stars);

  // ---------- Input ----------
  let target = 0, state = 0, reduced = false, time = 0;
  const mouse = { x: 9, y: 9, sx: 0, sy: 0, active: false };
  const onMove = (e: PointerEvent) => {
    mouse.x = (e.clientX / innerWidth) * 2 - 1; mouse.y = -((e.clientY / innerHeight) * 2 - 1); mouse.active = true;
  };
  const onDown = (e: PointerEvent) => {
    if ((e.target as HTMLElement).closest("a,button,dialog,input")) return;
    uniforms.uShock.value.set((e.clientX / innerWidth) * 2 - 1, -((e.clientY / innerHeight) * 2 - 1));
    uniforms.uShockT.value = time;
  };
  addEventListener("pointermove", onMove, { passive: true });
  addEventListener("pointerdown", onDown, { passive: true });

  const resize = () => {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h; camera.updateProjectionMatrix();
    uniforms.uAspect.value = w / h;
    uniforms.uPix.value = renderer.getDrawingBufferSize(new THREE.Vector2()).y / 2;
  };
  addEventListener("resize", resize);
  resize();

  const lerpArr = (arr: number[], s: number) => {
    const a = Math.min(Math.floor(s), arr.length - 2), f = s - a;
    return arr[a]! + (arr[a + 1]! - arr[a]!) * f;
  };
  const lerpCol = (out: THREE.Color, arr: THREE.Color[], s: number) => {
    const a = Math.min(Math.floor(s), arr.length - 2);
    return out.copy(arr[a]!).lerp(arr[a + 1]!, s - a);
  };

  const clock = new THREE.Clock();
  let raf = 0, running = true;
  const frame = () => {
    raf = 0;
    const dt = Math.min(clock.getDelta(), 0.05);
    if (!reduced) time += dt;
    uniforms.uTime.value = time;
    state = reduced ? target : state + (target - state) * (1 - Math.exp(-2.4 * dt));
    uniforms.uP.value = state;
    uniforms.uIntro.value = reduced ? 1 : Math.min(1, uniforms.uIntro.value + dt * 0.38);

    const k = 1 - Math.exp(-4 * dt);
    const mx = mouse.active ? mouse.x : 0, my = mouse.active ? mouse.y : 0;
    mouse.sx += (mx - mouse.sx) * k; mouse.sy += (my - mouse.sy) * k;
    uniforms.uMouse.value.set(mouse.active ? mouse.sx : 9, mouse.active ? mouse.sy : 9);
    bgU.uMouse.value.set(mouse.sx, mouse.sy);
    lerpCol(bgU.uBgA.value, BG_A, state);
    lerpCol(bgU.uBgB.value, BG_B, state);

    const burst = Math.sin((state - Math.floor(state)) * Math.PI);
    const wide = camera.aspect > 1.1;
    root.position.set(wide ? 2.7 : 0, wide ? 0 : -1.4, 0);
    root.scale.setScalar(wide ? 1 : 0.62);
    root.rotation.x = lerpArr(TILT_X, state) + mouse.sy * 0.15;
    root.rotation.z = lerpArr(TILT_Z, state);
    root.rotation.y = mouse.sx * 0.25 + burst * 0.6;
    camera.position.set(mouse.sx * 0.6, mouse.sy * 0.4, 13 - burst * 4);
    camera.lookAt(wide ? 1 : 0, 0, 0);
    stars.rotation.z = time * 0.004;

    renderer.render(scene, camera);
    if (running && (!reduced || Math.abs(target - state) > 0.001)) raf = requestAnimationFrame(frame);
  };
  const start = () => { if (!raf) { clock.getDelta(); raf = requestAnimationFrame(frame); } };
  const onVis = () => { running = !document.hidden; if (running) start(); };
  document.addEventListener("visibilitychange", onVis);
  start();

  return {
    setProgress(p) { target = p; start(); },
    setReducedMotion(v) { reduced = v; start(); },
    dispose() {
      running = false;
      cancelAnimationFrame(raf);
      removeEventListener("pointermove", onMove);
      removeEventListener("pointerdown", onDown);
      removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVis);
      geo.dispose(); mat.dispose(); bg.geometry.dispose(); bgMat.dispose(); sGeo.dispose(); (stars.material as THREE.Material).dispose();
      renderer.dispose();
    },
  };
}
