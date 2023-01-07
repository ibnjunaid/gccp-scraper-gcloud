import functions from '@google-cloud/functions-framework';
import { revalidateDashboard, saveLatestDataToSheet, SyncParticipantsData } from './Runner';
import logger from './utils/logger';

export type Params = {
    sheetId: string,
    instituteId: string,
    instituteName: string,
    CRED: string,
    TOKEN: string
}


export async function handler(event: functions.CloudEvent<any>, context: any) {
    // process.env.CRED = JSON.stringify(params.CRED);
    // process.env.TOKEN = JSON.stringify(params.TOKEN);


    const message: Params = event.data
        ? JSON.parse(Buffer.from(event.data, 'base64').toString())
        : null;
    if (message === null) {
        throw new Error("Invalid message")
    }

    const { sheetId } = message;
    const data = await SyncParticipantsData(sheetId);
    const status = await saveLatestDataToSheet(data, sheetId);
    const res = await revalidateDashboard({
        path: message.instituteId,
        secret: message.TOKEN
    }).catch((err) => {
        logger.error(JSON.stringify(err))
    });
    return { status: 'status' };
}

