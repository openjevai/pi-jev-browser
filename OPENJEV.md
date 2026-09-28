# OpenJEV Support

This fork adds optional [OpenJEV](https://openjev.sh) support alongside the
existing TypeSafe API integration. TypeSafe remains the default; OpenJEV is
opt-in only.

## What was added

- `src/openjev.ts` — `OPENJEV_ENDPOINT`, `DEFAULT_OPENJEV_MODEL`, and
  `createOpenjevPolicy()`. Reuses the TypeSafe transport with a different
  endpoint, model id, and key.
- `src/credentials.ts` — `readOpenjevCredentials()` reads `OPENJEV_API_KEY`
  (env) or `openjev.apiKey` (config file), and `OPENJEV_MODEL` / `openjev.model`.
- `src/types.ts` — `"openjev"` added to `PolicyName`.
- `src/config.ts` — `"openjev"` accepted as a `policy` value.
- `src/typesafe.ts` — optional `endpoint` parameter added to
  `createTypesafePolicy()` (defaults to `TYPESAFE_ENDPOINT`; no behaviour change
  for existing callers).
- `extensions/jev-browser.ts` — `policyFor()` wires up the `openjev` policy.
- `src/jev-run.ts` — HTTP 503 added to `throttleCategory()` as `overloaded`.
- `pi-jev-browser.config.example.json` — `openjev` config section added.
- `README.md` — OpenJEV note, policy table row, config table rows, and
  throttling docs updated.

## Provider selection rule

1. **Explicit choice wins**: set `policy: "openjev"` in
   `pi-jev-browser.config.json` to use OpenJEV.
2. **Otherwise, if the TypeSafe key is set** → TypeSafe (default unchanged).
3. **Otherwise, if only `OPENJEV_API_KEY` is set** → OpenJEV.

Anyone with a TypeSafe key sees zero behaviour change.

## How to configure

Set `policy` to `"openjev"` in `~/.pi/agent/pi-jev-browser.config.json` and
provide either `OPENJEV_API_KEY` in the environment or `openjev.apiKey` in the
config file. Get a key at https://openjev.sh/dashboard.

```json
{
  "policy": "openjev",
  "openjev": {
    "apiKey": "your-openjev-key"
  }
}
```

## How it was verified

A live POST to `https://api.openjev.sh/v1/systemone` with model `openjev`,
state `ping`, and one noul question returned HTTP 200. No repository code was
executed.

## Upstream

Original project: https://github.com/yibie/pi-jev-browser by @yibie
