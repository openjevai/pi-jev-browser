import { createTypesafePolicy } from "./typesafe.ts";
import type { ModelCall } from "./pi-model.ts";
import type { JevPolicy } from "./jev-model.ts";

export const OPENJEV_ENDPOINT = "https://api.openjev.sh/v1/systemone";
export const DEFAULT_OPENJEV_MODEL = "openjev";

/**
 * OpenJEV is a free community gateway to the same Jev model that TypeSafe
 * hosts. The request/response contract is identical, so this policy reuses
 * the TypeSafe transport with a different endpoint, model id, and key.
 * TypeSafe remains the default; OpenJEV is opt-in only.
 */
export function createOpenjevPolicy(options: {
	apiKey: string;
	model?: string;
	text: ModelCall;
	fetchImpl?: typeof fetch;
}): JevPolicy {
	return createTypesafePolicy({
		...options,
		endpoint: OPENJEV_ENDPOINT,
		model: options.model ?? DEFAULT_OPENJEV_MODEL,
	});
}
