import * as d3 from "d3";
import {useEffect, useRef, useMemo} from "react"

interface SpreadProps {
    callSpread: number[][];
    putSpread: number[][];
    priceLow: number;
    priceHigh: number;
    timeToExpiration: number;
}

interface HeatmapProps {
    data: number[][];
    title?: string;
    subtitle?: string;
    width?: number;
    height?: number;
    priceLow: number;
    priceHigh: number;
    timeToExpiration: number;
}

// used a bit of Claude to format my heatmap; d3 is annoying -_-
const Heatmap: React.FC<HeatmapProps> = ({ 
    data, 
    title = "Heatmap Visualization",
    subtitle = "",
    width = 1000,
    height = 780,
    priceLow,
    priceHigh,
    timeToExpiration
}) => {
    const svgRef = useRef<SVGSVGElement | null>(null);
    
    const dimensions = useMemo(() => {
        const margin = { top: 80, right: 25, bottom: 50, left: 80 };
        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;
        return { margin, innerWidth, innerHeight };
    }, [width, height]);

    useEffect(() => {
        if (!data || data.length === 0 || !svgRef.current) return;

        const { margin, innerWidth, innerHeight } = dimensions;
        const numRows = data.length;
        const numCols = data[0].length;

        // Calculate cell size based on the smaller dimension to ensure square cells
        const cellSize = Math.min(
            innerWidth / numCols,
            innerHeight / numRows
        );

        // Recalculate actual dimensions based on cell size
        const actualWidth = cellSize * numCols + margin.left + margin.right;
        const actualHeight = cellSize * numRows + margin.top + margin.bottom;

        // Generate svg with adjusted dimensions
        const svg = d3.select(svgRef.current)
            .attr('width', actualWidth)
            .attr('height', actualHeight);

        svg.selectAll('*').remove();
        const g = svg.append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        // Scales setup
        const minVal = d3.min(data.flat()) ?? 0;
        const maxVal = d3.max(data.flat()) ?? 1;
        const colorScale = d3
            .scaleLinear<string>()
            .domain([minVal, 0, maxVal])
            .range(['#ef4444', '#ffffff', '#22c55e'])
            .interpolate(d3.interpolateRgb.gamma(2.2));

        // Price scale (Y-axis) - reversed domain for correct orientation
        const priceScale = d3.scaleLinear()
            .domain([priceLow, priceHigh])
            .range([0, cellSize * numRows]); // Scale to actual grid size

        // Time scale (X-axis)
        const timeScale = d3.scaleLinear()
            .domain([timeToExpiration, 0])
            .range([0, cellSize * numCols]); // Scale to actual grid size

        // Add Y-axis (prices)
        const yAxis = d3.axisLeft(priceScale)
            .ticks(10)
            .tickFormat(d => `$${d}`);

        g.append('g')
            .attr('class', 'y-axis')
            .call(yAxis)
            .attr('color', '#9ca3af');

        // Add X-axis (time)
        const xAxis = d3.axisTop(timeScale)
            .ticks(Math.min(10, numCols))
            .tickFormat(d => `${d}d`);

        g.append('g')
            .attr('class', 'x-axis')
            .call(xAxis)
            .attr('color', '#9ca3af');

        // Axis labels
        svg.append('text')
            .attr('transform', 'rotate(-90)')
            .attr('y', margin.left / 3)
            .attr('x', -(actualHeight / 2))
            .attr('fill', '#9ca3af')
            .attr('text-anchor', 'middle')
            .text('Price ($)');

        svg.append('text')
            .attr('x', actualWidth / 2)
            .attr('y', margin.top / 2)
            .attr('fill', '#9ca3af')
            .attr('text-anchor', 'middle')
            .text('Time to Expiration (days)');

        // Tooltip
        const tooltip = d3.select('body')
            .append('div')
            .attr('class', 'absolute hidden')
            .style('background-color', 'rgba(0, 0, 0, 0.8)')
            .style('color', 'white')
            .style('padding', '8px')
            .style('border-radius', '4px')
            .style('font-size', '12px')
            .style('pointer-events', 'none');

        // Create cells with proper positioning
        const cells = g.selectAll('.cell')
            .data(data.flatMap((row, i) => row.map((value, j) => ({ 
                value, 
                row: i, 
                col: j,
                price: priceLow + (i * (priceHigh - priceLow) / (numRows - 1)),
                time: timeToExpiration * (1 - j / (numCols - 1))
            }))))
            .enter()
            .append('g')
            .attr('class', 'cell');

        cells.append('rect')
            .attr('x', d => d.col * cellSize)
            .attr('y', d => d.row * cellSize)
            .attr('width', cellSize - 1)
            .attr('height', cellSize - 1)
            .attr('rx', 4)
            .attr('fill', d => colorScale(d.value))
            .attr('opacity', 0.9)
            .style('transition', 'all 0.2s ease-in-out')
            .on('mouseover', function(event, d) {
                d3.select(this)
                    .attr('opacity', 1)
                    .attr('stroke', '#000')
                    .attr('stroke-width', 2);

                tooltip
                    .style('display', 'block')
                    .html(
                        `Contract Value: ${d.value.toFixed(2)}<br>` +
                        `Asset Price: ${d.price.toFixed(2)}<br>` +
                        `TTE: ${d.time.toFixed(1)}d`
                    );
            })
            .on('mousemove', (event) => {
                tooltip
                    .style('left', `${event.pageX + 10}px`)
                    .style('top', `${event.pageY - 10}px`);
            })
            .on('mouseleave', function() {
                d3.select(this)
                    .attr('opacity', 0.9)
                    .attr('stroke', 'none');

                tooltip.style('display', 'none');
            });

        const calculateBrightness = (color: string) => {
            const rgb = d3.rgb(color);
            return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
        };

        // Add value labels to cells
        cells.append('text')
            .attr('x', d => d.col * cellSize + cellSize / 2)
            .attr('y', d => d.row * cellSize + cellSize / 2)
            .attr('text-anchor', 'middle')
            .attr('dominant-baseline', 'middle')
            .attr('font-size', `${Math.min(cellSize / 4, 12)}px`)
            .attr('fill', d => {
                const cellColor = colorScale(d.value);
                return calculateBrightness(cellColor) > 128 ? '#000000' : '#ffffff';
            })
            .text(d => d.value.toFixed(2));

        // Title
        svg.append('text')
            .attr('x', margin.left)
            .attr('y', margin.top / 2)
            .attr('fill', '#ffffff')
            .attr('font-size', '24px')
            .attr('font-weight', 'bold')
            .text(title);

        if (subtitle) {
            svg.append('text')
                .attr('x', margin.left)
                .attr('y', (margin.top / 2) + 25)
                .attr('fill', '#9ca3af')
                .attr('font-size', '14px')
                .text(subtitle);
        }

        return () => {
            tooltip.remove();
        };
    }, [data, dimensions, title, subtitle, priceLow, priceHigh, timeToExpiration]);

    return <svg ref={svgRef} className="w-full h-full" />;
};

function Spreads({ callSpread, putSpread, priceLow, priceHigh, timeToExpiration}: SpreadProps) {
    return (
        <div className="mb-10">
            <div className="text-white mb-4">
                <h1 className="font-bold text-2xl">PnL Matrices</h1>
            </div>

            <div className="flex justify-between">
                <div className="text-white w-1/2 pr-4">
                    <Heatmap 
                        data={callSpread}
                        title="Call Spread"
                        priceHigh={priceHigh}
                        priceLow={priceLow}
                        timeToExpiration={timeToExpiration}
                    />
                </div>

                <div className="text-white w-1/2 pl-4">
                    <Heatmap 
                        data={putSpread} 
                        title="Put Spread" 
                        priceHigh={priceHigh}
                        priceLow={priceLow}
                        timeToExpiration={timeToExpiration}
                    />
                </div>
            </div>
        </div>
    );
}

export default Spreads;
