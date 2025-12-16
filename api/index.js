let reqHandler;

export default async function handler(req, res) {
  if (!reqHandler) {
    const mod = await import('../dist/money-transfers/server/server.mjs');

    reqHandler = mod.reqHandler;

    if (typeof reqHandler !== 'function') {
      throw new Error(
        'reqHandler not found. Exports: ' + Object.keys(mod).join(', ')
      );
    }
  }

  return reqHandler(req, res);
}
