import { Request, Response } from 'express';
import { saves } from '~shared/db/schema/save';
import { db } from '~shared/db/setup';
import { eq } from '~shared/drizzle-orm';
import packs from '~shared/packs/index'
import { GETAllPacksResponse } from '~shared/api/schema/apiEconomies';

export const economyGETPacks = async (req: Request, res: Response) => {
    const result: GETAllPacksResponse = packs.map(p => {
        const { versions, ...data} = p;
        const finalVersions = versions.map(v => {
            const { economies, ...versionData } = v;
            return {
                ...versionData,
                economies: Array.from(economies.keys())
            }
        })
        return {
            ...data,
            versions: finalVersions
        }
    })
    return res.json(result);
}

export const economyGETOneEconomy = async (req: Request, res: Response) => {
    const { pack, version, economy } = req.body;

    if (!pack || !version || !economy) {
        return res.status(400).json({ error: 'Both pack and version are required' });
    }

    const foundPack = packs.find(p => p.name === pack);
    if (!foundPack) {
        return res.status(404).json({ error: 'Pack not found' });
    }

    const foundVersion = foundPack.versions.find(v => v.version === version);
    if (!foundVersion) {
        return res.status(404).json({ error: 'Version not found for the specified pack' });
    }

    const foundEconomy = foundVersion.economies.get(economy)
    if (!foundEconomy) {
        return res.status(404).json({ error: 'Economy not found for the specified version' });
    }

    const result = new foundEconomy()

    return res.json({
        cargoData: result.cargoData,
        industryHexColors: result.industryHexColors,
        name: result.name
    });
};

export const economySetVersion = async (req: Request, res: Response) => {
    const { pack, version, economy } = req.body;

    if (!pack || !version || !economy) {
        return res.status(400).json({ error: 'Both pack, version, economy are required' });
    }

    const foundPack = packs.find(p => p.name === pack);
    if (!foundPack) {
        return res.status(404).json({ error: 'Pack not found' });
    }

    const foundVersion = foundPack.versions.find(v => v.version === version);
    if (!foundVersion) {
        return res.status(404).json({ error: 'Version not found for the specified pack' });
    }

    const foundEconomy = foundVersion.economies.get(economy);
    if (!foundEconomy) {
        return res.status(404).json({ error: 'Economy not found for the specified version' });
    }

    const newEconomy = new foundEconomy()
    await newEconomy.loadDataIntoDB(req.saveId)

    await db.update(saves).set({ industryPack: pack, industryVersion: version, industryEconomy: economy }).where(eq(saves.id, req.saveId));
    res.status(200).json({ message: `Industry pack ${foundPack.name}, version ${foundVersion.version}, economy ${foundEconomy.name} loaded successfully` });
};