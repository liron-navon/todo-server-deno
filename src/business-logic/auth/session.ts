import { v1 } from "https://deno.land/std/uuid/mod.ts";

// we use the v1 uuid here, it creates a unique string based on time, machine and randomness
// we use it to identify the user with, uuid stands for 'universally unique identifier'
export const createSessionId = () => v1.generate().toString();
