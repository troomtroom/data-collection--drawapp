// Namespace containing drawing helper functions
const draw = {};

// Draw a single path/stroke.

draw.path = (context, path, color = "black") => {

    // Safety check
    if (!Array.isArray(path) || path.length === 0) {
        return;
    }

    // Line appearance settings
    context.strokeStyle = color;
    context.lineWidth = 4;

    // Rounded line ends
    context.lineCap = "round";

    // Rounded corners between segments
    context.lineJoin = "round";

    // Begin a new drawing path
    context.beginPath();

    // Move drawing cursor to first point
    context.moveTo(...path[0]);

    /*
        Connect every point to the previous one.
    */
    for (let i = 1; i < path.length; i++) {
        context.lineTo(...path[i]);
    }

    // Render the path onto the canvas
    context.stroke();
};


// Draw multiple paths.

draw.paths = (context, paths, color = "black") => {

    // Draw each stroke individually
    for (const path of paths) {
        draw.path(context, path, color);
    }
};

if(typeof module!=='undefined'){
    module.exports=draw;
}