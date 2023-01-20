import { ICron } from "./models/cron.model";
import cron from 'cron';

export class Cron implements ICron {
    id: string;
    value: string;
    description: string;
    cronJob: cron.CronJob;

    constructor(iCron: ICron, callback: cron.CronCommand) {
        this.id = iCron.id;
        this.value = iCron.value;
        this.description = iCron.description;
        this.cronJob = new cron.CronJob(this.value, callback);
    }

    public start() {
        this.cronJob.start();
    }
}
