const gameValues = {
    pets: 0
}

const objects = {
    img: document.getElementById('dog_img')
}

const paths = {
    dog_awake: "img/dog.gif",
    dog_sleep: "img/dog_sleeping.gif"
}

const utils = {
    setSize: (img, width, height) => {
        img.width = width;
        img.height = height;
        img.style.width = width + "px";
        img.style.height = height + "px";
    }
}

const display = {
    pets: () => {
        document.getElementById('pets_count').innerHTML = gameValues.pets;
    },
    dog_state: () => {
        if(gameValues.pets >= 200) {
            objects.img.src = paths.dog_sleep;
        } else {
            objects.img.src = paths.dog_awake;
        }
    },
    dog_animation: () => {
        var multiplier = 1;
        var counter = 0;
        var max = 15;
        var sizeStart = {width: 115, height: 95};
        try {
            clearInterval(animationInterval);
        } catch(e) {
            console.log("resetAnimation");
            utils.setSize(objects.img, sizeStart.width, sizeStart.height)
        }
        var animationInterval = setInterval(()=>{
            counter += multiplier;
            utils.setSize(objects.img, sizeStart.width + counter, sizeStart.height + counter)
            if(counter >= max) {
                multiplier -= 1;
            } else if(counter == 0) {
                clearInterval(animationInterval);
            }
        }, 1)
    }
}

const setup = {
    clickevent: () => {
        objects.img.addEventListener('click', () => {
            gameValues.pets++;
            display.pets();
            display.dog_state();
            display.dog_animation();
        });
    },
    full: () => {
        setup.clickevent();
        display.pets();
    }
}

window.onload = setup.full;