export interface ICanvasContext {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
}

export interface IMouseEventContext {
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  x: number;
  y: number;
}

export function getCanvasContext(
  element: React.RefObject<HTMLCanvasElement>
): ICanvasContext | null {
  const canvas: HTMLCanvasElement | null = element.current;
  if (!canvas) return null;
  const context = canvas.getContext("2d");
  if (!context) return null;
  return { canvas, context };
}

export function getMouseLocation(
  element: React.RefObject<HTMLCanvasElement>,
  e: { clientX: number; clientY: number }
): IMouseEventContext | null {
  let canvasContext = getCanvasContext(element);
  if (!canvasContext) return null;

  var rect = canvasContext.canvas.getBoundingClientRect();
  return {
    canvas: canvasContext.canvas,
    context: canvasContext.context,
    x: e.clientX - rect.left,
    y: e.clientY - rect.top,
  };
}

export function writeMessage(ctx: ICanvasContext, msg: string) {
  ctx.context.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  ctx.context.font = "18pt Calibri";
  ctx.context.fillStyle = "black";
  ctx.context.fillText(msg, 10, 25);
}

export function drawPoint(ctx: IMouseEventContext) {
  var pointSize = 1;
  ctx.context.fillStyle = "#ff2626"; // Red color
  ctx.context.beginPath(); //Start path
  ctx.context.arc(ctx.x, ctx.y, pointSize, 0, Math.PI * 2, true); // Draw a point using the arc function of the canvas with a point structure.
  ctx.context.fill(); // Close the path and fill.
}
