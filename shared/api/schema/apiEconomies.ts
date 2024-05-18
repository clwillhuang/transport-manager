export type IndustryVersionResponse = {
    version: string;
    economies: string[];
};

export type IndustryPackResponse = {
    name: string;
    versions: IndustryVersionResponse[];
    id: string;
    bananas?: string;
    forumLink?: string;
};

export type GETAllPacksResponse = IndustryPackResponse[];
