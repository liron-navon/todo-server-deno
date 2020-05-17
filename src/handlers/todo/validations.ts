import vs from "https://deno.land/x/value_schema/mod.ts";

const todoSchema = {
  text: vs.string({
    maxLength: {
      length: 80,
      trims: false,
    },
  }),
  done: vs.boolean(),
};

export const validateCreateTodo = (body: any): { text: string; } => {
  return vs.applySchemaObject({
    text: todoSchema.text,
  }, body);
}

export const validateUpdateTodo = (body: any): { text: string; done: boolean } => {
  return vs.applySchemaObject({
    text: todoSchema.text,
    done: todoSchema.done,
  }, body);
};
