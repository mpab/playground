import './App.css';

import { useRef } from 'react';

//const HOOK_SVG = 'm129.03125 63.3125c0-34.914062-28.941406-63.3125-64.519531-63.3125-35.574219 0-64.511719 28.398438-64.511719 63.3125 0 29.488281 20.671875 54.246094 48.511719 61.261719v162.898437c0 53.222656 44.222656 96.527344 98.585937 96.527344h10.316406c54.363282 0 98.585938-43.304688 98.585938-96.527344v-95.640625c0-7.070312-4.640625-13.304687-11.414062-15.328125-6.769532-2.015625-14.082032.625-17.960938 6.535156l-42.328125 64.425782c-4.847656 7.390625-2.800781 17.3125 4.582031 22.167968 7.386719 4.832032 17.304688 2.792969 22.160156-4.585937l12.960938-19.71875v42.144531c0 35.582032-29.863281 64.527344-66.585938 64.527344h-10.316406c-36.714844 0-66.585937-28.945312-66.585937-64.527344v-162.898437c27.847656-7.015625 48.519531-31.773438 48.519531-61.261719zm-97.03125 0c0-17.265625 14.585938-31.3125 32.511719-31.3125 17.929687 0 32.511719 14.046875 32.511719 31.3125 0 17.261719-14.582032 31.3125-32.511719 31.3125-17.925781 0-32.511719-14.050781-32.511719-31.3125zm0 0';
//const HOOK_PATH = new Path2D(HOOK_SVG);
//const SCALE = 0.1;
//const OFFSET = 0;

interface ICanvasContext {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
}

interface IMouseEventContext {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  x: number;
  y: number;
}

function App() {

  const gameCanvasRef = useRef<HTMLCanvasElement>(null);
  const textCanvasRef = useRef<HTMLCanvasElement>(null);

  function getCanvasContext(element: React.RefObject<HTMLCanvasElement>): ICanvasContext | null {
    const canvas: HTMLCanvasElement | null = element.current; if (!canvas) return null;
    const context = canvas.getContext('2d'); if (!context) return null;
    return { canvas, context };
  }

  function getMouseLocation(e: { clientX: number; clientY: number; }): IMouseEventContext | null {
    let canvasContext = getCanvasContext(gameCanvasRef); if (!canvasContext) return null;

    var rect = canvasContext.canvas.getBoundingClientRect();
    return {
      canvas: canvasContext.canvas,
      context: canvasContext.context,
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  }

  function writeMessage(ctx: ICanvasContext, msg: string) {
    ctx.context.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.context.font = '18pt Calibri';
    ctx.context.fillStyle = 'black';
    ctx.context.fillText(msg, 10, 25);
  }

  function drawPoint(ctx: IMouseEventContext) {
    var pointSize = 1;
    ctx.context.fillStyle = "#ff2626"; // Red color
    ctx.context.beginPath(); //Start path
    ctx.context.arc(ctx.x, ctx.y, pointSize, 0, Math.PI * 2, true); // Draw a point using the arc function of the canvas with a point structure.
    ctx.context.fill(); // Close the path and fill.
  }

  function onClickHandler(e: { clientX: number; clientY: number; }) {
    
    let ctx = getMouseLocation(e); if (!ctx) return;
    console.log("x=" + ~~ctx.x + ", y=" + ~~ctx.y);

    drawPoint(ctx);
  }

  function onMouseMoveHandler(e: { clientX: number; clientY: number; }) {
    let ctx1 = getMouseLocation(e); if (!ctx1) return;
    let msg = 'Mouse position: (' + ~~ctx1.x + ', ' + ~~ctx1.y + ')';
    console.log(msg);

    let ctx2 = getCanvasContext(textCanvasRef); if (!ctx2) return;
    writeMessage(ctx2, msg);
  }
  
  function handleClear() {
    let canvasContext = getCanvasContext(gameCanvasRef); if (!canvasContext) return;
    canvasContext.context.clearRect(0, 0, canvasContext.canvas.width, canvasContext.canvas.height);
  }
  
  return (
    <div className="App">
      <button onClick={handleClear}>Clear</button>
      <p>
      <canvas
        ref={gameCanvasRef}
        width="640px"
        height="400px"
        onClick={onClickHandler}
        onMouseMove={onMouseMoveHandler}
      />
      </p>
      <p>
      <canvas
        ref={textCanvasRef}
        width="640px"
        height="32px"
      />
      </p>
      <header className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
      </header>
    </div>
  );
}

export default App;
