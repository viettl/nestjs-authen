import { Injectable } from '@nestjs/common';
import { Cron, SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
@Injectable()
export class CronService {
  constructor(private schedulerRegistry: SchedulerRegistry) {}

  @Cron('* * * * * *')
  /*
      * * * * * *
    | | | | | |
    | | | | | day of week
    | | | | month
    | | | day of month
    | | hour
    | minute
    second (optional)
  */
  //  @Cron(CronExpression.EVERY_5_SECONDS)
  triggerCronJob() {
    console.log('Calling the method every second');
  }

  addNewJob(jobName: string, time: string) {
    const job = new CronJob(`${time} * * * * *`, () => {
      console.log(`time (${time}) for job ${jobName} to run!`);
    });

    this.schedulerRegistry.addCronJob(jobName, job);
    job.start();

    console.log(`Job ${name} added for every ${time} seconds`);
  }

  stopCronJob() {
    const job = this.schedulerRegistry.getCronJob('messaging');

    job.stop();
    console.log(job.lastDate());
  }

  deleteJob(jobName: string) {
    this.schedulerRegistry.deleteCronJob(jobName);
  }

  getCronJobs() {
    const jobs = this.schedulerRegistry.getCronJobs();

    jobs.forEach((value, key, map) => {
      console.log('Value:', value);
    });
  }
}
