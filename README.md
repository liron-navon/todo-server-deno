# todo-server-deno

## Topics that needs to be covered

- covering typescript, since deno is pure typescript

- deno under the hood - using tokio library (instead of libuv), compiles typescript directly which means slower compile time, but faster runtime...

- the deno ecosystem, no npm, we use deno/x

- the deno cli

- how to write tests in deno

## Libraries used:

### **mock**
a library used to spy on functions and create stubs for tests

### **dotenv**
a library used to read .env file and manage environment variables

### **value_schema** 
similar to node's joi, used to validate input

### **mongo** 
mongodb implementation based on rust

### **bcrypt**, **uuid** (from std), **djwt** (jwt implementation)
how to authenticate, manage distributed sessions with cookies, and proper authentication

### **Oak**
express like library, context based (influenced from GO)

### **Denon**
script runner for deno, like nodemon

to install globally, you need to add "$HOME/.deno/bin" to path variable so denon packages can be used globally
##### could be different in windows/linux, show how to find it using "denon install --help"

## Start project:

- `denon` (requires denon to be installed)

- `deno run --allow-all --unstable src/index.ts` runnin quickly (unsafe), the unstable flag is for the deno plugins feature (used by mongodb)
# todo-server-deno
