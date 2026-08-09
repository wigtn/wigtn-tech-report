/**
 * How wide a figure is allowed to run inside the 820px text column.
 *
 * Shared by the report and the feed so a photograph is the same size on both.
 * The cap comes from the measured ratio rather than a hand-set flag, because
 * the failure it prevents is a portrait image rendering 1300px tall.
 *
 * Framing was tried and dropped: a fixed 16:10 box with a grey fill and
 * object-contain. The images here run from 0.64:1 to 3.18:1, so that box was
 * mostly empty for most of them. A chart is already a rectangle on white, and
 * framing it adds a second rectangle and nothing else.
 */
export function figureMaxWidth(figure: {
  width?: number;
  height?: number;
  portrait?: boolean;
}) {
  if (figure.portrait) return "max-w-[28rem]";
  if (!figure.width || !figure.height) return "max-w-[52rem]";
  const ratio = figure.width / figure.height;
  if (ratio < 1) return "max-w-[28rem]";
  if (ratio < 1.6) return "max-w-[42rem]";
  return "max-w-[52rem]";
}
