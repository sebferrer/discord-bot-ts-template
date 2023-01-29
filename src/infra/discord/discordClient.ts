import 'reflect-metadata';
import { Injectable } from 'injection-js';
import { Client, Collection, GatewayIntentBits, Partials } from 'discord.js';

@Injectable()
export class DiscordClient extends Client {

    constructor() {
        super({
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
        this.commands = new Collection();
    }
}
