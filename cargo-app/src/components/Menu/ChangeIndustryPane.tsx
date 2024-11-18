// Allow the user to upload a new image, select a new mod, economy or cargo payment model
import { useState } from "react";
import { Col, FormGroup, FormLabel, Row, Button, Alert } from "react-bootstrap";
import Form from "react-bootstrap/esm/Form";
import styles from './ChangeIndustryPane.module.css'
import { useMutation, useQuery } from "@tanstack/react-query";
import { baseUrl, fetchPOSTFactory } from "../../tools/serverConn";
import type { GETAllPacksResponse, IndustryPackResponse, IndustryVersionResponse } from "@dbtypes/api/schema/apiEconomies";

interface ChangeIndustryPaneProps {
    saveId: number | null,
}

const ChangeIndustryPane = ({ saveId }: ChangeIndustryPaneProps) => {
    const { data: industryPacks, isLoading } = useQuery<GETAllPacksResponse>({
        queryKey: [saveId],
        queryFn: () => fetch(`${baseUrl}/economies/all`).then(res => res.json()),
        initialData: [],
    })

    const [pack, setPack] = useState<IndustryPackResponse | null>(null);
    const [version, setVersion] = useState<IndustryVersionResponse | null>(null);
    const [economy, setEconomy] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<{ message: string, variant: 'success' | 'danger' | 'info' }>({ message: '', variant: 'success' });

    if (isLoading || !industryPacks) {
        return <div>Loading...</div>
    }

    // Set initial values based on props
    // useEffect(() => {
    //     if (currentEconomy) {
    //         setPack(currentEconomy.industryVersion?.industryPack || null);
    //         setVersion(currentEconomy.industryVersion || null);
    //     }
    // }, [currentEconomy]);

    const onPackSelect: React.ChangeEventHandler<HTMLSelectElement> = (e): void => {
        const newPack = industryPacks.find(x => x.name === e.target.value);
        setPack(newPack ?? null);
        setVersion(null); // Reset version when changing pack
        setEconomy(null); // Reset economy when changing pack
    };

    const onVersionSelect: React.ChangeEventHandler<HTMLSelectElement> = (e): void => {
        if (!pack) {
            setVersion(null); setEconomy(null);
        } else {
            const newVersion = pack.versions.find(v => v.version === e.target.value);
            setVersion(newVersion ?? null);
            setEconomy(null); // Reset economy when changing version
        }
    };

    const economies = version?.economies || [];

    const onEconomySelect: React.ChangeEventHandler<HTMLSelectElement> = (e): void => {
        if (!pack || !version) {
            setEconomy(null);
        } else {
            setEconomy(e.target.value ?? null);
        }
    };

    const setEconomyMutation = useMutation({
        mutationFn: () => fetchPOSTFactory(`${baseUrl}/data/${saveId}/economy`, {
            pack: pack!.name,
            version: version!.version,
            economy: economy
        }),
        onMutate: () => {
            setSuccessMessage({ message: 'Setting economy...', variant: 'success' });
        },
        onSuccess: () => {
            setSuccessMessage({ message: 'Economy successfully changed. You may close this popup.', variant: 'success' });
        },
        onError: () => {
            setSuccessMessage({ message: 'An error occurred. Please try again.', variant: 'danger' });
        }
    })

    return (
        <div className={styles.content}>
            <Form className={styles.form}>
                {/* Pack Selection */}
                <FormGroup as={Row} className="mt-3">
                    <FormLabel column sm={4}>Industry Pack</FormLabel>
                    <Col sm={8}>
                        <Form.Select onChange={onPackSelect} value={pack?.name || ''}>
                            <option value="">Select Pack</option>
                            {industryPacks.map(pack => (
                                <option key={pack.name} value={pack.name}>{pack.name}</option>
                            ))}
                        </Form.Select>
                    </Col>
                </FormGroup>
                {
                    pack?.id ?
                        <div>
                            <h5>{pack.name}</h5>
                            <span>Versions: {pack.versions.length} found</span><br/>
                            <span>BaNaNaS: <a href={pack.bananas} title="Find this pack in the game's online content system.">{pack.bananas}</a></span>
                            <br />
                            <span>Forum: <a href={pack.forumLink} title="View community posts about this pack.">{pack.forumLink}</a></span>
                        </div> :
                        <div>
                            <h5>Select an industry pack / NewGRF to continue.</h5>
                        </div>
                }

                {/* Version Selection */}
                {
                    pack &&
                    <FormGroup as={Row} className="mt-3">
                        <FormLabel column sm={4}>Industry Version</FormLabel>
                        <Col sm={8}>
                            <Form.Select onChange={onVersionSelect} disabled={!pack} value={version?.version || ''}>
                                <option value="">Select Version</option>
                                {pack.versions.map(ver => (
                                    <option key={ver.version} value={ver.version}>{ver.version}</option>
                                ))}
                            </Form.Select>
                        </Col>
                    </FormGroup>
                }

                {/* {
                    version ?
                        <div>
                            <h5>Version {version.version}</h5>
                            <p>{version.description}</p>
                            <span>Includes {version.economies.length} economies.</span>
                        </div>
                        :
                        <div>
                            <h5>Select a pack version to continue.</h5>
                        </div>
                } */}

                {/* Economy Selection */}
                <FormGroup as={Row} className="mt-3">
                    <FormLabel column sm={4}>Economy</FormLabel>
                    <Col sm={8}>
                        <Form.Select onChange={onEconomySelect} disabled={!version} value={economy || ''}>
                            <option value="">Select Economy</option>
                            {economies.map(economy => (
                                <option key={economy} value={economy}>{economy}</option>
                            ))}
                        </Form.Select>
                    </Col>
                </FormGroup>

                {/* Save economy selection */}
                <FormGroup as={Row}>
                    <Col sm={{ span: 4 }} className="text-center">
                        {
                            (!saveId) ?
                            <Button role='submit' disabled>A save game must be loaded first.</Button>
                            :
                            (!economy || !pack || !version) 
                            ?
                            <Button role='submit' disabled>Pack, version and economy must be selected.</Button>
                            :
                            <Button role='submit' onClick={() => setEconomyMutation.mutate()}>{`Set economy to ${economy} from ${pack.name} ${version.version}`}</Button>
                        }
                        {/* {
                            economy?.id && (currentEconomy && economy.id === currentEconomy?.id) &&
                            <Button role='submit' onClick={() => setCurrentEconomy(economy)} disabled>{`Economy already set to ${economy.name} from ${pack?.name} ${version?.version}`}</Button>
                        } */}
                    </Col>
                </FormGroup>
                <FormGroup>
                    { successMessage.message && <Alert variant={successMessage?.variant}>{successMessage?.message}</Alert> }
                </FormGroup>
            </Form>
        </div>
    );
}

export default ChangeIndustryPane;