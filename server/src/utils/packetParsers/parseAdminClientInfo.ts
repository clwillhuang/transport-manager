// Define the type
type AdminClientInfoData = {
    clientId: number;
    networkAddress: string;
    name: string;
    lang: number;
    date: number;
    companyId: number;
};

// Type guard function
export function isAdminClientInfoData(obj: any): obj is AdminClientInfoData {
    return (
        typeof obj === 'object' &&
        obj !== null &&
        typeof obj.clientId === 'number' &&
        typeof obj.networkAddress === 'string' &&
        typeof obj.name === 'string' &&
        typeof obj.lang === 'number' &&
        typeof obj.date === 'number' &&
        typeof obj.companyId === 'number'
    );
}