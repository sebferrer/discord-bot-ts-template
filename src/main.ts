import { Client, GatewayIntentBits, Partials, TextChannel } from 'discord.js';
import moment from 'moment-mini';
import * as dotenv from 'dotenv';
import { ChannelsService } from './infra/channels.service';
import { CronsService } from './infra/crons.service';

const client = new Client({
    intents: [
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildBans,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.DirectMessageReactions
    ],
    'partials': [
        Partials.Channel
    ]
});

const channelsService = new ChannelsService();
const cronsService = new CronsService();

dotenv.config();

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag} - ${moment().toISOString()}`);

    // Send a message once in a specific channel
    channelsService.getChannel('kimida-test').subscribe(
        channel => {
            let textChannel = client.channels.cache.get(channel.id) as TextChannel
            textChannel.send("Lorem ipsum dolor sit amet");
        }
    )

    // Send a message periodically via cron in a specific channel
    channelsService.getChannel('kimida-test').subscribe(
        channel => {
            cronsService.createCron('every-10-seconds', () => {
                let textChannel = client.channels.cache.get(channel.id) as TextChannel
                textChannel.send("Lorem ipsum dolor sit amet");
            }).subscribe(
                cron => cron.start()
            );
        }
    );
});

// Your Discord bot token here
client.login(process.env.TOKEN);
