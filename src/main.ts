import { AppModule } from './app.module';
import moment from 'moment-mini';
import * as dotenv from 'dotenv';
import { DiscordClient } from './infra/discord/discordClient';
import { CronsService } from './infra/crons.service';
import { TextChannelService } from './infra/discord/textChannel.service';
import { Cron } from './cron';
import { CommandsRegisterer } from './commands/registerer/commandsRegisterer';
import { ACommand } from './commands/handlers/command';
import { CommandInteraction, Events, Interaction, Message } from 'discord.js';

dotenv.config();

/**
 * Warning:
 * The "noUnusedLocals" parameter in tsconfig is set to "false" in order for the commented examples to work if you uncomment them.
 * It's strongly recommended to set it to "true" if you use this template as a base for your project.
 */

const injector = AppModule.getInjector();

const discordClient = injector.get(DiscordClient);
const commandsRegisterer = injector.get(CommandsRegisterer);
const cronsService = injector.get(CronsService);
const textChannelService = injector.get(TextChannelService);

discordClient.once(Events.ClientReady, () => {
    console.log(`Logged in as ${discordClient.user.tag} - ${moment().toISOString()}`);

    // Add all commands to the client
    commandsRegisterer.commands.forEach(
        (command: ACommand) => discordClient.commands.set(command.name, command)
    );

    // Send a message once in a specific channel
    textChannelService.sendMessage('kimida-test', 'Lorem ipsum dolor sit amet').subscribe(
        (message: string) => {
            console.log(`Message sent: ${message}`);
        }
    );

    // Send a message periodically via cron in a specific channel
    /*cronsService.createCron('every-10-seconds', () => {
        textChannelService.sendMessage('kimida-test', 'Lorem ipsum dolor sit amet').subscribe(
            (message: string) => {
                console.log(`Message sent: ${message}`);
            }
        );
    }).subscribe(
        (cron: Cron) => cron.start()
    );*/
});

discordClient.on(Events.InteractionCreate, async (interaction: Interaction) => {
    const commandInteraction = interaction as CommandInteraction;
    const command = interaction.client.commands.get(commandInteraction.commandName);
    if (!command) {
        console.error(`No command matching ${commandInteraction.commandName} was found.`);
        return;
    }

    try {
        command.execute(interaction);
    }
    catch (error) {
        console.error(error);
        commandInteraction.reply({ content: 'There was an error while executing this command!', ephemeral: true }).then(() => { });
    }
});

discordClient.on(Events.MessageCreate, (message: Message) => {
    if (message.author.id === process.env.KIMIDA_ID) {
        // React
        message.react('🐱');
        // Custom react
        // message.react(discordClient.emojis.cache.find((emoji: any) => emoji.name === 'my-custom-emote'));
        // Ordered chained reacts
        /* message.react('😺')
            .then(() => message.react('😼'))
            .then(() => message.react('🙀')); */
    }
})

// Your Discord bot token here
discordClient.login(process.env.TOKEN);
