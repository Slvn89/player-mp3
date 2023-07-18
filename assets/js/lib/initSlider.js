

function initSlider(playlist, track, direction, effect) {
    console.log("initialisation du slider");
    console.dir(playlist);
    //ici je récupère l'url de l'image à afficher dans mon slider
    console.dir(playlist[track].cover)

    let trackB = null;
    // la condition if vérifie si une opération est vraie(true)
    if (direction/* === true*/) {
        trackB = track + 1;
    } else {
        trackB = playlist.length - 1;
    }
    const slider = document.querySelector("#slider");
    const imageA = document.createElement("img");
    imageA.id = "imageA";
    imageA.src = playlist[track].cover;
    imageA.alt = playlist[track].artist;
    imageA.style.zIndex = "2";
    slider.append(imageA);

    //creation d'une balise texte texteA

    //    texteA.innerText = playlist[track].title + "/" + playlist[track].artist;
    const texteA = document.createElement("p");
    texteA.id = "texteA";
    texteA.innerHTML = "<p>" + playlist[track].title + "</p><p>" + playlist[track].artist + "</p>";
    texteA.style.zIndex = "3";
    slider.append(texteA);

    // imageB


    const imageB = document.createElement("img");

    imageB.id = "imageB";
    imageB.src = playlist[trackB].cover;
    imageB.alt = playlist[trackB].artist;
    imageB.style.zIndex = "0"
    slider.append(imageB);




    //creation d'une balise texte texteB

    //    texteB.innerText = playlist[track].title + "/" + playlist[track].artist;
    const texteB = document.createElement("p");
    texteB.id = "texteB";
    texteB.innerHTML = "<p>" + playlist[trackB].title + "</p><p>" + playlist[trackB].artist + "</p>";
    texteB.style.zIndex = "1"

    slider.append(texteB);


    //j'aimerai connaitre le height de mon imageA, mais je dois d'abord attendre que cette image soit uploadée
    setTimeout(() => {
        console.dir(imageA.height);
        slider.style.height = imageA.clientHeight + "px";
    }, 500);


    // Toutes les 5 secondes je souhaite faire disparaitre l'imageA et le texteA pour faire apparaitre l'imageB et le texteB
    // situé en dessous




    setInterval(() => {
        //ajouter ma transition
        imageA.classList.add("trans");
        texteA.classList.add("trans");
        imageA.classList.add(effect);
        texteA.classList.add(effect);
        //j'attends la fin de ma transition pour la suite
        setTimeout(() => {
            if (direction) {
                //je commence par incrémenter track 
                if (trackB === playlist.length - 1) {
                    trackB = 0;
                } else {
                    trackB++;
                }
                if (track == playlist.length - 1) {
                    track = 0;
                } else {
                    track++;
                }

            } else {
                if (trackB === 0) {
                    trackB = playlist.length - 1
                } else {
                    trackB--;
                }
                if (track === 0) {
                    track = playlist.length - 1
                } else {
                    track--;
                }
            }

            imageA.src = playlist[track].cover;

            imageA.alt = playlist[track].artist;
            texteA.innerHTML = "<p>" + playlist[track].title + "</p><p>" + playlist[track].artist + "</p>";

            //je dois retirer la transition
            imageA.classList.remove("trans");
            texteA.classList.remove("trans");
            imageA.classList.remove(effect);
            texteA.classList.remove(effect);
            imageB.src = playlist[trackB].cover;
            imageB.alt = playlist[trackB].artist;
            texteB.innerHTML = "<p>" + playlist[trackB].title + "</p><p>" + playlist[trackB].artist + "</p>";

        }, 500);

    }, 3000

    );

};


export { initSlider }

