import vs from "https://deno.land/x/value_schema/mod.ts";

const userSchema = {
  email: vs.string({
    pattern: vs.STRING.PATTERN.EMAIL,
  }),
  password: vs.string({
    minLength: 8,
    // requires the password must contain: 1 lower letter, 1 capital letter, 1 number and 1 special character
    // pattern: RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])"),
  }),
};

export const validateUser = (
  body: any,
): { password: string; email: string } => {
  return vs.applySchemaObject({
    email: userSchema.email,
    password: userSchema.password,
  }, body);
};
