import { CommandsRegisterer } from "./commands/registerer/commandsRegisterer";

const commandsRegisterer = new CommandsRegisterer();

commandsRegisterer.run().then(
    data => console.log(`Successfully reloaded ${data.length} application (/) commands.`)
);
