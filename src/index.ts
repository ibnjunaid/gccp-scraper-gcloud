import functions from '@google-cloud/functions-framework';


import { revalidateDashboard, saveLatestDataToSheet, SyncParticipantsData } from './Runner';

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
    console.log(event.data)

    const message = event.data
        ? Buffer.from(event.data, 'base64').toString()
        : 'Hello, World';
    console.log(message);

    // const { sheetId } = params;
    // const data = await SyncParticipantsData(sheetId);
    // const status = await saveLatestDataToSheet(data, sheetId);
    // const res = await revalidateDashboard({
    //     path: params.instituteId,
    //     secret: params.TOKEN
    // }).catch((err) => {
    //     console.log(JSON.stringify(err))
    // });
    return { status: 'status' };
}

