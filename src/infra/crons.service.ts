import { catchError, map, Observable, of } from 'rxjs';
import { Cron } from '../cron';
import { ICron } from '../models/cron.model';
import cron from 'cron';
import * as CRONS_JSON from './crons-static.json';

const CRONS: ICron[] = (CRONS_JSON as any).default;

export class CronsService {

    constructor(
        // private readonly http: HttpClient,
        // private readonly dbContext: DbContext
    ) { }

    public getCrons(): Observable<ICron[]> {
        return of(CRONS).pipe(
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
