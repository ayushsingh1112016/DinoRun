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

    character.onload = function() {
        function animate() {
            context.clearRect(0, 0, canvasWidth, canvasHeight);
            context.drawImage(character, toggle ? px : 0, 0, px, py, 0, canvasHeight-py , px , py );
            if (x - lastFrameChangeTime >= frameInterval) {
                toggle = !toggle; // Toggle between 0 and px
                lastFrameChangeTime = x;
            }
            x++;
            requestAnimationFrame(animate);
        }
        animate(0);
    }

    dropdown.addEventListener('change', function() {
        value = dropdown.value;
        character.src = value + '.png';
        setDimensions(value);
        toggle = 0; // Reset toggle when changing character
    });
}
