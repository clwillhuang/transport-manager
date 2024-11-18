import { Chart, LegendItem } from "chart.js/auto";
import { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { Button, OverlayTrigger, Placeholder } from "react-bootstrap";
import styles from './Graphs.module.css'
import type { Cargo } from "@dbtypes/db/schema/cargo";
import { useQuery } from "@tanstack/react-query";
import type { CalculateGraphResponse } from "@dbtypes/api/schema/apiCalculate";
import CargoTooltip from "../tooltips/CargoToolTip";

export interface GraphSubclassProps {
	saveId: number,
	cargos: Cargo[]
}

interface GraphVariableTransitDaysProps {
	endpoint: string,
	cargos: Cargo[],
	minX: number,
	maxX: number,
	incrementX: number,
	renderParams: () => ReactNode;
	getYValue?: (cargo: Cargo, xValue: number) => Promise<number>;
	params: any,
	saveId: number
}

const GraphContainer = ({ endpoint, cargos, minX, maxX, incrementX, renderParams, params, saveId }: GraphVariableTransitDaysProps) => {
	const canvasParent = useRef<HTMLDivElement>(null);
	const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
	const [chart, setChart] = useState<Chart | undefined>(undefined);
	const [selectedCargos, setSelectedCargos] = useState<number[]>(Array(0));
	const [legendItems, setLegendItems] = useState<LegendItem[]>(Array(0));

	useEffect(() => {
		setSelectedCargos(cargos.map(c => c.id))
	}, [cargos])

	const HTMLLegendPlugin = {
		id: 'htmlLegend',
		afterUpdate(chart: Chart) {
			// Reuse the built-in legendItems generator
			if (chart) {
				let generateLabels = chart.options.plugins?.legend?.labels?.generateLabels;
				if (generateLabels) {
					setLegendItems(generateLabels(chart));
				}
			}
		}
	}

	const { data, isLoading, isError, isFetching } = useQuery<CalculateGraphResponse>({
		queryKey: ['graph', endpoint, minX, maxX, incrementX, ...Object.values(params)],
		queryFn: () => {
			const body = JSON.stringify({ minX, maxX, incrementX, cargoIds: cargos.map(c => c.id), ...params })
			return fetch(endpoint, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: body,
			}).then(res => res.json())
		},

		enabled: !!endpoint,
	})

	const renderLegendItem = useCallback((item: LegendItem) => {
		const id = cargos.find(x => x.name === item.text)?.id
		if (!id) {
			return null;
		}
		if (selectedCargos.includes(id)) {
			return (
				<OverlayTrigger overlay={
					<CargoTooltip cargoId={id} saveId={saveId} />
				} key={item.text}>
					<li className={styles.checkboxItemVisible} onClick={() => handleChange(id)} >
						<span style={{ borderColor: item.strokeStyle?.toString(), background: item.fillStyle?.toString() }}></span>
						<p style={{ color: item.strokeStyle?.toString() }}>{item.text}</p>
					</li>
				</OverlayTrigger>
			)
		} else {
			return (
				<li className={styles.checkboxItemInvisible} onClick={() => handleChange(id)} key={item.text}>
					<span></span>
					<p>{item.text}</p>
				</li>
			)
		}
	}, [cargos, selectedCargos, context])

	useEffect(() => {
		if (!canvasParent.current) return;
		const canvas: HTMLCanvasElement | null = canvasParent.current.querySelector('canvas');
		if (!canvas) return;
		const renderCtx = canvas.getContext("2d");
		if (renderCtx) {
			setContext(renderCtx);
		}
	}, [isFetching, isLoading]);

	useEffect(() => {
		if (!context || !data || isLoading || isError || isFetching) {
			return;
		}

		let xLabels: string[] = data.xValues.map(x => x.toFixed(0).toString())

		const datasets = data.data.map(dataseries => {
			const { id, data } = dataseries;
			const cargo = cargos.find(c => c.id === id);
			return {
				label: cargo!.name,
				data: data,
				hidden: !selectedCargos.includes(id)
			}
		})

		if (typeof chart !== 'undefined') {
			chart.destroy()
		}

		Chart.defaults.font.size = 14;
		setChart(new Chart(context, {
			type: 'line',
			data: {
				labels: xLabels,
				datasets: datasets
			},
			options: {
				scales: {
					y: {
						beginAtZero: true,
						grid: {
							color: '#ffffffff'
						}
					},
					x: {
						grid: {
							color: '#ffffffff',
						}
					}
				},
				plugins: {
					legend: {
						display: false,
					}
				}
			},
			plugins: [HTMLLegendPlugin]
		}));
	}, [context, selectedCargos, data, params, endpoint, isFetching]);

	const handleChange = (cargoName: number) => {
		if (!selectedCargos.includes(cargoName)) {
			setSelectedCargos([...selectedCargos, cargoName])
		}
		else {
			setSelectedCargos(selectedCargos.filter(cargo => cargo !== cargoName))
		}
	};

	return (
		<div className={styles.graphContainer}>
			<div className={styles.params}>
				{(!isFetching && !isLoading && !isError) && renderParams()}
			</div>
			<div ref={canvasParent} >
				{
					isFetching
						?
						<Placeholder animation="glow" >
							<p>Calculating...</p>
							<Placeholder animation="glow"></Placeholder>
						</Placeholder>
						:
						<>
							<canvas className={styles.graphCanvas} id={`graph`} />
							<div className={styles.checkboxPane}>
								<div className={styles.buttonRow}>
									<Button onClick={() => setSelectedCargos(cargos.map(x => x.id))}>Select all</Button>
									<Button onClick={() => setSelectedCargos([])}>Hide all</Button>
								</div>
								<ul className={styles.checkboxGrid}>
									{legendItems.sort((a, b) => a.text.localeCompare(b.text)).map(item => renderLegendItem(item))}
								</ul>
							</div>
						</>
				}
			</div>
		</div>
	)
}

export default GraphContainer;