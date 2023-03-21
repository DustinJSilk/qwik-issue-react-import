import { createQwikCity } from "@builder.io/qwik-city/middleware/node";
import qwikCityPlan from "@qwik-city-plan";
import { IncomingMessage, ServerResponse, STATUS_CODES } from "http";
import render from "./entry.ssr";

const { router, notFound, staticFile } = createQwikCity({
  render,
  qwikCityPlan,
});

function onError(
  err: any,
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage>
) {
  const code = (res.statusCode = Number(err.code || err.status) || 500);
  res.end(STATUS_CODES[code]);
}

type MiddlewareFn = (
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage>,
  next: (err: any) => void
) => void;

const middleware: MiddlewareFn[] = [staticFile, router, notFound];

export const handler = (
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage>
) => {
  let i = 0;
  const len = middleware.length;

  const next = (err: any) => (err ? onError(err, req, res) : loop());
  const loop = () =>
    res.writableEnded || (i < len && middleware[i++](req, res, next));

  loop();
};
