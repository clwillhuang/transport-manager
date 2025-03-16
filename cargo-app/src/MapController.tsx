import { useCallback, useEffect, useRef, useState } from 'react';
import DragToolTip from './components/tooltips/DragToolTip';
import styles from './MapController.module.css'
import tooltipStyles from './components/tooltips/Tooltip.module.css';
import svgPanZoom from 'svg-pan-zoom';
import InfoPanelController from './components/InfoPanel/InfoPanelController';
import { IWindowOpenable } from './components/Menu/MenuController';
import { ConnectMode, CoverageConnectionProps } from './components/MapObjects/ConnectableMapObject';
import convertToHex from './tools/map_processing/convertToHex';
import IndustryMap from './components/MapObjects/IndustryMap';
import { ICoverageCoverable } from './model/CoverageConnection';
import ShapeMap from './components/MapObjects/ShapeMap';
import StationMap from './components/MapObjects/StationMap';
import TownMap from './components/MapObjects/TownMap';
import SignMap from './components/MapObjects/SignMap';
import { TileCoordinate } from './model/Point';
import type { Station } from '@dbtypes/db/schema/station';
import type { Circle } from '@dbtypes/db/schema/circle'
import type { Sign } from '@dbtypes/db/schema/sign'
import type { Town } from '@dbtypes/db/schema/town'

import { baseUrl, fetchPOSTFactory } from './tools/serverConn';
import type { GETAllIndustryTypeResponse } from '@dbtypes/api/schema/apiIndustryType';
import MapSettingsDisplay from './components/MapSettings/MapSettingsDisplay';

import { DefinedUseQueryResult, useQueryClient } from '@tanstack/react-query';
import type { GETCurrentCompanyResponse } from '@dbtypes/api/schema/apiCompany';
import type { GETOneSaveResponse } from '@dbtypes/api/schema/apiSave';
import { Card, ListGroup } from 'react-bootstrap';
import UpdateImageModal from './components/Modals/ChangeImageModal';
import { ConvertTileToCanvasCoordinate } from './components/MapObjects/MapObject';
import { IconType, IconTypeValues } from './components/MapSettings/IconFilter';
import { StationType, StationTypeValues } from './components/MapSettings/StationFilter';
import ActionIndicator from './components/ActionMenu/ActionIndicator';
import { Action } from './components/ActionMenu/actionMenuOptions';
import { useAppSelector } from './app/hooks';
import { selectSaveId } from './features/saves/saveSlice';
import { selectToolTipEvent, selectToolTipMode, ToolTipMode } from './features/tooltips/tooltipSlice';
import IndustryToolTip from './components/tooltips/IndustryToolTip';
import TownToolTip from './components/tooltips/TownToolTip';
import StationToolTip from './components/tooltips/StationToolTip';
import CircleToolTip from './components/tooltips/CircleToolTip';
import SignToolTip from './components/tooltips/SignToolTip';
import { InfoPanelMode, selectInfoPanelMode, setInfoPanelMode } from './features/infoPanel/infoPanelSlice';
import { useDispatch } from 'react-redux';

interface MapControllerProps extends IWindowOpenable {
	action: Action,
	setAction: React.Dispatch<React.SetStateAction<Action>>,
	company: GETCurrentCompanyResponse | null,
	saveQuery: DefinedUseQueryResult<GETOneSaveResponse | null, Error>
}

const MapController = ({
	setWindowIndex,
	action,
	setAction,
	company,
	saveQuery
}: MapControllerProps) => {

	const saveId = useAppSelector(selectSaveId);
	const toolTipMode = useAppSelector(selectToolTipMode);
	const toolTipEvent = useAppSelector(selectToolTipEvent);

	const CANVAS_ID = 'map';
	const [isDragging, setIsDragging] = useState<boolean>(false);
	const [mouseDownLoc, setMouseDownLoc] = useState<TileCoordinate>({ x: 0, y: 0 });
	const [currentMouseLoc, setCurrentMouseLoc] = useState<TileCoordinate>({ x: 0, y: 0 });
	const [mouseUpLoc, setMouseUpLoc] = useState<TileCoordinate>({ x: 0, y: 0 });
	const [currentClientLoc, setCurrentClientLoc] = useState<TileCoordinate>({ x: 0, y: 0 });
	const svgElement = useRef<SVGSVGElement | null>(null);
	const [zoomInstance, setZoomInstance] = useState<SvgPanZoom.Instance | null>(null);

	const [industriesVisible, setIndustriesVisible] = useState<number[]>([]);
	const [iconsVisible, setIconsVisible] = useState<IconType[]>([...IconTypeValues]);
	const [stationsVisible, setStationsVisible] = useState<StationType[]>([...StationTypeValues]);

	const [industryTypes, setIndustryTypes] = useState<GETAllIndustryTypeResponse>([]);
	useEffect(() => {
		fetch(`${baseUrl}/data/${saveId}/industrytypes/`).then(res => res.json()).then(
			(data: GETAllIndustryTypeResponse) => {
				setIndustryTypes(data)
				setIndustriesVisible(data.map(d => d.id))
			}
		)
	}, [saveId])

	const tooltipDiv = useRef<HTMLDivElement | null>(null);

	const MapToolTipInstance = () => {
		var elem = null;
		if (toolTipMode === ToolTipMode.Hidden) {
			elem = null;
		} else if (toolTipMode === ToolTipMode.Industry) {
			elem = <IndustryToolTip />
		} else if (toolTipMode === ToolTipMode.Town) {
			elem = <TownToolTip />
		} else if (toolTipMode === ToolTipMode.Station) {
			elem = <StationToolTip />
		} else if (toolTipMode === ToolTipMode.Circle) {
			elem = <CircleToolTip />
		} else if (toolTipMode === ToolTipMode.Sign) {
			elem = <SignToolTip />
		} else if (toolTipMode === ToolTipMode.TrackSegment) {
			// elem = <TrackSeg
		} else {
			console.warn("Unknown tooltip mode: ", toolTipMode)
		}
		if (elem !== null) {
			const offset = { x: 5, y: 5 }
			const sizes = zoomInstance?.getSizes()?.realZoom;
			const realOffset = {
				x: sizes ? offset.x * sizes : offset.x,
				y: sizes ? offset.y * sizes : offset.y
			}
			if (tooltipDiv.current) {
				tooltipDiv.current.style.position = 'absolute'
				tooltipDiv.current.style.left = (toolTipEvent.clientX + realOffset.x) + 'px';
				tooltipDiv.current.style.top = (toolTipEvent.clientY + realOffset.y) + 'px';
			}
		}
		return elem;
	}

	const [selectedStation, setSelectedStation] = useState<CoverageConnectionProps>({
		selectedStation: null, mapMode: ConnectMode.Inactive
	});

	const queryClient = useQueryClient();

	const infoPanelMode = useAppSelector(selectInfoPanelMode);
	const dispatch = useDispatch();

	const onStartConnectingStation = useCallback((station: Station | null) => {
		setAction(Action.ConnectStation);
		setSelectedStation({
			selectedStation: station,
			mapMode: ConnectMode.Connect
		});
		dispatch(setInfoPanelMode({ infoPanelMode: InfoPanelMode.Default, infoPanelProps: null }));
	}, [setAction, setSelectedStation, setInfoPanelMode, dispatch]);

	// Add action-based effects here
	useEffect(() => {
		if (action === Action.DistanceMeasure && infoPanelMode !== InfoPanelMode.DistanceMeasure) {
			dispatch(setInfoPanelMode({ infoPanelMode: InfoPanelMode.DistanceMeasure, infoPanelProps: null }));
		} else if (action !== Action.DistanceMeasure && infoPanelMode === InfoPanelMode.DistanceMeasure) {
			dispatch(setInfoPanelMode({ infoPanelMode: InfoPanelMode.Default, infoPanelProps: null }));
		}
	}, [action, setInfoPanelMode, dispatch, infoPanelMode])

	const enablePan = useCallback(() => {
		const svgElem = document.getElementById(CANVAS_ID);
		if (svgElem) {
			if (!zoomInstance)
				setZoomInstance(svgPanZoom(svgElem));
		}
	}, [CANVAS_ID, zoomInstance, setZoomInstance, svgPanZoom])

	const distanceDiv = useRef<HTMLDivElement | null>(null);

	const calculateCanvasLocation = useCallback((clientX: number, clientY: number): TileCoordinate => {
		const x = clientX;
		const y = clientY;
		let panOffset = zoomInstance?.getPan();
		let sizes = zoomInstance?.getSizes();
		let zoom = zoomInstance?.getZoom();
		if (panOffset && sizes && zoom) {
			let svgCoordinates = {
				x: Math.round((x - panOffset.x) / sizes.realZoom),
				y: Math.round((y - panOffset.y) / sizes.realZoom),
			}
			return svgCoordinates;
		} else {
			return { x: 0, y: 0 }
		}

	}, [zoomInstance])

	useEffect(() => {
		if (zoomInstance) {
			if (action !== Action.Default) {
				zoomInstance?.disablePan();
				zoomInstance?.disableZoom();
			}
			if (action === Action.Default) {
				zoomInstance?.enablePan();
				zoomInstance?.enableZoom();
			}
		}
	}, [action, zoomInstance])

	const infoPaneCoordProps = {
		start: infoPanelMode === InfoPanelMode.DistanceMeasure ? mouseDownLoc : { x: 0, y: 0 },
		end: infoPanelMode === InfoPanelMode.DistanceMeasure ? ((isDragging) ? currentMouseLoc : mouseUpLoc) : { x: 0, y: 0 },
	}

	const [image, setImage] = useState<HTMLImageElement | null>(null);
	const [_pixels, setPixels] = useState<string[][]>([]);

	// Preload example image on first load
	useEffect(() => {
		const imagePath = './maps/Example Map.png';
		const img = new Image();
		img.src = imagePath;
		setImage(img)
		img.onload = () => {
			var canvas = document.createElement('canvas');
			canvas.width = img.width;
			canvas.height = img.height;
			var context = canvas.getContext('2d')!;
			context.imageSmoothingEnabled = false;
			// setImage(img);
			context.drawImage(img, 0, 0);
			let imageData = context.getImageData(0, 0, img.width, img.height);
			// console.log(imageData)
			const pixelData = new Array(img.height);
			for (let i = 0; i < img.height; i++) {
				pixelData[i] = new Array(img.width);
				for (let j = 0; j < img.width; j++) {
					const index = (i * img.width + j) * 4;
					pixelData[i][j] = convertToHex(imageData?.data[index], imageData?.data[index + 1], imageData?.data[index + 2], imageData?.data[index + 3]);
				}
			}
			setPixels(pixelData);
		};
	}, [])

	const onFinishCoverageConnection = (
		// station: Station | null, 
		connected: ICoverageCoverable | null) => {
		console.log("exited connection mode with", connected)
		setAction(Action.Default);
		setSelectedStation({
			selectedStation: null,
			mapMode: ConnectMode.Inactive
		});
		// force update of info panel because it shows connection data
		dispatch(setInfoPanelMode({ infoPanelMode: InfoPanelMode.Default, infoPanelProps: null }));
		// setStations(stations);
	}

	const onMouseUp = useCallback((event: React.MouseEvent<SVGElement, MouseEvent>): void => {
		if (isDragging) {
			setIsDragging(false);
			let mapCoordinates = calculateCanvasLocation(event.clientX, event.clientY);
			setMouseUpLoc(mapCoordinates);
		}
		return;
	}, [setIsDragging, isDragging, setMouseUpLoc]);

	const onMouseMove = (event: React.MouseEvent<SVGElement, MouseEvent>): void => {
		setCurrentClientLoc({ x: event.clientX, y: event.clientY })
		// coordinates within canvas
		let canvasCoordinates = calculateCanvasLocation(event.clientX, event.clientY);
		let mapCoordinates = ConvertTileToCanvasCoordinate(canvasCoordinates, mapSize);
		setCurrentMouseLoc(mapCoordinates);
		if (distanceDiv?.current) {
			distanceDiv.current.style.left = (currentClientLoc.x + 20) + 'px';
			distanceDiv.current.style.top = (currentClientLoc.y) + 'px';
		}
	}

	const onMouseDown = async (event: React.MouseEvent<SVGElement, MouseEvent>): Promise<void> => {
		if (saveId === null) return;

		if (zoomInstance) {
			let canvasCoordinates = calculateCanvasLocation(event.clientX, event.clientY);
			let mapCoordinates = ConvertTileToCanvasCoordinate(canvasCoordinates, mapSize);
			if (action === Action.DistanceMeasure) {
				if (svgElement.current != null) {
					setMouseDownLoc(mapCoordinates);
					setIsDragging(true);
				}
			} else if (action === Action.AddCircle || action === Action.AddDiamond) {
				if (svgElement.current != null) {
					const newCircle: Omit<Circle, 'id'> = {
						x: mapCoordinates.x,
						y: mapCoordinates.y,
						saveId: saveId,
						text: 'New Circle',
						radius: 20,
						color: '00ff00ff',
						circleType: (action === Action.AddDiamond) ? 'manhattan' : 'euclidean'
					}
					await fetchPOSTFactory(`${baseUrl}/data/${saveId}/circles/`, newCircle)
					queryClient.invalidateQueries({ queryKey: ['circle'] })
				}
			} else if (action === Action.AddStation) {
				if (!company) return
				const newStation: Omit<Station, 'id'> = {
					x: mapCoordinates.x,
					y: mapCoordinates.y,
					name: 'New Station',
					saveId: saveId,
					stationId: null,
					companyId: company.id,
					hasTrain: true,
					hasTruck: false,
					hasBus: false,
					hasAirport: false,
					hasDock: false,
					hasAny: false
				}
				await fetchPOSTFactory(`${baseUrl}/data/${saveId}/stations/`, newStation)
				queryClient.invalidateQueries({ queryKey: ['station'] })
			} else if (action === Action.AddCity) {
				const newTown: Omit<Town, 'id'> = {
					x: mapCoordinates.x,
					y: mapCoordinates.y,
					name: 'New Town',
					saveId: saveId,
					townId: null,
					population: 0,
					isCity: false
				}
				await fetchPOSTFactory(`${baseUrl}/data/${saveId}/towns/`, newTown)
				queryClient.invalidateQueries({ queryKey: ['town'] })
			} else if (action === Action.AddSign) {
				const newSign: Omit<Sign, 'id'> = {
					x: mapCoordinates.x,
					y: mapCoordinates.y,
					text: 'New Sign',
					saveId: saveId,
					signId: null,
					isInGame: false
				}
				await fetchPOSTFactory(`${baseUrl}/data/${saveId}/signs/`, newSign)
				queryClient.invalidateQueries({ queryKey: ['sign'] })
			} else if (action === Action.BuildTrack) {
				// let location = calculateMouseLocation(event.clientX, event.clientY);
				// if (trackBuildOrigin === null) {
				// 	setTrackBuildOrigin(new TrackEnd({...location}));
				// } else {
				// 	buildSegment(trackBuildOrigin, new TrackEnd({...location}))
				// }
			}
		} else {
			enablePan();
		}
	}

	if (saveQuery.isLoading) {
		return <div className={styles.mapContainer}>
			<div>Loading...</div>
		</div>;
	} else if (saveQuery.isError) {
		return <div className={styles.mapContainer}>
			<div>Encountered error trying to load your save data. Cannot load map.</div>
		</div>;
	} else if (!saveQuery.data) {
		return <div className={styles.mapContainer}>
			<div>Invalid save data. Cannot load map.</div>
		</div>;
	}

	const mapSize = { mapWidth: saveQuery.data.mapWidth, mapHeight: saveQuery.data.mapHeight };

	return (
		<div className={styles.mapContainer}>
			<svg width={saveQuery.data.mapWidth} height={saveQuery.data.mapHeight} id={CANVAS_ID} ref={svgElement}>
				<image className={styles.defaultMapImage} style={{ width: mapSize.mapWidth, height: mapSize.mapHeight }}></image>
				{image ?
					<image id='map' xlinkHref={image.src} onMouseDown={onMouseDown} onMouseUp={onMouseUp} onMouseMove={onMouseMove} /> :
					<image id='map' width={mapSize.mapWidth} height={mapSize.mapHeight} className={styles.defaultMapImage} onMouseDown={onMouseDown} onMouseUp={onMouseUp} onMouseMove={onMouseMove} />}
				<g style={{ height: '100%', width: '100%', pointerEvents: (action === Action.Default || action === Action.ConnectStation || action === Action.BuildTrack) ? 'inherit' : 'none' }}>
					{
						iconsVisible.includes(IconType.Industry) && <IndustryMap {...{
							industryTypes,
							industriesVisible,
							coverageConnectionProps: selectedStation,
							onFinishCoverageConnection,
						}} />
					}
					{iconsVisible.includes(IconType.Circle) && <ShapeMap />}
					{iconsVisible.includes(IconType.Station) && <StationMap stationsVisible={stationsVisible}/>}
					{iconsVisible.includes(IconType.Town) && <TownMap {...{
						coverageConnectionProps: selectedStation,
						onFinishCoverageConnection,
					}} />}
					{iconsVisible.includes(IconType.Sign) && <SignMap {...{
						// coverageConnectionProps: selectedStation,
						// onFinishCoverageConnection,
					}} />}

					{/* Distance Measurement Line */}
					{(isDragging && action == Action.DistanceMeasure) &&
						<line x1={mapSize.mapWidth - mouseDownLoc.x} y1={mouseDownLoc.y} x2={mapSize.mapWidth - currentMouseLoc.x} y2={currentMouseLoc.y} stroke='white' className={styles.distanceLine} />}
					{/* Station connection line */}
					{(action === Action.ConnectStation && selectedStation?.selectedStation?.id) &&
						<line x1={selectedStation.selectedStation.x} y1={selectedStation.selectedStation.y} x2={currentMouseLoc.x} y2={currentMouseLoc.y} stroke='green' className={styles.distanceLine} />
					}
				</g>
			</svg>
			{
				(isDragging && action === Action.DistanceMeasure) &&
				<div ref={distanceDiv} className={styles.distanceTooltip}>
					<DragToolTip start={mouseDownLoc} end={currentMouseLoc} />
				</div>
			}


			<div className={`${styles.tooltip} ${toolTipMode !== ToolTipMode.Hidden ? styles.toolTipVisible : styles.toolTipHidden}`} ref={tooltipDiv}>
				{(toolTipMode !== ToolTipMode.Hidden) &&
					<Card className={tooltipStyles.container}>
						<Card.Body>
							<MapToolTipInstance />
						</Card.Body>
					</Card>
				}
			</div>

			<ActionIndicator actionState={{ action, initial: '' }} />

			<ListGroup className={styles.mousePanel}>
				<ListGroup.Item>
					<span>In-game Tile Coordinates: {currentMouseLoc.x}, {currentMouseLoc.y} </span><br />
					<span>Canvas Coordinates: {currentClientLoc.x}, {currentClientLoc.y}.</span><br />
					{/* <span>Last mouse down location: {mouseDownLoc.x} {mouseDownLoc.y}</span><br/> */}
					{/* <span>Is Dragging: {isDragging ? 'dragging' : 'none'}</span><br/> */}
					{/* {(currentMouseLoc.x >= 0 && currentMouseLoc.y >= 0 && currentMouseLoc.y < pixels.length && currentMouseLoc.x < pixels[0].length) ? <span>Map color: <HexColorBox hex={`#${pixels[currentMouseLoc.y][currentMouseLoc.x]}`} textcolor='white' /></span> : 'off screen'}<br/> */}
					<UpdateImageModal image={image} setImage={setImage} />
				</ListGroup.Item>
			</ListGroup>
			{/* {console.log('data in info pane', infoPanel)} */}
			<InfoPanelController
				{...{
					onStartConnectingStation,
					setWindowIndex,
					start: infoPaneCoordProps.start,
					end: infoPaneCoordProps.end,
				}} />

			<MapSettingsDisplay {...{
				industryTypes,
				industriesVisible,
				setIndustriesVisible,
				iconsVisible,
				setIconsVisible,
				stationsVisible,
				setStationsVisible
			}} />
		</div>
	)
}

export default MapController;