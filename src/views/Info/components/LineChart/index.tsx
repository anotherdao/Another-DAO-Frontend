import React from 'react'
import { ResponsiveContainer, XAxis, YAxis, Tooltip, AreaChart, Area } from 'recharts'
import { formatLongNumber, HoverUpdater } from 'views/Info/config'

const Chart = ({ theme, setLiquidityValue, setLiquidityDate, chartData }) => {
  return (
    chartData && <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={chartData}
        margin={{
          top: 5,
          right: 15,
          left: 0,
          bottom: 5,
        }}
        onMouseLeave={() => {
          setLiquidityValue(undefined)
        }}
      >
        <defs>
          <linearGradient id="gradient" gradientTransform="rotate(90)">
            <stop offset="65%" stopColor={theme.colors.primaryBright} />
            <stop offset="100%" stopColor="rgb(241,24,66)" />
          </linearGradient>
        </defs>
        <XAxis
          dataKey="time"
          axisLine={false}
          tickLine={false}
          tickFormatter={(time) => (time instanceof Date) ? time.toLocaleDateString(undefined, { day: '2-digit' }) : '0'}
          minTickGap={10}
          tick={{fill:theme.colors.tertiary}}
        />
        <YAxis
          dataKey="value"
          tickCount={6}
          scale="linear"
          axisLine={false}
          tickLine={false}
          fontSize="12px"
          tickFormatter={(val) => formatLongNumber(val)}
          tick={{ dx: 10, fill: theme.colors.textSubtle }}
        />
        <Tooltip
          cursor={{ stroke: theme.colors.secondary }}
          contentStyle={{ display: 'none' }}
          formatter={(tooltipValue, name, props) => (
            <HoverUpdater payload={props.payload} setHoverValue={setLiquidityValue} setHoverDate={setLiquidityDate} />
          )}
        />
        <Area dataKey="value"  type="basis" stroke="transparent" fill="url(#gradient)" strokeWidth={2} />
      </AreaChart>
    </ResponsiveContainer>
  )
}

export default React.memo(Chart)
