// eslint-disable-next-line @typescript-eslint/camelcase
import { gmail_v1 } from 'googleapis/build/src/apis/gmail/v1';
import { mailFormatter } from './mailFormatter';
import { Message } from '../mailer/interface';
import { defer } from 'rxjs';
import { TaskQueue } from './callQueue';

export const googleMailer = {
  // eslint-disable-next-line @typescript-eslint/camelcase
  async sendMail(m: Message, queue: TaskQueue, apiClient: gmail_v1.Gmail) {
    const payload = {
      userId: 'me',
      requestBody: {
        raw: mailFormatter.formatMail(m)
      }
    };
    const operation = defer(() => apiClient!.users.messages.send(payload));

    return await queue
      .push({
        id: `${m.from}-${m.to}-${new Date().getTime()}`,
        operation
      })
      .toPromise();
  }
};
