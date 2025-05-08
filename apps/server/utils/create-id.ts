// utils/create-id.ts
import { ulid } from "ulid";

/**
 * Generate a ULID (Universally Unique Lexicographically Sortable Identifier)
 */
export const createId = (): string => {
  return ulid();
};
