(function () {
    debugger
    var pressedKeys = {};

    function setKey(event, status) {
        var code = event.keyCode;
        var key;

        debugger
        switch (code) {
            case 32:
                key = 'SHOOT'; break;
            case 85:
                key = 'ABILITY'; break;
            case 65:
                key = 'LEFT'; break;
            case 87:
                key = 'UP'; break;
            case 68:
                key = 'RIGHT'; break;
            case 83:
                key = 'DOWN'; break;
            default:
                // Convert ASCII codes to letters
                key = String.fromCharCode(code);
        }

        pressedKeys[key] = status;
    }

    document.addEventListener('keydown', function (e) {
        debugger
        setKey(e, true);
    });

    document.addEventListener('keyup', function (e) {
        setKey(e, false);
    });

    window.addEventListener('blur', function () {
        pressedKeys = {};
    });

    window.input = {
        isPressed: function (key) {
            return pressedKeys[key.toUpperCase()];
        }
    };
})();