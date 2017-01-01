function loadImage() {
    var image = document.querySelector('#image');
    var file = document.querySelector('input[type=file]').files[0];
    var fileReader = new FileReader();

    fileReader.addEventListener("load", function() {
        image.src = fileReader.result;
    });

    if (file) {
        fileReader.readAsDataURL(file);
    }
}

const inputs = document.querySelectorAll('#controls input');

function updateImage() {
    const unit = this.dataset.units || '';
    document.documentElement.style.setProperty(`--${this.name}`, this.value + unit);
}

inputs.forEach(input => input.addEventListener('change', updateImage));
inputs.forEach(input => input.addEventListener('mousemove', updateImage));