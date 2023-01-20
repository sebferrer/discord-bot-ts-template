import { catchError, map, Observable, of } from 'rxjs';
import { Cron } from '../cron';
import { ICron } from '../models/cron.model';
import cron from 'cron';

const CRON_DATA = [
    {
        id: 'every-minute',
        value: '0 * * * * *',
        description: 'Every Minute'
    },
    {
        id: 'every-day-10-am',
        value: '0 0 9 * * *',
        description: 'Every Day At 10 AM'
    },
    {
        id: 'every-hour',
        value: '0 0 */1 * * *',
        description: 'Every Hour'
    },
    {
        id: 'every-10-seconds',
        value: '*/10 * * * * *',
        description: 'Every 10 seconds'
    }
];

export class CronsService {

    constructor(
        // private readonly http: HttpClient,
        // private readonly dbContext: DbContext
    ) { }

    public getCrons(): Observable<ICron[]> {
        return of(CRON_DATA).pipe(
            catchError(() => of(null))
        );
    }

    public getCron(id: string): Observable<ICron> {
        return this.getCrons().pipe(
            map(crons => crons.find(cron => cron.id === id))
        ).pipe(
            catchError(() => of(null))
        );
    }

    public createCron(id: string, callback: cron.CronCommand): Observable<Cron> {
        return this.getCron(id).pipe(
            map(cron => new Cron(cron, callback))
        ).pipe(
            catchError(() => of(null))
        );
    }
}
