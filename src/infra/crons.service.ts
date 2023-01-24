import 'reflect-metadata';
import { Injectable } from 'injection-js';
import { catchError, map, Observable, of } from 'rxjs';
import { Cron } from '../cron';
import { ICron } from '../models/cron.model';
import cron from 'cron';
import * as CRON_JSON from './crons-static.json';

const CRON_DATA: ICron[] = (CRON_JSON as any).default;

@Injectable()
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
