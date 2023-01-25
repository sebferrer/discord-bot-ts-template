import { AppModule } from './app.module';
import moment from 'moment-mini';
import * as dotenv from 'dotenv';
import { DiscordClient } from './infra/discord/discordClient';
import { CronsService } from './infra/crons.service';
import { TextChannelService } from './infra/discord/textChannel.service';
import { Cron } from './cron';

dotenv.config();

const injector = AppModule.getInjector();

const discordClient = injector.get(DiscordClient);
const cronsService = injector.get(CronsService);
const textChannelService = injector.get(TextChannelService);

discordClient.once('ready', () => {
    console.log(`Logged in as ${discordClient.user.tag} - ${moment().toISOString()}`);

    // Send a message once in a specific channel
    textChannelService.sendMessage('kimida-test', 'Lorem ipsum dolor sit amet').subscribe(
        (message: string) => {
            console.log(`Message sent: ${message}`);
        }
    );

    // Send a message periodically via cron in a specific channel
    cronsService.createCron('every-10-seconds', () => {
        textChannelService.sendMessage('kimida-test', 'Lorem ipsum dolor sit amet').subscribe(
            (message: string) => {
                console.log(`Message sent: ${message}`);
            }
        );
    }).subscribe(
        (cron: Cron) => cron.start()
    );
});

// Your Discord bot token here
discordClient.login(process.env.TOKEN);
