import 'reflect-metadata';
import { Inject, Injectable, Injector } from 'injection-js';
import { catchError, map, Observable, of } from 'rxjs';
import { DiscordClient } from './discordClient';
import { ChannelsService } from '../channels.service';
import { TextChannel } from 'discord.js';

@Injectable()
export class TextChannelService {
    private discordClient: DiscordClient;
    private channelsService: ChannelsService;

    constructor(
        @Inject(Injector) private injector: Injector
    ) {
        this.discordClient = this.injector.get<DiscordClient>(DiscordClient);
        this.channelsService = this.injector.get<ChannelsService>(ChannelsService);
    }

    public sendMessage(channelKey: string, message: string): Observable<string> {
        return this.channelsService.getChannel(channelKey).pipe(
            map(channel => {
                let TextChannel = this.discordClient.channels.cache.get(channel.id) as TextChannel
                TextChannel.send(message);
                return message;
            })
        ).pipe(
            catchError(() => of(null))
        );
    }
}
