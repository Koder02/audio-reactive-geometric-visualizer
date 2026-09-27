let song, fft;

let paleta_fundo = "#1d1d1b";
let paleta_contorno = "#f2f2e7";
let paleta_cores = [
  "#ffb000",
  "#ff4200",
  "#7da030",
  "#ff99cc",
  "#1d1d1b",
  "#f2f2e7",
];

let seno_escala = 0.01;

let grade_coluna_qtd;
let grade_linha_qtd;
let semente;

function preload() {
  song = loadSound("music.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  strokeJoin(ROUND);

  fft = new p5.FFT(0.8, 1024);

  grade_coluna_qtd = floor(random(3, 7));
  let modulo_tamanho = width / grade_coluna_qtd;
  grade_linha_qtd = ceil(height / modulo_tamanho);

  semente = random(1000);
}

function draw() {
  background(paleta_fundo);
  randomSeed(semente);

  fft.analyze();
  let bass = fft.getEnergy("bass");
  let mid = fft.getEnergy("mid");
  let treble = fft.getEnergy("treble");

  grade(0, 0, grade_coluna_qtd, grade_linha_qtd, width, bass, mid, treble);
}

// ================================

function grade(
  x_inicial,
  y_inicial,
  coluna_qtd,
  linha_qtd,
  largura_total,
  bass,
  mid,
  treble
) {
  stroke(paleta_contorno);
  strokeWeight(2);

  let modulo_tamanho = largura_total / coluna_qtd;
  let movimento_diferencial = 0;

  for (let j = 0; j < linha_qtd; j++) {
    for (let i = 0; i < coluna_qtd; i++) {
      let x = x_inicial + i * modulo_tamanho;
      let y = y_inicial + j * modulo_tamanho;

      let cor_indice = floor(random(paleta_cores.length - 1));

      // Brightness reacts to treble
      let brilho = map(treble, 0, 255, 70, 100);
      fill(color(paleta_cores[cor_indice] + hex(floor(brilho * 2), 2)));

      rect(x, y, modulo_tamanho, modulo_tamanho);

      fill(paleta_cores[(cor_indice + 1) % paleta_cores.length]);

      // Bass controls pulse
      let movimento = map(
        sin(frameCount * seno_escala + movimento_diferencial),
        -1,
        1,
        0,
        map(bass, 0, 255, 0.3, 1.2)
      );

      let seletor = floor(random(9));

      if (seletor === 0) {
        let raio_externo = modulo_tamanho / 2 - 5;
        let raio_interno = raio_externo * movimento;
        let pontas_qtd = [4, 6, 8, 10, 12][floor(random(5))];
        estrela(
          x + modulo_tamanho / 2,
          y + modulo_tamanho / 2,
          raio_interno,
          raio_externo,
          pontas_qtd,
          0
        );
      }

      if (seletor === 1) {
        let diametro = random(modulo_tamanho / 2, modulo_tamanho) * movimento;
        circle(x + modulo_tamanho / 2, y + modulo_tamanho / 2, diametro);
      }

      if (seletor === 2) {
        let pontas = [3, 5, 7, 9][floor(random(4))];
        let pontas_altura = map(mid, 0, 255, 0.2, 0.9);
        coroa_dupla(
          x,
          y,
          modulo_tamanho,
          modulo_tamanho,
          pontas,
          pontas_altura
        );
      }

      if (seletor === 3) {
        let haste_largura = map(mid, 0, 255, 0.2, 0.9);
        machado(x, y, modulo_tamanho, modulo_tamanho, haste_largura);
      }

      if (seletor === 4) {
        let abertura_largura = random(0.4, 1) * movimento;
        losango(x, y, modulo_tamanho, modulo_tamanho, abertura_largura);
      }

      // Mid controls recursion depth
      if (seletor >= 5 && modulo_tamanho > map(mid, 0, 255, 40, 120)) {
        grade(x, y, 2, 2, modulo_tamanho, bass, mid, treble);
      }

      movimento_diferencial++;
    }
  }
}

// ================================
// SHAPES

function estrela(x, y, ri, re, pontas, angulo) {
  let step = TWO_PI / pontas;
  beginShape();
  for (let i = 0; i < pontas; i++) {
    let a = angulo + step * i;
    vertex(x + cos(a) * ri, y + sin(a) * ri);
    vertex(x + cos(a + step / 2) * re, y + sin(a + step / 2) * re);
  }
  endShape(CLOSE);
}

function coroa_dupla(x, y, w, h, pontas, altura_rel) {
  let alt = (h * altura_rel) / 2;
  let step = w / (pontas - 1);
  beginShape();
  for (let i = 0; i < pontas; i++) {
    vertex(x + i * step, i % 2 ? y + alt : y);
  }
  for (let i = 0; i < pontas; i++) {
    vertex(x + w - i * step, i % 2 ? y + h - alt : y + h);
  }
  endShape(CLOSE);
}

function machado(x, y, w, h, r) {
  let lw = (w * r) / 2;
  beginShape();
  vertex(x, y);
  vertex(x + lw, y + lw);
  vertex(x + lw, y);
  vertex(x + w - lw, y);
  vertex(x + w - lw, y + lw);
  vertex(x + w, y);
  vertex(x + w, y + h);
  vertex(x + w - lw, y + h - lw);
  vertex(x + w - lw, y + h);
  vertex(x + lw, y + h);
  vertex(x + lw, y + h - lw);
  vertex(x, y + h);
  endShape(CLOSE);
}

function losango(x, y, w, h, r) {
  let a = (w * r) / 2;
  beginShape();
  vertex(x + a, y + h / 2);
  vertex(x + w / 2, y);
  vertex(x + w - a, y + h / 2);
  vertex(x + w / 2, y + h);
  endShape(CLOSE);
}

// ================================

function mousePressed() {
  if (song.isPlaying()) song.pause();
  else song.loop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
