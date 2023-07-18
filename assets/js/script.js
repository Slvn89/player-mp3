// lorsque j'importe un ou plusieurs
// élémentHTML je le fais yjs en début de script
import {initSlider } from "./lib/initSlider.js";
import { playlist_hiphop } from "./lib/playlist_hiphop.js";
//initialisation de mes variables
let currentTrack = 0;

console.dir(playlist_hiphop);
console.log("Hello");
initSlider(playlist_hiphop,currentTrack, false, "fadeOut");
