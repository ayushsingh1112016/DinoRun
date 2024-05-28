window.onload = function() {
    const canvas = document.getElementById('gameCanvas');
    const context = canvas.getContext('2d');
    const canvasWidth = 800;
    const canvasHeight = 200;

    const dropdown = document.getElementById('character');
    let value = dropdown.value;
    let character = new Image();
    character.src = value + '.png';
    const dimension = [
        {src: 'dinoRun', w: 172 / 2, h: 90}, 
        {src: 'duck', w: 232 / 2, h: 54}, 
        {src: 'crow', w: 90, h: 80}
    ];

    let grond1 = new Image();
    grond1.src = 'ground1.png';
    let grond2 = new Image();
    grond2.src = 'ground2.png';
    
    let px, py;
    function setDimensions(value) {
        for (let i = 0; i < dimension.length; i++) {
            if (dimension[i].src === value) {
                px = dimension[i].w;
                py = dimension[i].h;
                break;
            }
        }
    }
    setDimensions(value);

    let toggle = 0; // To toggle between 0 and px
    let lastFrameChangeTime = 0;
    const frameInterval = 5;
    var x = 0;
    var y = 0;
    var y2 = 2404;
    var z = 0;
    character.onload = function() {
        function animate() {
            context.clearRect(0, 0, canvasWidth, canvasHeight);
            context.drawImage(character, toggle ? px : 0, 0, px, py, 50, canvasHeight-py-z , px*.7 , py*.7);
            context.drawImage(grond1, y,canvasHeight-40, 2404, 18)
            context.drawImage(grond2, y2,canvasHeight-40, 2404, 18)
            if (x - lastFrameChangeTime >= frameInterval) {
                toggle = !toggle; // Toggle between 0 and px
                lastFrameChangeTime = x;
            }
            x++;
            if(y <= -2404) y = y2 + 2404;
            else y= y-10;
            if(y2 <= -2404) y2 = y + 2404;
            else y2 =  y2-10; 
            requestAnimationFrame(animate);
        }
        animate();
    }

    dropdown.addEventListener('change', function() {
        value = dropdown.value;
        character.src = value + '.png';
        setDimensions(value);
        if(value == 'duck') z= 10;
        else z = 0;
        toggle = 0; // Reset toggle when changing character
    });
}
