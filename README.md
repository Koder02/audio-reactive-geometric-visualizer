# 🎵 Audio Reactive Geometric Visualizer

A **p5.js generative art experiment** that transforms music into an evolving composition of geometric shapes.

The visualization uses different parts of the audio spectrum to control **motion, scale, brightness, and visual complexity**.

## 🎥 Preview

![Audio Reactive Visualizer](assets/demo.gif)

## ✨ Features

* 🎵 Real-time audio analysis using `p5.FFT`
* 🔊 **Bass** → scale & movement
* 🎚️ **Mid frequencies** → recursion & shape complexity
* ✨ **Treble** → brightness
* 🔷 Generative geometric shapes
* 🧩 Recursive grid subdivision
* 🎨 Limited custom color palette

## 🛠️ Built With

`p5.js` · `p5.sound` · `JavaScript` · `HTML` · `CSS`

## 🧠 How It Works

```text
Music
  ↓
p5.FFT Audio Analysis
  ↓
Bass · Mid · Treble
  ↓
Visual Properties
  ↓
Generative Geometry
```

Instead of creating a fixed animation, the audio acts as a **control system**, continuously changing the visual composition.

## 🎨 Visual System

The project combines:

* Stars
* Circles
* Diamonds
* Abstract geometric forms
* Recursive `2 × 2` grid subdivisions

A fixed random seed provides a consistent underlying composition while the audio controls how it behaves.

## 🚀 Run Locally

Clone the repository and open `index.html` using a local server such as **VS Code Live Server**.

Click the canvas to start/pause the audio and visualizer.

## 🌱 What I Explored

* FFT audio analysis
* Generative art
* Recursive functions
* Procedural geometry
* Audio-to-visual mapping
* Real-time visual systems

## 👤 About

**Krishna Patel**

BCA student exploring **Creative Coding, Interactive Design, Computer Vision & AI**.

> **Sound becomes data. Data becomes visuals.**
