import React from 'react'
import { BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Bar } from 'recharts'
import numeral from 'numeral'
import { formatLongNumber, HoverUpdater } from 'views/Info/config'

const CustomBar = ({ x, y, fill, width, height }) => {
  return (
    <>
      <defs>
        <linearGradient id="gradient2" gradientTransform="rotate(90)">
          <stop offset="10%" stopColor="rgb(241,24,66)" />
          <stop offset="100%" stopColor="rgb(120,0,44)" />
        </linearGradient>
      </defs>
      <g>
        <rect x={x} y={y} fill="url(#gradient2)" width={width} height={height} rx="2" />
      </g>
    </>
  )
}

const Chart = ({ theme, setVolumeValue, setVolumeDate, chartData }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={chartData}
        margin={{
          top: 5,
          right: 0,
          left: 0,
          bottom: 5,
        }}
        onMouseLeave={() => {
          setVolumeValue(undefined)
        }}
      >
        <XAxis
          dataKey="time"
          axisLine={false}
          tickLine={false}
          tickFormatter={(time) => (time instanceof Date) ? time.toLocaleDateString(undefined, { day: '2-digit' }) : '0'}
          minTickGap={10}
          tick={{ fill: theme.colors.tertiary }}
        />
        <YAxis
          dataKey="value"
          tickCount={6}
          scale="linear"
          axisLine={false}
          tickLine={false}
          color={theme.colors.textSubtle}
          fontSize="12px"
          tickFormatter={(val) => formatLongNumber(val)}
          tick={{ dx: 10, fill: theme.colors.textSubtle }}
        />
        <Tooltip
          cursor={{ fill: theme.colors.secondaryContainer }}
          contentStyle={{ display: 'none' }}
          formatter={(tooltipValue, name, props) => (
            <HoverUpdater payload={props.payload} setHoverValue={setVolumeValue} setHoverDate={setVolumeDate} />
          )}
        />
        <Bar
          dataKey="value"
          fill={theme.colors.primary}
          shape={(props) => (
            <CustomBar height={props.height} width={props.width} x={props.x} y={props.y} fill={theme.colors.primary} />
          )}
        />
      </BarChart>
    </ResponsiveContainer>
  )
}

export default React.memo(Chart)
