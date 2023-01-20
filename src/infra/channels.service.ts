import { catchError, map, Observable, of } from 'rxjs';
import { IChannel } from '../models/channel.model';

const CHANNEL_IDS = [
    {
        key: 'kimida-test', id: '1062129921176121414',
    }
];

export class ChannelsService {

    constructor(
        // private readonly http: HttpClient,
        // private readonly dbContext: DbContext
    ) { }

    public getChannels(): Observable<IChannel[]> {
        return of(CHANNEL_IDS).pipe(
            catchError(() => of(null))
        );
    }

    public getChannel(key: string): Observable<IChannel> {
        return this.getChannels().pipe(
            map(channels => channels.find(channel => channel.key === key))
        ).pipe(
            catchError(() => of(null))
        );
    }
}
