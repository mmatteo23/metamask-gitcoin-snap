import type { LoadApiKeyParams } from './types';

/**
 * Checks if the request is a valid load API key request.
 * @param request - The request object.
 */
export function isValidLoadApiKeyRequest(
  request: LoadApiKeyParams | undefined,
) {
  if (
    !request?.apiKey ||
    typeof request.apiKey !== 'string' ||
    request.apiKey.length === 0
  ) {
    throw new Error('Invalid API key!');
  }
}
