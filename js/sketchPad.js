class SketchPad {

    constructor(container,size=null){

        if(size===null){
            size=Math.min(
                window.innerWidth*0.9,
                400
            );
        }

        this.canvas=document.createElement("canvas");

        this.canvas.width=size;
        this.canvas.height=size;

        this.canvas.style=`
            background-color:white;
            box-shadow:0px 0px 10px 2px black;
            touch-action:none;
            max-width:90vw;
        `;

        container.appendChild(this.canvas);

        container.appendChild(
            document.createElement("br")
        );

        this.undoBtn=
            document.createElement("button");

        this.undoBtn.innerHTML="UNDO";

        container.appendChild(
            this.undoBtn
        );

        this.clearBtn=
            document.createElement("button");

        this.clearBtn.innerHTML="CLEAR";

        container.appendChild(
            this.clearBtn
        );

        this.ctx=
            this.canvas.getContext("2d");

        this.reset();

        this.#addEventListeners();
    }

    reset(){

        this.paths=[];

        this.isDrawing=false;

        this.#redraw();
    }

#addEventListeners(){

    this.canvas.addEventListener("pointerdown",(evt)=>{

        evt.preventDefault();

        const point=this.#getMouse(evt);

        this.paths.push([point]);

        this.isDrawing=true;
    });

    this.canvas.addEventListener("pointermove",(evt)=>{

        if(!this.isDrawing){
            return;
        }

        evt.preventDefault();

        const point=this.#getMouse(evt);

        const lastPath=
            this.paths[this.paths.length-1];

        lastPath.push(point);

        this.#redraw();
    });

    const stopDrawing=()=>{

        this.isDrawing=false;
    };

    this.canvas.addEventListener(
        "pointerup",
        stopDrawing
    );

    this.canvas.addEventListener(
        "pointercancel",
        stopDrawing
    );

    this.canvas.addEventListener(
        "pointerleave",
        stopDrawing
    );

    this.undoBtn.onclick=()=>{

        if(this.paths.length===0){
            return;
        }

        this.paths.pop();

        this.#redraw();
    };

    this.clearBtn.onclick=()=>{

        this.reset();
    };
}

    #redraw(){

        this.ctx.clearRect(
            0,
            0,
            this.canvas.width,
            this.canvas.height
        );

        draw.paths(
            this.ctx,
            this.paths
        );

        const hasDrawing=
            this.paths.length>0;

        this.undoBtn.disabled=
            !hasDrawing;

        this.clearBtn.disabled=
            !hasDrawing;
    }

    #getMouse=(evt)=>{

        const rect=
            this.canvas.getBoundingClientRect();

        return [
            Math.round(
                evt.clientX-rect.left
            ),
            Math.round(
                evt.clientY-rect.top
            )
        ];
    };
}